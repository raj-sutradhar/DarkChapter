import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/getuser",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar Column */}
        <div className="w-full md:w-72 lg:w-80 transform transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/30">
          <Sidebar data={profile} />
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-purple-400/20 shadow-2xl shadow-purple-900/20 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
