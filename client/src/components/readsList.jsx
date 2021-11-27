import { useContext, useEffect } from "react";
import ListItem from "./listItem";
import { GlobalContext } from "./../context/GlobalState";
import { useParams } from "react-router-dom";

export default function ReadsList() {
  const { books, getBooks } = useContext(GlobalContext);

  const { type } = useParams();

  useEffect(() => {
    getBooks(type);
  }, []);

  return (
    <ul className="divide-y divide-gray-100">
      {books && books.map((book) => <ListItem key={book._id} book={book} />)}
    </ul>
  );
}
