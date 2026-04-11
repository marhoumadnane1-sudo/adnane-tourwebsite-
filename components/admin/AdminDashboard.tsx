'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LogOut, RefreshCw, Search, Filter,
  CheckCircle, Clock, XCircle, Car,
  Phone, Mail, Calendar, MapPin,
  Users, TrendingUp, DollarSign, AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Status = 'pending' | 'confirmed' | 'completed' | 'cancelled'

interface Booking {
  id: string
  createdAt: string
  status: Status
  serviceType: string
  airportCode?: string
  fromCity?: string
  toCity?: string
  destinationCity?: string
  baseCity?: string
  date: string
  time: string
  passengers: number
  vehicleType: string
  totalPrice: number
  currency: string
  fullName: string
  email: string
  phone: string
  flightNumber?: string
  pickupAddress?: string
  dropoffAddress?: string
  specialRequests?: string
  paymentMethod: string
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; icon: React.ElementType }> = {
  pending:   { label: 'Pending',   color: 'bg-amber-100 text-amber-700 border-amber-200',  icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-700 border-blue-200',    icon: CheckCircle },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700 border-red-200',       icon: XCircle },
}

const VEHICLE_LABELS: Record<string, string> = {
  skoda: 'Skoda Superb',
  'mercedes-e': 'Mercedes E-Class',
  vito: 'Mercedes Vito',
  sprinter: 'Mercedes Sprinter',
}

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        <Icon size={18} />
      </div>
      <div className="text-2xl font-bold text-charcoal">{value}</div>
      <div className="text-sm font-medium text-gray-700 mt-0.5">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Status | 'all'>('all')
  const [selected, setSelected] = useState<Booking | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings')
      if (res.status === 401) { router.push('/admin/login'); return }
      const data = await res.json()
      setBookings(data)
    } catch {}
    setLoading(false)
  }, [router])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  const updateStatus = async (id: string, status: Status) => {
    setUpdating(id)
    await fetch('/api/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
    setUpdating(null)
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const filtered = bookings.filter(b => {
    const matchStatus = filter === 'all' || b.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q || [b.fullName, b.id, b.phone, b.fromCity, b.toCity, b.destinationCity, b.airportCode]
      .some(v => v?.toLowerCase().includes(q))
    return matchStatus && matchSearch
  })

  const total = bookings.length
  const pending = bookings.filter(b => b.status === 'pending').length
  const confirmed = bookings.filter(b => b.status === 'confirmed').length
  const revenue = bookings.filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0)

  const getRoute = (b: Booking) => {
    if (b.serviceType === 'airport') return `${b.airportCode} ↔ ${b.destinationCity}`
    if (b.serviceType === 'city-to-city') return `${b.fromCity} → ${b.toCity}`
    return `Day hire — ${b.baseCity}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-charcoal border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-terracotta to-terracotta-dark flex items-center justify-center text-white font-bold text-xs">N2</div>
            <div>
              <span className="text-white font-semibold text-sm">NIGOR 2Transport</span>
              <span className="text-white/40 text-xs ml-2">Admin Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchBookings} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={logout} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors text-sm">
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={TrendingUp}  label="Total Bookings" value={total}     color="bg-blue-50 text-blue-600" />
          <StatCard icon={AlertCircle} label="Pending"        value={pending}   sub="Needs confirmation" color="bg-amber-50 text-amber-600" />
          <StatCard icon={CheckCircle} label="Confirmed"      value={confirmed} color="bg-green-50 text-green-600" />
          <StatCard icon={DollarSign}  label="Total Revenue"  value={`${revenue.toLocaleString()} DH`} sub="Excl. cancelled" color="bg-purple-50 text-purple-600" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ref, phone, route..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-9 py-2.5 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={15} className="text-gray-400" />
            {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all capitalize',
                  filter === s
                    ? 'bg-terracotta text-white border-terracotta'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-terracotta/30'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table + Detail panel */}
        <div className="flex gap-6">
          {/* Bookings list */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
                <RefreshCw size={24} className="animate-spin mx-auto mb-3" />
                Loading bookings...
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
                No bookings found.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map(b => {
                  const Cfg = STATUS_CONFIG[b.status]
                  const StatusIcon = Cfg.icon
                  return (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setSelected(b)}
                      className={cn(
                        'bg-white rounded-2xl border shadow-sm p-5 cursor-pointer hover:shadow-md transition-all duration-200',
                        selected?.id === b.id ? 'border-terracotta ring-1 ring-terracotta/20' : 'border-gray-100'
                      )}
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-charcoal">{b.fullName}</span>
                            <span className="text-xs text-gray-400 font-mono">{b.id}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                            <span className="flex items-center gap-1"><Car size={11} />{VEHICLE_LABELS[b.vehicleType] || b.vehicleType}</span>
                            <span className="flex items-center gap-1"><MapPin size={11} />{getRoute(b)}</span>
                            <span className="flex items-center gap-1"><Calendar size={11} />{b.date} {b.time}</span>
                            <span className="flex items-center gap-1"><Users size={11} />{b.passengers} pax</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-bold text-terracotta text-sm">{b.totalPrice?.toLocaleString()} DH</div>
                            <div className="text-xs text-gray-400 capitalize">{b.paymentMethod?.replace('-', ' ')}</div>
                          </div>
                          <span className={cn('flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border', Cfg.color)}>
                            <StatusIcon size={11} />
                            {Cfg.label}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-80 shrink-0 hidden lg:block"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-charcoal">Booking Details</h3>
                  <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
                </div>

                <div className="bg-gray-50 rounded-xl px-4 py-3 mb-5 text-center">
                  <p className="text-xs text-gray-400 mb-0.5">Reference</p>
                  <p className="font-bold text-charcoal font-mono text-sm">{selected.id}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>

                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={14} className="text-gray-400 shrink-0" />
                    <span className="font-medium">{selected.fullName}</span>
                  </div>
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-sm text-terracotta hover:underline">
                    <Phone size={14} className="shrink-0" />
                    {selected.phone}
                  </a>
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-sm text-terracotta hover:underline truncate">
                    <Mail size={14} className="shrink-0" />
                    {selected.email}
                  </a>
                  {selected.flightNumber && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-mono">✈ {selected.flightNumber}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4 mb-5 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Route</span><span className="font-medium text-right text-xs">{getRoute(selected)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Date</span><span className="font-medium">{selected.date} {selected.time}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Vehicle</span><span className="font-medium">{VEHICLE_LABELS[selected.vehicleType]}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Passengers</span><span className="font-medium">{selected.passengers}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Payment</span><span className="font-medium capitalize">{selected.paymentMethod?.replace('-', ' ')}</span></div>
                  <div className="flex justify-between border-t border-gray-100 pt-2 mt-2">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-terracotta">{selected.totalPrice?.toLocaleString()} DH</span>
                  </div>
                </div>

                {selected.pickupAddress && (
                  <div className="text-xs text-gray-500 mb-4 bg-gray-50 rounded-lg p-3">
                    <p className="font-medium text-gray-700 mb-1">Pickup:</p>
                    <p>{selected.pickupAddress}</p>
                    {selected.dropoffAddress && (
                      <>
                        <p className="font-medium text-gray-700 mt-2 mb-1">Drop-off:</p>
                        <p>{selected.dropoffAddress}</p>
                      </>
                    )}
                  </div>
                )}

                {selected.specialRequests && (
                  <div className="text-xs text-gray-500 mb-4 bg-amber-50 rounded-lg p-3 border border-amber-100">
                    <p className="font-medium text-amber-700 mb-1">Special Requests:</p>
                    <p>{selected.specialRequests}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Update Status</p>
                  {(['pending', 'confirmed', 'completed', 'cancelled'] as Status[]).map(s => {
                    const Cfg = STATUS_CONFIG[s]
                    const Icon = Cfg.icon
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        disabled={selected.status === s || updating === selected.id}
                        className={cn(
                          'w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all',
                          selected.status === s
                            ? cn(Cfg.color, 'cursor-default')
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                        )}
                      >
                        <Icon size={14} />
                        {selected.status === s ? `✓ ${Cfg.label}` : `Mark as ${Cfg.label}`}
                      </button>
                    )
                  })}
                </div>

                <a
                  href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${selected.fullName}, your NIGOR 2Transport booking ${selected.id} is confirmed for ${selected.date} at ${selected.time}. Your driver will be there on time. Thank you!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: '#25D366' }}
                >
                  WhatsApp Client
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
