import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/news";

const MainNews = ({ news }: { news: Article[] }) => {
  const [firstNews, ...otherNews] = news;

  if (!firstNews) return null;

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
      {/* Hero */}
      <Link href={`/news/${firstNews.id}`} className="lg:col-span-3">
        <div className="card bg-base-100 h-full border border-gray-200 shadow-sm">
          <figure>
            <Image
              height={600}
              width={900}
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt || firstNews.title}
              className="h-72 w-full object-cover"
            />
          </figure>
          <div className="card-body">
            <p className="font-semibold text-red-600">{firstNews.category}</p>
            <h2 className="card-title">{firstNews.title}</h2>
            <p className="line-clamp-3">{firstNews.description}</p>
          </div>
        </div>
      </Link>

      {/* Side list */}
      <div className="grid content-start gap-3 lg:col-span-2">
        {otherNews.slice(0, 4).map((on) => (
          <Link key={on.id} href={`/news/${on.id}`}>
            <div className="card bg-base-100 border border-gray-300 p-4 hover:bg-gray-50">
              <p className="font-semibold text-red-600">{on.category}</p>
              <div>{on.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;