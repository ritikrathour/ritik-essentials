import mongoose from "mongoose";
export interface IProdStatus {
  status: "publised" | "draft" | "out_of_stock";
}
enum IProductUnit {
  KG = "kg",
  G = "g",
  LB = "lb",
  OZ = "oz",
  L = "L",
  ML = "ml",
  PIECE = "piece",
  DOZEN = "dozen",
  PACK = "pack",
}
export interface PaginationQuery {
  page: number;
  limit: number;
  sortOrder?: "asc" | "desc";
  search?: string;
  category?: string;
  status?: IProdStatus;
}
export interface IProduct {
  vendor: mongoose.Types.ObjectId;
  name: string;
  description: string;
  originalPrice?: number;
  price: number;
  category: string;
  brand: mongoose.ObjectId;
  sku: string;
  stock: number;
  images: string[];
  sales?: number;
  tags: string[];
  status: "publised" | "draft" | "out_of_stock";
  weight?: number;
  unit: IProductUnit;
  featured?: boolean;
  organic?: boolean;
  discount: number;
  expiryDiscount: Date;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  rating: {
    average: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
export interface IProductFilters {
  page: number;
  limit: number;
  sort: string;
  order: "asc" | "desc";
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  minRating?: number;
  maxRating?: number;
}
export interface IUpdateProduct {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  brand?: string;
  stock?: number;
  images?: string[];
  tags?: string[];
  isActive?: boolean;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
}
export interface IPaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasPrev: boolean;
    hasNext: boolean;
  };
}
