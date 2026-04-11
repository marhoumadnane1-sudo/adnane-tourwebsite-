import type { Metadata } from 'next'
import AboutContent from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About Us — NIGOR 2Transport Morocco',
  description: 'Since 2019, NIGOR 2Transport has been providing premium licensed private transfers across Morocco. Professional drivers, 24/7 availability, license N° 1754/T/2018.',
  keywords: [
    'NIGOR 2Transport',
    'Morocco private transfer company',
    'licensed transport Morocco',
    'chauffeur privé Casablanca',
    'agence transport touristique Maroc',
  ],
  openGraph: {
    title: 'About NIGOR 2Transport — Licensed Private Transfer Service Morocco',
    description: 'Meet the team behind Morocco\'s trusted private transfer service. Operating since 2019 with full government licensing.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'NIGOR 2Transport Morocco team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About NIGOR 2Transport — Licensed Morocco Transfers',
    description: 'Professional private transfers across Morocco since 2019. Licensed operator.',
  },
}

export default function AboutPage() {
  return <AboutContent />
}
