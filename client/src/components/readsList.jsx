import { useContext, useState, useEffect } from "react";
import ListItem from "./listItem";
import { GlobalContext } from "./../context/GlobalState";
import { useParams } from "react-router-dom";
import SearchBox from "./searchBox";

export default function ReadsList() {
  const { books, getBooks } = useContext(GlobalContext);

  const [reads, setReads] = useState(books);
  const [isLoading, setIsLoading] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { type } = useParams();

  function filterBooks() {
    const filtered = books.filter(
      (m) =>
        m.title.includes(searchQuery) ||
        m.authors.includes(searchQuery) ||
        m.subjects.includes(searchQuery)
    );
    setReads(filtered);
  }

  useEffect(() => {
    if (searchQuery !== "") {
      //filter books
      filterBooks();
    } else {
      //get from context
      getBooks(type);
      //set reads
      setReads(books);
      setIsLoading(null);
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <div>
          <h1 className="inline-block text-3xl font-extrabold text-purple-700 tracking-tight mt-5">
            {type === "1" ? "I have read..." : "I want to read..."}
          </h1>
        </div>
        <SearchBox setSearchQuery={(text) => setSearchQuery(text)} />
      </div>

      {/* {isLoading === true && (
        <h1 className="text-3xl text-center mx-auto mt-16">Loading...</h1>
      )}

      {isLoading === null && (
        <ul className="divide-y divide-gray-100">
          {reads &&
            reads.map((book) => <ListItem key={book._id} book={book} />)}
        </ul>
      )}

      {isLoading === false && reads.length === 0 && (
        <h1 className="text-2xl text-center mx-auto mt-16">
          No books found in the list...
        </h1>
      )} */}

      <div class="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {reads && reads.map((book) => <ListItem key={book._id} book={book} />)}
      </div>
    </div>
  );
}
