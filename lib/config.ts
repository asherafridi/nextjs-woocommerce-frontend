export const siteConfig = {
    currency : 'Rs.',
    logo: null,
    logoName:"ZainMart",
    title:"ZainMart",
    description:"Next js based wooCommerce storefront.",
    minItemPrice:0,
    maxItemPrice:10000,
}

interface navItems {
    name: string;
    href: string;
    dropdown?: navItems[]
}

export const navItems:navItems[] = [
  { name: "Home", href: "/" },
  // {
  //   name: "Shop",
  //   dropdown: [
  //     { name: "All Products", href: "/shop" },
  //     { name: "Men's Wear", href: "/shop/mens" },
  //     { name: "Women's Wear", href: "/shop/womens" },
  //     { name: "Accessories", href: "/shop/accessories" },
  //   ],
  // },
  {
    name  :"Shop",
    href : "/shop",
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];