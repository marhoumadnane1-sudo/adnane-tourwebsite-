'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Shield, Clock, MapPin, Star, Users, Heart,
  Award, CheckCircle, ArrowRight, Phone,
} from 'lucide-react'

const stats = [
  { value: '2019', label: 'Founded',      sub: 'Over 6 years of service' },
  { value: '24/7', label: 'Availability', sub: 'We never close' },
  { value: '3',    label: 'Languages',    sub: 'Arabic · French · English' },
  { value: '100%', label: 'Licensed',     sub: 'Dossier N° 1754/T/2018' },
]

const values = [
  {
    icon: Clock,
    title: 'Always On Time',
    description: 'We understand that in travel, a missed minute can mean a missed flight. Our drivers are always early — never late. We track your flight in real time and adjust if needed.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: MapPin,
    title: 'Local Expertise',
    description: 'Born and based in Casablanca, we know every road, every shortcut, every hotel, and every landmark across Morocco. Our drivers are not just chauffeurs — they are local guides.',
    color: 'bg-amber-50 text-amber-700',
  },
  {
    icon: Shield,
    title: 'Fully Licensed & Insured',
    description: 'NIGOR 2Transport operates under official Moroccan tourism transport authorization (Dossier N° 1754/T/2018). Every journey is fully insured. Your safety is never optional.',
    color: 'bg-green-50 text-green-700',
  },
  {
    icon: Star,
    title: 'VIP Experience',
    description: 'From the moment your driver meets you with a name sign at arrivals, to the chilled water bottle waiting in the vehicle — every detail is designed to make you feel like a VIP.',
    color: 'bg-purple-50 text-purple-700',
  },
  {
    icon: Heart,
    title: 'Family Friendly',
    description: 'Traveling with children? We accommodate child seats, stroller space, and extra patience. Families are welcome and catered for on every journey.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Users,
    title: 'Available 24/7',
    description: 'Early morning flight at 4am? Late night arrival? We are always available. Book any time, travel any time. Morocco does not sleep and neither do we.',
    color: 'bg-indigo-50 text-indigo-700',
  },
]

const timeline = [
  {
    year: '2019',
    title: 'The Beginning',
    description: 'Carolina Prestige Travel was founded in Casablanca with a single mission: to give every tourist arriving in Morocco a first impression they would never forget.',
  },
  {
    year: '2021',
    title: 'Growing Through Difficulty',
    description: 'Even through the challenges of the pandemic, we maintained our fleet and our team — ready to serve the moment Morocco reopened its doors to the world.',
  },
  {
    year: '2023',
    title: 'NIGOR 2Transport Brand Launch',
    description: 'We launched NIGOR 2Transport as our premium transfer brand, expanding our routes to cover every major airport and city across the Kingdom.',
  },
  {
    year: '2025',
    title: 'Online Booking Platform',
    description: 'We launched our modern booking platform — making it easier than ever for travelers to book, confirm, and communicate with us before they even board their plane.',
  },
]

export default function AboutContent() {
  return (
    <div className="pt-20">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/40" />
        <div className="absolute inset-0 zellige-bg opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-gold/20 text-gold border border-gold/30 mb-6">
              <Award size={14} />
              Licensed Since 2019
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              We Move You.<br />
              <span className="text-gold">Morocco Moves You.</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
              Since 2019, NIGOR 2Transport has been the trusted choice for travelers
              who refuse to leave their comfort behind when they cross a border.
              Professional. Punctual. Passionate about Morocco.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book" className="btn-primary px-8 py-4">
                Book a Transfer
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/212661659607"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-8 py-4"
              >
                <Phone size={18} />
                Talk to Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────── */}
      <section className="bg-charcoal border-b border-white/10 zellige-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gold mb-1">{stat.value}</div>
                <div className="text-white font-semibold text-sm mb-0.5">{stat.label}</div>
                <div className="text-white/40 text-xs">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-6 h-px bg-terracotta" />
                Our Story
              </span>
              <h2 className="section-title mb-6">
                Born in Casablanca.<br />Built for Travelers.
              </h2>
              <div className="space-y-4 text-charcoal/60 leading-relaxed text-sm">
                <p>
                  It starts the moment you land. Tired from a long flight, unfamiliar
                  with the country, surrounded by noise — that first transfer sets the
                  tone for your entire trip. We started NIGOR 2Transport because we
                  believed every traveler deserved that moment to be seamless.
                </p>
                <p>
                  Founded in Casablanca in 2019 under Carolina Prestige Travel, we built
                  our reputation one transfer at a time. No shortcuts. No hidden fees.
                  No letting clients down. Just professional, licensed, punctual service
                  across the Kingdom of Morocco.
                </p>
                <p>
                  Today we cover every major airport and city in Morocco, with
                  multilingual drivers who speak your language and know every road.
                  Whether you are a solo traveler, a family on holiday, or a corporate
                  group on a business trip — we have the right vehicle and the right
                  driver waiting for you.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  'Official Tourism License',
                  'Fully Insured',
                  'Fixed Prices',
                  'No Hidden Fees',
                  'Flight Tracking',
                  'Free Waiting 90 min',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-sand/60 border border-sand-dark rounded-full text-xs font-medium text-charcoal/60"
                  >
                    <CheckCircle size={11} className="text-green-500" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Image collage */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=80"
                      alt="Premium sedan transfer Morocco"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                  <div className="relative h-32 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80"
                      alt="Morocco landscape"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-32 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"
                      alt="Marrakech Morocco"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80"
                      alt="Morocco transfer"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                </div>
              </div>

              {/* License badge overlay */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card-hover border border-sand-dark p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Shield size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal">Officially Licensed</p>
                  <p className="text-xs text-charcoal/40">Dossier N° 1754/T/2018</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-sand/30 zellige-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-terracotta" />
              Why Choose Us
              <span className="w-6 h-px bg-terracotta" />
            </span>
            <h2 className="section-title mb-4">What We Stand For</h2>
            <p className="section-subtitle">Six principles that guide every single transfer we make.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, boxShadow: '0 8px 40px rgba(26,26,46,0.12)' }}
                  className="bg-white rounded-2xl border border-sand shadow-card p-6 transition-colors duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${v.color}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-bold text-charcoal mb-2">{v.title}</h3>
                  <p className="text-sm text-charcoal/55 leading-relaxed">{v.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-terracotta" />
              Our Journey
              <span className="w-6 h-px bg-terracotta" />
            </span>
            <h2 className="section-title">From 2019 to Today</h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-terracotta via-gold to-green-400 hidden md:block" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-6 items-start"
                >
                  {/* Year bubble */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-terracotta flex items-center justify-center text-white font-bold text-sm shadow-glow relative z-10">
                    {item.year}
                  </div>
                  {/* Content */}
                  <div className="flex-1 pt-3 pb-6 border-b border-sand last:border-0">
                    <h3 className="text-base font-bold text-charcoal mb-1">{item.title}</h3>
                    <p className="text-sm text-charcoal/55 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 zellige-bg opacity-40" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Travel with Us?
            </h2>
            <p className="text-white/50 text-lg mb-8">
              Join thousands of satisfied travelers who chose NIGOR 2Transport
              for their Morocco journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/book" className="btn-primary px-10 py-4 text-base">
                  Book Your Transfer
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="https://wa.me/212661659607?text=Bonjour%20NIGOR%202Transport!%20Je%20voudrais%20r%C3%A9server%20un%20transfert."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost px-10 py-4 text-base"
                >
                  <Phone size={18} />
                  +212 661 659 607
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
