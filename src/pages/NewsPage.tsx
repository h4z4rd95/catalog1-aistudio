import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { soundFx } from '../utils/audio';
import {
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  Check,
  Tag,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Terminal,
  Volume2,
  Cpu,
  Layers,
  Send,
  Zap,
  Flame,
  Award,
  Sliders,
  X
} from 'lucide-react';

export interface NewsArticle {
  id: string;
  slug: string;
  titleEn: string;
  titleFa: string;
  subtitleEn: string;
  subtitleFa: string;
  summaryEn: string;
  summaryFa: string;
  contentEn: {
    lead: string;
    sections: {
      heading: string;
      body: string;
      quote?: string;
      code?: string;
    }[];
  };
  contentFa: {
    lead: string;
    sections: {
      heading: string;
      body: string;
      quote?: string;
      code?: string;
    }[];
  };
  category: 'ALL' | 'SPATIAL' | 'HARDWARE' | 'AWARDS' | 'AUDIO' | 'DESIGN' | 'DROPS';
  categoryLabelEn: string;
  categoryLabelFa: string;
  dateEn: string;
  dateFa: string;
  readTimeEn: string;
  readTimeFa: string;
  authorEn: string;
  authorFa: string;
  authorRoleEn: string;
  authorRoleFa: string;
  authorAvatar: string;
  coverImage: string;
  badgeEn?: string;
  badgeFa?: string;
  tagsEn: string[];
  tagsFa: string[];
  linkedProductId?: string;
  linkedProductCtaEn?: string;
  linkedProductCtaFa?: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'webgl-raymarching-procedural-sdf-shaders',
    titleEn: 'WebGL Raymarching & Procedural SDF Shaders in 2026: Achieving 120 FPS on Mobile',
    titleFa: 'شیدرهای رویه‌ای SDF و رندرهای ری‌مارچینگ در سال ۲۰۲۶: دستیابی به ۱۲۰ فریم بر ثانیه در موبایل',
    subtitleEn: 'Engineering signed distance field boolean operations and dynamic Snell caustics without GPU thermal throttle.',
    subtitleFa: 'مهندسی عملگرهای بولین در میدان‌های فاصله علامت‌دار (SDF) و شکست نور اسنل بدون افت عملکرد کارت گرافیک.',
    summaryEn: 'How we restructured our Raymarching kernel into two-pass downsampled compute passes, cutting draw calls by 74% while maintaining pristine specular reflections on iPhone 16 Pro and flagship Androids.',
    summaryFa: 'چگونه کرنل ری‌مارچینگ استودیو را در دو گذر محاسباتی سبک بازطراحی کردیم و تعداد Callها را ۷۴٪ کاهش دادیم، در حالی که انعکاس‌های نوری کریستالی روی گوشی‌های مدرن حفظ می‌شوند.',
    contentEn: {
      lead: 'Modern web experiences have historically suffered from a false binary: either rely on heavy baked textures that inflate bundle sizes, or tolerate sluggish WebGL framerates. With our latest HyperShader v3.2 kernel, we have dismantled that compromise.',
      sections: [
        {
          heading: '1. The Signed Distance Field (SDF) Paradigm',
          body: 'Unlike polygon meshes that demand millions of vertices uploaded across the WebGL bus, procedural SDFs represent geometry as mathematical equations evaluated inside the fragment shader. A torus intersecting a rounded cube requires zero transfer bandwidth—only pure mathematical evaluation.',
          code: `float sdRoundBox(vec3 p, vec3 b, float r) {
  vec3 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}`,
          quote: '“Geometry is no longer downloaded; it is evaluated in real time at the atomic speed of light inside the silicon.”'
        },
        {
          heading: '2. Optical Dispersion & Snell Dispersion Law',
          body: 'By separating refractive indices into distinct chromatic channels (Red, Green, Blue), we replicate physical chromatic aberration and diamond caustics in real time. The resulting caustic textures interact directly with mouse movements and device gyroscopes without external video files.',
        },
        {
          heading: '3. Production Benchmarks & Battery Impact',
          body: 'Across 10,000 real-world user sessions, average frame time dropped from 16.4ms to 7.8ms on Apple A18 Pro silicon, with battery draw reduced by 41% compared to standard Three.js mesh implementations.',
        }
      ]
    },
    contentFa: {
      lead: 'وب تجربی در طول تاریخ همواره میان دو راهی گرفتار بوده است: یا بارگذاری تکسچرهای سنگین که حجم دانلود را به صدها مگابایت می‌رساند، یا تحمل افت فریم‌های آزاردهنده در موبایل. با نسخه جدید کرنل HyperShader v3.2، این مصالحه را برای همیشه کنار گذاشتیم.',
      sections: [
        {
          heading: '۱. پارادایم میدان فاصله علامت‌دار (SDF)',
          body: 'برخلاف مش‌های چندضلعی که نیازمند ارسال میلیون‌ها راس از حافظه سیستم به کارت گرافیک هستند، هندسه SDF به صورت معادلات ریاضی خالص در فرگمنت شیدر محاسبه می‌شود. ترکیب یک چنبره با مکعب کروی هیچ پهنای باندی مصرف نمی‌کند—فقط پردازش ناب ریاضی در لحظه.',
          code: `float sdRoundBox(vec3 p, vec3 b, float r) {
  vec3 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}`,
          quote: '«هندسه دیگر دانلود نمی‌شود؛ بلکه درون سیلیکون با سرعت نور در هر فریم محاسبه می‌گردد.»'
        },
        {
          heading: '۲. انکسار اپتیکال و قانون شکست نور اسنل',
          body: 'با تفکیک ضریب شکست نوری به سه کانال رنگی قرمز، سبز و آبی، اعوجاج رنگی واقعی و کاستیک‌های بلوری الماسی به صورت بلادرنگ بازتولید می‌شوند. این بافت‌ها به حرکات نشانگر ماوس و ژیروسکوپ تبلت‌ها و گوشی‌ها با ظرافت واکنش نشان می‌دهند.',
        },
        {
          heading: '۳. بنچمارک‌های خروجی و بهینه‌سازی باتری',
          body: 'در بیش از ۱۰٬۰۰۰ نشست کاربری واقعی، میانگین زمان رندر هر فریم از ۱۶.۴ میلی‌ثانیه به ۷.۸ میلی‌ثانیه کاهش یافته و مصرف باتری دستگاه تا ۴۱٪ نسبت به پروژه‌های سنتی Three.js بهبود یافته است.',
        }
      ]
    },
    category: 'SPATIAL',
    categoryLabelEn: 'SPATIAL WEBGL',
    categoryLabelFa: 'مهندسی وب فضایی',
    dateEn: 'MARCH 18, 2026',
    dateFa: '۲۸ اسفند ۱۴۰۴',
    readTimeEn: '6 min read',
    readTimeFa: '۶ دقیقه مطالعه',
    authorEn: 'Kaelen Thorne',
    authorFa: 'کلن تورن',
    authorRoleEn: 'Principal Graphics Architect',
    authorRoleFa: 'معمار ارشد گرافیک کامپیوتری',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    badgeEn: 'COVER STORY',
    badgeFa: 'مقاله ویژه',
    tagsEn: ['WebGL', 'GLSL', 'Raymarching', 'Shaders', 'Mobile 120Hz'],
    tagsFa: ['وب‌جی‌ال', 'شیدر GLSL', 'ری‌مارچینگ', 'عملکرد بالا', 'موبایل'],
    linkedProductId: 'prod-hypershader-glsl',
    linkedProductCtaEn: 'View HyperShader GLSL Pack',
    linkedProductCtaFa: 'مشاهده پکیج HyperShader GLSL'
  },
  {
    id: 'news-2',
    slug: 'cyberdeck-mk4-machined-aluminum-teardown',
    titleEn: 'CyberDeck MK-IV Hardware Teardown: Machined Aluminum, Ortholinear Keybed & Custom E-Ink',
    titleFa: 'کالبدشکافی سخت‌افزار سایبردک MK-IV: آلومینیوم تراش‌خورده، سوییچ‌های ارتوکلاینر و نمایشگر E-Ink',
    subtitleEn: 'From initial 5-axis CNC titanium milling to custom embedded Linux firmware and hot-swappable tactile dials.',
    subtitleFa: 'از اولین فرزکاری CNC پنج‌محوره تیتانیوم تا فریم‌ور اختصاصی لینوکس توکار و سرولوم‌های لمسی قابل تعویض.',
    summaryEn: 'An exhaustive photographic inspection of our flagship mobile cryptographic workstation. Discover the acoustic dampening silicone layers and the tactile magnetic rotary encoders.',
    summaryFa: 'بررسی تصویری و عمیق ایستگاه کاری رمزنگاری قابل‌حمل استودیو؛ آشنایی با لایه‌های سیلیکونی جذب ارتعاش صوتی و انکودرهای مگنتی دوار.',
    contentEn: {
      lead: 'The CyberDeck MK-IV is our rebellious answer to disposable plastic laptops. Precision machined from a mono-block billet of aerospace 6061-T6 aluminum, it was engineered to outlive every device currently sitting on your desk.',
      sections: [
        {
          heading: '1. Unibody CNC Geometry',
          body: 'Each chassis spends 4.2 hours undergoing five-axis CNC contouring in our Kyoto atelier. Bead-blasted with microscopic ceramic spheres and finished in gunmetal anodization, the thermal dissipation characteristics allow passive zero-fan operation even under full cryptographic compile loads.',
          quote: '“Weight is substance. When you hold the MK-IV in hand, there is zero flex, zero squeak—only cold, monolithic precision.”'
        },
        {
          heading: '2. The Ortholinear Tactile Array',
          body: 'We eliminated staggered keys in favor of a mathematically aligned ortholinear grid. Equipped with lubricated Gateron Oil King mechanical switches and custom low-profile PBT keycaps with laser-etched Farsi and Latin dual glyphs.',
        },
        {
          heading: '3. Sunlight-Readable Dual Auxiliary Display',
          body: 'Above the 4K main display sits an ultra-low-power 3.8-inch bistable E-Ink dashboard. It maintains your Git commit stream, server ping latency, and Bitcoin mempool fees without consuming active battery draw.',
        }
      ]
    },
    contentFa: {
      lead: 'سایبردک MK-IV پاسخ جسورانه استودیو به لپ‌تاپ‌های پلاستیکی و یک‌بار مصرف امروزی است. این بدنه یکپارچه از بلوک آلومینیوم هوافضایی 6061-T6 تراش خورده و طوری مهندسی شده که بیشتر از تمام گجت‌های روی میز کارتان عمر کند.',
      sections: [
        {
          heading: '۱. هندسه یکپارچه CNC',
          body: 'هر شاسی ۴.۲ ساعت را زیر فرزهای ۵ محوره CNC در آتلیه کیوتو سپری می‌کند. سندبلاست با دانه‌های میکروسکوپی سرامیک و آنودایز تیتانیومی دودی، انتقال حرارت را به سطحی رسانده که بدون نیاز به هیچ فن خنک‌کننده‌ای، عملیات رمزنگاری سنگین را در سکوت مطلق انجام می‌دهد.',
          quote: '«وزن یعنی اصالت. وقتی MK-IV را در دست می‌گیرید، هیچ خمیدگی یا صدایی حس نمی‌کنید؛ فقط صلابت سرد و مونو‌لیتیک فلز.»'
        },
        {
          heading: '۲. آرایه سوییچ‌های ارتوکلاینر',
          body: 'ما چیدمان کج کلیدهای سنتی را کنار گذاشتیم و یک شبکه ارتوکلاینر با فواصل میلی‌متری طراحی کردیم. سوییچ‌های مکانیکی روان‌کاری شده Gateron Oil King همراه با کلیدهای PBT دو بار تزریق با گلیف‌های دو زبانه فارسی و انگلیسی حکاکی شده با لیزر.',
        },
        {
          heading: '۳. نمایشگر ثانویه E-Ink خوانا در زیر نور خورشید',
          body: 'بالای مانیتور اصلی 4K، یک نمایشگر کم‌مصرف ۳.۸ اینچی E-Ink قرار دارد که کامیت‌های گیت، پینگ سرورها و کارمزدهای شبکه رمزارز را حتی در حالت آماده‌باش بدون مصرف مداوم باتری نمایش می‌دهد.',
        }
      ]
    },
    category: 'HARDWARE',
    categoryLabelEn: 'HARDWARE DROP',
    categoryLabelFa: 'سخت‌افزار و مهندسی معکوس',
    dateEn: 'FEBRUARY 28, 2026',
    dateFa: '۹ اسفند ۱۴۰۴',
    readTimeEn: '8 min read',
    readTimeFa: '۸ دقیقه مطالعه',
    authorEn: 'Dr. Aras Shenas',
    authorFa: 'دکتر آراس شناس',
    authorRoleEn: 'Lead Industrial Engineer',
    authorRoleFa: 'مدیر ارشد طراحی صنعتی',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    badgeEn: 'LIMITED EDITION',
    badgeFa: 'تولید محدود',
    tagsEn: ['Cyberdeck', 'CNC Machined', 'E-Ink', 'Ortholinear', 'Linux'],
    tagsFa: ['سایبردک', 'تراش CNC', 'جوهر الکترونیک', 'کیبورد ارتوکلاینر', 'لینوکس'],
    linkedProductId: 'prod-cyberdeck-mk4',
    linkedProductCtaEn: 'Configure MK-IV Terminal',
    linkedProductCtaFa: 'سفارشی‌سازی ترمینال MK-IV'
  },
  {
    id: 'news-3',
    slug: 'aura-wins-3x-awwwards-site-of-the-year',
    titleEn: 'AURA Wins 3x Awwwards Site of the Year 2025: Breaking the Corporate Template Matrix',
    titleFa: 'استودیو آئورا برنده ۳ جایزه برترین سایت سال ۲۰۲۵: عبور از قالب‌های تکراری وب شرکتی',
    subtitleEn: 'Recognized for Developer of the Year, Site of the Year, and Most Innovative Use of WebGL & Spatial Audio.',
    subtitleFa: 'کسب افتخار توسعه‌دهنده سال، برترین سایت سال و نوآورانه‌ترین تجربه وب‌جی‌ال و صدای فضایی در سطح جهان.',
    summaryEn: 'An intimate retrospective on the philosophy behind our visual revolution. Why modern enterprise websites look like carbon copies of each other, and how we broke free using tactile physics.',
    summaryFa: 'مروری عمیق بر فلسفه بصری استودیو آئورا؛ چرا اکثر وب‌سایت‌های شرکتی شبیه قالب‌های کپی‌شده هستند و چگونه با تلفیق فیزیک تعاملی از این دام عبور کردیم.',
    contentEn: {
      lead: 'In late December, the international jury of Awwwards convened in Tokyo to announce the 2025 Annual Honors. AURA was awarded three prestigious crowns, cementing our position at the forefront of digital culture.',
      sections: [
        {
          heading: '1. The Disease of Digital Uniformity',
          body: 'Open any SaaS homepage today: a rounded pill badge, an overly sterile sans-serif headline, a floating mockup card with generic shadows, and an identical grid of cards. The modern web has become hyper-efficient at the cost of emotional resonance.',
          quote: '“If your brand looks like everyone else, you do not possess a brand; you possess a commodity.”'
        },
        {
          heading: '2. The Vibe Coding Manifesto in Practice',
          body: 'Rather than starting with wireframes in Figma, our projects begin in code: manipulating noise algorithms, composing Web Audio frequencies, and tuning inertia curves until the user experience feels physical and alive.',
        },
        {
          heading: '3. What Comes Next in 2026',
          body: 'We are expanding our open-source shader libraries, publishing new parametric CAD components, and commissioning five new enterprise spatial web projects for visionary institutions.',
        }
      ]
    },
    contentFa: {
      lead: 'در اواخر دسامبر، هیئت داوران بین‌المللی Awwwards در توکیو گرد هم آمدند تا برندگان سال ۲۰۲۵ را معرفی کنند. استودیو آئورا مفتخر به دریافت سه نشان برتر شد و جایگاه خود را به عنوان پیشتاز فرهنگ تعاملی دیجیتال تثبیت کرد.',
      sections: [
        {
          heading: '۱. عارضه یکنواختی دیجیتال در وب تجاری',
          body: 'امروز هر صفحه استارتاپی یا شرکتی را باز کنید: یک بج کپسولی، یک فونت سنس‌سریف تکراری، یک موکاپ با سایه‌های مصنوعی و شبکه‌ای از کارت‌های بی‌روح. وب مدرن به قیمت از دست رفتن هیجان و هنر، بیش از حد ماشینی و یکدست شده است.',
          quote: '«اگر وب‌سایت شما شبیه بقیه باشد، شما صاحب یک برند نیستید؛ شما فقط یک کالای عمومی بی‌نام‌ونشان ارائه داده‌اید.»'
        },
        {
          heading: '۲. بیانیه کدنویسی حسی در عمل',
          body: 'به جای شروع از وایرفریم‌های بی‌روح فیگما، پروژه‌های ما درون محیط کد آغاز می‌شوند: تنظیم الگوریتم‌های نویز پرلین، ترکیب فرکانس‌های صوتی وب‌آدیو و تنظیم منحنی‌های اینرسی تا زمانی که تعامل با صفحه شبیه لمس یک ابزار واقعی شود.',
        },
        {
          heading: '۳. چشم‌انداز استودیو برای سال ۲۰۲۶',
          body: 'ما در حال گسترش کتابخانه‌های شیدر متن‌باز، انتشار قطعات مهندسی جدید CAD و اجرای ۵ پروژه فضایی نوین برای برندهای پیشتاز بین‌المللی هستیم.',
        }
      ]
    },
    category: 'AWARDS',
    categoryLabelEn: 'ANNUAL AWARDS',
    categoryLabelFa: 'جوایز بین‌المللی',
    dateEn: 'JANUARY 14, 2026',
    dateFa: '۲۴ دی ۱۴۰۴',
    readTimeEn: '5 min read',
    readTimeFa: '۵ دقیقه مطالعه',
    authorEn: 'Soraya Sterling',
    authorFa: 'ثریا استرلینگ',
    authorRoleEn: 'Executive Creative Director',
    authorRoleFa: 'مدیر ارشد خلاقیت و طراحی',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    badgeEn: '3X AWWWARDS',
    badgeFa: 'برنده ۳ جایزه سال',
    tagsEn: ['Awwwards', 'Site of the Year', 'Manifesto', 'Creative Direction'],
    tagsFa: ['جوایز وب', 'سایت برتر سال', 'مانیفست', 'خلاقیت هنری'],
    linkedProductId: 'prod-vibe-matrix',
    linkedProductCtaEn: 'Explore Awarded System',
    linkedProductCtaFa: 'مشاهده دیزاین سیستم برگزیده'
  },
  {
    id: 'news-4',
    slug: 'tactile-web-audio-haptic-synthesis',
    titleEn: 'The Architecture of Tactile Web Audio: Synthesizing Micro-Haptics with Web Audio API',
    titleFa: 'معماری اصوات لمسی وب: شبیه‌سازی بازخورد هپتیک با وب‌آدیو ای‌پی‌آی بدون بارگذاری فایل',
    subtitleEn: 'Zero-byte latency sound synthesis: creating resonant clicks, mechanical relays, and sine sweeps programmatically.',
    subtitleFa: 'سنتز صدای بدون تاخیر با صفر بایت حجم دانلود: تولید تق‌تق‌های مکانیکی، رله‌های الکترونیکی و فرکانس‌های سینوسی.',
    summaryEn: 'Why download 500KB of static MP3 click sounds when you can synthesize warm, tactile analog waveforms directly in the browser with precision envelope timing and pitch bend?',
    summaryFa: 'چرا فایل‌های MP3 سنگین دانلود کنیم وقتی می‌توان با کمک نوسان‌سازهای آنالوگ مرورگر، فرکانس‌های غنی و گرم را در لحظه کلیک با حجم صفر بایت تولید کرد؟',
    contentEn: {
      lead: 'Sound is the forgotten dimension of digital interface design. While screens have advanced to 4K OLED, most websites remain completely mute or employ abrasive notification bleeps that startle users.',
      sections: [
        {
          heading: '1. The Oscillator and Gain Envelope Engine',
          body: 'Using the native Web Audio AudioContext, we construct procedural sound modules containing an OscillatorNode, a BiquadFilterNode, and an exponential GainNode envelope. Attack times of 0.005 seconds replicate the crisp snap of an industrial relay switch.',
          code: `const osc = ctx.createOscillator();
const gain = ctx.createGain();
gain.gain.setValueAtTime(0.12, ctx.currentTime);
gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
osc.frequency.setValueAtTime(800, ctx.currentTime);
osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);`,
          quote: '“Zero bandwidth overhead. Absolute instant response without round-trip network lag.”'
        },
        {
          heading: '2. Spatial Pan & Binaural Depth',
          body: 'As users hover across items on the left or right of the screen, our StereoPannerNode shifts the perceived audio origin across the stereo soundstage, providing subconscious spatial navigation cues.',
        }
      ]
    },
    contentFa: {
      lead: 'صدا بعد فراموش‌شده طراحی رابط‌های کاربری است. در حالی که نمایشگرها به 4K OLED ارتقا یافته‌اند، بیشتر سایت‌ها یا کاملا بی‌صدا هستند یا از بوق‌های دلخراش استفاده می‌کنند که کاربر را وادار به بستن تب می‌کند.',
      sections: [
        {
          heading: '۱. موتور نوسان‌ساز و پوش فرکانسی (Envelope)',
          body: 'با بهره‌گیری از AudioContext استاندارد مرورگر، ماژول‌های صوتی رویه‌ای متشکل از نوسان‌ساز، فیلتر بی‌کواد و پوش افزایشی گین طراحی کرده‌ایم. زمان حمله ۵ میلی‌ثانیه‌ای، صدای کلیک مکانیکی رله‌های صنعتی را با دقت خارق‌العاده بازسازی می‌کند.',
          code: `const osc = ctx.createOscillator();
const gain = ctx.createGain();
gain.gain.setValueAtTime(0.12, ctx.currentTime);
gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
osc.frequency.setValueAtTime(800, ctx.currentTime);
osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);`,
          quote: '«صفر بایت حجم دانلود، بدون تاخیر شبکه، و بازخورد لمسی در لحظه لمس کلید.»'
        },
        {
          heading: '۲. استریو پانینگ و جهت‌یابی فضایی',
          body: 'وقتی ماوس روی المان‌های سمت چپ یا راست حرکت می‌کند، نودهای StereoPanner صدا را در فضای دوگوش گوشواره جابجا می‌کنند و نشانه‌های هدایتگر ناخودآگاه به کاربر می‌دهند.',
        }
      ]
    },
    category: 'AUDIO',
    categoryLabelEn: 'SOUND SYNTHESIS',
    categoryLabelFa: 'طراحی صدای تعاملی',
    dateEn: 'FEBRUARY 10, 2026',
    dateFa: '۲۱ بهمن ۱۴۰۴',
    readTimeEn: '7 min read',
    readTimeFa: '۷ دقیقه مطالعه',
    authorEn: 'Renzo Vane',
    authorFa: 'رنزو وین',
    authorRoleEn: 'Lead Sound Designer',
    authorRoleFa: 'مدیر طراحی اصوات تعاملی',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    badgeEn: 'CODE RECIPE',
    badgeFa: 'کد و الگو',
    tagsEn: ['Web Audio API', 'Oscillators', 'Haptics', 'Micro-interactions'],
    tagsFa: ['وب‌آدیو', 'نوسان‌ساز', 'بازخورد لمسی', 'میکروتعامل'],
    linkedProductId: 'prod-haptic-knob',
    linkedProductCtaEn: 'Inspect Haptic Controller',
    linkedProductCtaFa: 'بررسی کنترلر لمسی صوتی'
  },
  {
    id: 'news-5',
    slug: 'bidirectional-typography-rtl-ltr-spatial-grids',
    titleEn: 'Vanguard Typography: Bidirectional RTL & LTR Grids in Modern Spatial Interfaces',
    titleFa: 'تایپوگرافی پیشرو: سیستم‌های گرید دوطرفه راست‌به‌چپ و چپ‌به‌راست در رابط‌های فضایی',
    subtitleEn: 'Harmonizing Persian typography with futuristic brutalist grids without compromising aesthetic hierarchy.',
    subtitleFa: 'هماهنگ‌سازی تایپوگرافی فارسی با شبکه‌های بروتالیست پیشرو بدون قربانی‌کردن سلسله‌مراتب بصری.',
    summaryEn: 'How we solved the historical friction between Latin monospaced fonts and flowing Persian calligraphy scripts through bespoke variable font pairing and dynamic letter-spacing suppression.',
    summaryFa: 'چگونه چالش تاریخی بین فونت‌های مونواسپیس لاتین و خطوط نرم فارسی را با جفت‌سازی متغیر و کنترل هوشمند فواصل حروف حل کردیم.',
    contentEn: {
      lead: 'Too many international platforms treat Right-to-Left (RTL) languages as an afterthought, simply flipping CSS flex directions and causing visual disharmony with fonts like Times New Roman or Arial.',
      sections: [
        {
          heading: '1. The Kinetic Pair: Syne & Lalezar / Vazirmatn',
          body: 'We matched the sculptural curves of Syne and Cinzel with Lalezar and Vazirmatn. In Persian mode, Latin letter-spacing is neutralized, baseline heights are mathematically aligned, and numerical digits render with graceful Persian numerals.',
          quote: '“RTL is not an edge case; it is a linguistic canvas of 400 million people that demands uncompromising typographic respect.”'
        },
        {
          heading: '2. Directional Mirroring of Visual Glyphs',
          body: 'All directional arrows, progression chevrons, and slide docks automatically invert axes while maintaining absolute semantic consistency throughout all interactive states.',
        }
      ]
    },
    contentFa: {
      lead: 'بسیاری از پلتفرم‌های بین‌المللی با زبان‌های راست‌به‌چپ مانند یک اولویت حاشیه‌ای برخورد می‌کنند؛ تنها با تغییر جهت flex-row در CSS که منجر به فونت‌های نازیبا و ناهماهنگی آزاردهنده می‌شود.',
      sections: [
        {
          heading: '۱. جفت تایپوگرافی جنبشی: لاله زار و وزیرمتن',
          body: 'ما تناسبات مجسمه‌گونه فونت‌های Syne و Cinzel را با لاله‌زار و وزیرمتن هماهنگ کردیم. در حالت فارسی، کشیدگی‌های نامناسب لغو شده، ارتفاع خطوط تراز شده و اعداد به صورت یکپارچه و زیبا رندر می‌شوند.',
          quote: '«زبان‌های راست‌به‌چپ یک حالت استثنایی نیستند؛ بلکه بستر بیانی بیش از ۴۰۰ میلیون نفرند که شایسته اوج احترام تایپوگرافیک است.»'
        },
        {
          heading: '۲. انعکاس هوشمند نشانه‌ها و آیکون‌ها',
          body: 'تمام فلش‌های هدایتگر، مراحل تسویه‌حساب و داک‌های لغزنده به صورت خودکار بدون تداخل بصری جهت‌گیری مناسب را اتخاذ می‌کنند.',
        }
      ]
    },
    category: 'DESIGN',
    categoryLabelEn: 'TYPOGRAPHIC ARCHITECTURE',
    categoryLabelFa: 'معماری تایپوگرافی',
    dateEn: 'MARCH 02, 2026',
    dateFa: '۱۲ اسفند ۱۴۰۴',
    readTimeEn: '6 min read',
    readTimeFa: '۶ دقیقه مطالعه',
    authorEn: 'Leyla Rahbar',
    authorFa: 'لیلا رهبر',
    authorRoleEn: 'Typographic Director',
    authorRoleFa: 'مدیر طراحی تایپوگرافی و هویت بصری',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    badgeEn: 'INSIGHT',
    badgeFa: 'یادداشت تخصصی',
    tagsEn: ['Typography', 'RTL Design', 'Persian Fonts', 'Grid System'],
    tagsFa: ['تایپوگرافی', 'طراحی RTL', 'فونت فارسی', 'سیستم شبکه'],
    linkedProductId: 'prod-vibe-matrix',
    linkedProductCtaEn: 'Check UI Framework',
    linkedProductCtaFa: 'بررسی فریم‌ورک رابط کاربری'
  },
  {
    id: 'news-6',
    slug: 'private-drop-titanium-tourbillon-chronograph',
    titleEn: 'Private Drop: Limited Titanium Tourbillon Chronograph Now Open for Atelier Whitelist',
    titleFa: 'دراپ اختصاصی: ساعت توربیلون تیتانیومی هم‌اکنون برای اعضای وایت‌لیست آتلیه آماده سفارش است',
    subtitleEn: 'Only 25 physical pieces milled from Grade 5 titanium with an inverted flying tourbillon carriage and sapphire glass.',
    subtitleFa: 'تنها ۲۵ قطعه فیزیکی دست‌ساز از تیتانیوم گرید ۵ با قفسه معلق توربیلون و شیشه کریستال یاقوت کبود.',
    summaryEn: 'Bridging the physical and virtual: each timepiece comes paired with an encrypted cryptographic hardware token linking the owner to the atelier inner circle and perpetual source updates.',
    summaryFa: 'پیوند دنیای فیزیکی و مجازی: هر ساعت همراه با توکن سخت‌افزاری رمزنگاری‌شده عرضه می‌شود که دارنده را به حلقه اختصاصی آتلیه و دریافت همیشگی آپدیت‌ها متصل می‌کند.',
    contentEn: {
      lead: 'After two years of clandestine development in collaboration with master horologists in Geneva and Tokyo, we are opening allocations for our most ambitious mechanical creation yet.',
      sections: [
        {
          heading: '1. The Architecture of the Flying Tourbillon',
          body: 'Beating at 28,800 vibrations per hour (4Hz), the open-worked skeleton movement cancels out gravitational errors across all three dimensions. The cage is hand-beveled with diamond paste, weighing an astonishing 0.28 grams.',
          quote: '“Mechanical horology is the original cybernetics: pure gears and springs keeping eternal time without a single transistor.”'
        },
        {
          heading: '2. Cryptographic Twin & Blockchain Ledger',
          body: 'Embedded within the sapphire caseback is an ultra-high frequency NFC micro-tag containing an RSA-4096 private certificate. Scanning the timepiece unlocks access to studio firmware repositories and VIP studio drops.',
        }
      ]
    },
    contentFa: {
      lead: 'پس از دو سال توسعه محرمانه با همکاری ساعت‌سازان چیره در ژنو و توکیو، تخصیص سفارشات برای بلندپروازانه‌ترین اثر مکانیکی استودیو آئورا رسما آغاز شد.',
      sections: [
        {
          heading: '۱. معماری توربیلون معلق',
          body: 'با فرکانس ۲۸٬۸۰۰ نوسان در ساعت (۴ هرتز)، موتور اسکلتی نمایان ساعت خطاهای ناشی از گرانش زمین را در هر سه بعد خنثی می‌کند. قفسه توربیلون با خمیر الماس با دست صیقل خورده و وزن شگفت‌آور آن تنها ۰.۲۸ گرم است.',
          quote: '«ساعت‌سازی مکانیکی، سایبرنتیک اصیل جهان است: چرخ‌دنده‌ها و فنرهایی که بدون حتی یک ترانزیستور، زمان ابدی را اندازه می‌گیرند.»'
        },
        {
          heading: '۲. دوقلوی رمزنگاری‌شده و دسترسی اختصاصی',
          body: 'در پشت قاب یاقوت کبود، یک میکروچیپ فوق فرکانس NFC تعبیه شده که حاوی گواهی رمزنگاری RSA-4096 است. اسکن ساعت دسترسی به مخازن کدهای محرمانه استودیو و دراپ‌های بعدی را فعال می‌کند.',
        }
      ]
    },
    category: 'DROPS',
    categoryLabelEn: 'LUXURY DROP',
    categoryLabelFa: 'دراپ لوکس فیزیکی',
    dateEn: 'MARCH 20, 2026',
    dateFa: '۳۰ اسفند ۱۴۰۴',
    readTimeEn: '4 min read',
    readTimeFa: '۴ دقیقه مطالعه',
    authorEn: 'Kaelen Thorne',
    authorFa: 'کلن تورن',
    authorRoleEn: 'Principal Graphics Architect',
    authorRoleFa: 'معمار ارشد استودیو',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    badgeEn: '25 PIECES ONLY',
    badgeFa: 'فقط ۲۵ قطعه',
    tagsEn: ['Tourbillon', 'Horology', 'Titanium', 'Physical Drop', 'NFC Token'],
    tagsFa: ['توربیلون', 'ساعت مکانیکی', 'تیتانیوم', 'دراپ فیزیکی', 'توکن NFC'],
    linkedProductId: 'prod-titanium-watch',
    linkedProductCtaEn: 'View Tourbillon Specs',
    linkedProductCtaFa: 'مشاهده مشخصات توربیلون'
  }
];

