import React, { useState, useMemo } from 'react';
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
  Play
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
    wikiGame: number; // our site score out of 10
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
  qa: { question: string; author: string; answer: string; votes: number }[];
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
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    genres: ['Open World', 'Action-Adventure', 'Crime'],
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
        os: 'Windows 11 (64-bit)',
        cpu: 'Intel Core i7-8700K / AMD Ryzen 5 3600',
        gpu: 'NVIDIA GeForce RTX 2070 8GB / AMD Radeon RX 5700 XT',
        ram: '16 GB RAM',
        storage: '150 GB DirectStorage NVMe SSD',
      },
      rec: {
        os: 'Windows 11 (64-bit)',
        cpu: 'Intel Core i9-13900K / AMD Ryzen 7 7800X3D',
        gpu: 'NVIDIA GeForce RTX 4080 16GB / AMD Radeon RX 7900 XTX',
        ram: '32 GB DDR5 RAM',
        storage: '150 GB High-Speed PCIe 5.0 SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    ],
    trailers: [
      {
        title: 'Official Reveal Trailer 1 (Vice City 4K)',
        duration: '1:31 min',
        url: 'https://www.youtube.com',
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Gameplay Mechanics & RAGE 9 Tech Breakdown',
        duration: '4:15 min',
        url: 'https://www.youtube.com',
        thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
      },
    ],
    trainers: {
      title: 'Fling Trainer v1.0.4 Plus 28 Options',
      version: '1.0.4',
      author: 'FLiNG & WikiGame Tech Lab',
      features: [
        'Numpad 1: سلامتی بی‌نهایت (God Mode / Infinite Health)',
        'Numpad 2: استقامت و مهمات نامحدود (Infinite Stamina & Ammo)',
        'Numpad 3: حذف پلیس و درجه تعقیب (Zero Wanted Level)',
        'Numpad 4: پول و حساب بانکی بی‌نهایت (Infinite Cash)',
        'Numpad 5: سوپر اسپید و تلمپورت به مارکر نقشه (Teleport to Waypoint)',
      ],
      downloadUrl: '#download-trainer-gta6',
    },
    persianMod: {
      title: 'ماد فارسی‌ساز جامع وایس‌سیتی (زیرنویس منو و تمام دیالوگ‌ها)',
      type: 'فارسی‌ساز متن + زیرنویس فارسی اختصاصی',
      translator: 'گروه ترجمه تخصصی گیمینگ ویکی‌گیم',
      features: [
        'ترجمه ۱۰۰٪ تمامی مراحل داستانی و ماموریت‌های فرعی',
        'زیرنویس همگام‌شده برای مکالمات رادیویی و مکالمات عابرین',
        'سازگار با آخرین آپدیت استیم و سوشال کلاب راک‌استار',
        'فونت اختصاصی فارسی خوانا با ابعاد استاندارد و تنظیم موقعیت',
      ],
      installGuide: 'فایل دانلودی را استخراج کرده و پوشه mods را در محل نصب بازی کپی نمایید. سپس لانچر اختصاصی را اجرا کنید.',
      downloadUrl: '#download-persian-mod-gta6',
      size: '280 MB',
    },
    walkthrough: {
      chapters: [
        {
          title: 'فصل اول: فرار از زندان لئونیدا و بازگشت به وایس‌سیتی',
          summary: 'آشنایی با مکانیزم‌های تیراندازی جدید، فرار در باتلاق‌های اورگلیدز و به سرقت بردن قایق تندرو.',
          tips: ['همیشه از پوشش‌های بتنی استفاده کنید.', 'شلیک به مخزن سوخت هلیکوپتر پلیس سریع‌ترین راه خروج است.'],
        },
        {
          title: 'فصل دوم: سازماندهی سرقت بزرگ از صرافی اوشن درایو',
          summary: 'برنامه‌ریزی نقشه‌های سرقت، استخدام راننده و کارگذاری بمب‌های الکترومغناطیسی EMP.',
          tips: ['استفاده از گاز خواب‌آور از آلارم بانک جلوگیری می‌کند.'],
        },
      ],
    },
    qa: [
      {
        question: 'آیا برای اجرای بازی حتما به اس‌اس‌دی NVMe نیاز است یا روی HDD هم اجرا می‌شود؟',
        author: 'سامان گیمر',
        answer: 'به دلیل حجم بالای استریمینگ بافت‌ها و عدم وجود لودینگ اسکرین، نصب روی حافظه پرسرعت SSD NVMe با پشتیبانی از DirectStorage الزامی است.',
        votes: 42,
      },
      {
        question: 'آیا بازی روی ویندوز ۱۰ هم اجرا می‌شود؟',
        author: 'کیانوش راد',
        answer: 'بله، نسخه ۶۴ بیتی ویندوز ۱۰ با بیلد ۲۱H2 به بالا پشتیبانی می‌شود اما برای عملکرد پایدارتر ویندوز ۱۱ توصیه شده است.',
        votes: 19,
      },
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'آرشام پیروز',
        rating: 10,
        recommend: true,
        pros: ['گرافیک و نورپردازی بی‌رقیب', 'هوش مصنوعی زنده شهروندان', 'روایت داستانی و شخصیت‌پردازی شاهکار'],
        cons: ['سیستم مورد نیاز سنگین برای تنظیمات الترا'],
        comment: 'شاهکار بدون چون‌وچرای راک‌استار. جزئیات بازی به حدی بالاست که ساعت‌ها فقط محو تماشای خیابان‌های وایس‌سیتی می‌شوید.',
        date: '۱ روز پیش',
        likes: 128,
      },
      {
        id: 'rev-2',
        author: 'Farhad_Gamer99',
        rating: 9,
        recommend: true,
        pros: ['گان‌پلی روان و واقع‌گرایانه', 'موسیقی و گویندگی استثنایی'],
        cons: ['افت فریم مقطعی در مناطق شلوغ مرکز شهر'],
        comment: 'بهترین جهان‌بازی که تا امروز خلق شده. داستان لوسیا و جیسون فوق‌العاده پرداخته شده است.',
        date: '۳ روز پیش',
        likes: 64,
      },
    ],
  },
  {
    id: 'game-black-myth',
    title: 'Black Myth: Wukong',
    titleFa: 'افسانه سیاه: ووکانگ',
    releaseYear: 2024,
    developer: 'Game Science',
    publisher: 'Game Science',
    platforms: ['PC', 'PlayStation 5'],
    genres: ['Action RPG', 'Soulslike', 'Mythology'],
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Embark on a mythical journey across ancient China as the Destined One, armed with the legendary staff and 72 transformations.',
    shortDescriptionFa: 'سفر به دل اساطیر کهن چین در نقش مقدرشده (The Destined One)؛ نبردهای حماسی با چوب‌دستی جادویی و تغییر شکل به ۷۲ فرم با موتور آنریل انجین ۵.',
    fullDescription: 'Black Myth: Wukong is an action RPG rooted in Chinese mythology. Set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past.',
    fullDescriptionFa: 'بازی اکشن نقش‌آفرینی بر پایه رمان کلاسیک «سفر به باختر». جلوه‌های بصری خیره‌کننده با فناوری Nanite و Lumen آنریل انجین ۵، مبارزات سریع و بیش از ۸۰ باس‌فایت چالش‌برانگیز.',
    scores: {
      ign: 9.0,
      gamespot: 8.5,
      metacritic: 82,
      steam: '96% Overwhelmingly Positive',
      wikiGame: 9.2,
    },
    systemReqs: {
      min: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-8400 / AMD Ryzen 5 1600',
        gpu: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB',
        ram: '16 GB RAM',
        storage: '130 GB SSD',
      },
      rec: {
        os: 'Windows 10/11 64-bit',
        cpu: 'Intel Core i7-9700 / AMD Ryzen 5 5500',
        gpu: 'NVIDIA GeForce RTX 2060 / AMD Radeon RX 5700 XT',
        ram: '16 GB RAM',
        storage: '130 GB High-Speed SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    ],
    trailers: [
      {
        title: 'Launch Trailer 4K Boss Rush',
        duration: '3:20 min',
        url: 'https://www.youtube.com',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      },
    ],
    trainers: {
      title: 'WeMod Black Myth Trainer Plus 32',
      version: '1.0.8',
      author: 'WeMod & FLiNG',
      features: [
        'F1: جان نامحدود (Infinite Health)',
        'F2: مانا و استقامت بی‌نهایت (Infinite Mana & Stamina)',
        'F3: افزایش فوکوس و آسیب ضربات (Max Focus / Instant Stance)',
        'F4: سکه و ویل نامحدود (Infinite Will & Spark)',
      ],
      downloadUrl: '#download-trainer-wukong',
    },
    persianMod: {
      title: 'ماد ترجمه دیالوگ‌ها و لور اساطیری ووکانگ',
      type: 'زیرنویس فارسی کامل',
      translator: 'تیم زیرنویس ویکی‌گیم',
      features: [
        'ترجمه اشعار و دیالوگ‌های فلسفی کهن',
        'توضیحات فارسی برای تمام ارواح و اسپل‌ها',
      ],
      installGuide: 'فایل Pak را در مسیر Paks/~mods قرار دهید.',
      downloadUrl: '#download-mod-wukong',
      size: '85 MB',
    },
    walkthrough: {
      chapters: [
        {
          title: 'فصل اول: کوهستان گرگ‌های سیاه و شکست گوانگ‌ژی',
          summary: 'یادگیری فرم دفاعی صخره و کسب اولین ترنسفورمیشن.',
          tips: ['استفاده از اسپل Freeze در هنگام شارژ حمله باس.'],
        },
      ],
    },
    qa: [
      {
        question: 'آیا درجه سختی در بازی قابل تغییر است؟',
        author: 'رضا امینی',
        answer: 'خیر، بازی درجه سختی پیش‌فرض ندارد اما با باز کردن اسپل‌های جادویی و تغییر فرم‌ها می‌توانید نبردها را بسیار آسان‌تر کنید.',
        votes: 31,
      },
    ],
    reviews: [
      {
        id: 'rev-wukong-1',
        author: 'پرهام ناصری',
        rating: 9,
        recommend: true,
        pros: ['باس‌فایت‌های بسیار متنوع', 'جلوه‌های صوتی و موسیقی سنتی چینی', 'طراحی مسحورکننده محیط‌ها'],
        cons: ['دیوارهای نامرئی در برخی بخش‌های نقشه'],
        comment: 'یک تجربه بی‌نظیر برای طرفداران سبک اکشن اسطوره‌ای. طراحی هر باس‌فایت منحصربه‌فرد است.',
        date: 'هفته گذشته',
        likes: 95,
      },
    ],
  },
  {
    id: 'game-cyberpunk-phantom',
    title: 'Cyberpunk 2077: Phantom Liberty',
    titleFa: 'سایبرپانک ۲۰۷۷: فانتوم لیبرتی',
    releaseYear: 2023,
    developer: 'CD Projekt RED',
    publisher: 'CD Projekt',
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    genres: ['Sci-Fi', 'RPG', 'Open World', 'Cyberpunk'],
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1920&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'A gripping spy-thriller expansion set in the dangerous district of Dogtown starring Idris Elba as Solomon Reed.',
    shortDescriptionFa: 'بسته الحاقی مهیج و جاسوسی در منطقه خطرناک داگ‌تاون با نقش‌آفرینی ادریس البا در نقش سالومون رید و بازگشت جانی سیلورهند.',
    fullDescription: 'Phantom Liberty is a spy-thriller expansion for Cyberpunk 2077. Return as cyber-enhanced mercenary V, and embark on a high-stakes mission of espionage and survival to save the NUSA President. Re-engineered perk trees, vehicle combat, and Path Tracing graphics.',
    fullDescriptionFa: 'فانتوم لیبرتی اوج پختگی سی‌دی‌پراجکت است. ارتقای بنیادین سیستم مهارت‌ها (Perk 2.0)، نبردهای ماشینی مجهز به مسلسل و راکت، و هوش مصنوعی تهاجمی پلیس نایت‌سیتی.',
    scores: {
      ign: 9.0,
      gamespot: 9.0,
      metacritic: 89,
      steam: '95% Overwhelmingly Positive',
      wikiGame: 9.4,
    },
    systemReqs: {
      min: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i7-6700 / AMD Ryzen 5 1600',
        gpu: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580',
        ram: '12 GB RAM',
        storage: '70 GB SSD Required',
      },
      rec: {
        os: 'Windows 10/11 64-bit',
        cpu: 'Intel Core i7-12700 / AMD Ryzen 7 7800X',
        gpu: 'NVIDIA GeForce RTX 3080 / AMD Radeon RX 6800 XT',
        ram: '16 GB RAM',
        storage: '70 GB NVMe SSD',
      },
    },
    screenshots: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    ],
    trailers: [
      {
        title: 'Cinematic Spy Thriller Trailer ft. Idris Elba',
        duration: '2:45 min',
        url: 'https://www.youtube.com',
        thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      },
    ],
    trainers: {
      title: 'Cyberpunk 2077 v2.13 Trainer +36 Options',
      version: '2.13',
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
      const matchQuery =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.titleFa.includes(searchQuery) ||
        game.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.publisher.toLowerCase().includes(searchQuery.toLowerCase());

      const matchPlatform =
        selectedPlatformFilter === 'ALL' || game.platforms.some((p) => p.includes(selectedPlatformFilter));

      const matchGenre =
        selectedGenreFilter === 'ALL' || game.genres.includes(selectedGenreFilter);

      return matchQuery && matchPlatform && matchGenre;
    });
  }, [allGames, searchQuery, selectedPlatformFilter, selectedGenreFilter]);

  const handleSelectGame = (gameId: string) => {
    soundFx.playClick(650);
    setSelectedGameId(gameId);
    setViewMode('GAME_DETAIL');
    setActiveTab('OVERVIEW');
    setHasPlayedGame(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextCarousel = () => {
    soundFx.playClick(500);
    setCarouselIndex((prev) => (prev + 1) % allGames.length);
  };

  const handlePrevCarousel = () => {
    soundFx.playClick(500);
    setCarouselIndex((prev) => (prev - 1 + allGames.length) % allGames.length);
  };

  // Submit Review Handler
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formComment.trim()) return;

    soundFx.playChime(850, 0.2);

    const newReview: GameReview = {
      id: `rev-user-${Date.now()}`,
      author: formAuthor.trim() || (isFa ? 'کاربر منتقد' : 'Verified Gamer'),
      rating: formRating,
      recommend: formRecommend,
      pros: formPros
        ? formPros.split(',').map((s) => s.trim()).filter(Boolean)
        : [isFa ? 'گیم‌پلی روان' : 'Fluid Gameplay'],
      cons: formCons
        ? formCons.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      comment: formComment,
      date: isFa ? 'همین الان' : 'Just Now',
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

  return (
    <div
      dir={direction}
      className="min-h-screen bg-[#07090e] text-[#f1f5f9] font-['Plus_Jakarta_Sans'] selection:bg-rose-500 selection:text-white"
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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-500 p-[1px] flex items-center justify-center">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 font-mono text-xs">
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
                    className="w-full py-5 pr-14 pl-6 sm:pr-16 rounded-2xl bg-zinc-900/90 border-2 border-rose-500/40 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/20 text-white placeholder-zinc-500 font-bold text-sm sm:text-base outline-none transition-all"
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

          {/* 3D ROTATING CAROUSEL FOR TRENDING GAMES (کروسل متحرک سه‌بعدی) */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <h2 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white">
                  {isFa ? 'ویترین بازی‌های جدید و پربحث (کروسل سه‌بعدی)' : 'Trending Releases • 3D Carousel'}
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

            {/* 3D Showcase Card Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allGames.map((game, idx) => {
                const isActive = idx === carouselIndex;
                return (
                  <div
                    key={game.id}
                    onClick={() => handleSelectGame(game.id)}
                    className={`rounded-3xl border cursor-pointer overflow-hidden transition-all duration-500 relative group ${
                      isActive
                        ? 'border-rose-500 bg-zinc-900 shadow-2xl shadow-rose-950/50 scale-[1.03] ring-1 ring-rose-400'
                        : 'border-white/10 bg-zinc-950/60 hover:border-white/20'
                    }`}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={game.coverImage}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-rose-500/40 text-rose-300 font-mono text-[10px] font-bold">
                        {game.releaseYear}
                      </div>

                      {/* Score Badge */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/90 text-white font-mono text-xs font-black shadow-lg">
                        <Star className="w-3.5 h-3.5 fill-white" />
                        <span>WikiGame {game.scores.wikiGame}</span>
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

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span>{game.platforms.join(' / ')}</span>
                        <span className="text-rose-400 font-bold group-hover:underline flex items-center gap-1">
                          <span>{isFa ? 'مشاهده پرونده کامل' : 'View Dossier'}</span>
                          {isRtl ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Search Results Grid (if search term is entered) */}
          {searchQuery && (
            <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
              <h3 className="font-['Syne'] text-xl font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-rose-400" />
                <span>{isFa ? `نتایج جستجو برای: «${searchQuery}» (${filteredGames.length} مورد)` : `Search Results (${filteredGames.length})`}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => handleSelectGame(game.id)}
                    className="p-5 rounded-2xl border border-white/10 bg-zinc-900/60 hover:border-rose-400 cursor-pointer transition-all"
                  >
                    <h4 className="font-bold text-base text-white">{game.title}</h4>
                    <span className="text-xs text-rose-400 font-mono">{game.developer} ({game.releaseYear})</span>
                    <p className="text-xs text-zinc-300 mt-2 line-clamp-2">{game.shortDescriptionFa}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Featured Community Reviews Section */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
            <h2 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white">
              {isFa ? 'نظرات و تحلیل‌های برگزیده جامعه گیمرها' : 'Featured Community Reviews'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allGames.flatMap((g) => g.reviews).slice(0, 4).map((rev) => (
                <div key={rev.id} className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center font-bold text-xs text-rose-400">
                        {rev.author[0]}
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-white">{rev.author}</strong>
                        <span className="text-[10px] text-zinc-500 block">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{rev.rating} / 10</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    «{rev.comment}»
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {rev.pros.map((p, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        + {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: GAME DOSSIER & DETAIL PAGE (صفحه اصلی و توضیحات بازی)             */}
      {/* ========================================================================= */}
      {viewMode === 'GAME_DETAIL' && (
        <main className="space-y-12 pb-24">
          {/* FULL-WIDTH IMMERSIVE HEADER WITH GLASSMORPHISM OVERLAY BOX */}
          <div className="relative w-full min-h-[520px] flex items-end overflow-hidden border-b border-white/10">
            {/* Background Full-Width Banner Image */}
            <img
              src={currentGame.bannerImage}
              alt={currentGame.title}
              className="absolute inset-0 w-full h-full object-cover filter brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/60 to-transparent" />

            {/* Glassmorphism Overlay Box (کادر با ترنسپرنسی کم روی هدر) */}
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 relative z-10">
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 backdrop-blur-2xl border border-white/20 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left: Metadata */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {currentGame.platforms.map((p, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-lg bg-white/10 text-[11px] font-mono text-zinc-300">
                        {p}
                      </span>
                    ))}
                    <span className="px-2.5 py-0.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-[11px] font-bold">
                      {currentGame.releaseYear}
                    </span>
                  </div>

                  <h1 className="font-['Syne'] text-3xl sm:text-5xl font-black text-white">
                    {isFa ? currentGame.titleFa : currentGame.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                    <span>{isFa ? 'شرکت سازنده:' : 'Developer:'} <strong className="text-zinc-200">{currentGame.developer}</strong></span>
                    <span>&bull;</span>
                    <span>{isFa ? 'شرکت ناشر:' : 'Publisher:'} <strong className="text-zinc-200">{currentGame.publisher}</strong></span>
                  </div>
                </div>

                {/* Right: Scores Dashboard (امتیازهای پلتفرم‌های معروف + WikiGame + امتیاز کاربران) */}
                <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {/* IGN */}
                  <div className="p-3 rounded-2xl bg-black/60 border border-white/10 text-center">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase block">IGN SCORE</span>
                    <span className="font-mono text-lg font-black text-red-400">{currentGame.scores.ign} / 10</span>
                  </div>

                  {/* GameSpot */}
                  <div className="p-3 rounded-2xl bg-black/60 border border-white/10 text-center">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase block">GAMESPOT</span>
                    <span className="font-mono text-lg font-black text-amber-400">{currentGame.scores.gamespot} / 10</span>
                  </div>

                  {/* Metacritic */}
                  <div className="p-3 rounded-2xl bg-black/60 border border-white/10 text-center">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase block">METACRITIC</span>
                    <span className="font-mono text-lg font-black text-emerald-400">{currentGame.scores.metacritic}</span>
                  </div>

                  {/* Steam */}
                  <div className="p-3 rounded-2xl bg-black/60 border border-white/10 text-center">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase block">STEAM</span>
                    <span className="font-mono text-xs font-bold text-sky-400 leading-tight block mt-1">Positive</span>
                  </div>

                  {/* WIKIGAME OFFICIAL SCORE (سایت خودمون) */}
                  <div className="p-3 rounded-2xl bg-rose-950/70 border border-rose-500/40 text-center shadow-lg">
                    <span className="text-[10px] text-rose-300 font-mono font-bold uppercase block">WIKIGAME</span>
                    <span className="font-mono text-xl font-black text-rose-400">{currentGame.scores.wikiGame} / 10</span>
                  </div>

                  {/* USER SCORE (امتیاز کاربران سایت - محاسبه زنده) */}
                  <div className="p-3 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-center shadow-lg">
                    <span className="text-[10px] text-emerald-300 font-mono font-bold uppercase block">
                      {isFa ? 'امتیاز کاربران' : 'USER SCORE'}
                    </span>
                    <span className="font-mono text-xl font-black text-emerald-400">
                      {calculatedUserScore} / 10
                    </span>
                    <span className="text-[9px] text-zinc-400 font-mono block">({currentGame.reviews.length} {isFa ? 'رای' : 'votes'})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SHORT DESCRIPTION RIGHT UNDER HEADER (توضیح کوتاه زیر هدر) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-400 block mb-1">
                {isFa ? 'خلاصه داستان و ماهیت بازی:' : 'Synopsis & Game Essence:'}
              </span>
              <p className="text-sm text-zinc-200 leading-relaxed font-light">
                {isFa ? currentGame.shortDescriptionFa : currentGame.shortDescription}
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COMPREHENSIVE TAB NAVIGATION SYSTEM (سیستم تب‌بندی جامع)                 */}
          {/* ========================================================================= */}
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
              {(
                [
                  { id: 'OVERVIEW', label: isFa ? 'توضیح کامل و سیستم' : 'Overview & Specs', icon: <FileText className="w-4 h-4" /> },
                  { id: 'SCREENSHOTS', label: isFa ? 'تصاویر بازی (4K)' : 'Screenshots', icon: <ImageIcon className="w-4 h-4" /> },
                  { id: 'VIDEOS', label: isFa ? 'ویدیو و تریلرها' : 'Videos & Trailers', icon: <Video className="w-4 h-4" /> },
                  { id: 'TRAINER', label: isFa ? 'ترینر و کد تقلب' : 'Trainer & Cheats', icon: <Download className="w-4 h-4" /> },
                  { id: 'PERSIAN_MOD', label: isFa ? 'ماد فارسی‌ساز' : 'Persian Localization Mod', icon: <Award className="w-4 h-4" /> },
                  { id: 'WALKTHROUGH', label: isFa ? 'راهنمای مراحل' : 'Walkthrough Guide', icon: <Layers className="w-4 h-4" /> },
                  { id: 'QA', label: isFa ? 'پرسش و پاسخ' : 'Community Q&A', icon: <HelpCircle className="w-4 h-4" /> },
                  { id: 'REVIEWS', label: isFa ? 'نقد و بررسی کاربران' : 'User Reviews & Score', icon: <MessageSquare className="w-4 h-4" /> },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundFx.playClick(600);
                    setActiveTab(tab.id);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW & SYSTEM REQUIREMENTS */}
            {activeTab === 'OVERVIEW' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/70 space-y-4">
                  <h3 className="font-['Syne'] font-bold text-2xl text-white">
                    {isFa ? 'توضیحات و نقد تخصصی بازی' : 'Comprehensive Game Overview'}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed font-light">
                    {isFa ? currentGame.fullDescriptionFa : currentGame.fullDescription}
                  </p>
                </div>

                {/* System Requirements Table */}
                <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/70 space-y-6">
                  <h3 className="font-['Syne'] font-bold text-xl text-white flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-rose-400" />
                    <span>{isFa ? 'جدول حداقل سیستم و سیستم پیشنهادی برای PC' : 'System Requirements Matrix'}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Minimum */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-black/40 space-y-3 font-mono text-xs">
                      <span className="font-bold text-amber-400 block mb-2">{isFa ? 'حداقل سیستم مورد نیاز (MINIMUM):' : 'MINIMUM REQUIREMENTS:'}</span>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-500">OS:</span>
                        <span>{currentGame.systemReqs.min.os}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-500">CPU:</span>
                        <span>{currentGame.systemReqs.min.cpu}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-500">GPU:</span>
                        <span>{currentGame.systemReqs.min.gpu}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-500">RAM:</span>
                        <span>{currentGame.systemReqs.min.ram}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">STORAGE:</span>
                        <span>{currentGame.systemReqs.min.storage}</span>
                      </div>
                    </div>

                    {/* Recommended */}
                    <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 space-y-3 font-mono text-xs">
                      <span className="font-bold text-emerald-400 block mb-2">{isFa ? 'سیستم پیشنهادی (RECOMMENDED 60FPS):' : 'RECOMMENDED REQUIREMENTS:'}</span>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-500">OS:</span>
                        <span>{currentGame.systemReqs.rec.os}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-500">CPU:</span>
                        <span>{currentGame.systemReqs.rec.cpu}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-500">GPU:</span>
                        <span>{currentGame.systemReqs.rec.gpu}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-500">RAM:</span>
                        <span>{currentGame.systemReqs.rec.ram}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">STORAGE:</span>
                        <span>{currentGame.systemReqs.rec.storage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SCREENSHOTS GALLERY */}
            {activeTab === 'SCREENSHOTS' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                {currentGame.screenshots.map((shot, idx) => (
                  <div key={idx} className="relative rounded-3xl overflow-hidden border border-white/15 group">
                    <img src={shot} alt="" className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded-xl bg-black/80 font-mono text-xs text-white">4K ULTRA RES</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: VIDEOS & TRAILERS */}
            {activeTab === 'VIDEOS' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                {currentGame.trailers.map((tr, idx) => (
                  <div key={idx} className="p-6 rounded-3xl border border-white/10 bg-zinc-950/80 space-y-4">
                    <div className="relative h-48 rounded-2xl overflow-hidden group">
                      <img src={tr.thumbnail} alt={tr.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-xl shadow-rose-500/40 group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-zinc-300">
                        {tr.duration}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-white">{tr.title}</h4>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: TRAINER & CHEATS */}
            {activeTab === 'TRAINER' && (
              <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-['Syne'] font-bold text-2xl text-white">
                      {currentGame.trainers.title}
                    </h3>
                    <span className="text-xs text-zinc-400 font-mono block mt-1">
                      {isFa ? 'نسخه سازگار:' : 'Build Version:'} {currentGame.trainers.version} &bull; {isFa ? 'سازنده:' : 'Author:'} {currentGame.trainers.author}
                    </span>
                  </div>

                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      soundFx.playChime(750, 0.2);
                      alert(isFa ? 'دانلود ترینر آغاز شد.' : 'Trainer download initiated.');
                    }}
                    className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isFa ? 'دانلود مستقیم ترینر' : 'Download Verified Trainer'}</span>
                  </a>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold block">
                    {isFa ? 'جدول کلیدهای فعال‌سازی تقلب:' : 'Hotkey Cheats Activation Table:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentGame.trainers.features.map((feat, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-zinc-200 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PERSIAN LOCALIZATION MOD (ماد فارسی ساز) */}
            {activeTab === 'PERSIAN_MOD' && (
              <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-['Syne'] font-bold text-2xl text-white">
                      {currentGame.persianMod.title}
                    </h3>
                    <span className="text-xs text-cyan-400 font-mono block mt-1">
                      {currentGame.persianMod.type} &bull; {currentGame.persianMod.size}
                    </span>
                  </div>

                  <a
                    href="#download-mod"
                    onClick={(e) => {
                      e.preventDefault();
                      soundFx.playChime(750, 0.2);
                      alert(isFa ? 'دانلود ماد فارسی‌ساز با موفقیت شروع شد.' : 'Persian mod download initiated.');
                    }}
                    className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isFa ? 'دانلود رایگان ماد فارسی‌ساز' : 'Download Persian Mod'}</span>
                  </a>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h4 className="font-bold text-sm text-white">{isFa ? 'ویژگی‌های این نسخه فارسی‌ساز:' : 'Mod Features:'}</h4>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {currentGame.persianMod.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-zinc-300 space-y-1">
                    <strong className="text-cyan-300 block">{isFa ? 'راهنمای گام‌به‌گام نصب ماد:' : 'Installation Instructions:'}</strong>
                    <p>{currentGame.persianMod.installGuide}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: WALKTHROUGH & GUIDES */}
            {activeTab === 'WALKTHROUGH' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {currentGame.walkthrough.chapters.map((chap, i) => (
                  <div key={i} className="p-6 rounded-3xl border border-white/10 bg-zinc-950/80 space-y-3">
                    <h3 className="font-['Syne'] font-bold text-lg text-white">
                      {chap.title}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {chap.summary}
                    </p>
                    <div className="pt-2 border-t border-white/10 space-y-1">
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">{isFa ? 'نکات طلایی عبور از مرحله:' : 'Pro Survival Tips:'}</span>
                      {chap.tips.map((t, idx) => (
                        <span key={idx} className="text-xs text-zinc-400 block">• {t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 7: COMMUNITY Q&A */}
            {activeTab === 'QA' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex justify-between items-center">
                  <h3 className="font-['Syne'] font-bold text-xl text-white">
                    {isFa ? 'پرسش‌ها و پاسخ‌های فنی کاربران' : 'Community Technical Q&A'}
                  </h3>
                  <button
                    onClick={() => {
                      soundFx.playClick(600);
                      const q = prompt(isFa ? 'پرسش خود درباره بازی را بنویسید:' : 'Write your technical question:');
                      if (q) alert(isFa ? 'پرسش شما ثبت شد و در انتظار پاسخ جامعه کاربران است.' : 'Question submitted.');
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono transition-colors"
                  >
                    + {isFa ? 'ثبت پرسش جدید' : 'Ask Question'}
                  </button>
                </div>

                <div className="space-y-4">
                  {currentGame.qa.map((item, i) => (
                    <div key={i} className="p-6 rounded-3xl border border-white/10 bg-zinc-950/80 space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-bold text-sm text-white flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>{item.question}</span>
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-500 shrink-0">{item.author}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-300 leading-relaxed">
                        <strong className="text-emerald-400 block mb-1">{isFa ? 'پاسخ تاییدشده کارشناسان:' : 'Verified Community Answer:'}</strong>
                        {item.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: USER REVIEWS & INTERACTIVE SCORING FORM WITH "HAVE YOU PLAYED?" GATE */}
            {activeTab === 'REVIEWS' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* INTERACTIVE REVIEW GATE: "آیا تجربه بازی را دارید؟" */}
                <div className="p-8 rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-950/30 via-zinc-950 to-black space-y-6">
                  <div className="text-center space-y-2 max-w-xl mx-auto">
                    <h3 className="font-['Syne'] font-bold text-2xl text-white">
                      {isFa ? 'ثبت نقد و بررسی و تعیین امتیاز کاربران' : 'Submit Game Review & Influence Score'}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {isFa
                        ? 'برای ثبت نظر و تاثیر مستقیم روی امتیاز کاربران سایت، پاسخ به سوال زیر الزامی است:'
                        : 'To maintain score integrity, please confirm if you have hands-on playtime:'}
                    </p>
                  </div>

                  {/* Yes / No Question Gate */}
                  <div className="p-6 rounded-2xl bg-black/60 border border-white/10 text-center space-y-4 max-w-md mx-auto">
                    <h4 className="font-bold text-base text-amber-300">
                      {isFa ? 'آیا تجربه بازی را دارید؟' : 'Have you played this game?'}
                    </h4>

                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => {
                          soundFx.playChime(750, 0.2);
                          setHasPlayedGame(true);
                        }}
                        className={`px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                          hasPlayedGame === true
                            ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 scale-105'
                            : 'bg-white/10 text-white hover:bg-emerald-500 hover:text-black'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        <span>{isFa ? 'بله، بازی کرده‌ام' : 'Yes, I played'}</span>
                      </button>

                      <button
                        onClick={() => {
                          soundFx.playTick(400);
                          setHasPlayedGame(false);
                        }}
                        className={`px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                          hasPlayedGame === false
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105'
                            : 'bg-white/10 text-white hover:bg-rose-500'
                        }`}
                      >
                        <X className="w-4 h-4" />
                        <span>{isFa ? 'خیر، بازی نکرده‌ام' : 'No, not yet'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Feedback when user clicked NO */}
                  {hasPlayedGame === false && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center max-w-md mx-auto text-xs text-amber-300">
                      {isFa
                        ? 'برای ثبت نقد منصفانه، لطفا ابتدا بازی را تجربه کنید تا بتوانید نقاط قوت و ضعف واقعی آن را ثبت فرمایید.'
                        : 'Please play the title before submitting a critique to keep our community rating calibrated.'}
                    </div>
                  )}

                  {/* FORM OPENS WHEN USER CLICKED YES! */}
                  {hasPlayedGame === true && (
                    <form onSubmit={handleSubmitReview} className="space-y-6 pt-4 border-t border-white/10 max-w-2xl mx-auto animate-in fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Rating Slider (1 to 10) */}
                        <div className="space-y-2">
                          <label className="text-xs text-zinc-300 font-bold block">
                            {isFa ? 'امتیاز شما به بازی (از ۱۰):' : 'Your Rating (1 to 10):'}
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={formRating}
                              onChange={(e) => setFormRating(Number(e.target.value))}
                              className="w-full accent-rose-500 cursor-pointer"
                            />
                            <span className="font-mono text-xl font-black text-rose-400 w-8">{formRating}</span>
                          </div>
                        </div>

                        {/* Recommend toggle */}
                        <div className="space-y-2">
                          <label className="text-xs text-zinc-300 font-bold block">
                            {isFa ? 'آیا بازی را پیشنهاد می‌کنید؟' : 'Do you recommend?'}
                          </label>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setFormRecommend(true)}
                              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                formRecommend ? 'bg-emerald-500 text-black' : 'bg-white/10 text-zinc-400'
                              }`}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>{isFa ? 'پیشنهاد می‌کنم' : 'Recommend'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormRecommend(false)}
                              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                !formRecommend ? 'bg-rose-500 text-white' : 'bg-white/10 text-zinc-400'
                              }`}
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                              <span>{isFa ? 'پیشنهاد نمی‌کنم' : 'Do not recommend'}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Author Name */}
                      <div className="space-y-1">
                        <label className="text-xs text-zinc-300 font-bold block">{isFa ? 'نام یا نام مستعار منتقد:' : 'Gamer Handle / Name:'}</label>
                        <input
                          type="text"
                          value={formAuthor}
                          onChange={(e) => setFormAuthor(e.target.value)}
                          placeholder={isFa ? 'مثلا: سهراب گیمر' : 'e.g. CyberV'}
                          className="w-full py-2.5 px-4 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-rose-400"
                        />
                      </div>

                      {/* Pros (+) and Cons (-) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-emerald-400 font-bold block">{isFa ? 'نقاط قوت (+) با ویرگول جدا کنید:' : 'Pros (+):'}</label>
                          <input
                            type="text"
                            value={formPros}
                            onChange={(e) => setFormPros(e.target.value)}
                            placeholder={isFa ? 'گرافیک عالی، گیم‌پلی روان...' : 'Great graphics, fast combat'}
                            className="w-full py-2.5 px-4 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-emerald-400"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-rose-400 font-bold block">{isFa ? 'نکات بد و منفی (-) با ویرگول جدا کنید:' : 'Cons (-):'}</label>
                          <input
                            type="text"
                            value={formCons}
                            onChange={(e) => setFormCons(e.target.value)}
                            placeholder={isFa ? 'افت فریم، باگ‌های صوتی...' : 'Occasional frame drop'}
                            className="w-full py-2.5 px-4 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-rose-400"
                          />
                        </div>
                      </div>

                      {/* Comment text */}
                      <div className="space-y-1">
                        <label className="text-xs text-zinc-300 font-bold block">{isFa ? 'متن نقد و تجربه شما:' : 'Detailed Review Narrative:'}</label>
                        <textarea
                          rows={3}
                          value={formComment}
                          onChange={(e) => setFormComment(e.target.value)}
                          placeholder={isFa ? 'توضیحات و احساس شما از تجربه این بازی...' : 'Share your comprehensive thoughts...'}
                          className="w-full p-4 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-rose-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25 transition-all"
                      >
                        {isFa ? 'ذخیره نقد و محاسبه مجدد امتیاز کاربران' : 'Publish Review & Update Score'}
                      </button>

                      {reviewSubmitted && (
                        <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-center text-xs font-bold border border-emerald-500/40">
                          {isFa ? 'نقد شما با موفقیت ثبت شد و امتیاز کاربران به‌روزرسانی گردید!' : 'Review published and user score updated!'}
                        </div>
                      )}
                    </form>
                  )}
                </div>

                {/* List of Existing Reviews */}
                <div className="space-y-4">
                  <h3 className="font-['Syne'] font-bold text-xl text-white">
                    {isFa ? `آرشیو نقدهای ثبت‌شده (${currentGame.reviews.length})` : `All Verified Reviews (${currentGame.reviews.length})`}
                  </h3>

                  {currentGame.reviews.map((rev) => (
                    <div key={rev.id} className="p-6 rounded-3xl border border-white/10 bg-zinc-950/70 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center font-bold text-xs text-rose-400">
                            {rev.author[0]}
                          </div>
                          <div>
                            <strong className="text-xs font-bold text-white block">{rev.author}</strong>
                            <span className="text-[10px] text-zinc-500 font-mono">{rev.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                              rev.recommend ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {rev.recommend ? (isFa ? 'پیشنهاد می‌کند 👍' : 'Recommended') : (isFa ? 'پیشنهاد نمی‌کند 👎' : 'Not Recommended')}
                          </span>
                          <span className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 font-mono text-amber-300 font-bold text-xs">
                            ★ {rev.rating}/10
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-200 leading-relaxed">
                        «{rev.comment}»
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
                        {rev.pros.length > 0 && (
                          <div className="text-emerald-400">
                            <strong>{isFa ? 'نقاط قوت: ' : 'Pros: '}</strong>
                            <span>{rev.pros.join(' • ')}</span>
                          </div>
                        )}
                        {rev.cons.length > 0 && (
                          <div className="text-rose-400">
                            <strong>{isFa ? 'نقاط ضعف: ' : 'Cons: '}</strong>
                            <span>{rev.cons.join(' • ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}
