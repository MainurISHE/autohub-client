import { Button } from "@/components/ui/button"

export const AuthActions = () => {
    return(
        <div className="flex items-center gap-2">
            <Button variant={"ghost"}>
                Login
            </Button>

            <Button>
                Register
            </Button>
        </div>
    )
}