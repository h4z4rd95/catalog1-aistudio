import React, { useState, useMemo } from 'react';
import { soundFx } from '../../../utils/audio';
import BlueprintHUD from '../../common/BlueprintHUD';
import { ComponentBlueprint } from '../../../types';
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
  Check,
  CheckSquare,
  Square,
  Eye,
  Edit,
  Trash2,
  Copy,
  FileSpreadsheet,
  FileJson,
  Sparkles,
  Layers,
  SlidersHorizontal,
  X,
  Plus
} from 'lucide-react';

const blueprint: ComponentBlueprint = {
  id: 'Dashboard_V06_CyberLedgerTelemetryGrid3D',
  name: 'Persian RTL Telemetry Data Grid & Spatial Matrix Ledger',
  category: 'Dashboard',
  batch: 'Batch 6: High-Density Dashboards & Interactive Node Visualizers',
  techStack: ['React / Vite', 'Multi-Column Sorting', 'BOM-UTF8 CSV Export', 'Interactive 3D Data Nodes', 'Vazirmatn RTL Grid'],
  aestheticVibe: 'Cyberpunk Telemetry HUD & High-Density Ledger',
  interactionBlueprint: 'Sort multi-columns, live full-text fuzzy query, batch select deletion, popover actions, and export to Persian Excel CSV or JSON.',
  description: 'An enterprise-grade RTL data grid engineered with Persian typography, sortable columns, pagination, and multi-row selection.',
  tags: ['RTL Data Table', 'Excel CSV Export', 'Pagination', 'Vazirmatn', 'Cyber Ledger', 'Batch Operations'],
  codeSnippet: `// RTL Data Grid with UTF-8 BOM CSV Export
const handleExportCSV = () => {
  const csvContent = '\\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
};`,
};

