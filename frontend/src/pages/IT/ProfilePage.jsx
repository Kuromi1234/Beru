import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-white text-lg text-center mt-10">
        Loading Profile...
      </div>
    );
  }

  const [firstName, lastName] = user.name.split(" ");

  return (
    <div className=" w-full flex items-center justify-center  px-4 py-10 ">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 12 }}
        className="relative max-w-4xl w-full p-8 md:p-12 "
      >
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <motion.img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt="User Avatar"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          />

          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-1">
              {firstName?.toUpperCase()} {lastName?.toUpperCase()}
            </h2>
            <p className="text-indigo-300 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/10" />

        {/* Profile Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-center">
          <div className="bg-white/5 p-4 rounded-xl shadow-inner border border-white/10 hover:shadow-lg transition">
            <span className="text-purple-400 font-semibold block mb-1">EmpID</span>
            <span className="text-indigo-100">{user?.employeeId}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-xl shadow-inner border border-white/10 hover:shadow-lg transition">
            <span className="text-purple-400 font-semibold block mb-1">Department</span>
            <span className="text-indigo-100">{user.department}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-xl shadow-inner border border-white/10 hover:shadow-lg transition">
            <span className="text-purple-400 font-semibold block mb-1">Designation</span>
            <span className="text-indigo-100">{user.designation || "Systems Engineer"}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
