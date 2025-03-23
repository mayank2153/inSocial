import { useState } from "react";
import { FaChevronUp,FaChevronDown } from "react-icons/fa6";
const FAQ=()=>{
    const [openIndex, setOpenIndex] = useState(0);
    const FaqContent=[
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
            title:"How can I contact inSocial support?",
            content:"You can reach out to our support team through the 'Contact Us' page or by emailing support@insocial.tech."
        }
    ]
       const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return(
        <div className="flex justify-between text-white my-20">
            <div className="max-w-[1/2] flex flex-col items-center justify-center w-full px-10 gap-4">
                <div className="text-center space-y-4">
                    <p className="text-5xl">Frequently Asked Questions</p>
                    <p className="opacity-60 text-xl">Find questions and answers related to the design system,<br />
                    purchase, updates, and support.</p>
                </div>
                <div className="w-full space-y-4">
                    {FaqContent.map((faq, index) => (
                        <div 
                            key={index} 
                            className=" border-opacity-40 rounded-lg bg-gradient-to-b from-neutral-900 to-neutral-800  transition-all duration-700"
                        >
                            <button 
                                className="flex justify-between items-center w-full py-4 px-6 text-left focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-medium text-lg">{faq.title}</span>
                                <div className="transform transition-transform duration-700 ease-in-out">
                                    {openIndex === index ? 
                                        <FaChevronUp className="h-4 w-4 text-gray-300" /> : 
                                        <FaChevronDown className="h-4 w-4 text-gray-300" />
                                    }
                                </div>
                            </button>
                            
                            <div 
                                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="px-6 pb-5 pt-1">
                                    <p className="text-gray-300">{faq.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-[1/2] w-full flex justify-center items-center">
                <div className="rounded-3xl w-[620px] h-[400px] border-2 border-[#d3b7ef]" style={{boxShadow:"40px 20px 80px 0px #7F3FBF, 30px 35px 50px 0px #7025ba, 1px 1.5px 3px 0px #d3c5e0"}}>
                    <div >
                    
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FAQ;