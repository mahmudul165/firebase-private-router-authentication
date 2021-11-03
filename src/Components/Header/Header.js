import React from "react";
import { Link } from "react-router-dom";
import "../Header/Header.css";
import useAuth from "../hooks/useAuth";
const Header = () => {
  const { user, handleSignOut } = useAuth();
  return (
    <div className="header">
      <Link to="/Home">Home</Link>
      <Link to="/shipping">Shipping</Link>
      <Link to="/placeorder">Order</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <span> {user.displayName} </span>
      {user?.displayName && <button onClick={handleSignOut}>log out</button>}
    </div>
  );
};

export default Header;
