import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <h4>please register</h4>
      <form>
        <input type="email" />
        <br />
        <input type="password" />
        <br />
        <input type="submit" value="submit" />
      </form>
      <Link to="/login">Already Register?</Link>
    </div>
  );
};

export default Register;
