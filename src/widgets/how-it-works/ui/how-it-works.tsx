import { CarFront, Handshake, MessageCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: CarFront,
    title: "Find a car",
    description:
      "Browse listings and use filters to find a car that matches your needs.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Contact the seller",
    description:
      "Open a conversation with the seller and ask questions about the car.",
  },
  {
    number: "03",
    icon: Handshake,
    title: "Make a deal",
    description:
      "Agree on the details with the seller and arrange the purchase.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-muted-foreground">
            How it works
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Buying a car is simple
          </h2>

          <p className="mt-3 text-muted-foreground">
            Find a car, talk to the seller, and make a deal.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border bg-card">
                  <Icon className="size-7" />
                </div>

                <span className="mt-5 block text-sm font-medium text-muted-foreground">
                  {step.number}
                </span>

                <h3 className="mt-2 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};