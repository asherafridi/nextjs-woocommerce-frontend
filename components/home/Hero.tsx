"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from "next/link";

const Hero = () => {
    const slides = [
        {
            id: 1,
            image: "/slider/1.webp",
            title: "Samsung Ultra S24 - 16/512 GB",
            discount: "20%",
            discountText: "Sale OFF",
            description:
                "Your one stop shop for all your needs. Discover a wide range of products at unbeatable prices. lorem ipsum dolor sit amet.",
            slug: "brightening-base-spf-45",
        },
        {
            id: 2,
            image: "/slider/2.webp",
            title: "Apple EarPods - Black with Lightning Connector",
            discount: "15%",
            discountText: "Sale OFF",
            description:
                "lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac erat vel dolor. lorem ipsum dolor sit amet.",
            slug: "hydrating-face-serum",
        },
        {
            id: 3,
            image: "/slider/3.webp",
            title: "iPad Pro 11-inch - Wi-Fi 256GB",
            discount: "25%",
            discountText: "Sale OFF",
            description:
                "Enhance your natural beauty with our smooth and radiant glow cream. lorem ipsum dolor sit amet.",
            slug: "natural-glow-cream",
        },
    ];

    return (
        <section className="bg-gray-100">
            <div className="container mx-auto px-3 md:px-6 py-6 md:py-12 gap-8 flex flex-col md:flex-row  justify-center">
                <div className="w-full md:w-3/5 bg-white p-3 md:p-6 rounded-lg flex items-center">
                    <Swiper
                        modules={[Pagination, Autoplay,]}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 3000, // 4 seconds between slides
                            disableOnInteraction: true, // keeps autoplay running after interaction

                        }}
                        loop={true}
                        className=""
                    >
                        {slides.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between pb-12 md:pb-0">
                                    <div className="w-full md:w-1/2 md:space-y-4 px-6">
                                        <div className="flex gap-2 items-center">
                                            <p className="text-3xl md:text-5xl font-bold text-blue-700">
                                                {slide.discount}
                                            </p>
                                            <p className="text-lg md:text-xl uppercase leading-tight">
                                                Sale <br />Off
                                            </p>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4 md:mb-12">{slide.title}</h2>
                                        <p className="text-sm md:text-md text-gray-600 mb-6">{slide.description}</p>
                                        <Link href={`/products/${slide.slug}`} className="bg-[#1c274c] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition text-sm mt-4">
                                            Shop Now
                                        </Link>
                                    </div>
                                    <div className="w-full md:w-1/2 flex justify-center">
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            width={300}
                                            height={300}
                                            className="rounded-lg object-contain"
                                            priority={true}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="w-full md:w-2/5 flex flex-col gap-8">
                    {/* SideBanner 1 */}
                    <div className="w-full bg-white h-1/2   p-6 rounded-lg flex justify-between">
                        <div className="w-full flex flex-col justify-between items-between gap-8">
                            <div>
                                <h2 className="text-gray-900 text-xl font-medium">iPhone 16 Pro & 16 Pro Max</h2>
                                <p className="text-sm">Get your desired phon from featured category</p></div>
                            <div>
                                <p className="text-sm uppercase">limited time offer</p>

                                <p className="text-2xl font-medium">$600
                                    <span className="ml-4 text-gray-400 line-through">$898</span></p>
                            </div>

                        </div>
                        <div className="w-full flex justify-center items-center">
                            <Image src={'/slider/4.webp'} alt="iphone" width={150} height={150} className="object-contain" priority={true} />
                        </div>
                    </div>
                    {/* SideBanner 2 */}
                    <div className="w-full bg-white h-1/2   p-6 rounded-lg flex">
                        <div className="w-full flex flex-col justify-between items-between gap-8">
                            <div>
                                <h2 className="text-gray-900 text-xl font-medium">Mackbook Pro M4</h2>
                                <p className="text-sm">14-core CPU with 10 and 4 efficiency cores</p></div>
                            <div>
                                <p className="text-sm uppercase">limited time offer</p>

                                <p className="text-2xl  font-medium">$600
                                    <span className="ml-4 text-gray-400 line-through">$898</span></p>
                            </div>

                        </div>
                        <div className="w-full flex justify-center items-center">
                            <Image src={'/slider/5.webp'} alt="iphone" width={150} height={150} className="object-contain" priority={true} />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
