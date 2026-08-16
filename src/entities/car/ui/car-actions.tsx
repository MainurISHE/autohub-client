"use client";

import { useRouter } from "next/navigation";
import { useDeleteCarMutation } from "../hooks/use-delete-car-mutation";
import { Button } from "@/components/ui/button";

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

interface CarActionsProps {
  carId: number;
}

export const CarActions = ({ carId }: CarActionsProps) => {
  const router = useRouter();
  const deleteCarMutation = useDeleteCarMutation();

  const handleEdit = () => {
    router.push(`/cars/${carId}/edit`);
  };

  const handleDelete = () => {
    deleteCarMutation.mutate(carId);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handleEdit}>
        Edit
      </Button>

      <AlertDialog>
        <AlertDialogTrigger
          render={<Button variant="destructive">Delete</Button>}
        />

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this car?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              car listing.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteCarMutation.isPending}
            >
              {deleteCarMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
