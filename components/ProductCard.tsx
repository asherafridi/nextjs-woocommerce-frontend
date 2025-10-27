"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";


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

interface WooProduct {
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

const ProductCard: React.FC<{ product: WooProduct }> = ({ product }) => {
    const {
        name,
        slug,
        description,
        short_description,
        price,
        regular_price,
        sale_price,
        on_sale,
        stock_status,
        average_rating,
        rating_count,
        categories,
        images,
        type,
    } = product;

    const [open, setOpen] = useState(false);

    const imageUrl =
        images && images.length > 0
            ? images[0].src
            : "/no-image.png"; // fallback image

    const category = categories?.[0]?.name || "Uncategorized";
    const isVariable = type === "variable";

    return (
        <>
            {/* Product Card */}
            <div className="group overflow-hidden transition-all duration-300 bg-white">
                {/* Image */}
                <Link href={`/products/${slug}`} className="block relative w-full rounded-md border-gray-200 border aspect-square p-2 bg-gray-50 overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover w-full group-hover:scale-105 transition-transform duration-500"
                    />
                    {on_sale && (
                        <span className="absolute top-3 right-3 bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                            Sale
                        </span>
                    )}
                </Link>

                {/* Details */}
                <div className="space-y-1">

                    <Link href={`/products/${slug}`} className="text-lg mt-3 font-[600] text-gray-800 transition line-clamp-2">
                        {name}
                    </Link>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        {isVariable ? (
                            <span className="text-lg  text-gray-900">
                                From ${regular_price || price || "—"}
                            </span>
                        ) : on_sale ? (
                            <>
                                <span className="text-lg line-through text-gray-400">
                                    ${regular_price}
                                </span>
                                <span className="text-lg font-bold text-gray-900">
                                    ${sale_price}
                                </span>
                            </>
                        ) : (
                            <span className="text-lg font-bold text-gray-900">
                                ${regular_price || price || "—"}
                            </span>
                        )}
                    </div>


                    {/* Buttons */}
                    <div className="flex gap-2 pt-2">
                        <Button variant={"default"} className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer w-full">Add to Cart</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
