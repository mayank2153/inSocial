import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const FaqContent = [
        {
            title: "What is inSocial?",
            content: "inSocial is a next-generation social media platform designed for meaningful connections and engaging discussions. It prioritizes user privacy, interactive communities, and a seamless content-sharing experience."
        },
        {
            title: "How do I create an account?",
            content: "To sign up, visit the inSocial homepage, click 'Sign Up,' and follow the instructions to enter your details. Verify your email, set up your profile, and start exploring!"
        },
        {
            title: "Is inSocial free to use?",
            content: "Yes, inSocial is completely free to use. While all core features are available at no cost, we may introduce premium features in the future for an enhanced experience."
        },
        {
            title: "How can I contact inSocial support?",
            content: "You can reach out to our support team through the 'Contact Us' page or by emailing support@insocial.tech."
        }
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between text-white my-10 md:my-20">
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 md:px-10 gap-4 mb-10 md:mb-0">
                <div className="text-center space-y-4">
                    <p className="text-3xl md:text-5xl">Frequently Asked Questions</p>
                    <p className="opacity-60 text-base md:text-xl">
                        Find questions and answers related to the design system,<br className="hidden md:block" />
                        purchase, updates, and support.
                    </p>
                </div>
                <div className="w-full space-y-4">
                    {FaqContent.map((faq, index) => (
                        <div 
                            key={index} 
                            className="border-opacity-40 rounded-lg bg-gradient-to-b from-neutral-900 to-neutral-800 transition-all duration-700"
                        >
                            <button 
                                className="flex justify-between items-center w-full py-3 md:py-4 px-4 md:px-6 text-left focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-medium text-base md:text-lg">{faq.title}</span>
                                <div className="transform transition-transform duration-700 ease-in-out">
                                    {openIndex === index ? 
                                        <FaChevronUp className="h-3 w-3 md:h-4 md:w-4 text-gray-300" /> : 
                                        <FaChevronDown className="h-3 w-3 md:h-4 md:w-4 text-gray-300" />
                                    }
                                </div>
                            </button>
                            
                            <div 
                                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="px-4 md:px-6 pb-4 md:pb-5 pt-1">
                                    <p className="text-gray-300 text-sm md:text-base">{faq.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full md:w-1/2 md:flex justify-center items-center hidden">
                <div 
                    className="rounded-3xl w-[280px] h-[200px] md:w-[620px] md:h-[400px] border-2 border-[#d3b7ef]" 
                    style={{
                        boxShadow: "20px 10px 40px 0px #7F3FBF, 15px 18px 25px 0px #7025ba, 1px 1.5px 3px 0px #d3c5e0"
                    }}
                >
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;