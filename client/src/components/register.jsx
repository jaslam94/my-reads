import React, { useState } from "react";
import Joi from "joi";

import { LockClosedIcon, KeyIcon } from "@heroicons/react/solid";
import logo from "../assets/logo/logo_sm.png";

import userService from "../services/userService";
import authService from "../services/authService";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const style = {
    backgroundImage: `url('https://source.unsplash.com/apcUIqOPEIo')`,
  };

  async function HandleOnSubmit(e) {
    e.preventDefault();
    try {
      const schema = Joi.object({
        fullName: Joi.string()
          .min(3)
          .max(50)
          .required()
          .label("Full Name")
          .error(new Error("Full Name is required and cannot be empty.")),
        email: Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "dev", "org"] },
          })
          .required()
          .label("Email")
          .error(new Error("Email is not valid.")),
        password: Joi.string()
          .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
          .label("Password")
          .error(
            new Error(
              "Password should contain uppercase, lowercase letters, numbers and symbols."
            )
          ),
        confirmPassword: Joi.any()
          .valid(Joi.ref("password"))
          .required()
          .label("Confirm password")
          .options({
            messages: {
              "any.only":
                "Confirm password value does not match with the password.",
            },
          }),
      });

      var user = {
        fullName,
        email,
        password,
        confirmPassword,
      };

      const result = schema.validate(user);

      const { error } = result;
      if (error) {
        const { message } = error;
        setError(message);
      } else {
        const response = await userService.addUser(user);

        if (response === true) {
          setMessage("Successfully registered.");
          setError("");
        } else {
          setError(response.data.data);
        }
      }
    } catch (ex) {
      setError("Cannot sign up. Try again!");
    }
  }

  if (authService.getCurrentUser()) return <Navigate to="/" />;

  return (
    <div className="container mx-auto my-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
          {message === "" && (
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={style}
            ></div>
          )}
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            {message === "" && (
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign up for an account
              </h2>
            )}

            {error !== "" && (
              <p className="mt-4 text-center text-sm text-red-500">{error}</p>
            )}

            <div className="px-8 pt-6 pb-8 bg-white rounded">
              {message === "" ? (
                <>
                  <form
                    className="my-6"
                    method="POST"
                    onSubmit={HandleOnSubmit}
                  >
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="fullname"
                      >
                        Full Name
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="fullname"
                        type="fullname"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4 md:flex md:justify-between">
                      <div className="w-1/2 mb-4 md:mr-2 md:mb-0">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="password"
                          type="password"
                          placeholder="******************"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* <p className="text-xs italic text-red-500">
                      Please choose a password.
                    </p> */}
                      </div>
                      <div className="w-1/2 md:ml-2">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="c_password"
                        >
                          Confirm Password
                        </label>
                        <input
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="c_password"
                          type="password"
                          placeholder="******************"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center rounded-full py-2 px-4 border border-transparent text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon
                          className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                          aria-hidden="true"
                        />
                      </span>
                      Sign up
                    </button>
                  </form>

                  <div className="flex justify-evenly space-x-2 mb-6">
                    <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                    <span className="flex-none uppercase text-xs text-gray-400 font-semibold">
                      or
                    </span>
                    <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full flex justify-center rounded-full py-2 px-4 mb-6 border text-sm font-medium text-gray hover bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                        <path
                          fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        ></path>
                        <path
                          fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        ></path>
                        <path
                          fill="#1976D2"
                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                      </svg>
                    </span>
                    Sign in with Google
                  </button>

                  <div className="flex items-end">
                    <a
                      href="/login"
                      className="group relative w-full flex justify-center rounded-full py-2 px-4 border text-sm font-medium text-gray hover hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <KeyIcon
                          className="h-5 w-5 text-blue-100 group-hover:text-blue-200"
                          aria-hidden="true"
                        />
                      </span>
                      Already have an account? Sign in
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <img
                    className="mx-auto h-12 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                  <div className="relative w-full flex justify-center py-4 px-4 my-6 font-medium">
                    <p>
                      {message} Proceed to{" "}
                      <a
                        href="/login"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        login
                      </a>
                      .
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
