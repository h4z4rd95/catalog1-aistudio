import React from 'react';
import { SITE_CONTENT } from '../../../content/site';
import { Pin, Quote, Sparkles } from 'lucide-react';
import { soundFx } from '../../../utils/audio';

export default function StudioTestimonialsPinboard() {
  const testimonials = SITE_CONTENT.testimonials;

  return (
    <section className="relative py-24 px-4 sm:px-8 bg-[#09090B] border-b border-[#202027] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202027] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Pin className="w-4 h-4 text-cyan-400 -rotate-45" />
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                05 // TESTIMONIALS PINBOARD (NOT A CAROUSEL)
              </span>
            </div>
            <h2 className="font-['Lalezar'] text-3xl sm:text-5xl text-white mt-1">
              تخته یادداشت کارفرمایان و شرکای استراتژیک
            </h2>
          </div>
          <span className="font-mono text-xs text-zinc-500">
            PINBOARD ARCHIVE // VERIFIED STORIES
          </span>
        </div>

        {/* Pinboard Grid with Deliberate Irregular Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => soundFx.playTick(750)}
              style={{
                transform: `rotate(${item.pinAngle}deg)`,
              }}
              className="relative p-8 rounded-3xl bg-[#111116] border border-[#202027] hover:border-cyan-400/50 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:rotate-0 hover:z-20 group"
            >
              {/* Thumbtack Pin Visual at Top Center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-400 border border-white/40 shadow-lg shadow-cyan-500/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              {/* Tape Effect on Top Right */}
              <div className="absolute -top-2.5 right-6 px-3 py-0.5 rounded bg-white/10 text-[9px] font-mono text-zinc-400 uppercase tracking-widest border border-white/5 backdrop-blur-sm -rotate-3">
                {item.highlightTag}
              </div>

              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-violet-500/30 mb-4" />

              {/* Quote Content */}
              <p className="font-['Vazirmatn'] text-sm text-zinc-200 leading-relaxed font-light mb-6">
                «{item.quote}»
              </p>

              {/* Client Info & Metric */}
              <div className="pt-4 border-t border-[#202027] space-y-2">
                <div className="flex justify-between items-baseline">
                  <div>
                    <h4 className="font-['Lalezar'] text-lg text-white">
                      {item.name}
                    </h4>
                    <span className="font-['Vazirmatn'] text-xs text-zinc-400 block font-light">
                      {item.role} &bull; {item.company}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 rounded-xl bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 font-mono text-[11px] font-bold">
                    {item.metric}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
