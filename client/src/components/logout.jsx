import React from "react";
import authService from "../services/authService";

export default function Logout() {
  const handleClick = () => {
    authService.logout();
    window.location = "/";
  };

  return (
    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button
        type="button"
        onClick={handleClick}
        class="bg-gray-800 p-1 rounded-md text-sm font-medium text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        Sign out
      </button>
    </div>
  );
}
