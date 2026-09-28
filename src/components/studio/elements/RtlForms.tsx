import React, { useState, useRef } from 'react';
import { soundFx } from '../../../utils/audio';
import BlueprintHUD from '../../common/BlueprintHUD';
import { ComponentBlueprint } from '../../../types';
import {
  Search,
  Calendar,
  Tag,
  UploadCloud,
  File,
  X,
  Check,
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Clock,
  Layers,
  CheckCircle2,
  Trash2,
  Plus
} from 'lucide-react';

const blueprint: ComponentBlueprint = {
  id: 'Form_V06_CinematicPersianSpatialFormHUD',
  name: 'Persian-First Tactile Input Suite & Jalali Calendar HUD',
  category: 'Form',
  batch: 'Batch 11: Interactive Forms, Tactile Inputs & Kinetic Steppers',
  techStack: ['React / Vite', 'Jalali Solar Calendar', 'Tactile Multi-Tags', 'Dropzone Drag & Drop', 'Vazirmatn RTL Validation'],
  aestheticVibe: 'Cinematic Tactile HUD & Cyber-Forms',
  interactionBlueprint: 'Floating label morphs on focus with character counter; autocomplete queries local catalog; Jalali date picker maps solar calendar; multi-tag chips with keyboard Enter; animated dropzone with simulated progress.',
  description: 'A suite of 5 Persian-first production inputs engineered for RTL web apps: Floating Labels, Search Autocomplete, Jalali Date Picker, Multi-Select Tag System, and Dropzone.',
  tags: ['Persian Forms', 'Jalali Calendar', 'Floating Label', 'Dropzone', 'Multi-Select', 'RTL First'],
  codeSnippet: `// 5 Persian-First Inputs with Jalali Solar Calendar
const [selectedJalaliDate, setSelectedJalaliDate] = useState('۱۴۰۳/۰۷/۱۵');
const handleSelectDay = (day: number) => {
  const dayStr = day < 10 ? '۰' + day : day;
  setSelectedJalaliDate(\`\${year}/\${month}/\${dayStr}\`);
};`,
};

