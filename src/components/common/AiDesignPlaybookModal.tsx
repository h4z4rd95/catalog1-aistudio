import React, { useState, useEffect } from 'react';
import { AI_PLAYBOOK_ENTRIES, PlaybookEntry } from '../../data/aiPlaybookData';
import { soundFx } from '../../utils/audio';
import {
  BookOpen,
  X,
  Copy,
  Check,
  Search,
  Sparkles,
  Cpu,
  Layers,
  Terminal,
  Calculator,
  Compass,
  Code,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface AiDesignPlaybookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEntryId?: string | null;
  onNavigateToElement?: (id: string) => void;
  language?: 'en' | 'fa';
}

// Helper to match arbitrary component or batch IDs to playbook entries
function resolveEntry(targetId: string | null): PlaybookEntry {
  if (!targetId) return AI_PLAYBOOK_ENTRIES[0];

  const clean = targetId.trim();
  const upper = clean.toUpperCase();

  // 1. Exact match on ID or batchId
  const direct = AI_PLAYBOOK_ENTRIES.find(
    (e) => e.id.toUpperCase() === upper || (e.batchId && e.batchId.toUpperCase() === upper)
  );
  if (direct) return direct;

  const lower = clean.toLowerCase();

  // 2. Element ID prefixes
  if (lower.startsWith('hero_') || lower.includes('hero')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'BATCH_1') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.startsWith('nav_') || lower.includes('nav')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'BATCH_2') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.startsWith('loader_') || lower.includes('loader')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'BATCH_3') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.startsWith('cursor_') || lower.startsWith('scroll_') || lower.includes('scroll_v')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'BATCH_4') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.startsWith('grid_') || lower.startsWith('footer_') || lower.includes('footer')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'BATCH_5') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.startsWith('text_') || lower.startsWith('dashboard_') || lower.includes('dashboard')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'BATCH_6') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.startsWith('audio_') || lower.startsWith('product_') || lower.includes('product')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'BATCH_7') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.startsWith('button_') || lower.startsWith('generative_') || lower.includes('generative')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'BATCH_8') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.startsWith('card_') || lower.startsWith('typography_') || lower.includes('typography')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'BATCH_9') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.startsWith('shader_') || lower.includes('shader')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'BATCH_10') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.startsWith('form_') || lower.includes('form')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'BATCH_11') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.startsWith('spatial_') || lower.includes('spatial')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'BATCH_12') || AI_PLAYBOOK_ENTRIES[0];
  }

  // 3. Projects keywords
  if (lower.includes('studio') || lower.includes('123')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'STUDIO_123') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.includes('persian') || lower.includes('muqarnas') || lower.includes('orsi')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'PERSIAN_MUQARNAS_WORLD') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.includes('chrono') || lower.includes('nebula') || lower.includes('astrolabe')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'CHRONO_NEBULA_WORLD') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.includes('scroll_world') || lower.includes('cinematic')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'SCROLL_WORLD_3D') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.includes('awwward') || lower.includes('fluted')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'AWWWARDS_HERO') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.includes('coffee') || lower.includes('bean')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'COFFEE_SAMPLE') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.includes('pc') || lower.includes('builder') || lower.includes('hardware')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'PC_BUILDER_SAMPLE') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.includes('wiki') || lower.includes('game')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'WIKI_GAME_SAMPLE') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.includes('gltf') || lower.includes('glb') || lower.includes('inspector')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'GLTF_STUDIO') || AI_PLAYBOOK_ENTRIES[0];
  }
  if (lower.includes('voice') || lower.includes('calligraphy') || lower.includes('siah')) {
    return AI_PLAYBOOK_ENTRIES.find((e) => e.id === 'VOICE_CALLIGRAPHY') || AI_PLAYBOOK_ENTRIES[0];
  }

  // 4. Batch numbers
  const batchMatch = lower.match(/batch[_\s-]?(\d+)/);
  if (batchMatch) {
    const bId = `BATCH_${batchMatch[1]}`;
    const found = AI_PLAYBOOK_ENTRIES.find((e) => e.id === bId);
    if (found) return found;
  }

  return AI_PLAYBOOK_ENTRIES[0];
}

