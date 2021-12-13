import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Main from "./components/main";
import Login from "./components/login";
import Register from "./components/register";

import NavBar from "./components/navbar";
import authService from "./services/authService";
import ReadsList from "./components/readsList";
import { GlobalProvider } from "./context/GlobalState";
import { Footer } from "./components/footer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <GlobalProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col justify-between h-screen">
        {user && <NavBar user={user} />}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books/my/:type"
              element={
                <ProtectedRoute>
                  <ReadsList />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </GlobalProvider>
  );
}

export default App;