export default function RtlForms() {
  // ---------------------------------------------------------------------------
  // 1. FLOATING LABEL TEXT INPUT STATE
  // ---------------------------------------------------------------------------
  const [floatingValue, setFloatingValue] = useState('');
  const [floatingFocused, setFloatingFocused] = useState(false);
  const [floatingTouched, setFloatingTouched] = useState(false);

  const isFloatingValid = floatingValue.trim().length >= 4;

  // ---------------------------------------------------------------------------
  // 2. SEARCH AUTOCOMPLETE STATE
  // ---------------------------------------------------------------------------
  const [autoQuery, setAutoQuery] = useState('');
  const [autoOpen, setAutoOpen] = useState(false);
  const [selectedAutoItem, setSelectedAutoItem] = useState<string | null>(null);

  const AUTOCOMPLETE_ITEMS = [
    { title: 'طراحی سایت شرکتی و لندینگ پیج اختصاصی', category: 'توسعه وب' },
    { title: 'ساخت ربات تلگرام هوشمند متصل به هوش مصنوعی', category: 'ربات و اتوماسیون' },
    { title: 'طراحی هویت بصری، لوگو و ست اداری', category: 'گرافیک و برند' },
    { title: 'تولید موشن‌گرافیک ۳ بعدی و تیزر تبلیغاتی', category: 'موشن و انیمیشن' },
    { title: 'بهینه‌سازی سئو تکنیکال و رتبه‌بندی کلمات کلیدی', category: 'سئو و مارکتینگ' },
    { title: 'طراحی رابط و تجربه کاربری (UI/UX Design)', category: 'طراحی رابط' },
    { title: 'پیاده‌سازی فروشگاه آنلاین و درگاه پرداخت شاپرک', category: 'فروشگاه اینترنتی' },
  ];

  const filteredAutoItems = AUTOCOMPLETE_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(autoQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(autoQuery.toLowerCase())
  );

  // ---------------------------------------------------------------------------
  // 3. JALALI DATE PICKER STATE
  // ---------------------------------------------------------------------------
  const [selectedJalaliDate, setSelectedJalaliDate] = useState<string>('۱۴۰۳/۰۷/۱۵');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [currentJalaliMonth, setCurrentJalaliMonth] = useState<number>(7); // مهر = 7
  const [currentJalaliYear, setCurrentJalaliYear] = useState<number>(1403);

  const JALALI_MONTH_NAMES = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  const handleSelectDay = (day: number) => {
    soundFx.playClick(750);
    const dayStr = day < 10 ? `۰${day}` : `${day}`;
    const monthStr = currentJalaliMonth < 10 ? `۰${currentJalaliMonth}` : `${currentJalaliMonth}`;
    setSelectedJalaliDate(`${currentJalaliYear}/${monthStr}/${dayStr}`);
    setIsDatePickerOpen(false);
  };

  // ---------------------------------------------------------------------------
  // 4. MULTI-SELECT TAG SYSTEM STATE
  // ---------------------------------------------------------------------------
  const [tags, setTags] = useState<string[]>([
    'توسعه وب ۳ بعدی',
    'ربات تلگرام',
    'هویت بصری',
    'انیمیشن کینتیک'
  ]);
  const [newTagInput, setNewTagInput] = useState('');

  const PRESET_SUGGESTIONS = [
    'طراحی ریسپانسیو',
    'شیدر WebGL',
    'اتصال API',
    'سئو تکنیکال',
    'درگاه بانکی'
  ];

  const handleAddTag = (tagText: string) => {
    const trimmed = tagText.trim();
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      soundFx.playClick(700);
      setTags((prev) => [...prev, trimmed]);
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    soundFx.playClick(500);
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  // ---------------------------------------------------------------------------
  // 5. FILE UPLOAD DROPZONE STATE
  // ---------------------------------------------------------------------------
  interface UploadedFileRecord {
    id: string;
    name: string;
    size: string;
    progress: number;
    status: 'UPLOADING' | 'COMPLETED' | 'ERROR';
  }

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileRecord[]>([
    {
      id: 'f-1',
      name: 'brief_project_requirements_v2.pdf',
      size: '۲.۴ مگابایت',
      progress: 100,
      status: 'COMPLETED',
    },
  ]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (fileName: string, fileSize: string) => {
    const fileId = `file-${Date.now()}`;
    const newFile: UploadedFileRecord = {
      id: fileId,
      name: fileName,
      size: fileSize,
      progress: 10,
      status: 'UPLOADING',
    };

    setUploadedFiles((prev) => [newFile, ...prev]);

    // Simulate upload progress
    let progress = 10;
    const interval = setInterval(() => {
      progress += 25;
      if (progress >= 100) {
        clearInterval(interval);
        soundFx.playChime(950, 0.2);
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, progress: 100, status: 'COMPLETED' } : f))
        );
      } else {
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, progress } : f))
        );
      }
    }, 280);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    soundFx.playClick(600);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      simulateUpload(file.name, `${sizeMb} مگابایت`);
    }
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div
        dir="rtl"
        className="w-full bg-[#0c0d13] border border-[#202027] rounded-3xl p-6 sm:p-8 shadow-2xl text-zinc-100 font-['Plus_Jakarta_Sans','Vazirmatn'] space-y-8"
      >
      {/* Header */}
      <div className="border-b border-[#202027] pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#22D3EE] p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#0c0d13] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <h3 className="font-['Lalezar'] text-2xl text-white tracking-wide">
            مجموعه فرم‌ها و اینپوت‌های استاندارد فارسی (5 Persian-First Inputs)
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
            RTL-NATIVE
          </span>
        </div>
        <p className="text-xs text-zinc-400 mt-1 font-light">
          پنج الگوی فرم تعاملی با اعتبارسنجی فارسی، تقویم شمسی بومی، تگ‌های چندگانه و آپلود درگ‌وان‌دراپ.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* =================================================================== */}
        {/* 1. FLOATING LABEL TEXT INPUT                                        */}
        {/* =================================================================== */}
        <div className="p-5 rounded-2xl bg-[#111116] border border-[#202027] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-cyan-400 font-bold">
              ۰۱ // FLOATING LABEL INPUT
            </span>
            <span className="text-[10px] font-mono text-zinc-500">برچسب شناور هوشمند</span>
          </div>

          <div className="relative pt-2">
            <div
              className={`relative rounded-xl border bg-[#09090b] transition-all ${
                floatingFocused
                  ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                  : floatingTouched && !isFloatingValid
                  ? 'border-rose-500'
                  : 'border-[#202027]'
              }`}
            >
              {/* Floating Label */}
              <label
                className={`absolute right-3.5 transition-all pointer-events-none select-none ${
                  floatingFocused || floatingValue.length > 0
                    ? '-top-2.5 px-2 bg-[#09090b] text-[11px] text-cyan-400 font-medium'
                    : 'top-3.5 text-xs text-zinc-500'
                }`}
              >
                نام و نام خانوادگی متقاضی پروژه
              </label>

              <input
                type="text"
                value={floatingValue}
                onChange={(e) => setFloatingValue(e.target.value)}
                onFocus={() => {
                  soundFx.playTick(600);
                  setFloatingFocused(true);
                }}
                onBlur={() => {
                  setFloatingFocused(false);
                  setFloatingTouched(true);
                }}
                className="w-full px-3.5 pt-3.5 pb-2.5 bg-transparent text-xs text-white outline-none"
              />

              {/* Character counter & status icon */}
              <div className="absolute left-3 top-3.5 flex items-center gap-1.5 text-zinc-500">
                {floatingTouched && isFloatingValid && (
                  <Check className="w-4 h-4 text-emerald-400" />
                )}
                {floatingTouched && !isFloatingValid && (
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                )}
              </div>
            </div>

            {/* Validation Helper Message */}
            <div className="flex justify-between items-center px-1 mt-1 text-[11px]">
              <span className={floatingTouched && !isFloatingValid ? 'text-rose-400' : 'text-zinc-500'}>
                {floatingTouched && !isFloatingValid
                  ? 'حداقل ۴ حرف وارد کنید.'
                  : 'نام رسمی جهت صدور پیش‌فاکتور استودیو'}
              </span>
              <span className="font-mono text-[10px] text-zinc-600">
                {floatingValue.length} / ۶۰
              </span>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. SEARCH AUTOCOMPLETE WITH HIGHLIGHT                               */}
        {/* =================================================================== */}
        <div className="p-5 rounded-2xl bg-[#111116] border border-[#202027] space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-violet-400 font-bold">
              ۰۲ // SEARCH AUTOCOMPLETE
            </span>
            <span className="text-[10px] font-mono text-zinc-500">جستجوی بلادرنگ با فیلتر</span>
          </div>

          <div className="relative">
            <div className="relative">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="جستجوی پکیج یا خدمت (مثلاً: ربات تلگرام، موشن...)"
                value={autoQuery}
                onChange={(e) => {
                  setAutoQuery(e.target.value);
                  setAutoOpen(true);
                }}
                onFocus={() => setAutoOpen(true)}
                className="w-full bg-[#09090b] border border-[#202027] focus:border-violet-500 rounded-xl pr-10 pl-8 py-2.5 text-xs text-white outline-none transition-colors"
              />
              {autoQuery && (
                <button
                  onClick={() => setAutoQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results Popover */}
            {autoOpen && filteredAutoItems.length > 0 && (
              <div
                className="absolute z-30 top-full mt-1.5 inset-x-0 bg-[#0d0e15] border border-[#202027] rounded-2xl shadow-2xl p-2 max-h-56 overflow-y-auto space-y-1 animate-in fade-in"
              >
                {filteredAutoItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundFx.playClick(700);
                      setAutoQuery(item.title);
                      setSelectedAutoItem(item.title);
                      setAutoOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-white/5 flex items-center justify-between text-right text-xs transition-colors group"
                  >
                    <span className="text-zinc-200 group-hover:text-cyan-300">{item.title}</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 font-mono text-[10px] text-zinc-400">
                      {item.category}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. JALALI DATE PICKER                                              */}
        {/* =================================================================== */}
        <div className="p-5 rounded-2xl bg-[#111116] border border-[#202027] space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-emerald-400 font-bold">
              ۰۳ // JALALI DATE PICKER
            </span>
            <span className="text-[10px] font-mono text-zinc-500">تقویم هجری شمسی</span>
          </div>

          <div className="relative">
            <button
              onClick={() => {
                soundFx.playClick(600);
                setIsDatePickerOpen(!isDatePickerOpen);
              }}
              className="w-full bg-[#09090b] border border-[#202027] hover:border-emerald-500/50 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-sm">{selectedJalaliDate}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            </button>

            {/* Jalali Calendar Popover */}
            {isDatePickerOpen && (
              <div className="absolute z-30 top-full mt-2 inset-x-0 bg-[#0e0f17] border border-emerald-500/30 rounded-2xl p-4 shadow-2xl space-y-3 animate-in fade-in">
                {/* Month & Year header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <button
                    onClick={() => {
                      soundFx.playClick(600);
                      setCurrentJalaliMonth((prev) => (prev === 12 ? 1 : prev + 1));
                    }}
                    className="p-1 rounded-lg hover:bg-white/10 text-zinc-400"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="font-['Lalezar'] text-base text-white">
                    {JALALI_MONTH_NAMES[currentJalaliMonth - 1]} {currentJalaliYear}
                  </span>
                  <button
                    onClick={() => {
                      soundFx.playClick(600);
                      setCurrentJalaliMonth((prev) => (prev === 1 ? 12 : prev - 1));
                    }}
                    className="p-1 rounded-lg hover:bg-white/10 text-zinc-400"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px]">
                  {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map((w, i) => (
                    <span key={i} className="text-zinc-500 py-1">{w}</span>
                  ))}
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                    <button
                      key={d}
                      onClick={() => handleSelectDay(d)}
                      className="py-1.5 rounded-lg hover:bg-emerald-400 hover:text-black text-zinc-300 transition-colors"
                    >
                      {d.toLocaleString('fa-IR')}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 4. MULTI-SELECT TAG SYSTEM                                          */}
        {/* =================================================================== */}
        <div className="p-5 rounded-2xl bg-[#111116] border border-[#202027] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-amber-400 font-bold">
              ۰۴ // MULTI-SELECT TAG SYSTEM
            </span>
            <span className="text-[10px] font-mono text-zinc-500">انتخاب و ثبت چندگانه تگ</span>
          </div>

          <div className="p-2.5 rounded-xl border border-[#202027] bg-[#09090b] flex flex-wrap items-center gap-1.5 min-h-[46px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-1.5 animate-in fade-in"
              >
                <span>{tag}</span>
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <input
              type="text"
              placeholder="افزودن برچسب جدید و Enter..."
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag(newTagInput);
                }
              }}
              className="flex-1 min-w-[140px] bg-transparent text-xs text-white outline-none px-2 py-1 placeholder-zinc-600"
            />
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-zinc-500">پیشنهادات:</span>
            {PRESET_SUGGESTIONS.map((sug) => (
              <button
                key={sug}
                onClick={() => handleAddTag(sug)}
                className="px-2 py-0.5 rounded-md bg-[#161720] hover:bg-[#202230] text-[10px] text-zinc-400 hover:text-white border border-white/5 transition-colors flex items-center gap-1"
              >
                <Plus className="w-2.5 h-2.5" />
                <span>{sug}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 5. FILE UPLOAD DROPZONE WITH REAL PROGRESS BAR                      */}
      {/* =================================================================== */}
      <div className="p-5 rounded-2xl bg-[#111116] border border-[#202027] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-rose-400 font-bold">
              ۰۵ // FILE UPLOAD DROPZONE
            </span>
            <span className="text-zinc-500 text-xs">(پشتیبانی از PDF, Figma, ZIP, PNG تا ۵۰ مگابایت)</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">درگ و دراپ بومی</span>
        </div>

        {/* Dropzone Stage */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
            isDragOver
              ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_30px_rgba(34,211,238,0.2)]'
              : 'border-[#202027] hover:border-cyan-400/50 bg-[#09090b]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
                simulateUpload(file.name, `${sizeMb} مگابایت`);
              }
            }}
          />

          <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
            <UploadCloud className="w-6 h-6 animate-bounce" style={{ animationDuration: '2.5s' }} />
          </div>

          <div>
            <span className="font-bold text-white text-xs block">
              فایل بریف یا پیوست پروژه را اینجا بکشید یا کلیک کنید
            </span>
            <span className="text-[11px] text-zinc-500 mt-1 block">
              تضمین محرمانگی با رمزنگاری TLS استودیو
            </span>
          </div>
        </div>

        {/* Uploaded File List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2 pt-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="p-3 rounded-xl bg-[#09090b] border border-[#202027] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <File className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-white font-medium block truncate max-w-xs">{file.name}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">{file.size}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {file.status === 'UPLOADING' ? (
                    <div className="flex items-center gap-2 font-mono text-[10px] text-cyan-300">
                      <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 transition-all duration-200"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                      <span>{file.progress}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>تکمیل شد</span>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      soundFx.playClick(400);
                      setUploadedFiles((prev) => prev.filter((f) => f.id !== file.id));
                    }}
                    className="p-1 hover:bg-white/10 rounded text-zinc-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </BlueprintHUD>
  );
}
