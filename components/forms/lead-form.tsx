'use client';

import { Check, LoaderCircle, Send, ShieldCheck, TriangleAlert } from 'lucide-react';
import { type SyntheticEvent, useEffect, useId, useMemo, useRef, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  submitConsultationRequest,
  submitContactInquiry,
  submitExpertApplication,
  submitMeetingRequest,
} from '@/lib/api-client';
import { safeApiMessage, safeServerFieldErrors } from '@/lib/api/form-errors';
import { isEmail, isIranMobile, toEnglishDigits } from '@/lib/form-utils';

type Mode = 'book' | 'contact' | 'corporate' | 'join';
type FormValues = Record<string, string | boolean>;

const modeCopy: Record<Mode, { title: string; button: string }> = {
  book: { title: 'اطلاعات مشاوره', button: 'ارسال درخواست رزرو' },
  contact: { title: 'پیام شما', button: 'ارسال پیام' },
  corporate: { title: 'درخواست جلسه سازمانی', button: 'ارسال درخواست جلسه' },
  join: { title: 'درخواست همکاری', button: 'ارسال برای بررسی' },
};

const submitters = {
  book: submitConsultationRequest,
  contact: submitContactInquiry,
  corporate: submitMeetingRequest,
  join: submitExpertApplication,
};

const serverFields = [
  'name', 'mobile', 'email', 'city', 'topic', 'message', 'consent', 'consultationType',
  'preferredDate', 'preferredTime', 'organization', 'role', 'model', 'expertise', 'experience',
] as const;

