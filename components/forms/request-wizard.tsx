'use client';

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CircleHelp,
  FileCheck2,
  Gavel,
  LoaderCircle,
  MessageSquareText,
  Send,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react';
import { useEffect, useMemo, useReducer, useRef } from 'react';

import { FileUpload, type LocalFile } from '@/components/forms/file-upload';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  submitContractReviewRequest,
  submitCorporateLead,
  submitExpertRequest,
  submitServiceRequest,
} from '@/lib/api-client';
import { safeApiMessage, safeServerFieldErrors } from '@/lib/api/form-errors';
import { isEmail, isIranMobile, toEnglishDigits } from '@/lib/form-utils';
import { expertServiceRecords, legalServiceRecords } from '@/lib/site-data';

type RequestType = 'legal' | 'expert' | 'contract' | 'corporate' | 'unsure' | '';
type Urgency = 'normal' | 'important' | 'urgent' | '';
type WizardState = {
  step: number;
  requestType: RequestType;
  topic: string;
  description: string;
  outcome: string;
  stage: string;
  files: LocalFile[];
  urgency: Urgency;
  name: string;
  mobile: string;
  email: string;
  city: string;
  privacy: boolean;
  accuracy: boolean;
  errors: Record<string, string>;
  submitState: 'idle' | 'loading' | 'success' | 'error';
  statusMessage: string;
  reference: string;
};

type Action =
  | { type: 'set'; field: keyof WizardState; value: WizardState[keyof WizardState] }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'errors'; errors: Record<string, string> }
  | { type: 'submit'; state: WizardState['submitState']; message: string; reference?: string };

const requestTypes = [
  { id: 'legal', title: 'حقوقی', description: 'مشاوره، دعوا، ملک، خانواده یا شرکت', icon: Gavel },
  { id: 'expert', title: 'کارشناسی', description: 'بررسی فنی، مالی، ارزیابی یا خسارت', icon: FileCheck2 },
  { id: 'contract', title: 'قرارداد', description: 'تنظیم، بازبینی یا اختلاف قراردادی', icon: MessageSquareText },
  { id: 'corporate', title: 'سازمانی', description: 'پشتیبانی پروژه‌ای یا مستمر سازمان', icon: Building2 },
  { id: 'unsure', title: 'مطمئن نیستم', description: 'مسئله را توضیح می‌دهم تا مسیر مشخص شود', icon: CircleHelp },
] as const;

const stages = ['پیش از هر اقدام', 'در حال مذاکره', 'اقدام یا مکاتبه انجام شده', 'پرونده در جریان است', 'رأی یا نتیجه صادر شده'];

function reducer(state: WizardState, action: Action): WizardState {
  if (action.type === 'set') {
    const next = {
      ...state,
      [action.field]: action.value,
      errors: { ...state.errors, [action.field]: '' },
      submitState: state.submitState === 'error' ? 'idle' as const : state.submitState,
      statusMessage: state.submitState === 'error' ? '' : state.statusMessage,
    };
    if (action.field === 'requestType') next.topic = '';
    return next;
  }
  if (action.type === 'next') return { ...state, step: Math.min(7, state.step + 1), errors: {} };
  if (action.type === 'back') return { ...state, step: Math.max(1, state.step - 1), errors: {} };
  if (action.type === 'errors') return { ...state, errors: action.errors };
  return { ...state, submitState: action.state, statusMessage: action.message, reference: action.reference ?? state.reference };
}

function initialState(type: RequestType): WizardState {
  return {
    step: 1,
    requestType: type,
    topic: '',
    description: '',
    outcome: '',
    stage: '',
    files: [],
    urgency: '',
    name: '',
    mobile: '',
    email: '',
    city: '',
    privacy: false,
    accuracy: false,
    errors: {},
    submitState: 'idle',
    statusMessage: '',
    reference: '',
  };
}

