"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { useRouter } from "next/navigation";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  country: string;
  zip: string;
  phone: string;
  paymentMethod: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<CheckoutFormData>({
    defaultValues: { paymentMethod: "cod" },
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { items, clearCart } = useCartStore();
  const orderItems = items;

  const subtotal = orderItems.reduce(
    (sum, item) => sum + +item.price * item.quantity,
    0
  );
  const shipping = 250;
  const total = subtotal + shipping;

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    try {
      const orderData = {
        ...data,
        items: orderItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totals: {
          subtotal,
          shipping,
          total,
        },
      };

      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Failed to place order");

      setSuccess(true);
      clearCart();
      reset();
      router.push('/order-success');
    } catch (err) {
      console.error("Order error:", err);
      alert("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="checkout w-full bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          {/* Left: Billing Details */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    {...register("firstName", { required: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...register("lastName", { required: true })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="House no, Street, City"
                    {...register("address", { required: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Pakistan"
                    {...register("country", { required: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input
                    id="zip"
                    placeholder="12345"
                    {...register("zip", { required: true })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+92 300 1234567"
                    {...register("phone", { required: true })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  defaultValue="cod"
                  onValueChange={(val) =>
                  (document.querySelector<HTMLInputElement>(
                    "input[name='paymentMethod']"
                  )!.value = val)
                  }
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      value="cod"
                      id="cod"
                      {...register("paymentMethod")}
                    />
                    <Label htmlFor="cod">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right: Order Summary */}
          <Card className="lg:col-span-2 h-fit">
            <CardHeader>
              <CardTitle>Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex w-full justify-between px-2 py-4 border-b border-gray-200 font-medium text-lg">
                <p>Products</p>
                <p>Subtotal</p>
              </div>
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-md px-2 py-4 border-b border-gray-200 gap-4"
                >
                  <div className="relative w-20 h-20 rounded-sm border-gray-300 border flex justify-center">
                    <Image
                      src={item.images}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="w-full object-cover"
                    />
                    <span className="absolute bg-black w-6 h-6 rounded-full text-white -top-2 -right-2 text-sm text-center flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span>
                    {siteConfig.currency}{" "}
                    {(+item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between text-md px-2 py-4 font-medium border-b border-gray-200">
                <span>Subtotal</span>
                <span>
                  {siteConfig.currency} {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-md px-2 py-4 font-medium border-b border-gray-200">
                <span>Shipping</span>
                <span>
                  {siteConfig.currency} {shipping.toFixed(2)}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg px-2 py-4 font-bold border-b border-gray-200">
                <span>Total</span>
                <span>
                  {siteConfig.currency} {total.toFixed(2)}
                </span>
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer mt-6 bg-blue-600 text-white py-6 text-lg hover:bg-blue-500"
                disabled={loading || orderItems.length === 0}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </section>
  );
};

export default CheckoutPage;
