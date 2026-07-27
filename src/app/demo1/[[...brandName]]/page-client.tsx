"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Phone,
  Clock,
  ShieldCheck,
  Check,
  Flame,
  Droplet,
  Wrench,
  Sparkles,
  MapPin,
  Calendar,
  ChevronRight,
  ChevronDown,
  Star,
  Activity,
  Award,
  Sun,
  Moon,
  ChevronLeft,
  Mail,
  User,
  AlertCircle,
  ArrowUpRight
} from "lucide-react";

// ==========================================
// BUSINESS CONFIGURATION VARIABLES
// ==========================================
const CONTACT_PHONE = "020 7000 0000";
const CONTACT_PHONE_RAW = "+440000000";
const CONTACT_EMAIL = "xyz@gmail.com";
const GAS_SAFE_REG = "00000";
const OFFICE_ADDRESS = "Suite 500, High Street, London W1U 8BH";

interface BookingForm {
  name: string;
  phone: string;
  postcode: string;
  serviceType: string;
  details: string;
}

export default function Demo5Dynamic({
  isDarkModeDefault
}: {
  isDarkModeDefault: boolean;
}) {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeDefault);

  // Sync state if server prop defaults change
  useEffect(() => {
    setIsDarkMode(isDarkModeDefault);
  }, [isDarkModeDefault]);

  const handleToggleDarkMode = () => {
    const val = !isDarkMode;
    setIsDarkMode(val);
    document.cookie = "global-theme=" + (val ? "dark" : "light") + "; path=/; max-age=31536000";
    localStorage.setItem("global-theme", val ? "dark" : "light");
  };

  // Parallax Scroll Tracker
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollY(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Retrieve Dynamic Brand Parameters
  const params = useParams();
  const brandParam = params?.brandName;
  const brandSlug = Array.isArray(brandParam) ? brandParam[0] : brandParam;

  // Format brand name from URL slug
  const formatBrandName = (slug: string | undefined) => {
    if (!slug) return "FlowMax";
    return decodeURIComponent(slug)
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const BRAND_NAME = formatBrandName(brandSlug);
  const BRAND_FULL_NAME = BRAND_NAME === "FlowMax" ? "FlowMax Premium Plumbing & Heating" : `${BRAND_NAME} Plumbing & Heating`;

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
    return Wrench; // default fallback
  };

  const BrandIcon = getDynamicIcon();

  // Render Dynamic Logo Text with two-tone word splitting
  const renderDynamicLogoText = () => {
    const words = BRAND_NAME.split(" ");
    if (words.length > 1) {
      const first = words[0];
      const rest = words.slice(1).join(" ");
      return (
        <span className="font-extrabold text-lg sm:text-xl tracking-tight block leading-tight">
          {first} <span className={isDarkMode ? "text-violet-400" : "text-indigo-650"}>{rest}</span>
        </span>
      );
    } else {
      const camelSplit = BRAND_NAME.split(/(?=[A-Z])/);
      if (camelSplit.length > 1) {
        return (
          <span className="font-extrabold text-lg sm:text-xl tracking-tight block leading-tight">
            {camelSplit[0]} <span className={isDarkMode ? "text-violet-400" : "text-indigo-650"}>{camelSplit.slice(1).join("")}</span>
          </span>
        );
      }
      return (
        <span className="font-extrabold text-lg sm:text-xl tracking-tight block leading-tight">
          {BRAND_NAME}
        </span>
      );
    }
  };

  // Postcode Coverage Check State
  const [postcode, setPostcode] = useState("");
  const [coverageStatus, setCoverageStatus] = useState<"idle" | "served" | "unserved">("idle");

  const handleCheckCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) return;
    const cleanPostcode = postcode.trim().toUpperCase();
    const matches = /^(SW|SE|W|N|E|EC|WC|NW|CR|BR|DA)/.test(cleanPostcode);
    setCoverageStatus(matches ? "served" : "unserved");
  };

  // Steps active card navigation
  const [activeStep, setActiveStep] = useState(0);

  // About Section dynamic tabs
  const [activeTab, setActiveTab] = useState<"story" | "mission" | "promise">("story");

  // Custom 3D tilt tracking for service cards
  const [cardTilts, setCardTilts] = useState<Record<string, { rotateX: number; rotateY: number; glowX: number; glowY: number }>>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 10;
    const angleY = (x - xc) / 10;
    setCardTilts((prev) => ({
      ...prev,
      [cardId]: { rotateX: angleX, rotateY: angleY, glowX: x, glowY: y }
    }));
  };

  const handleMouseLeave = (cardId: string) => {
    setCardTilts((prev) => {
      const copy = { ...prev };
      delete copy[cardId];
      return copy;
    });
  };

  // Testimonials Slider
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      name: "Sumit N.",
      role: "Verified Homeowner",
      rating: 5,
      text: `Absolutely top notch! ${BRAND_NAME} sent an engineer within 40 minutes of my call for a burst pipe. The job was clean, fully explained, and very reasonably priced. Highly recommend their emergency service.`,
      avatar: "/avatar1.png"
    },
    {
      name: "Dimeo T.",
      role: "Property Manager",
      rating: 5,
      text: `We use ${BRAND_NAME} for our entire London portfolio. Their gas inspections are thorough, certificates are issued instantly, and their team is always professional. Pure quality.`,
      avatar: "/avatar2.png"
    },
    {
      name: "Maria C.",
      role: "Residential Client",
      rating: 5,
      text: "Fitted our entire new bathroom suite. The aesthetic detailing is incredible, pipes are neat, and they even tidied up everything. Very premium customer experience!",
      avatar: "avatar3.png"
    }
  ];

  // Booking Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<BookingForm>>({});
  const [formData, setFormData] = useState<BookingForm>({
    name: "",
    phone: "",
    postcode: "",
    serviceType: "boiler-install",
    details: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
      serviceType: "boiler-install",
      details: "",
    });
    setFormErrors({});
    setIsSubmitted(false);
  };

  // Section Observer Hook (Intersection) for animation triggers
  const useSectionActive = (threshold = 0.2) => {
    const ref = useRef<HTMLElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
        }
      }, { threshold });
      const el = ref.current;
      if (el) observer.observe(el);
      return () => {
        if (el) observer.unobserve(el);
      };
    }, [threshold]);

    return [ref, active] as const;
  };

  // Apply intersection to sections
  const [heroRef, heroActive] = useSectionActive(0.15);
  const [worksRef, worksActive] = useSectionActive(0.2);
  const [aboutRef, aboutActive] = useSectionActive(0.2);
  const [servicesRef, servicesActive] = useSectionActive(0.2);
  const [testimonialBannerRef, testimonialBannerActive] = useSectionActive(0.2);
  const [clientsRef, clientsActive] = useSectionActive(0.2);
  const [contactRef, contactActive] = useSectionActive(0.15);

  return (
    <div
      ref={containerRef}
      className={`min-h-screen md:h-screen w-full transition-colors duration-700 ease-in-out ${isDarkMode ? "bg-[#090d16] text-[#e2e8f0] select-none" : "bg-[#f8fafc] text-[#0f172a] select-none"
        } md:snap-y md:snap-mandatory md:overflow-y-scroll scroll-smooth`}
    >
      {/* 1. PREMIUM GLASSMORPHIC HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDarkMode
          ? "bg-[#090d16]/75 border-b border-slate-800/40 backdrop-blur-md"
          : "bg-[#f8fafc]/75 border-b border-slate-200/40 backdrop-blur-md"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Dynamic Squircle logo with initials watermark and matching icon */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs relative overflow-hidden transition-all ${isDarkMode ? "bg-violet-600 text-white" : "bg-indigo-600 text-white"
              }`}>
              {/* Background initials watermark */}
              <span className="opacity-15 absolute text-lg select-none tracking-tighter font-extrabold">{initials}</span>
              {/* Dynamic foreground icon */}
              <BrandIcon className="w-5 h-5 relative z-10 animate-pulse" />
            </div>
            <div>
              {/* Dynamic word-split brand title */}
              {renderDynamicLogoText()}
              <span className={`text-[10px] font-bold uppercase tracking-wider block -mt-0.5 ${isDarkMode ? "text-slate-500" : "text-slate-400"
                }`}>
                Gas Safe #{GAS_SAFE_REG}
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
            <a href="#hero" className={`hover:scale-105 transition-all ${isDarkMode ? "hover:text-violet-400" : "hover:text-indigo-650"}`}>Home</a>
            <a href="#how-it-works" className={`hover:scale-105 transition-all ${isDarkMode ? "hover:text-violet-400" : "hover:text-indigo-655"}`}>How It Works</a>
            <a href="#about" className={`hover:scale-105 transition-all ${isDarkMode ? "hover:text-violet-400" : "hover:text-indigo-655"}`}>About</a>
            <a href="#services" className={`hover:scale-105 transition-all ${isDarkMode ? "hover:text-violet-400" : "hover:text-indigo-655"}`}>Services</a>
            <a href="#clients" className={`hover:scale-105 transition-all ${isDarkMode ? "hover:text-violet-400" : "hover:text-indigo-655"}`}>Reviews</a>
            <a href="#contact" className={`hover:scale-105 transition-all ${isDarkMode ? "hover:text-violet-400" : "hover:text-indigo-655"}`}>Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Dynamic theme switch button */}
            <button
              onClick={handleToggleDarkMode}
              className={`p-2.5 rounded-xl border transition-all duration-300 relative group cursor-pointer ${isDarkMode
                ? "bg-slate-900 border-slate-800 text-yellow-400 hover:bg-slate-800"
                : "bg-white border-slate-200 text-indigo-650 hover:bg-slate-105 shadow-sm"
                }`}
              aria-label="Toggle Theme Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="absolute top-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-slate-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>

            {/* CTA Button */}
            <a
              href="#contact"
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md ${isDarkMode
                ? "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-900/30"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-200/50"
                }`}
            >
              Book Now
            </a>
          </div>
        </div>
      </header>

      {/* BACKGROUND GRAPHICS (GLOBAL PARALLAX BLOBS) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute rounded-full filter blur-[150px] transition-colors duration-500 ${isDarkMode ? "bg-violet-600/10" : "bg-indigo-500/5"
            }`}
          style={{
            top: "10%",
            left: "15%",
            width: "500px",
            height: "500px",
            transform: `translateY(${scrollY * 0.15}px)`
          }}
        />
        <div
          className={`absolute rounded-full filter blur-[150px] transition-colors duration-500 ${isDarkMode ? "bg-cyan-500/8" : "bg-teal-500/5"
            }`}
          style={{
            bottom: "20%",
            right: "10%",
            width: "600px",
            height: "600px",
            transform: `translateY(${scrollY * -0.1}px)`
          }}
        />
        {/* Outlined backdrop texts for parallax */}
        <div
          className={`absolute left-10 font-black text-[12vw] pointer-events-none select-none tracking-tighter transition-colors duration-500 leading-none ${isDarkMode ? "text-slate-800/[0.6]" : "text-slate-900/[0.1]"
            }`}
          style={{
            top: "22%",
            transform: `translateX(${scrollY * 0.15}px)`
          }}
        >
          {initials ? initials.length < 1 ? initials : BRAND_NAME : "FM"}
        </div>
        <div
          className={`absolute right-10 font-black text-[10vw] pointer-events-none select-none tracking-tighter transition-colors duration-500 leading-none ${isDarkMode ? "text-slate-800/[0.6]" : "text-slate-900/[0.1]"
            }`}
          style={{
            top: "55%",
            transform: `translateX(${scrollY * -0.1}px)`
          }}
        >
          PREMIUM
        </div>
      </div>

      {/* SECTION 1: HERO (SNAP START) */}
      <section
        id="hero"
        ref={heroRef}
        className="md:snap-start min-h-screen md:h-screen w-full flex flex-col justify-center relative overflow-hidden pt-24 md:pt-0"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">

          {/* Left Column: Heading, description & Tailored Block */}
          <div className={`lg:col-span-7 flex flex-col transition-all duration-1000 ${heroActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}>

            {/* Headline */}
            <h1 className={`text-5xl sm:text-6xl lg:text-[72px] font-black tracking-tight leading-[1.05] ${isDarkMode ? "text-white" : "text-slate-900"
              }`}>
              Need a <br />
              professional <br />
              plumber?
            </h1>

            {/* Description */}
            <p className={`mt-6 text-sm sm:text-base max-w-xl leading-relaxed font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
              Reliable, skilled, and ready when you need us most. From leaks to full installations, we handle it all with care. Your plumbing problems, solved fast &mdash; the first time.
            </p>

            {/* Micro Postcode Checker (keeps this high-value interactive feature) */}
            <div className="mt-6 max-w-md">
              <form onSubmit={handleCheckCoverage} className={`p-1.5 rounded-xl border flex items-center gap-2 transition-all text-xs ${isDarkMode ? "bg-slate-900/60 border-slate-800 focus-within:border-violet-500/50" : "bg-white border-slate-200 focus-within:border-indigo-500/50 shadow-sm"
                }`}>
                <div className="flex items-center gap-1.5 flex-grow pl-2">
                  <MapPin className={`w-4 h-4 ${isDarkMode ? "text-violet-400" : "text-indigo-600"}`} />
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => {
                      setPostcode(e.target.value);
                      if (coverageStatus !== "idle") setCoverageStatus("idle");
                    }}
                    placeholder="Enter postcode (e.g. W1U) to check coverage"
                    className={`w-full bg-transparent font-bold outline-none placeholder-slate-500 ${isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                  />
                </div>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg font-black uppercase tracking-wider transition-all cursor-pointer ${isDarkMode ? "bg-violet-600 hover:bg-violet-500 text-white" : "bg-indigo-600 hover:bg-indigo-550 text-white"
                    }`}
                >
                  Verify
                </button>
              </form>
              {coverageStatus === "served" && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-bold mt-2 animate-fade-in pl-1">
                  <Check className="w-3.5 h-3.5 bg-emerald-500/10 p-0.5 rounded-full" />
                  <span>We have active engineers ready in your area!</span>
                </div>
              )}
              {coverageStatus === "unserved" && (
                <div className="flex items-center gap-1.5 text-[11px] text-rose-500 font-bold mt-2 animate-fade-in pl-1">
                  <AlertCircle className="w-3.5 h-3.5 bg-rose-500/10 p-0.5 rounded-full" />
                  <span>Coverage pending. Submit request below.</span>
                </div>
              )}
            </div>

            {/* Tailored Solutions Block (Inspired by screenshot) */}
            <div className={`rounded-3xl p-6 sm:p-8 mt-8 border shadow-xl relative overflow-hidden transition-all duration-300 ${isDarkMode
              ? "bg-gradient-to-br from-violet-600 to-indigo-800 border-violet-500/20 text-white"
              : "bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-transparent"
              }`}>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                Making Solutions tailored to your needs
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                {[
                  "Experienced and certified plumbers",
                  "Fast local response",
                  "100% customer satisfaction guarantee"
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="p-1 rounded-lg bg-white/10 text-amber-300 shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold leading-snug text-white/90">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 mt-8 pt-6 border-t border-white/10">
                <a
                  href="#contact"
                  className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-center px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-200"
                >
                  Free Consultation
                </a>

                {/* Mini worker trust badge */}
                <div className="flex items-center gap-3 bg-slate-950/25 border border-white/10 p-3 rounded-2xl">
                  <Image
                    src="/avatar1.png"
                    alt="Engineer working"
                    width={150}
                    height={150}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-sm font-black text-amber-300 block leading-tight">10K+</span>
                    <span className="text-[10px] text-white/80 font-bold block leading-tight">
                      Experienced and certified plumbers
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero plumber vertical photo with ribbon */}
          <div className={`lg:col-span-5 relative flex flex-col justify-end transition-all duration-1000 delay-200 ${heroActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}>

            {/* Phone ribbon */}
            <div className={`py-3.5 px-6 flex items-center justify-center gap-2 font-black text-sm tracking-wider select-none rounded-t-2xl transition-all shadow-lg ${isDarkMode ? "bg-violet-600 text-amber-300" : "bg-indigo-600 text-white"
              }`}>
              <Phone className="w-4 h-4 text-amber-300 animate-pulse fill-amber-300" />
              <a href={`tel:${CONTACT_PHONE_RAW}`} className="hover:underline">
                {CONTACT_PHONE}
              </a>
            </div>

            {/* Plumber vertical photo */}
            <div className={`relative w-full aspect-[3/4.2] rounded-b-2xl overflow-hidden border shadow-2xl group ${isDarkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
              }`}>
              <Image
                src="/hero-plumber.png"
                alt="Plumber Professional"
                width={800}
                height={1200}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Flanking accent shape matching screenshot */}
            <div className={`absolute top-1/4 -right-3 bottom-10 w-24 -z-10 rounded-r-2xl opacity-90 transition-colors duration-500 ${isDarkMode ? "bg-violet-600/30" : "bg-indigo-500/20"
              }`} />

            {/* Background glowing circle */}
            <div className={`absolute -inset-4 rounded-full filter blur-2xl -z-20 transition-colors duration-500 ${isDarkMode ? "bg-violet-500/10" : "bg-indigo-500/5"
              }`} />

          </div>

        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS (SNAP START) */}
      <section
        id="how-it-works"
        ref={worksRef}
        className="md:snap-start min-h-screen md:h-screen w-full flex flex-col justify-center relative overflow-hidden pt-24 md:pt-0"
      >
        <div className="max-w-7xl mx-auto px-6 w-full z-10">
          {/* Header */}
          <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-1000 ${worksActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}>
            <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${isDarkMode ? "bg-violet-500/10 border-violet-500/20 text-violet-400" : "bg-indigo-50 border-indigo-100 text-indigo-600"
              }`}>
              Streamlined Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-5">
              How It Works
            </h2>
            <p className={`mt-4 text-sm sm:text-base font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Experience structured, stress-free plumbing services in London. We value your schedule and maintain transparency at every stage.
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Steps Left List */}
            <div className={`lg:col-span-6 flex flex-col gap-5 transition-all duration-1000 delay-200 ${worksActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}>
              {[
                {
                  id: 0,
                  num: "01",
                  title: "Submit Inquiry or Call",
                  desc: "Request dispatch online or tap our emergency hotline. Speak instantly with a dispatcher, no robot loops."
                },
                {
                  id: 1,
                  num: "02",
                  title: "Expert Diagnostic Visit",
                  desc: "A fully licensed engineer inspects the issue and presents a flat-rate quote. Zero hidden fees."
                },
                {
                  id: 2,
                  num: "03",
                  title: "Premium Certified Fix",
                  desc: "We perform the work using elite parts, complete thorough clean-ups, and sign off a 12-month quality guarantee."
                }
              ].map((step) => {
                const isActive = activeStep === step.id;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${isActive
                      ? isDarkMode
                        ? "bg-slate-900 border-violet-500 shadow-lg shadow-violet-900/10 scale-102"
                        : "bg-white border-indigo-500 shadow-md shadow-indigo-100/50 scale-102"
                      : isDarkMode
                        ? "bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/50"
                        : "bg-white/40 border-slate-200 hover:bg-white"
                      }`}
                  >
                    <div className="flex gap-4 items-start">
                      <span className={`text-2xl font-black ${isActive
                        ? isDarkMode ? "text-violet-400" : "text-indigo-600"
                        : isDarkMode ? "text-slate-700" : "text-slate-300"
                        }`}>
                        {step.num}
                      </span>
                      <div>
                        <h3 className={`text-base sm:text-lg font-black transition-colors ${isActive
                          ? isDarkMode ? "text-white" : "text-slate-900"
                          : isDarkMode ? "text-slate-300" : "text-slate-700"
                          }`}>
                          {step.title}
                        </h3>
                        <p className={`mt-2 text-xs sm:text-sm font-medium leading-relaxed transition-colors ${isActive
                          ? isDarkMode ? "text-slate-400" : "text-slate-600"
                          : isDarkMode ? "text-slate-555" : "text-slate-450"
                          }`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Preview Panel (Right Side) */}
            <div className={`lg:col-span-6 transition-all duration-1000 delay-400 ${worksActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}>
              <div className={`relative aspect-[1.3] rounded-3xl overflow-hidden border p-8 flex flex-col justify-end shadow-xl ${isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
                }`}>
                {/* Background image reflecting active step */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/plumber-worker.png"
                    alt="Active Step Showcase"
                    width={800}
                    height={1200}
                    className="w-full h-full object-cover object-center transition-all duration-700 filter brightness-65"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? "from-[#090d16] via-[#090d16]/30 to-transparent" : "from-[#f8fafc] via-[#f8fafc]/35 to-transparent"
                    }`} />
                </div>

                {/* Overlaid preview badge content */}
                <div className="relative z-10 max-w-sm">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase mb-3 ${isDarkMode ? "bg-violet-600 text-white" : "bg-indigo-600 text-white"
                    }`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Active Workflow Preview</span>
                  </div>
                  <h4 className={`text-xl font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                    {activeStep === 0 && "Instant Digital Dispatch"}
                    {activeStep === 1 && "Complete Thermal Leak Detection"}
                    {activeStep === 2 && "Fully Signed 1yr Guarantee"}
                  </h4>
                  <p className={`mt-2 text-xs sm:text-sm font-semibold leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-800"
                    }`}>
                    {activeStep === 0 && "When you submit, your postcode triggers an alarm in our mapping tool, matching you immediately with the closest on-duty technician."}
                    {activeStep === 1 && "We employ advanced pressure monitoring and heat detection technology to find hidden wall leaks without tearing up your drywall."}
                    {activeStep === 2 && "Once work completes, we present digital service sign-off sheets that validate your insurance warranty policies automatically."}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT FLOWMAX (SNAP START) */}
      <section
        id="about"
        ref={aboutRef}
        className="md:snap-start min-h-screen md:h-screen w-full flex flex-col justify-center relative overflow-hidden pt-24 md:pt-0"
      >
        <div className="max-w-7xl mx-auto px-6 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left side: Photo with overlay metrics */}
            <div className={`lg:col-span-5 relative transition-all duration-1000 ${aboutActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-700/20 shadow-xl w-full max-w-[390px] mx-auto">
                <Image
                  src="/support-bg.png"
                  alt="Plumbing diagnostics"
                  height={800}
                  width={800}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
              </div>

              {/* Floating metrics card */}
              <div className={`absolute bottom-8 -right-4 p-5 rounded-2xl border shadow-xl max-w-xs transition-colors duration-300 ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100 text-slate-900"
                }`}>
                <div className="flex gap-3">
                  <div className="p-2.5 bg-violet-600/10 text-violet-400 rounded-xl h-fit">
                    <ShieldCheck className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black">Elite Standards Only</h4>
                    <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      All technicians hold Gas Safe status, undergo deep background checks, and hold £5M public liability insurance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Tabs & Content */}
            <div className={`lg:col-span-7 transition-all duration-1000 delay-200 ${aboutActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}>
              <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${isDarkMode ? "bg-violet-500/10 border-violet-500/20 text-violet-400" : "bg-indigo-50 border-indigo-100 text-indigo-600"
                }`}>
                Engineering Trust
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mt-5 leading-tight">
                About {BRAND_NAME}
              </h2>
              <p className={`mt-4 text-sm sm:text-base leading-relaxed font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}>
                Established with a vision to redefine local trade reliability. We combine advanced diagnostic engineering with traditional client service principles.
              </p>

              {/* Tabs Switcher */}
              <div className={`flex gap-1.5 p-1 rounded-xl mt-8 border max-w-md ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
                }`}>
                {(["story", "mission", "promise"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeTab === tab
                      ? isDarkMode
                        ? "bg-violet-600 text-white shadow-sm"
                        : "bg-white text-indigo-600 shadow-sm border border-indigo-50"
                      : isDarkMode
                        ? "text-slate-500 hover:text-slate-300"
                        : "text-slate-405 hover:text-slate-700"
                      }`}
                  >
                    {tab === "story" && "Our Story"}
                    {tab === "mission" && "Our Mission"}
                    {tab === "promise" && "Our Promise"}
                  </button>
                ))}
              </div>

              {/* Tab Content Boxes */}
              <div className="mt-6 min-h-[160px]">
                {activeTab === "story" && (
                  <div className="animate-fade-in">
                    <h3 className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>A Decade of Elite Service</h3>
                    <p className={`text-sm mt-3 leading-relaxed font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                      {BRAND_NAME} began as a family-run heating maintenance outfit in London. By embracing real-time dispatch systems and refusing sub-contracted labor, we established a reputation for absolute reliability, now servicing thousands of premium residences across the capital.
                    </p>
                  </div>
                )}
                {activeTab === "mission" && (
                  <div className="animate-fade-in">
                    <h3 className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>Upgrading Trade Standards</h3>
                    <p className={`text-sm mt-3 leading-relaxed font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                      Our goal is simple: eliminate the friction from local callouts. We utilize diagnostic cameras and acoustic leak finders to provide correct, transparent solutions. We believe trade service should be professional, clean, and completely reliable.
                    </p>
                  </div>
                )}
                {activeTab === "promise" && (
                  <div className="animate-fade-in">
                    <h3 className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>Premium Guarantee Checklist</h3>
                    <ul className={`text-sm mt-3 space-y-2.5 font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Upfront flat rates: You review and approve quotes before work begins</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Certified engineers only: Never outsourced to unqualified contractors</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Leave no trace: Floor protective runner sheets laid down in every room</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest ${isDarkMode ? "text-violet-400 hover:text-violet-300" : "text-indigo-600 hover:text-indigo-500"
                    }`}
                >
                  <span>Discuss Boiler or Repair Projects</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICES GRID (SNAP START) */}
      <section
        id="services"
        ref={servicesRef}
        className="md:snap-start min-h-screen md:h-screen w-full flex flex-col justify-center relative overflow-hidden pt-24 md:pt-0"
      >
        <div className="max-w-7xl mx-auto px-6 w-full z-10">
          {/* Header */}
          <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-1000 ${servicesActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}>
            <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${isDarkMode ? "bg-violet-500/10 border-violet-500/20 text-violet-400" : "bg-indigo-50 border-indigo-100 text-indigo-605"
              }`}>
              Our Core Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-5">
              Premium Solutions
            </h2>
            <p className={`mt-4 text-sm sm:text-base font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Engineering custom heating and pipework installations built to perform reliably. From smart boilers to complex leak detections.
            </p>
          </div>

          {/* 3D tilt cards grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${servicesActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}>
            {[
              {
                id: "srv1",
                icon: <Flame className="w-6 h-6" />,
                title: "Boiler Installation & Upgrade",
                desc: "High-efficiency systems with up to 12-year manufacturer warranties. Fully Gas Safe certified."
              },
              {
                id: "srv2",
                icon: <Droplet className="w-6 h-6" />,
                title: "Emergency Pipe Leak Repair",
                desc: "Equipped with thermal leak detection to isolate issues behind plasterboard with zero guesswork."
              },
              {
                id: "srv3",
                icon: <Wrench className="w-6 h-6" />,
                title: "Acoustic Blockage Clearing",
                desc: "High-pressure water jetting that breaks stubborn grease, scale, and root intrusions instantly."
              },
              {
                id: "srv4",
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "System Powerflushing",
                desc: "Cleans out rust and sludge deposits, optimizing central heating circulation and fuel economy."
              },
              {
                id: "srv5",
                icon: <Activity className="w-6 h-6" />,
                title: "Premium Fixture Plumbing",
                desc: "Designer taps, freestanding baths, and luxury toilet suites fitted with flush-leak protection."
              },
              {
                id: "srv6",
                icon: <Calendar className="w-6 h-6" />,
                title: "Safety Audits & Certificates",
                desc: "Fast landlord gas checks (CP12) and commercial plant safety sign-offs with direct digital filing."
              }
            ].map((service) => (
              <div
                key={service.id}
                onMouseMove={(e) => handleMouseMove(e, service.id)}
                onMouseLeave={() => handleMouseLeave(service.id)}
                className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 hover:shadow-xl ${isDarkMode
                  ? "bg-slate-900 border-slate-800/80 hover:border-violet-500/30"
                  : "bg-white border-slate-200 hover:border-indigo-500/20"
                  }`}
                style={{
                  transform: cardTilts[service.id]
                    ? `perspective(1000px) rotateX(${cardTilts[service.id].rotateX}deg) rotateY(${cardTilts[service.id].rotateY}deg)`
                    : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                  transition: cardTilts[service.id] ? "none" : "transform 0.5s ease-out"
                }}
              >
                {/* 3D mouse glow effect */}
                {cardTilts[service.id] && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle 120px at ${cardTilts[service.id].glowX}px ${cardTilts[service.id].glowY}px, ${isDarkMode ? "rgba(139, 92, 246, 0.2)" : "rgba(99, 102, 241, 0.15)"
                        }, transparent 80%)`
                    }}
                  />
                )}

                {/* Card Icon */}
                <div className={`p-3.5 rounded-2xl w-fit ${isDarkMode
                  ? "bg-slate-800 text-violet-400 border border-slate-700"
                  : "bg-indigo-50 text-indigo-600"
                  }`}>
                  {service.icon}
                </div>

                <h3 className={`text-base sm:text-lg font-black mt-6 ${isDarkMode ? "text-white" : "text-slate-955"}`}>
                  {service.title}
                </h3>
                <p className={`mt-3 text-xs sm:text-sm font-medium leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: HIGH-IMPACT TESTIMONIAL BANNER (SNAP START) */}
      <section
        ref={testimonialBannerRef}
        className="md:snap-start min-h-screen md:h-screen w-full flex flex-col justify-center relative overflow-hidden"
      >
        {/* Background photo behind quote */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/testemonial-bg.png"
            alt="Boiler audit details"
            height={1200}
            width={1200}
            className="w-full h-full object-cover object-center filter brightness-45 contrast-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${isDarkMode
            ? "from-slate-950 via-slate-950/80 to-transparent"
            : "from-slate-100 via-slate-100/75 to-transparent"
            }`} />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className={`lg:col-span-8 flex flex-col transition-all duration-1000 ${testimonialBannerActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}>
              {/* Gold Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Quote block */}
              <h3 className={`text-xl sm:text-2xl lg:text-3xl font-black italic leading-normal ${isDarkMode ? "text-white" : "text-slate-900"
                }`}>
                &ldquo;{BRAND_NAME} is in a category of its own. When our boiler collapsed during mid-winter, they dispatched an engineer immediately who diagnostics and fitted an updated eco-unit the next morning. Clean, incredibly polite, and pure craftsmanship.&rdquo;
              </h3>

              {/* Author info */}
              <div className="flex items-center gap-4 mt-8">
                <Image
                  src="/avatar3.png"
                  alt="Review author"
                  className="w-14 h-14 rounded-full border border-violet-500 object-cover"
                  height={200}
                  width={200}
                />
                <div>
                  <span className={`block font-black text-sm ${isDarkMode ? "text-white" : "text-slate-900"}`}>Dr. John Doe</span>
                  <span className="text-xs font-bold block mt-0.5 text-slate-500">
                    Highgate Residential Homeowner
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CLIENTS SAY (SNAP START) */}
      <section
        id="clients"
        ref={clientsRef}
        className="md:snap-start min-h-screen md:h-screen w-full flex flex-col justify-center relative overflow-hidden pt-24 md:pt-0"
      >
        <div className="max-w-7xl mx-auto px-6 w-full z-10">
          {/* Header */}
          <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-1000 ${clientsActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}>
            <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${isDarkMode ? "bg-violet-500/10 border-violet-500/20 text-violet-400" : "bg-indigo-50 border-indigo-100 text-indigo-600"
              }`}>
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-5">
              What Our Clients Say
            </h2>
            <p className={`mt-4 text-sm sm:text-base font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Loved by local residents and business owners alike. Hear from our clients about their {BRAND_NAME} experience.
            </p>
          </div>

          {/* Testimonial slider component */}
          <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${clientsActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}>
            <div className={`relative p-8 sm:p-12 rounded-3xl border overflow-hidden shadow-xl ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
              }`}>
              {/* Slider content wrapper */}
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-violet-500 shadow-md"
                />

                {/* Rating */}
                <div className="flex gap-1 mt-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Text */}
                <p className={`mt-6 text-base sm:text-lg font-medium italic leading-relaxed max-w-2xl ${isDarkMode ? "text-slate-200" : "text-slate-800"
                  }`}>
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </p>

                {/* Name */}
                <h4 className={`text-base font-black mt-6 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  {testimonials[currentTestimonial].name}
                </h4>
                <span className={`text-xs font-bold ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                  {testimonials[currentTestimonial].role}
                </span>
              </div>

              {/* Slider Navigation Arrows */}
              <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
                <button
                  onClick={() =>
                    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
                  }
                  className={`p-2.5 rounded-xl border pointer-events-auto transition-all cursor-pointer ${isDarkMode
                    ? "bg-slate-900 border-slate-800 hover:bg-slate-800 text-white"
                    : "bg-white border-slate-200 hover:bg-slate-100 text-slate-800 shadow-sm"
                    }`}
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
                  }
                  className={`p-2.5 rounded-xl border pointer-events-auto transition-all cursor-pointer ${isDarkMode
                    ? "bg-slate-900 border-slate-800 hover:bg-slate-800 text-white"
                    : "bg-white border-slate-200 hover:bg-slate-100 text-slate-800 shadow-sm"
                    }`}
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex gap-2 justify-center mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${currentTestimonial === i
                    ? isDarkMode ? "bg-violet-500 scale-120" : "bg-indigo-600 scale-120"
                    : isDarkMode ? "bg-slate-800" : "bg-slate-300"
                    }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CONTACT / BOOKING FORM & FOOTER (SNAP START) */}
      <section
        id="contact"
        ref={contactRef}
        className="md:snap-start min-h-screen md:h-screen w-full flex flex-col justify-between relative overflow-hidden pt-24"
      >
        <div className="max-w-7xl mx-auto px-6 w-full z-10 flex-grow flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">

            {/* Left side: Contact Info */}
            <div className={`lg:col-span-5 flex flex-col transition-all duration-1000 ${contactActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}>
              <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border w-fit ${isDarkMode ? "bg-violet-500/10 border-violet-500/20 text-violet-400" : "bg-indigo-50 border-indigo-100 text-indigo-600"
                }`}>
                Reach Out Today
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mt-5">
                Let's Fix It Fast!
              </h2>
              <p className={`mt-4 text-sm leading-relaxed font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}>
                Have a leak, installing a new boiler, or upgrading your bathroom fixture? Fill in the details to request a prompt quote from {BRAND_NAME}.
              </p>

              {/* Detail Blocks */}
              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-xl ${isDarkMode ? "bg-slate-900 text-violet-400" : "bg-indigo-50 text-indigo-700"}`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase font-bold block ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Direct Dispatch Phone</span>
                    <a href={`tel:${CONTACT_PHONE_RAW}`} className="text-base font-black hover:underline">{CONTACT_PHONE}</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className={`p-3 rounded-xl ${isDarkMode ? "bg-slate-900 text-violet-400" : "bg-indigo-50 text-indigo-700"}`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase font-bold block ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Inquiry Support Email</span>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-base font-black hover:underline">{CONTACT_EMAIL}</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className={`p-3 rounded-xl ${isDarkMode ? "bg-slate-900 text-violet-400" : "bg-indigo-50 text-indigo-700"}`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase font-bold block ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Working Schedule</span>
                    <span className="text-sm font-semibold block mt-0.5">Monday &ndash; Sunday: 24hrs / 7 Days Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Sleek booking form */}
            <div className={`lg:col-span-7 transition-all duration-1000 delay-200 ${contactActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}>
              <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${isDarkMode ? "bg-slate-900/40 border-slate-800/80" : "bg-white border-slate-200"
                }`}>
                {!isSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-505"
                          }`}>
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
                              ? "bg-slate-950 border-slate-800 focus:border-violet-500 text-white"
                              : "bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900"
                              }`}
                          />
                          <User className="w-4 h-4 text-slate-505 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                        {formErrors.name && <span className="text-[10px] text-rose-500 font-bold block mt-1 pl-1">{formErrors.name}</span>}
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-505"
                          }`}>
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
                              ? "bg-slate-950 border-slate-800 focus:border-violet-500 text-white"
                              : "bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900"
                              }`}
                          />
                          <Phone className="w-4 h-4 text-slate-505 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                        {formErrors.phone && <span className="text-[10px] text-rose-500 font-bold block mt-1 pl-1">{formErrors.phone}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Postcode input */}
                      <div>
                        <label className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-505"
                          }`}>
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
                              ? "bg-slate-950 border-slate-800 focus:border-violet-500 text-white"
                              : "bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900"
                              }`}
                          />
                          <MapPin className="w-4 h-4 text-slate-505 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                        {formErrors.postcode && <span className="text-[10px] text-rose-500 font-bold block mt-1 pl-1">{formErrors.postcode}</span>}
                      </div>

                      {/* Service select */}
                      <div>
                        <label className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-505"
                          }`}>
                          Service Required
                        </label>
                        <div className="relative">
                          <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleInputChange}
                            className={`w-full text-xs font-semibold p-3.5 pl-10 pr-8 rounded-xl outline-none border transition-all appearance-none ${isDarkMode
                              ? "bg-slate-950 border-slate-800 focus:border-violet-500 text-white"
                              : "bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900"
                              }`}
                          >
                            <option value="boiler-install">Boiler Installation & Upgrade</option>
                            <option value="emergency-repair">Emergency Pipe Repair</option>
                            <option value="blockage-clear">Blockage Clearing</option>
                            <option value="powerflush">System Powerflush</option>
                            <option value="fixture-fitting">Premium Fixtures Fitting</option>
                            <option value="gas-safety">Safety Inspection Certificate</option>
                          </select>
                          <Wrench className="w-4 h-4 text-slate-555 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>

                    {/* Details input */}
                    <div>
                      <label className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-505"
                        }`}>
                        Additional Details
                      </label>
                      <textarea
                        name="details"
                        rows={3}
                        value={formData.details}
                        onChange={handleInputChange}
                        placeholder="Please describe your plumbing requirements..."
                        className={`w-full text-xs font-semibold p-3.5 rounded-xl outline-none border transition-all resize-none ${isDarkMode
                          ? "bg-slate-950 border-slate-800 focus:border-violet-500 text-white"
                          : "bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900"
                          }`}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer select-none active:scale-[0.98] ${isDarkMode
                        ? "bg-violet-600 hover:bg-violet-500 text-white disabled:bg-violet-800"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white disabled:bg-indigo-800"
                        }`}
                    >
                      {isSubmitting ? "Processing Inquiry..." : "Submit Dispatch Request"}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12 animate-fade-in flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className={`text-xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      Inquiry Received Successfully!
                    </h3>
                    <p className={`text-xs sm:text-sm font-semibold max-w-sm mt-3 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}>
                      An engineer is checking your postcode. We will contact you at <span className="underline">{formData.phone}</span> within 10-15 minutes.
                    </p>
                    <button
                      onClick={resetForm}
                      className={`mt-6 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${isDarkMode ? "bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-slate-100 text-indigo-700 hover:bg-slate-200"
                        }`}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <footer className={`py-8 px-6 border-t z-10 transition-all ${isDarkMode ? "bg-[#05070a] border-slate-900" : "bg-[#f1f5f9] border-slate-200"
          }`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-2">
              <span className={`font-black ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>{BRAND_NAME} Portal</span>
              <span>&copy; {new Date().getFullYear()} Plumbing Templates Showroom.</span>
            </div>
            <div className="flex gap-6">
              <a href="#hero" className="hover:text-slate-350">Privacy Policy</a>
              <a href="#hero" className="hover:text-slate-355">Terms of SLA</a>
              <a href="#hero" className="hover:text-slate-360">Dispatch Map</a>
            </div>
          </div>
        </footer>

      </section>

      {/* Global CSS animations injected directly */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        html {
          scroll-behavior: smooth;
        }
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>

    </div>
  );
}
