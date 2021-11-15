import React, { useState } from "react";

function SearchBox({ setSearchQuery }) {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(text);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden my-20 mx-auto">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            onChange={(e) => setText(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search book by title..."
          />
          <button
            className="flex-shrink-0 bg-gray-700 hover:bg-gray-900 border-gray-700 hover:border-black text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBox;
