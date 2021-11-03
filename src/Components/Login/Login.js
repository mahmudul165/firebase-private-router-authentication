import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Login = () => {
  const { SignInUsingGoogle, SignInUsingGit } = useAuth();
  return (
    <div>
      <h4>Please log in</h4>
      <button onClick={SignInUsingGoogle}>Google signIn</button>
      <button onClick={SignInUsingGit}>Github signIn</button>
      <br />
      <Link to="/register">Are you New user?</Link>
    </div>
  );
};

export default Login;
