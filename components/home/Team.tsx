"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const team = [
  {
    name: "Youssef Amrani",
    role: "Founder & Senior Driver",
    bio: "15+ years of professional driving across Morocco. Fluent in Arabic, French & English.",
    rating: 5.0,
    trips: "3,200+",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    accent: "from-terracotta/40 to-orange-400/20",
    lang: ["🇲🇦", "🇫🇷", "🇬🇧"],
  },
  {
    name: "Karim Idrissi",
    role: "Senior Chauffeur",
    bio: "Specialist in VIP airport transfers and Sahara excursions. Luxury vehicle expert.",
    rating: 4.9,
    trips: "1,800+",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    accent: "from-gold/40 to-yellow-400/20",
    lang: ["🇲🇦", "🇪🇸", "🇫🇷"],
  },
  {
    name: "Ahmed Tazi",
    role: "Fleet Manager",
    bio: "Keeps every vehicle immaculate and road-ready. Former mechanic with 10 years experience.",
    rating: 4.9,
    trips: "1,400+",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    accent: "from-blue-400/30 to-cyan-400/20",
    lang: ["🇲🇦", "🇫🇷"],
  },
  {
    name: "Fatima Benali",
    role: "Operations Manager",
    bio: "Coordinates all bookings and ensures every client has a seamless experience, 24/7.",
    rating: 5.0,
    trips: "5,000+",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    accent: "from-rose-400/30 to-pink-400/20",
    lang: ["🇲🇦", "🇫🇷", "🇬🇧"],
  },
];

function LiquidGlassCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [shine, setShine] = useState({ x: 50, y: 30 });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(rawY, { stiffness: 200, damping: 25 });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawY.set(((e.clientX - cx) / (rect.width / 2)) * 12);
    rawX.set(-((e.clientY - cy) / (rect.height / 2)) * 12);
    setShine({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function handleEnter() { setHovered(true); scale.set(1.04); }
  function handleLeave() { setHovered(false); scale.set(1); rawX.set(0); rawY.set(0); }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, scale, transformPerspective: 900, isolation: "isolate" } as any}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative rounded-3xl cursor-default select-none"
      >
        {/* Liquid glass base — solid fallback + blur overlay */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: "rgba(26, 26, 46, 0.55)",
            border: "1px solid rgba(255,255,255,0.28)",
            boxShadow: `
              0 24px 60px rgba(0,0,0,0.45),
              inset 0 1.5px 0 rgba(255,255,255,0.55),
              inset 0 -1px 0 rgba(255,255,255,0.08),
              inset 1px 0 0 rgba(255,255,255,0.15),
              inset -1px 0 0 rgba(255,255,255,0.08)
            `,
          }}
        />
        {/* Blur layer — separate so overflow:hidden doesn't kill backdrop-filter */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.07) 100%)",
          }}
        />

        {/* Glossy highlight arc — top specular */}
        <div
          className="absolute top-0 left-0 right-0 h-16 rounded-t-3xl pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.0) 100%)",
          }}
        />

        {/* Moving light refraction on hover */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.18) 0%, transparent 55%)`,
          }}
        />

        {/* Accent colour bleed through glass */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${member.accent} opacity-60 pointer-events-none`}
        />

        {/* Liquid border shimmer — animated */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={hovered ? { opacity: [0.4, 0.8, 0.4] } : { opacity: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            backgroundSize: "200% 100%",
          }}
        />

        {/* Card content */}
        <div className="relative z-10 p-6">
          {/* Avatar */}
          <div className="relative w-20 h-20 mx-auto mb-4">
            {/* Glow ring */}
            <motion.div
              className="absolute -inset-1 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.1))",
                boxShadow: "0 0 20px rgba(255,255,255,0.2)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/30">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center justify-center gap-0.5 mb-3">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-gold text-gold drop-shadow-sm" />
            ))}
            <span className="text-white/70 text-xs ml-1">{member.rating}</span>
          </div>

          {/* Name & Role */}
          <h3 className="text-white font-bold text-lg text-center leading-tight mb-1 drop-shadow-sm">
            {member.name}
          </h3>
          <p className="text-white/60 text-xs text-center font-medium uppercase tracking-wider mb-3">
            {member.role}
          </p>

          {/* Divider */}
          <div className="h-px bg-white/15 mx-4 mb-3" />

          {/* Bio */}
          <p className="text-white/70 text-xs text-center leading-relaxed mb-4">
            {member.bio}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between px-2">
            <div className="text-center">
              <p className="text-white font-bold text-sm">{member.trips}</p>
              <p className="text-white/45 text-[10px] uppercase tracking-wide">Trips</p>
            </div>
            <div className="w-px h-8 bg-white/15" />
            <div className="text-center">
              <div className="flex gap-1 justify-center">
                {member.lang.map((flag) => (
                  <span key={flag} className="text-base leading-none">{flag}</span>
                ))}
              </div>
              <p className="text-white/45 text-[10px] uppercase tracking-wide mt-0.5">Languages</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Team() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" id="team">
      {/* Rich background — gradient + pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#1a0a0a] to-[#0f0f1a]" />
      <div className="absolute inset-0 zellige-bg opacity-30" />

      {/* Ambient colour blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(181,69,27,0.18) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.14) 0%, transparent 70%)" }}
        animate={{ scale: [1.1, 1, 1.1], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-gold" />
            The People Behind the Wheel
            <span className="w-6 h-px bg-gold" />
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Meet Our Team
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Professional, licensed, and passionate about Morocco — every driver is handpicked for skill and hospitality.
          </p>
        </motion.div>

        {/* Glass cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {team.map((member, i) => (
            <LiquidGlassCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-white/30 text-xs mt-12 tracking-wide"
        >
          All drivers are licensed, insured, and background-checked · Average rating 4.96★ across 5,000+ trips
        </motion.p>
      </div>
    </section>
  );
}
