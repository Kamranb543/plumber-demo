"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Phone,
  Flame,
  Droplet,
  Wrench,
  ShieldCheck,
  Sun,
  Moon,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight
} from "lucide-react";

// 1. Create Theme Context
export const ThemeContext = createContext({
  isDarkMode: false,
  setIsDarkMode: (val: boolean) => { }
});

export const useTheme = () => useContext(ThemeContext);

// 2. Client Layout wrapper
export default function Demo2LayoutClient({
  children,
  isDarkModeDefault
}: {
  children: React.ReactNode;
  isDarkModeDefault: boolean;
}) {
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeDefault);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Sync state if the server/props default changes
  useEffect(() => {
    setIsDarkMode(isDarkModeDefault);
  }, [isDarkModeDefault]);

  const handleSetIsDarkMode = (val: boolean) => {
    setIsDarkMode(val);
    document.cookie = "global-theme=" + (val ? "dark" : "light") + "; path=/; max-age=31536000";
    localStorage.setItem("global-theme", val ? "dark" : "light");
  };

  // Close mobile menu on page navigate
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Retrieve Dynamic Brand parameters
  const params = useParams();
  const brandParam = params?.brandName; // string[] | undefined

  // Parse routing parameters
  let brandSlug: string | undefined = undefined;
  let pageName = "home";

  if (Array.isArray(brandParam)) {
    if (brandParam.length === 1) {
      const p1 = brandParam[0];
      if (["about", "services", "projects", "contact"].includes(p1)) {
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
  const CONTACT_PHONE = "020 7946 0990";
  const CONTACT_EMAIL = "elite@flowmax-plumbing.co.uk";
  const GAS_SAFE_REG = "883921";
  const OFFICE_ADDRESS = "Suite 500, High Street, London W1U 8BH";

  // Extract initials for watermark logo branding
  const initials = BRAND_NAME.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();

  // Dynamically select logo icon based on brand keywords
  const getDynamicIcon = () => {
    const lowerBrand = BRAND_NAME.toLowerCase();
    if (lowerBrand.includes("heat") || lowerBrand.includes("boiler") || lowerBrand.includes("fire") || lowerBrand.includes("gas") || lowerBrand.includes("flame")) {
      return Flame;
    }
    if (lowerBrand.includes("water") || lowerBrand.includes("flow") || lowerBrand.includes("leak") || lowerBrand.includes("droplet") || lowerBrand.includes("drain")) {
      return Droplet;
    }
    if (lowerBrand.includes("safe") || lowerBrand.includes("shield") || lowerBrand.includes("audit") || lowerBrand.includes("secure")) {
      return ShieldCheck;
    }
    return Wrench;
  };

  const BrandIcon = getDynamicIcon();

  // Render Dynamic Logo Text
  const renderDynamicLogoText = () => {
    const words = BRAND_NAME.split(" ");
    if (words.length > 1) {
      const first = words[0];
      const rest = words.slice(1).join(" ");
      return (
        <span className="font-black text-lg sm:text-xl tracking-tight block leading-tight">
          {first} <span className={isDarkMode ? "text-orange-500" : "text-orange-600"}>{rest}</span>
        </span>
      );
    } else {
      const camelSplit = BRAND_NAME.split(/(?=[A-Z])/);
      if (camelSplit.length > 1) {
        return (
          <span className="font-black text-lg sm:text-xl tracking-tight block leading-tight">
            {camelSplit[0]} <span className={isDarkMode ? "text-orange-500" : "text-orange-600"}>{camelSplit.slice(1).join("")}</span>
          </span>
        );
      }
      return (
        <span className="font-black text-lg sm:text-xl tracking-tight block leading-tight">
          {BRAND_NAME}
        </span>
      );
    }
  };

  // Build route prefix for subpages
  const linkPrefix = brandSlug ? `/demo2/${brandSlug}` : "/demo2";

  const navLinks = [
    { name: "Home", page: "home", href: linkPrefix },
    { name: "About", page: "about", href: `${linkPrefix}/about` },
    { name: "Services", page: "services", href: `${linkPrefix}/services` },
    { name: "Projects", page: "projects", href: `${linkPrefix}/projects` },
    // { name: "Blog", page: "blog", href: `${linkPrefix}/blog` },
    { name: "Contact", page: "contact", href: `${linkPrefix}/contact` }
  ];

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode: handleSetIsDarkMode }}>
      <div
        className={`min-h-screen w-full flex flex-col font-sans transition-colors duration-550 antialiased ${isDarkMode ? "bg-[#0b0e14] text-[#e2e8f0]" : "bg-[#fcfbf9] text-[#1e293b]"
          }`}
      >
        {/* TOP BANNER RIBBON (Inspired by screenshot) */}
        <div className={`w-full py-2 px-6 text-center text-[10px] sm:text-xs font-bold tracking-wider select-none z-50 ${isDarkMode
          ? "bg-[#111622] text-slate-455 border-b border-slate-800/40"
          : "bg-[#f5f2eb] text-[#334155] border-b border-slate-200"
          }`}>
          <span>Serving Residential & Commercial Clients Across The USA | 🛡️ Licensed & Insured | 🚨 24/7 Emergency Service</span>
        </div>

        {/* STICKY NAVBAR */}
        <header
          className={`sticky top-0 z-40 w-full transition-all duration-300 ${isDarkMode
            ? "bg-[#0b0e14]/85 border-b border-slate-900/50 backdrop-blur-md"
            : "bg-[#fcfbf9]/85 border-b border-slate-200/50 backdrop-blur-md"
            }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo Group */}
            <Link href={linkPrefix} className="flex items-center gap-3 hover:scale-[1.01] transition-transform">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs relative overflow-hidden transition-all ${isDarkMode ? "bg-orange-600 text-white" : "bg-orange-600 text-white"
                }`}>
                <span className="opacity-15 absolute text-lg select-none tracking-tighter font-extrabold">{initials}</span>
                <BrandIcon className="w-5 h-5 relative z-10 animate-pulse" />
              </div>
              <div>
                {renderDynamicLogoText()}
                <span className={`text-[9px] font-bold uppercase tracking-widest block -mt-0.5 ${isDarkMode ? "text-slate-500" : "text-slate-400"
                  }`}>
                  EST. 2011 &bull; Certified
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Link Menu */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-black uppercase tracking-wider">
              {navLinks.map((link) => {
                const isActive = pageName === link.page;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`transition-colors duration-250 ${isActive
                      ? "text-orange-500"
                      : isDarkMode
                        ? "text-slate-300 hover:text-orange-500"
                        : "text-slate-700 hover:text-orange-600"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA and Theme togglers */}
            <div className="flex items-center gap-3">
              {/* Toggle switch */}
              <button
                onClick={() => handleSetIsDarkMode(!isDarkMode)}
                className={`p-2.5 rounded-xl border transition-all duration-300 relative group cursor-pointer ${isDarkMode
                  ? "bg-[#161c28] border-slate-800 text-yellow-400 hover:bg-slate-800"
                  : "bg-[#ffffff] border-slate-200 text-orange-600 hover:bg-slate-100 shadow-sm"
                  }`}
                aria-label="Toggle Theme Mode"
              >
                {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>

              {/* Header CTA Button */}
              <Link
                href={`${linkPrefix}/contact`}
                className={`hidden sm:inline-block px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md ${isDarkMode
                  ? "bg-orange-600 hover:bg-orange-550 text-white shadow-orange-950/20"
                  : "bg-orange-600 hover:bg-orange-550 text-white shadow-orange-200/50"
                  }`}
              >
                Get a Free Quote
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-xl border transition-all cursor-pointer ${isDarkMode ? "bg-[#161c28] border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-700"
                  }`}
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* MOBILE NAVIGATION MENU BLOCK */}
          {mobileMenuOpen && (
            <div className={`lg:hidden w-full border-t border-slate-800/10 animate-fade-in py-6 px-6 flex flex-col gap-4 shadow-xl z-50 ${isDarkMode ? "bg-[#0b0e14] border-slate-800" : "bg-[#fcfbf9] border-slate-200"
              }`}>
              <div className="flex flex-col gap-3 font-black text-sm uppercase tracking-wider">
                {navLinks.map((link) => {
                  const isActive = pageName === link.page;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`py-2 px-3 rounded-lg block transition-colors ${isActive
                        ? isDarkMode ? "bg-orange-950/30 text-orange-500" : "bg-orange-50 text-orange-600"
                        : isDarkMode ? "hover:bg-slate-900 text-slate-300" : "hover:bg-slate-100 text-slate-700"
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              <Link
                href={`${linkPrefix}/contact`}
                className={`w-full text-center py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md ${isDarkMode ? "bg-orange-600 hover:bg-orange-555 text-white" : "bg-orange-600 hover:bg-orange-555 text-white"
                  }`}
              >
                Get a Free Quote
              </Link>
            </div>
          )}
        </header>

        {/* PAGE CONTENT ROUTER ROOT */}
        <main className="flex-grow z-10 flex flex-col relative">
          {children}
        </main>

        {/* SHARED FOOTER */}
        <footer className={`border-t py-12 px-6 transition-all duration-300 ${isDarkMode ? "bg-[#06080d] border-slate-900 text-slate-405" : "bg-[#f5f2eb] border-slate-200 text-[#475569]"
          }`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
            {/* Column 1: Logo & description */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-xs overflow-hidden ${isDarkMode ? "bg-orange-600 text-white" : "bg-orange-600 text-white"
                  }`}>
                  <span className="opacity-15 absolute text-lg select-none tracking-tighter font-extrabold">{initials}</span>
                  <BrandIcon className="w-4.5 h-4.5 relative z-10" />
                </div>
                {renderDynamicLogoText()}
              </div>
              <p className="text-xs font-semibold leading-relaxed">
                Elite national heating and piping works. Transcending typical repair services with commercial-grade diagnostics, certified engineers, and transparent pricing models.
              </p>
            </div>

            {/* Column 2: Navigation shortcuts */}
            <div className="md:col-span-3">
              <h4 className={`text-xs font-black uppercase tracking-wider mb-4 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 text-xs font-bold">
                {navLinks.slice(0, 4).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-orange-500 transition-colors flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-orange-500" />
                      <span>{link.name} Overview</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact highlights */}
            <div className="md:col-span-5">
              <h4 className={`text-xs font-black uppercase tracking-wider mb-4 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Corporate Contact
              </h4>
              <ul className="space-y-3.5 text-xs font-bold">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-orange-550 shrink-0" />
                  <div>
                    <span className="block opacity-60 uppercase text-[9px] font-black">Call Central Desk</span>
                    <a href={`tel:${CONTACT_PHONE}`} className={`text-sm font-black hover:underline ${isDarkMode ? "text-white" : "text-slate-900"}`}>{CONTACT_PHONE}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-orange-550 shrink-0" />
                  <div>
                    <span className="block opacity-60 uppercase text-[9px] font-black">Digital Inquiries</span>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">{CONTACT_EMAIL}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-orange-550 shrink-0" />
                  <div>
                    <span className="block opacity-60 uppercase text-[9px] font-black">Registered Headquarters</span>
                    <span>{OFFICE_ADDRESS}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Sub footer */}
          <div className={`max-w-7xl mx-auto pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-bold ${isDarkMode ? "border-slate-900 text-slate-500" : "border-slate-200 text-slate-500"
            }`}>
            <span>&copy; {new Date().getFullYear()} {BRAND_NAME} Corporation. All rights reserved. Registered in the UK.</span>
            <div className="flex gap-4">
              <a href="#hero" className="hover:text-orange-500 transition-colors">Privacy Charter</a>
              <a href="#hero" className="hover:text-orange-500 transition-colors">Safety Certifications</a>
              <a href="#hero" className="hover:text-orange-500 transition-colors">SLA Agreement</a>
            </div>
          </div>
        </footer>

        {/* Global Keyframes styling for fadeIn animations */}
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </div>
    </ThemeContext.Provider>
  );
}
