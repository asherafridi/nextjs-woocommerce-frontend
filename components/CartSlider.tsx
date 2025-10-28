"use client";

import React from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { siteConfig } from "@/lib/config";

// shadcn/ui Sheet components (adjust paths if your project uses a different import)
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function CartSlider() {
    const cart = useCartStore((s) => s.items);
    const removeFromCart = useCartStore((s) => s.removeFromCart);
    const increaseQty = useCartStore((s) => s.increaseQty ?? (() => { }));
    const decreaseQty = useCartStore((s) => s.decreaseQty ?? (() => { }));
    const clearCart = useCartStore((s) => s.clearCart ?? (() => { }));

    const total = cart.reduce(
        (sum, item) => sum + (parseFloat(item.price || "0") || 0) * item.quantity,
        0
    );

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:text-blue-600 cursor-pointer">
                    <i className="ri-shopping-cart-line text-xl"></i> {cart.length > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">{cart.length}</span>)}
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full min-w-lg bg-white overflow-y-auto p-6 flex flex-col">
                <div className="flex items-center justify-between ">
                    <SheetHeader>
                        <SheetTitle className="font-medium text-2xl ">Your Cart</SheetTitle>
                    </SheetHeader>
                    <SheetClose asChild>
                        <button>
                            <i className="ri-close-line text-3xl"></i>
                        </button>
                    </SheetClose>

                </div>

                <div className="flex justify-between py-2 border-gray-300 border-b">
                    <p>Products</p>
                    <p>Total</p>
                </div>
                <div className="space-y-2 flex-1">
                    {cart.length === 0 ? (
                        <div className="py-10 text-center text-gray-500">Your cart is empty.</div>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-5 p-3 px-0 rounded-md border-gray-200 "
                            >
                                <div className="relative w-24 h-24 rounded overflow-hidden bg-gray-100">
                                    {item.images ? (
                                        // Next/Image requires a domain or remote patterns configured; fallback to img tag if needed
                                        <Image
                                            src={item.images}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">No Image</div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="font-medium text-xl">{item.name}</div>
                                    <div className="text-md text-gray-600">{siteConfig.currency} {item.price}</div>


                                    <div className="flex items-center mt-2">
                                        <div className="flex items-center border border-gray-300">
                                            <button
                                                onClick={() => decreaseQty(item.id)}
                                                className="flex items-center justify-center w-8 h-8 rounded"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>

                                            <div className="px-3 min-w-12 text-center">{item.quantity}</div>

                                            <button
                                                onClick={() => increaseQty(item.id)}
                                                className="flex items-center justify-center w-8 h-8 rounded"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="ml-2 w-8 h-8 text-gray-600 bg-gray-200  border-gray-300 border flex items-center justify-center"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-lg text-right">{siteConfig.currency}<br/> {Math.floor(+item.price * +item.quantity).toFixed(2)}</p>
                                </div>

                            </div>

                        ))
                    )}
                </div>

                {/* <Separator className="my-4" /> */}

                <div className="border-t border-gray-200">
                    <div className="flex w-full items-center justify-between py-3">
                        <div className="text-xl text-gray-500">Estimate Total</div>
                        <div className=" flex justify-end flex-col items-end">
                            <p className="text-xl font-semibold">{siteConfig.currency} {total.toFixed(2)}</p>
                            <p className="text-xs">Shipping & taxes calculated at checkout</p>
                            </div>
                    </div>

                    <div className="">
                        <Button onClick={() => alert("Proceed to checkout")} className="w-full bg-blue-600 text-white rounded-none py-6">Checkout</Button>
                    </div>
                </div>

            </SheetContent>
        </Sheet>
    );
}
