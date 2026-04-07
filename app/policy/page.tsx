import type { Metadata } from 'next'
import PolicyContent from '@/components/policy/PolicyContent'

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms',
  description: 'Privacy policy, terms and conditions, and cancellation policy for NIGOR 2Transport — licensed private transfer service in Morocco.',
}

export default function PolicyPage() {
  return <PolicyContent />
}
