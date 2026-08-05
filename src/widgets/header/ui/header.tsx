import { Container } from "@/shared/ui/container";
import { Logo } from "@/shared/ui/logo";
import { Navigation } from '../navigation/navigation';
import { AuthActions } from '../auth-actions';

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
            <Container>
                <div className="flex h-18 items-center justify-between">
                    <Logo/>

                    <Navigation/>

                    <AuthActions/>
                </div>
            </Container>
        </header>
    )
}