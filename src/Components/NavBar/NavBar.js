import React from "react";
import { Link } from "@reach/router";
import SignInLink from "./SignInLink";
import SignOutLink from "./SignOutLink";

export default function NavBar(username) {
  return (
    <header>
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link
            to="/"
            // {`https://will-nickson-nc-news.herokuapp.com/api/`}
            className="NC-logo"
          >
            NC News
          </Link>

          <Link className="sidenav-trigger" data-target="mobile-menu" to="/">
            <i className="material-icons">menu</i>
          </Link>

          {username ? (
            <SignInLink username={username} />
          ) : (
            <SignOutLink username={username} />
          )}
        </div>
      </nav>
    </header>
  );
}
