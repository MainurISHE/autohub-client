"use client";

import Image from "next/image";
import Link from "next/link";
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
  User,
  type LucideIcon,
} from "lucide-react";
import { CarGallery } from "@/entities/car/ui/car-gallery";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCreateConversationMutation } from "@/entities/conversation/hooks/use-create-conversation-mutation";
import { CarDetailsSkeleton } from "@/entities/car/ui/car-details-skeleton";
import { FavoriteButton } from "@/entities/favorite/ui/favorite-button";
import { BackButton } from "@/shared/ui/back-button/back-button";

export default function CarPage() {
  const params = useParams();
  const id = Number(params.id);

  const createConversationMutation = useCreateConversationMutation();

  const { data, isLoading, error } = useCarQuery(id);
  const { user } = useAuthStore();

  const router = useRouter();

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

  const specs: {
    icon: LucideIcon;
    label: string;
    value: string | number;
  }[] = [
    {
      icon: Calendar,
      label: "Year",
      value: car.year,
    },
    {
      icon: Gauge,
      label: "Mileage",
      value: `${car.mileage.toLocaleString()} km`,
    },
    {
      icon: Fuel,
      label: "Fuel",
      value: car.fuelType,
    },
    {
      icon: Settings2,
      label: "Transmission",
      value: car.transmission,
    },
    {
      icon: CarFront,
      label: "Drive",
      value: car.driveType,
    },
    {
      icon: CarFront,
      label: "Body",
      value: car.bodyType,
    },
    {
      icon: Palette,
      label: "Color",
      value: car.color,
    },
    {
      icon: Cog,
      label: "Engine",
      value: `${car.engineVolume} L`,
    },
  ];

  const handleContact = async () => {
    if (!user) {
      router.push(`/login?redirect=/cars/${car.id}`);
      return;
    }

    if (user.id === car.ownerId) {
      return;
    }

    try {
      const conversation = await createConversationMutation.mutateAsync(
        car.ownerId,
      );

      router.push(`/messages?conversation=${conversation.id}`);
    } catch {
      // The mutation exposes its pending/error state to the UI.
    }
  };

  return (
    <Container>
      <div className="py-3">
        <BackButton label="Back to cars" />
      </div>

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

              <div className="flex items-center gap-2">
                <FavoriteButton carId={car.id} />

                <CarActions
                  carId={car.id}
                  isOwner={isOwner}
                  canEdit={canEdit}
                  onContact={handleContact}
                  isContactPending={createConversationMutation.isPending}
                />
              </div>
            </div>

            {/* Specs */}
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl border p-4">
                  <Icon className="mb-3 h-5 w-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-1 font-semibold">{value}</p>
                </div>
              ))}
            </div>

            {/* Seller */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Seller</h2>

              <Link
                href={`/users/${car.owner.id}`}
                className="mt-4 flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-muted"
              >
                {car.owner.avatarUrl ? (
                  <Image
                    src={car.owner.avatarUrl}
                    alt={`${car.owner.name} ${car.owner.lastName}`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}

                <div>
                  <p className="font-semibold">
                    {car.owner.name} {car.owner.lastName}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    View seller profile
                  </p>
                </div>
              </Link>
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