export function RequestWizard() {
  const [state, dispatch] = useReducer(reducer, '', initialState);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const didMount = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);
  const inFlightRef = useRef(false);
  const idempotencyKeyRef = useRef<string | null>(null);
  const privacyId = 'request-privacy-consent';
  const accuracyId = 'request-accuracy-consent';

  const topics = useMemo(() => {
    if (state.requestType === 'legal') return legalServiceRecords.map((item) => item.title);
    if (state.requestType === 'expert') return expertServiceRecords.map((item) => item.title);
    if (state.requestType === 'contract') return ['قرارداد در حال مذاکره', 'پیش‌نویس قرارداد', 'قرارداد امضاشده', 'اختلاف قراردادی'];
    if (state.requestType === 'corporate') return ['پشتیبانی مستمر', 'مدیریت قرارداد', 'مطالبات', 'اختلافات', 'ارزیابی ریسک'];
    return ['نیاز به راهنمایی', 'موضوع ترکیبی', 'موضوع دیگر'];
  }, [state.requestType]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: 'nearest' });
  }, [state.step]);

  useEffect(() => {
    const queryType = new URLSearchParams(window.location.search).get('type');
    if (requestTypes.some((item) => item.id === queryType)) {
      dispatch({ type: 'set', field: 'requestType', value: queryType as RequestType });
    }
  }, []);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const set = (field: keyof WizardState, value: WizardState[keyof WizardState]) => {
    idempotencyKeyRef.current = null;
    dispatch({ type: 'set', field, value });
  };

  const validateStep = () => {
    const errors: Record<string, string> = {};
    if (state.step === 1 && !state.requestType) errors.requestType = 'نوع درخواست را انتخاب کنید.';
    if (state.step === 2 && !state.topic) errors.topic = 'موضوع را انتخاب کنید.';
    if (state.step === 3) {
      if (state.description.trim().length < 20) errors.description = 'شرح مسئله را دست‌کم در ۲۰ نویسه بنویسید.';
      if (!state.stage) errors.stage = 'مرحله فعلی را انتخاب کنید.';
    }
    if (state.step === 5 && !state.urgency) errors.urgency = 'سطح فوریت را انتخاب کنید.';
    if (state.step === 6) {
      if (state.name.trim().length < 2) errors.name = 'نام و نام خانوادگی را وارد کنید.';
      if (!isIranMobile(state.mobile)) errors.mobile = 'شماره موبایل معتبر وارد کنید.';
      if (!isEmail(state.email)) errors.email = 'ایمیل معتبر وارد کنید.';
      if (state.city.trim().length < 2) errors.city = 'شهر را وارد کنید.';
    }
    if (state.step === 7) {
      if (!state.privacy) errors.privacy = 'پذیرش حریم خصوصی برای ارسال لازم است.';
      if (!state.accuracy) errors.accuracy = 'صحت اطلاعات را تأیید کنید.';
    }
    dispatch({ type: 'errors', errors });
    if (Object.keys(errors).length) {
      window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return false;
    }
    return true;
  };

  const next = () => {
    if (validateStep()) dispatch({ type: 'next' });
  };

  const submit = async () => {
    if (inFlightRef.current || !validateStep() || state.submitState === 'loading') return;
    inFlightRef.current = true;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const idempotencyKey = idempotencyKeyRef.current ?? crypto.randomUUID();
    idempotencyKeyRef.current = idempotencyKey;
    dispatch({ type: 'submit', state: 'loading', message: 'در حال ارسال درخواست…' });
    const payload = {
      requestType: state.requestType,
      topic: state.topic,
      description: state.description.trim(),
      desiredOutcome: state.outcome.trim(),
      currentStage: state.stage,
      urgency: state.urgency,
      contact: {
        name: state.name.trim(),
        mobile: toEnglishDigits(state.mobile).replace(/[\s-]/g, ''),
        email: state.email.trim() || undefined,
        city: state.city.trim(),
      },
      consents: { privacy: state.privacy, accuracy: state.accuracy },
    };
    const files = state.files.map(({ file }) => file);
    const options = { signal: controller.signal, idempotencyKey };
    try {
      const result = state.requestType === 'expert'
        ? await submitExpertRequest(payload, files, options)
        : state.requestType === 'corporate'
          ? await submitCorporateLead(payload, files, options)
          : state.requestType === 'contract'
            ? await submitContractReviewRequest(payload, files, options)
            : await submitServiceRequest(payload, files, options);
      idempotencyKeyRef.current = null;
      dispatch({ type: 'submit', state: 'success', message: 'درخواست ثبت شد.', reference: result.id ?? '' });
    } catch (error) {
      const fieldErrors = safeServerFieldErrors(
        error,
        ['requestType', 'topic', 'description', 'outcome', 'stage', 'urgency', 'name', 'mobile', 'email', 'city', 'privacy', 'accuracy'],
        { desiredOutcome: 'outcome', currentStage: 'stage' },
      );
      if (Object.keys(fieldErrors).length) dispatch({ type: 'errors', errors: fieldErrors });
      dispatch({
        type: 'submit',
        state: 'error',
        message: safeApiMessage(error, 'فرم کامل است، اما اتصال امن به سامانه پذیرش این محیط هنوز فعال نشده است. اطلاعات شما ارسال نشد.'),
      });
    } finally {
      inFlightRef.current = false;
      if (controllerRef.current === controller) controllerRef.current = null;
    }
  };

  if (state.submitState === 'success') {
    return (
      <output className="wizard-success">
        <span><Check /></span><h2>درخواست شما ثبت شد</h2>
        {state.reference && <p>شناسه پیگیری: <bdi dir="ltr">{state.reference}</bdi></p>}
        <p>پس از بررسی اولیه، دامنه و قدم بعد از مسیر ارتباطی ثبت‌شده اعلام می‌شود.</p>
        <a className="button button--primary" href="/">بازگشت به صفحه اصلی</a>
      </output>
    );
  }

  const stepTitles = ['نوع درخواست', 'موضوع', 'شرح مسئله', 'مدارک', 'فوریت', 'اطلاعات تماس', 'بازبینی و تأیید'];

  return (
    <div className="wizard-shell">
      <aside className="wizard-sidebar">
        <a className="wizard-brand" href="/">عدل‌یار <span>ثبت ساختاریافته درخواست</span></a>
        <div className="wizard-progress-copy"><strong>مرحله {state.step} از ۷</strong><span>{Math.round((state.step / 7) * 100)}٪ تکمیل</span></div>
        <div className="wizard-progress" aria-hidden="true"><span style={{ transform: `scaleX(${state.step / 7})` }} /></div>
        <ol className="wizard-stepper" aria-label="مراحل ثبت درخواست">
          {stepTitles.map((title, index) => {
            const number = index + 1;
            return <li className={number === state.step ? 'is-current' : number < state.step ? 'is-complete' : ''} aria-current={number === state.step ? 'step' : undefined} key={title}><span>{number < state.step ? <Check /> : number}</span><strong>{title}</strong></li>;
          })}
        </ol>
        <div className="wizard-help"><ShieldCheck /><strong>مدارک شما عمومی نمی‌شود</strong><p>فایل‌ها در این نسخه فقط محلی انتخاب می‌شوند و تا اتصال مسیر امن ارسال نخواهند شد.</p></div>
      </aside>

      <main className="wizard-main">
        <form ref={formRef} onSubmit={(event) => event.preventDefault()} noValidate>
          <div className="wizard-mobile-progress">
            <span>مرحله {state.step} از ۷</span><strong>{stepTitles[state.step - 1]}</strong>
            <div><i style={{ transform: `scaleX(${state.step / 7})` }} /></div>
          </div>

          {Object.keys(state.errors).length > 0 && <div className="error-summary" role="alert"><TriangleAlert /><div><strong>این مرحله کامل نشده است</strong><p>{Object.values(state.errors)[0]}</p></div></div>}

          <section className="wizard-step" aria-labelledby="wizard-step-title">
            <div className="wizard-step__heading">
              <span>مرحله {state.step}</span>
              <h2 id="wizard-step-title" ref={headingRef} tabIndex={-1}>{stepTitles[state.step - 1]}</h2>
              <p>{[
                'نزدیک‌ترین مسیر را انتخاب کنید؛ اگر مطمئن نیستید گزینه آخر را بزنید.',
                'موضوعی را انتخاب کنید که به مسئله شما نزدیک‌تر است.',
                'اتفاق‌ها و نتیجه مورد انتظار را با زبان خودتان بنویسید.',
                'افزودن فایل اختیاری است؛ فقط مدارک مرتبط را انتخاب کنید.',
                'فوریت واقعی و مهلت قانونی را در نظر بگیرید.',
                'این اطلاعات فقط برای پیگیری همین درخواست استفاده می‌شود.',
                'پیش از ارسال، خلاصه اطلاعات را مرور و دو تأیید لازم را ثبت کنید.',
              ][state.step - 1]}</p>
            </div>

            {state.step === 1 && (
              <fieldset className="choice-grid" aria-invalid={Boolean(state.errors.requestType)} aria-describedby={state.errors.requestType ? 'request-type-error' : undefined}>
                <legend className="sr-only">نوع درخواست</legend>
                {requestTypes.map(({ id, title, description, icon: Icon }) => (
                  <button className={state.requestType === id ? 'is-selected' : ''} type="button" aria-pressed={state.requestType === id} onClick={() => set('requestType', id)} key={id}><Icon /><span><strong>{title}</strong><small>{description}</small></span>{state.requestType === id && <Check />}</button>
                ))}
                {state.errors.requestType && <span id="request-type-error" className="field__error">{state.errors.requestType}</span>}
              </fieldset>
            )}

            {state.step === 2 && (
              <div className="field">
                <label htmlFor="request-topic">موضوع درخواست</label>
                <select id="request-topic" value={state.topic} onChange={(event) => set('topic', event.target.value)} aria-invalid={Boolean(state.errors.topic)} aria-describedby={state.errors.topic ? 'topic-error' : undefined}><option value="">موضوع را انتخاب کنید</option>{topics.map((topic) => <option value={topic} key={topic}>{topic}</option>)}</select>
                {state.errors.topic && <span id="topic-error" className="field__error">{state.errors.topic}</span>}
              </div>
            )}

            {state.step === 3 && (
              <div className="wizard-fields">
                <div className="field field--wide"><label htmlFor="request-description">شرح مسئله</label><Textarea id="request-description" value={state.description} onChange={(event) => set('description', event.target.value)} className="form-control form-textarea" placeholder="رویدادهای اصلی، طرف‌های درگیر و مهلت‌های مهم را بنویسید." aria-invalid={Boolean(state.errors.description)} aria-describedby={state.errors.description ? 'description-error' : undefined} />{state.errors.description && <span id="description-error" className="field__error">{state.errors.description}</span>}</div>
                <div className="field field--wide"><label htmlFor="request-outcome">نتیجه مورد انتظار <small>اختیاری</small></label><Textarea id="request-outcome" value={state.outcome} onChange={(event) => set('outcome', event.target.value)} className="form-control" placeholder="در پایان این بررسی چه چیزی باید برای شما روشن شود؟" /></div>
                <div className="field field--wide"><label htmlFor="request-stage">مرحله فعلی</label><select id="request-stage" value={state.stage} onChange={(event) => set('stage', event.target.value)} aria-invalid={Boolean(state.errors.stage)} aria-describedby={state.errors.stage ? 'request-stage-error' : undefined}><option value="">انتخاب کنید</option>{stages.map((stage) => <option value={stage} key={stage}>{stage}</option>)}</select>{state.errors.stage && <span id="request-stage-error" className="field__error">{state.errors.stage}</span>}</div>
              </div>
            )}

            {state.step === 4 && <FileUpload files={state.files} uploadState={state.submitState === 'loading' ? 'uploading' : state.submitState === 'error' ? 'error' : 'idle'} onChange={(files) => set('files', files)} />}

            {state.step === 5 && (
              <fieldset className="urgency-cards" aria-invalid={Boolean(state.errors.urgency)} aria-describedby={state.errors.urgency ? 'request-urgency-error' : undefined}>
                <legend className="sr-only">فوریت</legend>
                {[
                  ['normal', 'عادی', 'مهلت نزدیک یا اثر فوری وجود ندارد.'],
                  ['important', 'مهم', 'تصمیم یا اقدام در روزهای پیش رو لازم است.'],
                  ['urgent', 'فوری', 'مهلت دقیق یا ریسک فوری در شرح مسئله ذکر شده است.'],
                ].map(([id, title, description]) => <button className={state.urgency === id ? 'is-selected' : ''} type="button" aria-pressed={state.urgency === id} onClick={() => set('urgency', id)} key={id}><span>{title}</span><small>{description}</small>{state.urgency === id && <Check />}</button>)}
                {state.errors.urgency && <span id="request-urgency-error" className="field__error">{state.errors.urgency}</span>}
              </fieldset>
            )}

            {state.step === 6 && (
              <div className="wizard-fields">
                <div className="field"><label htmlFor="wizard-name">نام و نام خانوادگی</label><Input id="wizard-name" value={state.name} onChange={(event) => set('name', event.target.value)} className="form-control" autoComplete="name" aria-invalid={Boolean(state.errors.name)} aria-describedby={state.errors.name ? 'wizard-name-error' : undefined} />{state.errors.name && <span id="wizard-name-error" className="field__error">{state.errors.name}</span>}</div>
                <div className="field"><label htmlFor="wizard-mobile">شماره موبایل</label><Input id="wizard-mobile" value={state.mobile} onChange={(event) => set('mobile', event.target.value)} className="form-control form-control--ltr" dir="ltr" type="tel" inputMode="numeric" autoComplete="tel" placeholder="0912 123 4567" aria-invalid={Boolean(state.errors.mobile)} aria-describedby={state.errors.mobile ? 'wizard-mobile-error' : undefined} />{state.errors.mobile && <span id="wizard-mobile-error" className="field__error">{state.errors.mobile}</span>}</div>
                <div className="field"><label htmlFor="wizard-email">ایمیل <small>اختیاری</small></label><Input id="wizard-email" value={state.email} onChange={(event) => set('email', event.target.value)} className="form-control form-control--ltr" dir="ltr" type="email" autoComplete="email" aria-invalid={Boolean(state.errors.email)} aria-describedby={state.errors.email ? 'wizard-email-error' : undefined} />{state.errors.email && <span id="wizard-email-error" className="field__error">{state.errors.email}</span>}</div>
                <div className="field"><label htmlFor="wizard-city">شهر</label><Input id="wizard-city" value={state.city} onChange={(event) => set('city', event.target.value)} className="form-control" autoComplete="address-level2" aria-invalid={Boolean(state.errors.city)} aria-describedby={state.errors.city ? 'wizard-city-error' : undefined} />{state.errors.city && <span id="wizard-city-error" className="field__error">{state.errors.city}</span>}</div>
              </div>
            )}

            {state.step === 7 && (
              <div className="wizard-review">
                <div className="review-grid">
                  <div><span>نوع درخواست</span><strong>{requestTypes.find((item) => item.id === state.requestType)?.title}</strong><button type="button" onClick={() => set('step', 1)}>ویرایش</button></div>
                  <div><span>موضوع</span><strong>{state.topic}</strong><button type="button" onClick={() => set('step', 2)}>ویرایش</button></div>
                  <div><span>فوریت</span><strong>{{ normal: 'عادی', important: 'مهم', urgent: 'فوری' }[state.urgency as Exclude<Urgency, ''>]}</strong><button type="button" onClick={() => set('step', 5)}>ویرایش</button></div>
                  <div><span>مدارک</span><strong>{state.files.length ? `${state.files.length} فایل` : 'بدون فایل'}</strong><button type="button" onClick={() => set('step', 4)}>ویرایش</button></div>
                </div>
                <div className="consent-box"><Checkbox id={privacyId} checked={state.privacy} onCheckedChange={(checked) => set('privacy', checked)} aria-invalid={Boolean(state.errors.privacy)} aria-describedby={state.errors.privacy ? 'wizard-privacy-error' : undefined} /><label htmlFor={privacyId}><strong>حریم خصوصی</strong><small>با بررسی اطلاعات در دامنه این درخواست موافقم.</small></label></div>
                {state.errors.privacy && <span id="wizard-privacy-error" className="field__error">{state.errors.privacy}</span>}
                <div className="consent-box"><Checkbox id={accuracyId} checked={state.accuracy} onCheckedChange={(checked) => set('accuracy', checked)} aria-invalid={Boolean(state.errors.accuracy)} aria-describedby={state.errors.accuracy ? 'wizard-accuracy-error' : undefined} /><label htmlFor={accuracyId}><strong>صحت اطلاعات</strong><small>تا حد آگاهی من، اطلاعات واردشده صحیح است.</small></label></div>
                {state.errors.accuracy && <span id="wizard-accuracy-error" className="field__error">{state.errors.accuracy}</span>}
              </div>
            )}
          </section>

          {state.statusMessage && <output className={`wizard-status is-${state.submitState}`} aria-live="polite">{state.submitState === 'error' && <TriangleAlert />}{state.statusMessage}</output>}

          <div className="wizard-actions">
            <button className="button button--ghost button--large" type="button" onClick={() => dispatch({ type: 'back' })} disabled={state.step === 1}><ArrowRight /> بازگشت</button>
            {state.step < 7 ? <button className="button button--primary button--large" type="button" onClick={next}>ادامه <ArrowLeft /></button> : <button className="button button--primary button--large" type="button" onClick={submit} disabled={state.submitState === 'loading'}>{state.submitState === 'loading' ? <LoaderCircle className="is-spinning" /> : <Send />} {state.submitState === 'loading' ? 'در حال ارسال' : 'ارسال نهایی'}</button>}
          </div>
        </form>
      </main>
    </div>
  );
}
