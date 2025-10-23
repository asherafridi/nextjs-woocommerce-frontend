"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 text-gray-700 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand Info */}
        <div>
          <h2 className="text-gray-900 text-lg font-semibold mb-4">Zain Mart</h2>
          <p className="text-sm mb-4">
            Your one-stop shop for everyday essentials. Quality products, best prices, and fast delivery.
          </p>
          <div className="flex space-x-4">
            {/* <Link href="#" className="hover:text-gray-900 hover:underline hover:underline"><Facebook size={18} /></Link>
            <Link href="#" className="hover:text-gray-900 hover:underline"><Instagram size={18} /></Link>
            <Link href="#" className="hover:text-gray-900 hover:underline"><Twitter size={18} /></Link>
            <Link href="#" className="hover:text-gray-900 hover:underline"><Youtube size={18} /></Link> */}
          </div>
        </div>

        {/* Column 2: Customer Service */}
        <div>
          <h3 className="text-gray-900 text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="#" className="hover:text-gray-900 hover:underline">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-gray-900 hover:underline">FAQs</Link></li>
            <li><Link href="#" className="hover:text-gray-900 hover:underline">Returns & Refunds</Link></li>
            <li><Link href="#" className="hover:text-gray-900 hover:underline">Shipping Info</Link></li>
          </ul>
        </div>

        {/* Column 3: Information */}
        <div>
          <h3 className="text-gray-900 text-lg font-semibold mb-4">Information</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-gray-900 hover:underline">About Us</Link></li>
            <li><Link href="#" className="hover:text-gray-900 hover:underline">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-gray-900 hover:underline">Terms & Conditions</Link></li>
            <li><Link href="#" className="hover:text-gray-900 hover:underline">Blog</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-gray-900 text-lg font-semibold mb-4">Join Our Newsletter</h3>
          <p className="text-sm mb-4">
            Subscribe to get updates on new arrivals, offers, and more.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-300 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Zain Mart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
