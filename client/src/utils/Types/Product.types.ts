export interface ICategory {
  // id: string;
  icon: string;
  title: string;
  children?: any;
}
export interface ProductImage {
  id: string;
  url: string;
  file: File;
  isPrimary: boolean;
}
export interface ICardProps {
  image: string;
  style?: string;
  title: string;
  subtitle?: string;
  description: string;
  btnText: string;
  icon?: any;
  to?: string;
}

export interface IProduct {
  _id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  category?: string;
  image?: string;
  images?: string[];
  rating?: { avarage: number; count: number };
  badge?: string;
  sponsored: boolean;
  discount?: number;
  assured?: boolean;
}
export interface IProductFormData {
  name: string;
  category: string;
  price: string;
  tags: String[];
  originalPrice: string;
  brand: string;
  unit: string;
  stock: string;
  sku: string;
  description: string;
  discount: string;
  expiryDate: string;
  organic: boolean;
  featured: boolean;
}

// id: 1,
//     name: "Men Full Sleeve Graphic Print Hooded Sweatshirt",
//     brand: "FLYIND VOGUE OUTFIT",
//     price: 418,
//     originalPrice: 1299,
//     discount: 67,
//     image: "../assets/daily.png",
//     sponsored: true,
//     badge: "Hot Deal",
