import Link from "next/link"
import { CarFront } from 'lucide-react';

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <CarFront className="h-7 w-7 text-blue-600"/>

            <span className="text-xl font-bold tracking-tight">
                AutoHub
            </span>
        </Link>
    )
}