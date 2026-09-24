import React, { useState, useMemo, useEffect, useRef } from 'react';
import { soundFx } from '../../utils/audio';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  Gamepad2,
  Star,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Flame,
  Download,
  Video,
  Image as ImageIcon,
  HelpCircle,
  MessageSquare,
  FileText,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Share2,
  ExternalLink,
  Award,
  Layers,
  Sliders,
  Check,
  X,
  Play,
  Volume2,
  Terminal,
  Compass,
  Cpu,
  ShieldCheck,
  Maximize2,
  Clock,
  Send,
  Plus
} from 'lucide-react';

interface WikiGameProps {
  onReturnToCatalog?: () => void;
}

interface GameReview {
  id: string;
  author: string;
  rating: number; // 1 to 10
  recommend: boolean;
  pros: string[];
  cons: string[];
  comment: string;
  date: string;
  likes: number;
}

interface GameData {
  id: string;
  title: string;
  titleFa: string;
  releaseYear: number;
  developer: string;
  publisher: string;
  engine: string;
  playtime: string;
  platforms: string[];
  genres: string[];
  bannerImage: string;
  coverImage: string;
  shortDescription: string;
  shortDescriptionFa: string;
  fullDescription: string;
  fullDescriptionFa: string;
  scores: {
    ign: number; // out of 10
    gamespot: number; // out of 10
    metacritic: number; // out of 100
    steam: string; // e.g. "96% Overwhelmingly Positive"
    wikiGame: number; // our editorial site score out of 10
  };
  systemReqs: {
    min: { os: string; cpu: string; gpu: string; ram: string; storage: string };
    rec: { os: string; cpu: string; gpu: string; ram: string; storage: string };
  };
  screenshots: string[];
  trailers: { title: string; duration: string; url: string; thumbnail: string }[];
  trainers: {
    title: string;
    version: string;
    author: string;
    features: string[];
    downloadUrl: string;
  };
  persianMod: {
    title: string;
    type: string;
    translator: string;
    features: string[];
    installGuide: string;
    downloadUrl: string;
    size: string;
  };
  walkthrough: {
    chapters: { title: string; summary: string; tips: string[] }[];
  };
  qa: { id: string; question: string; author: string; answer: string; votes: number }[];
  reviews: GameReview[];
}

