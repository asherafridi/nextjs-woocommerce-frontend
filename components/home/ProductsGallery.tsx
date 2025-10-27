"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard"; // ✅ Use your existing ProductCard component
import Image from "next/image";


interface WooImage {
    id: number;
    src: string;
    alt: string;
}

interface WooCategory {
    id: number;
    name: string;
    slug: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    description: string;
    short_description: string;
    price: string;
    regular_price: string;
    sale_price: string;
    price_html: string;
    on_sale: boolean;
    stock_status: string;
    average_rating: string;
    rating_count: number;
    type: string;

    categories: WooCategory[];
    images: WooImage[];
}

const ProductsGallery = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <p className="text-center py-10">Loading products...</p>;

    return (
        <div className="w-full flex items-center justify-center py-12">
            <div className="container max-auto p-6">
                <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>

            </div>
        </div>

    );
};

export default ProductsGallery;
