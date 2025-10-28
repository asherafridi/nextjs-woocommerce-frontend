export interface WooImage {
  id: number;
  src: string;
  alt: string;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
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

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: { src: string };
}