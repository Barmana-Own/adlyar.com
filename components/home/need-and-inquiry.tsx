'use client';

import { type SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  LoaderCircle,
  Send,
  ShieldCheck,
} from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitQuickInquiry } from '@/lib/api-client';
import { safeApiMessage, safeServerFieldErrors } from '@/lib/api/form-errors';
import { helpOptions, quickFormCopy } from '@/lib/home-data';

type FormValues = {
  subject: string;
  description: string;
  name: string;
  mobile: string;
  city: string;
  urgency: 'normal' | 'important' | 'urgent';
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const initialValues: FormValues = {
  subject: '',
  description: '',
  name: '',
  mobile: '',
  city: '',
  urgency: 'normal',
  consent: false,
};

function toEnglishDigits(value: string) {
  const persian = '۰۱۲۳۴۵۶۷۸۹';
  const arabic = '٠١٢٣٤٥٦٧٨٩';
  return value
    .replace(/[۰-۹]/g, (digit) => String(persian.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabic.indexOf(digit)));
}

export function NeedAndInquiry() {
  const [selectedId, setSelectedId] = useState(helpOptions[0].id);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [mobileStep, setMobileStep] = useState<1 | 2>(1);
  const formRef = useRef<HTMLFormElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const inFlightRef = useRef(false);
  const idempotencyKeyRef = useRef<string | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const selected = useMemo(
    () => helpOptions.find((option) => option.id === selectedId) ?? helpOptions[0],
    [selectedId],
  );

  const updateValue = <Key extends keyof FormValues>(key: Key, value: FormValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    idempotencyKeyRef.current = null;
    if (submitState !== 'idle') {
      setSubmitState('idle');
      setStatusMessage('');
    }
  };

  const chooseNeed = (id: string) => {
    setSelectedId(id);
    idempotencyKeyRef.current = null;
    setValues((current) => ({ ...current, subject: '' }));
    setErrors((current) => ({ ...current, subject: undefined }));
    window.requestAnimationFrame(() => {
      document.querySelector('#quick-request')?.scrollIntoView({ block: 'start' });
    });
  };

  const validateStepOne = () => {
    const nextErrors: FormErrors = {};
    if (!values.subject) nextErrors.subject = 'نوع موضوع را انتخاب کنید.';
    if (values.description.trim().length < 20) {
      nextErrors.description = 'شرح مسئله را دست‌کم در ۲۰ نویسه بنویسید.';
    }
    setErrors((current) => ({ ...current, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const validateAll = () => {
    const nextErrors: FormErrors = {};
    const mobile = toEnglishDigits(values.mobile).replace(/[\s-]/g, '');

    if (!values.subject) nextErrors.subject = 'نوع موضوع را انتخاب کنید.';
    if (values.description.trim().length < 20) {
      nextErrors.description = 'شرح مسئله را دست‌کم در ۲۰ نویسه بنویسید.';
    }
    if (values.name.trim().length < 2) nextErrors.name = 'نام و نام خانوادگی را وارد کنید.';
    if (!/^09\d{9}$/.test(mobile)) nextErrors.mobile = 'شماره موبایل معتبر وارد کنید.';
    if (values.city.trim().length < 2) nextErrors.city = 'شهر مرتبط با موضوع را وارد کنید.';
    if (!values.consent) nextErrors.consent = 'پذیرش سیاست حریم خصوصی برای ارسال لازم است.';

    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      window.requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstError}"], #${firstError}`)
          ?.focus();
      });
    }

    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStepOne()) return;
    setMobileStep(2);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    formRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlightRef.current || submitState === 'loading' || !validateAll()) return;
    inFlightRef.current = true;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const idempotencyKey = idempotencyKeyRef.current ?? crypto.randomUUID();
    idempotencyKeyRef.current = idempotencyKey;

    setSubmitState('loading');
    setStatusMessage('در حال ارسال درخواست…');

    try {
      await submitQuickInquiry(
        {
          needType: selected.id,
          subject: values.subject,
          description: values.description.trim(),
          name: values.name.trim(),
          mobile: toEnglishDigits(values.mobile).replace(/[\s-]/g, ''),
          city: values.city.trim(),
          urgency: values.urgency,
          consent: values.consent,
        },
        { signal: controller.signal, idempotencyKey },
      );
      idempotencyKeyRef.current = null;
      setSubmitState('success');
      setStatusMessage('درخواست شما ثبت شد و برای بررسی اولیه در صف قرار گرفت.');
      setValues(initialValues);
      setMobileStep(1);
    } catch (error) {
      const fieldErrors = safeServerFieldErrors(error, Object.keys(initialValues));
      if (Object.keys(fieldErrors).length) setErrors({ ...errors, ...fieldErrors });
      setSubmitState('error');
      setStatusMessage(safeApiMessage(error, 'فرم آماده است، اما اتصال آن به سامانه پذیرش این محیط هنوز فعال نشده است.'));
    } finally {
      inFlightRef.current = false;
      if (controllerRef.current === controller) controllerRef.current = null;
    }
  };

  return (
    <>
      <section className="section need-section" id="need-selector">
        <div className="container">
          <div className="section-heading section-heading--split" data-reveal>
            <div>
              <span className="section-kicker">شروع از مسئله، نه اصطلاحات</span>
              <h2>چه نوع کمکی نیاز دارید؟</h2>
            </div>
            <p>
              نزدیک‌ترین گزینه را انتخاب کنید. اگر مطمئن نیستید، توضیح مسئله برای
              شروع بررسی کافی است.
            </p>
          </div>

          <div className="need-grid" data-reveal>
            {helpOptions.map(({ id, title, description, icon: Icon }, index) => {
              const isSelected = selectedId === id;
              return (
                <button
                  className={'need-card' + (isSelected ? ' is-selected' : '')}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => chooseNeed(id)}
                  key={id}
                  style={{ '--item-index': index } as React.CSSProperties}
                >
                  <span className="need-card__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="need-card__copy">
                    <strong>{title}</strong>
                    <small>{description}</small>
                  </span>
                  <span className="need-card__arrow">
                    {isSelected ? <Check aria-hidden="true" /> : <ChevronLeft aria-hidden="true" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section quick-section" id="quick-request">
        <div className="container">
          <div className="quick-shell" data-reveal>
            <aside className="quick-context" key={selected.id}>
              <span className="quick-context__index">بررسی اولیه</span>
              <div className="quick-context__icon">
                <selected.icon aria-hidden="true" />
              </div>
              <h2>{selected.title}</h2>
              <p>{quickFormCopy[selected.id]}</p>
              <ul>
                <li>
                  <ShieldCheck aria-hidden="true" />
                  اطلاعات فقط برای بررسی همین درخواست دریافت می‌شود.
                </li>
                <li>
                  <Check aria-hidden="true" />
                  انتخاب نهایی نوع خدمت پس از بررسی اولیه انجام می‌شود.
                </li>
              </ul>
              <div className="quick-context__steps" aria-label="مراحل فرم در موبایل">
                <span className={mobileStep === 1 ? 'is-active' : 'is-complete'}>۱</span>
                <i />
                <span className={mobileStep === 2 ? 'is-active' : ''}>۲</span>
              </div>
            </aside>

            <form ref={formRef} className="quick-form" onSubmit={handleSubmit} noValidate>
              <div className="quick-form__header">
                <div>
                  <span>فرم کوتاه درخواست</span>
                  <h3>مسئله‌تان را کوتاه توضیح دهید</h3>
                </div>
                <span className="quick-form__time">حدود ۲ دقیقه</span>
              </div>

              <div className={'quick-form__step' + (mobileStep === 1 ? ' is-mobile-active' : '')}>
                <div className="field">
                  <label htmlFor="subject">نوع موضوع</label>
                  <select
                    id="subject"
                    name="subject"
                    value={values.subject}
                    onChange={(event) => updateValue('subject', event.target.value)}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  >
                    <option value="">یک موضوع را انتخاب کنید</option>
                    {selected.subjects.map((subject) => (
                      <option value={subject} key={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <span className="field__error" id="subject-error">
                      {errors.subject}
                    </span>
                  )}
                </div>

                <div className="field field--wide">
                  <label htmlFor="description">شرح کوتاه مسئله</label>
                  <Textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={(event) => updateValue('description', event.target.value)}
                    placeholder="در چند جمله بگویید چه اتفاقی افتاده و چه نتیجه‌ای می‌خواهید."
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? 'description-error' : 'description-hint'}
                    className="form-control form-textarea"
                  />
                  <span className="field__hint" id="description-hint">
                    اگر مهلت قانونی یا تاریخ مشخصی دارید، همین‌جا ذکر کنید.
                  </span>
                  {errors.description && (
                    <span className="field__error" id="description-error">
                      {errors.description}
                    </span>
                  )}
                </div>

                <button className="button button--primary button--large mobile-step-button" type="button" onClick={handleNext}>
                  ادامه
                  <ArrowLeft aria-hidden="true" />
                </button>
              </div>

              <div className={'quick-form__step quick-form__step--details' + (mobileStep === 2 ? ' is-mobile-active' : '')}>
                <div className="field">
                  <label htmlFor="name">نام و نام خانوادگی</label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={(event) => updateValue('name', event.target.value)}
                    placeholder="نام شما"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className="form-control"
                  />
                  {errors.name && <span className="field__error" id="name-error">{errors.name}</span>}
                </div>

                <div className="field">
                  <label htmlFor="mobile">شماره موبایل</label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    dir="ltr"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={values.mobile}
                    onChange={(event) => updateValue('mobile', event.target.value)}
                    placeholder="0912 123 4567"
                    aria-invalid={Boolean(errors.mobile)}
                    aria-describedby={errors.mobile ? 'mobile-error' : undefined}
                    className="form-control form-control--ltr"
                  />
                  {errors.mobile && <span className="field__error" id="mobile-error">{errors.mobile}</span>}
                </div>

                <div className="field">
                  <label htmlFor="city">شهر</label>
                  <Input
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    value={values.city}
                    onChange={(event) => updateValue('city', event.target.value)}
                    placeholder="شهر مرتبط با موضوع"
                    aria-invalid={Boolean(errors.city)}
                    aria-describedby={errors.city ? 'city-error' : undefined}
                    className="form-control"
                  />
                  {errors.city && <span className="field__error" id="city-error">{errors.city}</span>}
                </div>

                <fieldset className="field urgency-field">
                  <legend>فوریت</legend>
                  <div className="urgency-options">
                    {[
                      ['normal', 'عادی'],
                      ['important', 'مهم'],
                      ['urgent', 'فوری'],
                    ].map(([value, label]) => (
                      <label key={value}>
                        <input
                          type="radio"
                          name="urgency"
                          value={value}
                          checked={values.urgency === value}
                          onChange={() =>
                            updateValue('urgency', value as FormValues['urgency'])
                          }
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="consent-field field--wide">
                  <Checkbox
                    id="consent"
                    name="consent"
                    checked={values.consent}
                    onCheckedChange={(checked) => updateValue('consent', checked)}
                    aria-invalid={Boolean(errors.consent)}
                  />
                  <label htmlFor="consent">
                    با ارسال این فرم، بررسی اطلاعات طبق سیاست حریم خصوصی را می‌پذیرم.
                  </label>
                  {errors.consent && (
                    <span className="field__error" id="consent-error">
                      {errors.consent}
                    </span>
                  )}
                </div>

                <div className="quick-form__footer field--wide">
                  <button className="button button--ghost mobile-back-button" type="button" onClick={() => setMobileStep(1)}>
                    <ArrowRight aria-hidden="true" />
                    بازگشت
                  </button>
                  <button
                    className="button button--primary button--large"
                    type="submit"
                    disabled={submitState === 'loading'}
                  >
                    {submitState === 'loading' ? (
                      <LoaderCircle className="is-spinning" aria-hidden="true" />
                    ) : (
                      <Send aria-hidden="true" />
                    )}
                    {submitState === 'loading' ? 'در حال ارسال' : 'ارسال برای بررسی'}
                  </button>
                </div>
              </div>

              <output
                className={'form-status' + (submitState !== 'idle' ? ' is-visible is-' + submitState : '')}
                aria-live="polite"
              >
                {statusMessage}
              </output>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
