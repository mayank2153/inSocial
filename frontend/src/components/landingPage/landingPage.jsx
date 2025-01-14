import logoImage from "../../assets/images/logoinsocial-removebg-preview.jpg";
import heroSectionImage from "../../assets/images/Untitled.png";
import { Link } from "react-router-dom";

const LandingPageComponent = () => {
  return (
    <div className="bg-[#121212] text-[#EDEDED] min-h-screen flex flex-col">
      <nav className="container mx-auto px-4 py-3 sm:py-5 flex justify-between items-center">
        <img
          src={logoImage}
          alt="logo"
          className="h-10 w-20 sm:h-12 sm:w-24 md:h-14 md:w-28 object-contain"
        />
        <Link to="/register">
          <button className="px-3 sm:px-6 py-1 sm:py-2 text-sm sm:text-base border border-[#EDEDED] rounded-3xl hover:bg-[#EDEDED] hover:text-[#121212] transition-colors">
            Get Started
          </button>
        </Link>
      </nav>

      <div className="container mx-auto px-4 flex flex-col items-center text-center pt-10 sm:pt-16 md:pt-20 flex-grow">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
          Connect with your
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
          friends easily
        </h1>
        <p className="text-gray-400 sm:text-lg md:text-xl mt-4 max-w-2xl">
          The best website for your free time
        </p>

        <div className="flex justify-center space-x-4 mt-6 sm:mt-8">
          <Link to="login">
            <button className="px-4 sm:px-6 py-2 w-24 sm:w-28 text-sm sm:text-base border border-[#7f3fbf] bg-[#7f3fbf] rounded-3xl hover:opacity-90 transition-opacity">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-4 sm:px-6 py-2 w-24 sm:w-28 text-sm sm:text-base border border-[#7f3fbf] bg-[#7f3fbf] rounded-3xl hover:opacity-90 transition-opacity">
              Register
            </button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 sm:mt-12">
        <img
          src={heroSectionImage}
          alt="heroSection"
          className="w-full max-w-5xl mx-auto object-contain"
        />
      </div>

      <div className="container mx-auto px-4 py-10 sm:py-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Post, Connect, Engage
          </h2>
          <p className="mt-4 text-gray-400 sm:text-lg max-w-xl mx-auto">
            Connect with people worldwide, easy to use.
          </p>
          <p className="text-gray-400">Simple, secure and fun</p>
          <Link to="login">
            <button className="mt-6 px-4 sm:px-6 py-2 border border-[#7f3fbf] bg-[#7f3fbf] rounded-3xl hover:opacity-90 transition-opacity">
              Explore
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          <div className="lg:mt-32">
            <img
              src="https://res.cloudinary.com/dc2ytoxzg/image/upload/v1733755298/landigpage_iqe90z.jpg"
              alt="Image 1"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dc2ytoxzg/image/upload/v1733755280/landingpage3_mf6pd9.jpg"
              alt="Image 2"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
          <div className="lg:mt-32">
            <img
              src="https://res.cloudinary.com/dc2ytoxzg/image/upload/v1733757595/landingpage4_olvbou.jpg"
              alt="Image 3"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>
      </div>

      <footer className="bg-[#1E1E1E] w-full py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={logoImage}
              alt="logo"
              className="h-12 w-24 object-contain"
            />
          </div>

          <div className="text-center mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} InSocial. All Rights Reserved.
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/rahulbhardwaj09/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#0A66C2] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            <a
              href="https://x.com/10xRahul_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#1DA1F2] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageComponent;
