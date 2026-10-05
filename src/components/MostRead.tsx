import Link from "next/link";

interface Item {
  id: string;
  title: string;
}

const MostRead = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10", {
    next: { revalidate: 300 },
  });
  const data = await res.json();
  const items: Item[] = data.data;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="mb-3 border-b-2 border-red-700 pb-1 font-bold">
        সর্বাধিক পঠিত
      </h2>
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={item.id} className="flex gap-3">
            <span className="text-lg font-bold text-red-700">{i + 1}</span>
            <Link
              href={`/news/${item.id}`}
              className="text-sm leading-snug hover:underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MostRead;