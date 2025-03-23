import { sojoFull } from "../../utils/links/assets";

const stepsPart = [
    {
        title: "Create your account & Join the community",
        content: "Sign up using your email or social media account"
    },
    {
        title: "Personalise your experience with Interests",
        content: "Customize your feed with topics that match your passions."
    },
    {
        title: "Engage with Content and Connect",
        content: "Like, comment, and share posts to interact with the community."
    }
];

const Steps = () => {
    return (
        <div className="flex flex-col md:gap-10 md:space-y-10 text-xl my-20 px-5 md:px-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row text-center md:text-start gap-6 md:gap-36 items-center md:items-start">
                <p className="text-[#BF9FE7] text-3xl md:text-5xl  font-semibold md:w-[40%]">
                    Your Journey Begins:<br className="hidden md:block" /> 
                    A step-by-step guide to our Platform
                </p>
                <p className="md:w-[60%]  leading-6 md:leading-10 text-lg md:text-2xl">
                    Getting started on our platform is simple and intuitive. First, sign up for a free account to unlock all features. Once registered, you can explore personalized feeds, connect with friends, and engage with content that matters to you!
                </p>
            </div>

            {/* Steps Section */}
            <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-20 justify-between items-center">
                {/* Steps List */}
                <div className="w-full md:w-[40%] space-y-6 md:space-y-10 text-lg md:text-xl">
                    {stepsPart.map((step, index) => (
                        <div key={index} className="flex gap-4 items-start">
                            <div className="bg-[#7F3FBF] w-16 aspect-square md:w-10 md:h-10 rounded-full flex justify-center items-center">
                                <p className="text-white text-sm md:text-md">{index + 1}</p>
                            </div>
                            <div className="space-y-1 md:space-y-2">
                                <p className="font-semibold">{step.title}</p>
                                <p className="opacity-60">{step.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Image Section */}
                <img src={sojoFull} className="w-[90%] md:w-[520px] max-w-full" alt="Illustration" />
            </div>
        </div>
    );
};

export default Steps;
