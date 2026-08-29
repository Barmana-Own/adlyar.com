import {
  BadgeCheck,
  Banknote,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  BuildingIcon,
  CarFront,
  CircleHelp,
  ClipboardCheck,
  FileCheck2,
  FileClock,
  FileKey2,
  FileSearch2,
  Files,
  Fingerprint,
  Gavel,
  Handshake,
  HeartHandshake,
  Landmark,
  LaptopMinimalCheck,
  LockKeyhole,
  MessageSquareText,
  Network,
  ReceiptText,
  Route,
  ScanSearch,
  ShieldCheck,
  Siren,
  Stamp,
  UserRoundCheck,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';

export type HelpOption = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  subjects: string[];
};

export const trustItems = [
  {
    title: 'محرمانگی اطلاعات',
    description: 'اطلاعات درخواست فقط در مسیر بررسی مرتبط استفاده می‌شود.',
    icon: LockKeyhole,
  },
  {
    title: 'بررسی تخصصی',
    description: 'موضوع شما پیش از ارجاع، ساختاریافته و دسته‌بندی می‌شود.',
    icon: ScanSearch,
  },
  {
    title: 'فرآیند شفاف',
    description: 'مرحله بعد و اطلاعات موردنیاز، روشن و قابل پیگیری است.',
    icon: Route,
  },
  {
    title: 'مدیریت امن مدارک',
    description: 'مدارک باید در بستری غیرعمومی و با دسترسی کنترل‌شده مدیریت شوند.',
    icon: FileKey2,
  },
];

export const helpOptions: HelpOption[] = [
  {
    id: 'consultation',
    title: 'مشاوره حقوقی',
    description: 'برای تحلیل اولیه موضوع و شناخت مسیرهای پیش رو',
    icon: MessageSquareText,
    subjects: ['مشاوره عمومی', 'مشاوره خانواده', 'مشاوره ملکی', 'مشاوره تجاری'],
  },
  {
    id: 'case',
    title: 'وکیل / پیگیری پرونده',
    description: 'برای بررسی وضعیت پرونده و امکان پذیرش پیگیری',
    icon: Gavel,
    subjects: ['پرونده حقوقی', 'پرونده کیفری', 'پرونده خانواده', 'اجرای احکام'],
  },
  {
    id: 'expert',
    title: 'کارشناسی تخصصی',
    description: 'برای ارزیابی فنی، مالی یا موضوعی توسط متخصص',
    icon: ScanSearch,
    subjects: ['ملک و ساختمان', 'خسارت', 'مالی', 'فناوری اطلاعات'],
  },
  {
    id: 'contract',
    title: 'بررسی قرارداد',
    description: 'برای شناسایی ریسک‌ها، ابهام‌ها و تعهدات قراردادی',
    icon: FileSearch2,
    subjects: ['قرارداد در حال مذاکره', 'قرارداد امضاشده', 'پیش‌نویس قرارداد', 'اختلاف قراردادی'],
  },
  {
    id: 'valuation',
    title: 'ارزیابی ملک / دارایی',
    description: 'برای تعیین ارزش، بررسی وضعیت و تهیه گزارش تخصصی',
    icon: BuildingIcon,
    subjects: ['ارزیابی ملک', 'ارزیابی تجهیزات', 'ارزیابی خودرو', 'ارزیابی دارایی کسب‌وکار'],
  },
  {
    id: 'company',
    title: 'امور شرکت',
    description: 'برای قراردادها، مطالبات و مسائل حقوقی کسب‌وکار',
    icon: BriefcaseBusiness,
    subjects: ['ثبت و تغییرات شرکت', 'قراردادهای تجاری', 'مطالبات', 'اختلاف میان شرکا'],
  },
  {
    id: 'corporate',
    title: 'خدمات سازمانی',
    description: 'برای همکاری مستمر، پروژه‌ای یا میز حقوقی اختصاصی',
    icon: UsersRound,
    subjects: ['همکاری ماهانه', 'پروژه حقوقی', 'مدیریت قرارداد', 'ارزیابی ریسک'],
  },
  {
    id: 'unsure',
    title: 'مطمئن نیستم',
    description: 'مسئله را توضیح دهید تا نوع خدمت در بررسی اولیه مشخص شود',
    icon: CircleHelp,
    subjects: ['نیاز به راهنمایی برای انتخاب خدمت', 'موضوع ترکیبی', 'موضوع نامشخص'],
  },
];