export interface ProjectOrderRecord {
  id: string;
  orderNumber: string;
  projectTitle: string;
  clientName: string;
  department: 'WEB' | 'AI_BOTS' | 'BRANDING' | 'MOTION' | 'MARKETING';
  amountToman: number;
  dateJalali: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'REVIEW';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

const SAMPLE_ORDERS_DATA: ProjectOrderRecord[] = [
  {
    id: 'ord-101',
    orderNumber: 'PRJ-1403-882',
    projectTitle: 'توسعه وب‌اپلیکیشن صرافی غیرمتمرکز Web3',
    clientName: 'شرکت فناوری نوین رایان',
    department: 'WEB',
    amountToman: 85000000,
    dateJalali: '۱۴۰۳/۰۷/۰۲',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
  },
  {
    id: 'ord-102',
    orderNumber: 'PRJ-1403-883',
    projectTitle: 'طراحی هویت بصری کامل و کتابچه برند (Brandbook)',
    clientName: 'کافه رستوران زنجیره‌ای لیدوما',
    department: 'BRANDING',
    amountToman: 42000000,
    dateJalali: '۱۴۰۳/۰۷/۰۱',
    status: 'COMPLETED',
    priority: 'MEDIUM',
  },
  {
    id: 'ord-103',
    orderNumber: 'PRJ-1403-884',
    projectTitle: 'ساخت ربات هوشمند مدیریت پشتیبانی تلگرام و بله با LLM',
    clientName: 'مجموعه گردشگری سفرآسا',
    department: 'AI_BOTS',
    amountToman: 64000000,
    dateJalali: '۱۴۰۳/۰۶/۲۹',
    status: 'REVIEW',
    priority: 'HIGH',
  },
  {
    id: 'ord-104',
    orderNumber: 'PRJ-1403-885',
    projectTitle: 'تولید ۳۰ ثانیه تیزر سه‌بعدی موشن‌گرافیک محصول',
    clientName: 'استارتاپ فین‌تک پی‌وال',
    department: 'MOTION',
    amountToman: 38000000,
    dateJalali: '۱۴۰۳/۰۶/۲۸',
    status: 'COMPLETED',
    priority: 'MEDIUM',
  },
  {
    id: 'ord-105',
    orderNumber: 'PRJ-1403-886',
    projectTitle: 'کمپین سئو ۳ ماهه و بازاریابی مبتنی بر داده',
    clientName: 'فروشگاه آنلاین چرم درسا',
    department: 'MARKETING',
    amountToman: 29000000,
    dateJalali: '۱۴۰۳/۰۶/۲۶',
    status: 'IN_PROGRESS',
    priority: 'LOW',
  },
  {
    id: 'ord-106',
    orderNumber: 'PRJ-1403-887',
    projectTitle: 'طراحی رابط کاربری UI/UX داشبورد مانیتورینگ ابری',
    clientName: 'مرکز محاسبات کلان داده',
    department: 'WEB',
    amountToman: 54000000,
    dateJalali: '۱۴۰۳/۰۶/۲۵',
    status: 'PENDING',
    priority: 'HIGH',
  },
  {
    id: 'ord-107',
    orderNumber: 'PRJ-1403-888',
    projectTitle: 'ربات الگوریتمی تحلیل احساسات بازار مالی با هوش مصنوعی',
    clientName: 'صندوق سرمایه‌گذاری آریا',
    department: 'AI_BOTS',
    amountToman: 110000000,
    dateJalali: '۱۴۰۳/۰۶/۲۳',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
  },
  {
    id: 'ord-108',
    orderNumber: 'PRJ-1403-889',
    projectTitle: 'طراحی بسته‌بندی، لوگوتایپ و نشان تجاری دارویی',
    clientName: 'صنایع داروسازی ره‌آورد',
    department: 'BRANDING',
    amountToman: 48000000,
    dateJalali: '۱۴۰۳/۰۶/۲۰',
    status: 'COMPLETED',
    priority: 'MEDIUM',
  },
  {
    id: 'ord-109',
    orderNumber: 'PRJ-1403-890',
    projectTitle: 'موشن اینترو لوگوی برند اختصاصی با شیدر کینتیک',
    clientName: 'استودیو بازی‌سازی سایبرنوا',
    department: 'MOTION',
    amountToman: 22000000,
    dateJalali: '۱۴۰۳/۰۶/۱۹',
    status: 'REVIEW',
    priority: 'LOW',
  },
  {
    id: 'ord-110',
    orderNumber: 'PRJ-1403-891',
    projectTitle: 'پلتفرم تجارت الکترونیک B2B اختصاصی با Next.js',
    clientName: 'بازرگانی فلزات آسیا',
    department: 'WEB',
    amountToman: 98000000,
    dateJalali: '۱۴۰3/۰۶/۱۷',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
  },
  {
    id: 'ord-111',
    orderNumber: 'PRJ-1403-892',
    projectTitle: 'پیاده‌سازی ربات سفارش‌گیر دوزبانه تلگرام متصل به CRM',
    clientName: 'گروه صنعتی پایا',
    department: 'AI_BOTS',
    amountToman: 51000000,
    dateJalali: '۱۴۰۳/۰۶/۱۵',
    status: 'PENDING',
    priority: 'MEDIUM',
  },
  {
    id: 'ord-112',
    orderNumber: 'PRJ-1403-893',
    projectTitle: 'ریدیزاین کامل هویت سازمانی و مستندات اداری',
    clientName: 'شرکت بیمه رازی نو',
    department: 'BRANDING',
    amountToman: 65000000,
    dateJalali: '۱۴۰۳/۰۶/۱۲',
    status: 'COMPLETED',
    priority: 'HIGH',
  },
];

type SortField = 'orderNumber' | 'projectTitle' | 'clientName' | 'department' | 'amountToman' | 'dateJalali' | 'status';
type SortDirection = 'ASC' | 'DESC';

const DEPARTMENT_BADGES: Record<string, { label: string; color: string }> = {
  WEB: { label: 'طراحی و فرانت‌اند', color: 'bg-cyan-950/80 border-cyan-400/40 text-cyan-300' },
  AI_BOTS: { label: 'هوش مصنوعی و ربات', color: 'bg-violet-950/80 border-violet-400/40 text-violet-300' },
  BRANDING: { label: 'هویت بصری و گرافیک', color: 'bg-amber-950/80 border-amber-400/40 text-amber-300' },
  MOTION: { label: 'موشن و انیمیشن', color: 'bg-rose-950/80 border-rose-400/40 text-rose-300' },
  MARKETING: { label: 'سئو و رشد دیجیتال', color: 'bg-emerald-950/80 border-emerald-400/40 text-emerald-300' },
};

const STATUS_BADGES: Record<string, { label: string; dotColor: string; bg: string }> = {
  COMPLETED: { label: 'تکمیل‌شده و تحویل', dotColor: 'bg-emerald-400', bg: 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' },
  IN_PROGRESS: { label: 'در حال توسعه', dotColor: 'bg-cyan-400 animate-pulse', bg: 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30' },
  REVIEW: { label: 'بازبینی و QC', dotColor: 'bg-amber-400', bg: 'bg-amber-950/40 text-amber-300 border-amber-500/30' },
  PENDING: { label: 'در انتظار پرداخت/تایید', dotColor: 'bg-zinc-400', bg: 'bg-zinc-900/80 text-zinc-300 border-zinc-700/50' },
};

export default function RtlDataTable() {
  const [data, setData] = useState<ProjectOrderRecord[]>(SAMPLE_ORDERS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortField, setSortField] = useState<SortField>('dateJalali');
  const [sortDirection, setSortDirection] = useState<SortDirection>('DESC');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [actionMenuOpenId, setActionMenuOpenId] = useState<string | null>(null);
  const [selectedRecordForModal, setSelectedRecordForModal] = useState<ProjectOrderRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sorting Handler
  const handleSort = (field: SortField) => {
    soundFx.playClick(700);
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    } else {
      setSortField(field);
      setSortDirection('ASC');
    }
  };

  // Filtered & Sorted Records
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.projectTitle.toLowerCase().includes(q) ||
          r.clientName.toLowerCase().includes(q) ||
          r.orderNumber.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q)
      );
    }

    // Department filter
    if (selectedDepartment !== 'ALL') {
      result = result.filter((r) => r.department === selectedDepartment);
    }

    // Status filter
    if (selectedStatus !== 'ALL') {
      result = result.filter((r) => r.status === selectedStatus);
    }

    // Sorting
    result.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortDirection === 'ASC' ? -1 : 1;
      if (valA > valB) return sortDirection === 'ASC' ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, searchQuery, selectedDepartment, selectedStatus, sortField, sortDirection]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  // Bulk Selection
  const isAllSelected = paginatedData.length > 0 && paginatedData.every((r) => selectedRowIds.includes(r.id));
  const isSomeSelected = paginatedData.some((r) => selectedRowIds.includes(r.id)) && !isAllSelected;

  const handleToggleSelectAll = () => {
    soundFx.playClick(600);
    if (isAllSelected) {
      const curPageIds = new Set(paginatedData.map((r) => r.id));
      setSelectedRowIds((prev) => prev.filter((id) => !curPageIds.has(id)));
    } else {
      const curPageIds = paginatedData.map((r) => r.id);
      setSelectedRowIds((prev) => Array.from(new Set([...prev, ...curPageIds])));
    }
  };

  const handleToggleRow = (id: string) => {
    soundFx.playClick(650);
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Export handlers
  const handleExportCSV = () => {
    soundFx.playChime(850, 0.2);
    const headers = ['شناسه', 'کد سفارش', 'عنوان پروژه', 'مشتری', 'دپارتمان', 'مبلغ (تومان)', 'تاریخ', 'وضعیت'];
    const rows = filteredData.map((r) => [
      r.id,
      r.orderNumber,
      `"${r.projectTitle}"`,
      `"${r.clientName}"`,
      DEPARTMENT_BADGES[r.department]?.label || r.department,
      r.amountToman,
      r.dateJalali,
      STATUS_BADGES[r.status]?.label || r.status,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orders-export-${Date.now()}.csv`;
    link.click();
    showToast('فایل CSV با پشتیبانی زبان فارسی دانلود شد.');
  };

  const handleExportJSON = () => {
    soundFx.playChime(900, 0.2);
    const jsonStr = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orders-export-${Date.now()}.json`;
    link.click();
    showToast('فایل JSON دیتا با ساختار استاندارد ذخیره شد.');
  };

  const handleDeleteSelected = () => {
    soundFx.playClick(400);
    setData((prev) => prev.filter((r) => !selectedRowIds.includes(r.id)));
    setSelectedRowIds([]);
    showToast(`${selectedRowIds.length} ردیف با موفقیت حذف شد.`);
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div
        dir="rtl"
        className="w-full bg-[#0c0d13] border border-[#202027] rounded-3xl p-5 sm:p-7 shadow-2xl text-zinc-100 font-['Plus_Jakarta_Sans','Vazirmatn'] space-y-6"
      >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-2xl bg-cyan-950/90 border border-cyan-400 text-cyan-300 font-mono text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header and Summary stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202027] pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#0c0d13] rounded-[11px] flex items-center justify-center">
                <Layers className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <h3 className="font-['Lalezar'] text-2xl text-white tracking-wide">
              جدول داده‌های پیشرفته استودیو (RTL Data Grid)
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
              {filteredData.length} رکورد فعال
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            چیدمان راست‌چین سازگار با فونت وزیرمتن، سورت چندستونه، فیلتراسیون هوشمند، انتخاب دسته‌جمعی و خروجی اکسل/CSV.
          </p>
        </div>

        {/* Action Controls & Export */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl bg-[#14151c] hover:bg-[#1c1d27] border border-[#202027] hover:border-cyan-400/50 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
            title="خروجی فایل اکسل CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>خروجی CSV</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 rounded-xl bg-[#14151c] hover:bg-[#1c1d27] border border-[#202027] hover:border-cyan-400/50 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
            title="خروجی JSON"
          >
            <FileJson className="w-3.5 h-3.5 text-cyan-400" />
            <span>خروجی JSON</span>
          </button>
        </div>
      </div>

      {/* Search, Filter Bar and Bulk Action HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="جستجو در عنوان پروژه، نام مشتری، شناسه یا شماره سفارش..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-[#111116] border border-[#202027] rounded-xl pr-10 pl-3 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-cyan-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters Dropdown */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Department Filter */}
          <select
            value={selectedDepartment}
            onChange={(e) => {
              soundFx.playClick(600);
              setSelectedDepartment(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#111116] border border-[#202027] text-zinc-300 text-xs rounded-xl px-3 py-2 outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="ALL">همه دپارتمان‌ها</option>
            <option value="WEB">طراحی وب و فرانت‌اند</option>
            <option value="AI_BOTS">هوش مصنوعی و ربات</option>
            <option value="BRANDING">هویت بصری و برندینگ</option>
            <option value="MOTION">موشن‌گرافیک</option>
            <option value="MARKETING">سئو و مارکتینگ</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              soundFx.playClick(600);
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#111116] border border-[#202027] text-zinc-300 text-xs rounded-xl px-3 py-2 outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="ALL">همه وضعیت‌ها</option>
            <option value="COMPLETED">تکمیل‌شده</option>
            <option value="IN_PROGRESS">در حال انجام</option>
            <option value="REVIEW">در حال بازبینی</option>
            <option value="PENDING">در انتظار تایید</option>
          </select>
        </div>
      </div>

      {/* Bulk Selection Bar (Shows when rows are checked) */}
      {selectedRowIds.length > 0 && (
        <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
            <CheckSquare className="w-4 h-4 text-cyan-400" />
            <span>{selectedRowIds.length} ردیف انتخاب شده است</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick(600);
                setSelectedRowIds([]);
              }}
              className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-zinc-300"
            >
              انصراف
            </button>
            <button
              onClick={handleDeleteSelected}
              className="px-3 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>حذف انتخاب‌شده‌ها</span>
            </button>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-[#202027] bg-[#09090b]">
        <table className="w-full text-right text-xs">
          {/* Table Header */}
          <thead className="bg-[#111116] border-b border-[#202027] text-zinc-400 font-mono text-[11px] select-none">
            <tr>
              {/* Select All Checkbox */}
              <th className="py-3 px-4 w-10 text-center">
                <button
                  onClick={handleToggleSelectAll}
                  className="w-4 h-4 rounded border border-zinc-600 flex items-center justify-center transition-colors hover:border-cyan-400"
                >
                  {isAllSelected ? (
                    <Check className="w-3 h-3 text-cyan-400 stroke-[3]" />
                  ) : isSomeSelected ? (
                    <div className="w-2 h-0.5 bg-cyan-400" />
                  ) : null}
                </button>
              </th>

              {/* Order Number */}
              <th
                onClick={() => handleSort('orderNumber')}
                className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>کد سفارش</span>
                  {sortField === 'orderNumber' ? (
                    sortDirection === 'ASC' ? <ArrowUp className="w-3 h-3 text-cyan-400" /> : <ArrowDown className="w-3 h-3 text-cyan-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              {/* Project Title */}
              <th
                onClick={() => handleSort('projectTitle')}
                className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>عنوان پروژه</span>
                  {sortField === 'projectTitle' ? (
                    sortDirection === 'ASC' ? <ArrowUp className="w-3 h-3 text-cyan-400" /> : <ArrowDown className="w-3 h-3 text-cyan-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              {/* Client Name */}
              <th
                onClick={() => handleSort('clientName')}
                className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>کارفرما</span>
                  {sortField === 'clientName' ? (
                    sortDirection === 'ASC' ? <ArrowUp className="w-3 h-3 text-cyan-400" /> : <ArrowDown className="w-3 h-3 text-cyan-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              {/* Department */}
              <th
                onClick={() => handleSort('department')}
                className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>دپارتمان</span>
                  {sortField === 'department' ? (
                    sortDirection === 'ASC' ? <ArrowUp className="w-3 h-3 text-cyan-400" /> : <ArrowDown className="w-3 h-3 text-cyan-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              {/* Amount */}
              <th
                onClick={() => handleSort('amountToman')}
                className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>مبلغ قرارداد (تومان)</span>
                  {sortField === 'amountToman' ? (
                    sortDirection === 'ASC' ? <ArrowUp className="w-3 h-3 text-cyan-400" /> : <ArrowDown className="w-3 h-3 text-cyan-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              {/* Date */}
              <th
                onClick={() => handleSort('dateJalali')}
                className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>تاریخ ثبت</span>
                  {sortField === 'dateJalali' ? (
                    sortDirection === 'ASC' ? <ArrowUp className="w-3 h-3 text-cyan-400" /> : <ArrowDown className="w-3 h-3 text-cyan-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              {/* Status */}
              <th
                onClick={() => handleSort('status')}
                className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>وضعیت پروژه</span>
                  {sortField === 'status' ? (
                    sortDirection === 'ASC' ? <ArrowUp className="w-3 h-3 text-cyan-400" /> : <ArrowDown className="w-3 h-3 text-cyan-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              {/* Actions */}
              <th className="py-3 px-3 text-center w-14">عملیات</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#202027] text-zinc-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-zinc-500 font-mono">
                  رکوردی با معیارهای جستجوی جاری یافت نشد.
                </td>
              </tr>
            ) : (
              paginatedData.map((record) => {
                const isSelected = selectedRowIds.includes(record.id);
                const dept = DEPARTMENT_BADGES[record.department] || { label: record.department, color: 'bg-zinc-800' };
                const st = STATUS_BADGES[record.status] || { label: record.status, dotColor: 'bg-zinc-400', bg: 'bg-zinc-800' };

                return (
                  <tr
                    key={record.id}
                    className={`transition-colors hover:bg-white/[0.03] ${
                      isSelected ? 'bg-cyan-950/20' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleRow(record.id)}
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-cyan-500 border-cyan-400 text-black'
                            : 'border-zinc-700 hover:border-zinc-500'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                    </td>

                    {/* Order Number */}
                    <td className="py-3.5 px-3 font-mono text-[11px] text-zinc-400">
                      {record.orderNumber}
                    </td>

                    {/* Project Title */}
                    <td className="py-3.5 px-3 font-medium text-white max-w-[260px] truncate">
                      <span title={record.projectTitle}>{record.projectTitle}</span>
                    </td>

                    {/* Client */}
                    <td className="py-3.5 px-3 text-zinc-300">
                      {record.clientName}
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-lg border text-[10px] font-mono whitespace-nowrap ${dept.color}`}>
                        {dept.label}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-3 font-mono text-cyan-300 font-bold">
                      {record.amountToman.toLocaleString('fa-IR')}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-3 font-mono text-zinc-400 text-[11px]">
                      {record.dateJalali}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-medium whitespace-nowrap ${st.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dotColor}`} />
                        <span>{st.label}</span>
                      </span>
                    </td>

                    {/* Action button */}
                    <td className="py-3.5 px-3 text-center relative">
                      <button
                        onClick={() => {
                          soundFx.playClick(650);
                          setActionMenuOpenId(actionMenuOpenId === record.id ? null : record.id);
                        }}
                        className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>

                      {/* Floating Actions Popover */}
                      {actionMenuOpenId === record.id && (
                        <div
                          className="absolute left-8 top-2 z-40 w-44 rounded-2xl bg-[#14151e] border border-[#202027] shadow-2xl p-1.5 space-y-1 font-mono text-xs text-right animate-in fade-in"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => {
                              setSelectedRecordForModal(record);
                              setActionMenuOpenId(null);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-xl hover:bg-white/10 flex items-center gap-2 text-zinc-300 hover:text-white"
                          >
                            <Eye className="w-3.5 h-3.5 text-cyan-400" />
                            <span>مشاهده جزئیات</span>
                          </button>

                          <button
                            onClick={() => {
                              showToast(`ویرایش سفارش ${record.orderNumber} فعال شد`);
                              setActionMenuOpenId(null);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-xl hover:bg-white/10 flex items-center gap-2 text-zinc-300 hover:text-white"
                          >
                            <Edit className="w-3.5 h-3.5 text-amber-400" />
                            <span>ویرایش قرارداد</span>
                          </button>

                          <button
                            onClick={() => {
                              const dup: ProjectOrderRecord = {
                                ...record,
                                id: `ord-${Date.now()}`,
                                orderNumber: `${record.orderNumber}-DUP`,
                                projectTitle: `${record.projectTitle} (رونوشت)`,
                              };
                              setData((prev) => [dup, ...prev]);
                              showToast('رونوشت با موفقیت ایجاد گردید.');
                              setActionMenuOpenId(null);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-xl hover:bg-white/10 flex items-center gap-2 text-zinc-300 hover:text-white"
                          >
                            <Copy className="w-3.5 h-3.5 text-violet-400" />
                            <span>ایجاد رونوشت (Duplicate)</span>
                          </button>

                          <div className="border-t border-white/10 my-1" />

                          <button
                            onClick={() => {
                              setData((prev) => prev.filter((r) => r.id !== record.id));
                              showToast(`سفارش ${record.orderNumber} حذف شد.`);
                              setActionMenuOpenId(null);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-xl hover:bg-rose-500/20 text-rose-400 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف رکورد</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs text-zinc-400">
        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <span>نمایش در هر صفحه:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              soundFx.playClick(600);
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-[#111116] border border-[#202027] text-white rounded-xl px-2.5 py-1 outline-none cursor-pointer"
          >
            <option value={5}>۵ ردیف</option>
            <option value={10}>۱۰ ردیف</option>
            <option value={20}>۲۰ ردیف</option>
          </select>
          <span className="text-zinc-500 mr-2">
            (نمایش {Math.min((currentPage - 1) * rowsPerPage + 1, filteredData.length)} تا{' '}
            {Math.min(currentPage * rowsPerPage, filteredData.length)} از {filteredData.length} رکورد)
          </span>
        </div>

        {/* Page controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundFx.playClick(600);
              setCurrentPage(1);
            }}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-xl bg-[#14151c] hover:bg-[#1f202b] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center border border-[#202027] text-zinc-300"
            title="صفحه نخست"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundFx.playClick(600);
              setCurrentPage((prev) => Math.max(1, prev - 1));
            }}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-xl bg-[#14151c] hover:bg-[#1f202b] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center border border-[#202027] text-zinc-300"
            title="صفحه قبل"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => {
                soundFx.playClick(700);
                setCurrentPage(p);
              }}
              className={`w-8 h-8 rounded-xl font-mono text-xs font-bold transition-all ${
                currentPage === p
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-[#14151c] hover:bg-[#1f202b] text-zinc-300 border border-[#202027]'
              }`}
            >
              {p.toLocaleString('fa-IR')}
            </button>
          ))}

          <button
            onClick={() => {
              soundFx.playClick(600);
              setCurrentPage((prev) => Math.min(totalPages, prev + 1));
            }}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-xl bg-[#14151c] hover:bg-[#1f202b] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center border border-[#202027] text-zinc-300"
            title="صفحه بعد"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundFx.playClick(600);
              setCurrentPage(totalPages);
            }}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-xl bg-[#14151c] hover:bg-[#1f202b] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center border border-[#202027] text-zinc-300"
            title="صفحه آخر"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {selectedRecordForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#0e0f17] border border-cyan-500/40 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-cyan-400">{selectedRecordForModal.orderNumber}</span>
                <h4 className="font-['Lalezar'] text-xl text-white mt-0.5">شناسنامه و جزئیات سفارش</h4>
              </div>
              <button
                onClick={() => setSelectedRecordForModal(null)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-zinc-400">عنوان پروژه:</span>
                <span className="font-bold text-white text-left max-w-[280px]">{selectedRecordForModal.projectTitle}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-zinc-400">نام کارفرما:</span>
                <span className="font-bold text-white">{selectedRecordForModal.clientName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-zinc-400">دپارتمان مجری:</span>
                <span className="font-mono text-cyan-300">{DEPARTMENT_BADGES[selectedRecordForModal.department]?.label}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-zinc-400">مبلغ قرارداد:</span>
                <span className="font-mono text-emerald-400 font-bold">{selectedRecordForModal.amountToman.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-zinc-400">تاریخ ثبت:</span>
                <span className="font-mono text-zinc-300">{selectedRecordForModal.dateJalali}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-400">وضعیت اجرایی:</span>
                <span className="font-mono text-amber-300">{STATUS_BADGES[selectedRecordForModal.status]?.label}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedRecordForModal(null)}
              className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-mono text-xs transition-colors"
            >
              بستن پنجره
            </button>
          </div>
        </div>
      )}
      </div>
    </BlueprintHUD>
  );
}
