import NewsCard from "@/components/NewsCard";
import { notFound } from "next/navigation";
import type { Article } from "@/types/news";

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${slug}`,
    { next: { revalidate: 300 } },
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const categoryNews: Article[] = data.data;

  if (!Array.isArray(categoryNews)) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-5">
      <h1 className="mb-5 border-b-2 border-red-700 pb-1 text-2xl font-bold">
        {data.title ?? slug}
      </h1>

      {categoryNews.length === 0 ? (
        <p className="text-gray-600">এই ক্যাটাগরিতে এখন কোনো খবর নেই।</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryNews;