import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headline {
  id: string;
  title: string;
  link: string;
}

const Marquee = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10", {
    next: { revalidate: 300 },
  });
  const data = await res.json();
  const headlines: Headline[] = data.data;

  return (
    <div className="bg-red-700 text-white">
      <div className="mx-auto flex w-full max-w-7xl items-center">
        <div className="shrink-0 bg-red-800 px-4 py-1 font-bold">সর্বশেষ</div>
        <div className="min-w-0 flex-1">
          <MarqueeText className="py-1" direction="left" duration={30}>
            {headlines.map((h) => (
              <span key={h.id}>
                <a
                  href={h.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {h.title}
                </a>
                <span className="mx-5">•</span>
              </span>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;