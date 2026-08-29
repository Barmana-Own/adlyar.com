'use client';

import { LoaderCircle, Send, ShieldCheck, TriangleAlert } from 'lucide-react';
import { type SyntheticEvent, useId, useMemo, useState } from 'react';

import { FileUpload, type LocalFile } from '@/components/forms/file-upload';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ApiUnavailableError, submitPublicForm } from '@/lib/api-client';
import { isIranMobile, toEnglishDigits } from '@/lib/form-utils';

export function ContractReviewForm() {
  const consentId = useId();
  const [values, setValues] = useState({ contractType: '', parties: '', purpose: '', stage: '', deadline: '', description: '', name: '', mobile: '', consent: false });
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const update = <K extends keyof typeof values>(field: K, value: typeof values[K]) => { setValues((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: '' })); };

  const submit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'loading') return;
    const next: Record<string, string> = {};
    if (!values.contractType) next.contractType = 'نوع قرارداد را انتخاب کنید.';
    if (values.parties.trim().length < 5) next.parties = 'طرفین یا نقش آن‌ها را وارد کنید.';
    if (values.purpose.trim().length < 10) next.purpose = 'هدف قرارداد را کوتاه توضیح دهید.';
    if (!values.stage) next.stage = 'مرحله قرارداد را انتخاب کنید.';
    if (!files.length) next.files = 'حداقل فایل اصلی قرارداد را انتخاب کنید.';
    if (values.description.trim().length < 15) next.description = 'نگرانی اصلی را دست‌کم در ۱۵ نویسه بنویسید.';
    if (values.name.trim().length < 2) next.name = 'نام را وارد کنید.';
    if (!isIranMobile(values.mobile)) next.mobile = 'شماره موبایل معتبر وارد کنید.';
    if (!values.consent) next.consent = 'پذیرش حریم خصوصی لازم است.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('loading'); setMessage('در حال ارسال…');
    try {
      await submitPublicForm('contract-reviews', {
        ...values,
        mobile: toEnglishDigits(values.mobile).replace(/[\s-]/g, ''),
        attachments: files.map(({ file }) => ({ name: file.name, size: file.size, type: file.type })),
      });
      setStatus('success'); setMessage('درخواست بررسی قرارداد ثبت شد.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof ApiUnavailableError ? 'فرم آماده است، اما اتصال امن و آپلود خصوصی هنوز فعال نشده است. اطلاعات یا فایل‌ها ارسال نشد.' : 'ارسال انجام نشد. لطفاً دوباره تلاش کنید.');
    }
  };

  return (
    <form className="lead-form contract-form" onSubmit={submit} noValidate>
      <div className="lead-form__heading"><span>فرم بررسی قرارداد</span><p>هدف، مرحله و نگرانی اصلی را همراه نسخه قابل بررسی ثبت کنید.</p></div>
      <div className="lead-form__grid">
        <div className="field"><label htmlFor="contract-type">نوع قرارداد</label><select id="contract-type" value={values.contractType} onChange={(event) => update('contractType', event.target.value)} aria-invalid={Boolean(errors.contractType)}><option value="">انتخاب کنید</option><option>خدمات</option><option>همکاری</option><option>خرید و فروش</option><option>اجاره</option><option>پیمان</option><option>سرمایه‌گذاری</option><option>سایر</option></select>{errors.contractType && <span className="field__error">{errors.contractType}</span>}</div>
        <div className="field"><label htmlFor="contract-stage">مرحله</label><select id="contract-stage" value={values.stage} onChange={(event) => update('stage', event.target.value)} aria-invalid={Boolean(errors.stage)}><option value="">انتخاب کنید</option><option>پیش‌نویس</option><option>در حال مذاکره</option><option>امضاشده</option><option>در اختلاف</option></select>{errors.stage && <span className="field__error">{errors.stage}</span>}</div>
        <div className="field field--wide"><label htmlFor="contract-parties">طرفین یا نقش‌ها</label><Input id="contract-parties" value={values.parties} onChange={(event) => update('parties', event.target.value)} className="form-control" placeholder="مثلاً کارفرما و ارائه‌دهنده خدمت" aria-invalid={Boolean(errors.parties)} />{errors.parties && <span className="field__error">{errors.parties}</span>}</div>
        <div className="field field--wide"><label htmlFor="contract-purpose">هدف قرارداد</label><Textarea id="contract-purpose" value={values.purpose} onChange={(event) => update('purpose', event.target.value)} className="form-control" aria-invalid={Boolean(errors.purpose)} />{errors.purpose && <span className="field__error">{errors.purpose}</span>}</div>
        <div className="field"><label htmlFor="contract-deadline">مهلت تصمیم (اختیاری)</label><Input id="contract-deadline" type="date" min={today} value={values.deadline} onChange={(event) => update('deadline', event.target.value)} className="form-control form-control--ltr" dir="ltr" /></div>
        <div className="field field--wide"><span className="field-label">فایل قرارداد و پیوست‌های مرتبط</span><FileUpload files={files} onChange={setFiles} required />{errors.files && <span className="field__error">{errors.files}</span>}</div>
        <div className="field field--wide"><label htmlFor="contract-description">نگرانی یا پرسش اصلی</label><Textarea id="contract-description" value={values.description} onChange={(event) => update('description', event.target.value)} className="form-control form-textarea" aria-invalid={Boolean(errors.description)} />{errors.description && <span className="field__error">{errors.description}</span>}</div>
        <div className="field"><label htmlFor="contract-name">نام و نام خانوادگی</label><Input id="contract-name" value={values.name} onChange={(event) => update('name', event.target.value)} className="form-control" aria-invalid={Boolean(errors.name)} />{errors.name && <span className="field__error">{errors.name}</span>}</div>
        <div className="field"><label htmlFor="contract-mobile">شماره موبایل</label><Input id="contract-mobile" value={values.mobile} onChange={(event) => update('mobile', event.target.value)} className="form-control form-control--ltr" dir="ltr" type="tel" inputMode="numeric" aria-invalid={Boolean(errors.mobile)} />{errors.mobile && <span className="field__error">{errors.mobile}</span>}</div>
        <div className="consent-box field--wide"><Checkbox id={consentId} checked={values.consent} onCheckedChange={(checked) => update('consent', checked)} /><label htmlFor={consentId}><strong>حریم خصوصی</strong><small>با بررسی اطلاعات و فایل‌ها فقط در دامنه این درخواست موافقم.</small></label></div>{errors.consent && <span className="field__error field--wide">{errors.consent}</span>}
      </div>
      <div className="lead-form__footer"><span><ShieldCheck /> فایل‌ها عمومی نمی‌شوند.</span><button className="button button--primary button--large" disabled={status === 'loading'} type="submit">{status === 'loading' ? <LoaderCircle className="is-spinning" /> : <Send />}{status === 'loading' ? 'در حال ارسال' : 'ارسال برای بررسی'}</button></div>
      {message && <output className={`form-status is-visible is-${status}`} aria-live="polite">{status === 'error' && <TriangleAlert />}{message}</output>}
    </form>
  );
}
