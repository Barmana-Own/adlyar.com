'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  BookOpenText,
  Building2,
  ChevronDown,
  CircleHelp,
  FileSearch2,
  Landmark,
  Menu,
  Search,
  ShieldCheck,
  UserRoundSearch,
} from 'lucide-react';

import { BrandMark } from '@/components/brand-mark';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const legalMenu = [
  { label: 'مشاوره حقوقی', href: '/legal-services/consultation', icon: CircleHelp },
  { label: 'قراردادها', href: '/legal-services/contracts', icon: FileSearch2 },
  { label: 'امور ملکی', href: '/legal-services/property', icon: Building2 },
  { label: 'شرکت‌ها و تجارت', href: '/legal-services/companies', icon: Landmark },
];

const expertMenu = [
  { label: 'ملک و ساختمان', href: '/expert-services/property-building', icon: Building2 },
  { label: 'ارزیابی دارایی', href: '/expert-services/valuation', icon: Landmark },
  { label: 'خسارت و فنی', href: '/expert-services/damage', icon: ShieldCheck },
  { label: 'فناوری اطلاعات', href: '/expert-services/information-technology', icon: BookOpenText },
];

const SearchDialogContent = dynamic(
  () => import('@/components/search-dialog').then((module) => module.SearchDialogContent),
  { ssr: false },
);

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!servicesMenuRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setServicesOpen(false);
      servicesTriggerRef.current?.focus();
    };
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [servicesOpen]);

  return (
    <header className={'site-header' + (isScrolled ? ' is-scrolled' : '')}>
      <div className="container header__inner">
        <BrandMark />

        <nav className="desktop-nav" aria-label="ناوبری اصلی">
          <a className={pathname === '/' ? 'is-active' : undefined} href="/">
            خانه
          </a>

          <div
            ref={servicesMenuRef}
            className={'nav-menu' + (servicesOpen ? ' is-open' : '')}
          >
            <button
              ref={servicesTriggerRef}
              className="nav-menu__trigger"
              type="button"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              aria-controls="services-mega-menu"
              onClick={() => setServicesOpen((current) => !current)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setServicesOpen(false);
              }}
            >
              خدمات
              <ChevronDown aria-hidden="true" />
            </button>
            <div className="mega-menu" id="services-mega-menu">
              <div className="mega-menu__intro">
                <span className="mega-menu__eyebrow">انتخاب بر اساس مسئله</span>
                <strong>لازم نیست از ابتدا عنوان دقیق خدمت را بدانید.</strong>
                <p>موضوع را انتخاب کنید یا مستقیم برای بررسی اولیه توضیح دهید.</p>
                <a href="/request">
                  راهنمای انتخاب خدمت
                  <ArrowLeft aria-hidden="true" />
                </a>
              </div>
              <div className="mega-menu__column">
                <span>خدمات حقوقی</span>
                {legalMenu.map(({ label, href, icon: Icon }) => (
                  <a href={href} key={label}>
                    <Icon aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </div>
              <div className="mega-menu__column">
                <span>خدمات کارشناسی</span>
                {expertMenu.map(({ label, href, icon: Icon }) => (
                  <a href={href} key={label}>
                    <Icon aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a className={pathname.startsWith('/expert-services') ? 'is-active' : undefined} href="/expert-services">خدمات کارشناسی</a>
          <a className={pathname === '/corporate' ? 'is-active' : undefined} href="/corporate">خدمات سازمانی</a>
          <a className={pathname.startsWith('/experts') ? 'is-active' : undefined} href="/experts">متخصصان</a>
          <a className={pathname.startsWith('/knowledge') ? 'is-active' : undefined} href="/knowledge">مرکز دانش</a>
          <a className={pathname === '/about' ? 'is-active' : undefined} href="/about">درباره ما</a>
          <a className={pathname === '/contact' ? 'is-active' : undefined} href="/contact">تماس</a>
        </nav>

        <div className="header__actions">
          <Dialog>
            <DialogTrigger
              render={
                <button
                  className="icon-button desktop-only"
                  type="button"
                  aria-label="باز کردن جستجو"
                />
              }
            >
              <Search aria-hidden="true" />
            </DialogTrigger>
            <SearchDialogContent />
          </Dialog>

          <a className="button button--ghost desktop-only" href="/book">
            رزرو مشاوره
          </a>
          <a className="button button--primary" href="/request">
            ثبت درخواست
          </a>

          <Sheet>
            <SheetTrigger
              render={
                <button className="icon-button mobile-menu" type="button" aria-label="باز کردن منو" />
              }
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent className="mobile-drawer" side="right">
              <SheetHeader>
                <SheetTitle className="mobile-drawer__title">منوی عدل‌یار</SheetTitle>
                <SheetDescription>دسترسی به خدمات و مسیرهای اصلی</SheetDescription>
              </SheetHeader>

              <nav className="mobile-nav" aria-label="ناوبری موبایل">
                <SheetClose render={<a href="/" aria-label="خانه" />}>خانه</SheetClose>
                <Accordion>
                  <AccordionItem value="services">
                    <AccordionTrigger className="mobile-nav__accordion">خدمات</AccordionTrigger>
                    <AccordionContent className="mobile-nav__subitems">
                      {legalMenu.map(({ label, href }) => (
                        <SheetClose render={<a href={href} aria-label={label} />} key={label}>
                          {label}
                        </SheetClose>
                      ))}
                      {expertMenu.slice(0, 2).map(({ label, href }) => (
                        <SheetClose render={<a href={href} aria-label={label} />} key={label}>
                          {label}
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <SheetClose render={<a href="/expert-services" aria-label="خدمات کارشناسی" />}>خدمات کارشناسی</SheetClose>
                <SheetClose render={<a href="/corporate" aria-label="خدمات سازمانی" />}>خدمات سازمانی</SheetClose>
                <SheetClose render={<a href="/experts" aria-label="متخصصان" />}>متخصصان</SheetClose>
                <SheetClose render={<a href="/knowledge" aria-label="مرکز دانش" />}>مرکز دانش</SheetClose>
                <SheetClose render={<a href="/about" aria-label="درباره ما" />}>درباره ما</SheetClose>
                <SheetClose render={<a href="/contact" aria-label="تماس" />}>تماس</SheetClose>
              </nav>

              <div className="mobile-drawer__support">
                <UserRoundSearch aria-hidden="true" />
                <div>
                  <strong>در انتخاب خدمت تردید دارید؟</strong>
                  <span>مسئله را ثبت کنید تا مسیر بررسی مشخص شود.</span>
                </div>
              </div>
              <div className="mobile-drawer__actions">
                <SheetClose
                  className="button button--primary button--large"
                  render={<a href="/request" aria-label="ثبت درخواست" />}
                >
                  ثبت درخواست
                  <ArrowLeft aria-hidden="true" />
                </SheetClose>
                <SheetClose
                  className="button button--outline button--large"
                  render={<a href="/book" aria-label="رزرو مشاوره" />}
                >
                  رزرو مشاوره
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
