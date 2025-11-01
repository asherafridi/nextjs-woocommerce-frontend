"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { WooProduct, WooProductCategory } from "@/types/woo";
import { Breadcrumb } from "@/components/Breadcrumb";
import FilterShop from "@/components/shop/Filter";
import  Pagination  from "@/components/shop/Pagination";
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";

const sortOptions = [
  { label: "Default", value: "rating" },
  { label: "Low to High", value: "price_asc" },
  { label: "High to Low", value: "price_desc" },
  { label: "Newest", value: "date" },
];

export default function ShopPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<WooProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // ✅ Read filters from URL
  const selectedCategory = Number(searchParams.get("category")) || 0;
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 500;
  const sortBy = searchParams.get("sortBy") || "date";
  const page = Number(searchParams.get("page")) || 1;

  const priceRange: [number, number] = [minPrice, maxPrice];

  // 🧠 Fetch Categories
 

  // 🧩 Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...(selectedCategory && selectedCategory !== 0 && { category: selectedCategory.toString() }),
        minPrice: priceRange[0].toString(),
        maxPrice: priceRange[1].toString(),
        orderby: sortBy.includes("price") ? "price" : "date",
        order: sortBy.endsWith("desc") ? "desc" : "asc",
        page: page.toString(),
        per_page: "9",
      });

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setProducts(data.products || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalProducts(data.pagination?.total || 0);
      } else {
        console.error("Failed to fetch:", data.error);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, priceRange[0], priceRange[1], sortBy, page]);

  // ✅ Update URL parameters when user changes filter
  const updateParams = (updates: Record<string, string | number | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "" || value === 0) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="bg-gray-50">

      <Breadcrumb
        links={[
          { title: 'Home', href: '/' },
          { title: 'Shop', href: '#' },
        ]} />
      <div className="container mx-auto px-4 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <FilterShop />

          {/* Main Content */}
          <main className="md:col-span-3 space-y-4">
            {/* Top Bar */}
            <div className="bg-white shadow-xs border border-gray-200 rounded-md px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-md text-gray-600">
                Showing {products.length} of {totalProducts} products
              </p>

              <Select
                onValueChange={(value) => updateParams({ sortBy: value, page: 1 })}
                defaultValue={sortBy}
              >
                <SelectTrigger className="w-[200px] border border-gray-200 shadow-none">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 ">
                  {sortOptions.map((opt, id) => (
                    <SelectItem key={id} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {loading ? (
              <ProductGridSkeleton />
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                No products found.
              </div>
            )}

            <Pagination totalPages={totalPages} />
            
          </main>
        </div>
      </div>
    </div>

  );
}
