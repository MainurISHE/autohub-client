"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { useParams } from "next/navigation";

import { Container } from "@/shared/ui/container";
import { CarCard } from "@/entities/car/ui/car-card";
import { usePublicProfileQuery } from "@/entities/user/hooks/use-public-profile-query";
import { BackButton } from "@/shared/ui/back-button/back-button";

export default function PublicProfilePage() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, error } = usePublicProfileQuery(id);

  if (isLoading) {
    return (
      <Container>
        <div className="flex min-h-[500px] items-center justify-center">
          Loading profile...
        </div>
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container>
        <div className="flex min-h-[500px] items-center justify-center">
          <p className="text-muted-foreground">Failed to load profile.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-3">
        <BackButton label="Back" />
      </div>
      <div className="py-6">
        {/* Profile */}
        <div className="flex flex-col items-center rounded-2xl border p-8 text-center">
          {data.avatarUrl ? (
            <Image
              src={data.avatarUrl}
              alt={`${data.name} ${data.lastName}`}
              width={120}
              height={120}
              className="h-30 w-30 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-30 w-30 items-center justify-center rounded-full bg-muted">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          <h1 className="mt-5 text-3xl font-bold">
            {data.name} {data.lastName}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Member since{" "}
            {new Date(data.createdAt).toLocaleDateString([], {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Cars */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Cars for sale</h2>

          {data.cars.length === 0 ? (
            <div className="mt-6 rounded-2xl border p-10 text-center">
              <p className="text-muted-foreground">
                This seller has no cars for sale.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
