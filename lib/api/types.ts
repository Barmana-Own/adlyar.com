export type ApiFieldErrors = Record<string, string>;

export type ApiSubmissionResult = {
  id?: string;
  message?: string;
  reference?: string;
};

export type ApiListResult<T> = {
  items: T[];
  page?: number;
  pageSize?: number;
  total?: number;
};

export type PublicContentRecord = {
  id?: string;
  slug: string;
  title: string;
  description?: string;
  category?: string;
  href?: string;
  image?: string | null;
  [key: string]: unknown;
};

export type PublicExpertRecord = PublicContentRecord & {
  name?: string | null;
  specialty?: string;
  city?: string | null;
};

export type PublicFaqRecord = {
  id?: string;
  question: string;
  answer: string;
  category?: string;
};

export type PublicSearchItem = {
  id?: string;
  type: string;
  title: string;
  description?: string;
  href: string;
};

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

export type PublicMutationPayload = Record<string, unknown>;
