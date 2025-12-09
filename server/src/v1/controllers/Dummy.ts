// ============================================================================
// Types & Interfaces
// ============================================================================

import { Request, Response, NextFunction } from "express";

export enum UserRole {
  VENDOR = "vendor",
  CUSTOMER = "customer",
  ADMIN = "admin",
}

export enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  OUT_OF_STOCK = "out_of_stock",
}

export interface IUser {
  id: string;
  role: UserRole;
  vendorId?: string;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface IProduct {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: ProductStatus;
  category: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images?: string[];
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  status?: ProductStatus;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  category?: string;
  status?: ProductStatus;
}

// ============================================================================
// Custom Error Classes
// ============================================================================

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(401, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden access") {
    super(403, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(404, message);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(400, message);
  }
}

// ============================================================================
// Middleware
// ============================================================================

/**
 * Authentication middleware - validates JWT token
 * In production, this would verify JWT and extract user info
 */
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("No token provided");
    }

    // Mock JWT verification - replace with actual JWT verification
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = mockJWTVerify(token);

    req.user = decoded as IUser;
    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid or expired token"));
  }
};

/**
 * Authorization middleware - checks user role
 */
export const authorize = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError("User not authenticated"));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ForbiddenError(`Access denied. Required roles: ${roles.join(", ")}`)
      );
    }

    next();
  };
};

/**
 * Vendor ownership verification middleware
 * Ensures vendor can only access their own products
 */
