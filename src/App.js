import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    const data = {};
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="max-w-sm rounded shadow-lg overflow-hidden">
        <img
          src="https://source.unsplash.com/random"
          alt="book-cover"
          className="w-full"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-purple-500 mb-2 text-lg">
            Book title
          </div>
          <ul>
            <li>
              <strong>Description:</strong>{" "}
            </li>
            <li>
              <strong>Authors:</strong>{" "}
            </li>
            <li>
              <strong>Language:</strong>{" "}
            </li>
            <li>
              <strong>Published:</strong>{" "}
            </li>
            <li>
              <strong>Publisher:</strong>{" "}
            </li>
          </ul>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-50 rounder-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            tag1
          </span>
          <span className="inline-block bg-gray-50 rounder-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            tag2
          </span>
          <span className="inline-block bg-gray-50 rounder-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            tag3
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
