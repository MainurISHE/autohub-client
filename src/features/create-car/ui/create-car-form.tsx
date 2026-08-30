"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  CreateCarData,
  createCarSchema,
  CreateCarSchema,
} from "@/entities/car/model/schemas/create-car.schema";

import { useCreateCarMutation } from "@/entities/car/hooks/use-create-car-mutation";
import { useUploadImageMutation } from "@/entities/car/hooks/use-upload-image-mutation";
import { useDeleteImageMutation } from "@/entities/car/hooks/use-delete-image-mutation";
import { useCarOptionsQuery } from "@/entities/car/hooks/use-car-options-query";
import { useBrandQuery } from "@/entities/brand/hooks/use-brands-query";

import { CarForm } from "@/features/car-form/ui/car-form";
import { BackButton } from "@/shared/ui/back-button/back-button";

export const CreateCarForm = () => {
  const form = useForm<CreateCarSchema, undefined, CreateCarData>({
    resolver: zodResolver(createCarSchema),

    defaultValues: {
      images: [],
    },
  });

  const { data: options } = useCarOptionsQuery();
  const { data: brands } = useBrandQuery();

  const createCarMutation = useCreateCarMutation();
  const uploadImageMutation = useUploadImageMutation();
  const deleteImageMutation = useDeleteImageMutation();

  const uploadedImage = useWatch({
    control: form.control,
    name: "images",
  });

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

  return (
    <main className="flex justify-center py-10">
      <Card className="w-full max-w-4xl">
        <BackButton label="Back to cars"/>
        <CardHeader>
          <CardTitle>Create Car</CardTitle>
        </CardHeader>

        <CardContent>
          <CarForm
            form={form}
            brands={brands ?? []}
            options={options}
            images={uploadedImage}
            isUploading={uploadImageMutation.isPending}
            isDeleting={deleteImageMutation.isPending}
            isSubmitting={createCarMutation.isPending}
            onUploadImages={handleUploadImages}
            onRemoveImage={handleRemoveImage}
            onSubmit={(data) => {
              createCarMutation.mutate(data);
            }}
          />
        </CardContent>
      </Card>
    </main>
  );
};

export default CreateCarForm;
