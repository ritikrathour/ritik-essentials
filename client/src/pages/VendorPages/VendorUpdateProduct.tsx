import React, { useState, useEffect } from "react";
import { AlertCircle, Check, Loader2, Upload, X } from "lucide-react";
import Input from "../../components/Input";
import SelectField from "../../components/SelectField";
import { Button } from "../../components/ui/Button";
import { useProduct } from "../../hooks/useProduct";
import { useParams } from "react-router-dom";
import ErrorUI from "../../components/ErrorsUI/ErrorUI";
import { IProductFormData } from "../../utils/Types/Product.types";
import SelectCategory from "../../components/ui/SelectCategory";
import { useProductValidation } from "../../hooks/Validationhooks/useCreateProductValidation";

interface FormErrors {
  [key: string]: string;
}

// Main Component
const VendorUpdateProduct: React.FC = () => {
  const [formData, setFormData] = useState<IProductFormData>({
    name: "",
    description: "",
    price: "0",
    originalPrice: "0",
    category: "",
    brand: "",
    sku: "",
    stock: "0",
    images: [],
    tags: [],
    status: "draft",
    unit: "",
    discount: "0",
    expiryDate: "",
    featured: false,
    organic: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [tagInput, setTagInput] = useState("");
  const { productId } = useParams<{ productId: string }>();
  const { vendorProduct, error, isError, isLoading, refetch } =
    useProduct().getVendorProduct(productId!!);

  // populate form when loads the product
  useEffect(() => {
    if (vendorProduct) {
      setFormData({
        brand: vendorProduct?.brand,
        category: vendorProduct?.category,
        description: vendorProduct?.description,
        discount: vendorProduct?.discount,
        expiryDate: vendorProduct?.expiryDate,
        featured: vendorProduct?.featured,
        name: vendorProduct?.name,
        organic: vendorProduct?.organic,
        originalPrice: vendorProduct?.originalPrice,
        price: vendorProduct?.price,
        sku: vendorProduct?.sku,
        stock: vendorProduct?.stock,
        tags: vendorProduct?.tags,
        unit: vendorProduct?.unit,
        images: vendorProduct?.images,
        status: vendorProduct?.status,
      });
    }
  }, [vendorProduct]);
  const [category, setCategory] = useState(formData?.category || "");
  const {
    errors: validationError,
    setErrors: validataionSetError,
    validate,
  } = useProductValidation(formData);
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
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddTag = () => {
    if (formData?.tags?.length === 5) {
      setTagInput("");
      return;
    }
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        tags: (prev.tags ?? [])?.filter((tag) => tag !== tagToRemove),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate().IsError) {
      showNotification("error", "Please fix all errors before submitting");
      return;
    }

    console.log(formData);

    // try {
    //   setLoading(true);
    //   // Mock API call
    //   await new Promise((resolve) => setTimeout(resolve, 1500));
    //   showNotification("success", "Product updated successfully!");
    // } catch (error) {
    //   showNotification("error", "Failed to update product");
    // } finally {
    //   setLoading(false);
    // }
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
                  value={formData?.name}
                  error={errors?.name}
                />
                <Input
                  name="sku"
                  label="SKU"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={formData?.sku}
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
                  value={formData?.description}
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
                {/* <Input
                  name="category"
                  label="Category"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={formData?.category}
                  error={errors?.category}
                /> */}
                <SelectCategory
                  category={category}
                  setCategory={setCategory}
                  onchange={handleInputChange}
                  error={errors?.category}
                />
                <Input
                  name="brand"
                  label="Brand"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={formData?.brand}
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
                  value={formData?.price}
                  error={errors?.price}
                />
                <Input
                  name="originalPrice"
                  label="Original Price"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={formData?.originalPrice}
                  error={errors?.originalPrice}
                />

                <Input
                  name="stock"
                  label="Stock"
                  required
                  type="text"
                  onchange={handleInputChange}
                  value={formData?.stock}
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
                  value={formData?.discount}
                  error={errors?.discount}
                />
                <Input
                  name="expiryDate"
                  label="Expiry Discount"
                  required
                  type="date"
                  onchange={handleInputChange}
                  value={formData?.expiryDate}
                  error={errors?.expiryDiscount}
                />
                <SelectField
                  label="Status"
                  required
                  name="status"
                  options={["Draft", "Published", "Out of Stock"]}
                  value={formData?.status || ""}
                  error={errors?.status}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Product Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                  label="Unit"
                  name="unit"
                  value={formData?.unit || ""}
                  onChange={handleInputChange}
                  options={[
                    "kg",
                    "g",
                    "lb",
                    "oz",
                    "L",
                    "ml",
                    "piece",
                    "dozen",
                    "pack",
                  ]}
                  required
                  error={errors.unit}
                />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData?.featured}
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
                    checked={formData?.organic}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Organic
                  </span>
                </label>
              </div>
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
                  className="flex-1 px-3 py-2 border border-gray-300 focus:outline-1 outline-[black] rounded-[5px]"
                />
                <Button variant="outline" type="button" onClick={handleAddTag}>
                  Add Tag
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData?.tags?.map((tag: any, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
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
