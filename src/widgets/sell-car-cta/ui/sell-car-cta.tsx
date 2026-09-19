"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/auth.store";

export const SellCarCta = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleClick = () => {
    if (user) {
      router.push("/create-car");
      return;
    }

    router.push("/login?redirect=/create-car");
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl border bg-muted/30 px-6 py-12 text-center md:px-12">
          <p className="text-sm font-medium text-muted-foreground">
            Selling your car?
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            List your car on AutoHub
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Create a listing, add photos and vehicle details, and connect
            directly with potential buyers.
          </p>

          <Button
            size="lg"
            className="mt-8"
            onClick={handleClick}
          >
            Sell your car
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};