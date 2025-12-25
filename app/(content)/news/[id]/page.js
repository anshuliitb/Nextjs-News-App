import { notFound } from "next/navigation";
import { getNewsById } from "@/lib/news";
import BackLink from "@/components/back-link";

export default async function NewsDetailPage({ params }) {
  const { id } = params;

  const news = await getNewsById(id);
  if (!news) return notFound();

  return (
    <>
      <header>
        <BackLink>Back</BackLink>
        <h1>{news.title}</h1>
        <p>{news.date}</p>
      </header>

      <img src={news.imageUrl} alt={news.title} />
      <p>{news.content}</p>
    </>
  );
}