export function LeadForm({ mode }: { mode: Mode }) {
  const consentId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const inFlightRef = useRef(false);
  const idempotencyKeyRef = useRef<string | null>(null);
  const copy = modeCopy[mode];
  const [values, setValues] = useState<FormValues>({
    name: '', mobile: '', email: '', city: '', topic: '', message: '', consent: false,
    consultationType: 'phone', preferredDate: '', preferredTime: '', organization: '', role: '', model: '', expertise: '', experience: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const update = (field: string, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    idempotencyKeyRef.current = null;
    if (status !== 'idle') { setStatus('idle'); setMessage(''); }
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (String(values.name).trim().length < 2) next.name = 'نام و نام خانوادگی را وارد کنید.';
    if (!isIranMobile(String(values.mobile))) next.mobile = 'شماره موبایل معتبر وارد کنید.';
    if (!isEmail(String(values.email))) next.email = 'ایمیل معتبر وارد کنید.';
    if (!values.consent) next.consent = 'پذیرش حریم خصوصی برای ارسال لازم است.';
    if (mode === 'book') {
      if (!values.topic) next.topic = 'موضوع مشاوره را وارد کنید.';
      if (values.consultationType !== 'written' && !values.preferredDate) next.preferredDate = 'تاریخ ترجیحی را انتخاب کنید.';
      if (values.consultationType !== 'written' && !values.preferredTime) next.preferredTime = 'ساعت ترجیحی را انتخاب کنید.';
    }
    if (mode === 'contact' && String(values.message).trim().length < 15) next.message = 'پیام را دست‌کم در ۱۵ نویسه بنویسید.';
    if (mode === 'corporate') {
      if (String(values.organization).trim().length < 2) next.organization = 'نام سازمان را وارد کنید.';
      if (!values.model) next.model = 'مدل همکاری موردنظر را انتخاب کنید.';
    }
    if (mode === 'join') {
      if (!values.expertise) next.expertise = 'حوزه تخصص را وارد کنید.';
      if (!values.city) next.city = 'شهر را وارد کنید.';
    }
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
    }
    return Object.keys(next).length === 0;
  };

  const submit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlightRef.current || status === 'loading' || !validate()) return;
    inFlightRef.current = true;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const idempotencyKey = idempotencyKeyRef.current ?? crypto.randomUUID();
    idempotencyKeyRef.current = idempotencyKey;
    setStatus('loading');
    setMessage('در حال ارسال…');
    try {
      await submitters[mode](
        {
          ...values,
          mobile: toEnglishDigits(String(values.mobile)).replace(/[\s-]/g, ''),
          email: String(values.email).trim() || undefined,
        },
        { signal: controller.signal, idempotencyKey },
      );
      idempotencyKeyRef.current = null;
      setStatus('success');
      setMessage('اطلاعات ثبت شد و برای بررسی در صف قرار گرفت.');
    } catch (error) {
      const fieldErrors = safeServerFieldErrors(error, serverFields);
      if (Object.keys(fieldErrors).length) {
        setErrors({ ...errors, ...fieldErrors });
        requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      }
      setStatus('error');
      setMessage(safeApiMessage(error, 'فرم آماده است، اما اتصال آن به سامانه پذیرش این محیط هنوز فعال نشده است. اطلاعات ارسال نشد.'));
    } finally {
      inFlightRef.current = false;
      if (controllerRef.current === controller) controllerRef.current = null;
    }
  };

  if (status === 'success') {
    return <output className="lead-success"><span><Check /></span><h2>اطلاعات ثبت شد</h2><p>{message}</p></output>;
  }

  return (
    <form ref={formRef} className="lead-form" onSubmit={submit} noValidate>
      <div className="lead-form__heading"><span>{copy.title}</span><p>فیلدهای ضروری با توضیح و خطای درون‌خطی مشخص شده‌اند.</p></div>
      {Object.keys(errors).length > 0 && <div className="error-summary" role="alert"><TriangleAlert /><div><strong>فرم نیاز به بازبینی دارد</strong><p>{Object.values(errors)[0]}</p></div></div>}
      <div className="lead-form__grid">
        {mode === 'corporate' && <Field id="lead-organization" label="نام سازمان" error={errors.organization}><Input id="lead-organization" value={String(values.organization)} onChange={(event) => update('organization', event.target.value)} className="form-control" aria-invalid={Boolean(errors.organization)} aria-describedby={errors.organization ? 'lead-organization-error' : undefined} /></Field>}
        <Field id="lead-name" label="نام و نام خانوادگی" error={errors.name}><Input id="lead-name" value={String(values.name)} onChange={(event) => update('name', event.target.value)} className="form-control" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'lead-name-error' : undefined} /></Field>
        {mode === 'corporate' && <Field id="lead-role" label="سمت سازمانی"><Input id="lead-role" value={String(values.role)} onChange={(event) => update('role', event.target.value)} className="form-control" /></Field>}
        <Field id="lead-mobile" label="شماره موبایل" error={errors.mobile}><Input id="lead-mobile" value={String(values.mobile)} onChange={(event) => update('mobile', event.target.value)} className="form-control form-control--ltr" dir="ltr" type="tel" inputMode="numeric" autoComplete="tel" placeholder="0912 123 4567" aria-invalid={Boolean(errors.mobile)} aria-describedby={errors.mobile ? 'lead-mobile-error' : undefined} /></Field>
        <Field id="lead-email" label="ایمیل (اختیاری)" error={errors.email}><Input id="lead-email" value={String(values.email)} onChange={(event) => update('email', event.target.value)} className="form-control form-control--ltr" dir="ltr" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'lead-email-error' : undefined} /></Field>

        {mode === 'book' && <>
          <Field id="lead-topic" label="موضوع مشاوره" error={errors.topic} wide><Input id="lead-topic" value={String(values.topic)} onChange={(event) => update('topic', event.target.value)} className="form-control" aria-invalid={Boolean(errors.topic)} aria-describedby={errors.topic ? 'lead-topic-error' : undefined} /></Field>
          <Field id="lead-consultation-type" label="نوع مشاوره"><select id="lead-consultation-type" value={String(values.consultationType)} onChange={(event) => update('consultationType', event.target.value)}><option value="phone">تلفنی</option><option value="online">آنلاین</option><option value="in-person">حضوری</option><option value="written">مکتوب</option><option value="corporate">سازمانی</option></select></Field>
          {values.consultationType !== 'written' && <Field id="lead-date" label="تاریخ ترجیحی" error={errors.preferredDate}><Input id="lead-date" type="date" min={today} value={String(values.preferredDate)} onChange={(event) => update('preferredDate', event.target.value)} className="form-control form-control--ltr" dir="ltr" aria-invalid={Boolean(errors.preferredDate)} aria-describedby={errors.preferredDate ? 'lead-date-error' : undefined} /></Field>}
          {values.consultationType !== 'written' && <fieldset className="time-slots field--wide" aria-invalid={Boolean(errors.preferredTime)} aria-describedby={errors.preferredTime ? 'lead-time-error' : undefined}><legend>ساعت ترجیحی</legend>{['۹–۱۱', '۱۱–۱۳', '۱۴–۱۶', '۱۶–۱۸'].map((slot) => <button type="button" aria-pressed={values.preferredTime === slot} className={values.preferredTime === slot ? 'is-selected' : ''} onClick={() => update('preferredTime', slot)} key={slot}>{slot}</button>)}{errors.preferredTime && <span id="lead-time-error" className="field__error">{errors.preferredTime}</span>}<small>این انتخاب ترجیح شماست و تا تأیید سامانه، رزرو قطعی محسوب نمی‌شود.</small></fieldset>}
        </>}

        {mode === 'corporate' && <Field id="lead-model" label="مدل همکاری" error={errors.model}><select id="lead-model" value={String(values.model)} onChange={(event) => update('model', event.target.value)} aria-invalid={Boolean(errors.model)} aria-describedby={errors.model ? 'lead-model-error' : undefined}><option value="">انتخاب کنید</option><option>پروژه‌ای</option><option>ساعتی</option><option>پشتیبانی ماهانه</option><option>مبتنی بر SLA</option><option>میز حقوقی اختصاصی</option></select></Field>}

        {mode === 'join' && <>
          <Field id="lead-expertise" label="حوزه تخصص" error={errors.expertise}><Input id="lead-expertise" value={String(values.expertise)} onChange={(event) => update('expertise', event.target.value)} className="form-control" aria-invalid={Boolean(errors.expertise)} aria-describedby={errors.expertise ? 'lead-expertise-error' : undefined} /></Field>
          <Field id="lead-city" label="شهر" error={errors.city}><Input id="lead-city" value={String(values.city)} onChange={(event) => update('city', event.target.value)} className="form-control" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? 'lead-city-error' : undefined} /></Field>
          <Field id="lead-experience" label="سابقه حرفه‌ای (اختیاری)"><Input id="lead-experience" value={String(values.experience)} onChange={(event) => update('experience', event.target.value)} className="form-control" placeholder="مثلاً ۸ سال" /></Field>
        </>}

        <Field id="lead-message" label={mode === 'contact' ? 'متن پیام' : 'توضیحات تکمیلی (اختیاری)'} error={errors.message} wide>
          <Textarea id="lead-message" value={String(values.message)} onChange={(event) => update('message', event.target.value)} className="form-control form-textarea" placeholder={mode === 'contact' ? 'موضوع تماس یا بازخورد خود را بنویسید.' : 'نیاز، محدودیت زمانی یا توضیح مهم را بنویسید.'} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'lead-message-error' : undefined} />
        </Field>
        <div className="consent-box field--wide"><Checkbox id={consentId} checked={Boolean(values.consent)} onCheckedChange={(checked) => update('consent', checked)} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? `${consentId}-error` : undefined} /><label htmlFor={consentId}><strong>حریم خصوصی</strong><small>با بررسی این اطلاعات برای پاسخ‌گویی به همین درخواست موافقم.</small></label></div>
        {errors.consent && <span id={`${consentId}-error`} className="field__error field--wide">{errors.consent}</span>}
      </div>
      <div className="lead-form__footer"><span><ShieldCheck /> اطلاعات شما عمومی نمی‌شود.</span><button className="button button--primary button--large" type="submit" disabled={status === 'loading'} aria-disabled={status === 'loading'}>{status === 'loading' ? <LoaderCircle className="is-spinning" /> : <Send />}{status === 'loading' ? 'در حال ارسال' : copy.button}</button></div>
      {message && <output className={`form-status is-visible is-${status}`} aria-live="polite">{status === 'error' && <TriangleAlert />}{message}</output>}
    </form>
  );
}

function Field({ id, label, error, wide, children }: { id: string; label: string; error?: string; wide?: boolean; children: React.ReactNode }) {
  return <div className={`field${wide ? ' field--wide' : ''}`}><label className="field-label" htmlFor={id}>{label}</label>{children}{error && <span id={`${id}-error`} className="field__error">{error}</span>}</div>;
}
