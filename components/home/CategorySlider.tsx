"use client";

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "swiper/css/autoplay";
import Image from "next/image";

interface Category {
    id: number;
    name: string;
    image?: { src: string };
    slug: string;
}

const CategorySlider = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();
                // Optionally exclude ID 15
                const filtered = data.filter((cat: Category) => cat.id !== 15);
                setCategories(filtered);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <section className="container mx-auto px-6 py-12 border-b border-gray-200">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Shop by Category</h2>

                <div className="flex gap-2">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="p-2 px-3 bg-white border-gray-200 border hover:bg-blue-50 transition"
                    >
                        <i className="ri-arrow-left-s-line text-xl"></i>
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="p-2 px-3 rounded-sm bg-white  border-gray-200 border hover:bg-blue-50 transition"
                    >
                        <i className="ri-arrow-right-s-line text-xl"></i>
                    </button>
                </div>
            </div>

            {/* Swiper Slider */}
            <Swiper
                modules={[Navigation, Autoplay,]}
                autoplay={{
                    delay: 3000, // 4 seconds between slides
                    disableOnInteraction: true, // keeps autoplay running after interaction

                }}
                loop={true}
                spaceBetween={20}
                slidesPerView={2}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                }}
            >
                {categories.map((cat) => (
                    <SwiperSlide key={cat.id}>
                        <div className=" rounded-lg p-4 flex flex-col items-center justify-center transition">
                            {cat.image ? (

                                <div className="w-[120px] h-[120px] bg-gray-100 rounded-full flex items-center justify-center">
                                    <Image
                                        src={cat.image.src}
                                        alt={cat.name}
                                        width={60}
                                        height={60}
                                        loading="lazy"
                                        className=""
                                    />
                                </div>

                            ) : (
                                <div className="w-[100px] h-[100px] bg-gray-100 rounded-full flex items-center justify-center">
                                    <i className="ri-image-2-line text-gray-400 text-3xl"></i>
                                </div>
                            )}
                            <p className="mt-3 text-gray-700 font-medium text-center text-sm">
                                {cat.name}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default CategorySlider;
