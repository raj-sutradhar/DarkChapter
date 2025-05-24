import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import { format } from "date-fns";

const Allorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const role = useSelector((state) => state.auth.role);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/allorders",
          { headers }
        );

        // Add null checks for nested data
        const safeOrders = response.data.data.map((order) => ({
          ...order,
          user: order.user || { name: "Deleted User", email: "N/A" },
          book: order.book || {
            title: "Deleted Book",
            author: "N/A",
            price: 0,
          },
        }));

        setOrders(safeOrders);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (role === "admin") fetchOrders();
  }, [role]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/updateorder/${orderId}`,
        { status: newStatus },
        { headers }
      );

      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "PPpp"); // Format: Aug 29, 2023, 10:00 AM
  };

  const statusColors = {
    "order placed": "bg-blue-500",
    shipped: "bg-yellow-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-purple-400/20 shadow-2xl shadow-purple-900/20 p-6 md:p-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-8">
            All Orders ({orders.length})
          </h1>

          {error && (
            <div className="text-red-400 p-3 rounded-lg bg-red-900/20 border border-red-400/20 mb-6">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-800/50 p-6 rounded-xl border border-purple-900/30 hover:border-purple-400/40 transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* User Column */}
                  <div className="space-y-2">
                    <h3 className="text-purple-300 font-semibold">
                      User Details
                    </h3>
                    <p className="text-gray-300 truncate">{order.user?.name}</p>
                    <p className="text-gray-400 text-sm truncate">
                      {order.user?.email}
                    </p>
                  </div>

                  {/* Book Column */}
                  <div className="space-y-2">
                    <h3 className="text-purple-300 font-semibold">
                      Book Details
                    </h3>
                    <p className="text-gray-300 truncate">
                      {order.book?.title}
                    </p>
                    <p className="text-gray-400 text-sm">
                      by {order.book?.author}
                    </p>
                    <p className="text-purple-400 text-sm">
                      ₹{order.book?.price?.toFixed(2) || "0.00"}
                    </p>
                  </div>

                  {/* Order Info Column */}
                  <div className="space-y-2">
                    <h3 className="text-purple-300 font-semibold">
                      Order Info
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {formatDate(order.createdAt)}
                    </p>
                    <div className="flex items-center gap-3">
                      <span
                        className={`${
                          statusColors[order.status]
                        } text-white px-2 py-1 rounded-full text-xs font-medium`}
                      >
                        {order.status}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(order._id, e.target.value)
                        }
                        className="bg-gray-900/30 border border-purple-400/20 rounded-lg px-2 py-1 text-purple-100 text-sm"
                      >
                        <option value="order placed">Order Placed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-purple-900/30 pt-4">
                  <p className="text-gray-400 text-xs font-mono truncate">
                    Order ID: {order._id}
                  </p>
                </div>
              </div>
            ))}

            {orders.length === 0 && !loading && (
              <div className="text-center py-12 text-gray-400">
                No orders found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allorders;
