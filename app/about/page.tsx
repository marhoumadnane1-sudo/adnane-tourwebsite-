import type { Metadata } from 'next'
import AboutContent from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Since 2019, NIGOR 2Transport has been providing premium private transfers across Morocco. Licensed, professional, available 24/7.',
}

export default function AboutPage() {
  return <AboutContent />
}
