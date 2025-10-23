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
      title: "Brightening Base SPF 45",
      discount: "20%",
      discountText: "Sale OFF",
      description:
        "Your one stop shop for all your needs. Discover a wide range of products at unbeatable prices.",
      slug: "brightening-base-spf-45",
    },
    {
      id: 2,
      image: "/slider/1.webp",
      title: "Hydrating Face Serum",
      discount: "15%",
      discountText: "Sale OFF",
      description:
        "Keep your skin hydrated and glowing with our premium face serum collection.",
      slug: "hydrating-face-serum",
    },
    {
      id: 3,
      image: "/slider/1.webp",
      title: "Natural Glow Cream",
      discount: "25%",
      discountText: "Sale OFF",
      description:
        "Enhance your natural beauty with our smooth and radiant glow cream.",
      slug: "natural-glow-cream",
    },
  ];

  return (
    <section className="bg-gray-100">
      <div className="container mx-auto px-3 md:px-6 py-6 md:py-12">
        <div className="w-full md:w-3/5 bg-white p-3 md:p-6 rounded-lg">
        <Swiper
          modules={[Pagination,Autoplay,]}
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
                <div className="w-full md:w-1/2 space-y-2 md:space-y-4 px-6">
                  <div className="flex gap-2 items-center">
                    <p className="text-3xl md:text-5xl font-bold text-blue-600">
                      {slide.discount}
                    </p>
                    <p className="text-lg md:text-xl uppercase leading-tight">
                      {slide.discountText}
                    </p>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-medium">{slide.title}</h2>
                  <p className="text-sm md:text-md text-gray-600 mb-6">{slide.description}</p>
                  <Link href={`/products/${slide.slug}`} className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                    Shop Now
                  </Link>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={400}
                    height={400}
                    className="rounded-lg object-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
