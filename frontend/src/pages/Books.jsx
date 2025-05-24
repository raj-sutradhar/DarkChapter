import React, { useState, useEffect } from "react";
import axios from "axios";
import Bookcard from "../components/Bookcard/Bookcard";
import Loader from "../components/Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/getbooks"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 mt-6">
        <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          All Books
        </span>
      </h1>

      <div className="relative w-50 h-1 mx-auto mb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
        <div className="absolute -inset-1 bg-purple-500/20 blur-sm"></div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader />
        </div>
      )}

      {/* Content - Only shows when not loading and data exists */}
      {!loading && data && data.length > 0 && (
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {data.map((items, i) => (
            <div key={i}>
              <Bookcard data={items} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyAdded;
