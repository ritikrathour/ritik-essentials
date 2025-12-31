import React, { useState, useEffect } from "react";
import { AlertCircle, Check, Loader2, Upload, X } from "lucide-react";
import Input from "../../components/Input";
import SelectField from "../../components/SelectField";
import { Button } from "../../components/ui/Button";
import { useProduct } from "../../hooks/useProduct";
import { useParams } from "react-router-dom";
import ErrorUI from "../../components/ErrorsUI/ErrorUI";

// Types
interface IProduct {
  _id: string;
  vendor: string;
  name: string;
  description: string;
  originalPrice?: number;
  price: number;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  images: string[];
  sales?: number;
  tags: string[];
  status: "publised" | "draft" | "out_of_stock";
  weight?: number;
  unit: string;
  featured?: boolean;
  organic?: boolean;
  discount: number;
  expiryDiscount: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  rating: {
    average: number;
    count: number;
  };
}

interface FormErrors {
  [key: string]: string;
}

interface ApiResponse {
  success: boolean;
  data?: IProduct;
  error?: string;
}

// API Service
class ProductService {
  private static baseUrl = "/api/products";

  static async getProduct(id: string): Promise<IProduct> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    const data = await response.json();
    return data.data;
  }

  static async updateProduct(
    id: string,
    product: Partial<IProduct>
  ): Promise<ApiResponse> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return response.json();
  }

  static async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.url;
  }
}

// Validation
class ProductValidator {
  static validate(product: Partial<IProduct>): FormErrors {
    const errors: FormErrors = {};

    if (!product.name?.trim()) errors.name = "Product name is required";
    if (!product.description?.trim())
      errors.description = "Description is required";
    if (!product.price || product.price <= 0)
      errors.price = "Price must be greater than 0";
    if (!product.sku?.trim()) errors.sku = "SKU is required";
    if (product.stock === undefined || product.stock < 0)
      errors.stock = "Stock must be 0 or greater";
    if (!product.category?.trim()) errors.category = "Category is required";
    if (!product.brand) errors.brand = "Brand is required";
    if (!product.unit?.trim()) errors.unit = "Unit is required";

    if (
      product.originalPrice &&
      product.price &&
      product.originalPrice < product.price
    ) {
      errors.originalPrice =
        "Original price must be greater than or equal to price";
    }

    if (product.discount && (product.discount < 0 || product.discount > 100)) {
      errors.discount = "Discount must be between 0 and 100";
    }

    if (product.images && product.images.length === 0) {
      errors.images = "At least one image is required";
    }

    return errors;
  }
}

