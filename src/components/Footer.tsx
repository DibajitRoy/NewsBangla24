import Image from "next/image";
import Link from "next/link";

interface Nav {
  slug: string;
  title: string;
  scrapable: boolean;
}

const Footer = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  const navs: Nav[] = data.data;
  const filteredNavs = navs.filter((n) => n.scrapable);

  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full bg-gray-900 text-gray-300">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <Image
              className="h-10 w-10"
              src="/logo.webp"
              alt="Logo"
              width={50}
              height={50}
            />
            <h2 className="text-lg font-bold text-white">Bangla News 24</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed">
            বাংলা ভাষায় দেশ ও বিশ্বের সর্বশেষ খবর, এক জায়গায়।
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-3 border-b-2 border-red-700 pb-1 font-bold text-white">
            বিভাগসমূহ
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white hover:underline">
                হোম
              </Link>
            </li>
            {filteredNavs.map((nav) => (
              <li key={nav.slug}>
                <Link
                  href={`/category/${nav.slug}`}
                  className="hover:text-white hover:underline"
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="mb-3 border-b-2 border-red-700 pb-1 font-bold text-white">
            তথ্য
          </h3>
          <p className="text-sm leading-relaxed">
            এই সাইটের খবরগুলো BBC Bangla থেকে সংগৃহীত।
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <p className="mx-auto w-full max-w-7xl px-4 py-3 text-center text-xs">
          © {year} Bangla News 24. সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
};

export default Footer;