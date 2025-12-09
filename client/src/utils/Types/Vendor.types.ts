export interface IVendorProucts {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  stock: number;
  label: string;
  status: "published" | "Draft";
  sales: number;
  revenue: number;
  sku: string;
}
