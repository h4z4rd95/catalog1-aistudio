import React, { useState, useMemo } from 'react';
import { soundFx } from '../../utils/audio';
import { useStore } from '../../context/StoreContext';
import {
  Gamepad2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Terminal,
  LayoutDashboard,
  BookOpen,
  Layers,
  Activity,
  Cpu
} from 'lucide-react';

import { GameData, GameReview } from './wiki/wikiTypes';
import WikiHomeCyberHolo from './wiki/WikiHomeCyberHolo';
import WikiHomeBentoCommand from './wiki/WikiHomeBentoCommand';
import WikiHomeEditorialMagazine from './wiki/WikiHomeEditorialMagazine';
import WikiDetailBentoHUD from './wiki/WikiDetailBentoHUD';
import WikiDetailCyberdeckLab from './wiki/WikiDetailCyberdeckLab';
import WikiDetailLuxuryLore from './wiki/WikiDetailLuxuryLore';

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

interface WikiGameProps {
  onReturnToCatalog?: () => void;
}

export default function WikiGameLanding({ onReturnToCatalog = () => {} }: WikiGameProps) {
  const { direction, language } = useStore();
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  // Navigation mode: 'PORTAL' (Home) or 'GAME_DETAIL'
  const [viewMode, setViewMode] = useState<'PORTAL' | 'GAME_DETAIL'>('PORTAL');
  const [selectedGameId, setSelectedGameId] = useState<string>(WIKI_GAMES[0].id);

  // Home Design Variant: 3 distinct creative samples
  const [homeVariant, setHomeVariant] = useState<'CYBER_HOLO' | 'BENTO_COMMAND' | 'EDITORIAL_MAGAZINE'>('CYBER_HOLO');

  // Game Detail Design Variant: 3 distinct creative samples
  const [detailVariant, setDetailVariant] = useState<'BENTO_HUD' | 'CYBERDECK_LAB' | 'LUXURY_LORE'>('BENTO_HUD');

  // Search query & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState('ALL');
  const [selectedGenreFilter, setSelectedGenreFilter] = useState('ALL');

  // Games state (with dynamic reviews)
  const [allGames, setAllGames] = useState<GameData[]>(WIKI_GAMES);

  const currentGame = allGames.find((g) => g.id === selectedGameId) || allGames[0];

  // Dynamic user score calculation
  const calculatedUserScore = useMemo(() => {
    if (currentGame.reviews.length === 0) return 9.0;
    const sum = currentGame.reviews.reduce((acc, r) => acc + r.rating, 0);
    return Number((sum / currentGame.reviews.length).toFixed(1));
  }, [currentGame.reviews]);

  // Filtered games
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewSubmit = (reviewData: {
    author: string;
    rating: number;
    recommend: boolean;
    pros: string[];
    cons: string[];
    comment: string;
  }) => {
    soundFx.playChime(950, 0.25);
    const newRev: GameReview = {
      id: `rev-${Date.now()}`,
      author: reviewData.author,
      rating: reviewData.rating,
      recommend: reviewData.recommend,
      pros: reviewData.pros,
      cons: reviewData.cons,
      comment: reviewData.comment,
      date: isFa ? 'هم‌اکنون' : 'Just now',
      likes: 1,
    };
    setAllGames((prev) =>
      prev.map((g) => (g.id === currentGame.id ? { ...g, reviews: [newRev, ...g.reviews] } : g))
    );
  };

  const handleAddQuestion = (qData: { author: string; question: string }) => {
    soundFx.playClick(800);
    const newQA = {
      id: `qa-${Date.now()}`,
      question: qData.question,
      author: qData.author,
      answer: isFa
        ? 'پرسش شما در صف بررسی کارشناسان دایره‌المعارف ویکی‌گیم قرار گرفت.'
        : 'Question registered in editorial queue.',
      votes: 1,
    };
    setAllGames((prev) =>
      prev.map((g) => (g.id === currentGame.id ? { ...g, qa: [newQA, ...g.qa] } : g))
    );
  };

  return (
    <div
      dir={direction}
      className="min-h-screen bg-[#07090e] text-[#f1f5f9] font-['Plus_Jakarta_Sans'] selection:bg-rose-500 selection:text-white relative overflow-x-hidden"
    >
      {/* 1. TOP HEADER & PORTAL NAVIGATION */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/95 border-b border-rose-500/20 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick(600);
              setViewMode('PORTAL');
            }}
            className="flex items-center gap-2.5 group text-right"
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
                {isFa ? 'سوپرسایت و دایره‌المعارف تخصصی گیمینگ' : 'The Definitive Gaming Super-Site'}
              </span>
            </div>
          </button>
        </div>

        {/* SAMPLE SWITCHERS (طراحی‌های متنوع صفحه اصلی و داخلی دقیقا طبق خواسته کاربر) */}
        <div className="flex flex-wrap items-center gap-2">
          {viewMode === 'PORTAL' ? (
            <div className="p-1 rounded-xl bg-zinc-950/90 border border-white/10 flex items-center gap-1 font-mono text-xs">
              <span className="text-zinc-500 px-2 hidden sm:inline">{isFa ? 'سبک صفحه اصلی:' : 'Home Style:'}</span>
              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setHomeVariant('CYBER_HOLO');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  homeVariant === 'CYBER_HOLO'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{isFa ? '۱. هولوگرافیک سایبرپانک' : '1. Cyber Holo'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setHomeVariant('BENTO_COMMAND');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  homeVariant === 'BENTO_COMMAND'
                    ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/25'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{isFa ? '۲. بنتو گرید ۲۰۲۶' : '2. Bento Grid'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setHomeVariant('EDITORIAL_MAGAZINE');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  homeVariant === 'EDITORIAL_MAGAZINE'
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-500/25'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isFa ? '۳. مجله ادیتوریال AAA' : '3. Editorial'}</span>
              </button>
            </div>
          ) : (
            <div className="p-1 rounded-xl bg-zinc-950/90 border border-white/10 flex items-center gap-1 font-mono text-xs">
              <span className="text-zinc-500 px-2 hidden sm:inline">{isFa ? 'سبک صفحه داخلی بازی:' : 'Detail Style:'}</span>
              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setDetailVariant('BENTO_HUD');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  detailVariant === 'BENTO_HUD'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isFa ? '۱. بنتو HUD سینمایی' : '1. Bento HUD'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setDetailVariant('CYBERDECK_LAB');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  detailVariant === 'CYBERDECK_LAB'
                    ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/25'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>{isFa ? '۲. سایبردک بنچمارک' : '2. Cyberdeck Lab'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setDetailVariant('LUXURY_LORE');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  detailVariant === 'LUXURY_LORE'
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-500/25'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isFa ? '۳. ژورنال لوکس لور' : '3. Luxury Lore'}</span>
              </button>
            </div>
          )}

          {viewMode === 'GAME_DETAIL' && (
            <button
              onClick={() => {
                soundFx.playClick(500);
                setViewMode('PORTAL');
              }}
              className="px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isFa ? 'صفحه اصلی دایره‌المعارف' : 'Portal Home'}</span>
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playClick(600);
              onReturnToCatalog();
            }}
            className="px-3.5 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-mono text-xs font-bold transition-colors"
          >
            {isFa ? 'خروج به نمایشگاه' : 'Exit to Catalog'}
          </button>
        </div>
      </header>

      {/* 2. MAIN BODY CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {viewMode === 'PORTAL' ? (
          <>
            {homeVariant === 'CYBER_HOLO' && (
              <WikiHomeCyberHolo
                games={allGames}
                selectedGame={currentGame}
                onSelectGame={handleSelectGame}
                isFa={isFa}
                isRtl={isRtl}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedGenreFilter={selectedGenreFilter}
                setSelectedGenreFilter={setSelectedGenreFilter}
                selectedPlatformFilter={selectedPlatformFilter}
                setSelectedPlatformFilter={setSelectedPlatformFilter}
                filteredGames={filteredGames}
                calculatedUserScore={calculatedUserScore}
              />
            )}

            {homeVariant === 'BENTO_COMMAND' && (
              <WikiHomeBentoCommand
                games={allGames}
                selectedGame={currentGame}
                onSelectGame={handleSelectGame}
                isFa={isFa}
                isRtl={isRtl}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedGenreFilter={selectedGenreFilter}
                setSelectedGenreFilter={setSelectedGenreFilter}
                selectedPlatformFilter={selectedPlatformFilter}
                setSelectedPlatformFilter={setSelectedPlatformFilter}
                filteredGames={filteredGames}
                calculatedUserScore={calculatedUserScore}
              />
            )}

            {homeVariant === 'EDITORIAL_MAGAZINE' && (
              <WikiHomeEditorialMagazine
                games={allGames}
                selectedGame={currentGame}
                onSelectGame={handleSelectGame}
                isFa={isFa}
                isRtl={isRtl}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedGenreFilter={selectedGenreFilter}
                setSelectedGenreFilter={setSelectedGenreFilter}
                selectedPlatformFilter={selectedPlatformFilter}
                setSelectedPlatformFilter={setSelectedPlatformFilter}
                filteredGames={filteredGames}
                calculatedUserScore={calculatedUserScore}
              />
            )}
          </>
        ) : (
          <>
            {detailVariant === 'BENTO_HUD' && (
              <WikiDetailBentoHUD
                game={currentGame}
                calculatedUserScore={calculatedUserScore}
                isFa={isFa}
                isRtl={isRtl}
                onBack={() => setViewMode('PORTAL')}
                onSubmitReview={handleReviewSubmit}
                onAddQuestion={handleAddQuestion}
              />
            )}

            {detailVariant === 'CYBERDECK_LAB' && (
              <WikiDetailCyberdeckLab
                game={currentGame}
                isFa={isFa}
                isRtl={isRtl}
                onBack={() => setViewMode('PORTAL')}
              />
            )}

            {detailVariant === 'LUXURY_LORE' && (
              <WikiDetailLuxuryLore
                game={currentGame}
                isFa={isFa}
                isRtl={isRtl}
                onBack={() => setViewMode('PORTAL')}
              />
            )}
          </>
        )}
      </main>

      {/* 3. FOOTER */}
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
