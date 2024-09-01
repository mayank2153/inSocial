import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkTokenValidity } from "../utils/userAuth.jsx";
import { logout } from "../utils/authslice.jsx";
import loading_gif from "../assets/gifs/loading.gif";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated_redux = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticated_redux); // Use Redux state initially

  useEffect(() => {
    const validateToken = async () => {
      const isValid = await checkTokenValidity();
      if (!isValid) {
        dispatch(logout());
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
      
      setIsChecking(false); // Finish checking the token
    };

    if (isAuthenticated_redux) {
      validateToken();
    } else {
      setIsAuthenticated(false);
      setIsChecking(false); // No need to check if already not authenticated in Redux
    }
  }, [dispatch, isAuthenticated_redux]);

  // Render loading state while checking the token
  if (isChecking) {
    return (
      <div className="bg-black flex items-center justify-center h-[100vh]">
        <img src={loading_gif} alt="loading..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
