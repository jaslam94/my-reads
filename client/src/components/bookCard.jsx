import React, { useContext } from "react";
import CardButtons from "./cardButtons";
import { GlobalContext } from "./../context/GlobalState";
import authService from "../services/authService";

function BookCard({ book }) {
  const { title, author_name, first_publish_year, subject, cover_edition_key } =
    book;

  const { addBook } = useContext(GlobalContext);

  const imgSrc = cover_edition_key
    ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`
    : "https://openlibrary.org/images/icons/avatar_book-lg.png";

  const handleRead = () => {
    const readBook = createBook(1);
    addBook(readBook);
  };

  const handleWantToRead = () => {
    const wantToReadBook = createBook(2);
    addBook(wantToReadBook);
  };

  function createBook(type) {
    const user = authService.getCurrentUser();
    return {
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

  return (
    book && (
      <div className="max-w-sm rounded shadow-lg overflow-hidden py-5">
        <CardButtons
          handleRead={handleRead}
          handleWantToRead={handleWantToRead}
        />
        <img src={imgSrc} alt="book-cover" className="mx-auto" />
        <div className="px-6 py-4">
          <div className="font-bold text-purple-500 mb-2 text-lg">{title}</div>
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
    )
  );
}

export default BookCard;
