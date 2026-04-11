/**
 * Escapes HTML special characters to prevent XSS in email templates
 * and when user-supplied data is embedded in HTML strings.
 */
export function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

/**
 * Strips HTML tags and trims the string — useful for plain-text contexts.
 */
export function stripHtml(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/<[^>]*>/g, "").trim();
}
