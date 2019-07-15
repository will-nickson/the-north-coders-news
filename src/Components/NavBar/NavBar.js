import React from "react";
import { Link } from "@reach/router";

export default function NavBar(username) {
  return (
    <header>
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <ul>
            <li>
              <Link
                to="/"
                // {`https://will-nickson-nc-news.herokuapp.com/api/`}
                className="NC-logo"
              >
                NC News
              </Link>
            </li>

            <ul className="right hide-on-med-and-down">
              <li>
                <Link
                  to="/topics"
                  className="dropdown-trigger"
                  data-target="dropdown1"
                >
                  Topics List
                  <i className="material-icons right">arrow_drop_down</i>
                </Link>
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

            <li>
              <Link
                className="sidenav-trigger"
                data-target="mobile-menu"
                to="/"
              >
                <i className="material-icons">menu</i>
              </Link>
            </li>

            <ul className="sidenav grey lighten-2" id="mobile-menu">
              <li>
                <Link to="/topics">Topics List</Link>
              </li>
            </ul>
          </ul>
        </div>
      </nav>
    </header>
  );
}
