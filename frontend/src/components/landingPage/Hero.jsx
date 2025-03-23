import { logo, sojoFull } from "../../utils/links/assets";

const Hero = () => {
    return (
        <div className="md:my-20  md:px-10 ">
            <div className="flex flex-col-reverse md:flex-row md:gap-10 md:mt-24 ">
                <div className="w-full text-white space-y-8 mt-4   text-center md:text-left">
                    <p className="text-4xl md:text-7xl font-bold md:pr-40">
                        Connect with What Matters
                    </p>
                    <p className="text-lg md:text-3xl opacity-80">
                        Share your story, discover new ones, <br />
                        and connect with people who share your interests
                    </p>
                    <div className="flex flex-col md:flex-row gap-5 md:gap-20 items-center md:items-start font-bold text-2xl">
                        <button className="bg-[#BF9FE7] text-black rounded-md px-10 py-4 w-full md:w-auto">
                            Sign Up
                        </button>
                        <button className="bg-[#EEE2FF] text-black rounded-md px-10 py-4 w-full md:w-auto">
                            Log In
                        </button>
                    </div>
                </div>
                <div className="flex flex-col md:gap-10 justify-start items-center mt-4 w-full md:w-auto md:py-10">
                    <div className="w-[300px] h-[160px] md:w-[600px] md:h-[320px] bg-[#EEE2FF] rounded-t-full"></div>
                </div>
            </div>
            <div className="md:absolute right-5 md:right-12 top-0 md:top-48">
                <div className="bg-white w-40 md:w-60 h-10 rounded-full md:absolute -left-48 md:-left-96 top-40 md:top-80 hidden">
                    <div className="bg-white w-40 md:w-60 h-20 rounded-full relative left-40 md:left-[600px] bottom-36 md:bottom-72"></div>
                </div>
                <img src={sojoFull} className="h-[200px] md:h-[450px] relative md:-left-36 left-16 md:bottom-0 bottom-[570px]" />
            </div>
        </div>
    );
};

export default Hero;
