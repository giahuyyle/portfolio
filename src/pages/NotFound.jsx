import { Navbar } from "../components/Navbar";

export const NotFound = () => {
    return (
        <div>
            <Navbar />
            <div className="flex-col flex h-screen w-screen items-center justify-center">
                <div
                    className="text-3xl"
                >
                    <span className="font-bold text-zinc-700">404</span>
                    <span className="text-zinc-400"> | Page Not Found</span>
                </div>
                <div className="text-xs text-zinc-400/80 mt-3">
                    Please use the Navbar to go back to a valid page
                </div>
            </div>
        </div>
    )
};