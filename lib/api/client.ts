import type { ApiFieldErrors } from '@/lib/api/types';

const DEFAULT_TIMEOUT_MS = 15_000;

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim().replace(/\/$/, '') ?? '';
export const isPublicApiConfigured = apiBaseUrl.length > 0;

export class ApiUnavailableError extends Error {
  constructor() {
    super('اتصال به سامانه پذیرش در این محیط پیکربندی نشده است.');
    this.name = 'ApiUnavailableError';
  }
}

export class ApiRequestError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly fieldErrors: ApiFieldErrors;
  readonly retryAfter?: number;

  constructor({ message, status, code, fieldErrors = {}, retryAfter }: {
    message: string;
    status: number;
    code?: string;
    fieldErrors?: ApiFieldErrors;
    retryAfter?: number;
  }) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
    this.retryAfter = retryAfter;
  }
}

type ApiRequestOptions = {
  method?: 'GET' | 'POST';
  body?: Record<string, unknown> | FormData;
  signal?: AbortSignal;
  idempotencyKey?: string;
  timeoutMs?: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function safeString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function readFieldErrors(payload: unknown): ApiFieldErrors {
  if (!isRecord(payload)) return {};
  const nested = isRecord(payload.error) ? payload.error : payload;
  const candidate = nested.fieldErrors ?? nested.fields ?? nested.errors;
  if (!isRecord(candidate)) return {};

  return Object.fromEntries(
    Object.entries(candidate).flatMap(([field, value]) => {
      if (typeof value === 'string') return [[field, value]];
      if (Array.isArray(value) && typeof value[0] === 'string') return [[field, value[0]]];
      return [];
    }),
  );
}

async function parseResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';
  if (response.status === 204) return {};
  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      return {};
    }
  }
  const value = await response.text();
  return value ? { message: value } : {};
}

function errorMessage(status: number, payload: unknown) {
  const record = isRecord(payload) ? payload : {};
  const nested = isRecord(record.error) ? record.error : record;
  const serverMessage = safeString(nested.message) ?? safeString(record.message);
  if (serverMessage) return serverMessage;
  if (status === 400 || status === 422) return 'برخی اطلاعات ارسال‌شده نیاز به اصلاح دارد.';
  if (status === 413) return 'حجم فایل‌های انتخاب‌شده بیشتر از حد مجاز است.';
  if (status === 429) return 'تعداد تلاش‌ها زیاد است. کمی بعد دوباره امتحان کنید.';
  return 'ارتباط با سامانه انجام نشد. لطفاً دوباره تلاش کنید.';
}

function createRequestSignal(externalSignal?: AbortSignal, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const abortFromExternal = () => controller.abort(externalSignal?.reason);
  if (externalSignal?.aborted) abortFromExternal();
  else externalSignal?.addEventListener('abort', abortFromExternal, { once: true });
  const timeout = setTimeout(
    () => controller.abort(new DOMException('Request timeout', 'TimeoutError')),
    timeoutMs,
  );

  return {
    signal: controller.signal,
    cleanup() {
      clearTimeout(timeout);
      externalSignal?.removeEventListener('abort', abortFromExternal);
    },
  };
}

export function unwrapApiData<T>(payload: unknown): T {
  if (isRecord(payload) && 'data' in payload) return payload.data as T;
  return payload as T;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  if (!isPublicApiConfigured) throw new ApiUnavailableError();

  const method = options.method ?? 'GET';
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  const headers = new Headers({ Accept: 'application/json' });
  if (options.body && !isFormData) headers.set('Content-Type', 'application/json');
  if (method === 'POST') headers.set('Idempotency-Key', options.idempotencyKey ?? crypto.randomUUID());

  const requestSignal = createRequestSignal(options.signal, options.timeoutMs);
  const requestBody: BodyInit | undefined = options.body
    ? (isFormData ? options.body as FormData : JSON.stringify(options.body))
    : undefined;
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      method,
      headers,
      body: requestBody,
      signal: requestSignal.signal,
      credentials: 'omit',
      cache: method === 'GET' ? 'no-store' : undefined,
      referrerPolicy: 'strict-origin-when-cross-origin',
    });
    const payload = await parseResponse(response);
    if (!response.ok) {
      const record = isRecord(payload) ? payload : {};
      const nested = isRecord(record.error) ? record.error : record;
      const retryAfterHeader = Number(response.headers.get('retry-after'));
      throw new ApiRequestError({
        message: errorMessage(response.status, payload),
        status: response.status,
        code: safeString(nested.code),
        fieldErrors: readFieldErrors(payload),
        retryAfter: Number.isFinite(retryAfterHeader) ? retryAfterHeader : undefined,
      });
    }
    return unwrapApiData<T>(payload);
  } finally {
    requestSignal.cleanup();
  }
}

export function isAbortError(error: unknown) {
  return error instanceof DOMException && (error.name === 'AbortError' || error.name === 'TimeoutError');
}
