import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-black text-terracotta/20 mb-4">404</div>
        <h1 className="text-3xl font-bold text-charcoal mb-3">Page Not Found</h1>
        <p className="text-charcoal/50 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="btn-primary inline-flex">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
