"use client";

import { useParams } from "next/navigation";

import { EditCarForm } from "@/features/edit-car/ui/edit-car-form";

export default function EditCarPage() {
  const params = useParams<{ id: string }>();

  const id = Number(params.id);

  return <EditCarForm id={id} />;
}
