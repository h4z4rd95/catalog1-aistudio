import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Command, ArrowRight, Layers, Sparkles, X, Tag, Cpu, Eye } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export interface CatalogSearchItem {
  id: string;
  label: string;
  name: string;
  batch: string;
  batchName: string;
  aesthetic: string;
  techStack: string[];
  description: string;
}

interface OmniSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectComponent: (id: string) => void;
  items: CatalogSearchItem[];
}

export default function OmniSearchModal({
  isOpen,
  onClose,
  onSelectComponent,
  items,
}: OmniSearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Focus on mount & Reset
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Filter items based on query & active filter
  const filteredItems = useMemo(() => {
    let result = items;

    if (activeFilter !== 'ALL') {
      result = result.filter(
        (item) =>
          item.batch === activeFilter ||
          item.aesthetic === activeFilter ||
          (activeFilter === 'WEBGL' && item.techStack.some((t) => t.toLowerCase().includes('webgl') || t.toLowerCase().includes('three.js')))
      );
    }

    if (!query.trim()) return result;

    const q = query.toLowerCase().trim();
    return result.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.label.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.batchName.toLowerCase().includes(q) ||
        item.aesthetic.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.techStack.some((tech) => tech.toLowerCase().includes(q))
    );
  }, [items, query, activeFilter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        soundFx.playClick(500);
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundFx.playClick(750, 0.02);
        setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundFx.playClick(850, 0.02);
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          soundFx.playChime(1000, 0.3);
          onSelectComponent(filteredItems[selectedIndex].id);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, onSelectComponent]);

  // Ensure active index is within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeFilter]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search all 40 catalog variations"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md transition-all animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFx.playClick(500);
          onClose();
        }
      }}
    >
      <div className="w-full max-w-3xl bg-[#090b10] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh] font-sans text-zinc-100 ring-1 ring-white/10">
        {/* Search Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-gradient-to-r from-[#0d1017] to-[#0a0c12] flex items-center gap-3 relative">
          <Search className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search 40 variations, e.g. 'Three.js', 'Lorenz', 'Cinzel', 'G01', 'GLSL'..."
            className="w-full bg-transparent border-none outline-none font-mono text-sm sm:text-base text-white placeholder:text-zinc-500 placeholder:font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400">
            <kbd>ESC</kbd> <span>to exit</span>
          </div>
        </div>

        {/* Quick Filter Tag Bar */}
        <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px] font-mono">
          <span className="text-zinc-500 shrink-0">FILTER:</span>
          {[
            { id: 'ALL', label: 'All 40' },
            { id: 'BATCH_8', label: 'Batch 8 (Generative)' },
            { id: 'BATCH_7', label: 'Batch 7 (Products)' },
            { id: 'BATCH_6', label: 'Batch 6 (Dashboards)' },
            { id: 'BATCH_1', label: 'Batch 1 (Heroes)' },
            { id: 'WEBGL', label: 'WebGL 3D' },
            { id: 'CYBERPUNK', label: 'Cyberpunk' },
            { id: 'LUXURY_EDITORIAL', label: 'Luxury' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                soundFx.playClick(700);
                setActiveFilter(f.id);
              }}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all border ${
                activeFilter === f.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results List View */}
        <div ref={listRef} className="overflow-y-auto divide-y divide-white/5 p-2 flex-1 scrollbar-thin">
          {filteredItems.length === 0 ? (
            <div className="py-16 px-4 text-center">
              <Sparkles className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
              <p className="font-mono text-sm text-zinc-400">
                No variations matched &ldquo;<span className="text-cyan-400">{query}</span>&rdquo;
              </p>
              <p className="font-mono text-xs text-zinc-600 mt-1">
                Try searching for &lsquo;Lorenz&rsquo;, &lsquo;GLSL&rsquo;, &lsquo;Physics&rsquo;, &lsquo;Watch&rsquo;, or &lsquo;ASCII&rsquo;.
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    soundFx.playChime(1000, 0.3);
                    onSelectComponent(item.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-cyan-950/40 border border-cyan-500/40 text-white shadow-lg'
                      : 'hover:bg-white/5 text-zinc-300 border border-transparent'
                  }`}
                  data-cursor="hover"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {item.label}
                      </span>
                      <span className="font-mono text-[11px] text-zinc-400">
                        {item.batchName}
                      </span>
                      <span className="px-1.5 py-0.2 rounded font-mono text-[10px] bg-white/5 text-zinc-400 border border-white/10">
                        {item.aesthetic}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
                      <span>{item.name}</span>
                    </h4>

                    <p className="text-xs text-zinc-400 line-clamp-1 font-light">
                      {item.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-900/80 border border-white/10 text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Jump Action */}
                  <div className="flex items-center gap-1 shrink-0 self-center">
                    <span
                      className={`text-xs font-mono font-bold flex items-center gap-1 transition-transform ${
                        isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-zinc-600'
                      }`}
                    >
                      <span className="hidden sm:inline">JUMP</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer Hotkeys */}
        <div className="p-3 bg-[#07080c] border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300">↑</kbd>
              <kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300">↓</kbd>
              <span>navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300">↵</kbd>
              <span>jump</span>
            </span>
          </div>

          <div className="text-right">
            <span>
              Showing <strong className="text-cyan-400 font-bold">{filteredItems.length}</strong> of 40 Variations
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
