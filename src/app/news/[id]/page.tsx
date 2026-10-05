import Image from "next/image";
import { notFound } from "next/navigation";

interface ArticleDetails {
  id: string;
  title: string;
  text?: string | string[];
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
}

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`https://news-api-v2.vercel.app/api/article/${id}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const news: ArticleDetails | undefined = data.data;

  if (!news) {
    notFound();
  }

  const paragraphs = Array.isArray(news.text)
    ? news.text
    : news.text
      ? news.text.split("\n").filter(Boolean)
      : [];

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-6">
      {news.category && (
        <p className="font-semibold text-red-600">{news.category}</p>
      )}

      <h1 className="mt-1 text-3xl font-bold leading-snug">{news.title}</h1>

      {news.imageUrl && (
        <Image
          src={news.imageUrl}
          alt={news.imageAlt || news.title}
          width={900}
          height={500}
          className="mt-5 h-auto w-full rounded-lg object-cover"
          priority
        />
      )}

      <div className="mt-5 space-y-4 text-lg leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
};

export default NewsDetails;