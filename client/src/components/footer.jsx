import React from "react";

export const Footer = () => {
  return (
    <footer className="footer-1 bg-gray-700 py-4 w-full">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex justify-center text-gray-300 mb-1 font-medium">
          &#169; 2021 All rights reserved.
        </div>
        <div className="flex font-light justify-center text-gray-500 text-sm">
          <p className="text-gray-400">
            Designed & Developed by
            <a
              href="https://www.linkedin.com/in/mjunaidaslam/"
              className="font-bold"
            >
              {" "}
              Junaid Aslam
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
