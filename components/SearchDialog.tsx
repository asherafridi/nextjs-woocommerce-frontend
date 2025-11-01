"use client";

import * as React from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SearchDialog() {
    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);

    // 🔹 Debounced search
    React.useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
                const response = await res.json();

                console.log(response);
                
                setResults(response.products);
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setLoading(false);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <Dialog>
            {/* 🔍 Trigger Button */}
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <i className="ri-search-line text-xl"></i>
                </Button>
            </DialogTrigger>

            {/* 🧩 Dialog Content */}
            <DialogContent className="w-[800px] bg-white rounded-xl p-0 animate-in fade-in-0 max-w-full pb-10">
                <DialogTitle className="hidden">Search Product</DialogTitle>

                {/* 🔹 Header */}
                <DialogHeader className="p-6 border-b border-gray-300">
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 text-lg">
                        <i className="ri-search-line text-lg text-gray-500"></i>
                        <Input
                            placeholder="Search for products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 border-none shadow-none focus-visible:ring-0 focus:outline-none outline-none md:text-lg"
                        />
                    </div>
                </DialogHeader>

                {/* 🔹 Results */}
                <div className="px-6 max-h-[400px] overflow-y-auto">
                    <h2 className="px-3 uppercase">Products</h2>

                    {loading && <p className="p-3 text-sm text-gray-500">Searching...</p>}

                    {!loading && query && results.length === 0 && (
                        <p className="p-3 text-sm text-gray-500">
                            No results found for <strong>{query}</strong>
                        </p>
                    )}

                    {!loading && results.length > 0 && (
                        <div className=" flex flex-col space-y-3">
                            {results.map((item) => (
                                <Link
                                    href={`/products/${item.slug}`}
                                    key={item.id}
                                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-sm cursor-pointer"
                                >
                                    {item.images?.[0]?.src && (
                                        <img
                                            src={item.images[0].src}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-md"
                                        />
                                    )}
                                    <div>
                                        <p className="font-medium text-lg text-gray-800">{item.name}</p>{item.sale_price ? (
                                            <p className="text-md text-black">
                                                Rs. {item.sale_price}{" "}
                                                <span className="line-through text-gray-500 text-sm ml-2">
                                                    Rs. {item.regular_price}
                                                </span>
                                            </p>
                                        ) : (
                                            <p className="text-md text-black">Rs. {item.regular_price}</p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
