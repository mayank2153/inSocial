import logoImage from "../../assets/images/logoinsocial-removebg-preview.jpg";

const LandingPageComponent = () => {
  return (
    <div className="bg-[#121212] text-[#EDEDED]">
      <div className="px-4 sm:px-10 py-3 sm:py-5 flex justify-between items-center">
        <img
          src={logoImage}
          alt="logo"
          className="h-[40px] w-[80px] sm:h-[50px] sm:w-[100px]"
        />
        <button className="px-4 sm:px-6 py-2 border border-[#EDEDED] rounded-3xl">
          Get Started
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center pt-10">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl">Connect with your</h1>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl mt-2">
          friends easily
        </h1>
        <span className="text-base sm:text-lg lg:text-xl mt-4">
          The best website for your free time
        </span>
      </div>
      <div className="flex justify-center space-x-4 py-8">
        <button className="px-4 sm:px-6 py-2 w-28 border border-[#7f3fbf] bg-[#7f3fbf] rounded-3xl">
          Login
        </button>
        <button className="px-4 sm:px-6 py-2 w-28 border border-[#7f3fbf] bg-[#7f3fbf] rounded-3xl">
          Register
        </button>
      </div>
      {/* below the image */}
      <div className="p-10 flex flex-col">
        <h1 className="text-3xl sm:text-4xl">Post, Connect, Engage</h1>
        <span className="pt-6 pb-1">
          Connect with people worldwide, easy to use
        </span>
        <span>Simple, secure and fun</span>
        <button className="px-4 py-2 mt-6 border w-28 border-[#7f3fbf] bg-[#7f3fbf] rounded-3xl">
          Explore
        </button>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 my-10">
          <div className="order-2 lg:order-1 lg:translate-y-1/3">
            <img
              src="https://res.cloudinary.com/dc2ytoxzg/image/upload/v1733755298/landigpage_iqe90z.jpg"
              alt="Image 1"
              className="w-full h-auto md:w-[600px] md:h-[400px] rounded-xl"
            />
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="https://res.cloudinary.com/dc2ytoxzg/image/upload/v1733755280/landingpage3_mf6pd9.jpg"
              alt="Image 2"
              className="w-full h-auto md:w-[600px] md:h-[400px] rounded-xl"
            />
          </div>
          <div className="order-3 lg:translate-y-1/3">
            <img
              src="https://res.cloudinary.com/dc2ytoxzg/image/upload/v1733757595/landingpage4_olvbou.jpg"
              alt="Image 3"
              className="w-full h-auto md:w-[600px] md:h-[400px] rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* features */}
      <div className="my-10 lg:mt-28 flex flex-col text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl">Our features</h1>
        <span className="pt-4 pb-1 ">Connect, Share, and Grow</span>
        <span>with Features Built for You.</span>
      </div>
      <div className="p-10 grid grid-cols-1 md:grid-cols-3  gap-6 md:h-[600px] h-auto">
        <div className="lg:ml-20 border border-[#7f3fbf] rounded-xl text-center bg-[#7f3fbf] h-full">
          <h3 className="text-2xl pt-10 font-bold mb-2 text-white">
            Create interesting posts
          </h3>
          <p className="text-base text-center mb-4 text-white">
            Get the website to start creating your content and collaborate
            seamlessly with other people.
          </p>
          <button className="bg-white text-[#7f3fbf] px-6 py-2 rounded-3xl">
            Get the App
          </button>
        </div>
        <div className="flex flex-col space-y-6">
          <div className="border border-gray-600 rounded-xl bg-gray-600 h-1/3 pl-4 pt-10">
            <h3 className="text-2xl pt-2 font-bold mb-2 text-white">
              Message freely
            </h3>
            <p className="text-base text-white mb-4">
              Start conversation with your friends, start a group chat and make
              memories.
            </p>
          </div>
          <div className="border border-[#3a86ff] bg-[#3a86ff] rounded-xl text-center p-4 h-2/3">
            <h3 className="text-2xl font-bold mb-2 text-white">Translation</h3>
            <p className="text-base text-center mb-4 text-white">
              No language barrier! Translate your messages into any language.
            </p>
            <button className="bg-white text-[#7f3fbf] px-6 py-2 rounded-3xl">
              Get the App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageComponent;
