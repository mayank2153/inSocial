import { logo } from "../../utils/links/assets";
import Features from "./Features";
import Hero from "./Hero";
import Steps from "./steps";
import FAQ from "./FAQs";

const LandingPage = () => {
    return (
        <div className="bg-[#1e1e1e] text-white flex flex-col px-20 w-full max-w-[100vw] ">
             <div className="absolute top-5 left-10">
                <img src={logo} className="h-20" />
            </div>

            <section className="h-screen flex justify-center items-center">
                <Hero />
            </section>
            <section className="h-screen flex justify-center items-center">
                <Features />
            </section>
            <section className="h-screen flex justify-center items-center">
                <Steps />
            </section>
            <section className="h-screen flex justify-center items-center">
                <FAQ />
            </section>
        </div>
    );
};

export default LandingPage;
