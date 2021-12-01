export default function ListItem({ book, handleDeleteItem }) {
  const { title, authors, firstPublished, subjects, coverUrl, _id } = book;

  return (
    <div className="p-4 flex space-x-4 ml-10">
      <div className="relative group flex-none w-1/3 h-1/3">
        <img src={coverUrl} alt="cover" className="rounded-lg object-cover" />
        <div className="has-tooltip">
          <span className="tooltip inline-block bg-gray-700 font-medium shadow-sm text-white py-2 px-3 text-sm rounded-lg -mt-64">
            Remove
          </span>
          <button
            className="absolute top-0 bg-red-400 hover:bg-red-500 active:bg-red-600 text-white p-1 rounded m-2 opacity-0 group-hover:opacity-100"
            onClick={() => handleDeleteItem(_id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="relative flex-auto">
        <h2 className="text-lg font-semibold text-black mb-0.5">{title}</h2>
        <dl className="flex flex-wrap text-sm font-medium">
          <div>
            <dt className="sr-only">Authors</dt>
            <dd>{authors}</dd>
          </div>
          <div className="flex-none w-full mt-0.5 font-normal">
            <dt className="inline font-bold">Year: </dt>
            <dd className="inline text-black">{firstPublished}</dd>
          </div>
          <div className="flex-none w-full mt-0.5 font-normal">
            <dt className="inline font-bold">Subject: </dt>
            <dd className="inline text-black break-words">{subjects}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
