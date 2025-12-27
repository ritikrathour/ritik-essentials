import { Edit, Eye, EyeOff, MoreVertical, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { IVendorProucts } from "../../utils/Types/Vendor.types";
import { OptimizedImage } from "../ui/OptimizedImage";
import { Link } from "react-router-dom";
interface IProductProps {
  product: IVendorProucts;
  onStatusToggle: (id: string, status: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
export const ProductRow: React.FC<IProductProps> = ({
  product,
  onStatusToggle,
  onEdit,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (stock < 10)
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { label: "In Stock", color: "bg-green-100 text-green-800" };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <Link to={`/products/${product?._id}`}>
            <OptimizedImage
              className="w-[50px]! h-[55px]! rounded-lg border border-[#c4c4c4]"
              alt={product.sku}
              src="../public/assets/cola.avif"
            />
          </Link>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{product?.name}</p>
            <p className="text-sm text-gray-500">{product?.sku}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-900">{product?.category}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-900">
          ${product?.price?.toFixed(2)}
        </span>
      </td>

      <td className="px-6 py-4">
        <div>
          <span className="text-sm font-medium text-gray-900">
            {product?.stock}
          </span>
          <span
            className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}
          >
            {stockStatus?.label}
          </span>
        </div>
      </td>

      <td className="px-6 py-4">
        <button
          onClick={() =>
            onStatusToggle(
              product._id,
              product.status === "published" ? "draft" : "published"
            )
          }
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
            product?.status === "published"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {product?.status === "published" ? (
            <Eye className="w-3 h-3" />
          ) : (
            <EyeOff className="w-3 h-3" />
          )}
          {product?.status === "published" ? "Published" : "Draft"}
        </button>
      </td>

      <td className="px-6 py-4">
        <div>
          <div className="text-sm font-medium text-gray-900">
            {product?.sales} units
          </div>
          <div className="text-sm text-gray-500">
            ${product?.revenue?.toFixed(2)}
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={() => {
                  onEdit(product._id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Product
              </button>
              <button
                onClick={() => {
                  onDelete(product._id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Product
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
