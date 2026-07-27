"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Flame,
  Droplet,
  Wrench,
  ShieldCheck,
  Star,
  Activity,
  Award,
  ChevronRight,
  Clock,
  ThumbsUp,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Users,
  Check,
  Briefcase,
  Mail,
  User,
  Calculator
} from "lucide-react";
import { useTheme } from "./layout-client";

// ==========================================
// BUSINESS CONFIGURATION VARIABLES
// ==========================================
const CONTACT_PHONE = "020 7946 0990";
const CONTACT_PHONE_RAW = "+442079460990";
const CONTACT_EMAIL = "elite@flowmax-plumbing.co.uk";
const GAS_SAFE_REG = "883921";
const OFFICE_ADDRESS = "Suite 500, High Street, London W1U 8BH";

interface BookingForm {
  name: string;
  phone: string;
  postcode: string;
  details: string;
}

// ==========================================
// MAIN MULTIPAGE PORTAL ROUTER
// ==========================================
export default function Demo2Portal() {
  const { isDarkMode } = useTheme();
  const params = useParams();
  const brandParam = params?.brandName; // string[] | undefined

  // Parse dynamic routing segments
  let brandSlug: string | undefined = undefined;
  let pageName = "home";

  if (Array.isArray(brandParam)) {
    if (brandParam.length === 1) {
      const p1 = brandParam[0];
      if (["about", "services", "projects", "blog", "contact"].includes(p1)) {
        pageName = p1;
      } else {
        brandSlug = p1;
      }
    } else if (brandParam.length >= 2) {
      brandSlug = brandParam[0];
      pageName = brandParam[1];
    }
  }

  // Format brand name from URL slug
  const formatBrandName = (slug: string | undefined) => {
    if (!slug) return "Aquafix";
    return decodeURIComponent(slug)
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const BRAND_NAME = formatBrandName(brandSlug);

  // Dynamic Routing Switcher with global animation injection
  return (
    <div className="w-full flex flex-col">
      {(() => {
        switch (pageName) {
          case "about":
            return <Demo2About brandName={BRAND_NAME} isDarkMode={isDarkMode} brandSlug={brandSlug} />;
          case "services":
            return <Demo2Services brandName={BRAND_NAME} isDarkMode={isDarkMode} brandSlug={brandSlug} />;
          case "projects":
            return <Demo2Projects brandName={BRAND_NAME} isDarkMode={isDarkMode} brandSlug={brandSlug} />;
          // case "blog":
          //   return <Demo2Blog brandName={BRAND_NAME} isDarkMode={isDarkMode} brandSlug={brandSlug} />;
          case "contact":
            return <Demo2Contact brandName={BRAND_NAME} isDarkMode={isDarkMode} brandSlug={brandSlug} />;
          default:
            return <Demo2Home brandName={BRAND_NAME} isDarkMode={isDarkMode} brandSlug={brandSlug} />;
        }
      })()}

      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          opacity: 0;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
      `}</style>
    </div>
  );
}

// ==========================================
// 1. HOME VIEW COMPONENT
// ==========================================
function Demo2Home({ brandName, isDarkMode, brandSlug }: { brandName: string; isDarkMode: boolean; brandSlug: string | undefined }) {
  const linkPrefix = brandSlug ? `/demo2/${brandSlug}` : "/demo2";

  return (
    <div className="w-full flex flex-col">
      {/* HERO SECTION */}
      <section className={`py-12 md:py-24 transition-colors duration-300 ${isDarkMode ? "bg-[#0b0e14]" : "bg-[#fcfbf9]"
        }`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col justify-center animate-slide-up delay-100">
            {/* Trusted Experts Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold w-fit mb-6 border ${isDarkMode
              ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
              : "bg-orange-50 border-orange-200 text-orange-700"
              }`}>
              <ShieldCheck className="w-4.5 h-4.5" />
              <span>Trusted Plumbing Experts</span>
            </div>

            {/* Headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.08] ${isDarkMode ? "text-white" : "text-slate-900"
              }`}>
              FAST, RELIABLE PLUMBING DONE RIGHT THE FIRST TIME
            </h1>

            {/* Description */}
            <p className={`mt-6 text-sm sm:text-base leading-relaxed font-semibold max-w-xl ${isDarkMode ? "text-slate-400" : "text-slate-655"
              }`}>
              From emergency repairs to full system installs, {brandName} delivers professional plumbing solutions across the USA.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
              <Link
                href={`${linkPrefix}/contact`}
                className="bg-orange-600 hover:bg-orange-555 active:scale-98 px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-white text-center shadow-lg shadow-orange-950/15 transition-all duration-200"
              >
                Request a Free Quote
              </Link>
              <a
                href={`tel:${CONTACT_PHONE_RAW}`}
                className={`px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-center border transition-all duration-250 flex items-center justify-center gap-2 ${isDarkMode
                  ? "bg-[#161c28] border-slate-800 text-slate-200 hover:bg-slate-800"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
                  }`}
              >
                <Phone className="w-4 h-4 text-orange-550" />
                <span>Call {CONTACT_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Right Column photo */}
          <div className="lg:col-span-6 relative flex justify-center animate-slide-up delay-300">
            <div className={`relative w-full max-w-[480px] aspect-[4/3.1] rounded-3xl overflow-hidden border shadow-2xl p-2 group ${isDarkMode ? "bg-[#111622] border-slate-800" : "bg-white border-slate-200"
              }`}>
              <Image
                src="/hero-plumber.png"
                alt="Plumber working under kitchen sink"
                height={800}
                width={900}
                className="object-cover rounded-2xl h-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute top-6 right-6 backdrop-blur-md px-3 py-1.5 rounded-xl border flex items-center gap-2 bg-[#06080d]/80 border-slate-800/40 text-white text-[10px] font-black uppercase tracking-wider z-10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                <span>Active Dispatch</span>
              </div>
            </div>
            <div className={`absolute -inset-4 rounded-full filter blur-2xl -z-10 transition-colors duration-500 ${isDarkMode ? "bg-orange-500/5" : "bg-orange-500/3"
              }`} />
          </div>
        </div>
      </section>

      {/* STATISTICS ROW */}
      <section className={`py-12 border-y transition-colors duration-300 ${isDarkMode ? "bg-[#070a0f] border-slate-900" : "bg-[#f5f2eb] border-slate-200"
        }`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {[
            {
              icon: <Star className="w-5 h-5 text-orange-505" />,
              title: "5-Star Rated",
              desc: "Hundreds of happy customers across the USA"
            },
            {
              icon: <Award className="w-5 h-5 text-orange-505" />,
              title: "Licensed & Insured",
              desc: "Fully certified for residential & commercial plumbing"
            },
            {
              icon: <Clock className="w-5 h-5 text-orange-505" />,
              title: "24/7 Emergency Service",
              desc: "Fast response - anytime, day or night"
            },
            {
              icon: <ThumbsUp className="w-5 h-5 text-orange-505" />,
              title: "15+ Years Experience",
              desc: "Skilled technicians you can rely on"
            }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-300 animate-slide-up ${idx === 0 ? "delay-100" : idx === 1 ? "delay-200" : idx === 2 ? "delay-300" : "delay-400"
                } ${isDarkMode
                  ? "bg-[#111622]/40 border-slate-850/50 hover:bg-[#111622]"
                  : "bg-white border-slate-200/80 hover:bg-white hover:shadow-md"
                }`}
            >
              <div className="flex gap-4 items-start">
                <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-slate-900" : "bg-orange-50"}`}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className={`text-base font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {stat.title}
                  </h3>
                  <p className={`mt-1.5 text-xs font-semibold leading-relaxed ${isDarkMode ? "text-slate-455" : "text-slate-500"}`}>
                    {stat.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className={`py-16 md:py-24 transition-colors duration-300 ${isDarkMode ? "bg-[#0b0e14]" : "bg-[#fcfbf9]"
        }`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative flex justify-center animate-slide-up delay-100">
            <div className={`relative w-full max-w-[390px] aspect-[4/5] rounded-3xl overflow-hidden border shadow-xl ${isDarkMode ? "border-slate-800 bg-[#111622]" : "border-slate-200 bg-white"
              }`}>
              <Image
                src="/plumber-worker.png"
                alt="Smiling professional plumber thumb up"
                fill
                sizes="(max-width: 768px) 100vw, 390px"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none z-10" />
            </div>
            <div className="absolute top-10 -left-4 p-4 rounded-2xl border shadow-xl bg-orange-600 text-white max-w-[210px] hidden sm:block">
              <span className="text-2xl font-black block">100%</span>
              <span className="text-[10px] font-black uppercase tracking-wider block mt-1">Satisfaction Guarantee</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col animate-slide-up delay-300">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold w-fit mb-6 border ${isDarkMode
              ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
              : "bg-orange-50 border-orange-200 text-orange-700"
              }`}>
              <CheckCircle2 className="w-4.5 h-4.5" />
              <span>Why Choose Us</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight leading-tight ${isDarkMode ? "text-white" : "text-slate-900"
              }`}>
              THE PLUMBING PARTNER YOU CAN RELY ON
            </h2>
            <p className={`mt-4 text-sm sm:text-base font-semibold leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
              With {brandName}, you're choosing expertise, speed, and guaranteed satisfaction &mdash; every time.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  title: "Licensed & Trusted Professionals",
                  desc: "Your plumbing is handled by certified, background-checked technicians."
                },
                {
                  title: "Fast & Reliable Service",
                  desc: "We respond quickly and arrive fully equipped to fix it right the first time."
                },
                {
                  title: "Upfront & Honest Pricing",
                  desc: "No hidden fees &mdash; just clear, transparent estimates before any work begins."
                }
              ].map((feat, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border flex gap-4 items-start transition-all duration-300 ${isDarkMode
                    ? "bg-[#111622]/30 border-slate-850/60 hover:border-slate-800"
                    : "bg-white border-slate-200/80 shadow-sm"
                    }`}
                >
                  <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg shrink-0">
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className={`text-sm sm:text-base font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      {feat.title}
                    </h4>
                    <p className={`text-xs sm:text-sm mt-1 leading-relaxed font-semibold ${isDarkMode ? "text-slate-450" : "text-slate-500"
                      }`}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE SOLUTIONS */}
      <section className={`py-16 md:py-24 transition-colors duration-300 border-t ${isDarkMode ? "bg-[#070a0f] border-slate-900" : "bg-[#f5f2eb] border-slate-200"
        }`}>
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-slide-up delay-100">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold w-fit mb-5 border ${isDarkMode
              ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
              : "bg-orange-50 border-orange-200 text-orange-700"
              }`}>
              <Wrench className="w-4.5 h-4.5" />
              <span>What We Offer</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight mt-1 ${isDarkMode ? "text-white" : "text-slate-900"
              }`}>
              FULL-SERVICE PLUMBING SOLUTIONS
            </h2>
            <p className={`mt-4 text-sm sm:text-base font-semibold leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
              From leaks to installations, {brandName} is your one-stop solution for fast, expert plumbing across the USA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                img: "/boiler-installation.png",
                title: "Boiler Installation",
                desc: "High-efficiency systems designed to optimize energy consumption."
              },
              {
                img: "/pipe-repair.png",
                title: "Emergency Pipe Repair",
                desc: "Thermal leak detections that locate bursts behind drywall instantly."
              },
              {
                img: "/furniture.png",
                title: "Fixture Upgrades",
                desc: "Fitting premium taps, baths, and waste-pipes with flush-security."
              },
              {
                img: "/support-bg.png",
                title: "Toilet Maintenance",
                desc: "Clearing blockages, sealing leaks, and rebuilding syphon mechanisms."
              },
              {
                img: "/testemonial-bg.png",
                title: "Drain Jetting",
                desc: "High-pressure clearing of grease, roots, and blockages in main lines."
              },
              {
                img: "/plumber-worker.png",
                title: "Commercial Contracting",
                desc: "Plant room audits and scheduled inspections issuing digital sign-offs."
              }
            ].map((sol, idx) => (
              <div
                key={idx}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 shadow-md group relative aspect-[1.25] flex flex-col justify-end p-6 animate-slide-up ${idx === 0 ? "delay-100" : idx === 1 ? "delay-200" : idx === 2 ? "delay-300" : idx === 3 ? "delay-400" : idx === 4 ? "delay-500" : "delay-600"
                  } ${isDarkMode ? "border-slate-850 bg-[#111622]" : "border-slate-200 bg-white"
                  }`}
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={sol.img}
                    alt={sol.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover object-center transition-transform duration-750 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#090c10]/65 transition-opacity duration-300 group-hover:bg-[#090c10]/70 z-10" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {sol.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-slate-300 leading-relaxed">
                    {sol.desc}
                  </p>
                  <Link
                    href={`${linkPrefix}/services`}
                    className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-orange-400 mt-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  >
                    <span>Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// 2. ABOUT VIEW COMPONENT
// ==========================================
function Demo2About({ brandName, isDarkMode, brandSlug }: { brandName: string; isDarkMode: boolean; brandSlug: string | undefined }) {
  return (
    <div className={`py-16 md:py-24 transition-colors duration-300 ${isDarkMode ? "bg-[#0b0e14]" : "bg-[#fcfbf9]"
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-slide-up">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold w-fit mb-5 border ${isDarkMode
            ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
            : "bg-orange-50 border-orange-200 text-orange-700"
            }`}>
            <Users className="w-4.5 h-4.5" />
            <span>Our Heritage</span>
          </div>
          <h1 className={`text-4xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            ABOUT {brandName.toUpperCase()}
          </h1>
          <p className={`mt-4 text-sm sm:text-base font-semibold leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}>
            Redefining trade service parameters with advanced engineering, upfront transparency, and certified local technicians.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 flex flex-col justify-center animate-slide-up delay-100">
            <h2 className={`text-2xl sm:text-3xl font-black mb-6 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              A Decade of Certified Professional Care
            </h2>
            <p className={`text-sm sm:text-base font-semibold leading-relaxed mb-6 ${isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
              Founded in 2011, {brandName} established its reputation by tackling complex diagnostic failures that conventional plumbers turned away. By incorporating thermal imaging, acoustic sound-testing, and pressure tracking, we transformed standard leak detection and boiler management.
            </p>
            <p className={`text-sm font-semibold leading-relaxed ${isDarkMode ? "text-slate-450" : "text-slate-500"
              }`}>
              Today, we serve residential properties and commercial facilities nationwide, retaining a commitment to transparent rates and guaranteed workmanship.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="space-y-6">
              {[
                { year: "2011", title: "Corporate Genesis", desc: "Launched as a single-van boiler repair outfit in the suburbs, committed to certified Gas Safe works." },
                { year: "2016", title: "Diagnostic Upgrades", desc: "Acquired advanced thermal leak sensors and acoustic sound-trackers, eliminating dry-wall cutting guesswork." },
                { year: "2021", title: "National Expansion", desc: "Opened multiple dispatch depots across residential areas, upgrading service SLA to 1-hour emergency guarantees." }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border flex gap-6 items-start transition-all duration-300 animate-slide-up ${idx === 0 ? "delay-200" : idx === 1 ? "delay-300" : "delay-400"
                    } ${isDarkMode
                      ? "bg-[#111622]/40 border-slate-850 hover:bg-[#111622]"
                      : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                    }`}
                >
                  <div className="px-3.5 py-1.5 bg-orange-500/10 text-orange-505 rounded-lg text-sm font-black shrink-0">
                    {item.year}
                  </div>
                  <div>
                    <h4 className={`text-sm sm:text-base font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      {item.title}
                    </h4>
                    <p className={`text-xs sm:text-sm mt-1 leading-relaxed font-semibold ${isDarkMode ? "text-slate-455" : "text-slate-500"
                      }`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TEAM GRID */}
        <div className="border-t pt-16 border-slate-800/10">
          <div className="text-center max-w-xl mx-auto mb-16 animate-slide-up delay-100">
            <h2 className={`text-2xl sm:text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Meet Our Certified Specialists
            </h2>
            <p className={`mt-3 text-xs sm:text-sm font-semibold ${isDarkMode ? "text-slate-455" : "text-slate-500"}`}>
              Every technician is Gas Safe registered, background checked, and receives ongoing training in smart-home heating integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Marcus Aurelius",
                role: "Senior Heating Engineer",
                img: "/avatar1.png",
                cert: "Gas Safe Master #9948"
              },
              {
                name: "Sarah Jenkins",
                role: "Lead Diagnostic Technician",
                img: "/avatar2.png",
                cert: "Acoustic Leak certified"
              },
              {
                name: "Dimitri Sokolov",
                role: "Emergency Dispatch Lead",
                img: "/avatar3.png",
                cert: "OSHA & SLA Coordinator"
              },
              {
                name: "Thomas Miller",
                role: "Premium Fixture Installer",
                img: "/avatar4.png",
                cert: "City & Guilds Level 3"
              }
            ].map((member, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border flex flex-col items-center text-center transition-all duration-300 animate-slide-up ${idx === 0 ? "delay-100" : idx === 1 ? "delay-200" : idx === 2 ? "delay-300" : "delay-400"
                  } ${isDarkMode
                    ? "bg-[#111622] border-slate-850 hover:border-slate-800"
                    : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                  }`}
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="rounded-full h-32 w-32 object-cover border-2 border-orange-500 shadow-md"
                />
                <h3 className={`text-base font-black mt-5 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  {member.name}
                </h3>
                <span className="text-xs font-bold text-orange-500 block mt-0.5">
                  {member.role}
                </span>
                <span className={`text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full mt-4 border ${isDarkMode
                  ? "bg-slate-900 border-slate-800 text-slate-400"
                  : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}>
                  {member.cert}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. SERVICES VIEW COMPONENT
// ==========================================
function Demo2Services({ brandName, isDarkMode, brandSlug }: { brandName: string; isDarkMode: boolean; brandSlug: string | undefined }) {
  const linkPrefix = brandSlug ? `/demo2/${brandSlug}` : "/demo2";
  const [selectedSymptom, setSelectedSymptom] = useState<number>(0);

  const symptoms = [
    {
      id: 0,
      symptom: "Radiators are cold at the top or making clanking noises",
      cause: "Air pockets trapped inside radiator tubes or core iron sludge blocking flow.",
      solution: "Radiator bleeding or system-wide chemical Powerflush.",
      time: "1 - 2.5 Hours",
      serviceQuery: "powerflush"
    },
    {
      id: 1,
      symptom: "Water heater is dripping or water is tepid",
      cause: "Heating element calcification, sediment accumulation, or failing relief valve.",
      solution: "Element replacement, tank flushing, or pressure-valve fitting.",
      time: "1 - 2 Hours",
      serviceQuery: "boiler-install"
    },
    {
      id: 2,
      symptom: "Low flow pressure in showers and basin taps",
      cause: "Corroded internal pipework, scale blockage, or a faulty main reducing valve.",
      solution: "Main pressure-reducing valve adjustment or pipework renewal.",
      time: "2 - 4 Hours",
      serviceQuery: "emergency-repair"
    },
    {
      id: 3,
      symptom: "Water pooling on lawn or damp patches on walls",
      cause: "Underground main pipe fracture or joint leak behind drywall.",
      solution: "Thermal leak mapping, pipe section cut-out, and solder refit.",
      time: "3 - 6 Hours",
      serviceQuery: "emergency-repair"
    }
  ];

  return (
    <div className={`py-16 md:py-24 transition-colors duration-300 ${isDarkMode ? "bg-[#0b0e14]" : "bg-[#fcfbf9]"
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-slide-up">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold w-fit mb-5 border ${isDarkMode
            ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
            : "bg-orange-50 border-orange-200 text-orange-700"
            }`}>
            <Wrench className="w-4.5 h-4.5" />
            <span>Service Catalog</span>
          </div>
          <h1 className={`text-4xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            OUR PLUMBING SOLUTIONS
          </h1>
          <p className={`mt-4 text-sm sm:text-base font-semibold leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}>
            Providing certified emergency repairs, high-efficiency boiler installations, and diagnostic audits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {[
            {
              icon: <Flame className="w-6 h-6" />,
              title: "Boilers & Central Heating",
              desc: "Complete replacements and upgrades with premium energy-saving units. Fully Gas Safe certified. Includes 10-12 year manufacturer warranties and system flushes.",
              points: ["Smart Nest/Hive integrations", "Radiator additions & balancing", "Annual landlord inspections (CP12)"]
            },
            {
              icon: <Droplet className="w-6 h-6" />,
              title: "Thermal Leak Detection",
              desc: "We use thermal diagnostics, moisture probes, and tracer gas to locate hidden pipes leaking behind structural drywall, avoiding invasive home destruction.",
              points: ["Zero guesswork mapping", "Insurance claim reports issued", "Instant pipe patch repairs"]
            },
            {
              icon: <Wrench className="w-6 h-6" />,
              title: "Emergency Pipe Fixes",
              desc: "Available 24/7. Burst copper mains, cracked sink joints, ceiling leaks, or broken stop-taps. We dispatch local on-duty technicians within 60 minutes.",
              points: ["60-minute dispatch target", "Certified lead-free repairs", "Pressure regulator testing"]
            },
            {
              icon: <ShieldCheck className="w-6 h-6" />,
              title: "Commercial Audits & SLA",
              desc: "Contract maintenance for commercial property managers, block supervisors, and local businesses. We provide sign-offs and structural checkups.",
              points: ["Scheduled plant maintenance", "Backflow prevention testing", "Safety sign-offs digital filing"]
            }
          ].map((srv, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between animate-slide-up ${idx === 0 ? "delay-100" : idx === 1 ? "delay-200" : idx === 2 ? "delay-300" : "delay-400"
                } ${isDarkMode
                  ? "bg-[#111622] border-slate-850 hover:border-slate-800"
                  : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                }`}
            >
              <div>
                <div className={`p-3.5 rounded-2xl w-fit ${isDarkMode ? "bg-slate-900 text-orange-400" : "bg-orange-50 text-orange-600"
                  }`}>
                  {srv.icon}
                </div>
                <h3 className={`text-xl font-black mt-6 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  {srv.title}
                </h3>
                <p className={`mt-3 text-xs sm:text-sm font-semibold leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}>
                  {srv.desc}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {srv.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2 text-xs font-bold">
                      <Check className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className={isDarkMode ? "text-slate-300" : "text-slate-700"}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800/10">
                <Link
                  href={`${linkPrefix}/contact`}
                  className={`inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest ${isDarkMode ? "text-orange-400 hover:text-orange-300" : "text-orange-600 hover:text-orange-500"
                    }`}
                >
                  <span>Book Service Call</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* INTERACTIVE SYMPTOM DIAGNOSTICS */}
        <div className={`rounded-3xl border p-6 sm:p-10 shadow-xl animate-slide-up delay-100 ${isDarkMode ? "bg-[#111622]/40 border-slate-850" : "bg-white border-slate-200 shadow-md"
          }`}>
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="flex justify-center mb-3">
              <div className={`p-2 rounded-xl ${isDarkMode ? "bg-slate-900 text-orange-400" : "bg-orange-50 text-orange-600"}`}>
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <h3 className={`text-xl sm:text-2xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Interactive Diagnostics Tool
            </h3>
            <p className={`text-xs sm:text-sm font-semibold mt-2 ${isDarkMode ? "text-slate-450" : "text-slate-500"}`}>
              Select a plumbing symptom to view instant technical checks, solutions, and estimated repair times.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6 flex flex-col gap-3">
              {symptoms.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedSymptom(item.id)}
                  className={`p-4 rounded-xl border text-left font-semibold text-xs sm:text-sm transition-all cursor-pointer ${selectedSymptom === item.id
                    ? isDarkMode
                      ? "bg-orange-950/20 border-orange-500 text-orange-450"
                      : "bg-orange-50 border-orange-500 text-orange-700"
                    : isDarkMode
                      ? "bg-slate-900/40 border-slate-800 text-slate-350 hover:bg-slate-900/60"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                >
                  {item.symptom}
                </button>
              ))}
            </div>

            <div className="lg:col-span-6">
              <div className={`p-6 rounded-2xl border h-full flex flex-col justify-between ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-[#fcfbf9] border-slate-200"
                }`}>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 block mb-4">
                    Diagnostic Analysis
                  </span>
                  <div className="space-y-4">
                    <div>
                      <span className={`block text-[10px] font-black uppercase tracking-wider ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Probable Cause</span>
                      <p className={`text-xs sm:text-sm font-semibold mt-1 leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        {symptoms[selectedSymptom].cause}
                      </p>
                    </div>
                    <div>
                      <span className={`block text-[10px] font-black uppercase tracking-wider ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Technical Solution</span>
                      <p className={`text-xs sm:text-sm font-semibold mt-1 leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        {symptoms[selectedSymptom].solution}
                      </p>
                    </div>
                    <div className="flex gap-4 border-t pt-4 border-slate-800/10">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-orange-500">
                        <Clock className="w-4 h-4" />
                        <span>EST. Repair: {symptoms[selectedSymptom].time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link
                    href={`${linkPrefix}/contact?service=${symptoms[selectedSymptom].serviceQuery}`}
                    className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-white text-center flex items-center justify-center gap-2 cursor-pointer bg-orange-600 hover:bg-orange-550"
                  >
                    <span>Request Diagnostic Booking</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. PROJECTS VIEW COMPONENT
// ==========================================
function Demo2Projects({ brandName, isDarkMode, brandSlug }: { brandName: string; isDarkMode: boolean; brandSlug: string | undefined }) {
  const [projectStates, setProjectStates] = useState<Record<number, "before" | "after">>({
    0: "after",
    1: "after",
    2: "after"
  });

  const toggleProjectState = (projIdx: number, state: "before" | "after") => {
    setProjectStates((prev) => ({ ...prev, [projIdx]: state }));
  };

  const projects = [
    {
      title: "Commercial Boiler Plant Upgrade",
      location: "Highgate, London",
      desc: "Retrofitted aging industrial boiler systems. Flushed out iron oxide sludge and installed a twin commercial modulating boiler setup.",
      beforeImg: "/hero-plumber.png",
      afterImg: "/furniture.png",
      stats: "24% reduction in fuel consumption",
      technician: "Marcus Aurelius (Senior Heating Lead)"
    },
    {
      title: "Acoustic Leak Isolation & Re-piping",
      location: "Chelsea, London",
      desc: "Isolated a burst underground main pipe leaking beneath structural parquet tiles. Used acoustic detectors to cut and patch the section with zero damage.",
      beforeImg: "/pipe-repair.png",
      afterImg: "/support-bg.png",
      stats: "0% floorboard damage during repairs",
      technician: "Sarah Jenkins (Diagnostic Lead)"
    },
    {
      title: "Luxury Bathroom Fitting & Balancing",
      location: "Mayfair, London",
      desc: "Designed and fit designers bathroom taps, Freestanding bath pipelines, and luxury toilet flushing mechanisms with backflow protection.",
      beforeImg: "/hero-plumber.png",
      afterImg: "/furniture.png",
      stats: "Increased hot water flow to 4.2 bar",
      technician: "Thomas Miller (Premium Installer)"
    }
  ];

  return (
    <div className={`py-16 md:py-24 transition-colors duration-300 ${isDarkMode ? "bg-[#0b0e14]" : "bg-[#fcfbf9]"
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-slide-up">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold w-fit mb-5 border ${isDarkMode
            ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
            : "bg-orange-50 border-orange-200 text-orange-700"
            }`}>
            <Briefcase className="w-4.5 h-4.5" />
            <span>Case Studies</span>
          </div>
          <h1 className={`text-4xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            COMPLETED PROJECT CASES
          </h1>
          <p className={`mt-4 text-sm sm:text-base font-semibold leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-655"
            }`}>
            Browse recent residential and commercial plumbing installations completed by the {brandName} dispatch crew.
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((proj, idx) => {
            const currentState = projectStates[idx] || "after";
            const currentImg = currentState === "before" ? proj.beforeImg : proj.afterImg;

            return (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-3xl border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-300 animate-slide-up ${idx === 0 ? "delay-100" : idx === 1 ? "delay-200" : idx === 2 ? "delay-300" : ""
                  } ${isDarkMode
                    ? "bg-[#111622] border-slate-850 hover:border-slate-800"
                    : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                  }`}
              >
                <div className="lg:col-span-6 relative flex flex-col items-center">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-750/15 shadow-md">
                    <Image
                      src={currentImg}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="w-full h-full object-cover object-center transition-all duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-[#06080d]/80 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider text-white border border-slate-800/40">
                      {currentState === "before" ? "❌ Before: Old Setup" : "✨ After: Completed Install"}
                    </div>
                  </div>

                  <div className={`flex gap-1 p-1 rounded-xl mt-4 border w-fit ${isDarkMode ? "bg-slate-900 border-slate-850" : "bg-slate-100 border-slate-200"
                    }`}>
                    <button
                      onClick={() => toggleProjectState(idx, "before")}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${currentState === "before"
                        ? "bg-rose-500/20 text-rose-455 font-black"
                        : isDarkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-700"
                        }`}
                    >
                      Pre-Fix Setup
                    </button>
                    <button
                      onClick={() => toggleProjectState(idx, "after")}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${currentState === "after"
                        ? "bg-green-500/20 text-green-500 font-black"
                        : isDarkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-700"
                        }`}
                    >
                      Completed Work
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{proj.location}</span>
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {proj.title}
                  </h3>
                  <p className={`mt-4 text-xs sm:text-sm font-semibold leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}>
                    {proj.desc}
                  </p>
                  <div className="mt-6 space-y-3.5 border-t pt-6 border-slate-800/10">
                    <div className="flex items-center gap-2 text-xs font-bold text-green-505">
                      <CheckCircle2 className="w-4.5 h-4.5 bg-green-500/10 p-0.5 rounded-full animate-pulse" />
                      <span>{proj.stats}</span>
                    </div>
                    <div className={`text-[11px] font-bold ${isDarkMode ? "text-slate-500" : "text-slate-450"}`}>
                      <span>Lead Technician: </span>
                      <span className={isDarkMode ? "text-slate-300" : "text-slate-800"}>{proj.technician}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. BLOG VIEW COMPONENT
// ==========================================
// function Demo2Blog({ brandName, isDarkMode, brandSlug }: { brandName: string; isDarkMode: boolean; brandSlug: string | undefined }) {
//   const posts = [
//     {
//       category: "Maintenance",
//       title: "5 Signs Your Hot Water Heater is About to Fail",
//       desc: "Rusty tap water, rumbling boiler sounds, minor puddling around the tank base, or tepid shower runs. Learn what indicators mean you need a technician visit.",
//       date: "Oct 12, 2026",
//       read: "5 min read",
//       img: "https://images.unsplash.com/photo-1585538897177-313d3330680a?q=80&w=600"
//     },
//     {
//       category: "Prevention",
//       title: "How to Prevent Frozen Pipes in Winter Callouts",
//       desc: "Frozen pipes lead to expensive structural ruptures when thawed. We outline standard insulation techniques and smart heating thermostat settings.",
//       date: "Nov 02, 2026",
//       read: "4 min read",
//       img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600"
//     },
//     {
//       category: "Diagnostics",
//       title: "Understanding Water Pressure Regulators (PRV)",
//       desc: "High main line pressure ruins luxury tap washers, toilet fill valves, and dishwashers. Learn how standard PRV valves regulate pressure in your home.",
//       date: "Dec 18, 2026",
//       read: "6 min read",
//       img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600"
//     }
//   ];

//   return (
//     <div className={`py-16 md:py-24 transition-colors duration-300 ${isDarkMode ? "bg-[#0b0e14]" : "bg-[#fcfbf9]"
//       }`}>
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="text-center max-w-2xl mx-auto mb-16 animate-slide-up">
//           <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold w-fit mb-5 border ${isDarkMode
//             ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
//             : "bg-orange-50 border-orange-200 text-orange-700"
//             }`}>
//             <BookOpen className="w-4.5 h-4.5" />
//             <span>DIY & Trade Guides</span>
//           </div>
//           <h1 className={`text-4xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
//             {brandName.toUpperCase()} INSIGHTS
//           </h1>
//           <p className={`mt-4 text-sm sm:text-base font-semibold leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"
//             }`}>
//             Practical plumbing advice, boiler maintenance logs, and emergency checks.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {posts.map((post, idx) => (
//             <div
//               key={idx}
//               className={`rounded-2xl overflow-hidden border flex flex-col justify-between shadow-md transition-all duration-350 hover:shadow-lg group animate-slide-up ${idx === 0 ? "delay-100" : idx === 1 ? "delay-200" : idx === 2 ? "delay-300" : ""
//                 } ${isDarkMode ? "border-slate-850 bg-[#111622]" : "border-slate-200 bg-white"
//                 }`}
//             >
//               <div>
//                 <div className="aspect-[1.5] w-full overflow-hidden relative">
//                   <Image
//                     src={post.img}
//                     alt={post.title}
//                     fill
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
//                   />
//                   <span className="absolute top-4 left-4 bg-orange-600 text-white font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
//                     {post.category}
//                   </span>
//                 </div>
//                 <div className="p-6">
//                   <div className={`flex gap-4 items-center text-[10px] font-bold mb-4 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
//                     <div className="flex items-center gap-1.5">
//                       <Calendar className="w-3.5 h-3.5 text-orange-505" />
//                       <span>{post.date}</span>
//                     </div>
//                     <div className="flex items-center gap-1.5">
//                       <Clock className="w-3.5 h-3.5 text-orange-505" />
//                       <span>{post.read}</span>
//                     </div>
//                   </div>
//                   <h3 className={`text-base sm:text-lg font-black transition-colors duration-200 group-hover:text-orange-555 ${isDarkMode ? "text-white" : "text-slate-900"
//                     }`}>
//                     {post.title}
//                   </h3>
//                   <p className={`mt-3 text-xs sm:text-sm font-semibold leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"
//                     }`}>
//                     {post.desc}
//                   </p>
//                 </div>
//               </div>
//               <div className="p-6 pt-0 mt-4">
//                 <button
//                   className={`inline-flex items-center gap-1.5 font-black text-xs uppercase tracking-widest cursor-pointer ${isDarkMode ? "text-orange-400 hover:text-orange-355" : "text-orange-600 hover:text-orange-555"
//                     }`}
//                 >
//                   <span>Read Article</span>
//                   <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// ==========================================
// 6. CONTACT VIEW COMPONENT
// ==========================================
function Demo2Contact({ brandName, isDarkMode, brandSlug }: { brandName: string; isDarkMode: boolean; brandSlug: string | undefined }) {
  const [serviceType, setServiceType] = useState<"emergency" | "boiler" | "leak" | "flush">("emergency");
  const [propertySize, setPropertySize] = useState<"small" | "medium" | "large">("small");

  const calculateEstimate = () => {
    let base = 120;
    let multiplier = 1.0;
    if (serviceType === "boiler") base = 1800;
    if (serviceType === "leak") base = 240;
    if (serviceType === "flush") base = 480;

    if (propertySize === "medium") multiplier = 1.25;
    if (propertySize === "large") multiplier = 1.8;

    const price = Math.round(base * multiplier);
    return {
      priceRange: serviceType === "boiler"
        ? `$${price.toLocaleString()} - $${Math.round(price * 1.35).toLocaleString()}`
        : `$${price} - $${Math.round(price * 1.25)}`,
      responseTime: serviceType === "emergency" ? "Within 60 Minutes" : "Within 24 Hours"
    };
  };

  const estimate = calculateEstimate();

  const [formData, setFormData] = useState<BookingForm>({
    name: "",
    phone: "",
    postcode: "",
    details: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<BookingForm>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof BookingForm]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<BookingForm> = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.postcode.trim()) errors.postcode = "Postcode is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      postcode: "",
      details: ""
    });
    setFormErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className={`py-16 md:py-24 transition-colors duration-300 ${isDarkMode ? "bg-[#0b0e14]" : "bg-[#fcfbf9]"
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-slide-up">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold w-fit mb-5 border ${isDarkMode
            ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
            : "bg-orange-50 border-orange-205 text-orange-700"
            }`}>
            <Mail className="w-4.5 h-4.5" />
            <span>Contact Desk</span>
          </div>
          <h1 className={`text-4xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            REQUEST DISPATCH OR QUOTE
          </h1>
          <p className={`mt-4 text-sm sm:text-base font-semibold leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-655"
            }`}>
            Connect instantly with a local coordinator to schedule diagnostics or build an estimated quote project with {brandName}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between animate-slide-up delay-100">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl h-full ${isDarkMode ? "bg-[#111622]/40 border-slate-850" : "bg-white border-slate-200"
              }`}>
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-5 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 block mb-2">
                      Submit Inquiries
                    </span>
                    <div>
                      <label className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-505"}`}>
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className={`w-full text-xs font-semibold p-3.5 pl-10 rounded-xl outline-none border transition-all ${isDarkMode
                            ? "bg-slate-950 border-slate-800 focus:border-orange-500 text-white"
                            : "bg-slate-50 border-slate-205 focus:border-orange-555 text-slate-900"
                            }`}
                        />
                        <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                      {formErrors.name && <span className="text-[10px] text-rose-500 font-bold block mt-1 pl-1">{formErrors.name}</span>}
                    </div>

                    <div>
                      <label className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-505"}`}>
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="07700 900077"
                          className={`w-full text-xs font-semibold p-3.5 pl-10 rounded-xl outline-none border transition-all ${isDarkMode
                            ? "bg-slate-950 border-slate-800 focus:border-orange-500 text-white"
                            : "bg-slate-50 border-slate-205 focus:border-orange-555 text-slate-900"
                            }`}
                        />
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                      {formErrors.phone && <span className="text-[10px] text-rose-500 font-bold block mt-1 pl-1">{formErrors.phone}</span>}
                    </div>

                    <div>
                      <label className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-505"}`}>
                        Postcode
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleInputChange}
                          placeholder="W1U 8BH"
                          className={`w-full text-xs font-semibold p-3.5 pl-10 rounded-xl outline-none border transition-all ${isDarkMode
                            ? "bg-slate-950 border-slate-800 focus:border-orange-500 text-white"
                            : "bg-slate-50 border-slate-205 focus:border-orange-555 text-slate-900"
                            }`}
                        />
                        <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                      {formErrors.postcode && <span className="text-[10px] text-rose-500 font-bold block mt-1 pl-1">{formErrors.postcode}</span>}
                    </div>

                    <div>
                      <label className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-505"}`}>
                        Details / Symptoms
                      </label>
                      <textarea
                        name="details"
                        rows={3}
                        value={formData.details}
                        onChange={handleInputChange}
                        placeholder="Please describe leaks, boiler noises, or diagnostic requirements..."
                        className={`w-full text-xs font-semibold p-3.5 rounded-xl outline-none border transition-all resize-none ${isDarkMode
                          ? "bg-slate-950 border-slate-800 focus:border-orange-500 text-white"
                          : "bg-slate-50 border-slate-205 focus:border-orange-555 text-slate-900"
                          }`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 mt-6 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-all cursor-pointer bg-orange-600 hover:bg-orange-550 disabled:bg-orange-800 active:scale-[0.98] select-none"
                  >
                    {isSubmitting ? "Dispatching Details..." : "Request Dispatch Quote"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 animate-fade-in flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-6">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className={`text-xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    Dispatch Request Registered!
                  </h3>
                  <p className={`text-xs sm:text-sm font-semibold max-w-sm mt-3 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}>
                    A coordinate manager is reviewing your postcode profile. We will contact you on <span className="underline">{formData.phone}</span> within 10-15 minutes.
                  </p>
                  <button
                    onClick={resetForm}
                    className={`mt-8 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${isDarkMode ? "bg-slate-950 border border-slate-800 text-slate-350 hover:bg-slate-900" : "bg-slate-100 text-orange-600 hover:bg-slate-200"
                      }`}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Quote calculation */}
          <div className="lg:col-span-6 animate-slide-up delay-200">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl h-full flex flex-col justify-between ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
              }`}>
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Calculator className="w-5 h-5 text-orange-555" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-500">
                    Project Cost Estimator
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className={`block text-[10px] font-black uppercase tracking-wider mb-2.5 ${isDarkMode ? "text-slate-455" : "text-slate-500"}`}>
                      Select Service Requirement
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "emergency", label: "Emergency Repair" },
                        { id: "boiler", label: "Boiler Upgrade" },
                        { id: "leak", label: "Leak Detection" },
                        { id: "flush", label: "System Flush" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setServiceType(item.id as any)}
                          className={`py-2.5 px-3 rounded-lg border text-left text-xs font-bold transition-all cursor-pointer ${serviceType === item.id
                            ? "bg-orange-500/15 border-orange-500 text-orange-500 font-black font-extrabold"
                            : isDarkMode
                              ? "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-950/60"
                              : "bg-slate-50 border-slate-205 text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className={`block text-[10px] font-black uppercase tracking-wider mb-2.5 ${isDarkMode ? "text-slate-455" : "text-slate-500"}`}>
                      Property or Plant Scale
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "small", label: "1-2 Bed" },
                        { id: "medium", label: "3-4 Bed" },
                        { id: "large", label: "Commercial" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPropertySize(item.id as any)}
                          className={`py-2.5 px-3 rounded-lg border text-center text-xs font-bold transition-all cursor-pointer ${propertySize === item.id
                            ? "bg-orange-500/15 border-orange-500 text-orange-555 font-black font-extrabold"
                            : isDarkMode
                              ? "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-950/60"
                              : "bg-slate-50 border-slate-205 text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`mt-8 p-5 rounded-2xl border ${isDarkMode ? "bg-slate-955 border-slate-850" : "bg-[#fcfbf9] border-slate-200"
                }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`block text-[9px] font-black uppercase tracking-wider ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Project Estimate</span>
                    <span className={`text-2xl sm:text-3xl font-black block mt-0.5 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      {estimate.priceRange}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`block text-[9px] font-black uppercase tracking-wider ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Priority SLA</span>
                    <span className="text-xs sm:text-sm font-black block mt-1 text-green-500 animate-pulse">
                      {estimate.responseTime}
                    </span>
                  </div>
                </div>
                <div className={`text-[10px] mt-4 pt-4 border-t border-slate-800/10 font-bold block leading-relaxed ${isDarkMode ? "text-slate-500" : "text-slate-450"
                  }`}>
                  *Price ranges reflect standard domestic boiler/leak audits including materials, subject to on-site checkups.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
