import Link from "next/link";

interface Nav {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const NavLinks = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories");
  const data = await res.json();
  const navs: Nav[] = data.data;
  const filteredNavs = navs.filter((n) => n.scrapable);

  return (
    <nav className="w-full bg-gray-200">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-6 px-4 py-2 text-base">
        <Link href="/" className="text-gray-700 hover:text-gray-900">
          হোম
        </Link>
        {filteredNavs.map((nav) => (
          <Link
            key={nav.slug}
            href={`/category/${nav.slug}`}
            className="text-gray-700 hover:text-gray-900"
          >
            {nav.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;