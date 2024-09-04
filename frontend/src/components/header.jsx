import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import logo_img from "../assets/images/logo_img.png";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import ProfilePage from './userProfile/profilePage';
import SearchBar from './searchBar/searchBar.jsx';
import { CountUnreadNotification } from '../api/unreadNotificationCount.js';
import { UpdateCount } from '../api/updateReadNotificationCount.js';

const Header = ({ toggleCategories }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userData = useSelector((state) => state.auth.user);
    const userId = userData?.data.user ? userData?.data?.user?._id : userData?.data?._id;
    const userProfileImage = userData?.data.user ? userData?.data?.user?.avatar : userData?.data?.avatar;

    const navigate = useNavigate();
    const unreadCount = useSelector((state) => state.notification.unreadCount);

    const unreadNotification = async () => {
        await CountUnreadNotification(userId, dispatch);
    };

    useEffect(() => {
        unreadNotification();
    }, [userId]);

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleReadCount = async () => {
        navigate(`/notification/${userId}`);
        setTimeout(async () => {
            await UpdateCount(userId, dispatch);
        }, 1000);
    };

    return isAuthenticated ? (
        <header className="bg-[#0d1114] w-full shadow-lg border-b border-gray-600">
            <div className="container mx-auto px-4 lg:px-6 max-w-full">
                <nav className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex items-center">
                        <button
                            className="lg:hidden p-2 text-white"
                            onClick={toggleCategories}
                        >
                            <FaBars size={25} className='mt-2' />
                        </button>
                        <Link to="/" title="Home" className="flex items-center ml-4">
                            <img className="h-12 lg:h-14 lg:w-28 hidden lg:block" src={logo} alt="Logo" />
                            <img className={`w-auto h-8 lg:h-10 lg:hidden`} src={logo_img} alt="Logo" />
                        </Link>
                    </div>

                    <div className={`flex-grow ${isSearchOpen ? 'flex' : 'hidden'} lg:flex items-center justify-center`}>
                        <SearchBar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
                    </div>

                    <div className="flex items-center space-x-4">
                        {!isSearchOpen && (
                            <button
                                type="button"
                                className="inline-flex lg:hidden p-2 text-white rounded-md"
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <IoIosSearch size={25} />
                            </button>
                        )}

                        <div className='relative cursor-pointer text-slate-200' onClick={handleReadCount}>
                            <IoNotificationsSharp size={30} className='mr-4' />
                            {unreadCount > 0 && (
                                <span className='absolute -top-2 -right-2 bg-red-700 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center mr-4'>
                                    {unreadCount}
                                </span>
                            )}
                        </div>

                        <div className="relative overflow-hidden">
                          <Link to={`/UserProfile/${userId}`}>
                          <img
                                src={userProfileImage}
                                alt="user Profile"
                                className="w-12 h-12 rounded-full object-cover cursor-pointer"
                                onClick={toggleProfile}
                            />
                          </Link>

                            {/* {isProfileOpen && <ProfilePage isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />} */}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    ) : null;
};

export default Header;
