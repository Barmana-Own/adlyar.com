'use client';

import { Check, LoaderCircle, Send, ShieldCheck, TriangleAlert } from 'lucide-react';
import { type SyntheticEvent, useId, useMemo, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ApiUnavailableError, submitPublicForm, type PublicFormKind } from '@/lib/api-client';
import { isEmail, isIranMobile, toEnglishDigits } from '@/lib/form-utils';

type Mode = 'book' | 'contact' | 'corporate' | 'join';

const modeCopy: Record<Mode, { endpoint: PublicFormKind; title: string; button: string }> = {
  book: { endpoint: 'bookings', title: 'اطلاعات مشاوره', button: 'ارسال درخواست رزرو' },
  contact: { endpoint: 'contacts', title: 'پیام شما', button: 'ارسال پیام' },
  corporate: { endpoint: 'corporate-leads', title: 'درخواست جلسه سازمانی', button: 'ارسال درخواست جلسه' },
  join: { endpoint: 'expert-applications', title: 'درخواست همکاری', button: 'ارسال برای بررسی' },
};

export function LeadForm({ mode }: { mode: Mode }) {
  const consentId = useId();
  const copy = modeCopy[mode];
  const [values, setValues] = useState<Record<string, string | boolean>>({
    name: '', mobile: '', email: '', city: '', topic: '', message: '', consent: false,
    consultationType: 'phone', preferredDate: '', preferredTime: '', organization: '', role: '', model: '', expertise: '', experience: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const update = (field: string, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
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
    return Object.keys(next).length === 0;
  };

  const submit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'loading' || !validate()) return;
    setStatus('loading');
    setMessage('در حال ارسال…');
    try {
      await submitPublicForm(copy.endpoint, {
        ...values,
        mobile: toEnglishDigits(String(values.mobile)).replace(/[\s-]/g, ''),
        email: String(values.email).trim() || undefined,
      });
      setStatus('success');
      setMessage('اطلاعات ثبت شد و برای بررسی در صف قرار گرفت.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof ApiUnavailableError
        ? 'فرم آماده است، اما اتصال آن به سامانه پذیرش این محیط هنوز فعال نشده است. اطلاعات ارسال نشد.'
        : 'ارسال انجام نشد. لطفاً دوباره تلاش کنید.');
    }
  };

  if (status === 'success') {
    return <output className="lead-success"><span><Check /></span><h2>اطلاعات ثبت شد</h2><p>{message}</p></output>;
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <div className="lead-form__heading"><span>{copy.title}</span><p>فیلدهای ضروری با توضیح و خطای درون‌خطی مشخص شده‌اند.</p></div>
      <div className="lead-form__grid">
        {mode === 'corporate' && <Field label="نام سازمان" error={errors.organization}><Input value={String(values.organization)} onChange={(event) => update('organization', event.target.value)} className="form-control" aria-invalid={Boolean(errors.organization)} /></Field>}
        <Field label="نام و نام خانوادگی" error={errors.name}><Input value={String(values.name)} onChange={(event) => update('name', event.target.value)} className="form-control" autoComplete="name" aria-invalid={Boolean(errors.name)} /></Field>
        {mode === 'corporate' && <Field label="سمت سازمانی"><Input value={String(values.role)} onChange={(event) => update('role', event.target.value)} className="form-control" /></Field>}
        <Field label="شماره موبایل" error={errors.mobile}><Input value={String(values.mobile)} onChange={(event) => update('mobile', event.target.value)} className="form-control form-control--ltr" dir="ltr" type="tel" inputMode="numeric" autoComplete="tel" placeholder="0912 123 4567" aria-invalid={Boolean(errors.mobile)} /></Field>
        <Field label="ایمیل (اختیاری)" error={errors.email}><Input value={String(values.email)} onChange={(event) => update('email', event.target.value)} className="form-control form-control--ltr" dir="ltr" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} /></Field>

        {mode === 'book' && <>
          <Field label="موضوع مشاوره" error={errors.topic} wide><Input value={String(values.topic)} onChange={(event) => update('topic', event.target.value)} className="form-control" aria-invalid={Boolean(errors.topic)} /></Field>
          <Field label="نوع مشاوره"><select value={String(values.consultationType)} onChange={(event) => update('consultationType', event.target.value)}><option value="phone">تلفنی</option><option value="online">آنلاین</option><option value="in-person">حضوری</option><option value="written">مکتوب</option><option value="corporate">سازمانی</option></select></Field>
          {values.consultationType !== 'written' && <Field label="تاریخ ترجیحی" error={errors.preferredDate}><Input type="date" min={today} value={String(values.preferredDate)} onChange={(event) => update('preferredDate', event.target.value)} className="form-control form-control--ltr" dir="ltr" aria-invalid={Boolean(errors.preferredDate)} /></Field>}
          {values.consultationType !== 'written' && <fieldset className="time-slots field--wide"><legend>ساعت ترجیحی</legend>{['۹–۱۱', '۱۱–۱۳', '۱۴–۱۶', '۱۶–۱۸'].map((slot) => <button type="button" className={values.preferredTime === slot ? 'is-selected' : ''} onClick={() => update('preferredTime', slot)} key={slot}>{slot}</button>)}{errors.preferredTime && <span className="field__error">{errors.preferredTime}</span>}<small>این انتخاب ترجیح شماست و تا تأیید سامانه، رزرو قطعی محسوب نمی‌شود.</small></fieldset>}
        </>}

        {mode === 'corporate' && <Field label="مدل همکاری" error={errors.model}><select value={String(values.model)} onChange={(event) => update('model', event.target.value)} aria-invalid={Boolean(errors.model)}><option value="">انتخاب کنید</option><option>پروژه‌ای</option><option>ساعتی</option><option>پشتیبانی ماهانه</option><option>مبتنی بر SLA</option><option>میز حقوقی اختصاصی</option></select></Field>}

        {mode === 'join' && <>
          <Field label="حوزه تخصص" error={errors.expertise}><Input value={String(values.expertise)} onChange={(event) => update('expertise', event.target.value)} className="form-control" aria-invalid={Boolean(errors.expertise)} /></Field>
          <Field label="شهر" error={errors.city}><Input value={String(values.city)} onChange={(event) => update('city', event.target.value)} className="form-control" aria-invalid={Boolean(errors.city)} /></Field>
          <Field label="سابقه حرفه‌ای (اختیاری)"><Input value={String(values.experience)} onChange={(event) => update('experience', event.target.value)} className="form-control" placeholder="مثلاً ۸ سال" /></Field>
        </>}

        <Field label={mode === 'contact' ? 'متن پیام' : 'توضیحات تکمیلی (اختیاری)'} error={errors.message} wide>
          <Textarea value={String(values.message)} onChange={(event) => update('message', event.target.value)} className="form-control form-textarea" placeholder={mode === 'contact' ? 'موضوع تماس یا بازخورد خود را بنویسید.' : 'نیاز، محدودیت زمانی یا توضیح مهم را بنویسید.'} aria-invalid={Boolean(errors.message)} />
        </Field>
        <div className="consent-box field--wide"><Checkbox id={consentId} checked={Boolean(values.consent)} onCheckedChange={(checked) => update('consent', checked)} aria-invalid={Boolean(errors.consent)} /><label htmlFor={consentId}><strong>حریم خصوصی</strong><small>با بررسی این اطلاعات برای پاسخ‌گویی به همین درخواست موافقم.</small></label></div>
        {errors.consent && <span className="field__error field--wide">{errors.consent}</span>}
      </div>
      <div className="lead-form__footer"><span><ShieldCheck /> اطلاعات شما عمومی نمی‌شود.</span><button className="button button--primary button--large" type="submit" disabled={status === 'loading'}>{status === 'loading' ? <LoaderCircle className="is-spinning" /> : <Send />}{status === 'loading' ? 'در حال ارسال' : copy.button}</button></div>
      {message && <output className={`form-status is-visible is-${status}`} aria-live="polite">{status === 'error' && <TriangleAlert />}{message}</output>}
    </form>
  );
}

function Field({ label, error, wide, children }: { label: string; error?: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={`field${wide ? ' field--wide' : ''}`}><span className="field-label">{label}</span>{children}{error && <span className="field__error">{error}</span>}</label>;
}
