import type { Metadata } from 'next'
import PolicyContent from '@/components/policy/PolicyContent'

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms — NIGOR 2Transport',
  description: 'Privacy policy, terms and conditions, and cancellation policy for NIGOR 2Transport — licensed private transfer service in Morocco.',
  keywords: ['Morocco transfer cancellation policy', 'privacy policy transport Maroc', 'terms conditions'],
  openGraph: {
    title: 'Privacy Policy & Terms — NIGOR 2Transport Morocco',
    description: 'Our privacy policy, booking terms, and cancellation policy.',
  },
  robots: { index: false, follow: true },
}

export default function PolicyPage() {
  return <PolicyContent />
}
