import React, { useState } from 'react';
import { SITE_CONTENT, StudioService } from '../../../content/site';
import { soundFx } from '../../../utils/audio';
import { ArrowRight, ArrowLeft, CheckCircle2, Clock, Layers, Sparkles, Cpu } from 'lucide-react';

interface DepartmentsPageProps {
  onBackToHome: () => void;
  onSelectService: (service: StudioService) => void;
  onOpenBotsPage: () => void;
}

export default function DepartmentsPage({
  onBackToHome,
  onSelectService,
  onOpenBotsPage,
}: DepartmentsPageProps) {
  const [filter, setFilter] = useState<'ALL' | 'DESIGN' | 'TECH'>('ALL');
  const services = SITE_CONTENT.services.filter((s) => filter === 'ALL' || s.category === filter);

  return (
    <div className="min-h-screen bg-[#09090B] text-white font-['Plus_Jakarta_Sans'] pb-24">
      {/* Top Breadcrumb */}
      <div className="border-b border-[#202027] bg-[#111116]/80 backdrop-blur-xl px-4 sm:px-8 py-4 flex items-center justify-between sticky top-16 z-30">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به صفحه اصلی استودیو</span>
        </button>

        <span className="font-mono text-xs text-zinc-400">
          DEPARTMENTS &bull; FULL 10-SERVICE TAXONOMY
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111116] border border-[#202027] text-cyan-300 font-mono text-xs">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>01 WEB // 02 AI // 03 DESIGN</span>
          </div>

          <h1 className="font-['Lalezar'] text-4xl sm:text-6xl text-white">
            دپارتمان‌ها و سرویس‌های تخصصی استودیو
          </h1>

          <p className="font-['Vazirmatn'] text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            موتور خلاقیت ۱۲۳سرویس به دو شاخه اصلی طراحی هنری و مهندسی نرم‌افزار تقسیم می‌شود؛ هر خدمت دارای گایدلاین شفاف، زمان‌بندی دقیق و خروجی‌های استاندارد صنعتی است.
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="flex gap-2 border-b border-[#202027] pb-4">
          {[
            { id: 'ALL', label: 'همه سرویس‌ها (۱۰ خدمت)' },
            { id: 'DESIGN', label: 'دپارتمان طراحی و هویت (۶ خدمت)' },
            { id: 'TECH', label: 'دپارتمان وب، هوش مصنوعی و سئو (۴ خدمت)' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                soundFx.playClick(600);
                setFilter(f.id as any);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                filter === f.id
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/25'
                  : 'bg-[#111116] hover:bg-[#17171D] text-zinc-400 hover:text-white border border-[#202027]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-3xl bg-[#111116] border border-[#202027] hover:border-cyan-400/50 shadow-xl flex flex-col justify-between space-y-4 group transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#17171D] text-cyan-300 border border-[#202027] font-bold">
                    {srv.number} &bull; {srv.categoryLabel}
                  </span>
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {srv.timeline}
                  </span>
                </div>

                <h3 className="font-['Lalezar'] text-2xl text-white group-hover:text-cyan-300 transition-colors">
                  {srv.title}
                </h3>

                <p className="font-['Vazirmatn'] text-xs text-zinc-400 font-light leading-relaxed">
                  {srv.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-[#202027]">
                  {srv.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-[11px] text-zinc-300 font-['Vazirmatn']">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B8FF3D] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (srv.id === 'social-bots') {
                    onOpenBotsPage();
                  } else {
                    onSelectService(srv);
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-[#17171D] hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-['Lalezar'] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>{srv.id === 'social-bots' ? 'ورود به صفحه اختصاصی ربات‌ها' : 'مشاهده جزئیات و ثبت سفارش'}</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
