import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import Link from 'next/link';

const MobileMenu = () => {
    const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
  return (
    <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <i className="ri-menu-line text-2xl"></i>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-86 bg-white p-6">
                <h2 className="text-xl font-semibold mb-6">Menu</h2>
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) =>
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-700 font-medium hover:text-blue-600 transition"
                      >
                        {item.name}
                      </Link>
                    
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
  )
}

export default MobileMenu