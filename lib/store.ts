"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookingFormData, VehicleType } from "./types";
import type { Lang } from "./translations";

interface BookingStore {
  step: number;
  formData: Partial<BookingFormData>;
  calculatedPrice: number | null;
  currency: "MAD" | "EUR";
  language: Lang;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<BookingFormData>) => void;
  setCalculatedPrice: (price: number | null) => void;
  setCurrency: (currency: "MAD" | "EUR") => void;
  setLanguage: (lang: Lang) => void;
  resetBooking: () => void;
}

const defaultFormData: Partial<BookingFormData> = {
  serviceType: "airport",
  passengers: 2,
  luggage: 2,
  paymentMethod: "on-arrival",
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      step: 1,
      formData: defaultFormData,
      calculatedPrice: null,
      currency: "MAD",
      language: "en",
      setStep: (step) => set({ step }),
      nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
      prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
      updateFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      setCalculatedPrice: (price) => set({ calculatedPrice: price }),
      setCurrency: (currency) => set({ currency }),
      setLanguage: (lang) => {
        if (typeof document !== "undefined") {
          document.cookie = `mt-lang=${lang}; path=/; max-age=31536000`;
          document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
          document.documentElement.lang = lang;
        }
        set({ language: lang });
      },
      resetBooking: () =>
        set({ step: 1, formData: defaultFormData, calculatedPrice: null }),
    }),
    {
      name: "maroctransfert-booking",
      partialize: (state) => ({
        formData: state.formData,
        step: state.step,
        currency: state.currency,
        language: state.language,
      }),
    }
  )
);