export const legalServices: Array<{
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  featured?: 'wide' | 'tall';
}> = [
  {
    id: 'consultation',
    title: 'مشاوره حقوقی',
    description: 'تحلیل مسئله، مرور گزینه‌های قابل بررسی و روشن‌کردن قدم بعد.',
    tags: ['حضوری', 'آنلاین', 'مکتوب'],
    icon: MessageSquareText,
    featured: 'wide',
  },
  {
    id: 'contracts',
    title: 'قرارداد',
    description: 'تنظیم، بازبینی و شناسایی ریسک‌های حقوقی پیش از تعهد.',
    tags: ['تنظیم', 'بازبینی'],
    icon: FileCheck2,
    featured: 'tall',
  },
  {
    id: 'property',
    title: 'ملک',
    description: 'موضوعات ثبتی، مالکیت، سرقفلی، اجاره و اختلافات ملکی.',
    tags: ['ثبتی', 'مالکیت'],
    icon: Building2,
  },
  {
    id: 'family',
    title: 'خانواده',
    description: 'بررسی محرمانه مسائل خانواده با توجه به شرایط هر پرونده.',
    tags: ['محرمانه', 'شخصی'],
    icon: HeartHandshake,
  },
  {
    id: 'criminal',
    title: 'کیفری',
    description: 'تحلیل وضعیت، اسناد و اقدام‌های زمانی در پرونده‌های کیفری.',
    tags: ['بررسی فوری', 'دفاع'],
    icon: ShieldCheck,
  },
  {
    id: 'commercial',
    title: 'تجاری',
    description: 'اختلافات تجاری، تعهدات و روابط حقوقی کسب‌وکارها.',
    tags: ['کسب‌وکار', 'اختلاف'],
    icon: Handshake,
  },
  {
    id: 'collections',
    title: 'وصول مطالبات',
    description: 'بررسی اسناد بدهی و انتخاب مسیر مناسب مطالبه و پیگیری.',
    tags: ['اسناد', 'پیگیری'],
    icon: ReceiptText,
  },
  {
    id: 'companies',
    title: 'شرکت‌ها',
    description: 'تغییرات ثبتی، روابط شرکا و پشتیبانی حقوقی عملیات شرکت.',
    tags: ['ثبتی', 'شرکا'],
    icon: Landmark,
    featured: 'wide',
  },
];

export const expertServices = [
  {
    number: '۰۱',
    title: 'ملک و ساختمان',
    description: 'بررسی وضعیت بنا، عیوب، حدود، مشخصات فنی و موضوعات ثبتی مرتبط.',
    icon: Building2,
  },
  {
    number: '۰۲',
    title: 'ارزیابی',
    description: 'برآورد ارزش ملک، تجهیزات یا دارایی بر اساس دامنه تعریف‌شده.',
    icon: Banknote,
  },
  {
    number: '۰۳',
    title: 'خسارت',
    description: 'شناسایی منشأ، دامنه و مستندات خسارت برای تهیه گزارش تخصصی.',
    icon: Siren,
  },
  {
    number: '۰۴',
    title: 'خودرو و تصادف',
    description: 'بررسی فنی خودرو، خسارت و موضوعات کارشناسی ناشی از تصادف.',
    icon: CarFront,
  },
  {
    number: '۰۵',
    title: 'مالی',
    description: 'مرور اسناد مالی، محاسبات و اختلافات دارای جنبه حسابداری.',
    icon: ReceiptText,
  },
  {
    number: '۰۶',
    title: 'فنی',
    description: 'ارزیابی فنی تجهیزات، اجرا، کیفیت و انطباق با دامنه کار.',
    icon: ClipboardCheck,
  },
  {
    number: '۰۷',
    title: 'قرارداد و پیمان',
    description: 'بررسی صورت‌وضعیت، تأخیرات، تعهدات فنی و اختلافات پیمان.',
    icon: Stamp,
  },
  {
    number: '۰۸',
    title: 'فناوری اطلاعات',
    description: 'بررسی داده، سامانه، رخداد دیجیتال و موضوعات تخصصی فناوری.',
    icon: LaptopMinimalCheck,
  },
];

