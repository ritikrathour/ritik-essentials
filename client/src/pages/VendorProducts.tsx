import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MoreVertical,
  TrendingUp,
  Package,
  AlertCircle,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import SelectCategory from "../components/ui/SelectCategory";
import { useProduct } from "../hooks/useProduct";
import Input from "../components/Input";

// Mock API Service Layer
const ProductService = {
  async fetchProducts(vendorId: any, filters = {}) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock data - in production, this would be actual API calls
    const mockProducts = [
      {
        id: "prod_001",
        name: "Wireless Bluetooth Headphones",
        sku: "WBH-2024-001",
        category: "Electronics",
        price: 79.99,
        stock: 45,
        status: "published",
        sales: 234,
        revenue: 18713.66,
        imageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
        createdAt: "2024-01-15",
        updatedAt: "2024-11-20",
      },
      {
        id: "prod_002",
        name: "Organic Cotton T-Shirt",
        sku: "OCT-2024-002",
        category: "Apparel",
        price: 24.99,
        stock: 120,
        status: "published",
        sales: 456,
        revenue: 11395.44,
        imageUrl:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
        createdAt: "2024-02-10",
        updatedAt: "2024-11-22",
      },
      {
        id: "prod_003",
        name: "Smart Fitness Tracker",
        sku: "SFT-2024-003",
        category: "Electronics",
        price: 129.99,
        stock: 8,
        status: "published",
        sales: 89,
        revenue: 11569.11,
        imageUrl:
          "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&h=100&fit=crop",
        createdAt: "2024-03-05",
        updatedAt: "2024-11-18",
      },
      {
        id: "prod_004",
        name: "Leather Messenger Bag",
        sku: "LMB-2024-004",
        category: "Accessories",
        price: 89.99,
        stock: 32,
        status: "draft",
        sales: 0,
        revenue: 0,
        imageUrl:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop",
        createdAt: "2024-11-01",
        updatedAt: "2024-11-25",
      },
      {
        id: "prod_005",
        name: "Stainless Steel Water Bottle",
        sku: "SSWB-2024-005",
        category: "Home & Kitchen",
        price: 19.99,
        stock: 200,
        status: "published",
        sales: 678,
        revenue: 13551.22,
        imageUrl:
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop",
        createdAt: "2024-01-20",
        updatedAt: "2024-11-23",
      },
      {
        id: "prod_006",
        name: "Yoga Mat Premium",
        sku: "YMP-2024-006",
        category: "Sports",
        price: 39.99,
        stock: 0,
        status: "published",
        sales: 123,
        revenue: 4918.77,
        imageUrl:
          "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop",
        createdAt: "2024-04-12",
        updatedAt: "2024-11-15",
      },
      {
        id: "prod_007",
        name: "Ceramic Coffee Mug Set",
        sku: "CCMS-2024-007",
        category: "Home & Kitchen",
        price: 34.99,
        stock: 67,
        status: "draft",
        sales: 0,
        revenue: 0,
        imageUrl:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&h=100&fit=crop",
        createdAt: "2024-11-20",
        updatedAt: "2024-11-28",
      },
      {
        id: "prod_008",
        name: "Desk Lamp LED",
        sku: "DLL-2024-008",
        category: "Home & Office",
        price: 45.99,
        stock: 54,
        status: "published",
        sales: 167,
        revenue: 7680.33,
        imageUrl:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop",
        createdAt: "2024-05-08",
        updatedAt: "2024-11-21",
      },
    ];

    // Apply filters
    let filtered = [...mockProducts];

    //     if (filters.status && filters.status !== "all") {
    //       filtered = filtered.filter((p) => p.status === filters.status);
    //     }
    //
    //     if (filters.category && filters.category !== "all") {
    //       filtered = filtered.filter((p) => p.category === filters.category);
    //     }
    //
    //     if (filters.search) {
    //       const search = filters.search.toLowerCase();
    //       filtered = filtered.filter(
    //         (p) =>
    //           p.name.toLowerCase().includes(search) ||
    //           p.sku.toLowerCase().includes(search)
    //       );
    //     }

    return { data: filtered, total: filtered.length };
  },

  async updateProductStatus(productId: any, status: any) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, productId, status };
  },

  async deleteProduct(productId: any) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, productId };
  },
};

