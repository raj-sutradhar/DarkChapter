import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/getuser", {
          headers,
        });
        setProfileData(res.data);
        setValue({ address: res.data.address });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.put(
        "http://localhost:3000/api/v1/updateAddress",
        { address: value.address },
        { headers }
      );
      setSuccess("Address updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Update error:", error);
      setError("Failed to update address");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-purple-400/20 shadow-xl lg:shadow-2xl shadow-purple-900/20 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6 sm:mb-8">
            Account Settings
          </h1>

          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="relative group">
              <img
                src={profileData?.avatar}
                alt="Avatar"
                className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full border-2 border-purple-300/50 shadow-lg object-cover"
              />
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-purple-400/50 animate-pulse transition-all duration-500" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-100">
                {profileData?.username}
              </h2>
              <p className="text-xs sm:text-sm text-purple-300/80 mt-1">
                {profileData?.email}
              </p>
            </div>
          </div>

          {/* Settings Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              {/* Username Field */}
              <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-900/30">
                <label className="block text-xs sm:text-sm font-medium text-purple-300 mb-1 sm:mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={profileData?.username || ""}
                  readOnly
                  className="w-full bg-gray-900/30 border border-purple-400/20 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              {/* Email Field */}
              <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-900/30">
                <label className="block text-xs sm:text-sm font-medium text-purple-300 mb-1 sm:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData?.email || ""}
                  readOnly
                  className="w-full bg-gray-900/30 border border-purple-400/20 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              {/* Address Field */}
              <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-900/30">
                <label className="block text-xs sm:text-sm font-medium text-purple-300 mb-1 sm:mb-2">
                  Delivery Address
                </label>
                <textarea
                  value={value.address}
                  onChange={(e) => setValue({ address: e.target.value })}
                  className="w-full bg-gray-900/30 border border-purple-400/20 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                  rows="3"
                  placeholder="Enter your delivery address..."
                />
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="text-red-400 text-xs sm:text-sm p-2 sm:p-3 rounded-lg bg-red-900/20 border border-red-400/20">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-400 text-xs sm:text-sm p-2 sm:p-3 rounded-lg bg-green-900/20 border border-green-400/20">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 active:scale-95"
            >
              Update Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