export const processSteps = [
  {
    number: '۰۱',
    title: 'ثبت درخواست',
    description: 'موضوع را با زبان خودتان توضیح می‌دهید؛ نیازی به انتخاب اصطلاح حقوقی دقیق نیست.',
    visual: 'درخواست شما ثبت شد',
    icon: FileCheck2,
  },
  {
    number: '۰۲',
    title: 'بررسی اولیه',
    description: 'اطلاعات، فوریت و مدارک اولیه برای تشخیص مسیر مناسب مرور می‌شود.',
    visual: 'مرور اطلاعات و فوریت',
    icon: ScanSearch,
  },
  {
    number: '۰۳',
    title: 'تعیین نوع خدمت',
    description: 'مشخص می‌شود موضوع به مشاوره، پیگیری حقوقی، کارشناسی یا ترکیبی از آن‌ها نیاز دارد.',
    visual: 'حقوقی + کارشناسی',
    icon: Route,
  },
  {
    number: '۰۴',
    title: 'ارجاع به متخصص',
    description: 'درخواست بر اساس موضوع و دامنه کار به متخصص مرتبط هدایت می‌شود.',
    visual: 'تطبیق تخصص مرتبط',
    icon: UserRoundCheck,
  },
  {
    number: '۰۵',
    title: 'اعلام دامنه و هزینه',
    description: 'پیش از شروع، محدوده خدمت، خروجی مورد انتظار و هزینه روشن می‌شود.',
    visual: 'دامنه خدمت مشخص شد',
    icon: FileClock,
  },
  {
    number: '۰۶',
    title: 'تأیید کاربر',
    description: 'پس از مرور شرایط، شروع همکاری با تأیید شما انجام می‌شود.',
    visual: 'در انتظار تأیید شما',
    icon: BadgeCheck,
  },
  {
    number: '۰۷',
    title: 'شروع خدمت',
    description: 'متخصص کار را طبق دامنه توافق‌شده و مدارک در دسترس آغاز می‌کند.',
    visual: 'فرآیند تخصصی فعال است',
    icon: BriefcaseBusiness,
  },
  {
    number: '۰۸',
    title: 'تحویل نتیجه یا ادامه پرونده',
    description: 'گزارش، نظر یا اقدام بعدی متناسب با نوع خدمت ارائه و مسیر ادامه مشخص می‌شود.',
    visual: 'خروجی آماده بررسی',
    icon: BookOpenCheck,
  },
];

export const benefits = [
  {
    title: 'بررسی اولیه ساختاریافته',
    description: 'اطلاعات پراکنده به یک شرح روشن و قابل ارجاع تبدیل می‌شود.',
    icon: ClipboardCheck,
  },
  {
    title: 'ارجاع به متخصص مرتبط',
    description: 'تخصص لازم بر اساس ماهیت مسئله تعیین می‌شود، نه حدس کاربر.',
    icon: UserRoundCheck,
  },
  {
    title: 'حقوقی و کارشناسی کنار هم',
    description: 'موضوعات ترکیبی میان دو مسیر گم نمی‌شوند.',
    icon: Network,
  },
  {
    title: 'حفظ محرمانگی',
    description: 'چرخه بررسی برای دسترسی محدود و کنترل‌شده طراحی شده است.',
    icon: LockKeyhole,
  },
  {
    title: 'شفافیت فرآیند',
    description: 'مرحله فعلی و قدم بعدی برای شما قابل فهم است.',
    icon: Route,
  },
  {
    title: 'مدیریت منظم مدارک',
    description: 'اسناد مرتبط با هر درخواست در یک جریان مشخص باقی می‌ماند.',
    icon: Files,
  },
];

export const securityFeatures = [
  {
    title: 'محرمانگی',
    description: 'اصل طراحی این مسیر، محدودکردن دسترسی به حد نیاز هر مرحله است.',
    icon: LockKeyhole,
  },
  {
    title: 'دسترسی کنترل‌شده',
    description: 'زیرساخت نهایی باید دسترسی هر نقش را به اطلاعات لازم همان مرحله محدود کند.',
    icon: Fingerprint,
  },
  {
    title: 'ذخیره‌سازی غیرعمومی',
    description: 'مدارک پرونده در معماری سامانه محتوای عمومی محسوب نمی‌شوند.',
    icon: FileKey2,
  },
  {
    title: 'لینک‌های امن',
    description: 'اشتراک‌گذاری سند باید در مسیر محدود و قابل کنترل انجام شود.',
    icon: ShieldCheck,
  },
  {
    title: 'کنترل دسترسی',
    description: 'سطح مشاهده و اقدام باید بر اساس مسئولیت هر فرد تعریف شود.',
    icon: UsersRound,
  },
  {
    title: 'ثبت رویدادهای امنیتی',
    description: 'زیرساخت نهایی باید رویدادهای مهم دسترسی را برای پیگیری ثبت کند.',
    icon: FileClock,
  },
];

export const quickFormCopy: Record<string, string> = {
  consultation: 'موضوعی را که برای تصمیم‌گیری درباره آن به مشاوره نیاز دارید، کوتاه توضیح دهید.',
  case: 'وضعیت فعلی پرونده، مرجع رسیدگی و اقدام بعدی موردنظر را بنویسید.',
  expert: 'موضوع کارشناسی، محل یا دارایی مرتبط و خروجی موردنیاز را شرح دهید.',
  contract: 'نوع قرارداد، مرحله فعلی و نگرانی اصلی خود را مشخص کنید.',
  valuation: 'نوع دارایی، محل و هدف ارزیابی را توضیح دهید.',
  company: 'مسئله شرکت، طرف‌های درگیر و نتیجه موردانتظار را بنویسید.',
  corporate: 'دامنه همکاری و نیاز اصلی سازمان را کوتاه شرح دهید.',
  unsure: 'نگران انتخاب عنوان دقیق نباشید؛ مسئله را با زبان خودتان توضیح دهید.',
};
