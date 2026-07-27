"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
    Wrench,
    Settings,
    Hammer,
    Droplets,
    Flame,
    Phone,
    ChevronDown,
    Star,
    Quote,
    Calendar,
    User,
    ArrowUpRight,
    Mail,
    MapPin,
    Sun,
    Moon,
    Menu,
    X,
} from "lucide-react";

// --- Module Configuration Patterns ---
const BUSINESS_NAME = "Plumbera";
const CONTACT_PHONE = "(234) 345-4574";
const FALLBACK_PHONE_ALT = "(907) 555-0101";
const CONTACT_EMAIL = "info@yourplumbera.com";
const CONTACT_ADDRESS = "2323 Dancing Dove Lane, Long Island City, NY 11101";

interface FAQItem {
    question: string;
    answer: string;
}

interface TestimonialItem {
    id: number;
    name: string;
    role?: string;
    rating: number;
    text: string;
}

interface BlogItem {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    imgUrl: string;
}

export default function Demo2Page() {
    const params = useParams();
    const brandParam = params?.brandName;
    const brandSlug = Array.isArray(brandParam) ? brandParam[0] : undefined;

    const formatBrandName = (slug: string | undefined) => {
        if (!slug) return "Plumbera";
        return decodeURIComponent(slug)
            .replace(/[-_]+/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const BUSINESS_NAME = formatBrandName(brandSlug);

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // State for FAQ toggles
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const heroContainerRef = useRef<HTMLDivElement>(null);
    const bgContainerRef = useRef<HTMLDivElement>(null); // ensure this ref is declared as well

    const particlesRef = useRef<Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        rotation: number;   // Added
        vRotation: number;  // Added
        baseX: number;
        baseY: number;
        scale: number;
        element: HTMLDivElement | null;
    }>>([]);

    useEffect(() => {
        // Set CSS custom property for scroll offset
        const handleScroll = () => {
            document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);

            // Compute local parallax offsets for elements relative to viewport center
            const parallaxEls = document.querySelectorAll('.parallax-element');
            const viewportHeight = window.innerHeight;
            parallaxEls.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.bottom >= 0 && rect.top <= viewportHeight) {
                    const elementCenter = rect.top + rect.height / 2;
                    const viewportCenter = viewportHeight / 2;
                    const distanceFromCenter = elementCenter - viewportCenter;
                    const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0.1');
                    const yOffset = distanceFromCenter * speed;
                    (el as HTMLElement).style.transform = `translate3d(0, ${yOffset}px, 0)`;
                }
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        // IntersectionObserver for reveal on scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const bgContainer = bgContainerRef.current;
        const heroContainer = heroContainerRef.current;
        if (!bgContainer || !heroContainer) return;

        const particles = particlesRef.current;
        const mouse = { x: -1000, y: -1000, active: false };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = heroContainer.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        heroContainer.addEventListener("mousemove", handleMouseMove, { passive: true });
        heroContainer.addEventListener("mouseleave", handleMouseLeave, { passive: true });

        let animationFrameId: number;

        const animate = () => {
            const width = bgContainer.clientWidth;
            const height = bgContainer.clientHeight;
            if (width === 0 || height === 0) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            particles.forEach((p) => {
                if (!p.element) return;

                // Move particle
                p.x += p.vx;
                p.y += p.vy;

                // 2. Continuous rotation increment logic
                p.rotation += p.vRotation;

                // Wrap boundaries
                if (p.x < -10) p.x = 110;
                else if (p.x > 110) p.x = -10;

                if (p.y < -10) p.y = 110;
                else if (p.y > 110) p.y = -10;

                const px = (p.x / 100) * width;
                const py = (p.y / 100) * height;

                let tx = px;
                let ty = py;

                // Cursor attraction
                if (mouse.active) {
                    const dx = mouse.x - px;
                    const dy = mouse.y - py;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 350) {
                        const force = (350 - dist) / 350 * 25 * p.scale;
                        const angle = Math.atan2(dy, dx);
                        tx += Math.cos(angle) * force;
                        ty += Math.sin(angle) * force;
                    }
                }

                // 3. Merged transform with cursor deflection + space rotation tracking
                p.element.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${p.scale}) rotate(${p.rotation}deg)`;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            heroContainer.removeEventListener("mousemove", handleMouseMove);
            heroContainer.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const faqData: FAQItem[] = [
        {
            question: "HOW OFTEN SHOULD I SERVICE MY HVAC SYSTEM?",
            answer: "It is highly recommended to service your heating and cooling system at least once a year. Ideally, schedule your AC tune-up in the spring and your furnace maintenance during the fall to ensure optimal performance year-round."
        },
        {
            question: "DO YOU OFFER EMERGENCY HVAC SERVICES?",
            answer: "Yes, we provide 24/7 emergency response for critical plumbing and HVAC failures. Our technicians are ready around the clock to address broken lines, major water leaks, or absolute heating failure when you need immediate protection."
        }
    ];

    const testimonials: TestimonialItem[] = [
        {
            id: 1,
            name: "BRADLEY LAWLOR",
            rating: 5,
            text: "The technicians were on time, explained everything clearly, and completed the job without any mess. Our home feels so much more comfortable now."
        },
        {
            id: 2,
            name: "PATRICIA SANDERS",
            rating: 5,
            text: "Our furnace stopped working at night, and they arrived within an hour. Excellent communication, professional service, truly lifesavers!"
        },
        {
            id: 3,
            name: "RHONDA RHODES",
            rating: 5,
            text: "Our AC broke down in the middle of summer, and their team arrived the same day. They fixed the issue quickly and even gave maintenance tips."
        },
        {
            id: 4,
            name: "STEPHANIE SHARKEY",
            rating: 5,
            text: "Their team inspected our old HVAC system, recommended a new energy-efficient model. The installation was smooth, energy bills dropped!"
        },
        {
            id: 5,
            name: "JOHN DUKES",
            rating: 5,
            text: "From scheduling to installation, everything was seamless. The staff was friendly, knowledgeable, and genuinely cared about getting the job done."
        },
        {
            id: 6,
            name: "AUTUMN PHILLIPS",
            rating: 5,
            text: "It's rare to find a company that truly cares about its customers. They didn't try to upsell, just fixed what was needed and explained everything."
        },
        {
            id: 7,
            name: "KIMBERLY MASTRANGELO",
            rating: 5,
            text: "Our business needed a full HVAC replacement, and their commercial team handled it efficiently, professionally. Couldn't be happier with results!"
        }
    ];

    const blogPosts: BlogItem[] = [
        {
            id: 1,
            title: "TOP 5 SIGNS YOUR HVAC SYSTEM NEEDS MAINTENANCE",
            excerpt: "Is your HVAC system making strange noises or struggling to maintain comfortable temperatures?",
            date: "Oct 8, 2025",
            author: "Eddie Blake",
            imgUrl: "/pipe-repair.png"
        },
        {
            id: 2,
            title: "CHOOSING THE RIGHT HVAC SYSTEM FOR YOUR HOME",
            excerpt: "Learn how to choose the perfect unit based on your home's square footage, efficiency needs, and localized climate profile.",
            date: "Oct 25, 2025",
            author: "James Hall",
            imgUrl: "/hero-plumber.png"
        }
    ];

    return (
        <div className={`selection:bg-blue-600 selection:text-white min-h-screen font-sans overflow-x-hidden antialiased transition-colors duration-300 ${
            isDarkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F4F6F8] text-[#0F162A]'
        }`}>

            {/* Global CSS Inject via style tag for animations, background alignment, custom shapes */}
            <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes customFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes customFloatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(8px) rotate(-4deg); }
        }
        .parallax-bg-layer {
          background-attachment: fixed;
          background-position: center;
          background-repeat: repeat;
        }
        .animate-float-slow {
          animation: customFloat 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: customFloatReverse 9s ease-in-out infinite;
        }
        .hero-mask-shape {
          border-radius: 40px 40px 40px 240px;
        }
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
          transition: opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-on-scroll.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .parallax-slow {
          transform: translateY(calc(var(--scroll-y, 0px) * 0.08));
          transition: transform 0.1s ease-out;
        }
        .parallax-element {
          will-change: transform;
          transition: transform 0.1s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

            {/* Sticky Luxury Header Navigation */}
            <div className="sticky top-4 z-50 w-full px-4 sm:px-8 md:px-16 pointer-events-none">
                <header className={`max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md px-4 sm:px-6 py-3.5 rounded-full border shadow-md pointer-events-auto transition-colors duration-300 ${
                    isDarkMode ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white/80 border-white/50 text-[#0F162A]'
                }`}>
                    <div className="flex items-center space-x-2 shrink-0">
                        <div className="hidden sm:flex bg-blue-600 text-white p-2 rounded-xl items-center justify-center">
                            <Wrench className="w-5 h-5 transform -rotate-45" strokeWidth={2.5} />
                        </div>
                        <span className={`text-base sm:text-xl font-black tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0F162A]'}`}>{BUSINESS_NAME}</span>
                    </div>

                    <nav className={`hidden lg:flex items-center space-x-8 font-semibold text-sm transition-colors duration-300 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                        <a href="#home" className="text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors">Home </a>
                        <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
                        <a href="#services" className="hover:text-blue-500 flex items-center gap-1 transition-colors">Services </a>
                        <a href="#faq" className="hover:text-blue-500 flex items-center gap-1 transition-colors">FAQs </a>
                        <a href="#testimonials" className="hover:text-blue-500 flex items-center gap-1 transition-colors">Testimonials </a>
                        <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
                    </nav>

                    <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2.5 rounded-full border transition-colors flex items-center justify-center pointer-events-auto ${
                                isDarkMode
                                    ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                                    : 'bg-slate-100 border-gray-200 text-gray-700 hover:bg-slate-200'
                            }`}
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>

                        <a
                            href={`tel:${CONTACT_PHONE}`}
                            className="flex items-center justify-center bg-[#F4C430] hover:bg-amber-500 text-slate-950 p-2.5 sm:px-4 sm:py-2.5 rounded-full shadow-sm transition-colors pointer-events-auto shrink-0 gap-2 border border-amber-400/20"
                            title="Call Support Now"
                        >
                            <Phone className="w-4 h-4 fill-current shrink-0" />
                            <span className="hidden sm:block text-xs font-black uppercase tracking-wider">{CONTACT_PHONE}</span>
                        </a>

                        {/* Hamburger Button for Mobile Navigation */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className={`p-2.5 rounded-full border transition-colors flex lg:hidden items-center justify-center pointer-events-auto ${
                                isDarkMode
                                    ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                                    : 'bg-slate-100 border-gray-200 text-gray-700 hover:bg-slate-200'
                            }`}
                            title="Toggle Menu"
                        >
                            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </header>

                {/* Mobile Dropdown Menu Drawer */}
                <div className={`absolute top-full left-4 right-4 mt-2 p-6 rounded-[2rem] border shadow-xl flex flex-col space-y-4 pointer-events-auto transition-all duration-300 ease-in-out origin-top z-50 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-200 text-slate-950'
                } ${
                    menuOpen
                        ? 'opacity-100 translate-y-0 scale-100 visible'
                        : 'opacity-0 -translate-y-4 scale-95 invisible pointer-events-none'
                }`}>
                    <a href="#home" onClick={() => setMenuOpen(false)} className="font-extrabold text-sm uppercase tracking-wide hover:text-blue-500 transition-colors">Home</a>
                    <a href="#about" onClick={() => setMenuOpen(false)} className="font-extrabold text-sm uppercase tracking-wide hover:text-blue-500 transition-colors">About</a>
                    <a href="#services" onClick={() => setMenuOpen(false)} className="font-extrabold text-sm uppercase tracking-wide hover:text-blue-500 transition-colors">Services</a>
                    <a href="#faq" onClick={() => setMenuOpen(false)} className="font-extrabold text-sm uppercase tracking-wide hover:text-blue-500 transition-colors">FAQs</a>
                    <a href="#testimonials" onClick={() => setMenuOpen(false)} className="font-extrabold text-sm uppercase tracking-wide hover:text-blue-500 transition-colors">Testimonials</a>
                    <a href="#contact" onClick={() => setMenuOpen(false)} className="font-extrabold text-sm uppercase tracking-wide hover:text-blue-500 transition-colors">Contact</a>
                </div>
            </div>

            {/* SECTION 1: MASTER HERO CONTAINER WITH FULL HEADER & ICON PATTERNS */}
            <div id="home" ref={heroContainerRef} className={`relative w-full px-4 sm:px-8 md:px-16 pt-6 pb-20 rounded-b-[40px] overflow-hidden border-b transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-900 border-slate-800/80' : 'bg-[#EBF1F6] border-gray-200/50'
            }`}>

                <div ref={bgContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
                    {Array.from({ length: 40 }).map((_, idx) => {
                        const IconComponent = [Wrench, Settings, Hammer, Droplets][idx % 4];

                        // 1. Determine size categorization based on the index remainder
                        const sizeTier = idx % 3; // 0 = Small, 1 = Medium, 2 = Large
                        const scale = 0.5 + sizeTier * 0.25; // 0.5, 0.75, 1.0

                        // 2. Map size categories to your explicit opacity requirements
                        const opacity = sizeTier === 0 ? 0.1 : sizeTier === 1 ? 0.15 : 0.3;

                        return (
                            <div
                                key={idx}
                                ref={(el) => {
                                    if (el) {
                                        particlesRef.current[idx] = {
                                            x: Math.random() * 100,
                                            y: Math.random() * 100,
                                            vx: (Math.random() - 0.5) * 0.05,
                                            vy: (Math.random() - 0.5) * 0.05,
                                            rotation: Math.random() * 360,          // Starting angle in degrees
                                            vRotation: (Math.random() - 0.5) * 0.5, // Rotation speed & direction
                                            baseX: 0,
                                            baseY: 0,
                                            scale: scale,
                                            element: el
                                        };
                                    }
                                }}
                                className="absolute left-0 top-0 p-4 will-change-transform"
                                style={{ opacity: opacity }} // Dynamic base opacity applied here
                            >
                                <IconComponent className={`w-16 h-16 transition-colors duration-300 ${isDarkMode ? 'text-blue-400' : 'text-[#0F162A]'}`} strokeWidth={1.5} />
                            </div>
                        );
                    })}
                </div>

                {/* Hero Central Content Layout Grid */}
                <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">

                    {/* Left Text Infrastructure */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className={`inline-flex backdrop-blur-sm text-xs font-extrabold tracking-widest uppercase px-5 py-2 rounded-full border shadow-xs transition-colors duration-300 ${
                            isDarkMode ? 'bg-slate-950/80 text-slate-300 border-slate-800' : 'bg-white/80 text-gray-700 border-gray-300/60'
                        }`}>
                            # NO1 HVAC & PLUMBING SERVICES
                        </div>

                        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight uppercase transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-[#0F162A]'
                        }`}>
                            FAST, AFFORDABLE <br />
                            <span className="text-blue-600">&amp; ENERGY EFFICIENT</span> <br />
                            HVAC SERVICES
                        </h1>

                        <p className={`text-base max-w-xl leading-relaxed font-medium transition-colors duration-300 ${
                            isDarkMode ? 'text-slate-400' : 'text-gray-600'
                        }`}>
                            We&apos;re your local HVAC experts dedicated to keeping your family comfortable through every season. With same day service, honest pricing, and guaranteed results, you can trust us to handle all your needs.
                        </p>

                        <div className="pt-2">
                            <button className="bg-[#F4C430] hover:bg-amber-500 text-slate-950 font-extrabold px-9 py-4.5 rounded-full shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 tracking-wide text-sm uppercase">
                                Request HVAC Service
                            </button>
                        </div>

                        {/* Performance Metric Counters */}
                        <div className={`grid grid-cols-3 gap-6 pt-10 border-t max-w-md transition-colors duration-300 ${
                            isDarkMode ? 'border-slate-800' : 'border-gray-300/70'
                        }`}>
                            <div>
                                <h3 className={`text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0F162A]'}`}>4.5K+</h3>
                                <p className={`text-xs font-bold uppercase mt-1 tracking-wider transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Projects Done</p>
                            </div>
                            <div>
                                <h3 className={`text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0F162A]'}`}>13K+</h3>
                                <p className={`text-xs font-bold uppercase mt-1 tracking-wider transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Satisfied Customers</p>
                            </div>
                            <div>
                                <h3 className={`text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0F162A]'}`}>10+</h3>
                                <p className={`text-xs font-bold uppercase mt-1 tracking-wider transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Years Experience</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Polygon Cutout Frame — matches reference design */}
                    <div className="lg:col-span-5 relative flex justify-center lg:justify-end">

                        {/* Outer blue border layer — same polygon clip, provides the blue stroke */}
                        <div
                            className="relative shadow-2xl shadow-blue-600/25 parallax-element"
                            data-parallax-speed="-0.04"
                            style={{
                                width: '420px',
                                maxWidth: '100%',
                                aspectRatio: '4/5',
                                clipPath: 'polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 22%)',
                                backgroundColor: '#2563eb',
                                padding: '13px',
                            }}
                        >
                            {/* Inner image container — same clip applied to image bounds */}
                            <div
                                className="relative w-full h-full overflow-hidden"
                                style={{
                                    clipPath: 'polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 22%)',
                                }}
                            >
                                <Image
                                    src="/hero-plumber.png"
                                    alt="HVAC Technician working on condenser unit"
                                    fill
                                    priority
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                            </div>
                        </div>

                        {/* Spinning gear badge decoration */}
                        <div className="absolute -bottom-6 left-6 bg-amber-400 text-slate-950 p-4 rounded-2xl shadow-xl shadow-amber-400/30 animate-float-slow hidden sm:block parallax-element" data-parallax-speed="0.04">
                            <Settings className="w-8 h-8 animate-spin" style={{ animationDuration: '20s' }} />
                        </div>
                    </div>


                </div>
            </div>


            {/* SECTION 2: TRUSTED EXPERT VALUE PROPOSITION SECTION */}
            <section id="about" className={`py-24 px-4 sm:px-8 md:px-16 border-b reveal-on-scroll transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-gray-100'
            }`}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Text Block */}
                    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                        <div className={`inline-flex text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border transition-colors duration-300 ${
                            isDarkMode ? 'bg-blue-950/40 text-blue-400 border-blue-900/50' : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                            ABOUT US
                        </div>
                        <h2 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-[#0F162A]'
                        }`}>
                            TRUSTED HVAC EXPERT <br /> YOU CAN COUNT ON
                        </h2>
                        <p className={`font-medium leading-relaxed transition-colors duration-300 ${
                            isDarkMode ? 'text-slate-400' : 'text-gray-500'
                        }`}>
                            At Plumbera, your comfort comes first. We take pride in offering fast, friendly, and affordable HVAC solutions designed to keep your home or business comfortable through every season.
                        </p>
                        <p className={`font-medium leading-relaxed transition-colors duration-300 ${
                            isDarkMode ? 'text-slate-400' : 'text-gray-500'
                        }`}>
                            Our skilled technicians are always ready to go the extra mile for you. We&apos;re a team licensed HVAC professionals dedicated to providing reliable heating, cooling, and air flow metrics.
                        </p>
                        <div className="pt-2">
                            <button className="bg-[#F4C430] hover:bg-amber-500 text-slate-950 font-extrabold px-8 py-3.5 rounded-full shadow-md shadow-amber-500/10 transition-all text-xs uppercase tracking-wider">
                                Learn More About Us
                            </button>
                        </div>
                    </div>

                    {/* Right Photo Composition Matrix */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-stretch">
                        <div className={`sm:col-span-7 relative h-[380px] rounded-[2rem] overflow-hidden shadow-lg border parallax-element transition-colors duration-300 ${
                            isDarkMode ? 'border-slate-800' : 'border-gray-100'
                        }`} data-parallax-speed="-0.04">
                            <Image
                                src="/plumber-worker.png"
                                alt="Main technician workspace inspection setup"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="sm:col-span-5 flex flex-col justify-between gap-6">
                            {/* Dynamic Branding Round Circular Rotating Badge */}
                            <div className="relative w-full max-w-[280px] mx-auto aspect-square bg-blue-600 rounded-full flex flex-col items-center justify-center text-white text-center p-6 shadow-xl shadow-blue-600/20 overflow-hidden group parallax-element" data-parallax-speed="-0.08">
                                <div className="absolute inset-0 border-4 border-dashed border-white/20 rounded-full animate-spin" style={{ animationDuration: '40s' }}></div>
                                <div className="relative z-10 flex flex-col items-center justify-center">
                                    <ArrowUpRight className="w-10 h-10 mb-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    <p className="text-xs font-black tracking-widest uppercase">SUCCESS BRAND</p>
                                    <p className="text-[10px] opacity-80 mt-1 uppercase font-bold">WITH DEMO2</p>
                                </div>
                            </div>

                            <div className={`relative h-[200px] rounded-[2rem] overflow-hidden shadow-lg border parallax-element transition-colors duration-300 ${
                                isDarkMode ? 'border-slate-800' : 'border-gray-100'
                            }`} data-parallax-speed="0.04">
                                <Image
                                    src="/pipe-repair.png"
                                    alt="Technician looking at secondary pipes"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            {/* SECTION 2.5: SERVICES SECTION */}
            <section id="services" className={`relative py-24 px-4 sm:px-8 md:px-16 border-b reveal-on-scroll overflow-hidden transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-900 border-slate-800/80' : 'bg-gray-50 border-gray-200/50'
            }`}>
                {/* Floating Parallax Background Elements */}
                <div className={`absolute top-12 left-12 w-28 h-28 rounded-full pointer-events-none z-0 parallax-element transition-colors duration-300 ${
                    isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100/40'
                }`} data-parallax-speed="0.1" />
                <div className={`absolute bottom-16 right-16 w-36 h-36 rounded-full pointer-events-none z-0 parallax-element transition-colors duration-300 ${
                    isDarkMode ? 'bg-amber-900/15' : 'bg-amber-100/35'
                }`} data-parallax-speed="-0.08" />
                <div className="max-w-7xl mx-auto space-y-16">
                    {/* Header */}
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <div className={`inline-flex text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border transition-colors duration-300 ${
                            isDarkMode ? 'bg-blue-950/40 text-blue-400 border-blue-900/50' : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                            OUR SERVICES
                        </div>
                        <h2 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-[#0F162A]'
                        }`}>
                            PREMIUM HVAC &amp; PLUMBING SOLUTIONS
                        </h2>
                        <p className={`font-medium leading-relaxed transition-colors duration-300 ${
                            isDarkMode ? 'text-slate-400' : 'text-gray-500'
                        }`}>
                            Certified diagnostics, same-day repairs, and high-efficiency installations backed by our 100% satisfaction guarantee.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                img: "/boiler-installation.png",
                                icon: <Flame className="w-5 h-5 text-white" />,
                                title: "HEATING & FURNACE SYSTEMS",
                                desc: "Complete repair, tune-ups, and installations of energy-efficient boiler and furnace units.",
                                features: ["Boiler repairs & replacement", "Thermostat integration", "Annual system tune-ups"]
                            },
                            {
                                img: "/support-bg.png",
                                icon: <Settings className="w-5 h-5 text-white" />,
                                title: "AIR CONDITIONING & COOLING",
                                desc: "Keep your home cool with professional AC diagnostic care, filter swaps, and condenser repair.",
                                features: ["AC installation & repair", "Coolant recharge", "Filter replacements"]
                            },
                            {
                                img: "/pipe-repair.png",
                                icon: <Droplets className="w-5 h-5 text-white" />,
                                title: "EMERGENCY PLUMBING WORKS",
                                desc: "Rapid response stopping burst copper lines, clogged waste pipes, and major water leaks.",
                                features: ["Leak isolation & patching", "Drain clearing & jetting", "Tap & valve replacements"]
                            }
                        ].map((srv, idx) => (
                            <div key={idx} className={`rounded-[2.5rem] overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between h-full ${
                                isDarkMode ? 'bg-slate-950 border-slate-850/60' : 'bg-white border-gray-250/50'
                            }`}>
                                <div>
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                                        <Image
                                            src={srv.img}
                                            alt={srv.title}
                                            fill
                                            className="object-cover group-hover:scale-103 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-blue-600 p-2.5 rounded-2xl shadow-md z-10 flex items-center justify-center">
                                            {srv.icon}
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-8 space-y-4">
                                         <h3 className={`text-lg font-black uppercase tracking-wide leading-snug transition-colors duration-300 ${
                                             isDarkMode ? 'text-white' : 'text-[#0F162A]'
                                         }`}>
                                            {srv.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                            {srv.desc}
                                        </p>
                                        <ul className="space-y-2.5 pt-2">
                                            {srv.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-center gap-2 text-xs text-gray-600 font-bold">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Footer Button */}
                                <div className="p-8 pt-0">
                                    <button className="w-full bg-[#F4C430] hover:bg-amber-500 text-slate-950 font-extrabold py-3.5 rounded-full shadow-md shadow-amber-500/5 transition-all text-xs uppercase tracking-wider">
                                        Book Service
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* SECTION 3: FAQ MULTI-ACCORDION ACQUISITION PORTAL */}
            <section id="faq" className={`py-20 px-4 sm:px-8 md:px-16 border-b reveal-on-scroll transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#EBF1F6] border-gray-200'
            }`}>
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-3">
                        <p className={`text-xs font-black tracking-widest uppercase transition-colors duration-300 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>STILL HAVE QUESTIONS? WE&apos;RE HERE TO HELP</p>
                        <div className="inline-block bg-[#F4C430] text-slate-950 text-xs font-bold px-4 py-1 rounded-full uppercase">FAQ Portal</div>
                    </div>

                    <div className="space-y-4 pt-4">
                        {faqData.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className={`rounded-[2rem] border overflow-hidden shadow-sm transition-all duration-300 ${
                                        isDarkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-white border-gray-200/60'
                                    }`}
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                        className={`w-full text-left px-8 py-6 flex items-center justify-between font-black text-sm sm:text-base tracking-wide transition-colors duration-300 ${
                                            isDarkMode ? 'text-white hover:bg-slate-900/50' : 'text-[#0F162A] hover:bg-slate-50/50'
                                        }`}
                                    >
                                        <span className="uppercase">{faq.question}</span>
                                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-blue-650' : ''}`} />
                                    </button>

                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[300px] border-t border-gray-100' : 'max-h-0'} ${
                                        isDarkMode ? 'border-slate-800' : 'border-gray-100'
                                    }`}>
                                        <p className={`px-8 py-6 text-sm leading-relaxed font-medium transition-colors duration-300 ${
                                            isDarkMode ? 'text-slate-400 bg-slate-900/20' : 'text-gray-600 bg-slate-50/30'
                                        }`}>
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-4 rounded-full shadow-lg shadow-blue-600/10 text-xs uppercase tracking-widest transition-all">
                            Contact Us Directly
                        </button>
                        <div className={`flex items-center space-x-3 px-6 py-3.5 rounded-full border shadow-xs transition-colors duration-300 ${
                            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'
                        }`}>
                            <Phone className="w-4 h-4 text-blue-500" />
                            <span className={`text-sm font-extrabold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0F162A]'}`}>{CONTACT_PHONE}</span>
                        </div>
                    </div>
                </div>
            </section>


            {/* SECTION 4: TESTIMONIALS MASONRY GRID ROW */}
            <section id="testimonials" className={`py-24 px-4 sm:px-8 md:px-16 reveal-on-scroll transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-950' : 'bg-white'
            }`}>
                <div className="max-w-7xl mx-auto space-y-12">

                    <div className="text-center space-y-3 max-w-xl mx-auto">
                        <div className={`inline-block text-[10px] font-black tracking-widest uppercase px-4 py-1 rounded-full border shadow-2xs transition-colors duration-300 ${
                            isDarkMode ? 'bg-blue-950/40 text-blue-400 border-blue-900/50' : 'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                            TESTIMONIALS
                        </div>
                        <h2 className={`text-3xl font-black uppercase tracking-tight transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-[#0F162A]'
                        }`}>WHAT OUR CUSTOMERS SAY</h2>
                    </div>

                    {/* Fully responsive layout rendering reviews seamlessly */}
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:balance]">
                        {testimonials.map((item) => (
                            <div
                                key={item.id}
                                className={`break-inside-avoid rounded-[2rem] p-8 border shadow-xs flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 ${
                                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#F8FAFC] border-gray-200/50'
                                }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex space-x-1 text-amber-400">
                                            {Array.from({ length: item.rating }).map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                        <div className="bg-blue-100/60 text-blue-600 p-2 rounded-full">
                                            <Quote className="w-4 h-4 transform rotate-180" />
                                        </div>
                                    </div>
                                     <p className={`text-sm leading-relaxed font-medium italic mb-6 transition-colors duration-300 ${
                                         isDarkMode ? 'text-slate-300' : 'text-gray-600'
                                     }`}>
                                        &ldquo;{item.text}&rdquo;
                                    </p>
                                </div>

                                <div className={`flex items-center space-x-3 pt-4 border-t transition-colors duration-300 ${
                                    isDarkMode ? 'border-slate-800' : 'border-gray-200/60'
                                }`}>
                                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                         <h4 className={`text-xs font-black uppercase tracking-wider transition-colors duration-300 ${
                                             isDarkMode ? 'text-white' : 'text-[#0F162A]'
                                         }`}>{item.name}</h4>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Verified Client</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* SECTION 6: CLOSING CTA PORTAL SECTION WITH PLUMBER ICON WATERMARKS */}
            <section id="contact" className={`relative py-20 px-4 sm:px-8 md:px-16 overflow-hidden border-b transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#EBF1F6] border-gray-200/50'
            }`}>

                {/* PARALLAX LAYER FOR FOOTER BACKGROUND CALLOUT */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] parallax-bg-layer flex justify-between items-center px-12 select-none">
                    <Wrench className={`w-48 h-48 transform rotate-45 animate-float-slow transition-colors duration-300 ${isDarkMode ? 'text-blue-500/20' : 'text-[#0F162A]'}`} />
                    <Settings className={`w-64 h-64 transform -rotate-12 animate-float-reverse transition-colors duration-300 ${isDarkMode ? 'text-blue-500/20' : 'text-[#0F162A]'}`} />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
                    <h2 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0F162A]'}`}>NEED FAST HVAC SERVICE? WE&apos;RE READY 24/7!</h2>
                    <p className={`font-medium text-sm sm:text-base max-w-xl mx-auto leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        Don&apos;t let a broken AC or heater ruin your comfort. Our emergency technicians are available day and night to get your system running again. Call now for immediate assistance!
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <button className="bg-[#F4C430] hover:bg-amber-500 text-slate-950 font-black px-8 py-4 rounded-full text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20 transition-all">
                            Call Now
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-full text-xs uppercase tracking-widest shadow-lg shadow-blue-600/10 transition-all">
                            {FALLBACK_PHONE_ALT}
                        </button>
                    </div>
                </div>
            </section>


            {/* SECTION 7: MASTER STRUCTURAL DATA FOOTER */}
            <footer className={`pt-16 pb-8 px-4 sm:px-8 md:px-16 border-t transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-gray-100'
            }`}>
                <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b transition-colors duration-300 ${
                    isDarkMode ? 'border-slate-900' : 'border-gray-100'
                }`}>

                    {/* Column 1: Identity Profile */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="bg-blue-600 text-white p-2 rounded-xl flex items-center justify-center">
                                <Wrench className="w-5 h-5 transform -rotate-45" />
                            </div>
                            <span className={`text-xl font-extrabold tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0F162A]'}`}>{BUSINESS_NAME}</span>
                        </div>
                        <p className={`text-xs font-medium leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>
                            Premium localized plumbing, ventilation, operational layout components, and comprehensive structural diagnostics for modern environments.
                        </p>
                        <div className="flex items-center space-x-3 text-gray-400 pt-2">
                        </div>
                    </div>

                    {/* Column 2: Operation Hours */}
                    <div className="space-y-4">
                        <h3 className={`text-xs font-black uppercase tracking-widest transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0F162A]'}`}>WORKING HOURS</h3>
                        <ul className={`space-y-2 text-xs font-semibold transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            <li className="flex justify-between"><span>Mon - Fri:</span> <span className={isDarkMode ? 'text-slate-200' : 'text-gray-700'}>8:00 AM - 6:00 PM</span></li>
                            <li className="flex justify-between"><span>Sat:</span> <span className={isDarkMode ? 'text-slate-200' : 'text-gray-700'}>9:00 AM - 3:00 PM</span></li>
                            <li className="flex justify-between"><span>Sun:</span> <span className="text-red-500 font-bold">Closed | Emergency Only</span></li>
                        </ul>
                    </div>

                    {/* Column 3: Navigation Links */}
                    <div className="space-y-4">
                        <h3 className={`text-xs font-black uppercase tracking-widest transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0F162A]'}`}>QUICK LINKS</h3>
                        <div className={`grid grid-cols-2 gap-2 text-xs font-bold transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            <a href="#home" className="hover:text-blue-500 transition-colors">Home</a>
                            <a href="#services" className="hover:text-blue-500 transition-colors">Services</a>
                            <a href="#about" className="hover:text-blue-500 transition-colors">About Us</a>
                            <a href="#testimonials" className="hover:text-blue-500 transition-colors">Testimonials</a>
                            <a href="#contact" className="hover:text-blue-500 transition-colors">Contact Us</a>
                            <a href="#faq" className="hover:text-blue-500 transition-colors">FAQs</a>
                        </div>
                    </div>

                    {/* Column 4: Contact Core Infrastructure */}
                    <div className="space-y-4">
                        <h3 className={`text-xs font-black uppercase tracking-widest transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0F162A]'}`}>CONTACT US</h3>
                        <ul className={`space-y-3 text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            <li className="flex items-start gap-2">
                                <Phone className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                <span className={`font-bold transition-colors duration-300 ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>{FALLBACK_PHONE_ALT}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                <span>{CONTACT_ADDRESS}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                <span className="underline break-all">{CONTACT_EMAIL}</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Footer Sub-Attribution Banner */}
                <div className={`max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold uppercase tracking-wider gap-4 border-t transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-500 border-slate-900/60' : 'text-gray-400 border-gray-100'
                }`}>
                    <p>&copy; Copyright {new Date().getFullYear()} {BUSINESS_NAME}. All Rights Reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-gray-500 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-600 transition-colors">Terms Of Condition</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}