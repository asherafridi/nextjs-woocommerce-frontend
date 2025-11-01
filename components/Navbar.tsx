"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import "remixicon/fonts/remixicon.css";
import MobileMenu from "./MobileMenu";
import { Search } from "lucide-react";
import SearchDialog from "./SearchDialog";
import { useCartStore } from "@/store/cartStore";
import CartSlider from "./CartSlider";
import { siteConfig, navItems } from "@/lib/config";
import Image from "next/image";

export default function Navbar() {
  const { items } = useCartStore();

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          {siteConfig.logo ? (
            <Image
              src={siteConfig.logo}
              alt={siteConfig.logoName}
              height={40}
              width={40}
              className="object-contain"
            />
          ) : (
            siteConfig.logoName
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 relative">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.dropdown && item.dropdown.length > 0 ? (
                <>
                  <button className="text-gray-700 font-medium hover:text-blue-600 transition flex items-center gap-1">
                    {item.name}
                    <i className="ri-arrow-down-s-line text-lg"></i>
                  </button>

                  {/* Dropdown */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 mt-0 hidden group-hover:block
                    w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                  >
                    {item?.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <SearchDialog />
          <CartSlider />
          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
