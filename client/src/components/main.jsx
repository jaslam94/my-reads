import React, { useEffect, useState } from "react";
import apiService from "../services/openLibService";
import BookCard from "./bookCard";
import SearchBox from "./searchBox";

function Main() {
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
    const { docs } = await apiService.getBooksByName(searchQuery);
    setIsLoading(false);
    setBooks(docs);
  }

  return (
    <>
      <div className="container mx-auto">
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
              {books &&
                books.map((book) => <BookCard key={book.key} book={book} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
