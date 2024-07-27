import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const username = user?.data?.user?.userName;

  useEffect(() => {
    console.log('UserProfile component mounted');
    console.log('User Data:', user);
    setUserData(user);
  }, [user]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-[#2e2b2b] text-white pt-20 pl-72 pr-80">
      
      {/* Add more user data fields as needed */}
      <div className="bg-[#13181d] min-w-[600px] min-h-[300px] shadow-xl">
      <h1>User Profile</h1>
      <p>Name: {username}</p>
      </div>
    </div>
  );
};

export default UserProfile;
