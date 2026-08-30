"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  CreateCarData,
  createCarSchema,
  CreateCarSchema,
} from "@/entities/car/model/schemas/create-car.schema";

import { useCarQuery } from "@/entities/car/hooks/use-car-query";
import { useUploadImageMutation } from "@/entities/car/hooks/use-upload-image-mutation";
import { useBrandQuery } from "@/entities/brand/hooks/use-brands-query";
import { useDeleteImageMutation } from "@/entities/car/hooks/use-delete-image-mutation";
import { useUpdateCarMutation } from "@/entities/car/hooks/use-update-car-mutation";
import { useCarOptionsQuery } from "@/entities/car/hooks/use-car-options-query";

import { CarForm } from "@/features/car-form/ui/car-form";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/shared/ui/back-button/back-button";

interface EditCarFormProps {
  id: number;
}

export const EditCarForm = ({ id }: EditCarFormProps) => {
  const router = useRouter();

  const { data: car, isLoading, error } = useCarQuery(id);

  const { user, isInitialized } = useAuthStore();

  const brandQuery = useBrandQuery();
  const carOptionsQuery = useCarOptionsQuery();

  const uploadImageMutation = useUploadImageMutation();
  const deleteImageMutation = useDeleteImageMutation();
  const updateCarMutation = useUpdateCarMutation();

  const brands = brandQuery.data ?? [];
  const options = carOptionsQuery.data;

  const form = useForm<CreateCarSchema, undefined, CreateCarData>({
    resolver: zodResolver(createCarSchema),

    defaultValues: {
      images: [],
    },
  });

  const uploadedImages = useWatch({
    control: form.control,
    name: "images",
  });

  const canEdit = user?.role === "ADMIN" || user?.id === car?.ownerId;

  useEffect(() => {
    if (!car) return;

    form.reset({
      title: car.title,
      description: car.description,
      price: car.price,
      year: car.year,
      mileage: car.mileage,
      engineVolume: car.engineVolume,
      horsepower: car.horsepower,

      fuelType: car.fuelType,
      transmission: car.transmission,
      driveType: car.driveType,
      bodyType: car.bodyType,
      color: car.color,
      status: car.status,

      brandId: car.brand.id,

      images: car.images,
    });
  }, [car, form]);

  useEffect(() => {
    if (!isInitialized || isLoading || !car) {
      return;
    }

    if (!canEdit) {
      router.replace(`/cars/${car.id}`);
    }
  }, [isInitialized, isLoading, car, canEdit, router]);

  const handleUploadImages = async (files: File[]) => {
    const currentImages = form.getValues("images");

    if (currentImages.length + files.length > 7) {
      return;
    }

    const newImages = await Promise.all(
      files.map((file, index) =>
        uploadImageMutation.mutateAsync(file).then((image) => ({
          url: image.url,
          publicId: image.publicId,
          order: currentImages.length + index,
        })),
      ),
    );

    form.setValue("images", [...currentImages, ...newImages]);
  };

  const handleRemoveImage = async (publicId: string) => {
    await deleteImageMutation.mutateAsync(publicId);

    form.setValue(
      "images",
      form.getValues("images").filter((image) => image.publicId !== publicId),
    );
  };

  const handleSubmit = async (data: CreateCarData) => {
    updateCarMutation.mutateAsync({
      id,
      data,
    });

    router.push(`/cars/${id}`);
  };

  if (!isInitialized || isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !car) {
    return <div>Car not found</div>;
  }

  if (!canEdit) {
    return null;
  }

  return (
    <main className="flex justify-center py-10">
      <Card className="w-full max-w-4xl">
        <BackButton label="Back to car"/>
        <CardHeader>
          <CardTitle>Edit Car</CardTitle>
        </CardHeader>

        <CardContent>
          <CarForm
            form={form}
            brands={brands}
            options={options}
            images={uploadedImages}
            isUploading={uploadImageMutation.isPending}
            isDeleting={deleteImageMutation.isPending}
            isSubmitting={updateCarMutation.isPending}
            onUploadImages={handleUploadImages}
            onRemoveImage={handleRemoveImage}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </main>
  );
};
