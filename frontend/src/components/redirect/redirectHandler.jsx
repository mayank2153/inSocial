import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserData } from '../../api/getUserbyId';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from "../../utils/authslice.jsx";
import Shimmer from '../shimmer/shimmer.jsx';
const GoogleRedirectHandler = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserData = async () => {
            const query = new URLSearchParams(location.search);
            const userId = query.get('userId');
            
            try {
                console.log("in redirect")
                if (userId) {
                    const userInfo=UserData(userId);
                    setUser(userInfo); 
                    console.log("user:",)                  // You can also store the user data in Redux or localStorage here
                }
                dispatch(loginSuccess(user));
                setLoading(false);
                navigate('/'); // Redirect to the homepage or desired route
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to fetch user data");
                setLoading(false);
                navigate('/login'); // Redirect to login on error
            }
        };

        fetchUserData();
    }, [location.search, navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return <div>
        <Shimmer />
    </div>; 
};

export default GoogleRedirectHandler;
