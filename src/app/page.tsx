"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Monitor,
  ShieldCheck,
} from "lucide-react";

export default function DesignPortal() {
  const templates = [
    {
      id: "demo1",
      title: "1. Premium Parallax Showcase",
      subtitle: "Snap-Scroll Parallax SPA",
      description:
        "A premium, fully snap-scrollable experience with dual light/dark modes, smooth scroll parallax, 3D card tilt physics, and responsive grids — engineered for maximum conversion.",
      path: "/demo1",
      badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      btnColor: "bg-violet-600 hover:bg-violet-700 text-white font-extrabold",
      glowColor: "from-violet-600/20 via-transparent to-transparent",
      icon: <Sparkles className="w-6 h-6 text-violet-400" />,
      features: [
        "Full-page desktop snap scroll",
        "Dual Light / Dark premium toggles",
        "Scroll and mouse-hover parallax",
        "Live diagnostic postcode checker",
      ],
    },
    {
      id: "demo2",
      title: "2. Dynamic Multipage Showcase",
      subtitle: "Professional Multipage Portal",
      description:
        "An elite multipage template featuring a charcoal & orange theme, full subpage navigation, keyword-matching dynamic brand logos, and an interactive live Quote Builder widget.",
      path: "/demo2",
      badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      btnColor: "bg-orange-600 hover:bg-orange-700 text-white font-extrabold",
      glowColor: "from-orange-600/20 via-transparent to-transparent",
      icon: <Layers className="w-6 h-6 text-orange-400" />,
      features: [
        "Multipage layout (Home / About / Services)",
        "Brand URL routing persistence",
        "Dynamic keyword-matching icons",
        "Interactive live Quote Builder Widget",
      ],
    },
    {
      id: "demo3",
      title: "3. Interactive Luxury Showcase",
      subtitle: "Sticky Glassmorphic & Parallax Portal",
      description:
        "A luxury, state-of-the-art landing page template featuring a dynamic floating interactive background, smooth scroll depth-of-field parallax scrolling, and an integrated theme toggle.",
      path: "/demo3",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      btnColor: "bg-blue-600 hover:bg-blue-700 text-white font-extrabold",
      glowColor: "from-blue-600/20 via-transparent to-transparent",
      icon: <Monitor className="w-6 h-6 text-blue-400" />,
      features: [
        "Root level glassmorphic sticky navbar",
        "Continuous floating & interactive background",
        "Viewport-relative smooth parallax scroll",
        "Integrated dynamic dark/light theme switch",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased relative overflow-hidden">

      {/* Background ambient glow */}
      <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-violet-600/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] bg-orange-600/6 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10 flex flex-col items-center justify-center w-full">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-extrabold uppercase tracking-wider mb-6 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase & Selection Dashboard</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            UK Plumber Website{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-orange-400">
              Templates
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto">
            Three distinct, premium-grade website templates — all fully responsive, SEO-ready, and built for real UK plumbing businesses.
          </p>
        </div>

        {/* Template Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="relative bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-7 sm:p-9 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 group hover:-translate-y-1.5 shadow-2xl overflow-hidden"
            >
              {/* Card inner glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tpl.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-7">
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    {tpl.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${tpl.badgeColor}`}>
                    {tpl.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-slate-100 transition-colors leading-snug">
                  {tpl.title}
                </h3>

                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  {tpl.description}
                </p>

                <ul className="mt-7 space-y-3">
                  {tpl.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-9 pt-6 border-t border-slate-800/80">
                <Link
                  href={tpl.path}
                  className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] ${tpl.btnColor}`}
                >
                  <span>Preview Template</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Badges */}
        <div className="mt-20 bg-slate-900/30 rounded-2xl p-7 border border-slate-900 w-full max-w-3xl text-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
            Core Specifications Across All Templates
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-300">
            <div className="flex flex-col items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span className="font-bold">Next.js Speed</span>
              <span className="text-[10px] text-slate-500">0.4s Mobile Load</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              <span className="font-bold">Tailwind v4 CSS</span>
              <span className="text-[10px] text-slate-500">Fully Responsive</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-400" />
              <span className="font-bold">100/100 Vitals</span>
              <span className="text-[10px] text-slate-500">Zero Layout Shifts</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Monitor className="w-5 h-5 text-amber-400" />
              <span className="font-bold">SEO Ready</span>
              <span className="text-[10px] text-slate-500">Schema & Metadata</span>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 text-center text-xs text-slate-600 border-t border-slate-900 relative z-10">
        <p>&copy; {new Date().getFullYear()} Plumbing Template Showcase. Fully typed TypeScript components.</p>
      </footer>

    </div>
  );
}
