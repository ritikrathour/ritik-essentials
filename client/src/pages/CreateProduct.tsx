import React, { useState, useCallback, useMemo } from "react";
import {
  Upload,
  X,
  Package,
  Percent,
  Calendar,
  AlertCircle,
  Check,
  IndianRupee,
} from "lucide-react";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGES } from "../utils/constant";
import { IProductFormData } from "../utils/Types/Product.types";
import { Button } from "../components/ui/Button";
import Input from "../components/Input";
import SelectField from "../components/SelectField";
import { useImageUpload } from "../hooks/useImageUpload";
import { useCreateProductValidation } from "../hooks/Validationhooks/useCreateProductValidation";
import { ProductApi } from "../services/Product.service";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { RootState } from "../redux-store/Store";
import SelectCategory from "../components/ui/SelectCategory";

enum ProductUnit {
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

const INITIAL_FORM_STATE: IProductFormData = {
  name: "",
  category: "",
  price: "",
  originalPrice: "",
  unit: "",
  stock: "",
  sku: "",
  description: "",
  discount: "",
  expiryDate: "",
  organic: false,
  featured: false,
  brand: "",
  tags: [],
};
// Main Component
const CreateProduct = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] =
    useState<IProductFormData>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraftting, setIsDraftting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    images,
    dragActive,
    setDragActive,
    uploadError,
    handleFiles,
    removeImage,
    setPrimaryImage,
  } = useImageUpload();
  const units = useMemo(() => Object.values(ProductUnit), []);
  const [imageError, setImageError] = useState<string>("");
  const { errors, validate, setErrors } = useCreateProductValidation(formData);
  const [category, setCategory] = useState("");
  // fetched category from server
  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors, setErrors]
  );

  const handleDrag = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    },
    [setDragActive]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles, setDragActive]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setImageError("");
      if (e.target.files) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );
  // handle submit product
  const handleSubmit = useCallback(
    async (isDraft: boolean = false) => {
      if (validate().IsError) {
        return;
      }
      if (images.length === 0) {
        setImageError("Please upload at least one product image");
        return;
      }
      if (isDraft) {
        setIsDraftting(true);
      } else {
        setSubmitSuccess(true);
      }
      try {
        const productData = {
          ...formData,
          vendor: user && user?._id,
          price: Number(formData.price),
          stock: Number(formData.stock),
          category: category || formData.category,
          images: images.map((img) => ({
            image: img.file.name,
            isPrimary: img.isPrimary,
          })),
          status: isDraft ? "draft" : "published",
        };
        setIsSubmitting(true);
        const response = await ProductApi.createProduct(
          "/product",
          productData
        );
        toast.success(
          response?.data?.message || "Product Created Successfully!"
        );
        console.log(response);
        setTimeout(() => {
          setFormData(INITIAL_FORM_STATE);
        }, 1000);
      } catch (error) {
        console.error("Error submitting product:", error);
        toast.error(
          axios.isAxiosError(error)
            ? error?.response?.data?.message || error?.response?.data?.error
            : "Product not Created!"
        );
      } finally {
        setIsDraftting(false);
        setIsSubmitting(false);
      }
    },
    [formData, images, validate, category]
  );
  const calculatedPrice = useMemo(() => {
    const price = parseFloat(formData.price) || 0;
    const discount = parseFloat(formData.discount) || 0;
    return price - (price * discount) / 100;
  }, [formData.price, formData.discount]);

  return (
    <section className="min-h-screen px-4 md:px-10 p-2">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-6">
          <div className="flex flex-col gap-2 md:flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-50 border border-[#c4c4c4] rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-[#febd2f]" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#173334]">
                  Add New Product
                </h1>
                <p className="text-gray-500 text-xs md:text-sm">
                  Fill in the details to list your product
                </p>
              </div>
            </div>
            {submitSuccess && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                <Check className="w-5 h-5" />
                <span className="font-medium">Product saved successfully!</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {/* Product Images */}
          <div className="bg-white rounded-lg shadow-sm p-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Product Images
            </h2>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                dragActive ? "border-green-500 bg-green-50" : "border-[#c4c4c4]"
              } ${
                images.length >= MAX_IMAGES
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-1">
                Drag and drop images here
              </p>
              <p className="text-gray-500 text-sm mb-4">or</p>
              <label className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors">
                Browse Files
                <input
                  type="file"
                  multiple={true}
                  accept={ALLOWED_IMAGE_TYPES.join(",")}
                  onChange={handleFileInput}
                  className="hidden"
                  disabled={images.length >= MAX_IMAGES}
                />
              </label>
              <p className="text-gray-400 text-xs mt-3">
                Max {MAX_IMAGES} images, PNG or JPG (up to 5MB each)
              </p>
            </div>

            {uploadError && (
              <div className="flex items-center gap-2 mt-3 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{uploadError}</span>
              </div>
            )}

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                {images.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.url}
                      alt="Product"
                      className={`w-full h-24 object-cover rounded-lg border-2 ${
                        img.isPrimary ? "border-green-500" : "border-[#c4c4c4]"
                      } cursor-pointer transition-all`}
                      onClick={() => setPrimaryImage(img.id)}
                    />
                    {img.isPrimary && (
                      <span className="absolute top-1 left-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                        Primary
                      </span>
                    )}
                    <Button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      variant="danger"
                      className="absolute! top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {images.length > 0 && (
              <p className="text-gray-500 text-xs mt-2">
                Click on an image to set it as primary
              </p>
            )}
            {imageError && (
              <div className="mt-1 flex gap-1.5 items-center text-sm text-red-600">
                <AlertCircle className="w-3 h-3" />
                {imageError}
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-2 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Details
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Product Name"
                  onchange={handleInputChange}
                  name="name"
                  value={formData.name}
                  type="text"
                  placeholder="e.g., Organic Red Apples"
                  required
                  error={errors.name}
                />
              </div>
              <SelectCategory
                setCategory={setCategory}
                onchange={handleInputChange}
              />
              <Input
                label="SKU"
                name="sku"
                type="text"
                required
                value={formData.sku}
                onchange={handleInputChange}
                placeholder="e.g., APL-ORG-001"
                error={errors.sku}
              />
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
                  value={formData.description}
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
            </form>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white rounded-lg shadow-sm p-2 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onchange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
                error={errors.price}
                icon={<IndianRupee className="w-5 h-5" />}
              />

              <Input
                label="original Price"
                name="originalPrice"
                type="number"
                required
                value={formData.originalPrice}
                onchange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                error={errors.originalPrice}
                icon={<IndianRupee className="w-5 h-5" />}
              />

              <Input
                label="Discount %"
                name="discount"
                type="number"
                value={formData.discount}
                onchange={handleInputChange}
                placeholder="0"
                min="0"
                max="100"
                error={errors.discount}
                icon={<Percent className="w-5 h-5" />}
              />

              {formData.price && formData.discount && (
                <div className="md:col-span-3 bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    Final Price:{" "}
                    <span className="font-semibold text-green-700">
                      ₹ {calculatedPrice.toFixed(2)}
                    </span>
                  </p>
                </div>
              )}

              <Input
                label="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onchange={handleInputChange}
                placeholder="0"
                min="0"
                required
                error={errors.stock}
              />

              <SelectField
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                options={units}
                required
                error={errors.unit}
              />

              <Input
                label="Expiry Date"
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onchange={handleInputChange}
                error={errors.expiryDate}
                icon={<Calendar className="w-5 h-5" />}
              />
              <Input
                label="Brand"
                name="brand"
                type="text"
                value={formData.brand}
                onchange={handleInputChange}
                error={errors.brand}
                placeholder="e.g., Milk Made"
              />
            </div>
          </div>

          {/* Additional Options */}
          <div className="bg-white rounded-lg shadow-sm p-2 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Options
            </h2>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="organic"
                  checked={formData.organic}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded "
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Organic Product
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Featured Product
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex md:flex-row flex-col-reverse gap-4">
            <Button
              variant="secondary"
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={isDraftting}
              className="flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDraftting ? "Saving..." : "Save as Draft"}
            </Button>
            <Button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={isSubmitting}
              className="flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Publishing..." : "Publish Product"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;
