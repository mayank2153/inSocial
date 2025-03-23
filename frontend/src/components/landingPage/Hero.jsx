import { logo, sojoFull } from "../../utils/links/assets";

const Hero = () => {
    return (
        <div className="my-20 px-5 md:px-10">
            <div className="flex flex-col-reverse md:flex-row gap-10 mt-24 items-center">
                <div className="w-full text-white space-y-8 text-center md:text-left">
                    <p className="text-5xl md:text-7xl font-bold md:pr-40">
                        Connect with What Matters
                    </p>
                    <p className="text-xl md:text-3xl opacity-80">
                        Share your story, discover new ones, <br />
                        and connect with people who share your interests
                    </p>
                    <div className="flex flex-col md:flex-row gap-5 md:gap-20 items-center md:items-start">
                        <button className="bg-[#BF9FE7] text-black rounded-md px-10 py-4 w-full md:w-auto">
                            Sign Up
                        </button>
                        <button className="bg-[#EEE2FF] text-black rounded-md px-10 py-4 w-full md:w-auto">
                            Log In
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-10 items-center w-full md:w-auto py-10">
                    <div className="w-[300px] h-[160px] md:w-[600px] md:h-[320px] bg-[#EEE2FF] rounded-t-full"></div>
                </div>
            </div>
            <div className="absolute right-5 md:right-12 top-48">
                <div className="bg-white w-40 md:w-60 h-10 rounded-full absolute -left-48 md:-left-96 top-40 md:top-80">
                    <div className="bg-white w-40 md:w-60 h-20 rounded-full relative left-40 md:left-[600px] bottom-36 md:bottom-72"></div>
                </div>
                <img src={sojoFull} className="h-[300px] md:h-[450px] relative right-20 md:right-40" />
            </div>
        </div>
    );
};

export default Hero;
