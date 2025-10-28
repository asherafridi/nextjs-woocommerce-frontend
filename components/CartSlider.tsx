"use client";

import React from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

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

            <SheetContent side="right" className="w-full min-w-lg bg-white overflow-x-scroll p-4">
                <div className="flex items-center justify-between">
                    <SheetHeader>
                        <SheetTitle>Your Cart</SheetTitle>
                        <SheetDescription>
                            Review items and proceed to checkout
                        </SheetDescription>
                    </SheetHeader>
                    <SheetClose asChild>
                            <button>
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </SheetClose>
                    
                </div>

                <div className="mt-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="py-10 text-center text-gray-500">Your cart is empty.</div>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 rounded-md p-3 border"
                            >
                                <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100">
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
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-gray-600">${item.price}</div>

                                    <div className="mt-2 flex items-center gap-2">
                                        <button
                                            onClick={() => decreaseQty(item.id)}
                                            className="flex items-center justify-center w-8 h-8 rounded border"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>

                                        <div className="px-3">{item.quantity}</div>

                                        <button
                                            onClick={() => increaseQty(item.id)}
                                            className="flex items-center justify-center w-8 h-8 rounded border"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="ml-3 text-red-600 flex items-center gap-1"
                                        >
                                            <Trash className="w-4 h-4" /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* <Separator className="my-4" /> */}

                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-gray-500">Subtotal</div>
                        <div className="text-lg font-semibold">${total.toFixed(2)}</div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button onClick={() => clearCart()} variant={"ghost"}>
                            Clear
                        </Button>
                        <Button onClick={() => alert("Proceed to checkout")}>Checkout</Button>
                    </div>
                </div>

                <SheetFooter className="mt-4">
                    <div className="text-xs text-gray-500">
                        Shipping & taxes calculated at checkout
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
