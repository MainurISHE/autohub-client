import { HeroBlock } from "@/widgets/hero/ui/hero";
import { FeaturedCars } from "@/widgets/featured-cars/ui/featured-cars";
import { WhyAutoHub } from "@/widgets/why-autohub/ui/why-autohub";
import { HowItWorks } from "@/widgets/how-it-works/ui/how-it-works";
import { SellCarCta } from "@/widgets/sell-car-cta/ui/sell-car-cta";

const HomePage = () => {
  return (
    <>
      <HeroBlock />
      <FeaturedCars />
      <WhyAutoHub />
      <HowItWorks />
      <SellCarCta />
    </>
  );
};

export default HomePage;