import { MessageCircle, Search, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Easy to find",
    description:
      "Search and filter cars by price, brand, body type, fuel type, and more.",
  },
  {
    icon: ShieldCheck,
    title: "Detailed listings",
    description:
      "View complete vehicle information, photos, specifications, and seller details.",
  },
  {
    icon: MessageCircle,
    title: "Direct communication",
    description:
      "Contact sellers directly and discuss the car through AutoHub messaging.",
  },
];

export const WhyAutoHub = () => {
  return (
    <section className="border-y bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Why AutoHub
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Everything you need to find your next car
          </h2>

          <p className="mt-3 text-muted-foreground">
            A simple marketplace designed to make buying and selling cars
            easier.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border bg-card p-6"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};