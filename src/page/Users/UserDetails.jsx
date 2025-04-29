import React, { useState } from "react";
import { message } from "antd";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";

const UserDetails = () => {
  // Static user data
  const userDataFull = {
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    role: "Admin",
    createdAt: "2023-01-15T10:30:00Z",
    isBanned: false, // Active status (change to `true` to simulate blocked)
    imageUrl: "https://example.com/userimage.png",
  };

  // Static block/unblock actions (just for simulation)
  const [isBanned, setIsBanned] = useState(userDataFull.isBanned);

  const handleUserRemove = async () => {
    // Simulate block action
    setIsBanned(true);
    message.success("User has been blocked.");
  };

  const handleUserUnBlock = async () => {
    // Simulate unblock action
    setIsBanned(false);
    message.success("User has been unblocked.");
  };

  return (
    <div>
      <Link to={"/users"} className="text-2xl flex items-center mt-5">
        <FaAngleLeft /> User Details
      </Link>

      <div className="my-10 w-full md:w-2/4 mx-auto">
        {/* User Profile Section */}
        <div className="flex items-center justify-between gap-5 mb-5">
          <div className="flex items-center gap-5">
            <img
              className="w-24 h-24 rounded-full"
              src={userDataFull.imageUrl || "../../../public/logo/userimage.png"}
              alt="User"
            />
            <h1 className="text-2xl font-semibold">{userDataFull?.fullName}</h1>
          </div>
        </div>

        {/* User Details Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Name</span>
            <span>{userDataFull?.fullName}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Email</span>
            <span>{userDataFull?.email}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Status</span>
            <span>{!isBanned ? "Active" : "Blocked"}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Phone Number</span>
            <span>{userDataFull?.phoneNumber}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">User Type</span>
            <span>{userDataFull?.role}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Joining Date</span>
            <span>
              {new Date(userDataFull?.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default UserDetails;