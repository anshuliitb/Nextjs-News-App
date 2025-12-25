import { connectDB } from "@/lib/db";
import News from "@/models/newsModel";

export async function getAllNews() {
  await connectDB();
  const list = await News.find().sort({ date: -1 }).lean();
  return Array.isArray(list) ? list : [];
}

export async function getLatestNews() {
  await connectDB();
  const list = await News.find().sort({ date: -1 }).limit(3).lean();
  return Array.isArray(list) ? list : [];
}

export async function getAvailableNewsYears() {
  await connectDB();

  const docs = await News.find({}, { date: 1 }).lean();

  const years = Array.from(
    new Set(
      docs
        .filter((d) => d?.date)
        .map((n) => new Date(n.date).getFullYear())
    )
  );

  return years.sort((a, b) => b - a);
}

export async function getAvailableNewsMonths(year) {
  await connectDB();

  const docs = await News.find(
    { date: { $regex: `^${year}-` } },
    { date: 1 }
  ).lean();

  const months = Array.from(
    new Set(
      docs
        .filter((d) => d?.date)
        .map((n) =>
          String(new Date(n.date).getMonth() + 1).padStart(2, "0")
        )
    )
  );

  return months.sort((a, b) => a - b);
}

export async function getNewsForYear(year) {
  await connectDB();

  const list = await News.find({
    date: { $regex: `^${year}` },
  })
    .sort({ date: -1 })
    .lean();

  return Array.isArray(list) ? list : [];
}

export async function getNewsForYearAndMonth(year, month) {
  await connectDB();

  const mm = String(month).padStart(2, "0");

  const list = await News.find({
    date: { $regex: `^${year}-${mm}` },
  })
    .sort({ date: -1 })
    .lean();

  return Array.isArray(list) ? list : [];
}

export async function getNewsBySlug(slug) {
  await connectDB();
  const doc = await News.findOne({ slug }).lean();
  return doc || null;
}
