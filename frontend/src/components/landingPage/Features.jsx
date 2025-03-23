import { flowerFrame, userPurple, heartPurple, chatPurple, sendPurple } from "../../utils/links/assets";

const FeatureCards = [
    {
        logo: userPurple,
        title: "Connect",
        content: "Connect with like-minded individuals"
    },
    {
        logo: sendPurple,
        title: "Share",
        content: "Express yourself through posts, media, and stories"
    },
    {
        logo: heartPurple,
        title: "Discover",
        content: "Interact seamlessly through chats, comments, and reactions."
    },
    {
        logo: chatPurple,
        title: "Engage",
        content: "Discover what's trending and personalize your feed"
    }
];

const Features = () => {
    return (
        <div className="flex flex-col gap-10 items-center text-xl my-20 px-5 md:px-10">
            {/* Header */}
            <div className="flex gap-2 items-center">
                <img src={flowerFrame} className="w-8 md:w-12" alt="Flower Frame"/>
                <p className="opacity-80 text-xl md:text-2xl">Why You'll Love It</p>
            </div>

            {/* Title */}
            <div>
                <p className="text-3xl md:text-5xl text-center">
                    Connect with friends, share your passions, <br className="hidden md:block"/> & find your community.
                </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-20 w-full max-w-6xl">
                {FeatureCards.map((feature, index) => (
                    <div key={index} className="max-w-80 w-full space-y-2 flex flex-col justify-center items-center text-center">
                        <div className="rounded-xl w-16 h-16 md:w-20 md:h-20 flex justify-center items-center"
                             style={{ background: "linear-gradient(153deg, #F7EFFF 16.67%, #E5CDFF 100%)" }}>
                            <img src={feature.logo} className="w-8 md:w-10" alt={feature.title}/>
                        </div>
                        <p className="text-lg md:text-xl font-semibold">{feature.title}</p>
                        <p className="opacity-60 text-sm md:text-base">{feature.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
