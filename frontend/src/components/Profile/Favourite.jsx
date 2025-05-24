import React, { useEffect, useState } from "react";
import axios from "axios";
import Bookcard from "../Bookcard/Bookcard";
import { Link } from "react-router-dom";

const Favourite = () => {
  const [favouriteBook, setfavouriteBook] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/getfavourite",
          { headers }
        );
        setfavouriteBook(res.data.data || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchData();
  }, [favouriteBook]);

  return (
    <div className="min-h-screen p-8">
      {favouriteBook.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
          {/* Custom SVG Illustration */}
          <div className="relative w-64 h-64 mb-8 animate-float">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Book Base */}
              <path
                d="M40 170L40 30L160 30L160 170L120 170L100 150L80 170L40 170Z"
                fill="url(#bookGradient)"
                stroke="#6D28D9"
                strokeWidth="2"
              />

              {/* Pages */}
              <path
                d="M45 35L155 35L155 165L115 165L100 150L85 165L45 165L45 35Z"
                fill="#F3E8FF"
              />

              {/* Broken Heart */}
              <g transform="translate(70 60)">
                <path
                  d="M40 35C35 20 15 15 5 25C-5 35 0 55 15 65C25 70 35 75 40 80C45 75 55 70 65 65C80 55 85 35 75 25C65 15 45 20 40 35Z"
                  fill="url(#heartGradient)"
                />
                <path
                  d="M30 50L50 30M30 30L50 50"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>

              {/* Sparkles */}
              <g fill="#F472B6" transform="translate(30 100)">
                <path d="M5 0L7 3 10 5 7 7 5 10 3 7 0 5 3 3Z" />
                <path d="M25 15L27 18 30 20 27 22 25 25 23 22 20 20 23 18Z" />
                <path d="M45 5L47 8 50 10 47 12 45 15 43 12 40 10 43 8Z" />
              </g>

              {/* Gradients */}
              <defs>
                <linearGradient
                  id="bookGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6D28D9" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient
                  id="heartGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#F472B6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl opacity-20 animate-pulse" />
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Empty Bookshelf
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto">
              Your collection of beloved stories awaits... Start exploring
              magical reads!
            </p>
          </div>

          {/* Action Button */}
          <Link
            to="/books"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2"
          >
            <span>Explore Books</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favouriteBook.map((items, i) => (
            <div key={i}>
              <Bookcard data={items} favourite={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;
