import React from "react";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>This is Home</h1>
      <h6>user:{user.displayName}</h6>
    </div>
  );
};

export default Home;
