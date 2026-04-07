'use client'
import { useEffect } from 'react'
import { useBookingStore } from '@/lib/store'

export function LanguageDirectionSync() {
  const language = useBookingStore((s) => s.language)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  return null
}
