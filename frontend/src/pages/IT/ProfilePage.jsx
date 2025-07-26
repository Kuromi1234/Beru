import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      const res = await axios.get("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fixed: Access user from correct response structure
      const user = res.data.user; // Direct access since backend returns { user }
      setUser(user);
    } catch (err) {
      console.error("User fetch error:", err);
      toast.error(err?.response?.data?.message || "Failed to fetch user");
    }
  };

  const fetchUserAssets = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      const res = await axios.get("/api/assets/assigned", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAssets(res.data.assets || []);
    } catch (err) {
      console.error("Assets fetch error:", err);
      toast.error(err?.response?.data?.message || "Failed to fetch assets");
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchUserData();
      await fetchUserAssets();
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <div className="p-6 text-white">Loading...</div>;

  if (!user)
    return <div className="p-6 text-red-400">⚠️ Failed to load profile</div>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">Welcome, {user.name}</h2>
      <p className="mb-4 text-gray-400">{user.email}</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Assigned Assets:</h3>
      {assets.length === 0 ? (
        <p className="text-gray-500">No assets assigned.</p>
      ) : (
        <ul className="list-disc list-inside">
          {assets.map((asset) => (
            <li key={asset._id} className="mb-2">
              <span className="font-medium">{asset.name}</span> — {asset.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;