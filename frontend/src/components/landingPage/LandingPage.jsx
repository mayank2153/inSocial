import { logo } from "../../utils/links/assets";
import Features from "./Features";
import Hero from "./Hero";
import Steps from "./steps";
import FAQ from "./FAQs";
import CTA from "./CTA";
import Footer from "./Footer";
const LandingPage = () => {
    return (
        <div className="bg-[#1e1e1e]">
            <div className=" text-white flex flex-col px-5 md:px-20 w-full max-w-screen items-center ">
            <div className="md:absolute top-5 left-10">
                <img src={logo} className="h-20" />
            </div>

            <section className="min-h-screen flex justify-center items-center">
                <Hero />
            </section>
            <section className="min-h-screen flex justify-center items-center">
                <Features />
            </section>
            <section className="min-h-screen flex justify-center items-center">
                <Steps />
            </section>
            <section className="h-screen flex justify-center items-center">
                <FAQ />
            </section>
            <section className="min-h-screen flex justify-center overflow-hidden w-full">
                <CTA />
            </section>

        </div>
            <section className="flex  w-full border-t-white/40 border-t z-10">
                <Footer />
            </section>
        </div>
    );
};

export default LandingPage;
