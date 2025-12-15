export const CART_KEY = "ecommerce_guest_cart";
export const DropDownMenuList = [
  {
    id: 2,
    title: "cookies & biscuits",
    icon: "fa-solid fa-mug-hot",
    children: [
      {
        id: 1,
        title: "Breakfast Cookies",
      },
      {
        id: 2,
        title: "Chocolate Chip Cookies",
      },
      {
        id: 3,
        title: "Namkeen & Biscuits",
      },
      {
        id: 4,
        title: "Rusks & Toasts",
      },
    ],
  },
  {
    id: 3,
    title: "Shop All",
    icon: "fas fa-wine-glass",
    children: [
      {
        id: "shop-all-1",
        title: "mineral water & drinks",
        image: "",
      },
      {
        id: "shop-all-2",
        title: "Breakfast",
        Image: "",
      },
      {
        id: "shop-all-3",
        title: "pulses & oils",
        Image: "",
      },
      {
        id: "shop-all-4",
        title: "Milk & Milk Products",
        Image: "",
      },
    ],
  },
  {
    id: 4,
    title: "Daily Essentials",
    icon: "fa fa-th",
    children: [
      {
        id: "Daily-Essentials-1",
        title: "Grocery & Staples",
      },
      {
        id: "Daily-Essentials-2",
        title: "Snacks & Beverages",
      },
      {
        id: "Daily-Essentials-3",
        title: "Personal Care & Hygiene",
      },
      {
        id: "Daily-Essentials-4",
        title: "Home Care & Cleaning",
      },
    ],
  },
  {
    id: 5,
    title: "pages",
    icon: "fa fa-gear",
    children: [
      {
        id: "pages-1",
        title: "About Us",
      },
      {
        id: "pages-2",
        title: "Contact Us",
      },
      {
        id: "pages-3",
        title: "Privacy Policy",
      },
      {
        id: "pages-4",
        title: "Terms & Conditions",
      },
      {
        id: "pages-5",
        title: "Refund & Cancellation Policy",
      },
      {
        id: "pages-6",
        title: "Shipping Policy",
      },
    ],
  },
  {
    id: 6,
    title: "Pulses & Oils",
    icon: "fa fa-seedling",
    children: [
      {
        id: "pulses-oils-1",
        title: "Pulses & Lentils",
      },
      {
        id: "pulses-oils-2",
        title: "mustard & refined Oils",
      },
      {
        id: "pulses-oils-3",
        title: "Pasta & Noodles",
      },
      {
        id: "pulses-oils-4",
        title: "Spices & Seasonings",
      },
      {
        id: "pulses-oils-5",
        title: "Flours & Rice & sugar",
      },
    ],
  },
];
export const Links = [
  {
    id: 1,
    title: "Home",
    to: "/",
  },
  {
    id: 2,
    title: "About Us",
    to: "/about",
  },
  {
    id: 3,
    title: "Contact Us",
    to: "/contact",
  },
  {
    id: 4,
    title: "Support",
    to: "/support",
  },
  {
    id: 5,
    title: "FAQ",
    to: "/faq",
  },
];
export const Role = [
  {
    id: Date.now(),
    title: "customer",
  },
  {
    id: Date.now() + 1,
    title: "vendor",
  },
];
export const sliderData = [
  {
    id: 0,
    title: "Daily Essentials Products",
    description:
      "Step in to a world of fresh product, vibrant colors, and enticing aromos at our grocery store. We offer a wide selection of pulses and oils, organic products and cookies and biscutes for daily Essentials",
    image: "/assets/daily.png",
    url: "?category=Essentials",
  },
  {
    id: 1,
    title: "Pulse, Oils & dry fruits",
    description:
      "“Discover our wide range of protein-rich pulses, pure cooking oils, and premium dry fruits to make every meal healthier and tastier.”",
    image: "/assets/kirana.png",
    url: "?category=pulse",
  },
  {
    id: 2,
    title: "Cookies, Biscuits & Chocolates",
    description:
      "From crunchy cookies and classic biscuits to rich, velvety chocolates, our wide selection brings you the perfect treats to enjoy with family, share with friends, or satisfy sweet cravings anytime.",
    image: "/assets/cookies.png",
    url: "?category=Bakery & Snack",
  },
  {
    id: 3,
    title: "Drinks, Water & Beverages",
    description:
      "From pure drinking water and soft drinks to energizing beverages and refreshing juices, our collection offers everything you need to stay hydrated, refreshed, and satisfied throughout the day.",
    image: "/assets/drinks.png",
    url: "?category=drink",
  },
];
export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
export const CategoryList = [
  {
    id: "category-1",
    title: "Pulses & Oils",
    image: "/assets/kirana.png",
    desciption:
      "Wholesome pulses and pure oils to keep your everyday meals healthy, nutritious, and full of natural flavor",
  },
  {
    id: "category-2",
    title: "cookies & biscuits",
    image: "/assets/cookies.png",
    desciption:
      "Delight in our selection of cookies and biscuits, perfect for satisfying your sweet cravings anytime",
  },
  {
    id: "category-3",
    title: "Drinks & Beverages",
    image: "/assets/drinks.png",
    desciption:
      "Refresh and rejuvenate with our wide range of drinks and beverages, perfect for any occasion",
  },
  {
    id: "category-4",
    title: "Daily Essentials",
    image: "/assets/daily.png",
    desciption:
      "Your one-stop shop for all daily essentials, from groceries to household needs, ensuring convenience and quality",
  },
];
export const DummyProducts = [
  {
    id: 1,
    name: "Fresh Apples",
    quantity: "1kg",
    price: 120,
    category: "Fruits",
    image: "https://via.placeholder.com/150?text=Apples",
  },
  {
    id: 2,
    name: "Whole Wheat Bread",
    quantity: "400g",
    price: 40,
    category: "Bakery",
    image: "https://via.placeholder.com/150?text=Bread",
  },
  {
    id: 3,
    name: "Organic Milk",
    quantity: "1L",
    price: 60,
    category: "Dairy",
    image: "https://via.placeholder.com/150?text=Milk",
  },
  {
    id: 4,
    name: "Basmati Rice",
    quantity: "5kg",
    price: 550,
    category: "Grains",
    image: "https://via.placeholder.com/150?text=Rice",
  },
  {
    id: 5,
    name: "Free Range Eggs",
    quantity: "12 pcs",
    price: 90,
    category: "Dairy",
    image: "https://via.placeholder.com/150?text=Eggs",
  },
  {
    id: 6,
    name: "Cooking Oil (Sunflower)",
    quantity: "1L",
    price: 150,
    category: "Essentials",
    image: "https://via.placeholder.com/150?text=Oil",
  },
  {
    id: 7,
    name: "Fresh Tomatoes",
    quantity: "1kg",
    price: 50,
    category: "Vegetables",
    image: "https://via.placeholder.com/150?text=Tomatoes",
  },
  {
    id: 8,
    name: "Green Tea Bags",
    quantity: "100 pcs",
    price: 250,
    category: "Beverages",
    image: "https://via.placeholder.com/150?text=Green+Tea",
  },
  {
    id: 9,
    name: "Sugar",
    quantity: "1kg",
    price: 45,
    category: "Essentials",
    image: "https://via.placeholder.com/150?text=Sugar",
  },
  {
    id: 10,
    name: "Potatoes",
    quantity: "2kg",
    price: 70,
    category: "Vegetables",
    image: "https://via.placeholder.com/150?text=Potatoes",
  },
];
export const ProductFilters = [
  {
    id: "filter1",
    title: "Availability",
    children: [
      {
        id: "avai1",
        title: "in stock",
      },
      {
        id: "avai2",
        title: "out of stock",
      },
    ],
  },
  {
    id: "filter2",
    title: "price",
    children: [
      {
        id: "price1",
        title: "min price",
      },
      {
        id: "price2",
        title: "max price",
      },
    ],
  },
  {
    id: "filter3",
    title: "Product Type",
    children: [
      // {
      //   id: "type1",
      //   title: "Bakery",
      // },
      // {
      //   id: "type2",
      //   title: "Dirnks & Water",
      // },
      // {
      //   id: "type4",
      //   title: "Essentials",
      // },
      // {
      //   id: "type6",
      //   title: "Beverages",
      // },
      // {
      //   id: "type7",
      //   title: "Cookies & Biscuites",
      // },
    ],
  },
  {
    id: "filter4",
    title: "Brand",
    children: [],
  },
  {
    id: "filter5",
    title: "Color",
    children: [],
  },
  {
    id: "filter6",
    title: "Material",
    children: [],
  },
  {
    id: "filter7",
    title: "Size",
    children: [
      {
        id: "size",
        title: "100 Grams",
      },
      {
        id: "size2",
        title: "200 Grams",
      },
      {
        id: "size3",
        title: "300 Grams",
      },
      {
        id: "size4",
        title: "500 Grams",
      },
      {
        id: "size5",
        title: "1 KG",
      },
      {
        id: "size6",
        title: "1.5 KG",
      },
      {
        id: "size7",
        title: "2.5 KG",
      },
      {
        id: "size8",
        title: "3 KG",
      },
      {
        id: "size9",
        title: "500 ML",
      },
      {
        id: "size10",
        title: "1 L",
      },
      {
        id: "size11",
        title: "2 L",
      },
    ],
  },
];

// for image constants

export let MAX_IMAGES = 5;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
