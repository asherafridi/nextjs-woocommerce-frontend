"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="group overflow-hidden transition-all duration-300 rounded-md">
      {/* Image Skeleton */}
      <div className="block relative w-full rounded-md aspect-square p-2 bg-gray-50 overflow-hidden">
        <Skeleton className="absolute inset-0 rounded-md" />
        <Skeleton className="absolute top-3 right-3 h-6 w-14 rounded-full" />
      </div>

      {/* Details Skeleton */}
      <div className="space-y-2 mt-3 px-2 pb-3">
        {/* Product Name */}
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <Skeleton className="h-5 w-1/2 rounded-md" />

        {/* Price */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>

        {/* Add to Cart Button */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
