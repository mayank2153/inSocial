import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserData } from '../../api/getUserbyId';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from "../../utils/authslice.jsx";
import Shimmer from '../shimmer/shimmer.jsx';

const GoogleRedirectHandler = () => {
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
                
                if (userId) {
                    const userInfo = await UserData(userId);
                    
                    dispatch(loginSuccess(userInfo)); // Store user data in Redux
                    console.log("dispatched login for google auth")
                } else {
                    throw new Error("User ID not found in URL");
                }
                setLoading(false);
                navigate('/'); // Redirect to the homepage or desired route
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to fetch user data");
                dispatch(loginFailure()); // Dispatch failure action
                setLoading(false);
                navigate('/login'); // Redirect to login on error
            }
        };

        fetchUserData();
    }, [location.search, navigate, dispatch]);

    if (loading) return <Shimmer />;
    if (error) return <div>{error}</div>;

    return null; // No need to render anything since we're redirecting
};

export default GoogleRedirectHandler;
