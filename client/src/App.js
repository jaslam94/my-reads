import React from "react";

import { Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/navbar";
import Main from "./components/main";

function App() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto my-20">
        <ToastContainer />
        <Router>
          <Routes>
            <ProtectedRoute path="/" component={Main} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