export const NewsPage: React.FC = () => {
  const { theme, language, direction, setActivePage, setSelectedProductId, addToast, t } = useStore();

  const isLight = theme === 'light';
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const categories = [
    { id: 'ALL', labelEn: 'ALL DISPATCHES', labelFa: 'همه گزارش‌ها' },
    { id: 'SPATIAL', labelEn: 'SPATIAL WEBGL', labelFa: 'وب فضایی' },
    { id: 'HARDWARE', labelEn: 'HARDWARE & CAD', labelFa: 'سخت‌افزار' },
    { id: 'AWARDS', labelEn: 'AWARDS & HONORS', labelFa: 'جوایز و افتخارات' },
    { id: 'AUDIO', labelEn: 'SOUND SYNTHESIS', labelFa: 'صدای تعاملی' },
    { id: 'DESIGN', labelEn: 'TYPOGRAPHY & UI', labelFa: 'تایپوگرافی و دیزاین' },
    { id: 'DROPS', labelEn: 'LIMITED DROPS', labelFa: 'دراپ‌های محدود' },
  ];

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return NEWS_ARTICLES.filter((art) => {
      const matchesCategory = activeCategory === 'ALL' || art.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const title = isFa ? art.titleFa.toLowerCase() : art.titleEn.toLowerCase();
      const summary = isFa ? art.summaryFa.toLowerCase() : art.summaryEn.toLowerCase();
      const tags = (isFa ? art.tagsFa : art.tagsEn).join(' ').toLowerCase();

      return matchesCategory && (title.includes(query) || summary.includes(query) || tags.includes(query));
    });
  }, [activeCategory, searchQuery, isFa]);

  const featuredArticle = NEWS_ARTICLES[0];

  const handleOpenArticle = (art: NewsArticle) => {
    soundFx.playChime(700, 0.2);
    setSelectedArticle(art);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareArticle = (art: NewsArticle) => {
    soundFx.playClick(800);
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    addToast(
      isFa ? 'لینک مقاله کپی شد' : 'Article Link Copied',
      isFa ? 'آدرس این مقاله در کلیپ‌بورد ذخیره شد' : 'Article link copied to clipboard',
      'coupon'
    );
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      soundFx.playChime(850, 0.2);
      setNewsletterSubscribed(true);
      addToast(
        isFa ? 'اشتراک خبرنامه تایید شد' : 'Newsletter Confirmed',
        isFa ? 'ایمیل شما در شبکه تحلیلی استودیو ثبت شد' : `Briefing updates sent to ${newsletterEmail}`,
        'info'
      );
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSubscribed(false);
      }, 4000);
    }
  };

  const handleNavigateToProduct = (productId: string) => {
    soundFx.playClick(600);
    setSelectedProductId(productId);
    setActivePage('PRODUCT_DETAIL');
  };

  return (
    <div
      dir={direction}
      className={`min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors ${
        isLight ? 'bg-slate-50 text-zinc-900' : 'bg-[#050609] text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* If article modal / full reader is active */}
        {selectedArticle ? (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-300 space-y-8">
            {/* Top Back Navigation Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <button
                onClick={() => {
                  soundFx.playClick(500);
                  setSelectedArticle(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-xs font-bold transition-all ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-zinc-900'
                    : 'bg-white/5 hover:bg-white/10 border-white/15 text-zinc-300'
                }`}
              >
                {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                <span>{isFa ? 'بازگشت به تمام مقالات' : 'Back to All Dispatches'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShareArticle(selectedArticle)}
                  className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 font-mono text-xs ${
                    copiedLink
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : isLight
                      ? 'bg-white hover:bg-slate-100 border-slate-300 text-zinc-700'
                      : 'bg-white/5 hover:bg-white/10 border-white/15 text-zinc-300'
                  }`}
                  title={isFa ? 'اشتراک‌گذاری مقاله' : 'Share Dispatch'}
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copiedLink ? (isFa ? 'کپی شد' : 'Copied') : (isFa ? 'اشتراک' : 'Share')}</span>
                </button>
              </div>
            </div>

            {/* Article Header Hero */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 font-mono text-xs font-bold uppercase tracking-wider">
                  {isFa ? selectedArticle.categoryLabelFa : selectedArticle.categoryLabelEn}
                </span>
                {(isFa ? selectedArticle.badgeFa : selectedArticle.badgeEn) && (
                  <span className="px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/30 font-mono text-xs font-bold uppercase">
                    {isFa ? selectedArticle.badgeFa : selectedArticle.badgeEn}
                  </span>
                )}
                <span className="flex items-center gap-1 font-mono text-xs text-zinc-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {isFa ? selectedArticle.dateFa : selectedArticle.dateEn}
                </span>
                <span className="flex items-center gap-1 font-mono text-xs text-zinc-400">
                  <Clock className="w-3.5 h-3.5" />
                  {isFa ? selectedArticle.readTimeFa : selectedArticle.readTimeEn}
                </span>
              </div>

              <h1 className={`font-['Syne'] text-3xl sm:text-5xl font-black tracking-tight leading-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                {isFa ? selectedArticle.titleFa : selectedArticle.titleEn}
              </h1>

              <p className={`text-lg sm:text-xl font-light leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>
                {isFa ? selectedArticle.subtitleFa : selectedArticle.subtitleEn}
              </p>

              {/* Author Card */}
              <div className={`p-4 rounded-2xl border flex items-center gap-4 ${isLight ? 'bg-white border-slate-300' : 'bg-white/5 border-white/10'}`}>
                <img
                  src={selectedArticle.authorAvatar}
                  alt={selectedArticle.authorEn}
                  className="w-12 h-12 rounded-xl object-cover border border-white/20"
                />
                <div>
                  <h4 className="font-bold text-sm">{isFa ? selectedArticle.authorFa : selectedArticle.authorEn}</h4>
                  <p className="font-mono text-xs text-zinc-400">{isFa ? selectedArticle.authorRoleFa : selectedArticle.authorRoleEn}</p>
                </div>
              </div>

              {/* Cover Image Banner */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 h-[340px] sm:h-[480px]">
                <img
                  src={selectedArticle.coverImage}
                  alt={selectedArticle.titleEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            </div>

            {/* Article Body Content */}
            <div className="max-w-4xl mx-auto space-y-10 py-6">
              {/* Lead Paragraph */}
              <p className={`text-lg sm:text-xl font-medium leading-relaxed border-l-4 sm:border-l-0 ${
                isRtl ? 'sm:border-r-4 pr-4 border-cyan-400' : 'border-cyan-400 pl-4'
              } ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
                {isFa ? selectedArticle.contentFa.lead : selectedArticle.contentEn.lead}
              </p>

              {/* Structured Sections */}
              {(isFa ? selectedArticle.contentFa.sections : selectedArticle.contentEn.sections).map((sec, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className={`font-['Syne'] text-2xl font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    {sec.heading}
                  </h3>
                  <p className={`text-base leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {sec.body}
                  </p>

                  {/* Optional Quote Callout */}
                  {sec.quote && (
                    <div className={`p-6 rounded-2xl border my-6 italic text-base ${
                      isLight ? 'bg-cyan-50 border-cyan-200 text-cyan-950' : 'bg-cyan-950/30 border-cyan-500/30 text-cyan-200'
                    }`}>
                      {sec.quote}
                    </div>
                  )}

                  {/* Optional Code Block */}
                  {sec.code && (
                    <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/90 p-4 font-mono text-xs text-emerald-400 space-y-2">
                      <div className="flex items-center justify-between text-zinc-500 border-b border-white/10 pb-2">
                        <span className="flex items-center gap-1.5 text-zinc-400">
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          GLSL KERNEL SNIPPET
                        </span>
                        <span>FRAGMENT PASS</span>
                      </div>
                      <pre className="overflow-x-auto p-2" dir="ltr">{sec.code}</pre>
                    </div>
                  )}
                </div>
              ))}

              {/* Tags Cloud */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-zinc-400 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {isFa ? 'برچسب‌ها:' : 'Tags:'}
                </span>
                {(isFa ? selectedArticle.tagsFa : selectedArticle.tagsEn).map((t, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full font-mono text-xs border ${
                      isLight ? 'bg-slate-200/60 border-slate-300 text-zinc-700' : 'bg-white/5 border-white/10 text-zinc-300'
                    }`}
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Linked Product Hardware / Digital Banner */}
              {selectedArticle.linkedProductId && (
                <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-6 ${
                  isLight
                    ? 'bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border-cyan-300'
                    : 'bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border-cyan-500/30'
                }`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
                        {isFa ? 'سخت‌افزار و پکیج مرتبط در استور' : 'LINKED ATELIER RELEASE'}
                      </span>
                    </div>
                    <h4 className="font-['Syne'] text-xl font-bold">
                      {isFa ? selectedArticle.linkedProductCtaFa : selectedArticle.linkedProductCtaEn}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleNavigateToProduct(selectedArticle.linkedProductId!)}
                    className="px-6 py-3 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-cyan-400/20 shrink-0"
                  >
                    <span>{isFa ? 'مشاهده در فروشگاه' : 'Inspect in Store'}</span>
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Normal News Archive List / Grid View */
          <>
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                  {isFa ? 'مرکز اطلاعات و مقالات استودیو' : 'ATELIER INTELLIGENCE & DISPATCHES'}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className={`font-['Syne'] text-3xl sm:text-5xl font-black tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    {isFa ? 'اخبار، مقالات و دراپ‌های اختصاصی' : 'Dispatches, Shaders & Tech Drops'}
                  </h1>
                  <p className={`mt-2 text-sm sm:text-base font-light max-w-2xl ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {isFa
                      ? 'گزارش‌های مهندسی وب‌جی‌ال، کالبدشکافی سخت‌افزارهای سایبردک، مانیفست‌های هنری و افتخارات بین‌المللی استودیو آئورا.'
                      : 'In-depth engineering writeups on WebGL raymarching, tactile audio synthesis, physical cyberdeck teardowns, and atelier design drops.'}
                  </p>
                </div>

                {/* Live Search Input */}
                <div className="w-full md:w-80">
                  <div className={`flex items-center px-4 py-2.5 rounded-2xl border transition-all ${
                    isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-black/60 border-white/15'
                  }`}>
                    <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isFa ? 'جستجو در مقالات و شیدرها...' : 'Search dispatches & specs...'}
                      className="w-full bg-transparent px-3 font-mono text-xs focus:outline-none placeholder-zinc-500"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-zinc-400 hover:text-white">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Category Filter Pills Bar */}
              <div className="pt-4 flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        soundFx.playClick(600);
                        setActiveCategory(cat.id);
                      }}
                      className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/20'
                          : isLight
                          ? 'bg-white hover:bg-slate-100 border border-slate-300 text-zinc-700'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300'
                      }`}
                    >
                      <span>{isFa ? cat.labelFa : cat.labelEn}</span>
                      {isActive && <Check className="w-3 h-3" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Hero Article Banner (Shown when no search query and ALL category) */}
            {activeCategory === 'ALL' && !searchQuery && (
              <div
                onClick={() => handleOpenArticle(featuredArticle)}
                className={`group cursor-pointer rounded-3xl overflow-hidden border p-6 sm:p-10 transition-all duration-300 relative ${
                  isLight
                    ? 'bg-white border-slate-300 hover:border-cyan-400 shadow-xl shadow-slate-900/5'
                    : 'bg-zinc-900/40 border-white/15 hover:border-cyan-400/50'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-md bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 font-mono text-xs font-bold uppercase">
                        {isFa ? featuredArticle.categoryLabelFa : featuredArticle.categoryLabelEn}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/30 font-mono text-xs font-bold">
                        {isFa ? featuredArticle.badgeFa : featuredArticle.badgeEn}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-xs text-zinc-400">
                        <Clock className="w-3.5 h-3.5" />
                        {isFa ? featuredArticle.readTimeFa : featuredArticle.readTimeEn}
                      </span>
                    </div>

                    <h2 className={`font-['Syne'] text-2xl sm:text-4xl font-extrabold group-hover:text-cyan-400 transition-colors leading-tight ${
                      isLight ? 'text-zinc-900' : 'text-white'
                    }`}>
                      {isFa ? featuredArticle.titleFa : featuredArticle.titleEn}
                    </h2>

                    <p className={`text-sm sm:text-base line-clamp-3 font-light leading-relaxed ${
                      isLight ? 'text-zinc-600' : 'text-zinc-400'
                    }`}>
                      {isFa ? featuredArticle.summaryFa : featuredArticle.summaryEn}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredArticle.authorAvatar}
                          alt={featuredArticle.authorEn}
                          className="w-10 h-10 rounded-full object-cover border border-white/20"
                        />
                        <div>
                          <span className="block font-bold text-xs">{isFa ? featuredArticle.authorFa : featuredArticle.authorEn}</span>
                          <span className="block font-mono text-[10px] text-zinc-400">{isFa ? featuredArticle.dateFa : featuredArticle.dateEn}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 font-mono text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                        <span>{isFa ? 'مطالعه مقاله' : 'Read Article'}</span>
                        {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 h-64 sm:h-80 rounded-2xl overflow-hidden relative">
                    <img
                      src={featuredArticle.coverImage}
                      alt={featuredArticle.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className={`font-['Syne'] text-xl font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  {isFa ? 'تمام مقالات و دراپ‌ها' : 'All Dispatches'} ({filteredArticles.length})
                </h3>
              </div>

              {filteredArticles.length === 0 ? (
                <div className={`p-12 text-center rounded-3xl border ${isLight ? 'bg-white border-slate-300' : 'bg-white/5 border-white/10'}`}>
                  <Search className="w-8 h-8 mx-auto text-zinc-500 mb-3" />
                  <p className="font-mono text-sm text-zinc-400">
                    {isFa ? 'هیچ مقاله‌ای با این عبارت پیدا نشد.' : 'No dispatches match your search query.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredArticles.map((art) => (
                    <article
                      key={art.id}
                      onClick={() => handleOpenArticle(art)}
                      className={`group cursor-pointer rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-300 ${
                        isLight
                          ? 'bg-white border-slate-300 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10'
                          : 'bg-zinc-900/40 border-white/15 hover:border-cyan-400/50 hover:bg-zinc-900/70'
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={art.coverImage}
                          alt={art.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-cyan-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-white/15">
                            {isFa ? art.categoryLabelFa : art.categoryLabelEn}
                          </span>
                          {(isFa ? art.badgeFa : art.badgeEn) && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-400/90 text-black font-mono text-[10px] font-black uppercase">
                              {isFa ? art.badgeFa : art.badgeEn}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {isFa ? art.dateFa : art.dateEn}
                            </span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {isFa ? art.readTimeFa : art.readTimeEn}
                            </span>
                          </div>

                          <h3 className={`font-['Syne'] text-lg font-bold group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2 ${
                            isLight ? 'text-zinc-900' : 'text-white'
                          }`}>
                            {isFa ? art.titleFa : art.titleEn}
                          </h3>

                          <p className={`text-xs line-clamp-3 font-light leading-relaxed ${
                            isLight ? 'text-zinc-600' : 'text-zinc-400'
                          }`}>
                            {isFa ? art.summaryFa : art.summaryEn}
                          </p>
                        </div>

                        {/* Author & Footer */}
                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={art.authorAvatar}
                              alt={art.authorEn}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <span className="font-mono text-xs text-zinc-400">{isFa ? art.authorFa : art.authorEn}</span>
                          </div>

                          <div className="flex items-center gap-1 font-mono text-xs font-bold text-cyan-400">
                            <span>{isFa ? 'مطالعه' : 'Read'}</span>
                            {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Newsletter Dispatch Dossier Bar */}
            <div className={`p-8 sm:p-12 rounded-3xl border backdrop-blur-xl relative overflow-hidden ${
              isLight
                ? 'bg-white border-slate-300 shadow-xl'
                : 'bg-gradient-to-r from-zinc-900 to-black border-cyan-400/30'
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-2">
                  <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {isFa ? 'اشتراک در اسناد محرمانه استودیو' : 'DIRECT ATELIER DISPATCH'}
                  </span>
                  <h3 className={`font-['Syne'] text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    {isFa ? 'آرشیو مقالات و پیش‌نمایش دراپ‌های بعدی' : 'Never Miss a WebGL Release or Hardware Drop'}
                  </h3>
                  <p className={`text-sm font-light leading-relaxed max-w-xl ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {isFa
                      ? 'دریافت مستقیم نوتیفیکیشن مقالات تخصصی، کدهای رایگان شیدر و کدهای تخفیف اختصاصی محصولات.'
                      : 'Join 14,000+ engineers, creative directors, and hardware enthusiasts receiving our bi-weekly architectural briefing.'}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  {newsletterSubscribed ? (
                    <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                      <Check className="w-4 h-4" />
                      <span>{isFa ? 'اشتراک با موفقیت ثبت شد. متشکریم!' : 'Subscribed to dossier feed successfully!'}</span>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder={isFa ? 'ایمیل کاری شما...' : 'developer@domain.com'}
                        required
                        className={`flex-1 px-4 py-3 rounded-2xl font-mono text-xs focus:outline-none focus:border-cyan-400 border ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-zinc-900'
                            : 'bg-black/80 border-white/20 text-white placeholder-zinc-500'
                        }`}
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-400/20"
                      >
                        <span>{isFa ? 'عضویت' : 'Subscribe'}</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
