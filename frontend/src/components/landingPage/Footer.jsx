import { logo } from "../../utils/links/assets";
const Footer=()=>{
    return(
        <div className="space-y-4 md:space-y-10 my-auto px-5 md:px-20 overflow-hidden text-white z-10 py-10">
            <img src={logo} className="h-10 md:h-20">
            
            </img>
            <div className="flex md:gap-10 text-sm md:text-xl font-semibold flex-wrap gap-2">
                <p className="opacity-80">
                    inSocial 2025
                </p>
                <p>
                    Privacy policy
                </p>
                <p>
                    Cookies policy
                </p>
                <p>
                    Terms of use
                </p>
            </div>
        </div>
    )
}
export default Footer;