"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useWindowSize } from "@/hooks/useWindowSize";

const links = [
  { href: "/showcase", label: "Showcase" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/commerce", label: "Commerce" },
  { href: "/templates", label: "Templates" },
  { href: "/enterprise", label: "Enterprise" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();

  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full flex-col bg-white text-black/75 md:flex-row">
      <div className="relative flex w-full items-center gap-x-6 border-b border-b-gray-200 px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
        <Link href="/" className="">
          <h1>Aeon</h1>
        </Link>
        {width > 768 && (
          <ul className="flex items-center gap-x-6 sm:gap-x-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-black/90"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="ml-auto mr-0 flex gap-x-2">
          {width > 768 && (
            <Link
              href="/login"
              className="rounded-md border border-gray-400 px-4 py-2 text-sm transition-colors hover:bg-gray-200"
            >
              Login
            </Link>
          )}
          <form className="flex items-center gap-x-2">
            <input
              type="text"
              name="search"
              placeholder="Search docs..."
              className="w-36 rounded-md bg-gray-200 p-2 text-sm outline-none"
            />
            <button className="rounded-md p-2 text-sm hover:bg-gray-200">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </button>
          </form>
          {width <= 768 && (
            <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
              {!isOpen ? (
                <Bars3Icon className="size-6" />
              ) : (
                <XMarkIcon className="size-6" />
              )}
            </button>
          )}
        </div>
      </div>
      {width <= 768 && isOpen && (
        <ul className="flex flex-col gap-y-2 px-4 py-4 sm:px-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-black/90"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-6">
            <Link
              href="/login"
              className="rounded-md border border-gray-400 px-4 py-2 text-sm transition-colors hover:bg-gray-200"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export { Nav };