export default function AiDesignPlaybookModal({
  isOpen,
  onClose,
  initialEntryId = null,
  onNavigateToElement,
  language = 'fa',
}: AiDesignPlaybookModalProps) {
  const isFa = language === 'fa';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'PROJECTS' | 'BATCHES'>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const resolved = resolveEntry(initialEntryId);
      setSelectedEntryId(resolved.id);
    }
  }, [isOpen, initialEntryId]);

  if (!isOpen) return null;

  const filteredEntries = AI_PLAYBOOK_ENTRIES.filter((entry) => {
    const matchesTab =
      activeTab === 'ALL' ||
      (activeTab === 'PROJECTS' && entry.category === 'PROJECT') ||
      (activeTab === 'BATCHES' && entry.category === 'BATCH');

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      entry.titleFa.toLowerCase().includes(q) ||
      entry.titleEn.toLowerCase().includes(q) ||
      entry.aesthetic.toLowerCase().includes(q) ||
      entry.techStack.some((t) => t.toLowerCase().includes(q)) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      entry.philosophy.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  const selectedEntry =
    AI_PLAYBOOK_ENTRIES.find((e) => e.id === selectedEntryId) ||
    (initialEntryId ? resolveEntry(initialEntryId) : filteredEntries[0]) ||
    AI_PLAYBOOK_ENTRIES[0];

  const handleCopyPrompt = (entry: PlaybookEntry) => {
    soundFx.playChime(950, 0.2);
    const textToCopy = `=== AI AGENT ARCHITECTURAL DIRECTIVE & IMPLEMENTATION PROMPT ===
MODULE: ${entry.titleEn} (${entry.titleFa})
AESTHETIC VIBE: ${entry.aesthetic}
TECH STACK: ${entry.techStack.join(', ')}

[DESIGN PHILOSOPHY & DNA]:
${entry.philosophy}

[MATHEMATICAL & PHYSICS SPECIFICATION]:
${entry.mathAndPhysics}

[AI CODE DIRECTIVE]:
${entry.aiPromptDirective}

[KEY INTERACTION MILESTONES]:
${entry.keyInteractiveElements.map((el) => `• ${el}`).join('\n')}
================================================================`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 font-['Plus_Jakarta_Sans']">
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#07090e] border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-amber-500 p-[1px] flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#090b10] rounded-[11px] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne'] font-black text-lg text-white">
                  {isFa ? 'دفترچه راهنمای جامع طراحی و پرامپت‌های هوش مصنوعی' : 'Master AI Agent Design Playbook & Prompt Manual'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
                  AI PROMPT SPEC v3.0
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                {isFa
                  ? 'دستورالعمل‌های دقیق مهندسی خلاقانه جهت ارجاع و ساخت مجدد المان‌ها توسط مدل‌های هوش مصنوعی بدون نیاز به دیدن تصویر'
                  : 'Exhaustive creative engineering directives, physics math & copyable prompts for AI agents'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick(500);
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="px-6 py-3 border-b border-white/10 bg-black/30 flex flex-wrap items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
            {[
              { id: 'ALL', label: isFa ? 'همه محتویات' : 'All Modules' },
              { id: 'PROJECTS', label: isFa ? 'پروژه‌های مستقل (Projects)' : 'Custom Projects' },
              { id: 'BATCHES', label: isFa ? 'دسته‌بندی‌های کاتالوگ (12 Batches)' : 'Showroom Batches' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick(600);
                  setActiveTab(tab.id as any);
                }}
                className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-400 text-black shadow-md font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFa ? 'جستجو در پرامپت‌ها، پشته فنی، سبک...' : 'Search prompts, math, stack...'}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-zinc-900/90 border border-white/10 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Main Split Layout: Left Index List, Right Detailed Documentation */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Index Sidebar (List of Entries) */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 bg-[#06080c] overflow-y-auto p-3 space-y-1.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-2 pb-1 block">
              {isFa ? `لیست ماژول‌ها (${filteredEntries.length})` : `Modules (${filteredEntries.length})`}
            </span>
            {filteredEntries.map((entry) => {
              const isSelected = selectedEntry?.id === entry.id;
              return (
                <button
                  key={entry.id}
                  onClick={() => {
                    soundFx.playClick(650);
                    setSelectedEntryId(entry.id);
                  }}
                  className={`w-full text-right p-3 rounded-2xl border transition-all text-xs flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400/60 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-white font-['Syne']">
                      {isFa ? entry.titleFa.split('—')[0] : entry.titleEn.split('—')[0]}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-mono text-[9px] ${
                        entry.category === 'PROJECT'
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : 'bg-indigo-400/20 text-indigo-300 border border-indigo-400/30'
                      }`}
                    >
                      {entry.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 truncate text-left font-mono">
                    {entry.aesthetic}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Content View: Comprehensive AI Blueprint */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#080a10]">
            {selectedEntry ? (
              <div className="space-y-6 max-w-4xl mx-auto">
                {/* Title & Badge Banner */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/50 via-zinc-950 to-indigo-950/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-400 text-black font-mono text-[10px] font-black uppercase">
                        {selectedEntry.id}
                      </span>
                      <span className="text-zinc-500 font-mono text-xs">|</span>
                      <span className="text-amber-400 font-mono text-xs font-semibold">
                        {selectedEntry.aesthetic}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white font-['Syne'] tracking-tight">
                      {isFa ? selectedEntry.titleFa : selectedEntry.titleEn}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      {isFa ? selectedEntry.titleEn : selectedEntry.titleFa}
                    </p>
                  </div>

                  {/* Copy Button */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleCopyPrompt(selectedEntry)}
                      className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
                        copiedId === selectedEntry.id
                          ? 'bg-emerald-400 text-black shadow-emerald-400/30'
                          : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black shadow-amber-400/20'
                      }`}
                    >
                      {copiedId === selectedEntry.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{isFa ? 'پرامپت کپی شد!' : 'Prompt Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>{isFa ? 'کپی پرامپت برای هوش مصنوعی' : 'Copy AI Prompt'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-zinc-500">پشته فنی و ابزارها:</span>
                  {selectedEntry.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Section 1: Philosophy & Aesthetic Intent */}
                <div className="p-5 rounded-2xl bg-[#0b0e14] border border-white/10 space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <Compass className="w-4 h-4" /> ۱. فلسفه طراحی و روانشناسی تعاملی (Design Philosophy)
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed font-['Vazirmatn']">
                    {selectedEntry.philosophy}
                  </p>
                </div>

                {/* Section 2: Math & Physics Formulation */}
                <div className="p-5 rounded-2xl bg-[#0b0e14] border border-white/10 space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Calculator className="w-4 h-4" /> ۲. مبانی ریاضی، معادلات فیزیک و شیدر (Math &amp; Physics Spec)
                  </span>
                  <p className="text-xs font-mono text-zinc-300 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/5">
                    {selectedEntry.mathAndPhysics}
                  </p>
                </div>

                {/* Section 3: AI Code Directive & Agent Prompt (The Hero Box) */}
                <div className="p-5 rounded-2xl bg-black/80 border border-emerald-500/40 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> ۳. دستورالعمل مهندسی برای ایجنت‌های هوش مصنوعی (AI Prompt Blueprint)
                    </span>
                    <button
                      onClick={() => handleCopyPrompt(selectedEntry)}
                      className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId === selectedEntry.id ? 'کپی شد!' : 'کپی این پرامپت'}</span>
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-emerald-300/95 leading-relaxed bg-[#040609] p-4 rounded-xl border border-emerald-500/20 overflow-x-auto whitespace-pre-wrap">
                    {selectedEntry.aiPromptDirective}
                  </pre>
                  <p className="text-[11px] font-mono text-zinc-400">
                    💡 <em>این پرامپت به گونه‌ای تنظیم شده که اگر در هر LLM یا ایجنت هوش مصنوعی (Claude, GPT, Gemini) قرار داده شود، بدون نیاز به دیدن المان می‌تواند کدی با بالاترین استاندارد کیفی خلق کند.</em>
                  </p>
                </div>

                {/* Section 4: Key Interactive Milestones */}
                <div className="p-5 rounded-2xl bg-[#0b0e14] border border-white/10 space-y-2.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> ۴. المان‌ها و فیچرهای کلیدی تعاملی (Key Interactions)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {selectedEntry.keyInteractiveElements.map((el, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-300 font-['Vazirmatn'] flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{el}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-black/60 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Awwwards-Tier Engineering Knowledge Matrix</span>
          <button
            onClick={() => {
              soundFx.playClick(500);
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white text-zinc-200 hover:text-black font-mono text-xs font-bold transition-all"
          >
            {isFa ? 'بستن دفترچه راهنما' : 'Close Playbook'}
          </button>
        </div>
      </div>
    </div>
  );
}
