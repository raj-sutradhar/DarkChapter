import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt as FaArrowRightFromBracket,
  FaBookmark,
  FaHeart,
  FaCog,
  FaFirstOrder,
  FaJediOrder,
  FaFirstOrderAlt,
  FaCartArrowDown,
  FaPlus,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear("token");
    localStorage.clear("id");
    localStorage.clear("role");
    history("/");
  };
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-gradient-to-b from-purple-900/80 to-pink-900/50 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-between h-full border border-purple-400/20 backdrop-blur-lg shadow-2xl shadow-purple-900/30">
      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center space-y-4 w-full">
        <div className="relative group">
          <img
            src={data.avatar}
            alt="User avatar"
            className="h-20 w-20 md:h-24 md:w-24 rounded-full border-2 border-purple-300/50 shadow-lg hover:shadow-purple-400/30 transition-all duration-300 object-cover"
          />
          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-purple-400/50 animate-pulse transition-all duration-500" />
        </div>

        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
            {data.username}
          </h1>
          <p className="text-xs md:text-sm text-purple-100/80 font-medium mt-1">
            {data.email}
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
      </div>

      {/* Navigation Links */}
      {role === "user" && (
        <nav className="w-full space-y-1 md:space-y-2 flex-1 mt-4">
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 group
            ${
              isActive
                ? "bg-purple-900/40 text-white border-l-4 border-purple-400 shadow-inner shadow-purple-500/20"
                : "text-purple-100/90 hover:text-white hover:bg-purple-900/40"
            }`
            }
          >
            {({ isActive }) => (
              <>
                <FaHeart
                  className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                    isActive
                      ? "text-purple-400"
                      : "text-purple-300/80 group-hover:text-purple-400"
                  }`}
                />
                <span className="text-sm md:text-base font-medium">
                  Favourites
                </span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              `flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 group
            ${
              isActive
                ? "bg-purple-900/40 text-white border-l-4 border-purple-400 shadow-inner shadow-purple-500/20"
                : "text-purple-100/90 hover:text-white hover:bg-purple-900/40"
            }`
            }
          >
            {({ isActive }) => (
              <>
                <FaBookmark
                  className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                    isActive
                      ? "text-purple-400"
                      : "text-purple-300/80 group-hover:text-purple-400"
                  }`}
                />
                <span className="text-sm md:text-base font-medium">
                  Order History
                </span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/profile/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 group
            ${
              isActive
                ? "bg-purple-900/40 text-white border-l-4 border-purple-400 shadow-inner shadow-purple-500/20"
                : "text-purple-100/90 hover:text-white hover:bg-purple-900/40"
            }`
            }
          >
            {({ isActive }) => (
              <>
                <FaCog
                  className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                    isActive
                      ? "text-purple-400"
                      : "text-purple-300/80 group-hover:text-purple-400"
                  }`}
                />
                <span className="text-sm md:text-base font-medium">
                  Settings
                </span>
              </>
            )}
          </NavLink>
        </nav>
      )}

      {role === "admin" && (
        <nav className="w-full space-y-1 md:space-y-2 flex-1 mt-4">
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 group
            ${
              isActive
                ? "bg-purple-900/40 text-white border-l-4 border-purple-400 shadow-inner shadow-purple-500/20"
                : "text-purple-100/90 hover:text-white hover:bg-purple-900/40"
            }`
            }
          >
            {({ isActive }) => (
              <>
                <FaCartArrowDown
                  className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                    isActive
                      ? "text-purple-400"
                      : "text-purple-300/80 group-hover:text-purple-400"
                  }`}
                />
                <span className="text-sm md:text-base font-medium">
                  All Orders
                </span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/profile/addbook"
            className={({ isActive }) =>
              `flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 group
            ${
              isActive
                ? "bg-purple-900/40 text-white border-l-4 border-purple-400 shadow-inner shadow-purple-500/20"
                : "text-purple-100/90 hover:text-white hover:bg-purple-900/40"
            }`
            }
          >
            {({ isActive }) => (
              <>
                <FaPlus
                  className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                    isActive
                      ? "text-purple-400"
                      : "text-purple-300/80 group-hover:text-purple-400"
                  }`}
                />
                <span className="text-sm md:text-base font-medium">
                  Add book
                </span>
              </>
            )}
          </NavLink>

          
        </nav>
      )}

      {/* Logout Button - Mobile Optimized */}
      <button
        onClick={handleLogout}
        className="w-full mt-4 bg-gradient-to-r from-purple-700/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-500 text-white font-medium py-2 md:py-3 rounded-lg md:rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
      >
        <span className="text-sm md:text-base">Log Out</span>
        <FaArrowRightFromBracket className="w-3.5 h-3.5 md:w-4 md:h-4" />
      </button>
    </div>
  );
};

export default Sidebar;
