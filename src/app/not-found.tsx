"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/shared/ui/container";

export default function NotFound() {
  const router = useRouter();

  return (
    <Container>
      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center">
        <div className="flex max-w-lg flex-col items-center text-center">
          <p className="text-8xl font-bold tracking-tight text-primary">
            404
          </p>

          <h1 className="mt-6 text-3xl font-bold">
            Page not found
          </h1>

          <p className="mt-3 text-muted-foreground">
            The page you are looking for does not exist or may have been
            removed.
          </p>

          <div className="mt-8 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Button>

            <Link href="/">
              <Button type="button" className="gap-2">
                <Home className="h-4 w-4" />
                Go home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </Container>
  );
}