// =============================================================================
// AI AGENT DESIGN PLAYBOOK & ARCHITECTURAL REFERENCE DATA
// Detailed prompts, mathematical foundations, shader logic, and creative
// directives for generating high-end Awwwards-tier frontend components.
// =============================================================================

export interface PlaybookEntry {
  id: string;
  titleFa: string;
  titleEn: string;
  category: 'PROJECT' | 'BATCH';
  batchId?: string;
  aesthetic: string;
  techStack: string[];
  philosophy: string;
  mathAndPhysics: string;
  aiPromptDirective: string;
  keyInteractiveElements: string[];
  tags: string[];
}

export const AI_PLAYBOOK_ENTRIES: PlaybookEntry[] = [
  // ===========================================================================
  // PROJECTS
  // ===========================================================================
  {
    id: 'STUDIO_123',
    titleFa: 'استودیو ۱۲۳سرویس — موتور خلاقیت دیجیتال',
    titleEn: '123Service Studio — Digital Creative Engine',
    category: 'PROJECT',
    aesthetic: 'Ultra Modern Kinetic Agency / Neo-Brutalist High Density',
    techStack: ['React 19', 'Tailwind CSS v4', 'Canvas 2D Physics', 'Web Audio API', 'AJAX Cart Engine'],
    philosophy: 'طراحی وب‌سایت آژانس با حذف کامل الگوهای تکراری؛ تمرکز بر تعاملات فیزیکال ملموس (Tactile Physics) مانند نخ‌های متحرک الاستیک که اقلام را هنگام کلیک به سبد خرید متصل می‌کنند، همراه با تایپوگرافی جسورانه و هماهنگی کامل دو زبانه RTL/LTR.',
    mathAndPhysics: 'معادلات منحنی‌های بزیه درجه ۳ (Cubic Bezier Trajectories) برای بردار کشش نخ سبد خرید با شتاب ارتجاعی (Spring-Damping Formula: F = -k*x - c*v). ماشین‌حساب تخمین پروژه با توابع برآورد لگاریتمی بر پایه اسلایدرهای بودجه و تایم‌لاین.',
    aiPromptDirective: `You are an elite creative technologist building a modern digital creative agency landing page named "123Service Studio". 
Do NOT create a generic static portfolio. Implement:
1. Physical Cart Thread Pull: When clicking "Add to Cart" or "Hire", animate an elastic bezier thread in 2D canvas connecting the button coordinates directly to the floating cart icon with physical spring restitution and clean Web Audio haptic click sounds.
2. Dynamic Project Cost Estimator: An interactive slider and checkbox matrix estimating budgets in Tomans and USD with animated numeric counter odometers.
3. Dual-mode RTL / LTR layout: Ensure typographic alignment using Vazirmatn and Plus Jakarta Sans without layout shifts.
4. Services DNA Grid: Interactive hover cards with magnetic tilt and monochromatic glowing borders.`,
    keyInteractiveElements: ['انیمیشن نخ کشسان الاستیک سبد خرید', 'ماشین‌حساب تعاملی برآورد هزینه', 'شمارنده‌های کیلومتری اودومتر', 'تغییر روان زبان و چیدمان'],
    tags: ['Agency', 'Cart Physics', 'Calculator', 'RTL', 'React 19'],
  },
  {
    id: 'PERSIAN_MUQARNAS_WORLD',
    titleFa: 'معماری نئوفیوچریسم مقرنس و ارسی ایرانی ۳بعدی',
    titleEn: 'Persian Muqarnas Neofuturism 3D Architecture',
    category: 'PROJECT',
    aesthetic: 'Persian Neofuturism / Islamic Geometric Parametric Math',
    techStack: ['Three.js WebGL', 'Parametric 3D Geometry', 'GLTF Loader', 'Custom Caustics Shaders', 'OrbitControls'],
    philosophy: 'پیوند هویت تاریخی معماری اصیل اسلامی-ایرانی با پردازش بی‌درنگ WebGL؛ تجسم طاق‌های معلق مقرنس با محاسبات ریاضی دقیق، شیدرهای شکست نور رنگی پنجره‌های ارسی و فانوس مشبک اصیل قاجاری.',
    mathAndPhysics: 'فرمول‌های مثلثاتی پارامتریک برای محاسبه لایه‌های کاسه‌ای مقرنس (Tier Radii: r_i = R * sin(i * pi / N)), پرتوهای شکست نور ارسی با تقریب قانون اسنل (Snell’s Law: n1*sin(θ1) = n2*sin(θ2)) و ماتریس رنگی RGB انکساری روی سطوح گچ‌بری.',
    aiPromptDirective: `Act as a senior WebGL 3D artist and architectural technologist. Build an interactive 3D WebGL scene showcasing authentic Persian Muqarnas vaulting and stained-glass Orsi light caustics:
1. Procedural Muqarnas Geometry: Render multi-tiered concentric parametric vaults where each tier rotates and scales harmonically, simulating the historic ceilings of Isfahan and Shiraz.
2. Orsi Stained-Glass Light Dispersion: Create colored light spotlights (Persian Turquoise, Ruby Red, Amber Gold) projecting caustic shadow patterns onto the gypsum ceiling with soft bloom.
3. 360-degree OrbitControls: Provide smooth damping mouse drag, zoom limits, and viewpoint presets (Nadir Looking Up, Perspective Horizon, Golden Hour).
4. Authentic Filigree Lantern: Load or construct an oriental openwork brass lantern with warm volumetric emission.`,
    keyInteractiveElements: ['چرخش آزادانه دوربین ۳۶۰ درجه', 'سوییچ بین نورپردازی ارسی، فیروزه نیشابور و کویر زرین', 'انکسار پرتوهای رنگی', 'حالت نمایش خطوط وایرفریم هندسه'],
    tags: ['Three.js', 'Persian', 'Muqarnas', 'Orsi', 'Parametric 3D'],
  },
  {
    id: 'CHRONO_NEBULA_WORLD',
    titleFa: 'ادیسه فضایی استرلاب و افق رویداد زمان ۳بعدی',
    titleEn: 'Chrono-Spatial Astrolabe Odyssey 3D',
    category: 'PROJECT',
    aesthetic: 'Cosmic Haute Horlogerie / Relativistic Astrophysics',
    techStack: ['Three.js WebGL', 'Procedural Gear Involute Math', 'Event Horizon Shader', 'GPU Particle Swarm'],
    philosophy: 'نمایش مفهوم زمان و فضا از طریق تلفیق چرخ‌دنده‌های ساعت‌سازی مکانیکی لوکس و استرلاب‌های نجومی با سیاه‌چاله نسبیتی و سحابی‌های گرانشی.',
    mathAndPhysics: 'محاسبه پروفیل منحنی اینولوت دندانه‌های چرخ‌دنده (Involute Spur Gear Math: x = r*(cos t + t*sin t)), شبیه‌سازی گرانش سیاه‌چاله بر پایه شوارتزشیلد (Schwarzschild Gravitational Lensing) و چرخش کواترنیون در ۶۰ فریم.',
    aiPromptDirective: `Build an Awwwards-tier 3D astronomical horology experience named "Chrono-Spatial Odyssey":
1. Interlocking 3D Horological Gears: Construct 3 concentric gold and titanium gears meshing with precise gear-ratio velocities.
2. Relativistic Black Hole & Event Horizon: In the center, render a gravitational lensing ring with glowing accretion disk particles swirling inward.
3. Dynamic Time Dilation Dial: Allow the user to drag a temporal scrub bar that accelerates gear rotations and bends the space-time grid.
4. Crystal Bell Sound synthesis: Produce harmonic chimes using Web Audio API on gear mesh cycles.`,
    keyInteractiveElements: ['چرخش پیوسته چرخ‌دنده‌های استرلاب', 'افق رویداد سیاه‌چاله گرانشی', 'اسلایدر سرعت زمان', 'ذرات سحابی معلق'],
    tags: ['Astrolabe', 'Horology', 'Black Hole', 'WebGL', 'Three.js'],
  },
  {
    id: 'SCROLL_WORLD_3D',
    titleEn: 'Three.js Cinematic 3D Scroll World',
    titleFa: 'جهان سینمایی ۳بعدی با پرواز اسکرول',
    category: 'PROJECT',
    aesthetic: 'Spatial Bento / Futuristic Cyber Runway',
    techStack: ['Three.js WebGL', 'CatmullRom Curve3', 'Lenis Smooth Scroll', 'GSAP ScrollTrigger'],
    philosophy: 'حرکت روان دوربین سینمایی در طول یک مسیر سه‌بعدی متناسب با چرخش چرخ ماوس، بدون پرش یا توقف‌های ناگهانی، در میان المان‌های معلق و حلقه‌های نورانی نئونی.',
    mathAndPhysics: 'اسپلاین منحنی کتمول-روم (CatmullRomCurve3) با ارزیابی تانژانت جهت دوربین (Camera LookAt = Curve.getPointAt(t + delta)). شتاب اینرسی لنیس برای نرم‌سازی پیمایش.',
    aiPromptDirective: `Create a cinematic 3D scroll flythrough using Three.js and Smooth Inertial Scroll:
1. Define a 3D spline waypoint track through floating futuristic architectural bento boxes and neon security gates.
2. Map normalized window.scrollY to the spline parameter t (0.0 to 1.0) with cubic ease-out damping.
3. Calculate instantaneous camera direction vector with camera.lookAt along the curve tangent.
4. Render glowing checkpoint radar HUD elements that light up as the camera crosses spatial gates.`,
    keyInteractiveElements: ['پرواز پیوسته دوربین با اسکرول ماوس', 'گیت‌های نئونی حساس به موقعیت دوربین', 'بنتو باکس‌های فضایی معلق', 'تایپوگرافی کینتیک سه‌بعدی'],
    tags: ['Scroll World', 'Spline Camera', 'Lenis', 'Three.js'],
  },
  {
    id: 'AWWWARDS_HERO',
    titleFa: 'هیرو ژورنالی اواردز با شیشه شیاردار WebGL',
    titleEn: 'Awwwards Editorial Hero & Fluted Glass',
    category: 'PROJECT',
    aesthetic: 'Broken-Grid Editorial & Optical Fluted Glass',
    techStack: ['Three.js WebGL Shaders', 'Cinzel Typography', 'Simplex Noise', 'Fluid Mouse Inertia'],
    philosophy: 'شاهکار ادیتوریال مدرن مطابق با استانداردهای Site of the Day (SOTD) در پلتفرم Awwwards؛ ترکیب گرید نامتقارن، شیشه شیاردار استوانه‌ای با انکسار بی‌درنگ ماوس و تایپوگرافی لوکس رومی.',
    mathAndPhysics: 'شیدر شکست نور استوانه‌ای (Cylindrical Lens Striation Shader) با فرکانس موجی موج‌شکن: uv.x += sin(uv.y * frequency) * amplitude. بردار اینرسی ماوس با ضریب نرم‌سازی 0.08.',
    aiPromptDirective: `Design an Awwwards Site-of-the-Day level editorial hero section:
1. Broken-grid layout with high-contrast serif typography (Cinzel) paired with clean technical monospace labels.
2. WebGL Fluted Ribbed Glass overlay: Render an interactive mesh that distorts background imagery with vertical optical cylindrical striations responding to cursor velocity.
3. Stardust particle ambiance with micro-drifting physics.
4. Magnetic CTA button with smooth spring-pull tracking towards pointer coordinates.`,
    keyInteractiveElements: ['انکسار شیشه شیاردار با موقعیت ماوس', 'دکمه مغناطیسی چسبنده', 'ذرات گردوغبار کیهانی', 'تایپوگرافی رومی سنت‌شکن'],
    tags: ['Awwwards', 'Fluted Glass', 'Editorial', 'Luxury'],
  },
  {
    id: 'COFFEE_SAMPLE',
    titleFa: '۱۲۳کافی — لندینگ دانه قهوه سه‌بعدی و برشته‌کاری',
    titleEn: '123 Coffee — 3D Photorealistic Roast Bean',
    category: 'PROJECT',
    aesthetic: 'Artisanal Organic Luxury / Dark Roast Palette',
    techStack: ['Three.js WebGL', 'MeshPhysicalMaterial', 'Parametric Sphere Cleft', 'ACES Filmic Tone Mapping'],
    philosophy: 'تجربه حسی و لوکس آنلاین خرید قهوه اختصاصی؛ مدلسازی دقیق دانه قهوه برشته‌شده با شیار مرکزی طبیعی، بافت روغنی براق و هماهنگی درجه برشته‌کاری با اسکرول کاربر.',
    mathAndPhysics: 'تغییر شکل پارامتریک روی کره هندسی: f(x,y,z) با ایجاد برش منفی در محور z متناسب با زاویه جهت ساخت شیار Cleft دانه قهوه. Clearcoat=0.85 و Roughness=0.25 برای شبیه‌سازی روغن‌های معطر سطح دانه.',
    aiPromptDirective: `Build a luxury artisanal coffee landing page featuring a photorealistic 3D roasted coffee bean:
1. Procedural 3D Coffee Bean: Deform a high-poly sphere geometry to create the elongated oval bean with an organic indented center cleft and micro-surface displacement noise.
2. Physical Roast Material: Use THREE.MeshPhysicalMaterial with rich espresso brown albedo, specular sheen, and clearcoat highlights reflecting studio softboxes.
3. Scroll-linked Roasting Engine: As the user scrolls, rotate the bean and transition the material color from Light Cinnamon -> Medium City -> Dark French Roast.
4. Flavor Notes Matrix: Floating interactive badges with tasting notes (Dark Chocolate, Bergamot, Hazelnut).`,
    keyInteractiveElements: ['چرخش دانه قهوه با اسکرول ماوس', 'درخشش فیزیکال روغن برشته‌کاری', 'تغییر رنگ متناسب با درجه رُست', 'انتخاب وزن و سفارش آنلاین'],
    tags: ['Coffee', '3D Bean', 'MeshPhysicalMaterial', 'E-Commerce'],
  },
  {
    id: 'PC_BUILDER_SAMPLE',
    titleFa: 'اسمبلر سخت‌افزار — همگرایی ستاره‌ای با اسکرول ماوس',
    titleEn: 'PC Builder — Scroll Star Convergence Assembly',
    category: 'PROJECT',
    aesthetic: 'Industrial Neo-Brutalist Hardware Rig',
    techStack: ['Three.js WebGL', 'Sticky Viewport (220vh)', 'Vector3 Lerp Convergence', 'PBR Metallic Materials'],
    philosophy: 'دگرگون‌سازی تجربه خرید آنلاین سیستم‌های گیمینگ و ورک‌استیشن؛ با چرخش اسکرول ماوس، ۸ قطعه سه‌بعدی سخت‌افزاری (کارت گرافیک، پردازنده، مادربرد، کولر، رم و منبع تغذیه) از گوشه‌های صفحه حرکت کرده و در مرکز کیس شیشه‌ای به هم می‌پیوندند.',
    mathAndPhysics: 'محاسبه بردار درونیابی خطی برداری (Vector3.lerp) برای هر قطعه با آفست‌های زاویه‌ای قطبی (Polar Angle: theta = i * 2pi / 8) و فاصله شعاعی R(t) = max(0, 1 - progress) * 8.',
    aiPromptDirective: `Create an interactive PC assembly showcase with "Star Convergence" scroll mechanics:
1. Lock viewport in sticky 220vh container.
2. Render 8 distinct 3D hardware components (GPU with spinning fans, Motherboard, Liquid Cooler with tubes, RAM sticks, PSU, M.2 SSD, Aquarium Glass Case).
3. As the user scrolls naturally, interpolate the position of each component from an exploded orbital radius toward its exact mechanical slot inside the chassis.
4. On 100% convergence, trigger a system power-on pulse with RGB LED lighting and complete package summary banner.`,
    keyInteractiveElements: ['همگرایی ۸ قطعه با اسکرول ماوس', 'فن‌های متحرک کارت گرافیک', 'کیس آکواریومی شیشه‌ای', 'تغییر کانفیگ و محاسبه قیمت زنده'],
    tags: ['PC Builder', 'Hardware', 'Exploded View', 'Scroll Convergence'],
  },
  {
    id: 'WIKI_GAME_SAMPLE',
    titleFa: 'سوپرسایت ویکی‌گیم (۳ مدل صفحه اصلی + ۳ مدل صفحه داخلی)',
    titleEn: 'WikiGame Super-Site (3 Home + 3 Detail Layouts)',
    category: 'PROJECT',
    aesthetic: 'Triple-A Gaming Portal / Cyber Matrix & Editorial Lore',
    techStack: ['React 19', '3D Tilt Coverflow', 'Hardware Benchmark Math Engine', 'Web Audio Gramophone'],
    philosophy: 'پرتال جامع بررسی بازی‌ها با ۳ زبان طراحی کاملاً مستقل برای صفحه اول (ماتریس هولوگرافیک، بنتو سنتر ۲۰۲۶، مجله سینمایی) و ۳ صفحه اختصاصی بررسی بازی شامل آزمایشگاه بنچمارک نرخ فریم.',
    mathAndPhysics: 'موتور محاسباتی مقایسه رزولوشن و کارت‌های گرافیک (Benchmark Formula: FPS = BaseFPS * GPU_Factor * Resolution_Factor). افکت سه‌بعدی کارت‌ها با تبدیل CSS perspective و rotateX/rotateY بر مبنای موقعیت ماوس.',
    aiPromptDirective: `Develop a comprehensive gaming super-site architecture with multi-layout switching:
1. Provide 3 switchable Home Page designs: 
   - Holographic Matrix (cyber scanlines, glowing neon grids)
   - Bento Command Center 2026 (dense data tiles, live scores)
   - Cinematic Editorial Magazine (wide hero banners, narrative prose)
2. Provide 3 switchable Game Detail Pages:
   - Bento Telemetry & User Review Scorecards
   - Interactive FPS Benchmark Lab (real-time graphics card frame rate comparisons)
   - Lore Journal with playable audio soundtrack gramophone.`,
    keyInteractiveElements: ['سوییچ آنی بین ۳ پوسته اصلی و ۳ پوسته داخلی', 'شبیه‌ساز نرخ فریم و بنچمارک سخت‌افزار', 'گرامافون پخش موسیقی متن', 'کاورفلو سه‌بعدی بازی‌ها'],
    tags: ['Gaming', 'Benchmark Lab', 'Bento', 'Super-Site'],
  },
  {
    id: 'GLTF_STUDIO',
    titleFa: 'استودیو لودر و بازرس سه‌بعدی فایل‌های GLTF/GLB کاربر',
    titleEn: 'Universal 3D Drag & Drop Studio & PBR Inspector',
    category: 'PROJECT',
    aesthetic: 'High-Tech WebGL 3D Studio & Engineering Laboratory',
    techStack: ['Three.js WebGL', 'GLTFLoader', 'FileReader API', 'OrbitControls', 'ACES Filmic Tone Mapping'],
    philosophy: 'ابزار حرفه‌ای بررسی آنلاین مدل‌های سه‌بعدی؛ کاربر می‌تواند فایل‌های .glb یا .gltf اختصاصی خود را درگ کرده و بی‌درنگ در مرورگر با نورپردازی‌های استودیویی، حالت‌های نمایش وایرفریم و تنظیم متریال‌های فیزیکال PBR بازرسی کند.',
    mathAndPhysics: 'پارس باینری ساختار کانتینر GLB، محاسبه جعبه محاطی (THREE.Box3) برای سنتر خودکار در مرکز مختصات (TargetScale = 2.8 / MaxDimension). محاسبه مساحت و شمارش زنده تعداد پولیگان‌ها و رئوس.',
    aiPromptDirective: `Construct a production-grade 3D model dropzone and real-time PBR inspector:
1. Drag & Drop File Ingestion: Read dropped .glb or .gltf files via FileReader.readAsArrayBuffer and parse with Three.js GLTFLoader.
2. Auto-centering & Scale Normalization: Automatically calculate the bounding box, center the root group at (0,0,0), and scale proportionally to fit the viewport.
3. Lighting Rig Presets: Provide Studio ACES Filmic, Cyber Neon (cyan/magenta), Golden Hour, and Deep Space presets.
4. Shading Modes: Toggle between PBR Shaded, Wireframe Overlay, Normal Vectors, and Clay White.
5. Screenshot Export: High-resolution PNG canvas capture button.`,
    keyInteractiveElements: ['درگ اند دراپ فایل‌های .glb/.gltf کاربر', 'مدل‌های آماده قهوه، ساعت، پهپاد و مونولیت', 'اسلایدرهای زبری و فلزی متریال', 'خروجی عکس با کیفیت بالا'],
    tags: ['GLTF', 'Dropzone', 'Three.js', 'PBR Inspector', '3D Studio'],
  },
  {
    id: 'VOICE_CALLIGRAPHY',
    titleFa: 'موتور شبیه‌سازی صوتی به خطاطی و سیاه‌مشق فارسی',
    titleEn: 'Voice-to-Calligraphy Acoustical Siah-Mashq Engine',
    category: 'PROJECT',
    aesthetic: 'Traditional Persian Classical Calligraphy & Audio-Reactive Waveforms',
    techStack: ['Web Audio API', 'AnalyserNode FFT 512', 'HTML5 2D Canvas', 'Persian Reed Pen Nib Physics'],
    philosophy: 'پیوند آکوستیک صدا و ارتعاشات کلام با قلم خوشنویسی سنتی ایران؛ صدای کاربر از طریق میکروفون آنالیز شده و دامنه صوت، ضخامت دانگ قلم نی را تعیین می‌کند، در حالی که فرکانس و لحن صدا پیچش‌های دایره‌ای سیاه مشق و ذرات طلای تذهیب را روی صفحه می‌نشاند.',
    mathAndPhysics: 'تبدیل فوریه سریع (FFT 512) برای استخراج دامنه و انرژی صوتی: Volume = Sum(FreqData) / 128 / N. دانگ قلم نی: NibWidth = Max(3, Volume * 28). زاویه تراش قلم خوشنویسی: 35 درجه شیب قطری.',
    aiPromptDirective: `Build an acoustic Persian Voice-to-Calligraphy engine using Web Audio API and HTML5 Canvas:
1. Real-time Microphonic Analysis: Connect navigator.mediaDevices.getUserMedia to AudioContext and AnalyserNode. Calculate instantaneous volume and peak pitch frequency.
2. Persian Reed Pen Nib Dynamics: Render continuous brush paths with a 35-degree slanted nib angle where brush thickness (دانگ قلم) dynamically scales with voice volume.
3. Poetic Presets: Feature verses from Hafez, Rumi, Khayyam, and Ferdowsi with live typographic wave displacement.
4. Gilded Stardust Particles: Emit golden leaf particles on vocal accents and simulate subtle ink bleeding along strokes.`,
    keyInteractiveElements: ['اتصال به میکروفون واقعی یا مولد سنتز صوتی', 'تغییر دانگ قلم با بلندی صدا', 'ذرات درخشان تذهیب و ورق طلا', 'دانلود فایل اثر خطاطی به عنوان عکس'],
    tags: ['Calligraphy', 'Persian', 'Voice', 'Web Audio API', 'Canvas 2D'],
  },

  // ===========================================================================
  // BATCHES (12 SHOWROOM CATEGORIES)
  // ===========================================================================
  {
    id: 'BATCH_1',
    batchId: 'BATCH_1',
    titleFa: 'بچ ۱: هیرو سکشن‌های فوق‌پیشرفته (Next.js Hero Sections)',
    titleEn: 'Batch 1: Next.js Hero Sections (5 Variations)',
    category: 'BATCH',
    aesthetic: 'Chromatic Liquid, Neo-Brutalist, Cyberpunk, Luxury Editorial, WebGL 3D',
    techStack: ['Three.js GLSL Shaders', 'CSS Matrix Skew', 'Canvas Raycaster', 'Cinzel Typography', 'Parametric Supershapes'],
    philosophy: 'ویترین اولین برخورد کاربر با وبسایت؛ هر هیرو سکشن نمایانگر اوج یکی از پنج کهن‌الگوی مدرن وب است که حس سرعت، نوآوری و تمایز را به تصویر می‌کشد.',
    mathAndPhysics: 'شیدرهای سیمپلکس نویز دوبعدی، محاسبات ماتریس تبدیل چولگی CSS بر مبنای سرعت ماوس، پرتوهای ری‌کستینگ برای تشخیص فاصله، و هندسه پارامتریک تورس نات.',
    aiPromptDirective: `Develop 5 distinct top-tier hero sections representing 5 fundamental web aesthetics:
- Hero_V01 (Chromatic Liquid): WebGL custom GLSL fragment shader where fluid simplex noise warps with cursor velocity and chromatic aberration RGB split on click.
- Hero_V02 (Kinetic Neo-Brutalist): Ultra-high contrast monospace typographic grid with skewX tilting proportional to pointer velocity delta and running ticker marquees.
- Hero_V03 (Cyber Matrix Raycaster): 2D particle net calculating distance vectors to cursor with glowing laser beam and glitch diagnostic HUD.
- Hero_V04 (Luxury Editorial): Fluid bezier lookbook pagination, ambient floating dust particles, and magnetic pill badges.
- Hero_V05 (Quantum Supershape 3D): Procedural torus knot mesh with vertex displacement shaders and orbital drag inertia.`,
    keyInteractiveElements: ['شیدر آبگون با انکسار رنگی ماوس', 'ماتریس چولگی تایپوگرافی بروتالیست', 'شبکه راداری پرتوهای سایبرپانک', 'کتابچه لوکس ادیتوریال', 'سوپرشیپ ریاضی ۳بعدی'],
    tags: ['Hero', 'GLSL', 'WebGL', 'Aesthetic DNA', 'Batch 1'],
  },
  {
    id: 'BATCH_2',
    batchId: 'BATCH_2',
    titleFa: 'بچ ۲: سیستم‌های ناوبری و مگامنوها (Navigation Systems)',
    titleEn: 'Batch 2: Navigation Systems & Mega-Menus (5 Variations)',
    category: 'BATCH',
    aesthetic: 'Fluid Vector, Mac Glassmorphic Dock, Monospace Split, Luxury Silk, Cyber HUD',
    techStack: ['SVG Bezier Path Morphing', 'Gaussian Proximity Math', 'Web Audio API', 'Global ⌘K Keyboard Hooks'],
    philosophy: 'ناوبری فراتر از لینک‌های ساده متنی؛ تبدیل منوها به تجربه‌های تعاملی زنده با فیزیک گوسی، پرده‌های ابریشمی موج‌دار و پالت‌های فرمانی سریع.',
    mathAndPhysics: 'معادله توزیع نرمال گوسی (Gaussian Proximity: scale = 1 + A * exp(-dist^2 / (2*sigma^2))) برای بزرگ‌نمایی آیکون‌های مجاور در داک گلس‌مورفیک.',
    aiPromptDirective: `Create 5 advanced navigation patterns:
- Nav_V01 (Kinetic Overlay Morph): SVG path d attribute animating through cubic bezier wave coordinates to unfurl a full-screen curtain with velocity-lagged media previews.
- Nav_V02 (Glassmorphic Gaussian Dock): Continuous Gaussian equation magnifying neighboring icons based on cursor proximity with spring damping.
- Nav_V03 (Brutalist Split Index): Synchronous dual-pane 50/50 split driving architectural blueprints on the right with mechanical click audio.
- Nav_V04 (Luxury Editorial Curtain): Four asymmetric vertical silk columns descending with staggered cubic-bezier delays.
- Nav_V05 (Cyber Command Palette): Global Cmd+K / Ctrl+K keyboard shortcut listener with fuzzy search filtering.`,
    keyInteractiveElements: ['مورفینگ منحنی وکتور SVG', 'داک گلس‌مورفیک با فیزیک اپل', 'اسپلیت اسکرین همگام با صدا', 'پرده ۴ ستونه ابریشمی', 'پالت فرامینی ⌘K'],
    tags: ['Navigation', 'Gaussian Dock', 'Command Palette', 'Batch 2'],
  },
  {
    id: 'BATCH_3',
    batchId: 'BATCH_3',
    titleFa: 'بچ ۳: لودرها و ترنزیشن‌های سیال (Immersive Page Loaders)',
    titleEn: 'Batch 3: Immersive Page Loaders & Fluid Transitions (5 Variations)',
    category: 'BATCH',
    aesthetic: 'Kinetic Counter, Simplex Shader Melt, Cyber BIOS Boot, Gold Foil Split, Quantum Attractor',
    techStack: ['Euler Momentum Math', 'Three.js GLSL Noise Melt', 'Terminal ASCII Stream', 'Runge-Kutta Vector Field'],
    philosophy: 'تبدیل زمان انتظار بارگذاری به باشکوه‌ترین لحظه ادراکی وبسایت با انیمیشن‌های شتاب‌دار و شیدرهای ذوب رنگی.',
    mathAndPhysics: 'شتاب اویلری غیرخطی (Non-linear Euler Acceleration: a = k * (100 - counter)), فیلد برداری جاذبه ذرات بر مبنای جاذب‌های لورنتس و بردار جاذبه به مرکز تورس.',
    aiPromptDirective: `Build 5 theatrical page entry loaders:
- Loader_V01 (Kinetic Counter Mask): Non-linear counter accelerating 000 to 100 driving diagonal SVG clipPath polygon wipe.
- Loader_V02 (Liquid Shader Melt): Multi-octave simplex noise shader calculating melt threshold with iridescent RGB edge fringe.
- Loader_V03 (Cyber BIOS Boot): Diagnostic terminal verifying cryptographic registers with simulated micro-glitches and baud stream.
- Loader_V04 (Haute Gold Foil Split): Specular gold foil crest unfurling followed by dual velvet curtain opening.
- Loader_V05 (Quantum Reassembly): 2,500 particles drawn from Brownian chaos into Torus Knot geometry by central attractor force.`,
    keyInteractiveElements: ['شمارنده شتاب‌دار اویلری', 'ذوب شیدر مایع با هاله کروماتیک', 'بوت ترمینال با کدهای رمزی', 'پرده مخمل طلایی', 'همگرایی ذرات کوانتومی'],
    tags: ['Loader', 'Preloader', 'Transition', 'Batch 3'],
  },
  {
    id: 'BATCH_4',
    batchId: 'BATCH_4',
    titleFa: 'بچ ۴: اسکرول و دوربین سه‌بعدی (Scroll Choreography & Pinning)',
    titleEn: 'Batch 4: Scroll Choreography & Viewport Pinning (5 Variations)',
    category: 'BATCH',
    aesthetic: 'Multi-layer Parallax, Velocity Marquee Skew, 3D Depth Pinning, Split Counter-Scroll, Raycast Tunnel',
    techStack: ['GSAP ScrollTrigger', 'CSS Skew Physics', '3D Z-Axis Pinning', 'Three.js Waypoint Splines'],
    philosophy: 'معماری اسکرول به گونه‌ای که صفحه به مثابه یک استیج پیوسته تئاتر عمل می‌کند که در آن عمق، زاویه دید و سرعت با هم ترکیب می‌شوند.',
    mathAndPhysics: 'محاسبه لحظه‌ای زاویه برش بر مبنای مشتق جابجایی بر زمان (Shear Angle: skewX = clamp(v * 0.15, -30, 30)). محاسبات مقیاس نمایی برای عمق Z.',
    aiPromptDirective: `Implement 5 scroll choreography masterpieces:
- Scroll_V01 (Horizontal Parallax Gallery): 3 independent inertia planes (ambient mesh, exhibition cards, 2.4x typography).
- Scroll_V02 (Kinetic Velocity Marquee): Dynamic marquee tracks calculating real-time shear skew angle and letter spacing from scroll velocity.
- Scroll_V03 (Sticky Depth Pinning): Viewport pins while 3D camera scrubs forward through architectural frames with non-linear scale interpolation.
- Scroll_V04 (Haute Editorial Counter-Scroll): Dual vertical columns counter-scrolling in opposing polarity with Roman serifs.
- Scroll_V05 (Cyber Raycast Spline Tunnel): 3D hexagonal neon wireframe tunnel guiding camera down spline through security gates.`,
    keyInteractiveElements: ['پارالاکس افقی ۳ لایه', 'مارکی کینتیک حساس به سرعت', 'پرواز دوربین در عمق فضا', 'ستون‌های متضاد اسکرول', 'تونل شش‌ضلعی نئونی'],
    tags: ['Scroll', 'Parallax', 'Pinning', 'Batch 4'],
  },
  {
    id: 'BATCH_5',
    batchId: 'BATCH_5',
    titleFa: 'بچ ۵: فوترها و فیزیک مغناطیسی (Footers & Magnetic Physics)',
    titleEn: 'Batch 5: Footers & Magnetic Physics Elements (5 Variations)',
    category: 'BATCH',
    aesthetic: 'Gravitational Attractor, Brutalist ASCII Terminal, Luxury Vermeil Monogram, Cyber Shutdown, 3D Wave Ribbon',
    techStack: ['2D Verlet Particle Fabric', 'Interactive Monospace CLI', 'Gold Leaf Specular Canvas', 'Three.js Sine Wave Plane'],
    philosophy: 'پایان‌بندی سایت با انرژی بالا؛ فوتر به جای قرار دادن لینک‌های مرده، به یک زمین بازی فیزیکی و آزمایشگاه فرمانی تعاملی بدل می‌شود.',
    mathAndPhysics: 'قانون فنر هوک و نیوتن برای پارچه ذرات (Hooke’s Law: F = -k*x), بردار کشش مغناطیسی دکمه به سمت ماوس با معادله اسپرینگ.',
    aiPromptDirective: `Create 5 distinctive footer environments:
- Footer_V01 (Gravitational Grid): 2D particle fabric with spring-mass restitution reacting to pointer gravity well; magnetic CTA buttons pulling toward cursor.
- Footer_V02 (Brutalist Monospace CLI): Giant ASCII art banner with interactive command shell accepting 'help', 'contact', 'hire', 'matrix'.
- Footer_V03 (Luxury Vermeil Inscription): Roman Cinzel serif with liquid gold foil specular reflection, stardust particles, and inquiry ledger.
- Footer_V04 (Cyber Shutdown Cockpit): Emergency system killswitch with CRT phosphor collapse and reboot routine.
- Footer_V05 (3D Wave Ribbon): Three.js undulating parametric wave ribbon mesh with magnetic pill buttons.`,
    keyInteractiveElements: ['شبکه پارچه‌ای گرانشی ذرات', 'ترمینال خط فرمان تعاملی', 'ورق طلای درخشان ورمل', 'کلید خاموشی اضطراری سیستم', 'روبان موجی سه‌بعدی'],
    tags: ['Footer', 'Magnetic CTA', 'CLI', 'Verlet Physics', 'Batch 5'],
  },
  {
    id: 'BATCH_6',
    batchId: 'BATCH_6',
    titleFa: 'بچ ۶: داشبوردهای پرتراکم و توپولوژی نودها (High-Density Dashboards)',
    titleEn: 'Batch 6: High-Density Dashboards & Node Visualizers (5 Variations)',
    category: 'BATCH',
    aesthetic: 'Chromatic Telemetry HUD, Hardware Ledger, Cyber Orbital Nodes, Luxury Exhibition, 3D Force Network',
    techStack: ['SVG Radial Gauges', 'Canvas Oscilloscope Waveform', 'Orbital Raycasting Physics', 'Three.js Force-Directed Graph'],
    philosophy: 'طراحی داشبوردهای مانیتورینگ آینده‌نگر؛ نمایش اطلاعات پیچیده با زیبایی‌شناسی سایبرنتیک، گیج‌های دقیق و شبکه‌های گرافی فضایی.',
    mathAndPhysics: 'محاسبات دافعه کلمبی و جاذبه فنری هاب‌ها در گراف ۳بعدی (Force-Directed Graph: F_rep = k / r^2, F_spring = c * (r - L)). سیگنال موجی فوریه.',
    aiPromptDirective: `Design 5 high-density diagnostic dashboards:
- Dashboard_V01 (Chromatic Telemetry HUD): Multi-panel glassmorphic telemetry with live SVG radial pressure gauges and canvas oscilloscope.
- Dashboard_V02 (Brutalist Hardware Ledger): Monospace hardware register ledger with live CPU clock/voltage dials and hex stream.
- Dashboard_V03 (Cyber Orbital Topology): Concentric planetary node topology graph with live packet transmissions and ping rings.
- Dashboard_V04 (Luxury Exhibition Matrix): Museum-grade spatial exhibition matrix with lighting lux controls and auction telemetry.
- Dashboard_V05 (Force-Directed 3D Network): Three.js 3D force-directed node graph with mouse orbit drag and tunable repulsion.`,
    keyInteractiveElements: ['گیج‌های مدور سنجش فشار', 'استریم هگزادسیمال حافظه سخت‌افزار', 'ارسال پکت‌های مداری', 'ماتریس حراجی موزه لوکس', 'گراف شبکه‌ای ۳بعدی ذرات'],
    tags: ['Dashboard', 'Telemetry', 'Force Graph', 'Batch 6'],
  },
  {
    id: 'BATCH_7',
    batchId: 'BATCH_7',
    titleFa: 'بچ ۷: تجارت الکترونیک فضایی و کانفیگوراتورها (Spatial 3D E-Commerce)',
    titleEn: 'Batch 7: Spatial E-Commerce & 3D Configurators (5 Variations)',
    category: 'BATCH',
    aesthetic: 'Chromatic Watch PBR, Sneaker Deconstruct, Cyberdeck Terminal, Couture Perfume, Spatial Audio Headphone',
    techStack: ['Three.js WebGL', 'Alloy Shader Material Switching', 'Exploded Vertical Layer Slider', 'Olfactory Scent Pyramid'],
    philosophy: 'شخصی‌سازی سه‌بعدی و انفجار قطعات کالا در تجارت الکترونیک لوکس و فنی؛ کاربر کالا را فراتر از یک عکس ساده تجربه می‌کند.',
    mathAndPhysics: 'ماتریس‌های PBR برای آلیاژهای تیتانیوم، طلای سدنا و کربن. محاسبات آفست عمودی برای دیس‌اسمبل قطعات کفش.',
    aiPromptDirective: `Build 5 spatial product configurators:
- Product_V01 (Chromatic Watch Configurator): Real-time 3D watch model with orbital drag, live alloy material switching, and ticking sound.
- Product_V02 (Sneaker Deconstruct Matrix): Exploded vertical layer slider physically separating 5 footwear components with specs callouts.
- Product_V03 (Cyberdeck Holographic Rig): Quad-zone thermal core heatmaps, overclock toggles, and interactive firmware flash.
- Product_V04 (Haute Couture Fragrance): Olfactory Top/Heart/Base pyramid with bespoke monogram engraving on flacon glass.
- Product_V05 (Parametric Spatial Headphone): 3D beryllium headphone model with dynamic frequency wave ring deformations.`,
    keyInteractiveElements: ['چرخش سه‌بعدی و تغییر آلیاژ ساعت', 'اسلایدر انفجار عمودی اجزای کفش', 'هیت‌مپ دمایی سایبرپانک', 'هرم بویایی عطر لوکس', 'حلقه‌های فرکانس هدفون فضایی'],
    tags: ['Product', '3D Configurator', 'E-Commerce', 'Batch 7'],
  },
  {
    id: 'BATCH_8',
    batchId: 'BATCH_8',
    titleFa: 'بچ ۸: هنر زایشی و مجسمه‌های صوتی (Generative Art & Sound)',
    titleEn: 'Batch 8: Generative Art & Kinetic Sound Sculptures (5 Variations)',
    category: 'BATCH',
    aesthetic: 'Fluid Oscilloscope, ASCII Sand Physics, LiDAR Pointcloud, Harmonic Metronome, Lorenz Strange Attractor',
    techStack: ['Fourier Wave Superposition', 'Cellular Automata 2D', '360 LiDAR Ray Sweep', 'Runge-Kutta Differential Integrator'],
    philosophy: 'ریاضیات شگفت‌انگیز آشوب و هارمونی صوت؛ شبیه‌سازی معادلات دیفرانسیل غیرخطی، فیزیک ریزش شن سلولار و اسکنرهای لیدار.',
    mathAndPhysics: 'معادلات دیفرانسیل لورنتس (dx/dt = sigma*(y-x), dy/dt = x*(rho-z)-y, dz/dt = x*y - beta*z) با ادغام گام زمانی Runge-Kutta در ۱۰ هزار ذره.',
    aiPromptDirective: `Implement 5 generative art and computational sound simulations:
- Generative_V01 (Fluid Audio Oscilloscope): Multi-octave Fourier wave superposition with iridescent spectral refraction ribbons.
- Generative_V02 (Brutalist ASCII Falling Sand): Cellular automata sand physics in raw monospace glyphs with 4-directional gravity.
- Generative_V03 (Cyber LiDAR Pointcloud): 360-degree rotating LiDAR scanning beam projecting depth-graded radar terrain points.
- Generative_V04 (Harmonic Metronome): Astronomical double pendulum drawing Lissajous resonance curves with Pythagorean chimes.
- Generative_V05 (Lorenz Strange Attractor 3D): 10,000 particles numerically integrated along chaotic differential manifolds.`,
    keyInteractiveElements: ['نوسان‌نگار صوتی فوریه', 'ریزش شن اسکی با تغییر گرانش', 'اسکنر سه‌بعدی لیدار ۳۶۰ درجه', 'پاندول هارمونیک لیساژو', 'جاذب آشوب لورنتس ۳بعدی'],
    tags: ['Generative', 'Lorenz Attractor', 'ASCII Sand', 'LiDAR', 'Batch 8'],
  },
  {
    id: 'BATCH_9',
    batchId: 'BATCH_9',
    titleFa: 'بچ ۹: تایپوگرافی کینتیک و خوشنویسی فارسی (Creative Typography & Persian)',
    titleEn: 'Batch 9: Creative Typography & Persian Suites (6 Variations)',
    category: 'BATCH',
    aesthetic: 'Liquid Displacement, Variable Font Stretch, Cryptographic Decoder, Drop-Cap Atelier, Möbius Ribbon, Voice Calligraphy',
    techStack: ['GLSL Text Refraction', 'Variable Font Proximity', 'Matrix Glyph Decryption', 'Three.js Extruded Tube', 'Web Audio API'],
    philosophy: 'قدرت تایپوگرافی تعاملی هم در الفبای لاتین و هم در خط باشکوه فارسی؛ از کشیدگی متغیر و شیدرهای آبگون شعر حافظ تا خطاطی صوتی زنده.',
    mathAndPhysics: 'انکسار برداری GLSL، تغییر وزن و عرض فونت‌های متغیر (font-variation-settings: "wght", "wdth") متناسب با فاصله ماوس، و تبدیل فرکانس صوت به دانگ قلم نی.',
    aiPromptDirective: `Develop 6 kinetic typography and Persian calligraphy systems:
- Typography_V01 (Liquid Displacement): Pointer-driven GLSL text refraction and spectral dispersion wave.
- Typography_V02 (Variable Stretch Matrix): Proximity-based variable font weight/width letter-stretch.
- Typography_V03 (Matrix Cryptographic Decoder): Cryptographic character decryption cascade.
- Typography_V04 (Museum Drop-Cap Atelier): Illuminated drop-cap monogram workshop.
- Typography_V05 (Parametric 3D Ribbon Mesh): Three.js extruded typography ribbon in 3D Möbius space.
- Typography_V06 (Voice-to-Calligraphy): Real-time microphone input converting voice volume into Persian reed pen stroke widths, gold foil particles, and poetry.`,
    keyInteractiveElements: ['انکسار مایع متن با ماوس', 'کشیدگی حروف متغیر با مجاورت', 'رمزگشایی ماتریسی کاراکترها', 'سربرگ‌های موزه لوکس', 'نوار موبیوس سه‌بعدی کلمات', 'خطاطی صوتی با میکروفون'],
    tags: ['Typography', 'Persian', 'Variable Font', 'Voice Calligraphy', 'Batch 9'],
  },
  {
    id: 'BATCH_10',
    batchId: 'BATCH_10',
    titleFa: 'بچ ۱۰: شیدرهای تعاملی و شکست نور (Interactive Shaders & Caustics)',
    titleEn: 'Batch 10: Interactive Shaders & Optical Caustics (5 Variations)',
    category: 'BATCH',
    aesthetic: 'Refractive Glass Prism, Bayer Halftone Dither, Volumetric Laser, Fluted Glass Mercury, Raymarched Metaballs',
    techStack: ['Three.js WebGL GLSL', 'Snell Law Dispersion', '8x8 Bayer Ordered Dither', 'Tyndall Scattering', 'Raymarching SDF'],
    philosophy: 'شیدرهای محاسباتی پیشرفته پردازنده گرافیکی (GPU)؛ شکست نور منشوری، هافتون رترو، پراکندگی فوتونی لیزر و کروم مایع ری‌مارچینگ.',
    mathAndPhysics: 'محاسبه انکسار دوطرفه اسنل برای ۳ طول موج رنگی قرمز، سبز و آبی (Chromatic Dispersion). توابع فاصله علامتداری (Signed Distance Functions - SDF) برای ذوب متامال‌ها.',
    aiPromptDirective: `Create 5 advanced GLSL shader environments:
- Shader_V01 (Refractive Glass Prism): Dual-surface Snell's Law chromatic dispersion splitting white light into spectral rainbow beams.
- Shader_V02 (Bayer Ordered Dither Matrix): 8x8 Bayer matrix halftone quantizer creating high-contrast retro CRT rasterization.
- Shader_V03 (Volumetric Laser Scanner): Tyndall photon scattering passes, fog caustics, and shadow occluders.
- Shader_V04 (Fluted Ribbed Glass Mercury): Cylindrical lens striations with liquid mercury reflective chrome.
- Shader_V05 (Raymarched SDF Metaballs): GPU raymarched signed distance field calculating smooth polynomial union of liquid chrome spheres.`,
    keyInteractiveElements: ['تجزیه نور در منشور شیشه‌ای', 'ماتریس دیتر هافتون رترو', 'پرتوهای حجمی لیزر در مه', 'شیشه فلوتد با انعکاس جیوه', 'کره‌های کروم متامال ری‌مارچینگ'],
    tags: ['Shader', 'GLSL', 'Prism', 'Raymarching', 'Batch 10'],
  },
  {
    id: 'BATCH_11',
    batchId: 'BATCH_11',
    titleFa: 'بچ ۱۱: فرم‌های لمسی و مراحل احراز هویت (Tactile Forms & Steppers)',
    titleEn: 'Batch 11: Interactive Forms & Kinetic Steppers (5 Variations)',
    category: 'BATCH',
    aesthetic: 'Chromatic Glass Card, Brutalist Command Ledger, Cyber Biometric Auth, Haute Salon Dossier, 3D Metal Card',
    techStack: ['Gyroscopic Tilt Physics', 'Procedural Canvas Fingerprint Scanner', 'Three.js Brushed Titanium Card', 'Tactile Audio Feedback'],
    philosophy: 'تبدیل خسته‌کننده‌ترین بخش هر وبسایت (فرم‌ها و ورودی‌ها) به هیجان‌انگیزترین تجربه؛ از اسکن زنده خطوط اثرانگشت تا کارت بانکی فلزی سه‌بعدی.',
    mathAndPhysics: 'محاسبه بردار ژیروسکوپی چرخش سه‌بعدی کارت (tiltX = (py - 0.5) * 30, tiltY = (px - 0.5) * -30). الگوریتم خطوط برآمدگی برداری اثر انگشت.',
    aiPromptDirective: `Design 5 tactile forms and multi-step verification flows:
- Form_V01 (Chromatic Glass Payment): 3D gyroscopic tilt card with specular refractions, live input reflection, and multi-step accordion.
- Form_V02 (Neo-Brutalist Command Inquiry): CLI terminal matrix with mechanical typewriter audio feedback and validator.
- Form_V03 (Cyber Biometric Auth): Procedural canvas fingerprint ridge verification with glowing laser scanner and cryptographic handshake.
- Form_V04 (Haute Salon Privé Atelier): Editorial reservation dossier with monogram embossing and bespoke notes.
- Form_V05 (3D Metal Card Configurator): Interactive WebGL card with PBR brushed titanium, gold leaf, and obsidian materials.`,
    keyInteractiveElements: ['کارت بانکی ۳بعدی با بازتاب زنده حروف', 'ورودی ترمینال با صدای کلیدهای مکانیکی', 'اسکنر زنده خطوط اثرانگشت بیومتریک', 'دفترچه رزرو اختصاصی سالن', 'کارت متالیک ۳بعدی با چرخش آزاد'],
    tags: ['Forms', 'Biometric', '3D Card', 'Steppers', 'Batch 11'],
  },
  {
    id: 'BATCH_12',
    batchId: 'BATCH_12',
    titleFa: 'بچ ۱۲: بوم‌های فضایی و استودیوی سه‌بعدی (Spatial Canvas, Physics & GLTF)',
    titleEn: 'Batch 12: Spatial Canvas, Physics Sandboxes & GLTF Studio (6 Variations)',
    category: 'BATCH',
    aesthetic: 'Glass Orbs Collision, 2D Rigid Verlet Dynamics, LiDAR Holo-Terrain, Silk Cloth Sim, Quaternion Gyro, GLTF 3D Studio',
    techStack: ['Three.js WebGL', 'Verlet SAT Collision Solver', 'Mass-Spring Cloth Lattice', 'GLTFLoader Drag & Drop'],
    philosophy: 'اوج شبیه‌سازی‌های بلادرنگ فیزیکی و فضایی وب؛ از برخورد کره‌های شیشه‌ای و سقوط بلوک‌ها با چرخش ۴ جهته جاذبه تا رندر پارچه ابریشم و استودیوی GLTF.',
    mathAndPhysics: 'شبیه‌سازی دینامیک ذره‌ای ورلت (Verlet Integration: x_new = 2*x - x_old + a*dt^2), قضایای جداسازی محورها (Separating Axis Theorem - SAT) برای برخورد مستطیل‌ها.',
    aiPromptDirective: `Implement 6 interactive spatial canvases and physics sandboxes:
- Spatial_V01 (Chromatic Glass Orbs): Buoyant refractive glass spheres colliding with spring conservation of momentum and acoustic impacts.
- Spatial_V02 (Neo-Brutalist 2D Rigid Physics): Rigid-body Verlet dynamics with 4-axis cardinal gravity rotation and block spawning.
- Spatial_V03 (Cyber LiDAR Holo-Terrain): 6,400 elevation nodes deformed by mouse wave ripples and laser scans.
- Spatial_V04 (Haute Silk Cloth Sim): Mass-spring textile physics lattice modeling French mulberry silk draping with aerodynamic wind.
- Spatial_V05 (Parametric 3D Gyroscope): Three nested orthogonal gimbal rings with quaternion rotations and magnetic particle orbits.
- Spatial_V06 (GLTF/GLB 3D Studio): Universal WebGL model dropzone with ACES Filmic lighting rigs, wireframe modes, PBR tuning, and snapshot capture.`,
    keyInteractiveElements: ['برخورد کره‌های شیشه‌ای شناور', 'جعبه شنی فیزیک با تغییر جهت جاذبه', 'میدان ارتفاعی ۶۴۰۰ نودی لیدار', 'شبیه‌ساز فیزیک پارچه ابریشم', 'ژیروسکوپ فضایی ۳ محوره', 'استودیو بازرسی سه‌بعدی GLTF'],
    tags: ['Spatial', 'Physics', 'Verlet', 'GLTF Studio', 'Batch 12'],
  },
];
