import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Bookcard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const removeFromFavourites = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/removefromfavourite",
        {},
        { headers }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <div className="group relative block transform transition-transform duration-300 hover:-translate-y-1">
      <Link to={`/bookdetails/${data._id}`} className="relative">
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-purple-500/30 border border-gray-700 hover:border-purple-400/30 max-w-xs mx-auto min-h-[420px] flex flex-col px-4 pt-4 pb-5">
          {/* Remove from Favorites Button */}
          {favourite && (
            <button
              onClick={removeFromFavourites}
              className="absolute top-3 right-3 z-10 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full hover:bg-pink-600/80 transition-all duration-300 group/button"
              title="Remove from Favorites"
            >
              <FaHeart className="w-5 h-5 text-pink-400 group-hover/button:text-white transition-colors" />
            </button>
          )}

          {/* Image container */}
          <div className="mb-4 h-48 w-full rounded-md overflow-hidden bg-gray-700/30 flex items-center justify-center">
            <img
              src={data.url}
              alt={data.title}
              className="max-h-full max-w-full object-contain p-2"
            />
          </div>

          {/* Content section */}
          <div className="flex flex-col justify-between flex-1 space-y-2">
            <div>
              <h2 className="text-white font-semibold text-lg line-clamp-1 hover:text-purple-400 transition-colors">
                {data.title}
              </h2>
              <p className="text-gray-400 text-sm">{data.author}</p>
            </div>

            <p className="text-gray-300 text-sm line-clamp-3">
              {data.description}
            </p>

            <div className="mt-auto">
              <span className="text-purple-400 font-bold text-md">
                ₹{data.price}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Bookcard;
