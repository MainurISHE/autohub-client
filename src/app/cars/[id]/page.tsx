"use client";

import { useParams, useRouter } from "next/navigation";
import { useCarQuery } from "@/entities/car/hooks/use-car-query";
import { Container } from "@/shared/ui/container";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDeleteCarMutation } from "@/entities/car/hooks/use-delete-car-mutation";

export default function CarPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, error } = useCarQuery(id);
  const { user } = useAuthStore();

  const deleteCarMutation = useDeleteCarMutation();

  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong.</div>;
  }

  const car = data;

  if (!car) {
    return <div>Car not found.</div>;
  }

  const canEdit = user?.role === "ADMIN" || user?.id === car.ownerId;

  const handleDelete = () => {
    deleteCarMutation.mutate(car.id, {
      onSuccess: () => {
        router.push("/cars");
      },
    });
  };

  return (
    <Container>
      <div className="py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <CarGallery images={car?.images ?? []} />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              {car?.brand.name} {car?.title}
            </h1>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-3xl font-bold">
                ${Number(car.price).toLocaleString()}
              </p>

              {canEdit && (
                <div className="flex gap-2">
                  <Button>
                    <Link href={`/cars/${car.id}/edit`}>Edit</Link>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger
                      render={<Button variant="destructive" />}
                    >
                      Delete
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this car?</AlertDialogTitle>

                        <AlertDialogDescription>
                          This action cannot be undone. The car and all of its
                          images will be permanently deleted.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={deleteCarMutation.isPending}
                        >
                          {deleteCarMutation.isPending
                            ? "Deleting..."
                            : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-xl border p-4">
                <Calendar className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="mt-1 font-semibold">{car?.year}</p>
              </div>

              <div className="rounded-xl border p-4">
                <Gauge className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Mileage</p>
                <p className="mt-1 font-semibold">
                  {car?.mileage.toLocaleString()} km
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <Fuel className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Fuel</p>
                <p className="mt-1 font-semibold">{car?.fuelType}</p>
              </div>

              <div className="rounded-xl border p-4">
                <Settings2 className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Transmission</p>
                <p className="mt-1 font-semibold">{car?.transmission}</p>
              </div>

              <div className="rounded-xl border p-4">
                <CarFront className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drive</p>
                <p className="mt-1 font-semibold">{car?.driveType}</p>
              </div>

              <div className="rounded-xl border p-4">
                <CarFront className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Body</p>
                <p className="mt-1 font-semibold">{car?.bodyType}</p>
              </div>

              <div className="rounded-xl border p-4">
                <Palette className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Color</p>
                <p className="mt-1 font-semibold">{car?.color}</p>
              </div>

              <div className="rounded-xl border p-4">
                <Cog className="mb-3 h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Engine</p>
                <p className="mt-1 font-semibold">{car?.engineVolume} L</p>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-2xl font-bold">Description</h2>

              <p className="mt-3 leading-7 text-muted-foreground">
                {car?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
