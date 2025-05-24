import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const Userorder = () => {
  const [orderHistory, setOrderHistory] = useState();
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/orders", {
          headers,
        });
        setOrderHistory(res.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statusColors = {
    "order placed": "bg-green-500/20 text-green-400",
    shipped: "bg-blue-500/20 text-blue-400",
    delivered: "bg-purple-500/20 text-purple-400",
    cancelled: "bg-red-500/20 text-red-400",
  };

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString)
      .toLocaleDateString("en-IN", options)
      .replace(",", "");
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 shadow-xl">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Order History
            </h2>
          </div>

          {orderHistory?.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <span className="text-3xl">📦</span>
              <p className="mt-4 text-lg">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-800/50 text-gray-400 text-sm font-medium border-b border-gray-700">
                  <div className="col-span-1">#</div>
                  <div className="col-span-2">Date & Time</div>
                  <div className="col-span-3">Book Title</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Payment</div>
                </div>

                {/* Table Rows */}
                {orderHistory?.map((item, index) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-800/20 transition-colors border-b border-gray-700 last:border-0"
                  >
                    <div className="col-span-1 text-gray-300 font-mono">
                      {index + 1}.
                    </div>

                    <div className="col-span-2">
                      <div className="text-sm text-gray-400">
                        {formatDate(item.createdAt)}
                      </div>
                    </div>

                    <div className="col-span-3">
                      <Link
                        to={`/bookdetails/${item.book._id}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors truncate block"
                      >
                        {item.book.title}
                      </Link>
                    </div>

                    <div className="col-span-2 text-purple-400 font-medium">
                      ₹{item.book.price.toFixed(2)}
                    </div>

                    <div className="col-span-2">
                      <span
                        className={`${
                          statusColors[item.status.toLowerCase()]
                        } px-3 py-1 rounded-full text-sm`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="col-span-2">
                      <span className="bg-gray-700/50 px-3 py-1 rounded-full text-sm text-gray-300">
                        COD
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Userorder;
