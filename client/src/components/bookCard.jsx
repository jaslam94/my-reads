import React from "react";
import CardButtons from "./cardButtons";

function BookCard({ book }) {
  const { title, author_name, first_publish_year, subject, cover_edition_key } =
    book;

  const imgSrc = cover_edition_key
    ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`
    : "https://openlibrary.org/images/icons/avatar_book-lg.png";

  return (
    book && (
      <div className="max-w-sm rounded shadow-lg overflow-hidden py-5">
        <CardButtons />
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
