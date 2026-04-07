'use client'
import { useBookingStore } from '@/lib/store'
import { t, tArr, type Lang, type TranslationKeys } from '@/lib/translations'

export function useTranslation() {
  const language = useBookingStore((s) => s.language) as Lang
  const isRTL = language === 'ar'

  return {
    language,
    isRTL,
    isFR: language === 'fr',
    isAR: language === 'ar',
    t: (section: keyof TranslationKeys, key: string): string =>
      t(language, section, key),
    tArr: (section: keyof TranslationKeys, key: string): string[] =>
      tArr(language, section, key),
  }
}
