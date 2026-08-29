import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { User } from "lucide-react";

interface SellerDialogProps {
  seller: {
    id: number;
    name: string;
    lastName: string;
    avatarUrl: string | null;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMessage: () => void;
}

export const SellerDialog = ({
  seller,
  open,
  onOpenChange,
  onMessage,
}: SellerDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Seller</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
            {seller.avatarUrl ? (
              <img
                src={seller.avatarUrl}
                alt={`${seller.name} ${seller.lastName}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-muted-foreground" />
            )}
          </div>

          <div>
            <p className="text-lg font-semibold">
              {seller.name} {seller.lastName}
            </p>

            <p className="text-sm text-muted-foreground">Seller</p>
          </div>
        </div>

        <Button onClick={onMessage} className="w-full">
          Message
        </Button>
      </DialogContent>
    </Dialog>
  );
};
