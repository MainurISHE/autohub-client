"use client";

import { useState } from "react";
import { SellerDialog } from "@/entities/user/ui/seller-dialog";
import { CarActions } from "@/entities/car/ui/car-actions";
import { useParams, useRouter } from "next/navigation";
import { useCarQuery } from "@/entities/car/hooks/use-car-query";
import { Container } from "@/shared/ui/container";
import {
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  CarFront,
  Palette,
  Cog,
} from "lucide-react";
import { CarGallery } from "@/entities/car/ui/car-gallery";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCreateConversationMutation } from "@/entities/conversation/hooks/use-create-conversation-mutation";
import { CarDetailsSkeleton } from "@/entities/car/ui/car-details-skeleton";

export default function CarPage() {
  const params = useParams();
  const id = Number(params.id);

  const createConversationMutation = useCreateConversationMutation();

  const { data, isLoading, error } = useCarQuery(id);
  const { user } = useAuthStore();

  const router = useRouter();
  const [isSellerDialogOpen, setIsSellerDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <Container>
        <div className="py-10">
          <CarDetailsSkeleton />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold">Failed to load car</h2>

          <p className="mt-2 max-w-md text-muted-foreground">
            Something went wrong while loading this car. Please try again.
          </p>
        </div>
      </Container>
    );
  }

  const car = data;

  if (!car) {
    return (
      <Container>
        <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold">Car not found</h2>

          <p className="mt-2 text-muted-foreground">
            The car you are looking for does not exist or has been removed.
          </p>
        </div>
      </Container>
    );
  }

  const canEdit = user?.role === "ADMIN" || user?.id === car.ownerId;

  const isOwner = user?.id === car.ownerId;

  const handleContact = async () => {
    if (!user) {
      router.push(`/register?redirect=/cars/${car.id}`);
      return;
    }

    const conversation = await createConversationMutation.mutateAsync(
      car.ownerId,
    );

    router.push(`/messages/${conversation.id}`);
  };

  return (
    <Container>
      <div className="py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <CarGallery images={car.images ?? []} />
          </div>

          <div>
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  {car.brand.name} {car.title}
                </h1>

                <p className="mt-2 text-muted-foreground">
                  {car.year} · {car.transmission} · {car.fuelType}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {car.status}
              </span>
            </div>

            {/* Price + actions */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-4xl font-bold">
                ${Number(car.price).toLocaleString()}
              </p>

              <CarActions
                carId={car.id}
                isOwner={isOwner}
                canEdit={canEdit}
                onContact={handleContact}
              />

              <SellerDialog
                seller={car.owner}
                open={isSellerDialogOpen}
                onOpenChange={setIsSellerDialogOpen}
                onMessage={() => {
                  console.log("Message seller:", car.owner.id);
                }}
              />
            </div>

            {/* Specs */}
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-xl border p-4">
                <Calendar className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="mt-1 font-semibold">{car.year}</p>
              </div>

              <div className="rounded-xl border p-4">
                <Gauge className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Mileage</p>
                <p className="mt-1 font-semibold">
                  {car.mileage.toLocaleString()} km
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <Fuel className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Fuel</p>
                <p className="mt-1 font-semibold">{car.fuelType}</p>
              </div>

              <div className="rounded-xl border p-4">
                <Settings2 className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Transmission</p>
                <p className="mt-1 font-semibold">{car.transmission}</p>
              </div>

              <div className="rounded-xl border p-4">
                <CarFront className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drive</p>
                <p className="mt-1 font-semibold">{car.driveType}</p>
              </div>

              <div className="rounded-xl border p-4">
                <CarFront className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Body</p>
                <p className="mt-1 font-semibold">{car.bodyType}</p>
              </div>

              <div className="rounded-xl border p-4">
                <Palette className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Color</p>
                <p className="mt-1 font-semibold">{car.color}</p>
              </div>

              <div className="rounded-xl border p-4">
                <Cog className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Engine</p>
                <p className="mt-1 font-semibold">{car.engineVolume} L</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold">Description</h2>

              <p className="mt-3 leading-7 text-muted-foreground">
                {car.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
