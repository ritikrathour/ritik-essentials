export const authKeys = {
  user: ["user"] as const,
};
// product keys
export const productKeys = {
  all: ["products"] as const,
  category: () => [...productKeys.all, "category"] as const,
  Categories: () => [...productKeys.all, "categories"] as const,
  popularCategory: () => [...productKeys.all, "popular-category"] as const,
  productId: (id: string) => [...productKeys.all, id] as const,
  brands: () => [...productKeys.all, "brands"],
  favProduct: () => [...productKeys.all, "fav-product"],
};
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  orders: () => [...userKeys.all, "orders"] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};
