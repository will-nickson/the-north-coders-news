import React from "react";
import { Link } from "@reach/router";

const SignOutLink = () => {
  return (
    <ul className="right hide-on-med-and-down">
      <li>
        <Link to="/">Signup</Link>
      </li>
      <li>
        <Link to="/">Login</Link>
      </li>
    </ul>
  );
};

export default SignOutLink;
