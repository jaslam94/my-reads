import React, { useContext, useEffect, useState } from "react";
import CardButtons from "./cardButtons";
import { GlobalContext } from "./../context/GlobalState";
import authService from "../services/authService";
import { toast } from "react-toastify";

function BookCard({ book }) {
  const {
    key,
    title,
    author_name,
    first_publish_year,
    subject,
    cover_edition_key,
  } = book;

  const imgSrc = cover_edition_key
    ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`
    : "https://openlibrary.org/images/icons/avatar_book-lg.png";

  const { books, getMyBooks, addBook, deleteBook } = useContext(GlobalContext);

  const [saved, setSaved] = useState(null);

  const handleAddToList = async (type) => {
    const readBook = createBook(type);

    const book = books.find((m) => m.key === readBook.key);
    if (book) {
      await deleteBook(book._id);

      if (book.type === type) {
        setSaved(null);
        toast.warning(
          `Removed ${readBook.title} from the ${
            type === 1 ? "reads" : "want to read"
          } list.`
        );
        return;
      }
    }
    await addBook(readBook);
    setSaved(type);
    toast.success(
      `Added ${readBook.title} to the ${
        type === 1 ? "reads" : "want to read"
      } list.`
    );
  };

  function createBook(type) {
    const user = authService.getCurrentUser();
    return {
      key: key,
      title: title,
      authors: author_name?.join(", "),
      firstPublished: first_publish_year,
      subjects: subject
        ?.slice(0, 5)
        .map((m) => m)
        .join(", "),
      coverUrl: imgSrc,
      type: type,
      user: {
        email: user.email,
      },
    };
  }

  useEffect(() => {
    //get up to date global state
    getMyBooks();
  }, []);

  useEffect(() => {
    //check if book is already in global state
    const book = books.find((m) => m.key === key);

    if (book) {
      if (book.type === 1) setSaved(1);
      else setSaved(2);
    }
  }, [books]);

  return (
    book && (
      <div className="max-w-sm rounded shadow-lg overflow-hidden py-5">
        <CardButtons handleAddToList={handleAddToList} saved={saved} />

        <div>
          <img src={imgSrc} alt="book-cover" className="mx-auto" />

          <div className="px-6 py-4">
            <div className="font-bold text-purple-500 mb-2 text-lg">
              {title}
            </div>
            <ul>
              <li>
                <strong>Authors: </strong>
                {author_name?.join(", ")}
              </li>
              <li>
                <strong>First Published: </strong>
                {first_publish_year}
              </li>
            </ul>
          </div>
          <div className="px-6 py-4">
            {subject?.slice(0, 5).map((m, i) => (
              <span
                key={i}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                #{m}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default BookCard;
