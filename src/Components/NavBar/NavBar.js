import React from "react";
import { Link } from "@reach/router";
import SignInLink from "./SignInLink";
import SignOutLink from "./SignOutLink";

export default function NavBar(username) {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link
          to="/"
          // {`https://will-nickson-nc-news.herokuapp.com/api/`}
          className="NC-logo"
        >
          NC News
        </Link>
        {username ? (
          <SignInLink username={username} />
        ) : (
          <SignOutLink username={username} />
        )}
      </div>
    </nav>
  );
}
