import { Container } from "@/shared/ui/container";
import { Logo } from "@/shared/ui/logo";

import { Navigation } from "../navigation/navigation";
import { AuthActions } from "../auth-actions";
import { MobileNavigation } from "../mobile-navigation";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <Container>
        <div className="flex h-18 items-center justify-between">
          <Logo />

          <div className="hidden lg:block">
            <Navigation />
          </div>

          <div className="hidden lg:block">
            <AuthActions />
          </div>

          <div className="lg:hidden">
            <MobileNavigation />
          </div>
        </div>
      </Container>
    </header>
  );
};