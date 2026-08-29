export type QuickInquiryPayload = {
  needType: string;
  subject: string;
  description: string;
  name: string;
  mobile: string;
  city: string;
  urgency: 'normal' | 'important' | 'urgent';
  consent: boolean;
};

class ApiUnavailableError extends Error {
  constructor() {
    super('اتصال فرم به سامانه پذیرش هنوز پیکربندی نشده است.');
    this.name = 'ApiUnavailableError';
  }
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '');

export async function submitQuickInquiry(
  payload: QuickInquiryPayload,
  signal?: AbortSignal,
) {
  if (!apiBaseUrl) {
    throw new ApiUnavailableError();
  }

  const response = await fetch(`${apiBaseUrl}/api/v1/public/quick-inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    throw new Error('ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید.');
  }

  return response.json() as Promise<{ id?: string; message?: string }>;
}

export { ApiUnavailableError };
