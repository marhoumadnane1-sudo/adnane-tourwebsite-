"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: { label: string; description: string }[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center">
        {steps.map((step, i) => {
          const stepNum = i + 1;
          const isCompleted = currentStep > stepNum;
          const isActive = currentStep === stepNum;

          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: isCompleted ? "#B5451B" : isActive ? "#B5451B" : "#E8D4A0",
                    scale: isActive ? 1.1 : 1,
                  }}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-colors",
                    isCompleted || isActive ? "text-white" : "text-charcoal/40"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <span>{stepNum}</span>}
                </motion.div>
                <div className="mt-2 text-center hidden sm:block">
                  <p className={cn(
                    "text-xs font-semibold transition-colors",
                    isActive ? "text-terracotta" : isCompleted ? "text-charcoal/60" : "text-charcoal/30"
                  )}>
                    {step.label}
                  </p>
                  <p className="text-[10px] text-charcoal/30 mt-0.5">{step.description}</p>
                </div>
              </div>

              {i < steps.length - 1 && (
                <div className="flex-1 mx-3 mb-5 sm:mb-0">
                  <div className="h-0.5 relative overflow-hidden rounded-full bg-sand-dark">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: currentStep > stepNum ? "100%" : "0%" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-y-0 left-0 bg-terracotta"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
