export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: "simple" | "grouped" | "external" | "variable";
  status: "draft" | "pending" | "private" | "publish";
  featured: boolean;
  catalog_visibility: "visible" | "catalog" | "search" | "hidden";
  description: string;
  short_description: string;
  sku: string;
  global_unique_id?: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from?: string | null;
  date_on_sale_from_gmt?: string | null;
  date_on_sale_to?: string | null;
  date_on_sale_to_gmt?: string | null;
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: WooDownload[];
  download_limit: number;
  download_expiry: number;
  external_url?: string;
  button_text?: string;
  tax_status: "taxable" | "shipping" | "none";
  tax_class: string;
  manage_stock: boolean;
  stock_quantity?: number | null;
  stock_status: "instock" | "outofstock" | "onbackorder";
  backorders: "no" | "notify" | "yes";
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight?: string;
  dimensions: WooDimensions;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: WooCategory[];
  tags: WooTag[];
  images: WooImage[];
  attributes: WooAttribute[];
  default_attributes: WooDefaultAttribute[];
  variations: number[];
  grouped_products: number[];
  menu_order: number;
  meta_data: WooMetaData[];
}

// --- Subtypes ---

export interface WooDownload {
  id: string;
  name: string;
  file: string;
}

export interface WooDimensions {
  length: string;
  width: string;
  height: string;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WooTag {
  id: number;
  name: string;
  slug: string;
}

export interface WooImage {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}

export interface WooAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WooDefaultAttribute {
  id: number;
  name: string;
  option: string;
}

export interface WooMetaData {
  id: number;
  key: string;
  value: any;
}


export interface WooProductCategory {
  id: number; // Unique identifier
  name: string; // Category name
  slug: string; // Unique slug
  parent: number; // Parent category ID
  description: string; // HTML description
  display: "default" | "products" | "subcategories" | "both"; // Display type
  image: WooCategoryImage | null; // Category image
  menu_order: number; // Menu order for sorting
  count: number; // Number of published products
}

export interface WooCategoryImage {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}