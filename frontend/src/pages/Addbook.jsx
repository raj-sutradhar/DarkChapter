import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Addbook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    language: "English",
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:3000/api/v1/addbook", formData, {
        headers,
      });
      setSuccess("Book added successfully!");
      setFormData({
        title: "",
        author: "",
        price: "",
        description: "",
        language: "English",
        url: "",
      });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-purple-400/20 shadow-2xl shadow-purple-900/20 p-6 md:p-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-8">
            Add New Book
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-xl border border-purple-900/30">
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/30 border border-purple-400/20 rounded-lg px-4 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl border border-purple-900/30">
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/30 border border-purple-400/20 rounded-lg px-4 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl border border-purple-900/30">
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/30 border border-purple-400/20 rounded-lg px-4 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl border border-purple-900/30">
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full bg-gray-900/30 border border-purple-400/20 rounded-lg px-4 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-xl border border-purple-900/30">
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Cover Image URL
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                className="w-full bg-gray-900/30 border border-purple-400/20 rounded-lg px-4 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <div className="bg-gray-800/50 p-4 rounded-xl border border-purple-900/30">
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full bg-gray-900/30 border border-purple-400/20 rounded-lg px-4 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
              ></textarea>
            </div>

            {error && (
              <div className="text-red-400 p-3 rounded-lg bg-red-900/20 border border-red-400/20">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-400 p-3 rounded-lg bg-green-900/20 border border-green-400/20">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Book..." : "Add Book"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addbook;
