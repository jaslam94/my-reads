export default function ListItem({ book }) {
  const { title, authors, firstPublished, subjects, coverUrl, type } = book;

  return (
    <div className="p-4 flex space-x-4 ml-10">
      <img
        src={coverUrl}
        alt=""
        className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
        width="144"
        height="144"
      />
      <div className="min-w-0 relative flex-auto">
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
