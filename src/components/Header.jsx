import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/userSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const user = useSelector((state) => state.user);
  return (
    <header className="flex items-center justify-between px-20 h-16 bg-teal-900">
      <span className=" text-lg font-semibold text-lime-500">
        GreeEcommerce
      </span>
      <nav className="flex gap-4 text-white">
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
      </nav>
      <div className="flex gap-3">
        <span className="text-white">{user?.displayName}</span>
        {user && (
          <button className="text-white" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
