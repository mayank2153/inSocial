import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkTokenValidity } from "../utils/userAuth.jsx"; // Import the checkTokenValidity function
import { logout } from "../utils/authslice.jsx"; // Import your actions

const ProtectedRoute = ({ children }) => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    console.log('hiii am i here in protected route');
    
    const validateToken = async () => {
      const isValid = await checkTokenValidity();
      if (!isValid) {
        dispatch(logout()); 
        setIsAuthenticated(false);// Dispatch logout if the token is not valid
      }
      setIsChecking(false); // Finish checking the token
    };

    validateToken();
  }, [dispatch]);

  
  // Render loading state while checking the token
  if (isChecking) {
    return <div>Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
