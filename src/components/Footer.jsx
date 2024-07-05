import React from "react";

const Footer = () => {
  return (
    <footer className="bg-sky-900 text-white py-6">
      <div className="flex flex-col ">
        <div className="flex flex-wrap -mx-4 justify-between">
          <div className="w-full sm:w-1/3 md:w-1/4 px-4 mb-4 sm:mb-0">
            <h5 className="text-lg font-bold mb-2">Memory_Guardian</h5>
            <p>Stay in the loop and sign up for the Wardiere newsletter:</p>
          </div>
          <div className="w-full sm:w-1/3 md:w-1/6 px-4 mb-4 sm:mb-0">
            <h5 className="text-lg font-bold mb-2">Company</h5>
            <ul className="list-none space-y-1">
              <li>
                <a href="/" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400">
                  About
                </a>
              </li>
                         </ul>
          </div>
          <div className="w-full sm:w-1/3 md:w-1/6 px-4 mb-4 sm:mb-0">
            <h5 className="text-lg font-bold mb-2">Documentation</h5>
            <ul className="list-none space-y-1">
              <li>
                <a href="/help" className="hover:text-gray-400">
                  Help Centre
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/3 md:w-1/6 px-4 mb-4 sm:mb-0">
            <h5 className="text-lg font-bold mb-2">Social</h5>
            <ul className="list-none space-y-1">
              <li>
                <a href="https://facebook.com" className="hover:text-gray-400">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="hover:text-gray-400">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://youtube.com" className="hover:text-gray-400">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="hover:text-gray-400">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>© Memory_Guardian. All Rights Reserved 2023</p>
          <a href="/terms-conditions" className="hover:text-gray-400">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
