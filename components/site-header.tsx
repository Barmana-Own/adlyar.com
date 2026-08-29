'use client';

import { useEffect, useState } from 'react';
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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  { label: 'مشاوره حقوقی', href: '#legal-services', icon: CircleHelp },
  { label: 'قراردادها', href: '#legal-services', icon: FileSearch2 },
  { label: 'امور ملکی', href: '#legal-services', icon: Building2 },
  { label: 'شرکت‌ها و تجارت', href: '#legal-services', icon: Landmark },
];

const expertMenu = [
  { label: 'ملک و ساختمان', href: '#expert-services', icon: Building2 },
  { label: 'ارزیابی دارایی', href: '#expert-services', icon: Landmark },
  { label: 'خسارت و فنی', href: '#expert-services', icon: ShieldCheck },
  { label: 'فناوری اطلاعات', href: '#expert-services', icon: BookOpenText },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={'site-header' + (isScrolled ? ' is-scrolled' : '')}>
      <div className="container header__inner">
        <BrandMark />

        <nav className="desktop-nav" aria-label="ناوبری اصلی">
          <a className="is-active" href="#top">
            خانه
          </a>

          <div className="nav-menu">
            <button className="nav-menu__trigger" type="button" aria-haspopup="true">
              خدمات
              <ChevronDown aria-hidden="true" />
            </button>
            <div className="mega-menu">
              <div className="mega-menu__intro">
                <span className="mega-menu__eyebrow">انتخاب بر اساس مسئله</span>
                <strong>لازم نیست از ابتدا عنوان دقیق خدمت را بدانید.</strong>
                <p>موضوع را انتخاب کنید یا مستقیم برای بررسی اولیه توضیح دهید.</p>
                <a href="#need-selector">
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

          <a href="#expert-services">خدمات کارشناسی</a>
          <a href="#security">خدمات سازمانی</a>
          <a href="#process">متخصصان</a>
          <a href="#why-adlyar">مرکز دانش</a>
          <a href="#why-adlyar">درباره ما</a>
          <a href="#quick-request">تماس</a>
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
            <DialogContent className="search-dialog">
              <DialogHeader>
                <DialogTitle>در عدل‌یار دنبال چه چیزی هستید؟</DialogTitle>
                <DialogDescription>
                  نام خدمت یا موضوع مسئله را بنویسید.
                </DialogDescription>
              </DialogHeader>
              <label className="search-field">
                <span className="sr-only">عبارت جستجو</span>
                <Search aria-hidden="true" />
                <input name="query" placeholder="مثلاً بررسی قرارداد یا اختلاف ملکی" />
              </label>
              <div className="search-suggestions">
                <span>پیشنهادهای سریع</span>
                <a href="#legal-services">خدمات حقوقی</a>
                <a href="#expert-services">خدمات کارشناسی</a>
                <a href="#quick-request">راهنمای انتخاب خدمت</a>
              </div>
            </DialogContent>
          </Dialog>

          <a className="button button--ghost desktop-only" href="#quick-request">
            رزرو مشاوره
          </a>
          <a className="button button--primary" href="#quick-request">
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
                <SheetClose render={<a href="#top" aria-label="خانه" />}>خانه</SheetClose>
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
                <SheetClose render={<a href="#expert-services" aria-label="خدمات کارشناسی" />}>خدمات کارشناسی</SheetClose>
                <SheetClose render={<a href="#security" aria-label="خدمات سازمانی" />}>خدمات سازمانی</SheetClose>
                <SheetClose render={<a href="#process" aria-label="متخصصان" />}>متخصصان</SheetClose>
                <SheetClose render={<a href="#why-adlyar" aria-label="مرکز دانش" />}>مرکز دانش</SheetClose>
                <SheetClose render={<a href="#why-adlyar" aria-label="درباره ما" />}>درباره ما</SheetClose>
                <SheetClose render={<a href="#quick-request" aria-label="تماس" />}>تماس</SheetClose>
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
                  render={<a href="#quick-request" aria-label="ثبت درخواست" />}
                >
                  ثبت درخواست
                  <ArrowLeft aria-hidden="true" />
                </SheetClose>
                <SheetClose
                  className="button button--outline button--large"
                  render={<a href="#quick-request" aria-label="رزرو مشاوره" />}
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
