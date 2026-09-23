import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { soundFx } from '../utils/audio';
import {
  Sparkles,
  Award,
  Globe,
  Users,
  Compass,
  CheckCircle2,
  Terminal,
  Zap,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useStore();
  const [selectedMilestone, setSelectedMilestone] = useState(3);

  const team = [
    {
      name: 'Dr. Valerius Vance',
      role: 'Founding Creative Technologist',
      bio: 'Former spatial graphics researcher at MIT Media Lab. Specializes in real-time GLSL raymarching and non-Euclidean UI topology.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Kaori Takahashi',
      role: 'Lead Spatial Audio Architect',
      bio: 'Pioneered Web Audio procedural synthesis and polyrhythmic binaural soundscapes for high-end automotive and luxury brands.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Julian Thorne',
      role: 'Principal Hardware & Industrial Engineer',
      bio: 'Lead engineer behind the CyberDeck MK-IV and AURA Vermeil Tourbillon. Expert in CNC 6061-T6 machining and tactile detent physics.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Elena Rostova',
      role: 'Design Director & Typography Master',
      bio: 'Awwwards Jury Member and editorial serif designer. Blends Renaissance calligraphic ligatures with neo-brutalist algorithmic skew.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const milestones = [
    {
      year: '2021',
      title: 'Studio Genesis & WebGL Research',
      desc: 'Founded in Tokyo as a boutique generative research lab experimenting with real-time browser shaders and audio oscillators.',
    },
    {
      year: '2023',
      title: 'First Awwwards Site of the Year',
      desc: 'Commissioned by European haute horology houses to build the worlds first browser-based mechanical tourbillon configurator.',
    },
    {
      year: '2024',
      title: 'Hardware Synthesis Division',
      desc: 'Expanded into physical computing with the launch of the CyberDeck tactile terminal and programmable USB-C haptic rotary encoders.',
    },
    {
      year: '2026',
      title: 'Vibe Matrix Architecture & Global Showroom',
      desc: 'Released the universal 55-component visual playbook, establishing an open standard for Awwwards-tier vibe coding and spatial web engineering.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#050609] text-zinc-100 font-['Plus_Jakarta_Sans'] pb-28">
      {/* Manifesto Hero */}
      <section className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>MANIFESTO // PHILOSOPHY &amp; PEDIGREE</span>
          </div>

          <h1 className="font-['Syne'] font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
            We reject the sterile, homogenous web.
          </h1>

          <p className="mt-6 text-zinc-300 text-lg sm:text-xl font-light leading-relaxed">
            The modern internet was reduced to cookie-cutter design systems and flat cards. AURA exists as a sanctuary for radical beauty, GPU-accelerated spatial physics, procedural acoustic resonance, and uncompromised craft.
          </p>
        </div>
      </section>

      {/* Historical Milestones Timeline */}
      <section className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest block mb-1">
              CHRONOLOGY 2021 &mdash; 2026
            </span>
            <h2 className="font-['Syne'] text-3xl sm:text-4xl font-bold text-white">
              Studio Evolution &amp; Milestones
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {milestones.map((m, idx) => (
            <div
              key={m.year}
              onClick={() => {
                soundFx.playClick(600 + idx * 80);
                setSelectedMilestone(idx);
              }}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                selectedMilestone === idx
                  ? 'bg-zinc-900 border-cyan-400 shadow-xl shadow-cyan-500/10'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <span className="font-mono text-2xl font-black text-cyan-400 block mb-2">
                {m.year}
              </span>
              <h3 className="font-['Syne'] font-bold text-base text-white mb-2">
                {m.title}
              </h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Roster */}
      <section className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="mb-12">
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block mb-1">
            COLLECTIVE LEADERSHIP
          </span>
          <h2 className="font-['Syne'] text-3xl sm:text-4xl font-bold text-white">
            Architects &amp; Technologists
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl bg-zinc-900/60 border border-white/15 overflow-hidden flex flex-col hover:border-cyan-400/50 transition-all group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-zinc-950">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-['Syne'] font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h4>
                  <span className="font-mono text-[11px] text-cyan-400 font-semibold block mt-0.5">
                    {member.role}
                  </span>
                  <p className="text-xs text-zinc-400 font-light mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition Grid */}
      <section className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/40 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest block mb-2">
              ACCOLADES &amp; CITATIONS
            </span>
            <h3 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white">
              Recognized by the World's Foremost Design Academies
            </h3>
            <p className="text-sm text-zinc-400 max-w-lg mt-2 font-light">
              Over 28 Site of the Day honors, 6 Developer of the Year nominations, and the Cannes Lion for Experimental Digital Interfaces.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <button
              onClick={() => {
                soundFx.playChime(750, 0.2);
                setActivePage('CONTACT');
              }}
              className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <span>Commission A Commission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
