import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";

export const Home = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow pt-20"> {/* Adjust pt-20 to match your navbar height */}
                <Hero />
            </div>
            <Footer />  
        </div>
    )
};