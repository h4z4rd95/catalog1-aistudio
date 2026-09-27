import React, { useState } from 'react';
import { SITE_CONTENT, FaqItem } from '../../../content/site';
import { soundFx } from '../../../utils/audio';
import { ChevronDown, HelpCircle, FileText } from 'lucide-react';

export default function StudioFaqRuledIndex() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = SITE_CONTENT.faqs;

  const toggleFaq = (idx: number) => {
    soundFx.playClick(650);
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="relative py-24 px-4 sm:px-8 bg-[#09090B] border-b border-[#202027] overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202027] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                06 // RULED INDEX (FAQ DOCUMENT)
              </span>
            </div>
            <h2 className="font-['Lalezar'] text-3xl sm:text-5xl text-white mt-1">
              ایندکس پرسش‌ها و مستندات فنی استودیو
            </h2>
          </div>
          <span className="font-mono text-xs text-zinc-500">
            TECHNICAL DOCUMENT INDEX // 01..05
          </span>
        </div>

        {/* Ruled Index List (Not accordion chrome) */}
        <div className="divide-y divide-[#202027] border-y border-[#202027]">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.number}
                onClick={() => toggleFaq(idx)}
                className={`py-6 transition-colors cursor-pointer group ${
                  isOpen ? 'bg-[#111116]/40' : 'hover:bg-[#111116]/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4 px-2 sm:px-4">
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Index Number */}
                    <span className="font-mono text-base sm:text-lg text-cyan-400 font-bold shrink-0 mt-0.5">
                      {faq.number}
                    </span>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-['Lalezar'] text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors">
                          {faq.question}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#17171D] border border-[#202027] text-[10px] font-mono text-zinc-400">
                          {faq.tag}
                        </span>
                      </div>

                      {isOpen && (
                        <p className="font-['Vazirmatn'] text-sm text-zinc-300 leading-relaxed font-light pt-2 max-w-3xl animate-in fade-in duration-200">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  </div>

                  <span
                    className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-white transition-transform ${
                      isOpen ? 'rotate-180 bg-cyan-400 text-black border-cyan-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
