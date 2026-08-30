import { LogoIcon } from '@/components/logo-icon';

export function BrandMark() {
  return (
    <a className="brand" href="/" aria-label="عدل‌یار، صفحه اصلی">
      <span className="brand__mark" aria-hidden="true">
        <LogoIcon />
      </span>
      <span className="brand__text">
        <strong>عدل‌یار</strong>
        <small>حقوقی و کارشناسی</small>
      </span>
    </a>
  );
}
