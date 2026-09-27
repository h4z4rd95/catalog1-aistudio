// ===========================================================================
// 123SERVICE STUDIO SITE — SINGLE SOURCE OF TRUTH (ALL PERSIAN COPY & DATA)
// No UI text is hardcoded in components; packages map 1:1 to shop products.
// ===========================================================================

export interface StudioService {
  id: string;
  number: string;
  title: string;
  category: 'DESIGN' | 'TECH';
  categoryLabel: string;
  tagline: string;
  description: string;
  deliverables: string[];
  timeline: string;
  route: string;
  featured?: boolean;
}

export interface StudioPackage {
  id: string;
  sku: string;
  title: string;
  category: string;
  priceToman: string;
  priceUsd: number;
  badge?: string;
  summary: string;
  features: string[];
  timeline: string;
  turnkeyGuaranteed: boolean;
}

export interface SignalLogEntry {
  id: string;
  index: string;
  sender: string;
  timestamp: string;
  subject: string;
  dialoguePacket: string[];
  status: 'TRANSMITTED' | 'DECODED' | 'ARCHIVED';
  tag: string;
}

export interface FaqItem {
  number: string;
  question: string;
  answer: string;
  tag: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  metric: string;
  pinAngle: number;
  highlightTag: string;
}

export const SITE_CONTENT = {
  brand: {
    name: '123Service',
    faName: 'استودیو ۱۲۳سرویس',
    motif: '123',
    descriptor: 'DIGITAL CREATIVE ENGINE',
    descriptorFa: 'موتور خلاقیت دیجیتال',
    headline: 'نقطه پیوند وب، هوش مصنوعی، گرافیک و موشن دیزاین',
    manifesto:
      'ما در مرز باریک میان دقت مهندسی و آشفتگی خلاقانه کار می‌کنیم. هر خط کد، هر فریم موشن و هر زاویه تایپوگرافی با هدف شکستن کلیشه‌ها و خلق اثر ماندگار خلق می‌شود.',
    status: 'AVAILABLE FOR Q2/Q3 PROJECTS',
    statusFa: 'آماده پذیرش پروژه‌های شاخص',
    location: 'TEHRAN & REMOTE GLOBAL // ۳۵.۶۸۹۲° N, ۵۱.۳۸۹۰° E',
  },

  tensions: [
    {
      title: 'Precision × Chaos',
      titleFa: 'دقت ریاضی × آشفتگی خلاقانه',
      descFa: 'گرید دقیق ۱۲ ستونه که المان‌ها به عمد از مرزهای آن بیرون می‌زنند و نظم را بازتعریف می‌کنند.',
      index: '01',
    },
    {
      title: 'Technology × Human Creativity',
      titleFa: 'فناوری و الگوریتم × حس انسانی',
      descFa: 'هندسه‌های سه‌بعدی محاسباتی Three.js در کنار روایت‌های قلم‌خورده ادیتوریال و تایپوگرافی اصیل.',
      index: '02',
    },
    {
      title: 'System × Experimentation',
      titleFa: 'ساختار سیستماتیک × آزمایشگری جسورانه',
      descFa: 'سیستم توکن صلب و استاندارد که لایوت‌های ساختارشکن و غیرتکراری را به حرکت درمی‌آورد.',
      index: '03',
    },
  ],

  disciplines: [
    { index: '01', code: 'WEB', labelFa: 'طراحی و مهندسی وب', descFa: 'توسعه فرانترند پیشرو، انیمیشن‌های تعاملی و وب‌سایت‌های برنده Awwwards' },
    { index: '02', code: 'AI', labelFa: 'هوش مصنوعی و ربات‌ها', descFa: 'ربات‌های هوشمند شبکه‌های اجتماعی، خودکارسازی فرآیند و ایجنت‌های اختصاصی' },
    { index: '03', code: 'DESIGN', labelFa: 'هویت بصری و موشن', descFa: 'طراحی برندینگ جامع، تایپوگرافی متغیر، تصویرسازی و بسته‌بندی فاخر' },
  ],

  services: [
    // طراحی
    {
      id: 'logo-identity',
      number: '01',
      title: 'طراحی لوگو و هویت بصری',
      category: 'DESIGN',
      categoryLabel: 'طراحی',
      tagline: 'خلق جوهره غیرقابل کپی برند',
      description: 'تدوین سیستم جامع هویت سازمانی شامل گایدلاین تایپوگرافی، پالت رنگ، نشان هندسی و سیستم بصری چندرسانه‌ای.',
      deliverables: ['لوگومارک و تایپ‌فیس اختصاصی', 'دفترچه راهنمای هویت (Brand Guidelines)', 'ست اداری کامل و آیکونوگرافی'],
      timeline: '۳ الی ۴ هفته',
      route: '/services/logo-identity',
      featured: true,
    },
    {
      id: 'print-packaging',
      number: '02',
      title: 'اقلام چاپی و بسته‌بندی لوکس',
      category: 'DESIGN',
      categoryLabel: 'طراحی',
      tagline: 'تجربه لمسی و فیزیکی برند در دست مشتری',
      description: 'طراحی بسته‌بندی‌های نوآورانه با برش‌های ساختاری خاص، چاپ طلاکوب، یووی موضعی و تجربه آنباکسینگ به‌یادماندنی.',
      deliverables: ['دایکات ساختاری بسته‌بندی', 'فایل‌های استاندارد لیتوگرافی', 'موکاپ‌های سه‌بعدی رندر صنعتی'],
      timeline: '۲ الی ۳ هفته',
      route: '/services/print-packaging',
    },
    {
      id: 'editorial-books',
      number: '03',
      title: 'جلد کتاب و صفحه‌آرایی ادیتوریال',
      category: 'DESIGN',
      categoryLabel: 'طراحی',
      tagline: 'هارمونی خط، فضای سفید و معماری صفحات',
      description: 'صفحه‌آرایی تخصصی مجلات و کتاب‌های هنری با سیستم‌های گرید مدولار و ترکیب تایپوگرافی کهن و مدرن فارسی.',
      deliverables: ['جلد اصلی و عطف کتاب', 'شبکه گرید اختصاصی صفحات', 'مدیریت حرفه‌ای علائم ویرایشی فارسی'],
      timeline: '۲ هفته',
      route: '/services/editorial-books',
    },
    {
      id: 'illustration-posters',
      number: '04',
      title: 'تصویرسازی و پوسترهای مفهومی',
      category: 'DESIGN',
      categoryLabel: 'طراحی',
      tagline: 'بیان بصری داستان‌های پیچیده با یک نگاه',
      description: 'تصویرسازی‌های دستی و دیجیتال با سبک‌های متمایز هنری برای لندینگ‌ها، کمپین‌های تبلیغاتی و رویدادهای ملی و بین‌المللی.',
      deliverables: ['آرت‌وورک‌های وکتوری مقیاس‌پذیر', 'پوسترهای چاپی رزولوشن بالا', 'لایه‌های متحرک‌سازی موشن'],
      timeline: '۱۰ الی ۱۴ روز',
      route: '/services/illustration-posters',
    },
    {
      id: 'motion-logomotion',
      number: '05',
      title: 'موشن گرافیک و لوگوموشن',
      category: 'DESIGN',
      categoryLabel: 'طراحی',
      tagline: 'جان بخشیدن به گرافیک با سینماتیک و صدا',
      description: 'انیمیشن‌های داستانی با فیزیک و ایزینگ‌های واقع‌گرایانه، انیمیشن امضای برند و موشن ویدیوهای معرفی خدمات.',
      deliverables: ['لوگوموشن با طراحی صدای اختصاصی (SFX)', 'اکسپورت Lottie / JSON برای وب', 'ویدیوهای 4K با کدک حرفه‌ای ProRes'],
      timeline: '۲ الی ۳ هفته',
      route: '/services/motion-logomotion',
      featured: true,
    },
    {
      id: 'video-editing',
      number: '06',
      title: 'تدوین ویدیو و جلوه‌های ویژه',
      category: 'DESIGN',
      categoryLabel: 'طراحی',
      tagline: 'ریتم تند، اصلاح رنگ سینمایی و افکت‌های بصری',
      description: 'تدوین فیلم‌های تبلیغاتی، ریلزهای پربازدید و معرفی محصول با استانداردهای تصحیح رنگ DaVinci Resolve.',
      deliverables: ['تدوین کامل به همراه Sound Design', 'کالرگریدینگ سینمایی اختصاصی', 'کات‌های بهینه‌شده برای اینستاگرام و یوتیوب'],
      timeline: '۱ الی ۲ هفته',
      route: '/services/video-editing',
    },

    // برنامه‌نویسی و هوش مصنوعی
    {
      id: 'web-design',
      number: '07',
      title: 'طراحی و توسعه وب‌سایت‌های تعاملی',
      category: 'TECH',
      categoryLabel: 'برنامه‌نویسی',
      tagline: 'توسعه فرانترند Next-Gen برنده جوایز بین‌المللی',
      description: 'پیاده‌سازی وب‌سایت‌های فوق‌العاده سریع با React، Three.js، شیدرهای کانوَس، انیمیشن‌های مبتنی بر اسکرول و سئو تکنیکال بی‌نقص.',
      deliverables: ['کدنویسی تمیز با TypeScript', 'انیمیشن‌های تعاملی روان (60fps)', 'امتیاز ۱۰۰ در Google PageSpeed'],
      timeline: '۴ الی ۶ هفته',
      route: '/services/web-design',
      featured: true,
    },
    {
      id: 'seo-growth',
      number: '08',
      title: 'سئو و رشد رتبه موتورهای جستجو',
      category: 'TECH',
      categoryLabel: 'برنامه‌نویسی',
      tagline: 'تسخیر رتبه‌های نخست گوگل با استراتژی پایدار',
      description: 'سئو فنی پیشرفته، اسکیماهای معنایی JSON-LD، لینک‌سازی تخصصی و تولید محتوای هوشمند جهت فتح کیوردهای پررقابت صنعت شما.',
      deliverables: ['آدیت جامع سئو تکنیکال', 'نقشه جامع کیوردهای سودآور', 'گزارش ماهانه رشد ترافیک ارگانیک'],
      timeline: 'قرارداد ۶ ماهه الی ۱ ساله',
      route: '/services/seo-growth',
    },
    {
      id: 'digital-ads',
      number: '09',
      title: 'تبلیغات اینترنتی و پرفورمنس مارکتینگ',
      category: 'TECH',
      categoryLabel: 'برنامه‌نویسی',
      tagline: 'تبدیل هر ریال بودجه تبلیغات به لید و مشتری دست‌به‌نقد',
      description: 'مدیریت کمپین‌های Google Ads، تبلیغات کلیکی، ریتارگتینگ هوشمند و بهینه‌سازی نرخ تبدیل صفحات فرود (CRO).',
      deliverables: ['ستاپ کمپین‌های جستجو و بنری', 'تست A/B مداوم صفحات فرود', 'داشبورد زنده آنالیتیکس و ROI'],
      timeline: 'مدیریت ماهانه',
      route: '/services/digital-ads',
    },
    {
      id: 'social-bots',
      number: '10',
      title: 'ساخت ربات هوشمند شبکه‌های اجتماعی',
      category: 'TECH',
      categoryLabel: 'هوش مصنوعی',
      tagline: 'سفارشی‌ترین سرویس ۱۲۳سرویس با پردازش زبان طبیعی و ایجنت خودکار',
      description: 'طراحی و استقرار ربات‌های تمام‌خودکار تلگرام، بله، ایتا، دیسکورد و اینستاگرام با اتصال به LLM، پایگاه داده، پنل مدیریت اختصاصی و وب‌هوک‌های امن.',
      deliverables: ['ربات اختصاصی تلگرام / بله با سرور داخلی', 'اتصال به هوش مصنوعی فارسی با پرامپت اختصاصی', 'پنل ادمین وب با آمار تراکنش‌ها و لیدها'],
      timeline: '۲ الی ۳ هفته',
      route: '/services/social-bots',
      featured: true,
    },
  ] as StudioService[],

  packages: [
    {
      id: 'pkg-studio-identity',
      sku: 'PKG-ID-01',
      title: 'پکیج هویت بصری استارت‌آپ (Launchpad Identity)',
      category: 'طراحی برند',
      priceToman: '۳۸,۵۰۰,۰۰۰ تومان',
      priceUsd: 650,
      badge: 'پرفروش‌ترین طراحی',
      summary: 'بسته جامع ورود به بازار برای برندهایی که می‌خواهند از روز اول متمایز و حرفه‌ای دیده شوند.',
      features: [
        'طراحی لوگوی اصلی و واریاسیون‌های افقی و عمودی',
        'گایدلاین رسمی رنگ‌ها، تایپوگرافی و الگوی سازمانی',
        'طراحی کامل ست اوراق اداری و کارت ویزیت هوشمند NFC',
        'قالب‌های اختصاصی پست و استوری اینستاگرام',
        'لوگوموشن اختصاصی ۵ ثانیه‌ای با صداگذاری سینمایی',
      ],
      timeline: '۲۰ روز کاری',
      turnkeyGuaranteed: true,
    },
    {
      id: 'pkg-awwwards-web',
      sku: 'PKG-WEB-02',
      title: 'پکیج وب‌سایت پرچمدار و تعاملی (Flagship Web Experience)',
      category: 'توسعه وب و کدنویسی',
      priceToman: '۸۹,۰۰۰,۰۰۰ تومان',
      priceUsd: 1490,
      badge: 'کیفیت Awwwards',
      summary: 'طراحی وب‌سایت اختصاصی با انیمیشن‌های مبتنی بر اسکرول، تعاملات سه‌بعدی Three.js و پنل مدیریت قدرتمند.',
      features: [
        'طراحی UI/UX بدون قالب آماده با فیگما',
        'توسعه فرانت‌اند تعاملی با انیمیشن‌های 60fps',
        'پشتیبانی دو زبانه کامل (فارسی RTL و انگلیسی LTR)',
        'بهینه‌سازی سرعت و لودینگ زیر ۱.۸ ثانیه',
        '۱ سال پشتیبانی فنی، هاستینگ اختصاصی و مانیتورینگ',
      ],
      timeline: '۳۵ روز کاری',
      turnkeyGuaranteed: true,
    },
    {
      id: 'pkg-social-ai-bot',
      sku: 'PKG-BOT-03',
      title: 'پکیج ربات هوشمند چندمنظوره (OmniChannel AI Agent)',
      category: 'هوش مصنوعی و ربات',
      priceToman: '۴۲,۰۰۰,۰۰۰ تومان',
      priceUsd: 720,
      badge: 'سرویس ویژه ۱۲۳',
      summary: 'ربات فروشنده و پشتیبان ۲۴ ساعته برای تلگرام، اینستاگرام یا بله با درک زبان محاوره‌ای فارسی.',
      features: [
        'اتصال به پایگاه داده محصولات و استعلام خودکار موجودی و قیمت',
        'موتور هوش مصنوعی برای پاسخ‌دهی هوشمند به سوالات رایج کاربران',
        'پنل تحت وب جهت مشاهده پیام‌ها، ارسال نوتیفیکیشن همگانی و آمار',
        'اتصال امن به درگاه‌های پرداخت شتابی و صدور فاکتور آنی',
        'سرور اختصاصی ایزوله با آپتایم ۹۹.۹٪ بدون قطعی',
      ],
      timeline: '۱۵ روز کاری',
      turnkeyGuaranteed: true,
    },
    {
      id: 'pkg-fullstack-engine',
      sku: 'PKG-ALL-04',
      title: 'پکیج جامع موتور دیجیتال برند (Full-Throttle Creative Engine)',
      category: 'اکوسیستم کامل',
      priceToman: '۱۵۵,۰۰۰,۰۰۰ تومان',
      priceUsd: 2600,
      badge: 'سفارش اختصاصی سازمان‌ها',
      summary: 'ترکیب کامل هویت بصری، وب‌سایت پرچمدار، ربات فروشگاهی و کمپین موشن گرافیک برای تحول کامل کسب‌وکار.',
      features: [
        'تمام آیتم‌های پکیج هویت بصری + وب‌سایت پرچمدار + ربات هوشمند',
        'طراحی موشن گرافیک معرفی ۶۰ ثانیه‌ای با نریشن استودیویی',
        'استراتژی ۳ ماهه سئو و تولید محتوای تکنیکال',
        'تیم پشتیبانی اختصاصی با خط تلفن مستقیم و اولویت VIP',
      ],
      timeline: '۵۰ روز کاری',
      turnkeyGuaranteed: true,
    },
  ] as StudioPackage[],

  signalLog: [
    {
      id: 'sig-01',
      index: 'PKT-001',
      sender: 'AGENT_123 // SENSOR_ARRAY',
      timestamp: '2026-09-25 14:02:18 UTC',
      subject: 'انعکاس اولین پالس خلاقیت دیجیتال در مدار تهران',
      dialoguePacket: [
        '[SYS_INIT] پروتکل هویت ۱۲۳سرویس فعال شد. تمامی گریدها بررسی گردید.',
        '[USER_PROMPT] وب‌سایتی می‌خواهیم که هیچ شباهتی به قالب‌های آماده بازار نداشته باشد.',
        '[ENGINE_RESP] تایید شد. استقرار هندسه‌های سه‌بعدی محاسباتی در کنار تایپوگرافی درشت.',
        '[STATUS] تداخل سازنده میان نظم و آشفتگی تایید شد. سیگنال پایدار است.',
      ],
      status: 'TRANSMITTED',
      tag: 'ARCHITECTURE',
    },
    {
      id: 'sig-02',
      index: 'PKT-002',
      sender: 'CORE_DISPATCH // BOT_FACTORY',
      timestamp: '2026-09-25 15:30:45 UTC',
      subject: 'تکمیل چرخه ساخت ربات هوشمند با پردازش زبان طبیعی فارسی',
      dialoguePacket: [
        '[BOT_DEPLOY] ماژول تلگرام و شبکه‌های داخلی همگام‌سازی شد.',
        '[NLP_CORE] پردازش زبان عامیانه فارسی با دقت ۹۸.۲٪ به نتیجه رسید.',
        '[CLIENT_PING] آیا سفارشات مشتریان در کمتر از ۳ ثانیه ثبت می‌شود؟',
        '[BOT_EXEC] بله، اتصال مستقیم به وب‌هوک درگاه بانکی فعال است.',
      ],
      status: 'DECODED',
      tag: 'AI_AGENT',
    },
    {
      id: 'sig-03',
      index: 'PKT-003',
      sender: 'MOTION_STUDIO // FRAME_PIPELINE',
      timestamp: '2026-09-25 16:45:11 UTC',
      subject: 'رندرینگ نهایی مارپیچ دوبل DNA و حرکت بر اساس اسکرول',
      dialoguePacket: [
        '[RENDER_PIPELINE] محاسبه ۱۲۰ گره در فضای وب‌جی‌ال انجام پذیرفت.',
        '[SCROLL_SYNC] نرخ چرخش دقیقاً منطبق بر شتاب اسکرول موس کاربر کالیبره شد.',
        '[RESULT] بدون هیچ افت فریمی روی مانیتورهای ۱۲۰ هرتز پرو رندر شد.',
      ],
      status: 'ARCHIVED',
      tag: 'WEBGL_3D',
    },
  ] as SignalLogEntry[],

  stats: [
    { value: 148, suffix: '+', labelFa: 'پروژه‌های شاخص تحویل‌شده', metric: 'DELIVERED RIGS & SITES' },
    { value: 99.4, suffix: '%', labelFa: 'رضایت کارفرمایان و پایداری قرارداد', metric: 'CLIENT RETENTION RATE' },
    { value: 18, suffix: 'AWARDS', labelFa: 'نشان‌های بین‌المللی و افتخارات طراحی', metric: 'HONORS & NOMINATIONS' },
    { value: 4.8, suffix: 'X', labelFa: 'میانگین رشد نرخ تبدیل مشتریان', metric: 'CONVERSION VELOCITY' },
  ],

  testimonials: [
    {
      id: 'test-01',
      name: 'مهندس آرش سپهری',
      role: 'بنیان‌گذار و مدیرعامل',
      company: 'نئوتک اینوستمنت',
      quote:
        '۱۲۳سرویس به معنای واقعی یک شریک استراتژیک است، نه صرفاً یک آژانس اجرایی. وب‌سایت و هویت بصری که برای ما خلق کردند باعث شد در اولین راند جذب سرمایه بین‌المللی با اعتمادبه‌نفس کامل حاضر شویم.',
      metric: 'جذب ۳.۲ میلیون دلار در فاز A',
      pinAngle: -2.5,
      highlightTag: 'پروژه وب و برندینگ',
    },
    {
      id: 'test-02',
      name: 'دکتر صبا معتمدی',
      role: 'مدیر بازاریابی دیجیتال',
      company: 'هلدینگ زعفران بارمان',
      quote:
        'ربات هوشمندی که برای ثبت سفارش اینستاگرام و بله ما طراحی کردند، ظرف یک ماه بار پشتیبانی تیم ما را ۷۰٪ کاهش داد و فروش مستقیم شبانه ما را سه برابر کرد!',
      metric: '+۲۳۰٪ فروش مستقیم خودکار',
      pinAngle: 3.0,
      highlightTag: 'ربات هوش مصنوعی',
    },
    {
      id: 'test-03',
      name: 'کامران یزدانی',
      role: 'کارگردان خلاقیت',
      company: 'استودیو پدیدار',
      quote:
        'دقت این تیم در جزئیات تایپوگرافی فارسی، انیمیشن‌های اسکرول و عدم استفاده از المان‌های تکراری بازار ستودنی است. خروجی نهایی استاندارد واقعی Awwwards دارد.',
      metric: 'سایت منتخب ماه دیزاین',
      pinAngle: -1.8,
      highlightTag: 'دیزاین سفارشی',
    },
  ] as TestimonialItem[],

  faqs: [
    {
      number: '01',
      question: 'چرا نام ۱۲۳سرویس و موتیف عددی ۱۲۳ را انتخاب کرده‌اید؟',
      answer:
        '۱۲۳ برای ما نماد آغاز پیوسته و گام‌به‌گام است: ۱. وب و فناوری، ۲. هوش مصنوعی و ربات‌ها، ۳. طراحی و هنر بصری. همچنین ساختار سایت همانند یک سند مرجع فنی و مهندسی ایندکس‌بندی شده است.',
      tag: 'فلسفه برند',
    },
    {
      number: '02',
      question: 'فرآیند همکاری از اولین تماس تا تحویل پروژه چگونه است؟',
      answer:
        'ابتدا یک جلسه تحلیل عمیق (Discovery) برگزار می‌کنیم؛ سپس نقشه راه، ماتریس دیزاین و پروتوتایپ اولیه آماده می‌شود. تمام مراحل در بستر داشبورد شفاف با کارفرما به اشتراک گذاشته شده و در موعد مقرر تحویل قطعی می‌گردد.',
      tag: 'فرآیند کار',
    },
    {
      number: '03',
      question: 'آیا خدمات ساخت ربات شبکه‌های اجتماعی برای پیام‌رسان‌های ایرانی نیز پشتیبانی می‌شود؟',
      answer:
        'بله کاملاً. تیم مهندسی ما سورس‌کدهای اختصاصی برای بله، ایتا و روبیکا در کنار تلگرام، اینستاگرام و دیسکورد توسعه داده و نیازی به سرورهای خارجی پرریسک نیست.',
      tag: 'ربات و اتوماسیون',
    },
    {
      number: '04',
      question: 'آیا برای توسعه وب‌سایت‌ها از قالب‌های آماده یا وردپرس پیش‌ساخته استفاده می‌کنید؟',
      answer:
        'به هیچ وجه. قانون نشکستنی ۱۲۳سرویس این است که اگر لوگوی ما را با آژانس دیگری عوض کنید و طرح شبیه آن‌ها باشد، آن پروژه شکست خورده است. تمامی خروجی‌ها از صفر با کد اختصاصی و کامپوننت‌های دست‌ساز توسعه می‌یابند.',
      tag: 'فناوری و توسعه',
    },
    {
      number: '05',
      question: 'پشتیبانی فنی و نگهداری پس از تحویل چگونه انجام می‌شود؟',
      answer:
        'تمام پکیج‌های ما دارای حداقل ۶ الی ۱۲ ماه گارانتی بی‌قیدوشرط عملکرد فنی، رفع باگ و مانیتورینگ آپتایم هستند. علاوه بر این، آموزش کامل کار با پنل به تیم شما داده خواهد شد.',
      tag: 'گارانتی و پشتیبانی',
    },
  ] as FaqItem[],
};
