import React, { Component } from "react";
import { Link } from "@reach/router";
import M from "materialize-css";

class NavBar extends Component {
  render() {
    return (
      <header>
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <Link to="topics/coding">Coding</Link>
          </li>
          <li className="divider" />
          <li>
            <Link to="topics/football">Football</Link>
          </li>
          <li className="divider" />
          <li>
            <Link to="topics/cooking">Cooking</Link>
          </li>
        </ul>

        <nav className="nav-extended grey darken-3">
          <div className="container nav-wrapper">
            <Link to="/" className="NC-logo left-align hide-on-small-only">
              NC News
            </Link>

            <ul className="right hide-on-small-only">
              <li>
                <Link
                  to="/topics"
                  className="dropdown-trigger"
                  data-target="dropdown1"
                >
                  Topics
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
          </div>

          <ul className="sidenav grey lighten-2" id="mobile-menu">
            <li>
              <Link
                className="sidenav-trigger"
                data-target="mobile-menu"
                to="/"
              >
                <i className="material-icons">menu</i>
              </Link>
            </li>

            <li>
              <Link to="/topics">Topics List</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }

  componentDidMount() {
    let elems = document.querySelectorAll(".dropdown-trigger");
    let options = {
      inDuration: 300,
      outDuration: 300,
      hover: true,
      coverTrigger: false
    };

    M.Dropdown.init(elems, options);
  }
}

export default NavBar;
