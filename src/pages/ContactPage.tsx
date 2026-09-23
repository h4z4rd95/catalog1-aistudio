import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { soundFx } from '../utils/audio';
import {
  Mail,
  Send,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Phone,
  MessageSquare,
  Globe
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceTier: 'SPATIAL_WEBGL',
    budget: '$50,000 - $100,000',
    timeline: 'Q3 2026',
    dateSlot: '2026-09-28',
    timeSlot: '14:00 GMT',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime(880, 0.3);
    setSubmitted(true);
  };

  const resetForm = () => {
    soundFx.playClick(500);
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      serviceTier: 'SPATIAL_WEBGL',
      budget: '$50,000 - $100,000',
      timeline: 'Q3 2026',
      dateSlot: '2026-09-28',
      timeSlot: '14:00 GMT',
      message: '',
    });
  };

  const offices = [
    { city: 'Tokyo Studio', address: '5-7-2 Minami-Aoyama, Minato-ku', contact: '+81 3 5555 0192', tz: 'JST (UTC+9)' },
    { city: 'New York Atelier', address: '740 Broadway, 12th Floor, NoHo', contact: '+1 212 555 0148', tz: 'EST (UTC-5)' },
    { city: 'London Office', address: '18 Shoreditch High St, EC1 6PG', contact: '+44 20 7946 0912', tz: 'BST (UTC+1)' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#050609] text-zinc-100 font-['Plus_Jakarta_Sans'] pb-28">
      {/* Header Banner */}
      <div className="w-full bg-gradient-to-b from-[#0a0d14] to-[#050609] border-b border-white/10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
            <Mail className="w-3.5 h-3.5" />
            <span>COMMISSION PROTOCOL // INQUIRY DOSSIER</span>
          </div>
          <h1 className="font-['Syne'] font-black text-3xl sm:text-5xl text-white tracking-tight">
            Initiate Engagement
          </h1>
          <p className="font-light text-zinc-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Reserve architectural studio sprints, request custom hardware fabrications, or schedule a spatial engineering consultation.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Interactive Form Dossier */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-zinc-900/60 border border-white/15 backdrop-blur-md shadow-2xl">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-400/20 border border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-['Syne'] font-black text-2xl text-white">
                    Transmission Established
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Your brief has been logged into our studio triage ledger. Our partner team will review your timeline and confirm calendar slots within 24 hours.
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase mt-4"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-['Syne'] font-bold text-lg text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Project Coordinates &amp; Schedule</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div>
                      <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Cassandra Stone"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="cassandra@luxury-brand.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                        Organization / Venture
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Atelier & Co"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                        Engagement Discipline
                      </label>
                      <select
                        value={formData.serviceTier}
                        onChange={(e) => setFormData({ ...formData, serviceTier: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                      >
                        <option value="SPATIAL_WEBGL">Spatial WebGL &amp; 3D Configurator</option>
                        <option value="DESIGN_SYSTEM">Awwwards-Tier Design System</option>
                        <option value="HARDWARE_COMPUTING">Physical Computing &amp; Cyberdeck</option>
                        <option value="PROCEDURAL_AUDIO">Procedural Soundscape &amp; Haptics</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                        Target Capital Allocation
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                      >
                        <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                        <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                        <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                        <option value="$250,000+">$250,000+ (Enterprise Retainer)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                        Preferred Consultation Slot
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="date"
                          value={formData.dateSlot}
                          onChange={(e) => setFormData({ ...formData, dateSlot: e.target.value })}
                          className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
                        />
                        <select
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                          className="px-2 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs cursor-pointer"
                        >
                          <option value="10:00 GMT">10:00 GMT</option>
                          <option value="14:00 GMT">14:00 GMT</option>
                          <option value="18:00 GMT">18:00 GMT</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                        Project Overview &amp; Specifications
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your requirements, desired aesthetic, and technological constraints..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20"
                  >
                    <span>Transmit Project Dossier</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Global Locations & Direct Comms */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/15 space-y-6">
              <h4 className="font-['Syne'] font-bold text-lg text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Global Studio Coordinates</span>
              </h4>

              <div className="space-y-4 font-mono text-xs">
                {offices.map((office) => (
                  <div key={office.city} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-sm font-['Syne']">{office.city}</strong>
                      <span className="text-cyan-400 text-[10px]">{office.tz}</span>
                    </div>
                    <p className="text-zinc-400 text-[11px]">{office.address}</p>
                    <p className="text-zinc-500 text-[11px] pt-1">{office.contact}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-cyan-950/20 border border-cyan-400/30 font-mono text-xs space-y-2 text-zinc-300">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <MessageSquare className="w-4 h-4" />
                <span>Direct Cryptographic Channels</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                For confidential inquiries requiring PGP encryption or private NDA agreements prior to briefing, transmit directly to <strong className="text-white">atelier@vibe-matrix.io</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
