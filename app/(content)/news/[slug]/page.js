import { notFound } from "next/navigation";
import Link from "next/link";
import { getNewsBySlug } from "@/lib/news";
import BackLink from "@/components/back-link";

export default async function NewsDetailPage({ params }) {
  const { slug } = params;

  const news = await getNewsBySlug(slug);
  if (!news) return notFound();

  return (
    <>
      <header>
        <BackLink>Back</BackLink>
        <h1>{news.title}</h1>
        <p>{news.date}</p>
      </header>

      <img src={news.image} alt={news.title} />
      <p>{news.content}</p>
    </>
  );
}
