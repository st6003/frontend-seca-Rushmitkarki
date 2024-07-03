import React from "react";
 
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <h5>Gadget Mart</h5>
            <p>Stay in the loop and sign up for the Wardiere newsletter:</p>
          </div>
          <div className="col-md-2">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/solutions">Solutions</a>
              </li>
              <li>
                <a href="/pricing">Pricing</a>
              </li>
              <li>
                <a href="/team">Team</a>
              </li>
              <li>
                <a href="/career">Career</a>
              </li>
            </ul>
          </div>
          <div className="col-md-2">
            <h5>Documentation</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/help">Help Centre</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="col-md-2">
            <h5>Social</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://facebook.com">Facebook</a>
              </li>
              <li>
                <a href="https://instagram.com">Instagram</a>
              </li>
              <li>
                <a href="https://youtube.com">YouTube</a>
              </li>
              <li>
                <a href="https://twitter.com">Twitter</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p>© Gadget Mart. All Rights Reserved 2023</p>
            <a href="/terms-conditions">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;