"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { EUR_RATE } from "@/lib/prices";

interface PayPalButtonProps {
  amountMAD: number;
  onSuccess: (orderId: string) => void;
  onError?: (err: unknown) => void;
}

export function PayPalButton({ amountMAD, onSuccess, onError }: PayPalButtonProps) {
  const [{ isPending }] = usePayPalScriptReducer();
  const amountEUR = (amountMAD / EUR_RATE).toFixed(2);

  if (isPending) {
    return (
      <div className="w-full h-12 bg-sand animate-pulse rounded-xl" />
    );
  }

  return (
    <PayPalButtons
      style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay", height: 48 }}
      createOrder={(_data, actions) =>
        actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: { currency_code: "EUR", value: amountEUR },
              description: "Morocco Private Transfer — NIGOR 2Transport",
            },
          ],
        })
      }
      onApprove={async (_data, actions) => {
        const order = await actions.order!.capture();
        onSuccess(order.id ?? "");
      }}
      onError={(err) => {
        console.error("PayPal error:", err);
        onError?.(err);
      }}
    />
  );
}
