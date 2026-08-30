"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  label?: string;
}

export const BackButton = ({
  label = "Back",
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => router.back()}
      className="gap-2"
    >
      <ArrowLeft className="h-4 w-4" />

      {label}
    </Button>
  );
};