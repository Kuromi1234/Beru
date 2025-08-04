import React, { useContext } from "react";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        Loading your profile...
      </div>
    );
  }

  return (
  
     <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl shadow-[0_20px_60px_rgba(128,90,213,0.3)] p-6 sm:p-10 w-[90%] max-w-md mx-auto mt-10 sm:mt-20 relative overflow-hidden transition-all duration-500">

        
        {/* Subtle Background Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-500 opacity-30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-500 opacity-30 rounded-full blur-3xl pointer-events-none" />

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-purple-500/60 shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="text-center text-white space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-purple-300">{user.name}</h1>
          <p className="text-sm text-indigo-300">{user.email}</p>
          <p className="text-xs text-indigo-400 tracking-wide">{user.employeeId}</p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-white/10" />

        {/* Meta Info */}
        <div className="space-y-2 text-sm text-white text-center">
          <div>
            <span className="text-purple-400 font-medium">Role:</span>{" "}
            <span className="text-indigo-200">{user.role}</span>
          </div>
          <div>
            <span className="text-purple-400 font-medium">Department:</span>{" "}
            <span className="text-indigo-200">{user.department || "IT"}</span>
          </div>
          <div>
            <span className="text-purple-400 font-medium">Employee ID:</span>{" "}
            <span className="text-indigo-200">{user.employeeId || "N/A"}</span>
          </div>
          <div>
            <span className="text-purple-400 font-medium">Designation:</span>{" "}
            <span className="text-indigo-200">{user.designation || "Systems Engineer"}</span>
          </div>
        </div>
      </div>

  );
};

export default ProfilePage;
