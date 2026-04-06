"use client";

import { useState } from "react";
import { Car, Bus, Truck } from "lucide-react";

interface VehicleImageProps {
  src: string;
  alt: string;
  bgColor?: string;
  category: string;
  className?: string;
  sizes?: string;
}

const categoryIcon = {
  Sedan: Car,
  Minivan: Bus,
  "Sprinter Van": Truck,
};

export default function VehicleImage({
  src,
  alt,
  bgColor = "#1a1a2e",
  category,
  className = "",
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
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${className}`}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}
