import React, { useEffect, useState } from "react";

import httpService from "./services/httpService";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BookCard from "./components/bookCard";
import SearchBox from "./components/searchBox";
import NavBar from "./components/navbar";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery !== "") {
      fetchData();
    } else {
      setBooks([]);
      setIsLoading(null);
    }
  }, [searchQuery]);

  async function fetchData() {
    setIsLoading(true);
    const { data } = await httpService.get(
      `http://openlibrary.org/search.json?title=${searchQuery}&fields=key,title,first_publish_year,author_name,subject,cover_edition_key&limit=6`
    );
    setIsLoading(false);
    setBooks(data.docs);
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto my-20">
        <ToastContainer />
        <SearchBox setSearchQuery={(text) => setSearchQuery(text)} />
        {isLoading === false && books.length === 0 && (
          <h1 className="text-5xl text-center mx-auto mt-32">
            No books found..
          </h1>
        )}
        <div className="flex justify-center ">
          {isLoading === true ? (
            <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
          ) : (
            <div className="grid grid-cols-3 gap-16">
              {books && books.map((book) => <BookCard book={book} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
