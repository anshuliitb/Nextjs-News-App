import Link from "next/link";
import NewsList from "@/components/news-list";
import {
  getAvailableNewsYears,
  getAvailableNewsMonths,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";

export default async function FilteredNewsPage({ params }) {
  const filter = params?.filter || [];

  const selectedYear = filter[0];
  const selectedMonth = filter[1];

  let news = [];
  let links = [];

  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = await getAvailableNewsMonths(selectedYear);
  } else if (selectedYear) {
    news = await getNewsForYear(selectedYear);
    links = await getAvailableNewsMonths(selectedYear);
  } else {
    links = await getAvailableNewsYears();
  }

  news = Array.isArray(news) ? news : [];
  links = Array.isArray(links) ? links : [];

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {news.length > 0 ? <NewsList news={news} /> : <p>No news found.</p>}
    </>
  );
}
