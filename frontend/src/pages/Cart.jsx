import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
 const navigate = useNavigate()
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/getcart", {
          headers,
        });
        setCart(res.data.data);
        calculateTotal(res.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const calculateTotal = (cartItems) => {
    const sum = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
  };

  const deleteItem = async (bookid) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/removefromcart/${bookid}`,
        {},
        { headers }
      );
      const updatedCart = cart.filter((item) => item._id !== bookid);
      setCart(updatedCart);
      calculateTotal(updatedCart);
      alert(res.data.message);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const placeOrder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/placeorder",
        { order: cart },
        { headers }
      );
      alert(res.data.message);
      navigate("/profile/orders");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
          <h1 className="text-2xl font-bold text-gray-100">
            Your Cart is Empty
          </h1>
          <p className="text-gray-400">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/books"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center py-8 text-white">
            Your Cart ({cart.length} Items)
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cart Items */}
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md hover:shadow-purple-900/30 transition relative group"
                >
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <div className="flex gap-4">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-32 h-40 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h2 className="font-bold text-lg text-white truncate">
                        {item.title}
                      </h2>
                      <p className="text-gray-400 text-sm">{item.author}</p>
                      <p className="text-purple-400 font-semibold mt-2">
                        ₹{item.price}
                      </p>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg h-fit sticky top-8">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <hr className="border-gray-700" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300 mt-6" onClick={placeOrder}>
                 Place Order
                </button>
                <p className="text-sm text-gray-400 text-center mt-4">
                  Secure SSL encrypted payment
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
