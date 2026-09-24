import React, { useState } from 'react';
import { useStore, WebsitePage } from '../../context/StoreContext';
import { MAIN_CATEGORY_STRUCTURE, CategoryStructure } from '../../utils/translations';
import { soundFx } from '../../utils/audio';
import {
  Compass,
  Store,
  Layers,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Tag,
  Shield,
  Box,
  FileCode
} from 'lucide-react';

interface CategoryNavPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToShowroom: () => void;
  isMobile?: boolean;
}

export const CategoryNavPanel: React.FC<CategoryNavPanelProps> = ({
  isOpen,
  onClose,
  onSwitchToShowroom,
  isMobile = false,
}) => {
  const {
    activePage,
    setActivePage,
    setSelectedCategoryFilter,
    theme,
    language,
    direction,
    t
  } = useStore();

  const [activeMainCategoryId, setActiveMainCategoryId] = useState<string>('studio_architecture');
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>('studio_architecture');

  const isRtl = direction === 'rtl';
  const isLight = theme === 'light';

  const handleSubcategoryClick = (sub: CategoryStructure['subcategories'][0]) => {
    soundFx.playClick(700);

    if (sub.linkType === 'page') {
      setActivePage(sub.target as WebsitePage);
    } else if (sub.linkType === 'store_filter') {
      setSelectedCategoryFilter(sub.target);
      setActivePage('STORE');
    } else if (sub.linkType === 'showroom_batch') {
      onSwitchToShowroom();
    }

    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeCategory =
    MAIN_CATEGORY_STRUCTURE.find((c) => c.id === activeMainCategoryId) ||
    MAIN_CATEGORY_STRUCTURE[0];

  // Mobile Accordion View
  if (isMobile) {
    return (
      <div className="space-y-3 font-mono text-xs w-full">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.mainCategories}</span>
          </span>
          <span className="text-[10px] text-zinc-500">3 {language === 'fa' ? 'دسته اصلی' : 'Main Domains'}</span>
        </div>

        <div className="space-y-2">
          {MAIN_CATEGORY_STRUCTURE.map((category) => {
            const isExpanded = expandedMobileCategory === category.id;
            return (
              <div
                key={category.id}
                className={`rounded-xl border transition-all ${
                  isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-black/50 border-white/10'
                }`}
              >
                <button
                  onClick={() => {
                    soundFx.playClick(600);
                    setExpandedMobileCategory(isExpanded ? null : category.id);
                  }}
                  className={`w-full p-3 flex items-center justify-between text-left ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                >
                  <div>
                    <h4 className={`font-bold text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                      {language === 'fa' ? category.nameFa : category.name}
                    </h4>
                    <p className={`text-[10px] mt-0.5 line-clamp-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {language === 'fa' ? category.descriptionFa : category.description}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform text-zinc-400 shrink-0 ${
                      isExpanded ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className={`p-2 pt-0 border-t ${isLight ? 'border-slate-200' : 'border-white/5'} space-y-1.5`}>
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubcategoryClick(sub)}
                        className={`w-full p-2.5 rounded-lg flex items-center justify-between text-left transition-all ${
                          isLight
                            ? 'hover:bg-slate-200/70 text-zinc-800'
                            : 'hover:bg-white/10 text-zinc-200'
                        }`}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs">
                              {language === 'fa' ? sub.nameFa : sub.name}
                            </span>
                            {sub.badge && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-cyan-400/20 text-cyan-400 border border-cyan-400/30">
                                {sub.badge}
                              </span>
                            )}
                          </div>
                          <span className={`text-[10px] mt-0.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            {language === 'fa' ? sub.descriptionFa : sub.description}
                          </span>
                        </div>
                        {isRtl ? (
                          <ArrowLeft className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Dropdown Mega-Panel
  if (!isOpen) return null;

  return (
    <div
      className={`absolute top-full mt-2 w-full max-w-4xl rounded-2xl border shadow-2xl backdrop-blur-2xl z-50 p-6 animate-in fade-in slide-in-from-top-3 duration-200 ${
        isRtl ? 'right-0' : 'left-0'
      } ${
        isLight
          ? 'bg-white/95 border-slate-300 text-zinc-900 shadow-slate-900/10'
          : 'bg-[#090b10]/95 border-white/20 text-white shadow-black/80'
      }`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Main Categories List */}
        <div className={`w-full md:w-5/12 border-b md:border-b-0 ${isRtl ? 'md:border-l' : 'md:border-r'} ${isLight ? 'border-slate-200' : 'border-white/10'} pb-4 md:pb-0 ${isRtl ? 'md:pl-4' : 'md:pr-4'} space-y-2`}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <Compass className="w-3 h-3" />
              <span>{t.mainCategories}</span>
            </span>
            <span className={`font-mono text-[10px] ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
              3 Domains
            </span>
          </div>

          <div className="space-y-1.5">
            {MAIN_CATEGORY_STRUCTURE.map((cat) => {
              const isSelected = activeMainCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundFx.playClick(600);
                    setActiveMainCategoryId(cat.id);
                  }}
                  onMouseEnter={() => setActiveMainCategoryId(cat.id)}
                  className={`w-full p-3 rounded-xl transition-all text-left flex items-center justify-between ${
                    isRtl ? 'text-right' : 'text-left'
                  } ${
                    isSelected
                      ? isLight
                        ? 'bg-slate-100 border border-slate-300 shadow-sm'
                        : 'bg-white/10 border border-white/15 shadow-sm'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">
                      {language === 'fa' ? cat.nameFa : cat.name}
                    </h4>
                    <p className={`text-[11px] mt-0.5 line-clamp-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {language === 'fa' ? cat.descriptionFa : cat.description}
                    </p>
                  </div>
                  {isRtl ? (
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400' : 'text-zinc-500'}`} />
                  ) : (
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400' : 'text-zinc-500'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Showroom Jump */}
          <div className="pt-3 border-t border-white/10 mt-3">
            <button
              onClick={() => {
                soundFx.playChime(700, 0.2);
                onSwitchToShowroom();
                onClose();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>{t.exploreShowroom}</span>
              </div>
              <span className="text-[10px] bg-amber-400 text-black px-1.5 py-0.5 rounded font-black">
                60 Live
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Sub-Categories of the Selected Category */}
        <div className="w-full md:w-7/12 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              <span>{t.subCategories}</span>
            </span>
            <span className={`font-mono text-[10px] ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {activeCategory.subcategories.length} {t.items}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeCategory.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => handleSubcategoryClick(sub)}
                className={`p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between group ${
                  isRtl ? 'text-right' : 'text-left'
                } ${
                  isLight
                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-cyan-500'
                    : 'bg-black/40 hover:bg-white/10 border-white/10 hover:border-cyan-400/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-xs group-hover:text-cyan-400 transition-colors">
                      {language === 'fa' ? sub.nameFa : sub.name}
                    </span>
                    {sub.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-white/10 text-cyan-300">
                        {sub.badge}
                      </span>
                    )}
                  </div>
                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {language === 'fa' ? sub.descriptionFa : sub.description}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-end text-[10px] font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>{language === 'fa' ? 'مشاهده و پیمایش ←' : 'Navigate →'}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
