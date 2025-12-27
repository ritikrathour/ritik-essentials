import dns from "dns";
import { IValidationError } from "../types/Auth.type";
import { promisify } from "util";
import { ICartItem } from "../types/Cart.type";
import { IProdStatus } from "../types/Product.type";
// validate product query
export const validatePaginationQuery = (query: any) => {
  return {
    page: Math.max(1, parseInt(query.page) || 1),
    limit: Math.min(100, Math.max(1, parseInt(query.limit) || 10)),
    sortOrder: query.sortOrder === "asc" ? "asc" : "desc",
    search: query.search?.trim(),
    category: query.category?.trim(),
    status: query.status as IProdStatus,
  };
};
// validateCreateProduct
export const validateCreateProduct = (data: any) => {
  const errors: IValidationError[] = [];
  // Required fields
  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    errors.push({
      field: "name",
      message: "Name is required and must be a string.",
    });
  } else if (data.name.length > 200) {
    errors.push({
      field: "name",
      message: "Name must not exceed 200 characters.",
    });
  }

  if (!data.description || typeof data.description !== "string") {
    errors.push({
      field: "description",
      message: "Desciption is required and must be a string.",
    });
  } else if (data.description.trim() === "") {
    errors.push({
      field: "description",
      message: "Description cannot be empty.",
    });
  } else if (data.description.length > 2000) {
    errors.push({
      field: "Description",
      message: "Description must not exceed 2000 characters.",
    });
  }
  if (!data.price || typeof data.price !== "number") {
    errors.push({
      field: "price",
      message: "Price is required and must be a number",
    });
  } else if (data.price < 0) {
    errors.push({
      field: "price",
      message: "Price must be greater than or equal to 0",
    });
  }
  if (!data.category || typeof data.category !== "string") {
    errors.push({
      field: "category",
      message: "Category is required and must be a string",
    });
  } else if (data.category.trim().length === 0) {
    errors.push({ field: "category", message: "Category cannot be empty" });
  } else if (data.category.length > 100) {
    errors.push({
      field: "category",
      message: "Category cannot exceed 100 characters",
    });
  }
  if (!data.brand || typeof data.brand !== "string") {
    errors.push({
      field: "brand",
      message: "Brand is required and must be a string",
    });
  } else if (data.brand.trim().length === 0) {
    errors.push({ field: "brand", message: "Brand cannot be empty" });
  } else if (data.brand.length > 100) {
    errors.push({
      field: "brand",
      message: "Brand cannot exceed 100 characters",
    });
  }

  if (!data.sku || typeof data.sku !== "string") {
    errors.push({
      field: "sku",
      message: "SKU is required and must be a string",
    });
  } else if (data.sku.trim().length === 0) {
    errors.push({ field: "sku", message: "SKU cannot be empty" });
  } else if (data.sku.length > 50) {
    errors.push({ field: "sku", message: "SKU cannot exceed 50 characters" });
  } else if (!/^[A-Za-z0-9_-]+$/.test(data.sku)) {
    errors.push({
      field: "sku",
      message:
        "SKU can only contain letters, numbers, hyphens, and underscores",
    });
  }
  if (
    data.stock === undefined ||
    data.stock === null ||
    typeof data.stock !== "number"
  ) {
    errors.push({
      field: "stock",
      message: "Stock is required and must be a number",
    });
  } else if (data.stock < 0) {
    errors.push({
      field: "stock",
      message: "Stock must be greater than or equal to 0",
    });
  }
  // Optional fields validation
  if (data.images && !Array.isArray(data.images)) {
    errors.push({ field: "images", message: "Images must be an array" });
  } else if (
    data.images &&
    data.images.some(
      (img: any) => typeof img?.image !== "string" || img?.image.length > 500
    )
  ) {
    errors.push({
      field: "images",
      message: "Each image URL must be a string and not exceed 500 characters",
    });
  }

  if (data.tags && !Array.isArray(data.tags)) {
    errors.push({ field: "tags", message: "Tags must be an array" });
  } else if (
    data.tags &&
    data.tags.some((tag: any) => typeof tag !== "string" || tag.length > 50)
  ) {
    errors.push({
      field: "tags",
      message: "Each tag must be a string and not exceed 50 characters",
    });
  }

  if (data.isActive !== undefined && typeof data.isActive !== "boolean") {
    errors.push({ field: "isActive", message: "isActive must be a boolean" });
  }
  return {
    isvalid: errors.length === 0,
    errors,
  };
};
// validate UpdateProduct
export const ValidateUpdateProduct = (data: any) => {
  // errors
  const errors: IValidationError[] = [];
  // name field
  if (data.name !== undefined) {
    if (typeof data.name !== "string") {
      errors.push({ field: "name", message: "Name must be a string" });
    } else if (data.name.trim().length === 0) {
      errors.push({ field: "name", message: "Name cannot be empty" });
    } else if (data.name.length > 200) {
      errors.push({
        field: "name",
        message: "Name cannot exceed 200 characters",
      });
    }
  }
  // description field
  if (data.description !== undefined) {
    if (typeof data.description !== "string") {
      errors.push({
        field: "description",
        message: "Description must be a string",
      });
    } else if (data.description.trim().length === 0) {
      errors.push({
        field: "description",
        message: "Description cannot be empty",
      });
    } else if (data.description.length > 2000) {
      errors.push({
        field: "description",
        message: "Description cannot exceed 2000 characters",
      });
    }
  }
  // price field
  if (data.price !== undefined) {
    if (typeof data.price !== "number") {
      errors.push({ field: "price", message: "Price must be a number" });
    }
    if (data.price < 0) {
      errors.push({
        field: "price",
        message: "Price must be greater than or equal to 0",
      });
    }
  }
  // category filed
  if (data.category !== undefined) {
    if (typeof data.category !== "string") {
      errors.push({ field: "category", message: "Category must be a string" });
    } else if (data.category.trim().length === 0) {
      errors.push({ field: "category", message: "Category cannot be empty" });
    } else if (data.category.length > 100) {
      errors.push({
        field: "category",
        message: "Category cannot exceed 100 characters",
      });
    }
  }
  // brand field
  if (data.brand !== undefined) {
    if (typeof data.brand !== "string") {
      errors.push({ field: "brand", message: "brand must be a string" });
    } else if (data.brand.trim().length === 0) {
      errors.push({ field: "brand", message: "brand cannot be empty" });
    } else if (data.brand.length > 100) {
      errors.push({
        field: "brand",
        message: "brand cannot exceed 100 characters",
      });
    }
  }
  // stock filed
  if (data.stock !== undefined) {
    if (typeof data.stock !== "number") {
      errors.push({ field: "stock", message: "Stock must be a number" });
    } else if (data.stock < 0) {
      errors.push({
        field: "stock",
        message: "Stock must be greater than or equal to 0",
      });
    }
  }
  // images filed
  if (data.images !== undefined) {
    if (!Array.isArray(data.emages)) {
      errors.push({ field: "images", message: "Images must be an array" });
    } else if (
      data.images.some(
        (image: string) => typeof image !== "string" || image.length > 500
      )
    ) {
      errors.push({
        field: "images",
        message:
          "Each image URL must be a string and not exceed 500 characters",
      });
    }
  }
  // tags field
  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags)) {
      errors.push({ field: "tags", message: "Tags must be an array" });
    } else if (
      data.tags.some((tag: any) => typeof tag !== "string" || tag.length > 50)
    ) {
      errors.push({
        field: "tags",
        message: "Each tag must be a string and not exceed 50 characters",
      });
    }
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
};
// DNS lookup promisified
const resolveMx = promisify(dns.resolveMx);
// Check if email domain exists (MX record check)
export const isDomainValid = async (email: string): Promise<boolean> => {
  try {
    const domain = email.split("@")[1];
    const mxRecord = await resolveMx(domain);
    return mxRecord && mxRecord.length > 0;
  } catch (error) {
    console.error("Domain validation error:", error);
    return false;
  }
};
// is valid object id
export const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};
// sanitizeString
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, "");
};
// parse filters for for products list
export const parseProductFilters = (query: any) => {
  const filters: any = {};
  // Parse page and limit
  filters.page = Math.max(1, parseInt(query.page)) || 1;
  filters.limit = Math.min(50, Math.max(1, parseInt(query.limit)) || 20);
  // Parse sort and order
  filters.sort = query.sort || "createdAt";
  filters.order = query.order === "desc" ? "asc" : "desc";
  // Parse search
  if (query.search && typeof query.search === "string") {
    filters.search = sanitizeString(query.search);
  }
  // Parse category
  if (query.category && typeof query.category === "string") {
    filters.category = sanitizeString(query.category);
  }
  // Parse brand
  if (query.brand && typeof query.brand === "string") {
    filters.brand = sanitizeString(query.brand);
  }
  // Parse price range
  if (query.minPrice) {
    const minPrice = parseFloat(query.minPrice);
    if (!isNaN(minPrice) && minPrice >= 0) {
      filters.minPrice = minPrice;
    }
  }
  if (query.maxPrice) {
    const maxPrice = parseFloat(query.maxPrice);
    if (!isNaN(maxPrice) && maxPrice >= 0) {
      filters.maxPrice = maxPrice;
    }
  }
  // Parse minimum stock
  if (query.minStock) {
    const minStock = parseFloat(query.minStock);
    if (!isNaN(minStock) && minStock >= 0) {
      filters.minStock = minStock;
    }
  }
  //parse rating
  if (query.rating) {
    const rating = Math.max(1, Math.min(5, parseFloat(query.rating)));
    filters.rating = rating;
  }
  return filters;
};
interface ICategoryValidate {
  name: string;
  parent: string | null;
}
// category validation
export const CategoryValidate = (
  category: ICategoryValidate
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!category.name) {
    errors.push("Category Name is required");
  } else if (category?.name.trim() === " ") {
    errors.push("Category Name should not be Empty");
  } else if (category.name.length > 24) {
    errors.push("Category Name must not exceed 24 characters.");
  } else if (category.name.length < 4) {
    errors.push("Category Name must atleast 5 characters.");
  }
  return { valid: errors.length === 0, errors };
};

// cart validation
export const validateAddToCart = (
  body: ICartItem
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!body.productId) {
    errors.push("Product ID is required!");
  }
  if (
    !body?.quantity ||
    typeof body?.quantity !== "number" ||
    body?.quantity <= 0
  ) {
    errors.push("Quantity is required and must be a positive number");
  }
  if (!body?.price || typeof body?.price !== "number" || body?.price <= 0) {
    errors.push("Price is required and must be a positive number");
  }
  if (!body?.name || typeof body?.name !== "string") {
    errors.push("Product name is required");
  }
  // if (!body?.imageUrl || typeof body?.imageUrl !== "string") {
  //   errors.push("Image URL required and must be a string");
  // }
  return { isValid: errors.length === 0, errors };
};
