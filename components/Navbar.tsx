"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "remixicon/fonts/remixicon.css";
import MobileMenu from "./MobileMenu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Search } from "lucide-react";
import SearchDialog from "./SearchDialog";
import {useCartStore} from "@/store/cartStore";
import CartSlider from "./CartSlider";

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "Shop",
    dropdown: [
      { name: "All Products", href: "/shop" },
      { name: "Men's Wear", href: "/shop/mens" },
      { name: "Women's Wear", href: "/shop/womens" },
      { name: "Accessories", href: "/shop/accessories" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { items } = useCartStore();
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <Link href="/" className="text-2xl font-semibold text-gray-800">
          Zain<span className="text-blue-600">Mart</span>
        </Link>
        

        {/* Center: Navigation (Desktop only) */}
        <nav className="hidden md:flex items-center space-x-8 relative">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.name} className="relative group">
                <button className="text-gray-700 font-medium hover:text-blue-600 transition flex items-center gap-1">
                  {item.name}
                  <i className="ri-arrow-down-s-line text-lg"></i>
                </button>

                {/* Dropdown Menu */}
                <div
                  className="
                    absolute left-1/2 -translate-x-1/2 
                    mt-0 hidden group-hover:block
                    w-48 bg-white border border-gray-200 rounded-md shadow-lg
                    z-50 transition-all duration-200 ease-out
                  "
                >
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-700 font-medium hover:text-blue-600 transition"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center gap-3">
          <SearchDialog />
          <CartSlider />
          <Button variant="ghost" size="icon" className="hover:text-blue-600 cursor-pointer">
            <i className="ri-user-3-line text-xl"></i>
          </Button>

          {/* Mobile Menu */}
          <MobileMenu />
          
        </div>
      </div>
    </header>
  );
}
