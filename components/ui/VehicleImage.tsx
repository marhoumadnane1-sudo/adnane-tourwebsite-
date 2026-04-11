"use client";

import { useState } from "react";
import Image from "next/image";
import { Car, Bus, Truck } from "lucide-react";

interface VehicleImageProps {
  src: string;
  alt: string;
  bgColor?: string;
  category: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

const categoryIcon = {
  Sedan: Car,
  Minivan: Bus,
  "Sprinter Van": Truck,
};

export default function VehicleImage({
  src,
  alt,
  category,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
}: VehicleImageProps) {
  const [error, setError] = useState(false);
  const Icon = categoryIcon[category as keyof typeof categoryIcon] ?? Car;

  if (error) {
    return (
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 ${className}`}
        style={{ background: "linear-gradient(135deg, #0f1318 0%, #1a1f2e 60%, #111827 100%)" }}
      >
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
          <Icon size={32} className="text-white/80" />
        </div>
        <p className="text-white/70 text-sm font-medium text-center px-4">{alt}</p>
        <span className="text-white/40 text-xs">{category}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={`object-cover group-hover:scale-105 transition-transform duration-500 ${className}`}
      sizes={sizes}
      onError={() => setError(true)}
    />
  );
}