export const WIKI_GAMES: GameData[] = [
  {
    id: 'game-gta-6',
    title: 'Grand Theft Auto VI',
    titleFa: 'اتومبیل‌دزدی بزرگ ۶ (GTA VI)',
    releaseYear: 2025,
    developer: 'Rockstar Games',
    publisher: 'Take-Two Interactive',
    engine: 'RAGE Engine 9.0',
    playtime: '۸۵+ ساعت داستان و جهان‌باز',
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    genres: ['Open World', 'Action-Adventure', 'Crime', 'Next-Gen'],
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Welcome to Leonida and the neon-soaked streets of Vice City in the most immersive open-world experience ever created.',
    shortDescriptionFa: 'سفر به ایالت لئونیدا و خیابان‌های نئونی وایس‌سیتی؛ بزرگ‌ترین و پرجزئیات‌ترین جهان‌باز تاریخ بازی‌های ویدیویی با دو شخصیت اصلی لوسیا و جیسون.',
    fullDescription: 'Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet. Revolutionary AI life routines, realistic weather physics, volumetric water systems, and cinematic crime heists.',
    fullDescriptionFa: 'بازی GTA VI روایتگر سرگذشت دو کاراکتر به نام‌های لوسیا و جیسون در ایالت وسیع لئونیدا و خیابان‌های ساحلی وایس‌سیتی است. موتور ارتقایافته RAGE 9 فیزیک خارق‌العاده آب، هوش مصنوعی عمیق شهروندان، سیستم آب‌وهوای پویا و طوفان‌های استوایی را با کیفیتی نسل بعدی به تصویر می‌کشد.',
    scores: {
      ign: 10,
      gamespot: 10,
      metacritic: 98,
      steam: '98% Overwhelmingly Positive',
      wikiGame: 9.9,
    },
    systemReqs: {
      min: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-10700K / AMD Ryzen 7 3800X',
        gpu: 'NVIDIA GeForce RTX 3060 12GB / AMD Radeon RX 6700 XT',
        ram: '16 GB DDR4',
        storage: '150 GB SSD (NVMe Recommended)',
      },
      rec: {
        os: 'Windows 11 64-bit DirectStorage',
        cpu: 'Intel Core i9-13900K / AMD Ryzen 9 7900X',
        gpu: 'NVIDIA GeForce RTX 4080 Super 16GB / AMD RX 7900 XTX',
        ram: '32 GB DDR5',
        storage: '150 GB PCIe Gen4 NVMe SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    ],
    trailers: [
      {
        title: 'GTA VI Reveal Trailer 1 - Vice City 4K',
        duration: '1:31',
        url: 'https://www.youtube.com',
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Lucia & Jason Character Spotlight',
        duration: '2:45',
        url: 'https://www.youtube.com',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trainers: {
      title: 'GTA VI Ultimate Plus Trainer (v1.02 Fling)',
      version: 'v1.02 Full Release',
      author: 'FLiNG & WikiGame Team',
      features: [
        'Numpad 1: جان بی‌نهایت (God Mode)',
        'Numpad 2: زره و استقامت نامحدود',
        'Numpad 3: تیر و خشاب بی‌نهایت بدون نیاز به لود مجدد',
        'Numpad 4: صفر کردن ستاره‌های تعقیب پلیس (Never Wanted)',
        'Numpad 5: افزودن ۱,۰۰۰,۰۰۰ دلار به موجودی جیسون و لوسیا',
        'Numpad 6: سرعت حرکت سوپرمن و تلپورت به نشانگر نقشه',
      ],
      downloadUrl: '#download-trainer-gta6',
    },
    persianMod: {
      title: 'ماد فارسی‌ساز و زیرنویس اختصاصی GTA VI (دوبله هوش مصنوعی + متن)',
      type: 'زیرنویس کامل تمام دیالوگ‌ها، پیامک‌ها، وب‌سایت‌های داخل بازی و اخبار',
      translator: 'دپارتمان بومی‌سازی ویکی‌گیم (نسخه طلایی)',
      features: [
        'ترجمه ۱۰۰٪ خط داستانی، ماموریت‌های فرعی و رادیوهای وایس‌سیتی',
        'پشتیبانی از فونت اختصاصی نئونی با خوانایی عالی در رزولوشن 4K',
        'بدون تداخل با آپدیت‌های رسمی و سیستم آنلاین راک‌استار',
      ],
      installGuide: 'فایل نصبی را اجرا کرده و مسیر پوشه نصب GTA VI را انتخاب کنید. فعال‌سازی به صورت خودکار انجام می‌شود.',
      downloadUrl: '#download-persian-gta6',
      size: '340 MB',
    },
    walkthrough: {
      chapters: [
        {
          title: 'مقدمه: فرار از زندان ایالتی لئونیدا',
          summary: 'آشنایی با مکانیک‌های مخفی‌کاری و کاورگیری جدید لوسیا هنگام گریز از محوطه شمالی.',
          tips: ['استفاده از دوربین‌های مداربسته برای شناسایی گشت‌های شبانه پیش از حرکت.'],
        },
        {
          title: 'فصل اول: سرقت مسلحانه از فروشگاه زنجیره‌ای اوشن درایو',
          summary: 'هماهنگی میان جیسون و لوسیا برای مهار گروگان‌ها و باز کردن گاوصندوق پشتی.',
          tips: ['شلیک به جعبه تقسیم برق برای غیرفعال کردن آژیر خطر بی‌صدا.'],
        },
      ],
    },
    qa: [
      {
        id: 'qa-gta-1',
        question: 'آیا برای اجرای نسخه PC بازی نیاز به اتصال مداوم به اینترنت وجود دارد؟',
        author: 'علیرضا رادمان',
        answer: 'برای بخش داستانی تنها یک‌بار فعال‌سازی اولیه در سوشال کلاب راک‌استار کافی است و بازی به صورت آفلاین قابل اجراست.',
        votes: 142,
      },
    ],
    reviews: [
      {
        id: 'rev-gta-1',
        author: 'پویا مرادی',
        rating: 10,
        recommend: true,
        pros: ['گرافیک فراواقعی با ری‌تریسینگ و انعکاس بی‌نظیر آب', 'شخصیت‌پردازی عمیق و شیمی بین لوسیا و جیسون', 'هوش مصنوعی زنده شهروندان'],
        cons: ['حجم بالای بازی و سخت‌افزار سنگین برای 4K'],
        comment: 'شاهکار قرن راک‌استار. از ثانیه اول تا آخر غرق در اتمسفر وایس‌سیتی می‌شوید. جزئیات فیزیک و هوای طوفانی باورنکردنی است.',
        date: '۳ روز پیش',
        likes: 245,
      },
      {
        id: 'rev-gta-2',
        author: 'سپهر نعمتی',
        rating: 9,
        recommend: true,
        pros: ['طراحی فوق‌العاده رادیوها و موسیقی متن', 'سیستم تیراندازی بهبود یافته'],
        cons: ['کنترل برخی قایق‌ها در موج‌های سنگین کمی قلق دارد'],
        comment: 'بهترین تجربه سندباکس در تمام تاریخ. ارزش هر سنت از خریدش را دارد.',
        date: '۱ هفته پیش',
        likes: 180,
      },
    ],
  },
  {
    id: 'game-wukong',
    title: 'Black Myth: Wukong',
    titleFa: 'افسانه سیاه: ووکانگ (Black Myth)',
    releaseYear: 2024,
    developer: 'Game Science',
    publisher: 'Game Science',
    engine: 'Unreal Engine 5.4',
    playtime: '۴۵ تا ۶۰ ساعت چالش اکشن',
    platforms: ['PC', 'PlayStation 5'],
    genres: ['Action RPG', 'Soulslike', 'Mythology'],
    bannerImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1920&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Destined One journeys into Chinese mythology in this visual tour-de-force built on Unreal Engine 5.',
    shortDescriptionFa: 'نقش «مقدر شده» (Destined One) را در سفری حماسی به ژرفای اسطوره‌شناسی کهن چین و رمان سفر به باختر بر عهده بگیرید.',
    fullDescription: 'Black Myth: Wukong is an action RPG rooted in Chinese mythology. As the Destined One, you shall venture into the vast and enchanting world to uncover the obscured truth beneath the veil of a glorious legend from the past.',
    fullDescriptionFa: 'بازی اکشن نقش‌آفرینی خیره‌کننده با موتور آنریل انجین ۵.۴ که مبارزات با چوب‌دستی جادویی روئی جینگو بنگ، تغییر شکل به موجودات دیگر و جادوهای عناصر کهن را با بالاترین کیفیت بصری ممکن عرضه می‌کند.',
    scores: {
      ign: 8.5,
      gamespot: 8,
      metacritic: 82,
      steam: '96% Overwhelmingly Positive',
      wikiGame: 9.3,
    },
    systemReqs: {
      min: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-8400 / AMD Ryzen 5 1600',
        gpu: 'NVIDIA GeForce GTX 1060 6GB / AMD RX 580 8GB',
        ram: '16 GB',
        storage: '130 GB SSD',
      },
      rec: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-9700 / AMD Ryzen 5 5500',
        gpu: 'NVIDIA GeForce RTX 4070 / AMD RX 7800 XT',
        ram: '16 GB DDR5',
        storage: '130 GB NVMe SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    ],
    trailers: [
      {
        title: 'Black Myth: Wukong - Final Gameplay Trailer',
        duration: '4:15',
        url: 'https://www.youtube.com',
        thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trainers: {
      title: 'Black Myth Wukong Trainer (+18 Features)',
      version: 'v1.0.8 Latest Patch',
      author: 'WikiGame Tech Lab',
      features: [
        'Numpad 1: خون بی‌نهایت',
        'Numpad 2: مانا و انرژی بی‌نهایت برای جادوها',
        'Numpad 3: استقامت (Stamina) نامحدود',
        'Numpad 4: افزایش ضریب دمیج چوب‌دستی به ۱۰ برابر',
      ],
      downloadUrl: '#download-trainer-wukong',
    },
    persianMod: {
      title: 'زیرنویس فارسی کامل اسطوره‌ای ووکانگ',
      type: 'ترجمه تمام اسناد اساطیری، دیالوگ‌ها و دفترچه راهنمای یائوگوای‌ها',
      translator: 'تیم زیرنویس ویکی‌گیم',
      features: [
        'معادل‌سازی دقیق اصطلاحات بودیسم و اسطوره‌شناسی چین',
        'فونت فارسی هنری متناسب با تم تاریخی بازی',
      ],
      installGuide: 'محتوای پوشه را در فولدر Paks بازی کپی کنید و launch option را با عبارت -fileopenlog اجرا کنید.',
      downloadUrl: '#download-persian-wukong',
      size: '85 MB',
    },
    walkthrough: {
      chapters: [
        {
          title: 'فصل اول: کوهستان باد سیاه (Black Wind Mountain)',
          summary: 'مسیر مبارزه با گرگ سفید، راهب بودایی آتشین و باس فینال خرس سیاه.',
          tips: ['قبل از مبارزه با خرس سیاه، حتما زنگ‌های سه‌گانه را به صدا درآورید تا باس مخفی باز شود.'],
        },
      ],
    },
    qa: [
      {
        id: 'qa-wukong-1',
        question: 'آیا درجه سختی بازی قابل تغییر است؟',
        author: 'رضا صبوری',
        answer: 'خیر، بازی دارای درجه سختی ثابت مانند بازی‌های سبک سولزلایک است اما ارتقای جادوها و تغییر فرم بازی را آسان‌تر می‌کند.',
        votes: 89,
      },
    ],
    reviews: [
      {
        id: 'rev-wuk-1',
        author: 'فرزاد کاظمی',
        rating: 9,
        recommend: true,
        pros: ['تنوع دیوانه‌وار باس‌فایت‌ها', 'سیستم تغییر فرم و جادوها', 'گرافیک نسل بعدی'],
        cons: ['دیوارهای نامرئی در برخی گوشه‌های نقشه'],
        comment: 'یکی از غافلگیرکننده‌ترین بازی‌های چند سال اخیر. طراحی باس‌ها و صداگذاری سازهای سنتی شاهکار است.',
        date: '۲ هفته پیش',
        likes: 194,
      },
    ],
  },
  {
    id: 'game-cyberpunk',
    title: 'Cyberpunk 2077: Phantom Liberty',
    titleFa: 'سایبرپانک ۲۰۷۷: فانتوم لیبرتی',
    releaseYear: 2023,
    developer: 'CD Projekt RED',
    publisher: 'CD Projekt',
    engine: 'REDengine 4 (Ray Tracing Overdrive)',
    playtime: '۳۰+ ساعت ماجراجویی جاسوسی نایت‌سیتی',
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    genres: ['Open World', 'Cyberpunk', 'Sci-Fi RPG'],
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Spy-thriller expansion in the dangerous walled district of Dogtown starring Idris Elba as Solomon Reed.',
    shortDescriptionFa: 'بسته الحاقی جاسوسی مهیج در منطقه خودمختار و خطرناک داگ‌تاون با نقش‌آفرینی ادریس البا و کیانو ریوز.',
    fullDescription: 'Phantom Liberty is a spy-thriller adventure for Cyberpunk 2077. When the orbital shuttle of the President of the New USA is shot down over the deadliest district of Night City, there is only one person who can save her — you.',
    fullDescriptionFa: 'داستان شاتل سرنگون‌شده رئیس‌جمهور مایرز در داگ‌تاون، منطقه زیر نظر کلنل کرت هنسن. به همراه سالومون رید و جانی سیلورهند، شبکه‌ای پیچیده از خیانت‌های اطلاعاتی و فناوری‌های غیرقانونی فراتر از بلک‌وال را کشف کنید.',
    scores: {
      ign: 9,
      gamespot: 10,
      metacritic: 90,
      steam: '95% Overwhelmingly Positive',
      wikiGame: 9.7,
    },
    systemReqs: {
      min: {
        os: 'Windows 10 64-bit',
        cpu: 'Core i7-6700 / Ryzen 5 1600',
        gpu: 'GTX 1060 6GB / RX 580',
        ram: '12 GB',
        storage: '70 GB SSD Required',
      },
      rec: {
        os: 'Windows 11 64-bit',
        cpu: 'Core i7-12700 / Ryzen 7 7800X3D',
        gpu: 'RTX 4070 Ti Super / RX 7900 XT',
        ram: '32 GB',
        storage: '70 GB NVMe',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    ],
    trailers: [
      {
        title: 'Cyberpunk 2077: Phantom Liberty Official Cinematic Trailer',
        duration: '3:05',
        url: 'https://www.youtube.com',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      },
    ],
    trainers: {
      title: 'Cyberpunk 2077 + Phantom Liberty Trainer (+24)',
      version: 'v2.13 Updated',
      author: 'FLiNG',
      features: [
        'Numpad 1: جان و زره بی‌نهایت',
        'Numpad 2: RAM سایبرور نامحدود برای کوئیک‌هک',
        'Numpad 3: یورو دلار (پول) بی‌نهایت',
        'Numpad 4: قطعات آپگرید بی‌نهایت',
      ],
      downloadUrl: '#download-trainer-cyberpunk',
    },
    persianMod: {
      title: 'فارسی‌ساز کامل سایبرپانک ۲۰۷۷ + دی ال سی داگ‌تاون',
      type: 'زیرنویس کامل منوها و ماموریت‌ها',
      translator: 'گروه گیمینگ ویکی‌گیم',
      features: [
        'زیرنویس فارسی دقیق با هماهنگی کامل فونت سایبرپانک',
        'ترجمه تمام اسناد متنی و دیتاشیت‌های داگ‌تاون',
      ],
      installGuide: 'فایل آرشیو را در پوشه archive/pc/mod کپی کنید.',
      downloadUrl: '#download-persian-mod-cyberpunk',
      size: '140 MB',
    },
    walkthrough: {
      chapters: [
        {
          title: 'فصل اول: نجات رئیس‌جمهور مایرز از سفینه سقوط‌کرده',
          summary: 'ورود مخفیانه به ورزشگاه داگ‌تاون و مبارزه با ربات عظیم‌الجثه کایمرا.',
          tips: ['شلیک به نقاط ضعیف زرد رنگ ربات کایمرا آسیب دوبرابر می‌زند.'],
        },
      ],
    },
    qa: [
      {
        id: 'qa-cp-1',
        question: 'آیا برای تجربه فانتوم لیبرتی باید بازی اصلی تمام شده باشد؟',
        author: 'امید فکری',
        answer: 'خیر، می‌توانید مستقیما از منوی اصلی با یک کاراکتر لول ۱۵ آماده وارد داستان داگ‌تاون شوید.',
        votes: 56,
      },
    ],
    reviews: [
      {
        id: 'rev-cp-1',
        author: 'سینا خلیلی',
        rating: 10,
        recommend: true,
        pros: ['بازیگری فوق‌العاده ادریس البا', 'پایان‌بندی‌های تراژیک و تاثیرگذار', 'گرافیک پث‌تریسینگ فضایی'],
        cons: ['کوتاه بودن برخی ماموریت‌های فرعی'],
        comment: 'یکی از احساسی‌ترین و عمیق‌ترین بسته‌های الحاقی تاریخ گیمینگ. داگ‌تاون اتمسفر وحشتناک جذابی دارد.',
        date: '۲ هفته پیش',
        likes: 112,
      },
    ],
  },
];

export default function WikiGameLanding({ onReturnToCatalog = () => {} }: WikiGameProps) {
  const { direction, language } = useStore();
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  // Navigation mode: 'PORTAL' (Home) or 'GAME_DETAIL'
  const [viewMode, setViewMode] = useState<'PORTAL' | 'GAME_DETAIL'>('PORTAL');
  const [selectedGameId, setSelectedGameId] = useState<string>(WIKI_GAMES[0].id);

  // Search query & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState('ALL');
  const [selectedGenreFilter, setSelectedGenreFilter] = useState('ALL');

  // 3D Carousel active index for trending games
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Active Tab in Game Detail Page
  const [activeTab, setActiveTab] = useState<
    'OVERVIEW' | 'SCREENSHOTS' | 'VIDEOS' | 'TRAINER' | 'PERSIAN_MOD' | 'WALKTHROUGH' | 'QA' | 'REVIEWS'
  >('OVERVIEW');

  // User Review Gate: "آیا تجربه بازی را دارید؟"
  const [hasPlayedGame, setHasPlayedGame] = useState<boolean | null>(null);

  // Review Form States
  const [formRating, setFormRating] = useState(9);
  const [formRecommend, setFormRecommend] = useState(true);
  const [formPros, setFormPros] = useState('');
  const [formCons, setFormCons] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formComment, setFormComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Ask Question Modal State
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionAuthor, setNewQuestionAuthor] = useState('');

  // Store for custom reviews added during session
  const [allGames, setAllGames] = useState<GameData[]>(WIKI_GAMES);

  const currentGame = allGames.find((g) => g.id === selectedGameId) || allGames[0];

  // Dynamic User Score calculation based on all reviews
  const calculatedUserScore = useMemo(() => {
    if (currentGame.reviews.length === 0) return 9.0;
    const sum = currentGame.reviews.reduce((acc, r) => acc + r.rating, 0);
    return Number((sum / currentGame.reviews.length).toFixed(1));
  }, [currentGame.reviews]);

  // Filtered games for omni-search
  const filteredGames = useMemo(() => {
    return allGames.filter((game) => {
      const matchSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.titleFa.includes(searchQuery) ||
        game.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchPlatform =
        selectedPlatformFilter === 'ALL' || game.platforms.includes(selectedPlatformFilter);

      const matchGenre = selectedGenreFilter === 'ALL' || game.genres.includes(selectedGenreFilter);

      return matchSearch && matchPlatform && matchGenre;
    });
  }, [allGames, searchQuery, selectedPlatformFilter, selectedGenreFilter]);

  const handleSelectGame = (gameId: string) => {
    soundFx.playClick(700);
    setSelectedGameId(gameId);
    setViewMode('GAME_DETAIL');
    setActiveTab('OVERVIEW');
    setHasPlayedGame(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextCarousel = () => {
    soundFx.playTick(900);
    setCarouselIndex((prev) => (prev + 1) % allGames.length);
  };

  const handlePrevCarousel = () => {
    soundFx.playTick(800);
    setCarouselIndex((prev) => (prev - 1 + allGames.length) % allGames.length);
  };

  // Submit Review and recalculate dynamic score
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formComment.trim()) return;

    soundFx.playChime(950, 0.25);

    const newReview: GameReview = {
      id: `rev-${Date.now()}`,
      author: formAuthor.trim() || (isFa ? 'کاربر گیمر ویکی‌گیم' : 'Anonymous Gamer'),
      rating: formRating,
      recommend: formRecommend,
      pros: formPros
        ? formPros.split(',').map((p) => p.trim()).filter(Boolean)
        : [isFa ? 'گیم‌پلی روان' : 'Fluid Gameplay'],
      cons: formCons ? formCons.split(',').map((c) => c.trim()).filter(Boolean) : [],
      comment: formComment,
      date: isFa ? 'هم‌اکنون' : 'Just now',
      likes: 1,
    };

    setAllGames((prev) =>
      prev.map((g) => (g.id === currentGame.id ? { ...g, reviews: [newReview, ...g.reviews] } : g))
    );

    setReviewSubmitted(true);
    setFormComment('');
    setFormPros('');
    setFormCons('');
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  // Submit new QA Question
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    soundFx.playClick(800);
    const newQA = {
      id: `qa-${Date.now()}`,
      question: newQuestionText.trim(),
      author: newQuestionAuthor.trim() || (isFa ? 'کاربر پرسشگر' : 'Community Member'),
      answer: isFa ? 'پرسش شما با موفقیت ثبت شد و به زودی توسط کارشناسان ویکی‌گیم پاسخ داده می‌شود.' : 'Question submitted and pending editorial verification.',
      votes: 1,
    };

    setAllGames((prev) =>
      prev.map((g) => (g.id === currentGame.id ? { ...g, qa: [newQA, ...g.qa] } : g))
    );

    setNewQuestionText('');
    setNewQuestionAuthor('');
    setIsAskingQuestion(false);
  };

  return (
    <div
      dir={direction}
      className="min-h-screen bg-[#07090e] text-[#f1f5f9] font-['Plus_Jakarta_Sans'] selection:bg-rose-500 selection:text-white relative overflow-x-hidden"
    >
      {/* Top Header & Portal Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/90 border-b border-rose-500/20 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick(600);
              setViewMode('PORTAL');
            }}
            className="flex items-center gap-2 group text-right"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-500 p-[1px] flex items-center justify-center shadow-lg shadow-rose-500/20">
              <div className="w-full h-full bg-[#0b0e14] rounded-[11px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="font-['Syne'] font-black tracking-wider text-base text-white block leading-none">
                WIKI<span className="text-rose-500">.</span>GAME
              </span>
              <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">
                {isFa ? 'دایره‌المعارف تخصصی گیمینگ و بازی‌ها' : 'The Definitive Gaming Encyclopedia'}
              </span>
            </div>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {viewMode === 'GAME_DETAIL' && (
            <button
              onClick={() => {
                soundFx.playClick(500);
                setViewMode('PORTAL');
              }}
              className="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isFa ? 'صفحه اصلی ویکی‌گیم' : 'Back to Wiki Home'}</span>
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playClick(600);
              onReturnToCatalog();
            }}
            className="px-3.5 py-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-mono text-xs font-bold transition-colors"
          >
            {isFa ? 'خروج به نمایشگاه' : 'Exit to Catalog'}
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* VIEW 1: MAIN WIKI PORTAL (صفحه اصلی دایره‌المعارف)                        */}
      {/* ========================================================================= */}
      {viewMode === 'PORTAL' && (
        <main className="space-y-16 pb-24">
          {/* Hero & Giant Search Engine */}
          <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 font-mono text-xs shadow-lg shadow-rose-950/40">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>{isFa ? 'بزرگ‌ترین پایگاه داده، ترینرها، مادها و تحلیل بازی‌ها' : 'GAMING REPOSITORIES & BENCHMARKS'}</span>
              </div>

              <h1 className="font-['Syne'] text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
                {isFa ? (
                  <>
                    دایره‌المعارف جامع بازی‌های رایانه‌ای؛ <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-400">
                      مرجع نقد، ترینر، ماد فارسی‌ساز و راهنما.
                    </span>
                  </>
                ) : (
                  <>
                    The Unified Gaming Encyclopedia; <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-400">
                      Reviews, Trainers, Mods & Walkthroughs.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light">
                {isFa
                  ? 'جستجو در آرشیو هزاران بازی، مقایسه امتیازات رسمی IGN، گیم‌اسپات، متاکریتیک و امتیاز کاربران سایت، همراه با دانلود ترینرهای تست‌شده و زیرنویس‌های فارسی.'
                  : 'Search through curated game encyclopedias, compare IGN & Metacritic scores, and access verified trainers and localized subtitles.'}
              </p>

              {/* GIANT OMNI SEARCH BOX (کادر بزرگ و مشخص جستجو) */}
              <div className="pt-4 max-w-3xl mx-auto">
                <div className="relative flex items-center shadow-2xl">
                  <div className="absolute inset-y-0 right-4 sm:right-6 flex items-center pointer-events-none text-rose-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isFa
                        ? 'جستجوی نام بازی (مثلا: GTA VI، ووکانگ، سایبرپانک...)، شرکت سازنده، سبک...'
                        : 'Search game title (e.g. GTA VI, Wukong, Cyberpunk), developer, genre...'
                    }
                    className="w-full py-5 pr-14 pl-6 sm:pr-16 rounded-2xl bg-zinc-900/90 border-2 border-rose-500/40 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/20 text-white placeholder-zinc-500 font-bold text-sm sm:text-base outline-none transition-all shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 left-4 flex items-center text-zinc-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Genre & Platform Quick Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                  {(
                    [
                      { id: 'ALL', label: isFa ? 'همه سبک‌ها' : 'All Genres' },
                      { id: 'Open World', label: isFa ? 'جهان باز (Open World)' : 'Open World' },
                      { id: 'Action RPG', label: isFa ? 'نقش‌آفرینی اکشن' : 'Action RPG' },
                      { id: 'Soulslike', label: isFa ? 'سولزلایک' : 'Soulslike' },
                      { id: 'Sci-Fi', label: isFa ? 'علمی تخیلی' : 'Sci-Fi' },
                    ] as const
                  ).map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => {
                        soundFx.playClick(500);
                        setSelectedGenreFilter(genre.id);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                        selectedGenreFilter === genre.id
                          ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-500/30'
                          : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {genre.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3D PERSPECTIVE COVER FLOW CAROUSEL (کروسل متحرک سه‌بعدی واقعی) */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <h2 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white">
                  {isFa ? 'ویترین بازی‌های جدید و پربحث (کروسل سه‌بعدی)' : 'Trending Releases • 3D Cover Flow'}
                </h2>
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevCarousel}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={handleNextCarousel}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* 3D Cover Flow Container with Perspective */}
            <div
              style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
              }}
              className="relative min-h-[380px] flex items-center justify-center overflow-hidden py-8"
            >
              {allGames.map((game, idx) => {
                const offset = idx - carouselIndex;
                const isActive = offset === 0;

                // 3D positioning
                const rotateY = offset * -28;
                const translateZ = isActive ? 100 : -140 * Math.abs(offset);
                const translateX = offset * 260;
                const opacity = Math.abs(offset) > 1 ? 0.3 : 1;

                return (
                  <div
                    key={game.id}
                    onClick={() => {
                      if (isActive) {
                        handleSelectGame(game.id);
                      } else {
                        soundFx.playClick(600);
                        setCarouselIndex(idx);
                      }
                    }}
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                      transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s',
                      opacity,
                    }}
                    className={`absolute w-72 sm:w-84 rounded-3xl border cursor-pointer overflow-hidden backdrop-blur-md select-none shadow-2xl ${
                      isActive
                        ? 'border-rose-500 bg-zinc-900 shadow-rose-950/60 ring-2 ring-rose-400 z-30'
                        : 'border-white/15 bg-zinc-950/80 hover:border-white/30 z-10'
                    }`}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={game.coverImage}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-rose-500/40 text-rose-300 font-mono text-[10px] font-bold">
                        {game.releaseYear}
                      </div>

                      {/* Score Badge */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500 text-white font-mono text-xs font-black shadow-lg">
                        <Star className="w-3.5 h-3.5 fill-white" />
                        <span>WikiGame {game.scores.wikiGame}</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-['Syne'] font-bold text-lg text-white">
                          {isFa ? game.titleFa : game.title}
                        </h3>
                        <span className="text-xs text-zinc-400 font-mono block mt-0.5">
                          {game.developer} &bull; {game.publisher}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                        {isFa ? game.shortDescriptionFa : game.shortDescription}
                      </p>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span>{game.platforms.join(' / ')}</span>
                        <span className="text-rose-400 font-bold flex items-center gap-1">
                          {isFa ? 'ورود به صفحه بازی' : 'Open Wiki'} &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ALL GAMES GRID & SEARCH RESULTS */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-['Syne'] text-xl font-bold text-white">
                {isFa ? 'نتایج آرشیو دایره‌المعارف' : 'Encyclopedia Database'} ({filteredGames.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  onClick={() => handleSelectGame(game.id)}
                  className="rounded-3xl border border-white/10 bg-zinc-950/70 overflow-hidden cursor-pointer hover:border-rose-500/50 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={game.bannerImage}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 font-mono text-[10px] text-zinc-300 border border-white/10">
                        {game.releaseYear}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-['Syne'] font-bold text-lg text-white group-hover:text-rose-400 transition-colors">
                          {isFa ? game.titleFa : game.title}
                        </h3>
                        <span className="text-xs text-zinc-400 font-mono block mt-0.5">
                          {game.developer} &bull; {game.publisher}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                        {isFa ? game.shortDescriptionFa : game.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-500">{game.platforms[0]}</span>
                    <span className="text-rose-400 font-bold group-hover:underline">
                      {isFa ? 'مشاهده تمام مشخصات' : 'View Full Details'} &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: GAME DETAIL & REVIEWS SUITE (صفحه اختصاصی هر بازی)                */}
      {/* ========================================================================= */}
      {viewMode === 'GAME_DETAIL' && (
        <main className="space-y-12 pb-28 animate-in fade-in duration-300">
          {/* 1. CINEMATIC FULL-WIDTH HEADER WITH GLASSMORPHIC HUD OVERLAY */}
          <div className="relative min-h-[520px] sm:min-h-[580px] flex items-end justify-center overflow-hidden">
            {/* Full-width Banner Image */}
            <img
              src={currentGame.bannerImage}
              alt={currentGame.title}
              className="absolute inset-0 w-full h-full object-cover object-center scale-105"
            />
            {/* Vignette & Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/60 to-transparent" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80 pointer-events-none" />

            {/* FLOATING GLASS HUD OVERLAY (کادر با ترنسپرنسی کم روی تصویر هدر) */}
            <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 pb-10">
              <div className="p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-black/45 border border-white/20 shadow-2xl space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Side: Platforms, Title, Year, Developer, Publisher */}
                  <div className="space-y-3">
                    {/* Platform Chips */}
                    <div className="flex flex-wrap items-center gap-2">
                      {currentGame.platforms.map((plat) => (
                        <span
                          key={plat}
                          className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-mono text-xs text-white font-bold"
                        >
                          {plat}
                        </span>
                      ))}
                      <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 font-mono text-xs text-rose-300 font-bold">
                        {currentGame.releaseYear}
                      </span>
                    </div>

                    {/* Big Game Title */}
                    <h1 className="font-['Syne'] text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                      {isFa ? currentGame.titleFa : currentGame.title}
                    </h1>

                    {/* Studio Metadata */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono text-zinc-300">
                      <div>
                        <span className="text-zinc-500 block text-[10px]">{isFa ? 'توسعه‌دهنده:' : 'Developer:'}</span>
                        <span className="text-white font-bold">{currentGame.developer}</span>
                      </div>
                      <div className="border-r border-white/20 h-6" />
                      <div>
                        <span className="text-zinc-500 block text-[10px]">{isFa ? 'ناشر بین‌المللی:' : 'Publisher:'}</span>
                        <span className="text-white font-bold">{currentGame.publisher}</span>
                      </div>
                      <div className="border-r border-white/20 h-6" />
                      <div>
                        <span className="text-zinc-500 block text-[10px]">{isFa ? 'موتور گرافیکی:' : 'Engine:'}</span>
                        <span className="text-cyan-300 font-bold">{currentGame.engine}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Scoreboard Matrix (Metacritic, IGN, GameSpot, Steam, WikiGame, User Score) */}
                  <div className="flex flex-wrap items-center gap-3 bg-black/60 p-4 sm:p-5 rounded-2xl border border-white/15">
                    {/* IGN Score */}
                    <div className="text-center px-2">
                      <span className="text-[10px] font-mono text-zinc-400 block">IGN</span>
                      <span className="font-mono text-lg font-black text-red-500">{currentGame.scores.ign}/10</span>
                    </div>

                    <div className="border-r border-white/10 h-8" />

                    {/* Metacritic Score */}
                    <div className="text-center px-2">
                      <span className="text-[10px] font-mono text-zinc-400 block">METACRITIC</span>
                      <span className="font-mono text-lg font-black text-emerald-400">{currentGame.scores.metacritic}</span>
                    </div>

                    <div className="border-r border-white/10 h-8" />

                    {/* WikiGame Editorial Score */}
                    <div className="text-center px-3 py-1 rounded-xl bg-rose-500/20 border border-rose-500/40">
                      <span className="text-[10px] font-mono text-rose-300 block font-bold">WIKIGAME</span>
                      <span className="font-mono text-xl font-black text-rose-400">{currentGame.scores.wikiGame}</span>
                    </div>

                    <div className="border-r border-white/10 h-8" />

                    {/* Live Community User Score */}
                    <div className="text-center px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40">
                      <span className="text-[10px] font-mono text-amber-300 block font-bold">
                        {isFa ? 'امتیاز کاربران' : 'USER SCORE'}
                      </span>
                      <span className="font-mono text-xl font-black text-amber-400">
                        {calculatedUserScore}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. SHORT DESCRIPTION DIRECTLY UNDER HEADER */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-light max-w-4xl">
                {isFa ? currentGame.shortDescriptionFa : currentGame.shortDescription}
              </p>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                  {currentGame.playtime}
                </span>
              </div>
            </div>
          </div>

          {/* 3. RICH TABBED CYBER DECK (تب‌های زیر صفحه) */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
            {/* Tabs Bar */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-950 border border-white/15 overflow-x-auto">
              {[
                { id: 'OVERVIEW', label: isFa ? 'توضیحات و مشخصات' : 'Full Overview', icon: FileText },
                { id: 'SCREENSHOTS', label: isFa ? 'تصاویر 4K' : 'Screenshots', icon: ImageIcon },
                { id: 'VIDEOS', label: isFa ? 'ویدیوها و تریلر' : 'Trailers & Video', icon: Video },
                { id: 'TRAINER', label: isFa ? 'ترینر و چیت' : 'Trainers & Cheats', icon: Terminal },
                { id: 'PERSIAN_MOD', label: isFa ? 'ماد فارسی‌ساز' : 'Persian Mod', icon: Download },
                { id: 'WALKTHROUGH', label: isFa ? 'راهنمای مراحل' : 'Walkthrough', icon: Compass },
                { id: 'QA', label: isFa ? 'پرسش و پاسخ' : 'Q&A Community', icon: HelpCircle },
                { id: 'REVIEWS', label: isFa ? 'نقد و بررسی موشکافانه' : 'In-Depth Reviews', icon: Star },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playClick(600);
                      setActiveTab(tab.id as any);
                    }}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
                      isActive
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT 1: OVERVIEW & SYSTEM REQS */}
            {activeTab === 'OVERVIEW' && (
              <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/70 space-y-8 animate-in fade-in duration-200">
                <div className="space-y-4">
                  <h3 className="font-['Syne'] font-bold text-2xl text-white">
                    {isFa ? 'داستان و تحلیل موشکافانه بازی' : 'Plot Synopsis & Gameplay Mechanics'}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed font-light whitespace-pre-line">
                    {isFa ? currentGame.fullDescriptionFa : currentGame.fullDescription}
                  </p>
                </div>

                {/* System Requirements Matrix */}
                <div className="space-y-4 border-t border-white/10 pt-6">
                  <h4 className="font-['Syne'] font-bold text-xl text-white">
                    {isFa ? 'سیستم مورد نیاز برای اجرای بازی روی رایانه‌های شخصی (PC):' : 'PC System Requirements:'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Minimum */}
                    <div className="p-6 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                      <span className="font-mono text-xs text-amber-400 font-bold block uppercase">
                        {isFa ? 'حداقل سیستم مورد نیاز (1080p 30 FPS)' : 'Minimum Requirements'}
                      </span>
                      <div className="space-y-2 text-xs font-mono text-zinc-300">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-zinc-500">OS:</span>
                          <span>{currentGame.systemReqs.min.os}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-zinc-500">CPU:</span>
                          <span>{currentGame.systemReqs.min.cpu}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-zinc-500">GPU:</span>
                          <span>{currentGame.systemReqs.min.gpu}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-zinc-500">RAM:</span>
                          <span>{currentGame.systemReqs.min.ram}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Storage:</span>
                          <span>{currentGame.systemReqs.min.storage}</span>
                        </div>
                      </div>
                    </div>

                    {/* Recommended */}
                    <div className="p-6 rounded-2xl bg-black/50 border border-rose-500/30 space-y-3">
                      <span className="font-mono text-xs text-rose-400 font-bold block uppercase">
                        {isFa ? 'سیستم پیشنهادی (1440p / 4K 60+ FPS)' : 'Recommended Requirements'}
                      </span>
                      <div className="space-y-2 text-xs font-mono text-zinc-300">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-zinc-500">OS:</span>
                          <span>{currentGame.systemReqs.rec.os}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-zinc-500">CPU:</span>
                          <span>{currentGame.systemReqs.rec.cpu}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-zinc-500">GPU:</span>
                          <span>{currentGame.systemReqs.rec.gpu}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-zinc-500">RAM:</span>
                          <span>{currentGame.systemReqs.rec.ram}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Storage:</span>
                          <span>{currentGame.systemReqs.rec.storage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: SCREENSHOTS */}
            {activeTab === 'SCREENSHOTS' && (
              <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/70 space-y-6 animate-in fade-in duration-200">
                <h3 className="font-['Syne'] font-bold text-2xl text-white">
                  {isFa ? 'گالری تصاویر با کیفیت 4K و ریتریسنگ' : '4K Ray-Tracing Screenshot Gallery'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentGame.screenshots.map((shot, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-white/15 relative group">
                      <img
                        src={shot}
                        alt="Screenshot"
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/80 font-mono text-[10px] text-white">
                        4K HDR CAPTURE
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: VIDEOS & TRAILERS */}
            {activeTab === 'VIDEOS' && (
              <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/70 space-y-6 animate-in fade-in duration-200">
                <h3 className="font-['Syne'] font-bold text-2xl text-white">
                  {isFa ? 'ویدیوها، تریلرهای رسمی و گیم‌پلی بازی' : 'Official Trailers & Gameplay Footage'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentGame.trailers.map((vid, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden border border-white/15 bg-black/60 space-y-3 p-4">
                      <div className="relative h-60 rounded-xl overflow-hidden group cursor-pointer">
                        <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                          <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 fill-white ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 font-mono text-xs text-white">
                          {vid.duration}
                        </div>
                      </div>
                      <h4 className="font-['Syne'] font-bold text-base text-white">{vid.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: TRAINER & CHEATS MATRIX */}
            {activeTab === 'TRAINER' && (
              <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/70 space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-['Syne'] font-bold text-2xl text-white">
                      {currentGame.trainers.title}
                    </h3>
                    <span className="font-mono text-xs text-zinc-400 mt-1 block">
                      {currentGame.trainers.version} &bull; Author: {currentGame.trainers.author}
                    </span>
                  </div>

                  <a
                    href={currentGame.trainers.downloadUrl}
                    onClick={() => soundFx.playChime(800, 0.15)}
                    className="px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-500/20 shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isFa ? 'دانلود ترینر تست‌شده' : 'Download Verified Trainer'}</span>
                  </a>
                </div>

                <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs">
                  <span className="text-rose-400 font-bold block">{isFa ? 'کلیدهای میانبر فعال‌سازی:' : 'Hotkey Mappings:'}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentGame.trainers.features.map((feat, fIdx) => (
                      <div key={fIdx} className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-zinc-200 flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 5: PERSIAN LOCALIZATION MOD */}
            {activeTab === 'PERSIAN_MOD' && (
              <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/70 space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-['Syne'] font-bold text-2xl text-white">
                      {currentGame.persianMod.title}
                    </h3>
                    <span className="font-mono text-xs text-zinc-400 mt-1 block">
                      {currentGame.persianMod.type} &bull; {currentGame.persianMod.translator} &bull; {currentGame.persianMod.size}
                    </span>
                  </div>

                  <a
                    href={currentGame.persianMod.downloadUrl}
                    onClick={() => soundFx.playChime(800, 0.15)}
                    className="px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-500/20 shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isFa ? 'دانلود رایگان پچ فارسی‌ساز' : 'Download Localization Mod'}</span>
                  </a>
                </div>

                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                    <span className="text-rose-400 font-bold text-xs font-mono block">{isFa ? 'ویژگی‌های بسته ترجمه:' : 'Features:'}</span>
                    {currentGame.persianMod.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-zinc-400 font-bold text-xs font-mono block">{isFa ? 'راهنمای نصب:' : 'Installation Guide:'}</span>
                    <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                      {currentGame.persianMod.installGuide}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 6: WALKTHROUGH & SECRETS */}
            {activeTab === 'WALKTHROUGH' && (
              <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/70 space-y-6 animate-in fade-in duration-200">
                <h3 className="font-['Syne'] font-bold text-2xl text-white">
                  {isFa ? 'راهنمای قدم‌به‌قدم مراحل و استراتژی شکست باس‌ها' : 'Comprehensive Walkthrough & Secrets'}
                </h3>
                <div className="space-y-4">
                  {currentGame.walkthrough.chapters.map((ch, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                      <h4 className="font-['Syne'] font-bold text-lg text-white">{ch.title}</h4>
                      <p className="text-xs text-zinc-300 leading-relaxed font-light">{ch.summary}</p>
                      <div className="pt-2 border-t border-white/5 space-y-1">
                        {ch.tips.map((tip, tIdx) => (
                          <div key={tIdx} className="flex items-center gap-2 text-xs text-amber-300 font-mono">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 7: Q&A COMMUNITY */}
            {activeTab === 'QA' && (
              <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/70 space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-['Syne'] font-bold text-2xl text-white">
                      {isFa ? 'پرسش‌ها و پاسخ‌های جامعه گیمرها' : 'Community Questions & Answers'}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      {isFa ? 'درباره مراحل، خطاهای اجرای بازی، حل معماها و کرک‌ها سوال بپرسید.' : 'Ask questions about quests, PC errors, or system compatibility.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playClick(600);
                      setIsAskingQuestion(!isAskingQuestion);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4 text-rose-400" />
                    <span>{isFa ? 'ثبت پرسش جدید' : 'Ask a Question'}</span>
                  </button>
                </div>

                {/* Ask Question Form */}
                {isAskingQuestion && (
                  <form onSubmit={handleAddQuestion} className="p-6 rounded-2xl bg-black/60 border border-rose-500/30 space-y-4 animate-in fade-in">
                    <h4 className="font-['Syne'] font-bold text-base text-white">
                      {isFa ? 'طرح پرسش جدید درباره این بازی:' : 'Submit New Inquiry:'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        value={newQuestionAuthor}
                        onChange={(e) => setNewQuestionAuthor(e.target.value)}
                        placeholder={isFa ? 'نام یا نام مستعار شما' : 'Your Gamer Tag'}
                        className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none focus:border-rose-400"
                      />
                    </div>
                    <textarea
                      required
                      rows={3}
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder={isFa ? 'متن سوال یا مشکل خود را به صورت دقیق بنویسید...' : 'Describe your question or issue in detail...'}
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none focus:border-rose-400"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAskingQuestion(false)}
                        className="px-4 py-2 rounded-xl bg-white/5 text-zinc-400 text-xs font-mono"
                      >
                        {isFa ? 'انصراف' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-mono font-bold flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isFa ? 'ارسال پرسش' : 'Submit Question'}</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Questions List */}
                <div className="space-y-4">
                  {currentGame.qa.map((item) => (
                    <div key={item.id} className="p-6 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <h4 className="font-['Syne'] font-bold text-base text-white">{item.question}</h4>
                        </div>
                        <span className="font-mono text-xs text-zinc-500 shrink-0">{item.votes} رای تایید</span>
                      </div>
                      <div className="pl-6 border-l-2 border-rose-500/40 space-y-1">
                        <span className="text-[10px] font-mono text-zinc-400 block">{isFa ? 'پاسخ کارشناس ویکی‌گیم:' : 'Official Answer:'}</span>
                        <p className="text-xs text-zinc-200 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 8: USER REVIEWS & CRITIQUE GATE */}
            {activeTab === 'REVIEWS' && (
              <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/70 space-y-8 animate-in fade-in duration-200">
                {/* Gate: "آیا تجربه بازی را دارید؟" */}
                <div className="p-6 rounded-2xl bg-black/60 border border-rose-500/30 text-center space-y-4">
                  <h3 className="font-['Syne'] font-bold text-xl sm:text-2xl text-white">
                    {isFa ? 'آیا تجربه این بازی را دارید؟' : 'Have you personally played this game?'}
                  </h3>
                  <p className="text-xs text-zinc-300 max-w-xl mx-auto font-light">
                    {isFa
                      ? 'برای حفظ دقت و صداقت نمرات جامعه کاربری ویکی‌گیم، تنها بازیکنانی که بازی را تجربه کرده‌اند مجاز به ثبت نمره و بررسی موشکافانه هستند.'
                      : 'To preserve editorial integrity, verified gamers with hands-on gameplay experience grade our community score.'}
                  </p>

                  <div className="flex items-center justify-center gap-4 pt-2">
                    <button
                      onClick={() => {
                        soundFx.playChime(750, 0.15);
                        setHasPlayedGame(true);
                      }}
                      className={`px-8 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                        hasPlayedGame === true
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>{isFa ? 'بله، بازی را تجربه کرده‌ام' : 'Yes, I have played it'}</span>
                    </button>

                    <button
                      onClick={() => {
                        soundFx.playTick(500);
                        setHasPlayedGame(false);
                      }}
                      className={`px-8 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                        hasPlayedGame === false
                          ? 'bg-zinc-800 text-zinc-400'
                          : 'bg-white/5 hover:bg-white/10 text-zinc-400'
                      }`}
                    >
                      <X className="w-4 h-4" />
                      <span>{isFa ? 'خیر، هنوز بازی نکرده‌ام' : 'No, not yet'}</span>
                    </button>
                  </div>

                  {hasPlayedGame === false && (
                    <div className="p-4 rounded-xl bg-zinc-900 text-xs text-zinc-400 font-mono animate-in fade-in">
                      {isFa
                        ? 'می‌توانید نظرات دیگر بازیکنان را در پایین مطالعه کنید و پس از تجربه این شاهکار، نمره خود را ثبت فرمایید.'
                        : 'Explore player impressions below. Return here after your playthrough to record your review.'}
                    </div>
                  )}
                </div>

                {/* REVIEW FORM (باز شدن فرم در صورت انتخاب بله) */}
                {hasPlayedGame === true && (
                  <form onSubmit={handleSubmitReview} className="p-6 sm:p-8 rounded-3xl bg-black/80 border border-white/20 space-y-6 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <h4 className="font-['Syne'] font-bold text-xl text-white">
                        {isFa ? 'فرم ثبت نقد و بررسی و محاسبه در امتیاز سایت:' : 'Submit In-Depth Review & Score:'}
                      </h4>
                      <div className="flex items-center gap-2 font-mono text-sm">
                        <span className="text-zinc-400">{isFa ? 'نمره شما:' : 'Your Score:'}</span>
                        <span className="px-3 py-1 rounded-lg bg-rose-500 text-white font-black">{formRating}/10</span>
                      </div>
                    </div>

                    {/* Recommendation Toggle & Score Slider */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Score Slider */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-400 block">
                          {isFa ? 'نمره کلی از ۱۰ به این اثر:' : 'Score from 1 to 10:'}
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={formRating}
                          onChange={(e) => {
                            soundFx.playTick(600 + Number(e.target.value) * 40);
                            setFormRating(Number(e.target.value));
                          }}
                          className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                        />
                      </div>

                      {/* Recommend / Don't Recommend */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-400 block">
                          {isFa ? 'آیا تجربه بازی را به دیگران پیشنهاد می‌کنید؟' : 'Do you recommend this game?'}
                        </label>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              soundFx.playClick(700);
                              setFormRecommend(true);
                            }}
                            className={`flex-1 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                              formRecommend
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                                : 'bg-white/5 text-zinc-400'
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>{isFa ? 'پیشنهاد می‌کنم' : 'Recommend'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              soundFx.playClick(500);
                              setFormRecommend(false);
                            }}
                            className={`flex-1 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                              !formRecommend
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50'
                                : 'bg-white/5 text-zinc-400'
                            }`}
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                            <span>{isFa ? 'پیشنهاد نمی‌کنم' : 'Do not recommend'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-emerald-400 block">
                          {isFa ? 'نقاط قوت (+) با ویرگول جدا کنید:' : 'Pros (+) separated by comma:'}
                        </label>
                        <input
                          type="text"
                          value={formPros}
                          onChange={(e) => setFormPros(e.target.value)}
                          placeholder={isFa ? 'مثال: گرافیک خیره‌کننده، موسیقی شاهکار، داستان عمیق' : 'e.g. Stunning visuals, Great OST'}
                          className="w-full p-3 rounded-xl bg-zinc-900 border border-emerald-500/30 text-white text-xs outline-none focus:border-emerald-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono text-rose-400 block">
                          {isFa ? 'نقاط ضعف (-) با ویرگول جدا کنید:' : 'Cons (-) separated by comma:'}
                        </label>
                        <input
                          type="text"
                          value={formCons}
                          onChange={(e) => setFormCons(e.target.value)}
                          placeholder={isFa ? 'مثال: افت فریم در شلوغی، باگ‌های جزئی' : 'e.g. Occasional stuttering'}
                          className="w-full p-3 rounded-xl bg-zinc-900 border border-rose-500/30 text-white text-xs outline-none focus:border-rose-400"
                        />
                      </div>
                    </div>

                    {/* Author & Review Comment */}
                    <div className="space-y-4">
                      <div className="max-w-md">
                        <label className="text-xs font-mono text-zinc-400 block mb-1">
                          {isFa ? 'نام نویسنده نقد:' : 'Your Gamer Name:'}
                        </label>
                        <input
                          type="text"
                          value={formAuthor}
                          onChange={(e) => setFormAuthor(e.target.value)}
                          placeholder={isFa ? 'نام یا شناسه شما' : 'Gamer Tag'}
                          className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none focus:border-rose-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-zinc-400 block">
                          {isFa ? 'متن کامل تحلیل و نقد شما:' : 'Detailed Review Commentary:'}
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formComment}
                          onChange={(e) => setFormComment(e.target.value)}
                          placeholder={isFa ? 'دیدگاه موشکافانه خود درباره گیم‌پلی، گرافیک، داستان و ارزش خرید را بنویسید...' : 'Share your critique on story, performance, and replayability...'}
                          className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none focus:border-rose-400 leading-relaxed"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] font-mono text-zinc-400">
                        {isFa ? 'نمره شما بلافاصله در میانگین امتیاز کاربران سایت محاسبه می‌شود.' : 'Your rating will immediately update the community aggregate.'}
                      </span>
                      <button
                        type="submit"
                        className="px-8 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-500/25 transition-all hover:scale-105"
                      >
                        <Award className="w-4 h-4" />
                        <span>{isFa ? 'ثبت و انتشار نقد' : 'Publish Review'}</span>
                      </button>
                    </div>

                    {reviewSubmitted && (
                      <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-xs text-center flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isFa ? 'نقد شما با موفقیت ثبت شد و امتیاز کاربران سایت بروزرسانی گردید!' : 'Review published & community score refreshed!'}</span>
                      </div>
                    )}
                  </form>
                )}

                {/* REVIEWS LIST */}
                <div className="space-y-4 pt-4">
                  <h4 className="font-['Syne'] font-bold text-lg text-white">
                    {isFa ? 'دیدگاه‌های موشکافانه ثبت‌شده توسط کاربران ویکی‌گیم:' : 'Community Published Reviews:'}
                  </h4>

                  {currentGame.reviews.map((rev) => (
                    <div key={rev.id} className="p-6 rounded-2xl bg-black/50 border border-white/10 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-['Syne'] font-bold text-base text-white">{rev.author}</span>
                            <span className="text-[10px] font-mono text-zinc-500">{rev.date}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {rev.recommend ? (
                              <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                                <ThumbsUp className="w-3 h-3" /> {isFa ? 'پیشنهاد می‌کند' : 'Recommends'}
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[11px] font-mono text-rose-400">
                                <ThumbsDown className="w-3 h-3" /> {isFa ? 'پیشنهاد نمی‌کند' : 'Does not recommend'}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="px-3 py-1 rounded-xl bg-rose-500 text-white font-mono font-black text-sm">
                          {rev.rating}/10
                        </div>
                      </div>

                      <p className="text-xs text-zinc-200 leading-relaxed font-light">{rev.comment}</p>

                      {/* Pros & Cons Pills */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                        {rev.pros.map((p, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                            + {p}
                          </span>
                        ))}
                        {rev.cons.map((c, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-full bg-rose-950/60 text-rose-400 border border-rose-500/20 text-[10px] font-mono">
                            - {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Footer Return Bar */}
      <footer className="py-12 px-4 sm:px-6 border-t border-white/10 text-center font-mono text-xs text-zinc-500 relative z-10">
        <p className="mb-3">
          {isFa
            ? 'دایره‌المعارف ویکی‌گیم • تمامی تحلیل‌ها، تریلرها و نمرات تحت استاندارد مرجع گیمینگ.'
            : 'WikiGame Definitive Encyclopedia • All rights reserved.'}
        </p>
        <button
          onClick={() => {
            soundFx.playClick(500);
            onReturnToCatalog();
          }}
          className="text-rose-400 hover:underline inline-flex items-center gap-1"
        >
          <span>{isFa ? 'بازگشت به نمایشگاه ۶۰ قطعه ای' : 'Return to Catalog Showroom'}</span>
          {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </footer>
    </div>
  );
}
