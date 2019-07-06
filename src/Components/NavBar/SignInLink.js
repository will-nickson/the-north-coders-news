import React from "react";
import { Link } from "@reach/router";

const SignInLink = () => {
  // const sidenavs = document.querySelectorAll(".sidenav");
  // for (let i = 0; i < sidenavs.length; i++) {
  //   M.Sidenav.init(sidenavs[i]);
  // }
  return (
    <>
      <ul className="right hide-on-med-and-down">
        <li>
          <Link to="/topics">Topics List</Link>
        </li>

        <li>
          <Link to="/">Log Out</Link>
        </li>
        <li>
          <Link to="/">
            <img
              src="https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg"
              className="circle repsonsive-img user-image"
              alt="user avatar"
            />
          </Link>
        </li>
      </ul>

      <ul className="sidenav grey lighten-2" id="mobile-menu">
        <li>
          <Link to="/topics">Topics List</Link>
        </li>

        <li>
          <Link to="/">Log Out</Link>
        </li>
        <li>
          <Link to="/">
            <img
              src="https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg"
              className="circle repsonsive-img user-image"
              alt="user avatar"
            />
          </Link>
        </li>
      </ul>
    </>
  );
};

export default SignInLink;
