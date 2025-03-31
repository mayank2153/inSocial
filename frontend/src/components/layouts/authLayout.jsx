import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../utils/darkmodeSlice';
import { logo } from '../../utils/links/assets';
import { useEffect, useState } from 'react';

const AuthLayout = () => {
  const darkMode = useSelector(state => state.theme.darkMode);
  const [image, setImage] = useState('');
  const location = useLocation(); 
  const [path, setPath] = useState('login');

  const backgroundImages = {
    'login': 'https://res.cloudinary.com/dhrbg2jbi/image/upload/v1742896943/%E6%8B%9B%E8%81%98%E7%9F%A2%E9%87%8F%E6%8F%92%E7%94%BB%E4%BA%BA%E7%89%A9%E5%9C%BA%E6%99%AF%E6%8F%92%E7%94%BB%E6%8B%9B%E8%81%981060924%E9%BB%91%E4%B8%8E%E7%99%BD-01_copy_1_idlw4y.svg',
    'register': 'https://res.cloudinary.com/dhrbg2jbi/image/upload/v1742897250/%E6%8B%9B%E8%81%98%E7%9F%A2%E9%87%8F%E6%8F%92%E7%94%BB%E4%BA%BA%E7%89%A9%E5%9C%BA%E6%99%AF%E6%8F%92%E7%94%BB%E6%8B%9B%E8%81%981100924%E9%BB%91%E4%B8%8E%E7%99%BD-01_copy_1_mcbw0h.svg',
    'verifyEmail': 'https://res.cloudinary.com/dhrbg2jbi/image/upload/v1742897366/%E6%8B%9B%E8%81%98%E7%9F%A2%E9%87%8F%E6%8F%92%E7%94%BB%E4%BA%BA%E7%89%A9%E5%9C%BA%E6%99%AF%E6%8F%92%E7%94%BB%E6%8B%9B%E8%81%981040924%E9%BB%91%E4%B8%8E%E7%99%BD-01_copy_1_prwt5a.svg',
    'Forget-Password': 'https://res.cloudinary.com/dhrbg2jbi/image/upload/v1742897366/%E6%8B%9B%E8%81%98%E7%9F%A2%E9%87%8F%E6%8F%92%E7%94%BB%E4%BA%BA%E7%89%A9%E5%9C%BA%E6%99%AF%E6%8F%92%E7%94%BB%E6%8B%9B%E8%81%981040924%E9%BB%91%E4%B8%8E%E7%99%BD-01_copy_1_prwt5a.svg',
    'reset-password': 'https://res.cloudinary.com/dhrbg2jbi/image/upload/v1742897366/%E6%8B%9B%E8%81%98%E7%9F%A2%E9%87%8F%E6%8F%92%E7%94%BB%E4%BA%BA%E7%89%A9%E5%9C%BA%E6%99%AF%E6%8F%92%E7%94%BB%E6%8B%9B%E8%81%981040924%E9%BB%91%E4%B8%8E%E7%99%BD-01_copy_1_prwt5a.svg'
  };

  useEffect(() => {
    getBackgroundImage();
  }, [location.pathname]); 

  const getBackgroundImage = () => {
    const currentPath = Object.keys(backgroundImages).find(path =>
      location.pathname.includes(path)
    );
    if (currentPath) {
      setImage(backgroundImages[currentPath]);
      setPath(currentPath);
    }
  };

  return (
    <div className="lg:flex items-center flex-col lg:flex-row lg:justify-evenly min-h-screen w-full">
      <div className={`${darkMode ? 'bg-[#1e1e1e]' : 'bg-[#e5e3e6]'} h-screen mr-0 max-w-full lg:w-[45%] flex flex-col`}>
        <img src={logo} className="w-60 m-4" alt="Logo" />
        <div className="mx-[calc(100%-95%)] flex justify-center items-center h-screen">
          <Outlet />
        </div>
      </div>
      <div
        className="bg-[#7f3fbf] w-full h-screen lg:w-[55%] bg-cover bg-center bg-no-repeat flex justify-end items-center flex-col"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dhrbg2jbi/image/upload/v1742895665/Frame_1984078126_cy4fie.svg')`,
          backgroundSize: '140% 200%',
          backgroundPosition: '5% 20%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {(path === 'login' || path==="register") && (
          <div className="flex justify-center items-start gap-2 text-white text-7xl flex-col w-full px-20">
            <p>
              Welcome to 
            </p> 
            
            <p className='font-semibold'>
              InSocial
              </p>
          </div>
        )}
        <img src={image} alt="Background " className='lg:w-[600px] ' />
      </div>
    </div>
  );
};

export default AuthLayout;
