import React, { useState } from "react";

import { LockClosedIcon } from "@heroicons/react/solid";
import logo from "../assets/logo/logo_sm.png";

import authService from "../services/authService";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function HandleOnSubmit(e) {
    e.preventDefault();
    try {
      await authService.login(email, password);
      window.location = "/";
    } catch (ex) {
      setError("Cannot login. Try again!");
    }
  }

  if (authService.getCurrentUser()) return <Navigate to="/" />;

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 px-4">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          {error !== "" && (
            <p className="mt-2 text-center text-sm text-red-500">{error}</p>
          )}
        </div>
        <form
          className="mt-8 space-y-6"
          method="POST"
          onSubmit={HandleOnSubmit}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>

        <div className="flex items-center">
          <div className="text-sm mr-auto">
            <a
              href="/register"
              className="font-medium text-gray-600 hover:text-gray-500"
            >
              Sign up for an account?
            </a>
          </div>

          <div className="text-sm">
            <a
              href="/forgotpass"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
