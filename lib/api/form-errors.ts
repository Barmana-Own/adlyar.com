import { ApiRequestError, ApiUnavailableError, isAbortError } from '@/lib/api/client';

export function safeServerFieldErrors(
  error: unknown,
  allowedFields: readonly string[],
  aliases: Record<string, string> = {},
) {
  if (!(error instanceof ApiRequestError)) return {};
  const allowed = new Set(allowedFields);
  const entries = Object.keys(error.fieldErrors).flatMap((serverField) => {
    const leaf = serverField.split('.').at(-1) ?? serverField;
    const localField = aliases[serverField] ?? aliases[leaf] ?? leaf;
    return allowed.has(localField)
      ? [[localField, 'این مقدار از سوی سامانه پذیرفته نشد؛ آن را بررسی کنید.']]
      : [];
  });
  return Object.fromEntries(entries) as Record<string, string>;
}

export function safeApiMessage(error: unknown, unavailableMessage: string) {
  if (error instanceof ApiUnavailableError) return unavailableMessage;
  if (isAbortError(error)) return 'زمان ارسال بیش از حد طول کشید. لطفاً دوباره تلاش کنید.';
  if (error instanceof ApiRequestError) {
    if (error.status === 409) return 'این درخواست قبلاً دریافت شده یا با درخواست دیگری تداخل دارد.';
    if (error.status === 429) return 'تعداد تلاش‌ها زیاد است. کمی بعد دوباره امتحان کنید.';
    if (error.status === 400 || error.status === 422) return 'برخی اطلاعات نیاز به اصلاح دارد.';
  }
  return 'ارتباط با سامانه انجام نشد. اطلاعات شما حفظ شده است؛ دوباره تلاش کنید.';
}
