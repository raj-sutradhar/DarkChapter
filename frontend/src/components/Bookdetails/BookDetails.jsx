import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import {
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({});
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [readersCount] = useState(() =>
    Math.floor(Math.random() * (50000 - 501 + 1) + 501)
  );

  const formatReaders = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k+`;
    }
    return `${num.toLocaleString()}+`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/getbook/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      }
    };
    fetchData();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavorite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/addtofavourite",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Error updating favorites");
      console.error(error);
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/addtocart",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Error adding to cart");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        "http://localhost:3000/api/v1/deletebook",
        { headers }
      );
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert("Failed to delete book");
      console.error(error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        url: editedBook.url,
        title: editedBook.title,
        author: editedBook.author,
        price: parseFloat(editedBook.price),
        description: editedBook.description,
        language: editedBook.language,
      };

      await axios.put("http://localhost:3000/api/v1/updatebook", updatedData, {
        headers,
      });

      // Refresh book data
      const response = await axios.get(
        `http://localhost:3000/api/v1/getbook/${id}`
      );
      setData(response.data.data);
      setIsEditing(false);
      alert("Book updated successfully!");
    } catch (error) {
      alert("Failed to update book");
      console.error(error);
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen">
      {data ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
            {/* Book Cover Section */}
            <div className="md:w-1/2 relative w-full">
              <div className="relative rounded-2xl overflow-hidden transform transition-all duration-500 md:hover:rotate-[1deg] hover:shadow-2xl hover:shadow-purple-900/50 bg-gray-700/30">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-900/30"></div>
                <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center p-4">
                  <img
                    src={data.url}
                    alt={data.title}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Floating Bookmark */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 animate-float">
                  <svg
                    className="w-12 h-12 md:w-16 md:h-16 rotate-12 text-purple-400 filter drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>

                {/* Admin Controls */}
                {isLoggedIn && role === "admin" && (
                  <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-3">
                    <button
                      className="p-2 rounded-full bg-gray-900/60 backdrop-blur-sm text-gray-300 hover:bg-blue-600/50 hover:text-white transition-all duration-300"
                      onClick={() => {
                        setEditedBook(data);
                        setIsEditing(true);
                      }}
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 rounded-full bg-gray-900/60 backdrop-blur-sm text-gray-300 hover:bg-red-600/50 hover:text-white transition-all duration-300"
                      onClick={handleDelete}
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* User Controls */}
                {isLoggedIn && role === "user" && (
                  <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-3">
                    <button
                      className="p-2 rounded-full bg-gray-900/60 backdrop-blur-sm text-gray-300 hover:bg-pink-600/50 hover:text-white transition-all duration-300"
                      onClick={handleFavorite}
                    >
                      <FaRegHeart className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 rounded-full bg-gray-900/60 backdrop-blur-sm text-gray-300 hover:bg-purple-600/50 hover:text-white transition-all duration-300"
                      onClick={handleCart}
                    >
                      <FaShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-gray-900/80 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-purple-900/30">
                  <h3 className="text-white font-semibold text-sm md:text-base">
                    Current Price
                  </h3>
                  <p className="text-purple-400 text-lg md:text-xl mt-1 font-bold">
                    ₹{data.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Book Details Section */}
            <div className="md:w-1/2 space-y-6 md:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                {data.title}
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  by {data.author}
                </span>
              </h1>

              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-900/30">
                  <h3 className="text-purple-400 font-semibold mb-2">
                    Synopsis
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {data.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-900/30">
                    <h4 className="text-purple-400 text-sm font-semibold">
                      Language
                    </h4>
                    <p className="text-white text-lg mt-1">{data.language}</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-900/30">
                    <h4 className="text-purple-400 text-sm font-semibold">
                      Genre
                    </h4>
                    <p className="text-white text-lg mt-1">Fantasy</p>
                  </div>
                </div>

                {role === "user" && (
                  <button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-purple-500/30"
                    onClick={handleCart}
                  >
                    Add to Cart 📖
                  </button>
                )}

                <div className="flex items-center space-x-4 pt-4">
                  <div className="flex -space-x-2">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Reader1"
                      alt="Reader"
                      className="w-10 h-10 rounded-full border-2 border-gray-800"
                    />
                    <img
                      src="https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Reader2"
                      alt="Reader"
                      className="w-10 h-10 rounded-full border-2 border-gray-800"
                    />
                  </div>
                  <p className="text-gray-400 text-sm">
                    Currently being enjoyed by {formatReaders(readersCount)}{" "}
                    readers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-gray-900 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Edit Book</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={editedBook.title || ""}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, title: e.target.value })
                  }
                  className="w-full bg-gray-700 rounded p-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Author</label>
                <input
                  type="text"
                  value={editedBook.author || ""}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, author: e.target.value })
                  }
                  className="w-full bg-gray-700 rounded p-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Price</label>
                <input
                  type="number"
                  value={editedBook.price || ""}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, price: e.target.value })
                  }
                  className="w-full bg-gray-700 rounded p-2 text-white"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  value={editedBook.description || ""}
                  onChange={(e) =>
                    setEditedBook({
                      ...editedBook,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 rounded p-2 text-white h-32"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Language</label>
                <input
                  type="text"
                  value={editedBook.language || ""}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, language: e.target.value })
                  }
                  className="w-full bg-gray-700 rounded p-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Image URL</label>
                <input
                  type="url"
                  value={editedBook.url || ""}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, url: e.target.value })
                  }
                  className="w-full bg-gray-700 rounded p-2 text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-12px) rotate(12deg);
          }
          100% {
            transform: translateY(0px) rotate(12deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BookDetails;
