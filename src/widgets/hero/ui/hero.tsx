import { Button } from "@/components/ui/button";
import { Container } from "@/shared/ui/container";

export const HeroBlock = () => {
  return (
    <section className="py-8">
      <Container>
        <div
          className="relative h-[550px] overflow-hidden rounded-3xl bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-car.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

          <div className="relative z-10 flex h-full max-w-xl flex-col justify-center px-12 text-white">
            <span className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-blue-400">
              AutoHub
            </span>

            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Find Your
              <br />
              Perfect Car
            </h1>

            <p className="mb-8 max-w-md text-lg leading-8 text-slate-300">
              Buy, sell and discover thousands of verified vehicles in one
              place.
            </p>

            <div className="flex items-center gap-4">
              <Button size={"lg"} >
                Browse Cars
              </Button>

              <Button variant={"outline"} size={"lg"}>
                Sell Your Car
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};