import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";
import type { Section } from "@/types/news";

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    next: { revalidate: 300 },
  });
  const data = await res.json();
  const sections: Section[] = data.data;

  const mainNews = sections[0].articles;
  const otherSections = sections.slice(1);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* news section */}
        <div className="lg:col-span-2">
          <MainNews news={mainNews} />

          <div className="mt-5 grid gap-5">
            {otherSections.map((os) => (
              <section key={os.curationId}>
                <h2 className="border-b-2 border-red-700 pb-1 font-bold">
                  {os.title}
                </h2>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {os.articles.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* most read section */}
        <aside className="lg:col-span-1">
          <MostRead />
        </aside>
      </div>
    </div>
  );
}