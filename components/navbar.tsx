"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="relative bg-white px-0 py-4 mx-60">
      <ul className="flex items-center gap-x-4 justify-center">
        <Link
          href="/"
          className={
            pathname === "/" ? "text-[#7263f3] font-medium" : "text-inherit"
          }
        >
          <li>Home</li>
        </Link>
        <Link
          href="/pokemon/favorite"
          className={
            pathname === "/pokemon/favorite"
              ? "text-[#7263f3] font-medium"
              : "text-inherit"
          }
        >
          <li>Favorite</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
