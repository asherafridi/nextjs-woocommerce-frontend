// app/(pages)/shop/page.tsx
import { Suspense } from "react";
import ShopPage from "./ShopPage";
import { Loader2 } from "lucide-react";

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      }
    >
      <ShopPage />
    </Suspense>
  );
}
