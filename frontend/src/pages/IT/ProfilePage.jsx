import {  useEffect, useState } from "react";
import { useAuth} from "../../context/AuthContext";
import axios from "axios";
import ProfileHeader from "../../components/profile/ProfileHeader";
import AssignedAssetCard from "../../components/profile/AssignedAssetCard";
import SkeletonLoader from "../../components/profile/SkeletonLoader";
import EmptyState from "../../components/profile/EmptyState";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { user } = useAuth();
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedAssets = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/assets/assigned", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssignedAssets(res.data.assets);

      } catch (err) {
        console.error("Error fetching assigned assets", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedAssets();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-10"
    >
      <ProfileHeader user={user} />

      <h2 className="text-xl text-white font-semibold mb-4">
        🎒 Assigned Assets
      </h2>

      {loading ? (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      ) : assignedAssets.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedAssets.map((asset, idx) => (
            <AssignedAssetCard key={idx} asset={asset} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProfilePage;
