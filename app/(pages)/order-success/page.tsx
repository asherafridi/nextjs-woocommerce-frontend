"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const OrderSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <i className="ri-checkbox-circle-line text-blue-500 text-9xl"></i> 
      <h1 className="text-3xl font-bold mb-3">Order Placed Successfully!</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Thank you for your purchase. We’ve received your order and it’s being
        processed. You’ll receive a confirmation email shortly.
      </p>

      <Button
        className="bg-blue-600 text-white hover:bg-blue-500 px-8 py-6 text-lg"
        onClick={() => router.push("/")}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default OrderSuccessPage;
