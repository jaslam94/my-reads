import React from "react";

export default function CardButtons({ handleAddToList, saved }) {
  return (
    <div className="flex justify-end pb-5 pr-5">
      <div className="has-tooltip">
        <span className="tooltip inline-block bg-gray-700 font-medium shadow-sm text-white py-2 px-3 text-sm rounded-lg -mt-8">
          {saved === 1
            ? "Remove from my reads list..."
            : "Add to my reads list..."}
        </span>
        <button
          className={`flex-none flex items-center justify-center w-9 h-9 rounded-md active:bg-gray-300 hover:bg-gray-100 text-gray-400 border border-gray-300 mr-2 hover:text-red-600 ${
            saved === 1 && "text-red-600"
          }`}
          type="button"
          aria-label="like"
          onClick={() => handleAddToList(1)}
        >
          <svg width="20" height="20" fill="currentColor">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            />
          </svg>
        </button>
      </div>
      <div className="has-tooltip">
        <span className="tooltip inline-block bg-gray-700 font-medium shadow-sm text-white py-2 px-3 text-sm rounded-lg -mt-8">
          {saved === 2
            ? "Remove from my want to read list..."
            : "Add to my want to read list..."}
        </span>
        <button
          className={`flex-none flex items-center justify-center w-9 h-9 rounded-md active:bg-gray-300 hover:bg-gray-100 text-gray-400 border border-gray-300 hover:text-blue-600 ${
            saved === 2 && "text-blue-600"
          }`}
          type="button"
          onClick={() => handleAddToList(2)}
          aria-label="like"
        >
          <svg width="12" height="20" fill="currentColor">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
