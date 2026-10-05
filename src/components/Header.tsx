import Image from "next/image";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  return (
    <header className="w-full bg-gray-100">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Image
            className="h-10 w-10"
            src="/logo.webp"
            alt="Logo"
            width={50}
            height={50}
          />
          <div>
            <h2>Bangla News 24</h2>
            <p>{date}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn">Sign In</button>
          <button className="btn bg-red-500 text-white hover:bg-red-600">
            Sign Up
          </button>
        </div>
      </div>

      <NavLinks />
      <Marquee />
    </header>
  );
};

export default Header;