import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/news";

const NewsCard = ({ news }: { news: Article }) => {
  return (
    <Link href={`/news/${news.id}`}>
      <div className="card bg-base-100 h-full shadow-sm">
        <figure>
          <Image
            height={600}
            width={600}
            src={news.imageUrl}
            alt={news.imageAlt || news.title}
            className="h-44 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <p className="font-semibold text-red-600">{news.category}</p>
          <h2 className="card-title">{news.title}</h2>
          <p className="line-clamp-2">{news.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;