export const verifyVendorOwnership = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id: productId } = req.params;
    const user = req.user!;

    // Admin can access any product
    if (user.role === UserRole.ADMIN) {
      return next();
    }

    // Vendor can only access their own products
    if (user.role === UserRole.VENDOR) {
      const product = await ProductService.getProductById(productId);

      if (!product) {
        throw new NotFoundError("Product not found");
      }

      if (product.vendorId !== user.vendorId) {
        throw new ForbiddenError("You can only access your own products");
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Global error handler
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  } else {
    console.error("Unexpected error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
};

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export const asyncHandler = (
  fn: (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// ============================================================================
// Validation
// ============================================================================

export class ProductValidator {
  static validateCreateProduct(data: any): CreateProductDto {
    const errors: string[] = [];

    if (
      !data.name ||
      typeof data.name !== "string" ||
      data.name.trim().length < 3
    ) {
      errors.push("Name must be at least 3 characters");
    }

    if (!data.description || typeof data.description !== "string") {
      errors.push("Description is required");
    }

    if (typeof data.price !== "number" || data.price <= 0) {
      errors.push("Price must be a positive number");
    }

    if (typeof data.stock !== "number" || data.stock < 0) {
      errors.push("Stock must be a non-negative number");
    }

    if (!data.category || typeof data.category !== "string") {
      errors.push("Category is required");
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join(", "));
    }

    return {
      name: data.name.trim(),
      description: data.description.trim(),
      price: data.price,
      stock: data.stock,
      category: data.category.trim(),
      images: Array.isArray(data.images) ? data.images : [],
    };
  }

  static validateUpdateProduct(data: any): UpdateProductDto {
    const updates: UpdateProductDto = {};

    if (data.name !== undefined) {
      if (typeof data.name !== "string" || data.name.trim().length < 3) {
        throw new ValidationError("Name must be at least 3 characters");
      }
      updates.name = data.name.trim();
    }

    if (data.description !== undefined) {
      if (typeof data.description !== "string") {
        throw new ValidationError("Description must be a string");
      }
      updates.description = data.description.trim();
    }

    if (data.price !== undefined) {
      if (typeof data.price !== "number" || data.price <= 0) {
        throw new ValidationError("Price must be a positive number");
      }
      updates.price = data.price;
    }

    if (data.stock !== undefined) {
      if (typeof data.stock !== "number" || data.stock < 0) {
        throw new ValidationError("Stock must be a non-negative number");
      }
      updates.stock = data.stock;
    }

    if (data.category !== undefined) {
      if (typeof data.category !== "string") {
        throw new ValidationError("Category must be a string");
      }
      updates.category = data.category.trim();
    }

    if (data.status !== undefined) {
      if (!Object.values(ProductStatus).includes(data.status)) {
        throw new ValidationError("Invalid product status");
      }
      updates.status = data.status;
    }

    if (data.images !== undefined && Array.isArray(data.images)) {
      updates.images = data.images;
    }

    return updates;
  }

  static validatePaginationQuery(query: any): PaginationQuery {
    return {
      page: Math.max(1, parseInt(query.page) || 1),
      limit: Math.min(100, Math.max(1, parseInt(query.limit) || 10)),
      sortBy: query.sortBy || "createdAt",
      sortOrder: query.sortOrder === "asc" ? "asc" : "desc",
      search: query.search?.trim(),
      category: query.category?.trim(),
      status: query.status as ProductStatus,
    };
  }
}

// ============================================================================
// Service Layer (Business Logic)
// ============================================================================

export class ProductService {
  private static products: IProduct[] = []; // Mock database

  static async createProduct(
    vendorId: string,
    data: CreateProductDto
  ): Promise<IProduct> {
    const product: IProduct = {
      id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      vendorId,
      ...data,
      status:
        data.stock > 0 ? ProductStatus.ACTIVE : ProductStatus.OUT_OF_STOCK,
      images: data.images || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.products.push(product);
    return product;
  }

  static async getProducts(
    filters: PaginationQuery & { vendorId?: string }
  ): Promise<{
    products: IProduct[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    let filteredProducts = [...this.products];

    // Filter by vendor
    if (filters.vendorId) {
      filteredProducts = filteredProducts.filter(
        (p) => p.vendorId === filters.vendorId
      );
    }

    // Filter by category
    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    // Filter by status
    if (filters.status) {
      filteredProducts = filteredProducts.filter(
        (p) => p.status === filters.status
      );
    }

    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    filteredProducts.sort((a, b) => {
      const aVal = a[filters.sortBy as keyof IProduct] as any;
      const bVal = b[filters.sortBy as keyof IProduct] as any;

      if (filters.sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    // Pagination
    const total = filteredProducts.length;
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIdx = (page - 1) * limit;
    const products = filteredProducts.slice(startIdx, startIdx + limit);

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getProductById(id: string): Promise<IProduct | null> {
    return this.products.find((p) => p.id === id) || null;
  }

  static async updateProduct(
    id: string,
    updates: UpdateProductDto
  ): Promise<IProduct | null> {
    const idx = this.products.findIndex((p) => p.id === id);

    if (idx === -1) return null;

    this.products[idx] = {
      ...this.products[idx],
      ...updates,
      updatedAt: new Date(),
    };

    return this.products[idx];
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const idx = this.products.findIndex((p) => p.id === id);

    if (idx === -1) return false;

    this.products.splice(idx, 1);
    return true;
  }
}

// ============================================================================
// Controllers
// ============================================================================

export class ProductController {
  /**
   * Create a new product (Vendor only)
   * POST /api/vendors/products
   */
  static createProduct = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const user = req.user!;
      const validatedData = ProductValidator.validateCreateProduct(req.body);

      const product = await ProductService.createProduct(
        user.vendorId!,
        validatedData
      );

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    }
  );

  /**
   * Get vendor's own products (Vendor only)
   * GET /api/vendors/products
   */
  static getVendorProducts = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const user = req.user!;
      const query = ProductValidator.validatePaginationQuery(req.query);

      const result = await ProductService.getProducts({
        ...query,
        vendorId: user.vendorId!,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );

  /**
   * Get all products (Customer & Public access)
   * GET /api/products
   * This endpoint is accessible by customers to browse all vendor products
   */
  static getAllProducts = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const query = ProductValidator.validatePaginationQuery(req.query);

      // Filter only active products for customers
      const result = await ProductService.getProducts({
        ...query,
        status: ProductStatus.ACTIVE,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );

  /**
   * Get single product by ID
   * GET /api/products/:id (Customer access)
   * GET /api/vendors/products/:id (Vendor access - their own products only)
   */
  static getProductById = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const { id } = req.params;
      const user = req.user;

      const product = await ProductService.getProductById(id);

      if (!product) {
        throw new NotFoundError("Product not found");
      }

      // If customer, only show active products
      if (
        user?.role === UserRole.CUSTOMER &&
        product.status !== ProductStatus.ACTIVE
      ) {
        throw new NotFoundError("Product not available");
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    }
  );

  /**
   * Update product (Vendor only - their own products)
   * PATCH /api/vendors/products/:id
   */
  static updateProduct = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const { id } = req.params;
      const validatedData = ProductValidator.validateUpdateProduct(req.body);

      const product = await ProductService.updateProduct(id, validatedData);

      if (!product) {
        throw new NotFoundError("Product not found");
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    }
  );

  /**
   * Delete product (Vendor only - their own products)
   * DELETE /api/vendors/products/:id
   */
  static deleteProduct = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const { id } = req.params;

      const deleted = await ProductService.deleteProduct(id);

      if (!deleted) {
        throw new NotFoundError("Product not found");
      }

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    }
  );
}

// ============================================================================
// Routes Setup
// ============================================================================

import express, { Router } from "express";

const router: Router = express.Router();

// ============================================================================
// VENDOR ROUTES (Protected - Vendor only can manage their own products)
// ============================================================================

const vendorRouter = Router();

vendorRouter.post(
  "/products",
  authenticate,
  authorize(UserRole.VENDOR),
  ProductController.createProduct
);

vendorRouter.get(
  "/products",
  authenticate,
  authorize(UserRole.VENDOR),
  ProductController.getVendorProducts
);

vendorRouter.get(
  "/products/:id",
  authenticate,
  authorize(UserRole.VENDOR),
  verifyVendorOwnership,
  ProductController.getProductById
);

vendorRouter.patch(
  "/products/:id",
  authenticate,
  authorize(UserRole.VENDOR),
  verifyVendorOwnership,
  ProductController.updateProduct
);

vendorRouter.delete(
  "/products/:id",
  authenticate,
  authorize(UserRole.VENDOR),
  verifyVendorOwnership,
  ProductController.deleteProduct
);

// ============================================================================
// PUBLIC/CUSTOMER ROUTES (Browse all products)
// ============================================================================

const publicRouter = Router();

// Public product listing (can be accessed with or without authentication)
publicRouter.get("/products", ProductController.getAllProducts);

// Public single product view
publicRouter.get("/products/:id", ProductController.getProductById);

// ============================================================================
// Main Router Export
// ============================================================================

router.use("/vendors", vendorRouter);
router.use("/", publicRouter);

export { router as productRoutes };

// ============================================================================
// App Setup Example
// ============================================================================

export function setupApp() {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api", productRoutes);

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}

// Mock JWT verification (replace with actual implementation)
function mockJWTVerify(token: string): IUser {
  // In production, use jsonwebtoken library
  // This is just for demonstration
  if (token === "vendor-token") {
    return { id: "vendor1", role: UserRole.VENDOR, vendorId: "vendor1" };
  }
  if (token === "customer-token") {
    return { id: "customer1", role: UserRole.CUSTOMER };
  }
  throw new Error("Invalid token");
}

// ============================================================================
// Usage Example
// ============================================================================

/*
const app = setupApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