// Main Component
const VendorUpdateProduct: React.FC = () => {
  const productId = "67890"; // In real app, get from URL params
  const [product, setProduct] = useState<Partial<IProduct>>({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "",
    brand: "",
    sku: "",
    stock: 0,
    images: [],
    tags: [],
    status: "draft",
    unit: "kg",
    discount: 0,
    expiryDiscount: "",
    featured: false,
    organic: false,
    dimensions: { length: 0, width: 0, height: 0 },
    rating: { average: 0, count: 0 },
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [tagInput, setTagInput] = useState("");
  const params = useParams();
  if (!params?.productId) {
    throw Error("Product Id is required");
  }
  const { vendorProduct, error, isError, isLoading, refetch } =
    useProduct().getVendorProduct(params?.productId);

  // useEffect(() => {
  //   fetchProduct();
  // }, []);

  // const fetchProduct = async () => {
  //   try {
  //     setFetchLoading(true);
  //     // Mock data for demo
  //     const mockProduct: IProduct = {
  //       _id: productId,
  //       vendor: "507f1f77bcf86cd799439011",
  //       name: "Organic Quinoa",
  //       description: "Premium organic quinoa sourced from sustainable farms",
  //       originalPrice: 29.99,
  //       price: 24.99,
  //       category: "Grains",
  //       brand: "507f1f77bcf86cd799439012",
  //       sku: "ORG-QUI-001",
  //       stock: 150,
  //       images: [
  //         "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
  //       ],
  //       sales: 243,
  //       tags: ["organic", "gluten-free", "protein-rich"],
  //       status: "publised",
  //       weight: 500,
  //       unit: "grams",
  //       featured: true,
  //       organic: true,
  //       discount: 15,
  //       expiryDiscount: "2025-12-31",
  //       dimensions: { length: 15, width: 10, height: 5 },
  //       rating: { average: 4.5, count: 89 },
  //     };
  //     setProduct(mockProduct);
  //   } catch (error) {
  //     showNotification("error", "Failed to load product");
  //   } finally {
  //     setFetchLoading(false);
  //   }
  // };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setProduct((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value) || 0
          : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDimensionChange = (
    field: "length" | "width" | "height",
    value: string
  ) => {
    setProduct((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions!,
        [field]: parseFloat(value) || 0,
      },
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showNotification("error", "Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification("error", "Image size must be less than 5MB");
      return;
    }

    try {
      setImageUploading(true);
      // Mock upload
      const mockUrl = URL.createObjectURL(file);
      setProduct((prev) => ({
        ...prev,
        images: [...(prev.images || []), mockUrl],
      }));
      showNotification("success", "Image uploaded successfully");
    } catch (error) {
      showNotification("error", "Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !product.tags?.includes(tagInput.trim())) {
      setProduct((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = ProductValidator.validate(product);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showNotification("error", "Please fix all errors before submitting");
      return;
    }

    try {
      setLoading(true);
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showNotification("success", "Product updated successfully!");
    } catch (error) {
      showNotification("error", "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }
  if (isError) {
    return <ErrorUI error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen px-4 md:px-10 p-2">
      <div className="max-w-7xl mx-auto">
        {notification && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              notification.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {notification.type === "success" ? (
              <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            )}
            <span className="flex-1">{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Update Product
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Update product information and details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="name"
                  label="Product name"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={vendorProduct?.name}
                  error={errors?.name}
                />
                <Input
                  name="sku"
                  label="SKU"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={vendorProduct?.sku}
                  error={errors?.sku}
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex gap-1">
                  <label
                    htmlFor="text-area"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <span className="text-red-500">*</span>
                </div>
                <textarea
                  id="text-area"
                  name="description"
                  required
                  value={vendorProduct?.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your product, its quality, origin, and benefits..."
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 outline-none resize-none"
                />
                {errors.description && (
                  <div className="mt-1 flex gap-1.5 items-center text-sm text-red-600">
                    <AlertCircle className="w-3 h-3" />
                    {errors.description}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="category"
                  label="Category"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={vendorProduct?.category}
                  error={errors?.category}
                />
                <Input
                  name="brand"
                  label="Brand"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={vendorProduct?.brand}
                  error={errors?.brand}
                />
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">
                Pricing & Inventory
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  name="price"
                  label="Price"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={vendorProduct?.price}
                  error={errors?.price}
                />
                <Input
                  name="original_price"
                  label="Original Price"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={vendorProduct?.originalPrice}
                  error={errors?.originalPrice}
                />

                <Input
                  name="stock"
                  label="Stock"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={vendorProduct?.stock}
                  error={errors?.strok}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  name="discount"
                  label="Discount"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={vendorProduct?.discount}
                  error={errors?.discount}
                />
                <Input
                  name="expiryDiscount"
                  label="Expiry Discount"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={vendorProduct?.expiryDate}
                  error={errors?.expiryDiscount}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={vendorProduct?.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="publised">Published</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Product Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                  label="Unit"
                  name="unit"
                  value={vendorProduct?.unit || "Pack"}
                  onChange={handleInputChange}
                  options={[]}
                  required
                  error={errors.unit}
                />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={vendorProduct?.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Featured Product
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="organic"
                    checked={vendorProduct?.organic}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Organic
                  </span>
                </label>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">
                Product Images
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {vendorProduct?.images &&
                  vendorProduct?.images?.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`Product ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                <label className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={imageUploading}
                  />
                </label>
              </div>
              {imageUploading && (
                <p className="text-sm text-blue-600">Uploading image...</p>
              )}
              {errors.images && (
                <p className="text-red-600 text-sm">{errors.images}</p>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-gray-900">Tags</h2>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                  placeholder="Add a tag"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button variant="outline" type="button" onClick={handleAddTag}>
                  Add Tag
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {vendorProduct?.tags?.map((tag: any, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      // onClick={() => removeTatagg()}
                      className="hover:text-blue-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Button type="submit" className="flex-1">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Product"
                )}
              </Button>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorUpdateProduct;