// Custom Hooks
const useProducts = (vendorId: any, filters: any) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ProductService.fetchProducts(vendorId, filters);
      // setProducts(result.data);
    } catch (err) {
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [vendorId, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
};

// Presentational Components
const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        {trend && (
          <p
            className={`text-sm mt-2 flex items-center ${
              trend >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend >= 0 ? "+" : ""}
            {trend}% from last month
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const FilterBar = ({ filters, onFilterChange }: any) => {
  const { categories: data } = useProduct().getCategories("/categories");

  const makeCategories = useMemo(() => {
    return (
      data?.category &&
      data?.category?.map((cat: any) => {
        return [cat?.name].join(",");
      })
    );
  }, [data]);
  console.log(makeCategories);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          // label="fnaskdfjbs"
          name="Search"
          type="text"
          onchange={() => {}}
          required
          placeholder="Search..."
          value={""}
          icon={<Search />}
          iconPosition="right"
        />

        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={(e) =>
            onFilterChange({ ...filters, status: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <select
          id="categories"
          name="categories"
          value={filters.category}
          onChange={(e) =>
            onFilterChange({ ...filters, category: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          {makeCategories?.map((cat: any) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <Button type="button" variant="primary">
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </div>
    </div>
  );
};

const ProductRow = ({ product, onStatusToggle, onEdit, onDelete }: any) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStockStatus = (stock: any) => {
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
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {product.name}
            </div>
            <div className="text-sm text-gray-500">{product.sku}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-gray-900">{product.category}</span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-900">
          ${product.price.toFixed(2)}
        </span>
      </td>

      <td className="px-6 py-4">
        <div>
          <span className="text-sm font-medium text-gray-900">
            {product.stock}
          </span>
          <span
            className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}
          >
            {stockStatus.label}
          </span>
        </div>
      </td>

      <td className="px-6 py-4">
        <button
          onClick={() =>
            onStatusToggle(
              product.id,
              product.status === "published" ? "draft" : "published"
            )
          }
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
            product.status === "published"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {product.status === "published" ? (
            <Eye className="w-3 h-3" />
          ) : (
            <EyeOff className="w-3 h-3" />
          )}
          {product.status === "published" ? "Published" : "Draft"}
        </button>
      </td>

      <td className="px-6 py-4">
        <div>
          <div className="text-sm font-medium text-gray-900">
            {product.sales} units
          </div>
          <div className="text-sm text-gray-500">
            ${product.revenue.toFixed(2)}
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
                  onEdit(product.id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Product
              </button>
              <button
                onClick={() => {
                  onDelete(product.id);
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

// Main Component
const VendorProducts = () => {
  const vendorId = "vendor_123"; // In production, get from auth context

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    category: "all",
  });

  const { products, loading, error, refetch } = useProducts(vendorId, filters);

  // Derived state using useMemo for performance
  const stats = useMemo(() => {
    const published = products.filter((p: any) => p.status === "published");
    const totalRevenue = products.reduce((sum, p: any) => sum + p.revenue, 0);
    const totalSales = products.reduce((sum, p: any) => sum + p.sales, 0);
    const lowStock = products.filter(
      (p: any) => p.stock < 10 && p.stock > 0
    ).length;

    return {
      totalProducts: products.length,
      published: published.length,
      drafts: products.length - published.length,
      totalRevenue,
      totalSales,
      lowStock,
    };
  }, [products]);

  const categories = useMemo(
    () => [...new Set(products.map((p: any) => p.category))].sort(),
    [products]
  );

  // Event Handlers
  const handleStatusToggle = async (productId: any, newStatus: any) => {
    try {
      await ProductService.updateProductStatus(productId, newStatus);
      refetch();
    } catch (err) {
      console.error("Failed to update product status:", err);
    }
  };

  const handleEdit = (productId: any) => {
    console.log("Edit product:", productId);
    // Navigate to edit page or open modal
  };

  const handleDelete = async (productId: any) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await ProductService.deleteProduct(productId);
        refetch();
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
            Error Loading Products
          </h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={refetch}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your product catalog and inventory
          </p>
        </div>
        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          categories={categories}
        />

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {products.map((product: any) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      onStatusToggle={handleStatusToggle}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProducts;
