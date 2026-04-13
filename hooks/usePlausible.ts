"use client";

// Extend the Window interface with Plausible's global function
declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
  }
}

export type PlausibleEventName =
  | "pageview"
  | "booking_started"
  | "booking_completed"
  | "contact_submitted";

/**
 * usePlausible — sends events to Plausible Analytics.
 * Events are silently dropped if the script is not loaded
 * (e.g. when the user declined cookie consent).
 */
export function usePlausible() {
  function trackEvent(
    event: PlausibleEventName,
    props?: Record<string, string | number | boolean>
  ) {
    if (typeof window === "undefined") return;
    if (typeof window.plausible !== "function") return;
    window.plausible(event, props ? { props } : undefined);
  }

  return { trackEvent };
}
