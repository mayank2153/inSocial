import { Outlet } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { toggleDarkMode } from '../../utils/darkmodeSlice';
import logo from '../../assets/images/logo_w_bg.svg'
const AuthLayout = () => {
  const darkMode=useSelector(state=>state.theme.darkMode)
  const dispatch=useDispatch()
  const togglePasswordVisibility = () => {
    dispatch(toggleDarkMode());
  }
  return (
    <div className="lg:flex items-center  flex-col lg:flex-row lg:justify-evenly min-h-screen  w-full ">
      <div className={`${darkMode?'bg-[#1e1e1e]':'bg-[#e5e3e6]'} h-screen  mr-0 max-w-full lg:w-[70%] flex flex-col  `}>
      <img src={logo} className='w-16 ml-5 pt-5'></img>
        <div className="lg:w-[calc(100%-60%)] sm:min-w-[60%] sm:max-w-[80%] lg:min-w-0 lg:ml-[calc(100%-80%)] mx-auto my-auto">
          <Outlet />
        </div>
      </div>
      <div className="lg:absolute lg:block sm:hidden w-full my-auto right-[calc(100%-84%)] rounded-lg h-full max-w-[500px] max-h-[600px] bg-[#121212] "></div>
      <div className="w-[30%] h-screen bg-[#7F3FBF] lg:block hidden">
        
      <button className='bg-red-400 ' onClick={togglePasswordVisibility}>Toggle dark mode</button>
      </div>
    </div>
  );
};

export default AuthLayout;
