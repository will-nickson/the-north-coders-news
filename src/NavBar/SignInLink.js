import React from "react";
import { Link } from "@reach/router";

const SignInLink = username => {
  return (
    <ul className="right" hide-on-med-and-down="true">
      <li>
        <Link to="/topics">Topics List</Link>
      </li>

      <li>
        <Link to="/">Log Out</Link>
      </li>
      <li>
        <Link to="/">
          <img
            href="/"
            src="https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg"
            className="circle repsonsive-img-floating user-image"
            alt="user avatar"
          />
        </Link>
      </li>
    </ul>
  );
};

export default SignInLink;
