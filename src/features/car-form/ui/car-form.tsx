"use client";

import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  CreateCarData,
  CreateCarSchema,
} from "@/entities/car/model/schemas/create-car.schema";

import { FormSelect } from "@/shared/ui/form-select/form-select";
import { ImageUpload } from "@/shared/ui/image-upload";

interface CarFormProps {
  form: UseFormReturn<CreateCarSchema, undefined, CreateCarData>

  brands: {
    id: number;
    name: string;
  }[];

  options?: {
    fuelTypes: string[];
    transmissions: string[];
    driveTypes: string[];
    bodyTypes: string[];
    colors: string[];
    statuses: string[];
  };

  images: {
    url: string;
    publicId: string;
    order: number;
  }[];

  isUploading: boolean;
  isDeleting: boolean;
  isSubmitting: boolean;

  onUploadImages: (files: File[]) => void;
  onRemoveImage: (publicId: string) => void;

  onSubmit: (data: CreateCarData) => void;
}

export const CarForm = ({
  form,
  brands,
  options,
  images,
  isUploading,
  isDeleting,
  isSubmitting,
  onUploadImages,
  onRemoveImage,
  onSubmit,
}: CarFormProps) => {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
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
        <Label htmlFor="brandId">Brand</Label>

        <FormSelect
          placeholder="Brand"
          value={form.watch("brandId")?.toString()}
          options={brands.map((brand) => ({
            value: brand.id.toString(),
            label: brand.name,
          }))}
          onValueChange={(value) => {
            if (!value) return;

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

        <Input
          id="price"
          type="number"
          {...form.register("price")}
        />

        {form.formState.errors.price && (
          <p className="text-sm text-red-500">
            {form.formState.errors.price.message}
          </p>
        )}
      </div>

      {/* Year */}
      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>

        <Input
          id="year"
          type="number"
          {...form.register("year")}
        />

        {form.formState.errors.year && (
          <p className="text-sm text-red-500">
            {form.formState.errors.year.message}
          </p>
        )}
      </div>

      {/* Mileage */}
      <div className="space-y-2">
        <Label htmlFor="mileage">Mileage</Label>

        <Input
          id="mileage"
          type="number"
          {...form.register("mileage")}
        />

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
          options={(options?.fuelTypes ?? []).map((value) => ({
            value,
            label: value,
          }))}
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
          options={(options?.transmissions ?? []).map((value) => ({
            value,
            label: value,
          }))}
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
          options={(options?.driveTypes ?? []).map((value) => ({
            value,
            label: value,
          }))}
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
          options={(options?.bodyTypes ?? []).map((value) => ({
            value,
            label: value,
          }))}
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
          options={(options?.colors ?? []).map((value) => ({
            value,
            label: value,
          }))}
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
          options={(options?.statuses ?? []).map((value) => ({
            value,
            label: value,
          }))}
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

      {/* Images */}
      <div className="col-span-2">
        <ImageUpload
          images={images}
          isLoading={isUploading}
          onSelect={onUploadImages}
          onRemove={onRemoveImage}
        />

        {isDeleting && (
          <p className="mt-2 text-sm text-muted-foreground">
            Deleting image...
          </p>
        )}
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

      {/* Submit */}
      <div className="col-span-2">
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Car"}
        </Button>
      </div>
    </form>
  );
};