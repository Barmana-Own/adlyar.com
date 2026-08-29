import { ApiRequestError, apiRequest } from '@/lib/api/client';
import type {
  ApiListResult,
  ApiSubmissionResult,
  PublicContentRecord,
  PublicExpertRecord,
  PublicFaqRecord,
  PublicMutationPayload,
  PublicSearchItem,
  QuickInquiryPayload,
} from '@/lib/api/types';

export const PUBLIC_ENDPOINTS = {
  legalServices: '/api/v1/public/legal-services',
  expertServices: '/api/v1/public/expert-services',
  experts: '/api/v1/public/experts',
  articles: '/api/v1/public/articles',
  faqs: '/api/v1/public/faqs',
  search: '/api/v1/public/search',
  quickInquiries: '/api/v1/public/quick-inquiries',
  serviceRequests: '/api/v1/public/service-requests',
  expertRequests: '/api/v1/public/expert-requests',
  consultationRequests: '/api/v1/public/consultation-requests',
  contractReviewRequests: '/api/v1/public/contract-review-requests',
  corporateLeads: '/api/v1/public/corporate-leads',
  meetingRequests: '/api/v1/public/meeting-requests',
  expertApplications: '/api/v1/public/expert-applications',
  contactInquiries: '/api/v1/public/contact-inquiries',
} as const;

type MutationOptions = { signal?: AbortSignal; idempotencyKey?: string };

function detailPath(base: string, slug: string) {
  return `${base}/${encodeURIComponent(slug)}`;
}

function createMultipartPayload(payload: PublicMutationPayload, files: File[]) {
  if (!files.length) return payload;
  const data = new FormData();
  data.append('payload', JSON.stringify(payload));
  files.forEach((file) => data.append('files[]', file, file.name));
  return data;
}

function submit(endpoint: string, payload: PublicMutationPayload | FormData, options: MutationOptions = {}) {
  return apiRequest<unknown>(endpoint, {
    method: 'POST',
    body: payload,
    signal: options.signal,
    idempotencyKey: options.idempotencyKey,
  }).then(normalizeSubmission);
}

function invalidResponse(): never {
  throw new ApiRequestError({ message: 'پاسخ سامانه قابل پردازش نیست.', status: 502, code: 'invalid_response' });
}

function normalizeSubmission(value: unknown): ApiSubmissionResult {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) invalidResponse();
  const record = value as Record<string, unknown>;
  for (const field of ['id', 'message', 'reference']) {
    if (record[field] !== undefined && typeof record[field] !== 'string') invalidResponse();
  }
  return { id: record.id as string | undefined, message: record.message as string | undefined, reference: record.reference as string | undefined };
}

function normalizeList<T>(value: ApiListResult<T> | T[]): ApiListResult<T> {
  if (Array.isArray(value)) return { items: value, total: value.length };
  if (!value || !Array.isArray(value.items)) invalidResponse();
  return value;
}

export const listLegalServices = (signal?: AbortSignal) => apiRequest<ApiListResult<PublicContentRecord> | PublicContentRecord[]>(PUBLIC_ENDPOINTS.legalServices, { signal }).then(normalizeList);
export const getLegalService = (slug: string, signal?: AbortSignal) => apiRequest<PublicContentRecord>(detailPath(PUBLIC_ENDPOINTS.legalServices, slug), { signal });
export const listExpertServices = (signal?: AbortSignal) => apiRequest<ApiListResult<PublicContentRecord> | PublicContentRecord[]>(PUBLIC_ENDPOINTS.expertServices, { signal }).then(normalizeList);
export const getExpertService = (slug: string, signal?: AbortSignal) => apiRequest<PublicContentRecord>(detailPath(PUBLIC_ENDPOINTS.expertServices, slug), { signal });
export const listExperts = (signal?: AbortSignal) => apiRequest<ApiListResult<PublicExpertRecord> | PublicExpertRecord[]>(PUBLIC_ENDPOINTS.experts, { signal }).then(normalizeList);
export const getExpert = (slug: string, signal?: AbortSignal) => apiRequest<PublicExpertRecord>(detailPath(PUBLIC_ENDPOINTS.experts, slug), { signal });
export const listArticles = (signal?: AbortSignal) => apiRequest<ApiListResult<PublicContentRecord> | PublicContentRecord[]>(PUBLIC_ENDPOINTS.articles, { signal }).then(normalizeList);
export const getArticle = (slug: string, signal?: AbortSignal) => apiRequest<PublicContentRecord>(detailPath(PUBLIC_ENDPOINTS.articles, slug), { signal });
export const listFaqs = (signal?: AbortSignal) => apiRequest<ApiListResult<PublicFaqRecord> | PublicFaqRecord[]>(PUBLIC_ENDPOINTS.faqs, { signal }).then(normalizeList);

export function searchPublic(query: string, signal?: AbortSignal) {
  const params = new URLSearchParams({ q: query.trim() });
  return apiRequest<ApiListResult<PublicSearchItem> | PublicSearchItem[]>(`${PUBLIC_ENDPOINTS.search}?${params}`, { signal }).then(normalizeList);
}

export function submitQuickInquiry(payload: QuickInquiryPayload, options: MutationOptions = {}) { return submit(PUBLIC_ENDPOINTS.quickInquiries, payload, options); }
export function submitServiceRequest(payload: PublicMutationPayload, files: File[] = [], options: MutationOptions = {}) { return submit(PUBLIC_ENDPOINTS.serviceRequests, createMultipartPayload(payload, files), options); }
export function submitExpertRequest(payload: PublicMutationPayload, files: File[] = [], options: MutationOptions = {}) { return submit(PUBLIC_ENDPOINTS.expertRequests, createMultipartPayload(payload, files), options); }
export function submitConsultationRequest(payload: PublicMutationPayload, options: MutationOptions = {}) { return submit(PUBLIC_ENDPOINTS.consultationRequests, payload, options); }
export function submitContractReviewRequest(payload: PublicMutationPayload, files: File[] = [], options: MutationOptions = {}) { return submit(PUBLIC_ENDPOINTS.contractReviewRequests, createMultipartPayload(payload, files), options); }
export function submitCorporateLead(payload: PublicMutationPayload, files: File[] = [], options: MutationOptions = {}) { return submit(PUBLIC_ENDPOINTS.corporateLeads, createMultipartPayload(payload, files), options); }
export function submitMeetingRequest(payload: PublicMutationPayload, options: MutationOptions = {}) { return submit(PUBLIC_ENDPOINTS.meetingRequests, payload, options); }
export function submitExpertApplication(payload: PublicMutationPayload, options: MutationOptions = {}) { return submit(PUBLIC_ENDPOINTS.expertApplications, payload, options); }
export function submitContactInquiry(payload: PublicMutationPayload, options: MutationOptions = {}) { return submit(PUBLIC_ENDPOINTS.contactInquiries, payload, options); }
