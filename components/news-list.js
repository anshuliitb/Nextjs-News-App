import Link from "next/link";

export default function NewsList({ news }) {
  const list = Array.isArray(news) ? news : [];

  return (
    <ul className="news-list">
      {list.map((item) => (
        <li key={item._id.toString()}>
          <Link href={`/news/${item._id}`}>
            <img src={item.imageUrl} alt={item.title} />
            <span>{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
