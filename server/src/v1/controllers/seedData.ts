// ============================================================
//  seedProducts.js  —  100+ General Store Products Seed Data
//  Vendor: 68f37db4661c8ba00f035c06 (single vendor)
//  Run: node seedProducts.js  (uncomment the runner at bottom)
// ============================================================

import mongoose from "mongoose";
import ProductModel from "../models/Product.model";

const VENDOR_ID = new mongoose.Types.ObjectId("68f37db4661c8ba00f035c06");

const future = (days: any) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

const products = [
  // ╔══════════════════════════════════════════════════════╗
  // ║           COLD DRINKS & SOFT BEVERAGES  (18)        ║
  // ╚══════════════════════════════════════════════════════╝
  {
    vendor: VENDOR_ID,
    name: "Coca-Cola Classic (6 Pack)",
    description:
      "The world's favourite sparkling cola. Coca-Cola Classic delivers the iconic, refreshing taste that billions love. Chilled cans, perfect for meals, parties, or simply quenching your thirst on a hot day.",
    originalPrice: 180,
    price: 155,
    category: "Cold Drinks",
    brand: "Coca-Cola",
    sku: "CD-COKE-001",
    organic: false,
    featured: true,
    stock: 500,
    unit: "6 × 330 ml cans",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coca_Cola_can_2021.svg/200px-Coca_Cola_can_2021.svg.png",
        alt: "Coca-Cola Classic Can",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Coca-Cola_logo.svg/200px-Coca-Cola_logo.svg.png",
        alt: "Coca-Cola Logo",
      },
    ],
    discount: 14,
    expiryDate: future(30),
    sales: 1250,
    tags: ["cola", "cold drink", "soda", "fizzy", "coca cola"],
    status: "publised",
    weight: 1.98,
    dimensions: { length: 28, width: 18, height: 12 },
    rating: { average: 4.7, count: 840 },
  },
  {
    vendor: VENDOR_ID,
    name: "Pepsi Cola (6 Pack)",
    description:
      "Bold, refreshing Pepsi Cola with its distinct, smooth taste and satisfying fizz. A classic rival to cola lovers. Great with pizza, burgers, or enjoyed ice-cold straight from the can.",
    originalPrice: 175,
    price: 149,
    category: "Cold Drinks",
    brand: "Pepsi",
    sku: "CD-PEPSI-002",
    organic: false,
    featured: false,
    stock: 450,
    unit: "6 × 330 ml cans",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_logo_2014.svg/200px-Pepsi_logo_2014.svg.png",
        alt: "Pepsi Can",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pepsi_can_2021.png/200px-Pepsi_can_2021.png",
        alt: "Pepsi Cola Can",
      },
    ],
    discount: 15,
    expiryDate: future(30),
    sales: 1100,
    tags: ["pepsi", "cola", "cold drink", "soda", "fizzy"],
    status: "publised",
    weight: 1.98,
    dimensions: { length: 28, width: 18, height: 12 },
    rating: { average: 4.6, count: 720 },
  },
  {
    vendor: VENDOR_ID,
    name: "Mountain Dew (Bottle)",
    description:
      "Electrifying citrus-flavoured carbonated drink with a bold, energetic kick. Mountain Dew's neon-green fizz is the go-to drink for gamers, thrill-seekers, and anyone craving a citrusy rush.",
    originalPrice: 40,
    price: 35,
    category: "Cold Drinks",
    brand: "Mountain Dew",
    sku: "CD-DEW-003",
    organic: false,
    featured: true,
    stock: 600,
    unit: "600 ml bottle",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Mountain_Dew_Green_Label.jpg/200px-Mountain_Dew_Green_Label.jpg",
        alt: "Mountain Dew Bottle",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Mountain_Dew_logo.svg/200px-Mountain_Dew_logo.svg.png",
        alt: "Mountain Dew Logo",
      },
    ],
    discount: 13,
    expiryDate: future(30),
    sales: 980,
    tags: ["mountain dew", "dew", "citrus", "cold drink", "soda"],
    status: "publised",
    weight: 0.63,
    dimensions: { length: 8, width: 8, height: 26 },
    rating: { average: 4.6, count: 635 },
  },
  {
    vendor: VENDOR_ID,
    name: "Thumbs Up (Bottle)",
    description:
      "India's own bold, spicy cola with a strong carbonated kick. Thums Up has a distinctly intense flavour that sets it apart from other colas — strong, not sweet. A true desi favourite.",
    originalPrice: 40,
    price: 35,
    category: "Cold Drinks",
    brand: "Thums Up",
    sku: "CD-THUMSUP-004",
    organic: false,
    featured: true,
    stock: 550,
    unit: "600 ml bottle",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Thums_Up_logo.svg/200px-Thums_Up_logo.svg.png",
        alt: "Thums Up Bottle",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Thums_up_bottle.jpg/200px-Thums_up_bottle.jpg",
        alt: "Thums Up Cola Bottle",
      },
    ],
    discount: 13,
    expiryDate: future(30),
    sales: 920,
    tags: ["thums up", "thumbs up", "cola", "desi", "indian"],
    status: "publised",
    weight: 0.63,
    dimensions: { length: 8, width: 8, height: 26 },
    rating: { average: 4.7, count: 590 },
  },
  {
    vendor: VENDOR_ID,
    name: "Sprite Lemon-Lime (Bottle)",
    description:
      "Crisp, clean lemon-lime flavoured carbonated drink. Sprite is refreshingly light with a clean citrus taste and no caffeine. The perfect thirst-quencher on hot summer days.",
    originalPrice: 40,
    price: 35,
    category: "Cold Drinks",
    brand: "Sprite",
    sku: "CD-SPRITE-005",
    organic: false,
    featured: false,
    stock: 500,
    unit: "600 ml bottle",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Sprite-can-2022.png/200px-Sprite-can-2022.png",
        alt: "Sprite Bottle",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sprite_logo.png/200px-Sprite_logo.png",
        alt: "Sprite Logo",
      },
    ],
    discount: 13,
    expiryDate: future(30),
    sales: 870,
    tags: ["sprite", "lemon lime", "citrus", "cold drink", "soda"],
    status: "publised",
    weight: 0.63,
    dimensions: { length: 8, width: 8, height: 26 },
    rating: { average: 4.5, count: 545 },
  },
  {
    vendor: VENDOR_ID,
    name: "Maaza Mango Drink (Bottle)",
    description:
      "Thick, pulpy mango drink made with real Alphonso mango pulp. Maaza delivers an authentic mango experience — sweet, aromatic, and indulgent. Best served chilled.",
    originalPrice: 40,
    price: 35,
    category: "Cold Drinks",
    brand: "Maaza",
    sku: "CD-MAAZA-006",
    organic: false,
    featured: true,
    stock: 480,
    unit: "600 ml bottle",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Maaza_logo.svg/200px-Maaza_logo.svg.png",
        alt: "Maaza Mango Drink",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Maaza_bottle.jpg/200px-Maaza_bottle.jpg",
        alt: "Maaza Mango Bottle",
      },
    ],
    discount: 13,
    expiryDate: future(30),
    sales: 1050,
    tags: ["maaza", "mango", "fruity", "cold drink", "juice"],
    status: "publised",
    weight: 0.64,
    dimensions: { length: 8, width: 8, height: 26 },
    rating: { average: 4.7, count: 680 },
  },
  {
    vendor: VENDOR_ID,
    name: "Frooti Mango Fruit Drink",
    description:
      "Frooti — India's No.1 mango drink — with a sweet, fun, and fruity mango flavour kids and adults both love. The iconic tetra pack that started it all. Pure mango joy in every sip.",
    originalPrice: 20,
    price: 18,
    category: "Cold Drinks",
    brand: "Frooti",
    sku: "CD-FROOTI-007",
    organic: false,
    featured: false,
    stock: 700,
    unit: "200 ml tetra pack",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Frooti_logo.svg/200px-Frooti_logo.svg.png",
        alt: "Frooti Mango Drink",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Frooti-drink.jpg/200px-Frooti-drink.jpg",
        alt: "Frooti Tetra Pack",
      },
    ],
    discount: 10,
    expiryDate: future(60),
    sales: 1400,
    tags: ["frooti", "mango", "kids", "tetra pack", "fruity"],
    status: "publised",
    weight: 0.21,
    dimensions: { length: 6, width: 4, height: 12 },
    rating: { average: 4.5, count: 880 },
  },
  {
    vendor: VENDOR_ID,
    name: "Limca Lime & Lemon (Bottle)",
    description:
      "India's favourite lime and lemon carbonated drink with a refreshing lemony burst. Limca's tangy, slightly sweet fizz is the perfect companion to spicy Indian food.",
    originalPrice: 40,
    price: 35,
    category: "Cold Drinks",
    brand: "Limca",
    sku: "CD-LIMCA-008",
    organic: false,
    featured: false,
    stock: 420,
    unit: "600 ml bottle",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Limca_Logo.svg/200px-Limca_Logo.svg.png",
        alt: "Limca Bottle",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Limca_cold_drink.jpg/200px-Limca_cold_drink.jpg",
        alt: "Limca Lemon Drink",
      },
    ],
    discount: 13,
    expiryDate: future(30),
    sales: 720,
    tags: ["limca", "lemon", "lime", "cold drink", "fizzy"],
    status: "publised",
    weight: 0.63,
    dimensions: { length: 8, width: 8, height: 26 },
    rating: { average: 4.4, count: 460 },
  },
  {
    vendor: VENDOR_ID,
    name: "Fanta Orange (6 Pack)",
    description:
      "Bubbly, fruity, and fun — Fanta Orange with its vivid orange colour and burst of fruit flavour is a crowd pleaser at every gathering. Caffeine-free and wildly refreshing.",
    originalPrice: 180,
    price: 155,
    category: "Cold Drinks",
    brand: "Fanta",
    sku: "CD-FANTA-009",
    organic: false,
    featured: false,
    stock: 380,
    unit: "6 × 330 ml cans",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Fanta_logo_2023.svg/200px-Fanta_logo_2023.svg.png",
        alt: "Fanta Orange Can",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Fanta-orange-can.jpg/200px-Fanta-orange-can.jpg",
        alt: "Fanta Orange 6 Pack",
      },
    ],
    discount: 14,
    expiryDate: future(30),
    sales: 640,
    tags: ["fanta", "orange", "cold drink", "fruity", "soda"],
    status: "publised",
    weight: 1.98,
    dimensions: { length: 28, width: 18, height: 12 },
    rating: { average: 4.5, count: 415 },
  },
  {
    vendor: VENDOR_ID,
    name: "7UP Lemon Sparkling (Bottle)",
    description:
      "Fresh, clean lemon-lime sparkling drink with zero caffeine. 7UP's crisp fizz and bright citrus taste make it the perfect mixer or standalone refreshment.",
    originalPrice: 40,
    price: 35,
    category: "Cold Drinks",
    brand: "7UP",
    sku: "CD-7UP-010",
    organic: false,
    featured: false,
    stock: 460,
    unit: "600 ml bottle",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/7up_logo.svg/200px-7up_logo.svg.png",
        alt: "7UP Bottle",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/7UP_bottle.jpg/200px-7UP_bottle.jpg",
        alt: "7UP Lemon Sparkling Drink",
      },
    ],
    discount: 13,
    expiryDate: future(30),
    sales: 680,
    tags: ["7up", "lemon", "citrus", "cold drink", "soda"],
    status: "publised",
    weight: 0.63,
    dimensions: { length: 8, width: 8, height: 26 },
    rating: { average: 4.4, count: 430 },
  },
  {
    vendor: VENDOR_ID,
    name: "Appy Fizz Apple Drink",
    description:
      "Sparkling apple-flavoured drink with real apple juice. Appy Fizz is bubbly, light, and refreshing — the cool, fizzy side of apple juice. Perfect for parties and celebrations.",
    originalPrice: 30,
    price: 25,
    category: "Cold Drinks",
    brand: "Appy Fizz",
    sku: "CD-APPYFIZZ-011",
    organic: false,
    featured: false,
    stock: 500,
    unit: "250 ml can",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Appy_Fizz_Logo.png/200px-Appy_Fizz_Logo.png",
        alt: "Appy Fizz Can",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Appy_fizz_drink.jpg/200px-Appy_fizz_drink.jpg",
        alt: "Appy Fizz Apple Drink",
      },
    ],
    discount: 17,
    expiryDate: future(60),
    sales: 780,
    tags: ["appy fizz", "apple", "sparkling", "cold drink", "fruity"],
    status: "publised",
    weight: 0.27,
    dimensions: { length: 7, width: 7, height: 12 },
    rating: { average: 4.5, count: 490 },
  },
  {
    vendor: VENDOR_ID,
    name: "Miranda Orange (Bottle)",
    description:
      "Bright orange fizzy drink bursting with citrus flavour. Miranda is sweet, light, and full of fruity goodness. A fun, vibrant choice for kids and adults alike.",
    originalPrice: 40,
    price: 35,
    category: "Cold Drinks",
    brand: "Miranda",
    sku: "CD-MIRANDA-012",
    organic: false,
    featured: false,
    stock: 400,
    unit: "600 ml bottle",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
        alt: "Miranda Orange Bottle",
      },
      {
        image:
          "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&h=400&fit=crop",
        alt: "Orange Fizzy Drink",
      },
    ],
    discount: 13,
    expiryDate: future(30),
    sales: 560,
    tags: ["miranda", "orange", "fizzy", "cold drink", "soda"],
    status: "publised",
    weight: 0.63,
    dimensions: { length: 8, width: 8, height: 26 },
    rating: { average: 4.3, count: 360 },
  },
  {
    vendor: VENDOR_ID,
    name: "Red Bull Energy Drink",
    description:
      "Red Bull gives you wings! Packed with caffeine, taurine, and B vitamins, this iconic energy drink boosts alertness and performance. For late nights, workouts, or when you just need a lift.",
    originalPrice: 125,
    price: 109,
    category: "Cold Drinks",
    brand: "Red Bull",
    sku: "CD-REDBULL-013",
    organic: false,
    featured: true,
    stock: 350,
    unit: "250 ml can",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Red_Bull_cola_can.jpg/200px-Red_Bull_cola_can.jpg",
        alt: "Red Bull Energy Drink",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Red_Bull_logo_2019.svg/200px-Red_Bull_logo_2019.svg.png",
        alt: "Red Bull Logo",
      },
    ],
    discount: 13,
    expiryDate: future(180),
    sales: 820,
    tags: ["red bull", "energy drink", "caffeine", "boost", "fitness"],
    status: "publised",
    weight: 0.28,
    dimensions: { length: 7, width: 7, height: 14 },
    rating: { average: 4.6, count: 545 },
  },
  {
    vendor: VENDOR_ID,
    name: "Tropicana Orange Juice (Pack of 6)",
    description:
      "Premium 100% squeezed orange juice with no added sugar or preservatives. Rich in vitamin C and potassium. Start your morning right with the pure taste of oranges.",
    originalPrice: 360,
    price: 309,
    category: "Cold Drinks",
    brand: "Tropicana",
    sku: "CD-TROPICANA-014",
    organic: false,
    featured: false,
    stock: 300,
    unit: "6 × 200 ml tetra",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Tropicana_logo.svg/200px-Tropicana_logo.svg.png",
        alt: "Tropicana Orange Juice",
      },
      {
        image:
          "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
        alt: "Tropicana Juice Pack",
      },
    ],
    discount: 14,
    expiryDate: future(60),
    sales: 580,
    tags: ["tropicana", "orange juice", "vitamin c", "breakfast", "no sugar"],
    status: "publised",
    weight: 1.26,
    dimensions: { length: 26, width: 18, height: 10 },
    rating: { average: 4.6, count: 380 },
  },
  {
    vendor: VENDOR_ID,
    name: "Real Mixed Fruit Juice",
    description:
      "A delicious blend of real mixed fruits — guava, apple, mango, and passion fruit — with no artificial colours. Real Juice delivers the goodness of fruits in every pack.",
    originalPrice: 30,
    price: 25,
    category: "Cold Drinks",
    brand: "Real",
    sku: "CD-REALJUICE-015",
    organic: false,
    featured: false,
    stock: 600,
    unit: "200 ml tetra pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&h=400&fit=crop",
        alt: "Real Mixed Fruit Juice",
      },
      {
        image:
          "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
        alt: "Mixed Fruit Juice Pack",
      },
    ],
    discount: 17,
    expiryDate: future(90),
    sales: 960,
    tags: ["real juice", "mixed fruit", "no artificial colour", "kids"],
    status: "publised",
    weight: 0.22,
    dimensions: { length: 6, width: 4, height: 12 },
    rating: { average: 4.4, count: 620 },
  },
  {
    vendor: VENDOR_ID,
    name: "Bisleri Mineral Water (Pack of 12)",
    description:
      "Pure, safe, and refreshing Bisleri mineral water sourced from natural springs. Processed through a 10-step purification process. Trusted by millions across India.",
    originalPrice: 180,
    price: 155,
    category: "Cold Drinks",
    brand: "Bisleri",
    sku: "CD-BISLERI-016",
    organic: false,
    featured: false,
    stock: 800,
    unit: "12 × 500 ml bottles",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Bisleri_logo.svg/200px-Bisleri_logo.svg.png",
        alt: "Bisleri Water Bottle",
      },
      {
        image:
          "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop",
        alt: "Mineral Water Pack",
      },
    ],
    discount: 14,
    expiryDate: future(365),
    sales: 1800,
    tags: ["bisleri", "water", "mineral water", "packaged", "pure"],
    status: "publised",
    weight: 6,
    dimensions: { length: 35, width: 25, height: 20 },
    rating: { average: 4.6, count: 1100 },
  },
  {
    vendor: VENDOR_ID,
    name: "Kinley Soda Water (4 Pack)",
    description:
      "Crisp, perfectly carbonated Kinley Club Soda. The ideal mixer for cocktails and mocktails or as a refreshing standalone drink. Pure water with natural minerals.",
    originalPrice: 120,
    price: 99,
    category: "Cold Drinks",
    brand: "Kinley",
    sku: "CD-KINLEYSODA-017",
    organic: false,
    featured: false,
    stock: 400,
    unit: "4 × 500 ml bottles",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=400&fit=crop",
        alt: "Kinley Soda Water",
      },
      {
        image:
          "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&h=400&fit=crop",
        alt: "Sparkling Soda Bottles",
      },
    ],
    discount: 18,
    expiryDate: future(365),
    sales: 520,
    tags: ["kinley", "soda", "sparkling water", "mixer", "club soda"],
    status: "publised",
    weight: 2,
    dimensions: { length: 24, width: 18, height: 12 },
    rating: { average: 4.3, count: 330 },
  },
  {
    vendor: VENDOR_ID,
    name: "Monster Energy Green (Pack of 4)",
    description:
      "Monster Energy — unleash the beast! A high-powered energy drink with a massive caffeine dose, B vitamins, and amino acids. For those who refuse to take it easy.",
    originalPrice: 500,
    price: 439,
    category: "Cold Drinks",
    brand: "Monster",
    sku: "CD-MONSTER-018",
    organic: false,
    featured: false,
    stock: 250,
    unit: "4 × 355 ml cans",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Monster_Energy_logo.svg/200px-Monster_Energy_logo.svg.png",
        alt: "Monster Energy Drink",
      },
      {
        image:
          "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=400&h=400&fit=crop",
        alt: "Monster Energy Can Pack",
      },
    ],
    discount: 12,
    expiryDate: future(180),
    sales: 390,
    tags: ["monster", "energy drink", "caffeine", "fitness", "gaming"],
    status: "publised",
    weight: 1.44,
    dimensions: { length: 24, width: 16, height: 14 },
    rating: { average: 4.5, count: 255 },
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║           CHOCOLATES  (14)                          ║
  // ╚══════════════════════════════════════════════════════╝
  {
    vendor: VENDOR_ID,
    name: "Cadbury Dairy Milk (3 Pack)",
    description:
      "The nation's most loved chocolate. Cadbury Dairy Milk is made with the finest cocoa and a glass-and-a-half of fresh milk in every bar. Smooth, creamy, and utterly irresistible.",
    originalPrice: 150,
    price: 129,
    category: "Chocolates",
    brand: "Cadbury",
    sku: "CH-DAIRYMILK-019",
    organic: false,
    featured: true,
    stock: 450,
    unit: "3 × 38 g bars",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Cadbury_logo.svg/200px-Cadbury_logo.svg.png",
        alt: "Cadbury Dairy Milk",
      },
      {
        image:
          "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=400&fit=crop",
        alt: "Dairy Milk Chocolate Bars",
      },
    ],
    discount: 14,
    expiryDate: future(180),
    sales: 1400,
    tags: ["dairy milk", "cadbury", "chocolate", "milk chocolate", "sweet"],
    status: "publised",
    weight: 0.114,
    dimensions: { length: 20, width: 14, height: 4 },
    rating: { average: 4.8, count: 920 },
  },
  {
    vendor: VENDOR_ID,
    name: "KitKat Chocolate Wafer (4 Finger)",
    description:
      "Have a break — have a KitKat! Crispy wafer fingers covered in smooth milk chocolate. The world's most iconic break-time treat. Satisfying crunch in every bite.",
    originalPrice: 50,
    price: 43,
    category: "Chocolates",
    brand: "KitKat",
    sku: "CH-KITKAT-020",
    organic: false,
    featured: true,
    stock: 600,
    unit: "41.5 g (4 finger)",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Kitkat_logo.svg/200px-Kitkat_logo.svg.png",
        alt: "KitKat Chocolate",
      },
      {
        image:
          "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop",
        alt: "KitKat 4 Finger Bar",
      },
    ],
    discount: 14,
    expiryDate: future(180),
    sales: 1250,
    tags: ["kitkat", "wafer", "chocolate", "nestle", "break"],
    status: "publised",
    weight: 0.0415,
    dimensions: { length: 14, width: 7, height: 2 },
    rating: { average: 4.7, count: 810 },
  },
  {
    vendor: VENDOR_ID,
    name: "Five Star Chocolate Bar",
    description:
      "Cadbury Five Star — India's favourite combination of caramel, nougat, and chocolate all rolled into one deliciously chewy bar. A timeless treat for every age.",
    originalPrice: 20,
    price: 18,
    category: "Chocolates",
    brand: "Cadbury",
    sku: "CH-FIVESTAR-021",
    organic: false,
    featured: false,
    stock: 700,
    unit: "40 g bar",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&h=400&fit=crop",
        alt: "Five Star Chocolate Bar",
      },
      {
        image:
          "https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?w=400&h=400&fit=crop",
        alt: "Cadbury Five Star",
      },
    ],
    discount: 10,
    expiryDate: future(180),
    sales: 1100,
    tags: ["five star", "cadbury", "caramel", "nougat", "chocolate"],
    status: "publised",
    weight: 0.04,
    dimensions: { length: 12, width: 5, height: 2 },
    rating: { average: 4.6, count: 740 },
  },
  {
    vendor: VENDOR_ID,
    name: "Cadbury Fuse Chocolate",
    description:
      "Cadbury Fuse — the ultimate hunger buster. Peanuts and caramel fused together in thick Dairy Milk chocolate. Crunchy, chewy, and absolutely filling.",
    originalPrice: 25,
    price: 22,
    category: "Chocolates",
    brand: "Cadbury",
    sku: "CH-FUSE-022",
    organic: false,
    featured: false,
    stock: 600,
    unit: "45 g bar",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
        alt: "Cadbury Fuse Chocolate",
      },
      {
        image:
          "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=400&h=400&fit=crop",
        alt: "Fuse Peanut Caramel Bar",
      },
    ],
    discount: 12,
    expiryDate: future(180),
    sales: 870,
    tags: ["fuse", "cadbury", "peanut", "caramel", "chocolate"],
    status: "publised",
    weight: 0.045,
    dimensions: { length: 14, width: 5, height: 2 },
    rating: { average: 4.5, count: 565 },
  },
  {
    vendor: VENDOR_ID,
    name: "Crispello Chocolate Wafer (4 Pack)",
    description:
      "Cadbury Crispello — light, crispy wafer shells filled with a creamy praline centre, covered in chocolate. A delightfully delicate chocolate experience you can't stop at one.",
    originalPrice: 80,
    price: 69,
    category: "Chocolates",
    brand: "Cadbury",
    sku: "CH-CRISPELLO-023",
    organic: false,
    featured: false,
    stock: 400,
    unit: "4 × 10 g",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=400&h=400&fit=crop",
        alt: "Crispello Chocolate Wafer",
      },
      {
        image:
          "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=400&fit=crop",
        alt: "Crispy Chocolate Wafers",
      },
    ],
    discount: 14,
    expiryDate: future(180),
    sales: 640,
    tags: ["crispello", "cadbury", "wafer", "praline", "light chocolate"],
    status: "publised",
    weight: 0.04,
    dimensions: { length: 16, width: 8, height: 3 },
    rating: { average: 4.5, count: 420 },
  },
  {
    vendor: VENDOR_ID,
    name: "Snickers Chocolate Bar (3 Pack)",
    description:
      "Snickers — packed with peanuts, caramel, nougat, and milk chocolate. The ultimate satisfying snack that genuinely fills you up. Why eat bland when you can have Snickers?",
    originalPrice: 150,
    price: 129,
    category: "Chocolates",
    brand: "Mars",
    sku: "CH-SNICKERS-024",
    organic: false,
    featured: false,
    stock: 400,
    unit: "3 × 50 g bars",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Snickers_logo.svg/200px-Snickers_logo.svg.png",
        alt: "Snickers Bar",
      },
      {
        image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=400&fit=crop",
        alt: "Snickers Chocolate Bars",
      },
    ],
    discount: 14,
    expiryDate: future(180),
    sales: 710,
    tags: ["snickers", "mars", "peanut", "caramel", "chocolate"],
    status: "publised",
    weight: 0.15,
    dimensions: { length: 20, width: 10, height: 4 },
    rating: { average: 4.7, count: 475 },
  },
  {
    vendor: VENDOR_ID,
    name: "Ferrero Rocher (Box of 16)",
    description:
      "Premium Italian chocolates with a whole hazelnut centre, creamy filling, crispy wafer, and smooth chocolate coating rolled in chopped hazelnuts. The gift everyone loves.",
    originalPrice: 650,
    price: 565,
    category: "Chocolates",
    brand: "Ferrero Rocher",
    sku: "CH-FERRERO-025",
    organic: false,
    featured: true,
    stock: 180,
    unit: "16 pieces (200 g)",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Ferrero_Rocher_Logo.svg/200px-Ferrero_Rocher_Logo.svg.png",
        alt: "Ferrero Rocher Box",
      },
      {
        image:
          "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop",
        alt: "Ferrero Rocher Chocolates",
      },
    ],
    discount: 13,
    expiryDate: future(365),
    sales: 380,
    tags: ["ferrero", "rocher", "hazelnut", "premium", "gift"],
    status: "publised",
    weight: 0.2,
    dimensions: { length: 18, width: 18, height: 10 },
    rating: { average: 4.9, count: 290 },
  },
  {
    vendor: VENDOR_ID,
    name: "Munch Chocolate Wafer Stick",
    description:
      "Nestle Munch — a crunchy layered wafer stick drenched in smooth Nestle chocolate. Light, crispy, and totally snackable. Hard to eat just one!",
    originalPrice: 10,
    price: 10,
    category: "Chocolates",
    brand: "Nestle",
    sku: "CH-MUNCH-026",
    organic: false,
    featured: false,
    stock: 1000,
    unit: "13 g stick",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1511381939415-e44bde94d3e3?w=400&h=400&fit=crop",
        alt: "Munch Chocolate Wafer",
      },
      {
        image:
          "https://images.unsplash.com/photo-1549068106-b024baf3e34c?w=400&h=400&fit=crop",
        alt: "Nestle Munch Stick",
      },
    ],
    discount: 0,
    sales: 2200,
    tags: ["munch", "nestle", "wafer", "chocolate", "crispy"],
    status: "publised",
    weight: 0.013,
    dimensions: { length: 12, width: 3, height: 2 },
    rating: { average: 4.5, count: 1380 },
  },
  {
    vendor: VENDOR_ID,
    name: "Eclairs Toffee Candy (Pack of 20)",
    description:
      "Cadbury Eclairs — the classic coffee-caramel toffee with a Dairy Milk chocolate centre that melts in your mouth. A pocket-sized indulgence loved by generations.",
    originalPrice: 60,
    price: 52,
    category: "Chocolates",
    brand: "Cadbury",
    sku: "CH-ECLAIRS-027",
    organic: false,
    featured: false,
    stock: 800,
    unit: "Pack of 20 pieces",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
        alt: "Eclairs Toffee Candy",
      },
      {
        image:
          "https://images.unsplash.com/photo-1527904324834-3bda86c41a61?w=400&h=400&fit=crop",
        alt: "Cadbury Eclairs Pack",
      },
    ],
    discount: 13,
    expiryDate: future(365),
    sales: 1100,
    tags: ["eclairs", "toffee", "candy", "cadbury", "caramel"],
    status: "publised",
    weight: 0.1,
    dimensions: { length: 16, width: 10, height: 5 },
    rating: { average: 4.4, count: 720 },
  },
  {
    vendor: VENDOR_ID,
    name: "Toblerone Swiss Chocolate (Milk)",
    description:
      "The iconic triangular Swiss milk chocolate bar with honey, almond nougat, and Alpine milk. Toblerone's distinctive peaks make every bite a unique, luxurious experience.",
    originalPrice: 280,
    price: 245,
    category: "Chocolates",
    brand: "Toblerone",
    sku: "CH-TOBLERONE-028",
    organic: false,
    featured: false,
    stock: 200,
    unit: "100 g bar",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Toblerone_logo.svg/200px-Toblerone_logo.svg.png",
        alt: "Toblerone Chocolate",
      },
      {
        image:
          "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop",
        alt: "Toblerone Swiss Milk Chocolate",
      },
    ],
    discount: 13,
    expiryDate: future(365),
    sales: 315,
    tags: ["toblerone", "swiss", "almond", "nougat", "premium chocolate"],
    status: "publised",
    weight: 0.1,
    dimensions: { length: 22, width: 5, height: 5 },
    rating: { average: 4.7, count: 215 },
  },
  {
    vendor: VENDOR_ID,
    name: "Bounty Coconut Chocolate Bar",
    description:
      "Soft, moist coconut filling covered in smooth milk chocolate. Bounty is a tropical escape in every bar — a classic combination of coconut and chocolate that never gets old.",
    originalPrice: 65,
    price: 55,
    category: "Chocolates",
    brand: "Mars",
    sku: "CH-BOUNTY-029",
    organic: false,
    featured: false,
    stock: 350,
    unit: "57 g twin bar",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=400&h=400&fit=crop",
        alt: "Bounty Coconut Chocolate",
      },
      {
        image:
          "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=400&fit=crop",
        alt: "Bounty Chocolate Bar",
      },
    ],
    discount: 15,
    expiryDate: future(365),
    sales: 480,
    tags: ["bounty", "coconut", "milk chocolate", "mars", "tropical"],
    status: "publised",
    weight: 0.057,
    dimensions: { length: 16, width: 6, height: 3 },
    rating: { average: 4.5, count: 315 },
  },
  {
    vendor: VENDOR_ID,
    name: "Milky Bar White Chocolate",
    description:
      "Nestle Milky Bar — creamy white chocolate made with real milk for the purest chocolate taste. Smooth, milky, and melt-in-the-mouth. A favourite with kids and white chocolate lovers.",
    originalPrice: 40,
    price: 35,
    category: "Chocolates",
    brand: "Nestle",
    sku: "CH-MILKYBAR-030",
    organic: false,
    featured: false,
    stock: 500,
    unit: "30 g bar",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1534885320675-b08aa131cc5e?w=400&h=400&fit=crop",
        alt: "Milky Bar White Chocolate",
      },
      {
        image:
          "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop",
        alt: "White Chocolate Bar",
      },
    ],
    discount: 13,
    expiryDate: future(365),
    sales: 680,
    tags: ["milky bar", "white chocolate", "nestle", "kids", "creamy"],
    status: "publised",
    weight: 0.03,
    dimensions: { length: 11, width: 5, height: 1.5 },
    rating: { average: 4.5, count: 445 },
  },
  {
    vendor: VENDOR_ID,
    name: "Perk Chocolate Wafer Bar (Pack of 5)",
    description:
      "Cadbury Perk — crispy rice puffed wafer layers coated in smooth Dairy Milk chocolate. Light yet satisfying, Perk is the perfect any-time chocolate snack.",
    originalPrice: 75,
    price: 65,
    category: "Chocolates",
    brand: "Cadbury",
    sku: "CH-PERK-031",
    organic: false,
    featured: false,
    stock: 550,
    unit: "5 × 13 g bars",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=400&h=400&fit=crop",
        alt: "Cadbury Perk Bar",
      },
      {
        image:
          "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=400&fit=crop",
        alt: "Perk Chocolate Wafer Pack",
      },
    ],
    discount: 13,
    expiryDate: future(180),
    sales: 790,
    tags: ["perk", "cadbury", "wafer", "light chocolate", "snack"],
    status: "publised",
    weight: 0.065,
    dimensions: { length: 18, width: 10, height: 4 },
    rating: { average: 4.5, count: 510 },
  },
  {
    vendor: VENDOR_ID,
    name: "After Eight Mint Chocolate Thins",
    description:
      "Nestle After Eight — delicate dark chocolate thins with a refreshing peppermint fondant filling. An elegant after-dinner treat for sophisticated palates.",
    originalPrice: 450,
    price: 389,
    category: "Chocolates",
    brand: "Nestle",
    sku: "CH-AFTEREIGHT-032",
    organic: false,
    featured: false,
    stock: 150,
    unit: "200 g box",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop",
        alt: "After Eight Mint Chocolates",
      },
      {
        image:
          "https://images.unsplash.com/photo-1548907040-4d42bfc3edf0?w=400&h=400&fit=crop",
        alt: "Mint Chocolate Thins",
      },
    ],
    discount: 14,
    expiryDate: future(365),
    sales: 215,
    tags: ["after eight", "mint", "dark chocolate", "nestle", "premium"],
    status: "publised",
    weight: 0.2,
    dimensions: { length: 20, width: 12, height: 4 },
    rating: { average: 4.7, count: 148 },
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║         SNACKS & CHIPS  (12)                        ║
  // ╚══════════════════════════════════════════════════════╝
  {
    vendor: VENDOR_ID,
    name: "Lay's Classic Salted Chips",
    description:
      "The world's favourite potato chip — thinly sliced, perfectly golden, and seasoned with just the right amount of sea salt. Irresistibly crunchy every single time.",
    originalPrice: 20,
    price: 20,
    category: "Snacks & Chips",
    brand: "Lay's",
    sku: "SC-LAYS-033",
    organic: false,
    featured: false,
    stock: 800,
    unit: "26 g pack",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Lays_logo.svg/200px-Lays_logo.svg.png",
        alt: "Lay's Classic Chips",
      },
      {
        image:
          "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop",
        alt: "Salted Potato Chips",
      },
    ],
    discount: 0,
    sales: 2400,
    tags: ["lays", "chips", "potato", "salted", "crispy"],
    status: "publised",
    weight: 0.026,
    dimensions: { length: 18, width: 12, height: 4 },
    rating: { average: 4.5, count: 1560 },
  },
  {
    vendor: VENDOR_ID,
    name: "Kurkure Masala Munch (Family Pack)",
    description:
      "Kurkure — India's favourite puffed corn snack with a bold, spicy masala flavour. The iconic crunch that's been a staple at Indian tea-time and parties for decades.",
    originalPrice: 50,
    price: 45,
    category: "Snacks & Chips",
    brand: "Kurkure",
    sku: "SC-KURKURE-034",
    organic: false,
    featured: false,
    stock: 700,
    unit: "90 g pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop",
        alt: "Kurkure Masala Chips",
      },
      {
        image:
          "https://images.unsplash.com/photo-1640869576481-eebf0f47f6c0?w=400&h=400&fit=crop",
        alt: "Kurkure Puffed Corn Snack",
      },
    ],
    discount: 10,
    expiryDate: future(90),
    sales: 1900,
    tags: ["kurkure", "masala", "spicy", "puffed corn", "snack"],
    status: "publised",
    weight: 0.09,
    dimensions: { length: 24, width: 16, height: 6 },
    rating: { average: 4.6, count: 1240 },
  },
  {
    vendor: VENDOR_ID,
    name: "Doritos Nacho Cheese Tortilla Chips",
    description:
      "Boldly flavoured nacho cheese Doritos — thick, crunchy triangular tortilla chips coated in an intense cheesy seasoning. The ultimate party snack and movie companion.",
    originalPrice: 120,
    price: 99,
    category: "Snacks & Chips",
    brand: "Doritos",
    sku: "SC-DORITOS-035",
    organic: false,
    featured: false,
    stock: 450,
    unit: "133 g bag",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Doritos_logo.svg/200px-Doritos_logo.svg.png",
        alt: "Doritos Nacho Cheese Chips",
      },
      {
        image:
          "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=400&fit=crop",
        alt: "Doritos Tortilla Chips",
      },
    ],
    discount: 18,
    expiryDate: future(90),
    sales: 820,
    tags: ["doritos", "nacho", "cheese", "tortilla", "crunchy"],
    status: "publised",
    weight: 0.133,
    dimensions: { length: 26, width: 16, height: 6 },
    rating: { average: 4.6, count: 545 },
  },
  {
    vendor: VENDOR_ID,
    name: "Pringles Original (Tube)",
    description:
      "Pringles — once you pop, you can't stop. Perfectly seasoned saddle-shaped potato crisps stacked neatly in their iconic tube. Consistent flavour and crunch in every chip.",
    originalPrice: 180,
    price: 155,
    category: "Snacks & Chips",
    brand: "Pringles",
    sku: "SC-PRINGLES-036",
    organic: false,
    featured: true,
    stock: 350,
    unit: "165 g tube",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Pringles_logo.svg/200px-Pringles_logo.svg.png",
        alt: "Pringles Tube",
      },
      {
        image:
          "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400&h=400&fit=crop",
        alt: "Pringles Original Crisps",
      },
    ],
    discount: 14,
    expiryDate: future(90),
    sales: 680,
    tags: ["pringles", "crisps", "potato", "tube", "snack"],
    status: "publised",
    weight: 0.165,
    dimensions: { length: 8, width: 8, height: 28 },
    rating: { average: 4.6, count: 445 },
  },
  {
    vendor: VENDOR_ID,
    name: "Haldiram's Aloo Bhujia (Large)",
    description:
      "The most iconic Indian namkeen — thin, crispy potato noodles seasoned with ajwain, black pepper, and spices. Haldiram's Aloo Bhujia is the gold standard of Indian snacking.",
    originalPrice: 120,
    price: 99,
    category: "Snacks & Chips",
    brand: "Haldiram's",
    sku: "SC-BHUJIA-037",
    organic: false,
    featured: false,
    stock: 500,
    unit: "400 g",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Haldirams_logo.svg/200px-Haldirams_logo.svg.png",
        alt: "Haldiram's Aloo Bhujia",
      },
      {
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop",
        alt: "Indian Bhujia Namkeen",
      },
    ],
    discount: 18,
    expiryDate: future(180),
    sales: 1150,
    tags: ["bhujia", "haldirams", "namkeen", "aloo", "indian snack"],
    status: "publised",
    weight: 0.4,
    dimensions: { length: 22, width: 14, height: 8 },
    rating: { average: 4.7, count: 760 },
  },
  {
    vendor: VENDOR_ID,
    name: "Monaco Salt Crackers",
    description:
      "Light, crispy Monaco salt crackers — the classic Indian light snack. Perfectly salted and baked to a satisfying crunch. Enjoy with chai, dips, or straight from the pack.",
    originalPrice: 30,
    price: 25,
    category: "Snacks & Chips",
    brand: "Parle",
    sku: "SC-MONACO-038",
    organic: false,
    featured: false,
    stock: 700,
    unit: "200 g",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1590779033100-9f17a0ca2bce?w=400&h=400&fit=crop",
        alt: "Monaco Salt Crackers",
      },
      {
        image:
          "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
        alt: "Parle Monaco Biscuits",
      },
    ],
    discount: 17,
    expiryDate: future(180),
    sales: 1300,
    tags: ["monaco", "crackers", "salted", "parle", "biscuit"],
    status: "publised",
    weight: 0.2,
    dimensions: { length: 20, width: 12, height: 5 },
    rating: { average: 4.4, count: 845 },
  },
  {
    vendor: VENDOR_ID,
    name: "Lay's American Style Cream & Onion",
    description:
      "Lay's Cream & Onion — a favourite flavour with tangy sour cream and savoury onion seasoning on perfectly crunchy potato crisps. Dangerously addictive.",
    originalPrice: 50,
    price: 45,
    category: "Snacks & Chips",
    brand: "Lay's",
    sku: "SC-LAYSCREAMONION-039",
    organic: false,
    featured: false,
    stock: 650,
    unit: "73 g pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1614398751058-eb2e0bf63e53?w=400&h=400&fit=crop",
        alt: "Lay's Cream Onion Chips",
      },
      {
        image:
          "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop",
        alt: "Cream and Onion Crisps",
      },
    ],
    discount: 10,
    expiryDate: future(90),
    sales: 1050,
    tags: ["lays", "cream onion", "flavoured chips", "snack", "crispy"],
    status: "publised",
    weight: 0.073,
    dimensions: { length: 24, width: 16, height: 5 },
    rating: { average: 4.5, count: 690 },
  },
  {
    vendor: VENDOR_ID,
    name: "Maggi 2-Minute Noodles (Pack of 12)",
    description:
      "The most loved instant noodles in India. Maggi noodles with the iconic masala tastemaker — ready in 2 minutes. A quick, comforting meal for breakfast, lunch, or a midnight snack.",
    originalPrice: 240,
    price: 205,
    category: "Snacks & Chips",
    brand: "Maggi",
    sku: "SC-MAGGI-040",
    organic: false,
    featured: true,
    stock: 600,
    unit: "12 × 70 g packs",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Maggi_logo.svg/200px-Maggi_logo.svg.png",
        alt: "Maggi Instant Noodles",
      },
      {
        image:
          "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=400&fit=crop",
        alt: "Maggi Noodles Pack",
      },
    ],
    discount: 15,
    expiryDate: future(365),
    sales: 2100,
    tags: ["maggi", "instant noodles", "2 minute", "nestle", "quick meal"],
    status: "publised",
    weight: 0.84,
    dimensions: { length: 28, width: 20, height: 12 },
    rating: { average: 4.8, count: 1420 },
  },
  {
    vendor: VENDOR_ID,
    name: "Haldiram's Mixture (Masala)",
    description:
      "A spicy, crunchy Haldiram's mixture loaded with sev, peanuts, curry leaves, and fried dal. The perfect companion with your evening chai. Authentic masala flavour.",
    originalPrice: 80,
    price: 69,
    category: "Snacks & Chips",
    brand: "Haldiram's",
    sku: "SC-MIXTURE-041",
    organic: false,
    featured: false,
    stock: 450,
    unit: "200 g",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop",
        alt: "Haldiram's Mixture",
      },
      {
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop",
        alt: "Indian Masala Mixture Snack",
      },
    ],
    discount: 14,
    expiryDate: future(180),
    sales: 870,
    tags: ["mixture", "masala", "haldirams", "namkeen", "spicy"],
    status: "publised",
    weight: 0.2,
    dimensions: { length: 20, width: 14, height: 6 },
    rating: { average: 4.6, count: 565 },
  },
  {
    vendor: VENDOR_ID,
    name: "Bingo Mad Angles Achaari Masti",
    description:
      "Bingo Mad Angles — angular shaped corn chips with a tangy, spicy achaar (pickle) flavour that hits all the right notes. A uniquely Indian-inspired chip that's totally addictive.",
    originalPrice: 30,
    price: 28,
    category: "Snacks & Chips",
    brand: "Bingo",
    sku: "SC-BINGO-042",
    organic: false,
    featured: false,
    stock: 600,
    unit: "37 g pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=400&h=400&fit=crop",
        alt: "Bingo Mad Angles",
      },
      {
        image:
          "https://images.unsplash.com/photo-1614398751058-eb2e0bf63e53?w=400&h=400&fit=crop",
        alt: "Achaari Masti Chips",
      },
    ],
    discount: 7,
    expiryDate: future(90),
    sales: 950,
    tags: ["bingo", "mad angles", "achaar", "spicy", "corn chips"],
    status: "publised",
    weight: 0.037,
    dimensions: { length: 18, width: 12, height: 4 },
    rating: { average: 4.4, count: 615 },
  },
  {
    vendor: VENDOR_ID,
    name: "Popcorn Butter Flavour (Microwave Ready)",
    description:
      "Golden, fluffy microwave popcorn with a rich, indulgent butter flavour. Ready in under 3 minutes. The quintessential movie-night snack for the whole family.",
    originalPrice: 99,
    price: 85,
    category: "Snacks & Chips",
    brand: "ACT II",
    sku: "SC-POPCORN-043",
    organic: false,
    featured: false,
    stock: 500,
    unit: "3 microwave bags",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=400&fit=crop",
        alt: "Butter Popcorn",
      },
      {
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        alt: "ACT II Microwave Popcorn",
      },
    ],
    discount: 14,
    expiryDate: future(180),
    sales: 780,
    tags: ["popcorn", "butter", "microwave", "movie snack", "act ii"],
    status: "publised",
    weight: 0.255,
    dimensions: { length: 22, width: 14, height: 6 },
    rating: { average: 4.5, count: 500 },
  },
  {
    vendor: VENDOR_ID,
    name: "Uncle Chipps Spicy Treat",
    description:
      "Uncle Chipps — the original wavy potato chip with a bold spicy masala seasoning. Thicker cut and crunchier than most, with a flavour that's distinctly Indian.",
    originalPrice: 20,
    price: 20,
    category: "Snacks & Chips",
    brand: "Uncle Chipps",
    sku: "SC-UNCLECHIPPS-044",
    organic: false,
    featured: false,
    stock: 700,
    unit: "26 g pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
        alt: "Uncle Chipps Spicy Treat",
      },
      {
        image:
          "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop",
        alt: "Wavy Potato Chips",
      },
    ],
    discount: 0,
    sales: 1380,
    tags: ["uncle chipps", "wavy chips", "spicy", "masala", "potato"],
    status: "publised",
    weight: 0.026,
    dimensions: { length: 18, width: 12, height: 4 },
    rating: { average: 4.4, count: 890 },
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║       BISCUITS & COOKIES  (10)                      ║
  // ╚══════════════════════════════════════════════════════╝
  {
    vendor: VENDOR_ID,
    name: "Parle-G Original Glucose Biscuits",
    description:
      "The world's largest selling biscuit. Parle-G — sweet, crispy glucose biscuits that have been a staple in Indian homes for over 80 years. Perfect with chai, any time of day.",
    originalPrice: 10,
    price: 10,
    category: "Biscuits & Cookies",
    brand: "Parle",
    sku: "BC-PARLEG-045",
    organic: false,
    featured: true,
    stock: 2000,
    unit: "100 g pack",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Parle-G_biscuits_001.jpg/200px-Parle-G_biscuits_001.jpg",
        alt: "Parle-G Glucose Biscuits",
      },
      {
        image:
          "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
        alt: "Parle-G Biscuit Pack",
      },
    ],
    discount: 0,
    sales: 5000,
    tags: ["parle g", "glucose", "biscuit", "chai", "classic"],
    status: "publised",
    weight: 0.1,
    dimensions: { length: 16, width: 10, height: 3 },
    rating: { average: 4.7, count: 3200 },
  },
  {
    vendor: VENDOR_ID,
    name: "Oreo Original Sandwich Cookies",
    description:
      "The world-famous Oreo — two crispy dark cocoa wafers with a sweet cream filling. Twist, lick, and dunk into milk for the ultimate cookie experience.",
    originalPrice: 50,
    price: 43,
    category: "Biscuits & Cookies",
    brand: "Oreo",
    sku: "BC-OREO-046",
    organic: false,
    featured: true,
    stock: 700,
    unit: "120 g pack",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Oreo-Two-Cookies.jpg/200px-Oreo-Two-Cookies.jpg",
        alt: "Oreo Sandwich Cookies",
      },
      {
        image:
          "https://images.unsplash.com/photo-1620923543500-8f4b7d6e28d2?w=400&h=400&fit=crop",
        alt: "Oreo Cookies Pack",
      },
    ],
    discount: 14,
    expiryDate: future(180),
    sales: 2200,
    tags: ["oreo", "cookies", "sandwich", "cream", "dunk"],
    status: "publised",
    weight: 0.12,
    dimensions: { length: 20, width: 12, height: 5 },
    rating: { average: 4.7, count: 1450 },
  },
  {
    vendor: VENDOR_ID,
    name: "Hide & Seek Chocolate Chip Cookies",
    description:
      "Parle Hide & Seek — buttery, crunchy cookies generously loaded with chocolate chips. The bits of dark chocolate in every bite make these India's favourite chocolate cookie.",
    originalPrice: 60,
    price: 52,
    category: "Biscuits & Cookies",
    brand: "Parle",
    sku: "BC-HIDESEEK-047",
    organic: false,
    featured: false,
    stock: 600,
    unit: "120 g pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop",
        alt: "Hide & Seek Chocolate Chip Cookies",
      },
      {
        image:
          "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
        alt: "Chocolate Chip Cookies Pack",
      },
    ],
    discount: 13,
    expiryDate: future(180),
    sales: 1100,
    tags: ["hide and seek", "chocolate chip", "cookies", "parle", "buttery"],
    status: "publised",
    weight: 0.12,
    dimensions: { length: 20, width: 12, height: 5 },
    rating: { average: 4.6, count: 720 },
  },
  {
    vendor: VENDOR_ID,
    name: "Britannia Bourbon Biscuits",
    description:
      "Rich, chocolatey Bourbon biscuits with a creamy dark chocolate filling sandwiched between two crispy cocoa biscuits. The perfect dunkable biscuit for tea time.",
    originalPrice: 30,
    price: 26,
    category: "Biscuits & Cookies",
    brand: "Britannia",
    sku: "BC-BOURBON-048",
    organic: false,
    featured: false,
    stock: 800,
    unit: "150 g pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=400&fit=crop",
        alt: "Britannia Bourbon Biscuits",
      },
      {
        image:
          "https://images.unsplash.com/photo-1548907040-4d42bfc3edf0?w=400&h=400&fit=crop",
        alt: "Chocolate Cream Biscuits",
      },
    ],
    discount: 13,
    expiryDate: future(180),
    sales: 1500,
    tags: ["bourbon", "britannia", "chocolate", "cream biscuit", "tea time"],
    status: "publised",
    weight: 0.15,
    dimensions: { length: 20, width: 10, height: 5 },
    rating: { average: 4.5, count: 980 },
  },
  {
    vendor: VENDOR_ID,
    name: "Good Day Cashew Cookies",
    description:
      "Britannia Good Day butter cookies with real cashew pieces baked in. Rich, buttery flavour with a satisfying crunch. A premium tea-time treat that's truly a good day.",
    originalPrice: 50,
    price: 42,
    category: "Biscuits & Cookies",
    brand: "Britannia",
    sku: "BC-GOODDAY-049",
    organic: false,
    featured: false,
    stock: 650,
    unit: "150 g pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop",
        alt: "Good Day Cashew Cookies",
      },
      {
        image:
          "https://images.unsplash.com/photo-1590080875852-4d73d0a5db09?w=400&h=400&fit=crop",
        alt: "Butter Cashew Biscuits",
      },
    ],
    discount: 16,
    expiryDate: future(180),
    sales: 1200,
    tags: ["good day", "cashew", "butter", "britannia", "premium biscuit"],
    status: "publised",
    weight: 0.15,
    dimensions: { length: 20, width: 12, height: 5 },
    rating: { average: 4.6, count: 780 },
  },
  {
    vendor: VENDOR_ID,
    name: "Digestive Biscuits (Whole Wheat)",
    description:
      "McVitie's Digestive biscuits made with whole wheat and real bran. A slightly sweet, hearty biscuit that's high in fibre. Delicious plain or with butter and cheese.",
    originalPrice: 180,
    price: 155,
    category: "Biscuits & Cookies",
    brand: "McVitie's",
    sku: "BC-DIGESTIVE-050",
    organic: false,
    featured: false,
    stock: 350,
    unit: "400 g pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?w=400&h=400&fit=crop",
        alt: "McVitie's Digestive Biscuits",
      },
      {
        image:
          "https://images.unsplash.com/photo-1553294166-b7da96869f5f?w=400&h=400&fit=crop",
        alt: "Whole Wheat Digestive Biscuits",
      },
    ],
    discount: 14,
    expiryDate: future(365),
    sales: 560,
    tags: ["digestive", "mcvities", "whole wheat", "fibre", "healthy biscuit"],
    status: "publised",
    weight: 0.4,
    dimensions: { length: 22, width: 14, height: 6 },
    rating: { average: 4.5, count: 375 },
  },
  {
    vendor: VENDOR_ID,
    name: "Marie Gold Tea Biscuits (2 Pack)",
    description:
      "Britannia Marie Gold — the classic, lightly sweetened tea biscuit with a delicate crunch. Light enough for dipping in chai but substantial enough to be truly satisfying.",
    originalPrice: 50,
    price: 44,
    category: "Biscuits & Cookies",
    brand: "Britannia",
    sku: "BC-MARIE-051",
    organic: false,
    featured: false,
    stock: 900,
    unit: "2 × 150 g packs",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
        alt: "Marie Gold Tea Biscuits",
      },
      {
        image:
          "https://images.unsplash.com/photo-1590080875852-4d73d0a5db09?w=400&h=400&fit=crop",
        alt: "Britannia Marie Biscuits",
      },
    ],
    discount: 12,
    expiryDate: future(180),
    sales: 1700,
    tags: ["marie", "tea biscuit", "britannia", "dipping", "light"],
    status: "publised",
    weight: 0.3,
    dimensions: { length: 24, width: 14, height: 6 },
    rating: { average: 4.4, count: 1100 },
  },
  {
    vendor: VENDOR_ID,
    name: "Jim Jam Cream Biscuits",
    description:
      "Britannia Jim Jam — strawberry and vanilla cream sandwiched between two jam-filled biscuits. Vibrantly coloured and fruity in flavour, these are a childhood favourite.",
    originalPrice: 30,
    price: 26,
    category: "Biscuits & Cookies",
    brand: "Britannia",
    sku: "BC-JIMJAM-052",
    organic: false,
    featured: false,
    stock: 700,
    unit: "150 g pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1620923543500-8f4b7d6e28d2?w=400&h=400&fit=crop",
        alt: "Jim Jam Cream Biscuits",
      },
      {
        image:
          "https://images.unsplash.com/photo-1553294166-b7da96869f5f?w=400&h=400&fit=crop",
        alt: "Jam Filled Biscuits",
      },
    ],
    discount: 13,
    expiryDate: future(180),
    sales: 1050,
    tags: ["jim jam", "cream biscuit", "jam", "britannia", "kids"],
    status: "publised",
    weight: 0.15,
    dimensions: { length: 20, width: 12, height: 5 },
    rating: { average: 4.4, count: 685 },
  },
  {
    vendor: VENDOR_ID,
    name: "Lotus Biscoff Caramelised Biscuits",
    description:
      "The iconic Belgian caramelised biscuit with a distinct cinnamon spice and caramel flavour. Perfectly crunchy and uniquely delicious. Great with coffee or as a dessert base.",
    originalPrice: 280,
    price: 245,
    category: "Biscuits & Cookies",
    brand: "Lotus",
    sku: "BC-BISCOFF-053",
    organic: false,
    featured: true,
    stock: 250,
    unit: "250 g pack",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Lotus-biscoff-logo.png/200px-Lotus-biscoff-logo.png",
        alt: "Lotus Biscoff Biscuits",
      },
      {
        image:
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
        alt: "Caramelised Belgian Biscuits",
      },
    ],
    discount: 13,
    expiryDate: future(365),
    sales: 420,
    tags: ["biscoff", "lotus", "caramel", "cinnamon", "belgian"],
    status: "publised",
    weight: 0.25,
    dimensions: { length: 18, width: 12, height: 5 },
    rating: { average: 4.8, count: 285 },
  },
  {
    vendor: VENDOR_ID,
    name: "50-50 Sweet & Salty Biscuits",
    description:
      "Britannia 50-50 — the best of both worlds with a playful sweet-and-salty flavour in every crispy biscuit. Addictively snackable with a one-of-a-kind flavour contrast.",
    originalPrice: 30,
    price: 26,
    category: "Biscuits & Cookies",
    brand: "Britannia",
    sku: "BC-5050-054",
    organic: false,
    featured: false,
    stock: 750,
    unit: "150 g pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1590080875852-4d73d0a5db09?w=400&h=400&fit=crop",
        alt: "50-50 Sweet & Salty Biscuits",
      },
      {
        image:
          "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
        alt: "Britannia 50-50 Biscuits",
      },
    ],
    discount: 13,
    expiryDate: future(180),
    sales: 1250,
    tags: ["50-50", "sweet salty", "britannia", "crispy", "snack biscuit"],
    status: "publised",
    weight: 0.15,
    dimensions: { length: 20, width: 12, height: 5 },
    rating: { average: 4.4, count: 820 },
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║           DAIRY PRODUCTS  (8)                       ║
  // ╚══════════════════════════════════════════════════════╝
  {
    vendor: VENDOR_ID,
    name: "Amul Full Cream Milk Tetra Pack",
    description:
      "Amul Full Cream Milk — the taste of India. Packed with calcium, protein, and vitamins. UHT processed for a long shelf life without refrigeration before opening.",
    originalPrice: 68,
    price: 60,
    category: "Dairy Products",
    brand: "Amul",
    sku: "DP-AMULMILK-055",
    organic: false,
    featured: true,
    stock: 600,
    unit: "1 L tetra pack",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Amul_logo.svg/200px-Amul_logo.svg.png",
        alt: "Amul Full Cream Milk",
      },
      {
        image:
          "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
        alt: "Amul Milk Tetra Pack",
      },
    ],
    discount: 12,
    expiryDate: future(90),
    sales: 2400,
    tags: ["amul", "milk", "full cream", "dairy", "calcium"],
    status: "publised",
    weight: 1.03,
    dimensions: { length: 8, width: 6, height: 20 },
    rating: { average: 4.6, count: 1550 },
  },
  {
    vendor: VENDOR_ID,
    name: "Mother Dairy Curd (Fresh Dahi)",
    description:
      "Fresh, thick, and creamy set curd from Mother Dairy. Made with probiotic cultures for good gut health. Perfect for raita, lassi, marinades, or eating plain with rice.",
    originalPrice: 55,
    price: 48,
    category: "Dairy Products",
    brand: "Mother Dairy",
    sku: "DP-CURD-056",
    organic: false,
    featured: false,
    stock: 400,
    unit: "400 g tub",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
        alt: "Mother Dairy Curd",
      },
      {
        image:
          "https://images.unsplash.com/photo-1571909997090-1cf3f1e3fb0b?w=400&h=400&fit=crop",
        alt: "Fresh Dahi Set Curd",
      },
    ],
    discount: 13,
    expiryDate: future(7),
    sales: 1100,
    tags: ["curd", "dahi", "mother dairy", "probiotic", "fresh"],
    status: "publised",
    weight: 0.42,
    dimensions: { length: 12, width: 12, height: 8 },
    rating: { average: 4.5, count: 720 },
  },
  {
    vendor: VENDOR_ID,
    name: "Amul Butter (Salted)",
    description:
      "India's most trusted butter. Amul Salted Butter — rich, creamy, and made from fresh cream. The classic choice for toast, roti, dal, or enriching your everyday cooking.",
    originalPrice: 55,
    price: 50,
    category: "Dairy Products",
    brand: "Amul",
    sku: "DP-AMULBUTTER-057",
    organic: false,
    featured: false,
    stock: 500,
    unit: "100 g pack",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Amul_logo.svg/200px-Amul_logo.svg.png",
        alt: "Amul Salted Butter",
      },
      {
        image:
          "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop",
        alt: "Butter Pack",
      },
    ],
    discount: 9,
    expiryDate: future(60),
    sales: 1600,
    tags: ["amul", "butter", "salted", "dairy", "cooking"],
    status: "publised",
    weight: 0.1,
    dimensions: { length: 10, width: 7, height: 4 },
    rating: { average: 4.6, count: 1050 },
  },
  {
    vendor: VENDOR_ID,
    name: "Amul Processed Cheese Slices",
    description:
      "Individually wrapped Amul processed cheese slices that melt perfectly. Ideal for burgers, sandwiches, grilled cheese, and rolls. Consistent flavour and quality every time.",
    originalPrice: 110,
    price: 95,
    category: "Dairy Products",
    brand: "Amul",
    sku: "DP-CHEESESLICES-058",
    organic: false,
    featured: false,
    stock: 350,
    unit: "10 slices (200 g)",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop",
        alt: "Amul Cheese Slices",
      },
      {
        image:
          "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&h=400&fit=crop",
        alt: "Processed Cheese Slices",
      },
    ],
    discount: 14,
    expiryDate: future(60),
    sales: 720,
    tags: ["cheese", "amul", "slices", "burger", "processed"],
    status: "publised",
    weight: 0.2,
    dimensions: { length: 16, width: 12, height: 4 },
    rating: { average: 4.4, count: 470 },
  },
  {
    vendor: VENDOR_ID,
    name: "Nestlé Milo Chocolate Malt Drink",
    description:
      "Nestlé Milo — the beloved chocolate malt energy drink. Packed with vitamins and minerals to support active kids and adults. Mix with hot or cold milk for an energising drink.",
    originalPrice: 280,
    price: 245,
    category: "Dairy Products",
    brand: "Nestlé",
    sku: "DP-MILO-059",
    organic: false,
    featured: false,
    stock: 300,
    unit: "400 g tin",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Milo_logo.svg/200px-Milo_logo.svg.png",
        alt: "Nestlé Milo Tin",
      },
      {
        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop",
        alt: "Milo Chocolate Malt Drink",
      },
    ],
    discount: 13,
    expiryDate: future(365),
    sales: 580,
    tags: ["milo", "nestle", "chocolate malt", "energy", "kids"],
    status: "publised",
    weight: 0.4,
    dimensions: { length: 10, width: 10, height: 16 },
    rating: { average: 4.6, count: 385 },
  },
  {
    vendor: VENDOR_ID,
    name: "Amul Kool Koko Chocolate Milk",
    description:
      "Amul Kool Koko — a rich, chilled chocolate-flavoured flavoured milk drink that tastes like dessert in a bottle. Real milk, real cocoa, and that unmistakably creamy Amul taste.",
    originalPrice: 30,
    price: 28,
    category: "Dairy Products",
    brand: "Amul",
    sku: "DP-AMULKOOL-060",
    organic: false,
    featured: false,
    stock: 450,
    unit: "200 ml bottle",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Amul_logo.svg/200px-Amul_logo.svg.png",
        alt: "Amul Kool Koko",
      },
      {
        image:
          "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
        alt: "Chocolate Milk Bottle",
      },
    ],
    discount: 7,
    expiryDate: future(14),
    sales: 850,
    tags: ["amul kool", "chocolate milk", "koko", "kids", "flavoured milk"],
    status: "publised",
    weight: 0.22,
    dimensions: { length: 6, width: 6, height: 16 },
    rating: { average: 4.5, count: 545 },
  },
  {
    vendor: VENDOR_ID,
    name: "Britannia Cheese Spread (Creamy)",
    description:
      "Smooth, creamy Britannia cheese spread that glides perfectly on bread or crackers. Great as a sandwich filling, a dip for nachos, or stirred into pasta for a quick creamy sauce.",
    originalPrice: 130,
    price: 112,
    category: "Dairy Products",
    brand: "Britannia",
    sku: "DP-CHEESESSPREAD-061",
    organic: false,
    featured: false,
    stock: 280,
    unit: "200 g jar",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&h=400&fit=crop",
        alt: "Britannia Cheese Spread",
      },
      {
        image:
          "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop",
        alt: "Creamy Cheese Spread Jar",
      },
    ],
    discount: 14,
    expiryDate: future(60),
    sales: 440,
    tags: ["cheese spread", "britannia", "creamy", "sandwich", "spread"],
    status: "publised",
    weight: 0.22,
    dimensions: { length: 10, width: 10, height: 8 },
    rating: { average: 4.4, count: 290 },
  },
  {
    vendor: VENDOR_ID,
    name: "Horlicks Classic Malt (Jar)",
    description:
      "Horlicks — the great family nourisher. Classic malt-based nutritional drink with 23 vital nutrients. Supports bone strength, immunity, and active growth in children and adults.",
    originalPrice: 399,
    price: 349,
    category: "Dairy Products",
    brand: "Horlicks",
    sku: "DP-HORLICKS-062",
    organic: false,
    featured: false,
    stock: 280,
    unit: "500 g jar",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Horlicks_logo.svg/200px-Horlicks_logo.svg.png",
        alt: "Horlicks Classic Malt",
      },
      {
        image:
          "https://images.unsplash.com/photo-1523473827533-2a64d0d36748?w=400&h=400&fit=crop",
        alt: "Horlicks Malt Drink Jar",
      },
    ],
    discount: 13,
    expiryDate: future(365),
    sales: 560,
    tags: ["horlicks", "malt", "nutrition", "calcium", "kids health"],
    status: "publised",
    weight: 0.5,
    dimensions: { length: 12, width: 12, height: 18 },
    rating: { average: 4.5, count: 365 },
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║       PERSONAL CARE  (14)                           ║
  // ╚══════════════════════════════════════════════════════╝
  {
    vendor: VENDOR_ID,
    name: "Dove Moisturising Body Wash",
    description:
      "Dove Moisturising Body Wash with a ¼ moisturising cream. Cleanses while nourishing skin, leaving it visibly softer and smoother after just one wash. Delicate floral scent.",
    originalPrice: 280,
    price: 240,
    category: "Personal Care",
    brand: "Dove",
    sku: "PC-DOVEBODYWASH-063",
    organic: false,
    featured: false,
    stock: 300,
    unit: "500 ml bottle",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Dove_logo.svg/200px-Dove_logo.svg.png",
        alt: "Dove Moisturising Body Wash",
      },
      {
        image:
          "https://images.unsplash.com/photo-1583248369069-9d91f1640fe6?w=400&h=400&fit=crop",
        alt: "Body Wash Bottle",
      },
    ],
    discount: 14,
    expiryDate: future(730),
    sales: 480,
    tags: ["dove", "body wash", "moisturising", "shower gel", "skin care"],
    status: "publised",
    weight: 0.53,
    dimensions: { length: 8, width: 6, height: 22 },
    rating: { average: 4.6, count: 315 },
  },
  {
    vendor: VENDOR_ID,
    name: "Head & Shoulders Anti-Dandruff Shampoo",
    description:
      "Clinically proven anti-dandruff shampoo with zinc pyrithione. Eliminates visible flakes from the first wash while cleansing and conditioning hair for a healthy, dandruff-free scalp.",
    originalPrice: 350,
    price: 299,
    category: "Personal Care",
    brand: "Head & Shoulders",
    sku: "PC-HNS-064",
    organic: false,
    featured: false,
    stock: 350,
    unit: "340 ml bottle",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Head_%26_Shoulders_logo.svg/200px-Head_%26_Shoulders_logo.svg.png",
        alt: "Head & Shoulders Shampoo",
      },
      {
        image:
          "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop",
        alt: "Anti-Dandruff Shampoo Bottle",
      },
    ],
    discount: 15,
    expiryDate: future(730),
    sales: 620,
    tags: [
      "head and shoulders",
      "shampoo",
      "anti dandruff",
      "scalp care",
      "hair",
    ],
    status: "publised",
    weight: 0.36,
    dimensions: { length: 8, width: 6, height: 22 },
    rating: { average: 4.5, count: 415 },
  },
  {
    vendor: VENDOR_ID,
    name: "Pantene Pro-V Silky Smooth Conditioner",
    description:
      "Pantene Pro-V conditioner that provides 24-hour smoothness and frizz control. Pro-Vitamin formula penetrates to strengthen hair from root to tip for silky, touchable locks.",
    originalPrice: 320,
    price: 275,
    category: "Personal Care",
    brand: "Pantene",
    sku: "PC-PANTENE-065",
    organic: false,
    featured: false,
    stock: 280,
    unit: "340 ml bottle",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Pantene_logo.svg/200px-Pantene_logo.svg.png",
        alt: "Pantene Conditioner",
      },
      {
        image:
          "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=400&fit=crop",
        alt: "Hair Conditioner Bottle",
      },
    ],
    discount: 14,
    expiryDate: future(730),
    sales: 395,
    tags: ["pantene", "conditioner", "silky", "frizz control", "hair care"],
    status: "publised",
    weight: 0.36,
    dimensions: { length: 8, width: 6, height: 22 },
    rating: { average: 4.5, count: 260 },
  },
  {
    vendor: VENDOR_ID,
    name: "Colgate Total Advanced Toothpaste",
    description:
      "Colgate Total Advanced whitening toothpaste with active fluoride. Provides 12-hour antibacterial protection, fights cavities, and gently whitens teeth for a confident smile.",
    originalPrice: 150,
    price: 128,
    category: "Personal Care",
    brand: "Colgate",
    sku: "PC-COLGATE-066",
    organic: false,
    featured: false,
    stock: 500,
    unit: "200 g tube",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Colgate_logo.svg/200px-Colgate_logo.svg.png",
        alt: "Colgate Total Toothpaste",
      },
      {
        image:
          "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
        alt: "Toothpaste Tube",
      },
    ],
    discount: 15,
    expiryDate: future(730),
    sales: 950,
    tags: ["colgate", "toothpaste", "whitening", "fluoride", "oral care"],
    status: "publised",
    weight: 0.22,
    dimensions: { length: 17, width: 5, height: 5 },
    rating: { average: 4.5, count: 625 },
  },
  {
    vendor: VENDOR_ID,
    name: "Oral-B Soft Toothbrush (Pack of 3)",
    description:
      "Oral-B soft indicator toothbrushes with criss-cross bristles that clean deep between teeth. Indicator bristles fade when it's time to replace. Dentist recommended brand worldwide.",
    originalPrice: 180,
    price: 155,
    category: "Personal Care",
    brand: "Oral-B",
    sku: "PC-ORALB-067",
    organic: false,
    featured: false,
    stock: 400,
    unit: "3 brushes",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Oral-B_logo.svg/200px-Oral-B_logo.svg.png",
        alt: "Oral-B Soft Toothbrush",
      },
      {
        image:
          "https://images.unsplash.com/photo-1559304787-abf4e3e12748?w=400&h=400&fit=crop",
        alt: "Toothbrush Pack",
      },
    ],
    discount: 14,
    expiryDate: future(1095),
    sales: 690,
    tags: ["toothbrush", "oral-b", "soft", "dental care", "pack of 3"],
    status: "publised",
    weight: 0.09,
    dimensions: { length: 22, width: 8, height: 4 },
    rating: { average: 4.6, count: 455 },
  },
  {
    vendor: VENDOR_ID,
    name: "Garnier Hair Colour (Natural Black)",
    description:
      "Garnier Color Naturals permanent hair colour with fruit oils for a rich, natural-looking colour that lasts. 100% grey coverage in a single application. Natural Black shade.",
    originalPrice: 220,
    price: 189,
    category: "Personal Care",
    brand: "Garnier",
    sku: "PC-HAIRCOLOUR-068",
    organic: false,
    featured: false,
    stock: 250,
    unit: "1 application kit",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Garnier_logo.svg/200px-Garnier_logo.svg.png",
        alt: "Garnier Hair Colour",
      },
      {
        image:
          "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop",
        alt: "Hair Dye Kit",
      },
    ],
    discount: 14,
    expiryDate: future(730),
    sales: 380,
    tags: [
      "hair colour",
      "garnier",
      "natural black",
      "grey coverage",
      "hair dye",
    ],
    status: "publised",
    weight: 0.12,
    dimensions: { length: 18, width: 12, height: 5 },
    rating: { average: 4.4, count: 245 },
  },
  {
    vendor: VENDOR_ID,
    name: "L'Oreal Paris 6 Hair Colour (Dark Brown)",
    description:
      "L'Oréal Paris Excellence Creme — superior grey coverage with a triple care formula of serum, cream colour, and conditioner. Silky, shiny, long-lasting dark brown shade.",
    originalPrice: 380,
    price: 329,
    category: "Personal Care",
    brand: "L'Oreal",
    sku: "PC-LOREALCOLOUR-069",
    organic: false,
    featured: false,
    stock: 200,
    unit: "1 application kit",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/L%27Oreal_logo.svg/200px-L%27Oreal_logo.svg.png",
        alt: "L'Oreal Hair Colour",
      },
      {
        image:
          "https://images.unsplash.com/photo-1582095133179-bfd08e2fb6b8?w=400&h=400&fit=crop",
        alt: "Hair Colour Kit Dark Brown",
      },
    ],
    discount: 13,
    expiryDate: future(730),
    sales: 290,
    tags: [
      "loreal",
      "hair colour",
      "dark brown",
      "grey coverage",
      "excellence",
    ],
    status: "publised",
    weight: 0.18,
    dimensions: { length: 18, width: 12, height: 6 },
    rating: { average: 4.5, count: 195 },
  },
  {
    vendor: VENDOR_ID,
    name: "Nivea Soft Light Moisturiser Cream",
    description:
      "Nivea Soft Light Moisturiser with vitamin E and jojoba oil. Fast-absorbing, non-greasy formula for fresh, moisturised skin. Suitable for face, hands, and body all day long.",
    originalPrice: 280,
    price: 240,
    category: "Personal Care",
    brand: "Nivea",
    sku: "PC-NIVEASOFT-070",
    organic: false,
    featured: false,
    stock: 350,
    unit: "200 ml jar",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Nivea_logo.svg/200px-Nivea_logo.svg.png",
        alt: "Nivea Soft Moisturiser",
      },
      {
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
        alt: "Moisturiser Cream Jar",
      },
    ],
    discount: 14,
    expiryDate: future(730),
    sales: 520,
    tags: ["nivea", "moisturiser", "cream", "vitamin e", "skin care"],
    status: "publised",
    weight: 0.22,
    dimensions: { length: 12, width: 12, height: 8 },
    rating: { average: 4.5, count: 345 },
  },
  {
    vendor: VENDOR_ID,
    name: "Dettol Original Antiseptic Soap (4 Pack)",
    description:
      "Dettol Original bar soap with the iconic antiseptic protection. Kills 100 illness-causing germs while cleansing skin. Clinically tested and trusted by families for generations.",
    originalPrice: 180,
    price: 155,
    category: "Personal Care",
    brand: "Dettol",
    sku: "PC-DETTOLSOAP-071",
    organic: false,
    featured: false,
    stock: 500,
    unit: "4 × 125 g bars",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Dettol_logo.svg/200px-Dettol_logo.svg.png",
        alt: "Dettol Antiseptic Soap",
      },
      {
        image:
          "https://images.unsplash.com/photo-1584435405535-2e89034a7cd7?w=400&h=400&fit=crop",
        alt: "Dettol Bar Soap Pack",
      },
    ],
    discount: 14,
    expiryDate: future(1095),
    sales: 780,
    tags: ["dettol", "soap", "antiseptic", "antibacterial", "hygiene"],
    status: "publised",
    weight: 0.5,
    dimensions: { length: 22, width: 14, height: 6 },
    rating: { average: 4.5, count: 510 },
  },
  {
    vendor: VENDOR_ID,
    name: "Vaseline Petroleum Jelly Original",
    description:
      "The original Vaseline Petroleum Jelly — clinically proven to heal dry, cracked skin. Locks in moisture effectively and forms a protective barrier. Multi-use skin saviour.",
    originalPrice: 140,
    price: 119,
    category: "Personal Care",
    brand: "Vaseline",
    sku: "PC-VASELINE-072",
    organic: false,
    featured: false,
    stock: 400,
    unit: "250 ml jar",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Vaseline_logo.svg/200px-Vaseline_logo.svg.png",
        alt: "Vaseline Petroleum Jelly",
      },
      {
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
        alt: "Vaseline Jelly Jar",
      },
    ],
    discount: 15,
    expiryDate: future(1095),
    sales: 640,
    tags: [
      "vaseline",
      "petroleum jelly",
      "dry skin",
      "moisturiser",
      "multi use",
    ],
    status: "publised",
    weight: 0.27,
    dimensions: { length: 10, width: 10, height: 8 },
    rating: { average: 4.6, count: 420 },
  },
  {
    vendor: VENDOR_ID,
    name: "Gillette Mach3 Razor (with 2 Blades)",
    description:
      "Gillette Mach3 razor with 3 progressive blades for a close, comfortable shave. Anti-friction coating for a smooth glide. Includes razor handle and 2 refill cartridges.",
    originalPrice: 350,
    price: 299,
    category: "Personal Care",
    brand: "Gillette",
    sku: "PC-GILLETTE-073",
    organic: false,
    featured: false,
    stock: 200,
    unit: "1 handle + 2 cartridges",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Gillette_logo.svg/200px-Gillette_logo.svg.png",
        alt: "Gillette Mach3 Razor",
      },
      {
        image:
          "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop",
        alt: "Gillette Razor Pack",
      },
    ],
    discount: 15,
    expiryDate: future(1095),
    sales: 350,
    tags: ["gillette", "razor", "mach3", "shaving", "grooming"],
    status: "publised",
    weight: 0.08,
    dimensions: { length: 16, width: 8, height: 3 },
    rating: { average: 4.6, count: 230 },
  },
  {
    vendor: VENDOR_ID,
    name: "Whisper Ultra Clean Sanitary Pads (XL, 30 Count)",
    description:
      "Whisper Ultra Clean XL pads with 5X faster absorption and 0% odour. Stays dry up to 8 hours. Extra-long coverage and extra-soft top layer for maximum comfort.",
    originalPrice: 350,
    price: 299,
    category: "Personal Care",
    brand: "Whisper",
    sku: "PC-WHISPER-074",
    organic: false,
    featured: false,
    stock: 300,
    unit: "30 pads",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop",
        alt: "Whisper Sanitary Pads",
      },
      {
        image:
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
        alt: "Sanitary Pad Pack",
      },
    ],
    discount: 15,
    expiryDate: future(1095),
    sales: 480,
    tags: ["whisper", "sanitary pads", "women", "hygiene", "ultra clean"],
    status: "publised",
    weight: 0.25,
    dimensions: { length: 24, width: 16, height: 8 },
    rating: { average: 4.6, count: 315 },
  },
  {
    vendor: VENDOR_ID,
    name: "Axe Dark Temptation Body Spray",
    description:
      "Axe Dark Temptation deodorant body spray with a rich chocolate-woody fragrance. 48-hour sweat protection. The irresistible scent that lasts all day.",
    originalPrice: 220,
    price: 189,
    category: "Personal Care",
    brand: "Axe",
    sku: "PC-AXE-075",
    organic: false,
    featured: false,
    stock: 280,
    unit: "150 ml can",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1588514912908-e0b1f7f4d21a?w=400&h=400&fit=crop",
        alt: "Axe Dark Temptation Body Spray",
      },
      {
        image:
          "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=400&h=400&fit=crop",
        alt: "Deodorant Body Spray",
      },
    ],
    discount: 14,
    expiryDate: future(730),
    sales: 410,
    tags: [
      "axe",
      "body spray",
      "deodorant",
      "dark temptation",
      "mens grooming",
    ],
    status: "publised",
    weight: 0.15,
    dimensions: { length: 7, width: 7, height: 18 },
    rating: { average: 4.5, count: 270 },
  },
  {
    vendor: VENDOR_ID,
    name: "Himalaya Neem Face Wash",
    description:
      "Himalaya Purifying Neem Face Wash with neem and turmeric. Gently cleanses pores, controls excess oil, and prevents pimples. Dermatologically tested, soap-free formula.",
    originalPrice: 180,
    price: 155,
    category: "Personal Care",
    brand: "Himalaya",
    sku: "PC-HIMALAYA-076",
    organic: false,
    featured: false,
    stock: 320,
    unit: "150 ml tube",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Himalaya_Drug_Company_logo.svg/200px-Himalaya_Drug_Company_logo.svg.png",
        alt: "Himalaya Neem Face Wash",
      },
      {
        image:
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
        alt: "Neem Face Wash Tube",
      },
    ],
    discount: 14,
    expiryDate: future(730),
    sales: 560,
    tags: ["himalaya", "face wash", "neem", "anti acne", "oily skin"],
    status: "publised",
    weight: 0.17,
    dimensions: { length: 16, width: 5, height: 5 },
    rating: { average: 4.5, count: 370 },
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║       HOUSEHOLD & CLEANING  (10)                    ║
  // ╚══════════════════════════════════════════════════════╝
  {
    vendor: VENDOR_ID,
    name: "Ariel Matic Liquid Detergent",
    description:
      "Ariel Matic liquid detergent specially formulated for fully automatic washing machines. Removes the toughest stains in a single wash and leaves clothes smelling fresh.",
    originalPrice: 450,
    price: 385,
    category: "Household & Cleaning",
    brand: "Ariel",
    sku: "HC-ARIELMATIC-077",
    organic: false,
    featured: false,
    stock: 350,
    unit: "2 L bottle",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Ariel_Logo.svg/200px-Ariel_Logo.svg.png",
        alt: "Ariel Matic Liquid Detergent",
      },
      {
        image:
          "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=400&h=400&fit=crop",
        alt: "Liquid Detergent Bottle",
      },
    ],
    discount: 14,
    expiryDate: future(730),
    sales: 680,
    tags: [
      "ariel",
      "liquid detergent",
      "matic",
      "washing machine",
      "stain removal",
    ],
    status: "publised",
    weight: 2.05,
    dimensions: { length: 12, width: 10, height: 30 },
    rating: { average: 4.5, count: 450 },
  },
  {
    vendor: VENDOR_ID,
    name: "Vim Dishwash Bar (Pack of 6)",
    description:
      "Vim dishwash bar — the most trusted way to cut grease and clean utensils in India. Active lime formula removes tough oil and food residue with minimal product usage.",
    originalPrice: 100,
    price: 88,
    category: "Household & Cleaning",
    brand: "Vim",
    sku: "HC-VIMBAR-078",
    organic: false,
    featured: false,
    stock: 500,
    unit: "6 × 200 g bars",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
        alt: "Vim Dishwash Bar",
      },
      {
        image:
          "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
        alt: "Dish Wash Bar Pack",
      },
    ],
    discount: 12,
    expiryDate: future(730),
    sales: 1100,
    tags: ["vim", "dishwash bar", "utensils", "grease remover", "kitchen"],
    status: "publised",
    weight: 1.2,
    dimensions: { length: 24, width: 14, height: 8 },
    rating: { average: 4.4, count: 720 },
  },
  {
    vendor: VENDOR_ID,
    name: "Colin Glass & Surface Cleaner",
    description:
      "Colin multi-surface spray cleaner for glass, mirrors, and hard surfaces. Streak-free formula leaves surfaces sparkling clean. Fresh fragrance, no residue.",
    originalPrice: 180,
    price: 155,
    category: "Household & Cleaning",
    brand: "Colin",
    sku: "HC-COLIN-079",
    organic: false,
    featured: false,
    stock: 380,
    unit: "500 ml spray bottle",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
        alt: "Colin Glass Cleaner",
      },
      {
        image:
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
        alt: "Surface Cleaner Spray",
      },
    ],
    discount: 14,
    expiryDate: future(730),
    sales: 560,
    tags: ["colin", "glass cleaner", "streak free", "spray", "mirror"],
    status: "publised",
    weight: 0.56,
    dimensions: { length: 8, width: 7, height: 26 },
    rating: { average: 4.4, count: 365 },
  },
  {
    vendor: VENDOR_ID,
    name: "Harpic Power Plus Toilet Cleaner",
    description:
      "Harpic Power Plus 10x powerful toilet cleaner with thick gel that sticks to the bowl. Kills 99.9% germs and removes limescale, tough stains, and deodorises effectively.",
    originalPrice: 95,
    price: 82,
    category: "Household & Cleaning",
    brand: "Harpic",
    sku: "HC-HARPIC-080",
    organic: false,
    featured: false,
    stock: 400,
    unit: "500 ml bottle",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Harpic_logo.svg/200px-Harpic_logo.svg.png",
        alt: "Harpic Power Plus",
      },
      {
        image:
          "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
        alt: "Toilet Cleaner Bottle",
      },
    ],
    discount: 14,
    expiryDate: future(730),
    sales: 640,
    tags: ["harpic", "toilet cleaner", "disinfectant", "limescale", "bathroom"],
    status: "publised",
    weight: 0.55,
    dimensions: { length: 8, width: 7, height: 24 },
    rating: { average: 4.4, count: 420 },
  },
  {
    vendor: VENDOR_ID,
    name: "Lizol Floor Cleaner (Citrus)",
    description:
      "Lizol Disinfectant Surface & Floor Cleaner kills 99.9% germs, cleans floors, and leaves a fresh citrus fragrance. Works on all floor types including tiles and marble.",
    originalPrice: 199,
    price: 170,
    category: "Household & Cleaning",
    brand: "Lizol",
    sku: "HC-LIZOL-081",
    organic: false,
    featured: false,
    stock: 380,
    unit: "975 ml bottle",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
        alt: "Lizol Floor Cleaner",
      },
      {
        image:
          "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
        alt: "Citrus Floor Disinfectant",
      },
    ],
    discount: 15,
    expiryDate: future(730),
    sales: 780,
    tags: ["lizol", "floor cleaner", "disinfectant", "citrus", "tiles"],
    status: "publised",
    weight: 1.02,
    dimensions: { length: 10, width: 8, height: 28 },
    rating: { average: 4.5, count: 510 },
  },
  {
    vendor: VENDOR_ID,
    name: "Surf Excel Easy Wash Detergent Powder",
    description:
      "Surf Excel Easy Wash detergent powder for bucket wash. Advanced formula that removes 100 tough stains with less scrubbing. Works great in all water types.",
    originalPrice: 320,
    price: 275,
    category: "Household & Cleaning",
    brand: "Surf Excel",
    sku: "HC-SURFEXCEL-082",
    organic: false,
    featured: false,
    stock: 450,
    unit: "3 kg pack",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Surf_Excel_logo.svg/200px-Surf_Excel_logo.svg.png",
        alt: "Surf Excel Detergent Powder",
      },
      {
        image:
          "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=400&h=400&fit=crop",
        alt: "Laundry Detergent Powder Pack",
      },
    ],
    discount: 14,
    expiryDate: future(730),
    sales: 920,
    tags: [
      "surf excel",
      "detergent",
      "washing powder",
      "stain removal",
      "laundry",
    ],
    status: "publised",
    weight: 3,
    dimensions: { length: 32, width: 22, height: 12 },
    rating: { average: 4.5, count: 600 },
  },
  {
    vendor: VENDOR_ID,
    name: "Good Knight Advanced Power Strips (20)",
    description:
      "Good Knight Advanced Power Strips for mosquito protection. 20 active strips that continuously release mosquito-repelling formula. Covers up to 20 sq. meters. No liquid needed.",
    originalPrice: 120,
    price: 100,
    category: "Household & Cleaning",
    brand: "Good Knight",
    sku: "HC-GOODKNIGHT-083",
    organic: false,
    featured: false,
    stock: 450,
    unit: "20 strips",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1585877819095-e6a93069d0e6?w=400&h=400&fit=crop",
        alt: "Good Knight Mosquito Strips",
      },
      {
        image:
          "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop",
        alt: "Mosquito Repellent Strips Pack",
      },
    ],
    discount: 17,
    expiryDate: future(365),
    sales: 650,
    tags: ["good knight", "mosquito", "repellent", "strips", "pest control"],
    status: "publised",
    weight: 0.08,
    dimensions: { length: 16, width: 10, height: 3 },
    rating: { average: 4.4, count: 420 },
  },
  {
    vendor: VENDOR_ID,
    name: "Scotch-Brite Scrub Pad (Pack of 6)",
    description:
      "Scotch-Brite scrub pads with extra thick sponge and a tough scrubbing surface. Effectively removes burnt food, grease, and tough stains from pots, pans, and dishes.",
    originalPrice: 120,
    price: 99,
    category: "Household & Cleaning",
    brand: "Scotch-Brite",
    sku: "HC-SCOTCHBRITE-084",
    organic: false,
    featured: false,
    stock: 500,
    unit: "6 pads",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
        alt: "Scotch-Brite Scrub Pads",
      },
      {
        image:
          "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
        alt: "Kitchen Scrub Pad Pack",
      },
    ],
    discount: 18,
    expiryDate: future(1095),
    sales: 880,
    tags: ["scotch brite", "scrub pad", "sponge", "kitchen", "cleaning"],
    status: "publised",
    weight: 0.18,
    dimensions: { length: 20, width: 14, height: 5 },
    rating: { average: 4.4, count: 575 },
  },
  {
    vendor: VENDOR_ID,
    name: "Garbage Bags Large (Pack of 30)",
    description:
      "Thick, tear-resistant large garbage bags for kitchen and outdoor bins. Tie-handle for easy, hygienic disposal. Leakproof bottom seal. Capacity 45 litres.",
    originalPrice: 150,
    price: 125,
    category: "Household & Cleaning",
    brand: "Shalimar",
    sku: "HC-GARBAGBAG-085",
    organic: false,
    featured: false,
    stock: 600,
    unit: "30 bags (45 L)",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        alt: "Garbage Bags Large Pack",
      },
      {
        image:
          "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=400&h=400&fit=crop",
        alt: "Tie Handle Trash Bags",
      },
    ],
    discount: 17,
    expiryDate: future(1825),
    sales: 740,
    tags: ["garbage bags", "trash", "dustbin", "large", "household"],
    status: "publised",
    weight: 0.3,
    dimensions: { length: 22, width: 16, height: 6 },
    rating: { average: 4.3, count: 480 },
  },
  {
    vendor: VENDOR_ID,
    name: "Pril Concentrated Dish Wash Gel",
    description:
      "Pril concentrated dish wash gel with active lemon extracts. Just a few drops cut through the toughest grease on pots, pans, and dishes. Long-lasting formula.",
    originalPrice: 100,
    price: 85,
    category: "Household & Cleaning",
    brand: "Pril",
    sku: "HC-PRIL-086",
    organic: false,
    featured: false,
    stock: 420,
    unit: "700 ml bottle",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
        alt: "Pril Dish Wash Gel",
      },
      {
        image:
          "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
        alt: "Concentrated Dishwash Gel",
      },
    ],
    discount: 15,
    expiryDate: future(730),
    sales: 580,
    tags: ["pril", "dishwash gel", "concentrated", "lemon", "grease"],
    status: "publised",
    weight: 0.74,
    dimensions: { length: 8, width: 7, height: 24 },
    rating: { average: 4.3, count: 375 },
  },

  // ╔══════════════════════════════════════════════════════╗
  // ║     LENTILS, RICE, FLOUR & SPICES  (15)             ║
  // ╚══════════════════════════════════════════════════════╝
  {
    vendor: VENDOR_ID,
    name: "India Gate Basmati Rice (Premium)",
    description:
      "India Gate Premium Basmati Rice — extra-long, aged grains with an exceptional aroma and fluffy texture. Perfect for biryani, pulao, and everyday cooking. The hallmark of quality rice.",
    originalPrice: 420,
    price: 369,
    category: "Rice & Grains",
    brand: "India Gate",
    sku: "RG-INDIAGATE-087",
    organic: false,
    featured: true,
    stock: 400,
    unit: "5 kg bag",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop",
        alt: "India Gate Basmati Rice",
      },
      {
        image:
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
        alt: "Premium Basmati Rice Bag",
      },
    ],
    discount: 12,
    expiryDate: future(365),
    sales: 780,
    tags: ["basmati", "rice", "india gate", "premium", "biryani"],
    status: "publised",
    weight: 5,
    dimensions: { length: 40, width: 28, height: 10 },
    rating: { average: 4.7, count: 520 },
  },
  {
    vendor: VENDOR_ID,
    name: "Daawat Super Basmati Rice",
    description:
      "Daawat Super Basmati — long, slender rice grains that elongate on cooking. Naturally aromatic with a delicate nutty flavour. Great for all rice dishes from biryani to jeera rice.",
    originalPrice: 360,
    price: 315,
    category: "Rice & Grains",
    brand: "Daawat",
    sku: "RG-DAAWAT-088",
    organic: false,
    featured: false,
    stock: 350,
    unit: "5 kg bag",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
        alt: "Daawat Super Basmati Rice",
      },
      {
        image:
          "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop",
        alt: "Basmati Rice Pack",
      },
    ],
    discount: 13,
    expiryDate: future(365),
    sales: 640,
    tags: ["daawat", "basmati", "rice", "long grain", "aromatic"],
    status: "publised",
    weight: 5,
    dimensions: { length: 40, width: 28, height: 10 },
    rating: { average: 4.6, count: 420 },
  },
  {
    vendor: VENDOR_ID,
    name: "Aashirvaad Whole Wheat Atta (Shakthi)",
    description:
      "Aashirvaad Shakthi Atta — stone-ground whole wheat flour from the finest wheat. Makes soft, pliable rotis and chapattis. High in dietary fibre for a wholesome daily diet.",
    originalPrice: 300,
    price: 259,
    category: "Flour & Atta",
    brand: "Aashirvaad",
    sku: "FA-AASHIRVAAD-089",
    organic: false,
    featured: false,
    stock: 450,
    unit: "5 kg pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop",
        alt: "Aashirvaad Whole Wheat Atta",
      },
      {
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
        alt: "Wheat Flour Pack",
      },
    ],
    discount: 14,
    expiryDate: future(180),
    sales: 980,
    tags: ["atta", "wheat flour", "aashirvaad", "roti", "chapatti"],
    status: "publised",
    weight: 5,
    dimensions: { length: 40, width: 25, height: 10 },
    rating: { average: 4.5, count: 645 },
  },
  {
    vendor: VENDOR_ID,
    name: "Maida Fine Refined Wheat Flour",
    description:
      "Fine, white, all-purpose refined wheat flour (maida). Used for baking bread, cakes, biscuits, naan, bhatura, and countless Indian and Western recipes requiring a smooth dough.",
    originalPrice: 120,
    price: 99,
    category: "Flour & Atta",
    brand: "Fortune",
    sku: "FA-MAIDA-090",
    organic: false,
    featured: false,
    stock: 500,
    unit: "1 kg pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop",
        alt: "Maida Refined Wheat Flour",
      },
      {
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
        alt: "All Purpose Flour Pack",
      },
    ],
    discount: 18,
    expiryDate: future(365),
    sales: 750,
    tags: ["maida", "refined flour", "all purpose", "baking", "fortune"],
    status: "publised",
    weight: 1,
    dimensions: { length: 20, width: 14, height: 6 },
    rating: { average: 4.3, count: 480 },
  },
  {
    vendor: VENDOR_ID,
    name: "Tata Salt Lite (Low Sodium)",
    description:
      "Tata Salt Lite with 15% less sodium than regular salt. An ideal choice for health-conscious individuals looking to reduce sodium intake without sacrificing taste.",
    originalPrice: 35,
    price: 30,
    category: "Salt & Sugar",
    brand: "Tata",
    sku: "SS-TATASALT-091",
    organic: false,
    featured: false,
    stock: 800,
    unit: "1 kg pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1528750717929-32abb73d3bd9?w=400&h=400&fit=crop",
        alt: "Tata Salt Lite",
      },
      {
        image:
          "https://images.unsplash.com/photo-1578496479763-c21c718af028?w=400&h=400&fit=crop",
        alt: "Low Sodium Salt Pack",
      },
    ],
    discount: 14,
    expiryDate: future(1825),
    sales: 1300,
    tags: ["tata salt", "low sodium", "salt", "health", "cooking"],
    status: "publised",
    weight: 1,
    dimensions: { length: 18, width: 12, height: 5 },
    rating: { average: 4.4, count: 830 },
  },
  {
    vendor: VENDOR_ID,
    name: "MDH Chaat Masala",
    description:
      "MDH Chaat Masala — the iconic tangy, spicy blend with amchur, cumin, black salt, and spices. Transforms fruits, chaat, salads, and snacks with a burst of authentic Indian flavour.",
    originalPrice: 50,
    price: 42,
    category: "Spices & Masala",
    brand: "MDH",
    sku: "SM-CHAATMASALA-092",
    organic: false,
    featured: false,
    stock: 600,
    unit: "100 g box",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/MDH_Masala_Logo.svg/200px-MDH_Masala_Logo.svg.png",
        alt: "MDH Chaat Masala",
      },
      {
        image:
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&h=400&fit=crop",
        alt: "Chaat Masala Box",
      },
    ],
    discount: 16,
    expiryDate: future(365),
    sales: 950,
    tags: ["chaat masala", "mdh", "spice", "tangy", "indian masala"],
    status: "publised",
    weight: 0.1,
    dimensions: { length: 8, width: 8, height: 10 },
    rating: { average: 4.6, count: 620 },
  },
  {
    vendor: VENDOR_ID,
    name: "Everest Garam Masala",
    description:
      "Everest Garam Masala — a perfectly balanced whole-spice blend of cinnamon, cloves, cardamom, and black pepper. Adds depth and warmth to curries, dals, and biryanis.",
    originalPrice: 65,
    price: 55,
    category: "Spices & Masala",
    brand: "Everest",
    sku: "SM-GARAMMASALA-093",
    organic: false,
    featured: false,
    stock: 550,
    unit: "100 g pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&h=400&fit=crop",
        alt: "Everest Garam Masala",
      },
      {
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
        alt: "Garam Masala Spice Pack",
      },
    ],
    discount: 15,
    expiryDate: future(365),
    sales: 870,
    tags: ["garam masala", "everest", "spice blend", "curry", "cooking"],
    status: "publised",
    weight: 0.1,
    dimensions: { length: 14, width: 8, height: 5 },
    rating: { average: 4.5, count: 570 },
  },
  {
    vendor: VENDOR_ID,
    name: "Catch Turmeric Powder (Haldi)",
    description:
      "Pure, bright yellow turmeric powder with a high curcumin content. An essential Indian spice and natural anti-inflammatory agent. Adds colour, flavour, and health benefits.",
    originalPrice: 80,
    price: 68,
    category: "Spices & Masala",
    brand: "Catch",
    sku: "SM-TURMERIC-094",
    organic: false,
    featured: false,
    stock: 700,
    unit: "200 g pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop",
        alt: "Turmeric Powder Haldi",
      },
      {
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
        alt: "Yellow Turmeric Spice Pack",
      },
    ],
    discount: 15,
    expiryDate: future(730),
    sales: 1050,
    tags: ["turmeric", "haldi", "spice", "curcumin", "indian cooking"],
    status: "publised",
    weight: 0.2,
    dimensions: { length: 14, width: 8, height: 5 },
    rating: { average: 4.5, count: 680 },
  },
  {
    vendor: VENDOR_ID,
    name: "MDH Kashmiri Red Chilli Powder",
    description:
      "MDH Kashmiri Red Chilli Powder — prized for its vivid crimson colour and mild heat. Gives curries their beautiful red hue without excessive spice. Finely ground for even distribution.",
    originalPrice: 70,
    price: 59,
    category: "Spices & Masala",
    brand: "MDH",
    sku: "SM-KASHMIRCHILLI-095",
    organic: false,
    featured: false,
    stock: 600,
    unit: "100 g box",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
        alt: "Kashmiri Red Chilli Powder",
      },
      {
        image:
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&h=400&fit=crop",
        alt: "MDH Chilli Powder Box",
      },
    ],
    discount: 16,
    expiryDate: future(365),
    sales: 790,
    tags: ["kashmiri chilli", "red chilli", "mdh", "spice", "colour"],
    status: "publised",
    weight: 0.1,
    dimensions: { length: 8, width: 8, height: 10 },
    rating: { average: 4.5, count: 515 },
  },
  {
    vendor: VENDOR_ID,
    name: "Tata Sampann Yellow Moong Dal",
    description:
      "Premium split yellow moong dal — light, easy to digest, and rich in protein and fibre. Tata Sampann uses unpolished grains for better nutrition and flavour.",
    originalPrice: 160,
    price: 138,
    category: "Lentils & Pulses",
    brand: "Tata Sampann",
    sku: "LP-MOONGDAL-096",
    organic: false,
    featured: false,
    stock: 400,
    unit: "1 kg pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1611059100015-e47f51e15e36?w=400&h=400&fit=crop",
        alt: "Yellow Moong Dal",
      },
      {
        image:
          "https://images.unsplash.com/photo-1600698990042-08e7d3a89b5e?w=400&h=400&fit=crop",
        alt: "Moong Dal Pack",
      },
    ],
    discount: 14,
    expiryDate: future(365),
    sales: 720,
    tags: ["moong dal", "yellow lentil", "tata sampann", "protein", "dal"],
    status: "publised",
    weight: 1,
    dimensions: { length: 22, width: 14, height: 6 },
    rating: { average: 4.5, count: 470 },
  },
  {
    vendor: VENDOR_ID,
    name: "Tata Sampann Masoor Dal (Red Lentils)",
    description:
      "Tata Sampann Masoor Dal — unpolished, protein-rich red lentils that cook quickly and are naturally creamy. Nutritious, delicious, and perfect for everyday dal tadka.",
    originalPrice: 140,
    price: 119,
    category: "Lentils & Pulses",
    brand: "Tata Sampann",
    sku: "LP-MASOOR-097",
    organic: false,
    featured: false,
    stock: 450,
    unit: "1 kg pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1600698990042-08e7d3a89b5e?w=400&h=400&fit=crop",
        alt: "Masoor Dal Red Lentils",
      },
      {
        image:
          "https://images.unsplash.com/photo-1611059100015-e47f51e15e36?w=400&h=400&fit=crop",
        alt: "Tata Sampann Masoor Dal Pack",
      },
    ],
    discount: 15,
    expiryDate: future(365),
    sales: 650,
    tags: ["masoor dal", "red lentils", "tata sampann", "dal tadka", "protein"],
    status: "publised",
    weight: 1,
    dimensions: { length: 22, width: 14, height: 6 },
    rating: { average: 4.4, count: 420 },
  },
  {
    vendor: VENDOR_ID,
    name: "Fortune Chana Dal (Bengal Gram)",
    description:
      "Fortune Chana Dal — bold-flavoured split Bengal gram lentils. High in protein and dietary fibre. Used in dal, curries, chutneys, and ladoos. A pantry essential.",
    originalPrice: 180,
    price: 155,
    category: "Lentils & Pulses",
    brand: "Fortune",
    sku: "LP-CHANADAL-098",
    organic: false,
    featured: false,
    stock: 400,
    unit: "1 kg pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1611059100015-e47f51e15e36?w=400&h=400&fit=crop",
        alt: "Chana Dal Bengal Gram",
      },
      {
        image:
          "https://images.unsplash.com/photo-1600698990042-08e7d3a89b5e?w=400&h=400&fit=crop",
        alt: "Fortune Chana Dal Pack",
      },
    ],
    discount: 14,
    expiryDate: future(365),
    sales: 580,
    tags: ["chana dal", "bengal gram", "fortune", "protein", "lentils"],
    status: "publised",
    weight: 1,
    dimensions: { length: 22, width: 14, height: 6 },
    rating: { average: 4.4, count: 380 },
  },
  {
    vendor: VENDOR_ID,
    name: "MDH Biryani Masala",
    description:
      "MDH Biryani Masala — a fragrant blend of whole spices including star anise, bay leaf, mace, and saffron. Adds an authentic, restaurant-style depth and aroma to every biryani.",
    originalPrice: 80,
    price: 68,
    category: "Spices & Masala",
    brand: "MDH",
    sku: "SM-BIRYANIMASALA-099",
    organic: false,
    featured: false,
    stock: 500,
    unit: "50 g box",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&h=400&fit=crop",
        alt: "MDH Biryani Masala",
      },
      {
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
        alt: "Biryani Spice Mix Box",
      },
    ],
    discount: 15,
    expiryDate: future(365),
    sales: 890,
    tags: ["biryani masala", "mdh", "spice", "aromatic", "rice"],
    status: "publised",
    weight: 0.05,
    dimensions: { length: 8, width: 8, height: 8 },
    rating: { average: 4.6, count: 580 },
  },
  {
    vendor: VENDOR_ID,
    name: "Saffola Gold Edible Oil (Blend)",
    description:
      "Saffola Gold edible oil — a heart-healthy blend of rice bran and corn oil with a good balance of MUFA and PUFA. Lighter on the stomach and suitable for all Indian cooking methods.",
    originalPrice: 320,
    price: 275,
    category: "Edible Oils",
    brand: "Saffola",
    sku: "EO-SAFFOLA-100",
    organic: false,
    featured: false,
    stock: 350,
    unit: "1 L bottle",
    images: [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Saffola_logo.svg/200px-Saffola_logo.svg.png",
        alt: "Saffola Gold Edible Oil",
      },
      {
        image:
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
        alt: "Healthy Cooking Oil Bottle",
      },
    ],
    discount: 14,
    expiryDate: future(365),
    sales: 680,
    tags: [
      "saffola",
      "edible oil",
      "heart healthy",
      "rice bran",
      "cooking oil",
    ],
    status: "publised",
    weight: 0.92,
    dimensions: { length: 8, width: 8, height: 26 },
    rating: { average: 4.5, count: 445 },
  },
  {
    vendor: VENDOR_ID,
    name: "Everest Coriander Powder (Dhaniya)",
    description:
      "Everest Coriander Powder — finely ground from the finest coriander seeds. Adds a warm, citrusy, nutty flavour to curries, dals, marinades, and chutneys. No artificial colour.",
    originalPrice: 55,
    price: 47,
    category: "Spices & Masala",
    brand: "Everest",
    sku: "SM-CORIANDER-101",
    organic: false,
    featured: false,
    stock: 600,
    unit: "200 g pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
        alt: "Everest Coriander Powder",
      },
      {
        image:
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&h=400&fit=crop",
        alt: "Dhaniya Spice Pack",
      },
    ],
    discount: 15,
    expiryDate: future(365),
    sales: 760,
    tags: ["coriander powder", "dhaniya", "everest", "spice", "curry"],
    status: "publised",
    weight: 0.2,
    dimensions: { length: 14, width: 8, height: 5 },
    rating: { average: 4.4, count: 495 },
  },
  {
    vendor: VENDOR_ID,
    name: "Rajma (Kidney Beans)",
    description:
      "Premium dark red kidney beans (rajma) — meaty, full-flavoured, and rich in protein and iron. The star of the beloved Punjabi rajma chawal. A wholesome vegetarian protein source.",
    originalPrice: 180,
    price: 155,
    category: "Lentils & Pulses",
    brand: "Tata Sampann",
    sku: "LP-RAJMA-102",
    organic: false,
    featured: false,
    stock: 380,
    unit: "1 kg pack",
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1600698990042-08e7d3a89b5e?w=400&h=400&fit=crop",
        alt: "Rajma Kidney Beans",
      },
      {
        image:
          "https://images.unsplash.com/photo-1611059100015-e47f51e15e36?w=400&h=400&fit=crop",
        alt: "Dark Red Kidney Beans Pack",
      },
    ],
    discount: 14,
    expiryDate: future(365),
    sales: 620,
    tags: ["rajma", "kidney beans", "protein", "punjabi", "tata sampann"],
    status: "publised",
    weight: 1,
    dimensions: { length: 22, width: 14, height: 6 },
    rating: { average: 4.5, count: 405 },
  },
];

// ─── SEED SCRIPT (uncomment to run) ─────────────────────────────────────────
mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerce")
  .then(async () => {
    await ProductModel.deleteMany({});
    const inserted = await ProductModel.insertMany(products);
    console.log(`✅ Successfully seeded ${inserted.length} products`);
    mongoose.disconnect();
  })
  .catch((err: any) => {
    console.error("❌ Seeding failed:", err);
    mongoose.disconnect();
  });
