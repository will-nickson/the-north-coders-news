import React from "react";

export default function Footer() {
  return (
    <footer className="page-footer grey darken-3">
      <div className="container">
        <div className="row">
          <div className="col s12 16">
            <h5>About Me</h5>
            <p>I am the tech lead</p>
          </div>
          <div className="col s12 14 offset-12">
            <h5>Contact</h5>
            <ul>
              <li className="grey-text text-lighten-3" />
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright grey darken-4">
        <div className="container center-align">&copy; 2019 Will Nickson</div>
      </div>
    </footer>
  );
}
