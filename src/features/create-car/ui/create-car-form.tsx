"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCarData,
  createCarSchema,
  CreateCarSchema,
} from "@/entities/car/model/schemas/create-car.schema";
import { useCreateCarMutation } from "@/entities/car/hooks/use-create-car-mutation";
import { useUploadImageMutation } from "@/entities/car/hooks/use-upload-image-mutation";
import { ImageUpload } from "@/shared/ui/image-upload";
import { useCarOptionsQuery } from "@/entities/car/hooks/use-car-options-query";
import { FormSelect } from "@/shared/ui/form-select/form-select";
import { toSelectOptions } from "@/lib/select-options";
import { useBrandQuery } from "@/entities/brand/hooks/use-brands-query";
import { useDeleteImageMutation } from "@/entities/car/hooks/use-delete-image-mutation";

export const CreateCarForm = () => {
  const form = useForm<CreateCarSchema, any, CreateCarData>({
    resolver: zodResolver(createCarSchema),

    defaultValues: {
      images: [],
    },
  });
  const { data: options } = useCarOptionsQuery();
  const { data: brands } = useBrandQuery();

  const createCarMutation = useCreateCarMutation();
  const uploadImageMutation = useUploadImageMutation();
  const uploadedImage = form.watch("images");
  const deleteImageMutation = useDeleteImageMutation();

  return (
    <main className="flex justify-center py-10">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Create Car</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit((data) =>
              createCarMutation.mutate(data),
            )}
            className="grid grid-cols-2 gap-6"
          >
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>

              <Input
                id="title"
                placeholder="Your car model"
                {...form.register("title")}
              />

              {form.formState.errors.title && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <Label htmlFor="brandId">Brand ID</Label>

              <FormSelect
                placeholder="Brand"
                value={form.watch("brandId")?.toString()}
                options={
                  brands?.map((brand) => ({
                    value: brand.id.toString(),
                    label: brand.name,
                  })) ?? []
                }
                onValueChange={(value) => {
                  form.setValue("brandId", Number(value));
                }}
              />

              {form.formState.errors.brandId && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.brandId.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>

              <Input id="price" type="number" {...form.register("price")} />

              {form.formState.errors.price && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>

              <Input id="year" type="number" {...form.register("year")} />

              {form.formState.errors.year && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.year.message}
                </p>
              )}
            </div>

            {/* Mileage */}
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage</Label>

              <Input id="mileage" type="number" {...form.register("mileage")} />

              {form.formState.errors.mileage && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.mileage.message}
                </p>
              )}
            </div>

            {/* Horsepower */}
            <div className="space-y-2">
              <Label htmlFor="horsepower">Horsepower</Label>

              <Input
                id="horsepower"
                type="number"
                {...form.register("horsepower")}
              />

              {form.formState.errors.horsepower && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.horsepower.message}
                </p>
              )}
            </div>

            {/* Engine Volume */}
            <div className="space-y-2">
              <Label htmlFor="engineVolume">Engine Volume</Label>

              <Input
                id="engineVolume"
                type="number"
                {...form.register("engineVolume")}
              />

              {form.formState.errors.engineVolume && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.engineVolume.message}
                </p>
              )}
            </div>

            {/* Fuel */}
            <div className="space-y-2">
              <Label htmlFor="fuelType">Fuel Type</Label>

              <FormSelect
                placeholder="Fuel type"
                value={form.watch("fuelType")}
                options={toSelectOptions(options?.fuelTypes ?? [])}
                onValueChange={(value) => {
                  if (!value) return;

                  form.setValue("fuelType", value);
                }}
              />

              {form.formState.errors.fuelType && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.fuelType.message}
                </p>
              )}
            </div>

            {/* Transmission */}
            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>

              <FormSelect
                placeholder="Transmission"
                value={form.watch("transmission")}
                options={toSelectOptions(options?.transmissions ?? [])}
                onValueChange={(value) => {
                  if (!value) return;

                  form.setValue("transmission", value);
                }}
              />

              {form.formState.errors.transmission && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.transmission.message}
                </p>
              )}
            </div>

            {/* Drive */}
            <div className="space-y-2">
              <Label htmlFor="driveType">Drive Type</Label>

              <FormSelect
                placeholder="Drive type"
                value={form.watch("driveType")}
                options={toSelectOptions(options?.driveTypes ?? [])}
                onValueChange={(value) => {
                  if (!value) return;

                  form.setValue("driveType", value);
                }}
              />

              {form.formState.errors.driveType && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.driveType.message}
                </p>
              )}
            </div>

            {/* Body */}
            <div className="space-y-2">
              <Label htmlFor="bodyType">Body Type</Label>

              <FormSelect
                placeholder="Body type"
                value={form.watch("bodyType")}
                options={toSelectOptions(options?.bodyTypes ?? [])}
                onValueChange={(value) => {
                  if (!value) return;

                  form.setValue("bodyType", value);
                }}
              />

              {form.formState.errors.bodyType && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.bodyType.message}
                </p>
              )}
            </div>

            {/* Color */}
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>

              <FormSelect
                placeholder="Color"
                value={form.watch("color")}
                options={toSelectOptions(options?.colors ?? [])}
                onValueChange={(value) => {
                  if (!value) return;

                  form.setValue("color", value);
                }}
              />

              {form.formState.errors.color && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.color.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>

              <FormSelect
                placeholder="Status"
                value={form.watch("status")}
                options={toSelectOptions(options?.statuses ?? [])}
                onValueChange={(value) => {
                  if (!value) return;

                  form.setValue("status", value);
                }}
              />

              {form.formState.errors.status && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.status.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <ImageUpload
                images={uploadedImage}
                isLoading={uploadImageMutation.isPending}
                onSelect={async (files) => {
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
                }}
                onRemove={async (publicId) => {
                  await deleteImageMutation.mutateAsync(publicId);

                  form.setValue(
                    "images",
                    uploadedImage.filter(
                      (image) => image.publicId !== publicId,
                    ),
                  );
                }}
              />
            </div>

            {/* Description */}
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>

              <textarea
                id="description"
                {...form.register("description")}
                className="min-h-40 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none"
              />

              {form.formState.errors.description && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <Button
                type="submit"
                className="w-full"
                disabled={createCarMutation.isPending}
              >
                {createCarMutation.isPending ? "Creating..." : "Create Car"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};
