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
import Loader from "../../components/Loader";
import { ProductRow } from "../../components/vendor/ProductRow";
import { FilterBar } from "../../components/FilterBar";

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
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ProductService.fetchProducts(vendorId, filters);
      // const data = await ProductApi.getProductsByVendor(vendorId,"/products")
      setProducts(result?.data);
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

// Main Component
const VendorProducts = () => {
  const vendorId = "vendor_123"; // In production, get from auth context
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    category: "all",
  });

  const { products, loading, error, refetch } = useProducts(vendorId, filters);
  // Event Handlers
  const handleStatusToggle = async (productId: any, newStatus: any) => {};

  const handleEdit = (productId: any) => {
    // Navigate to edit page or open modal
  };

  const handleDelete = async (productId: any) => {};

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
        <FilterBar filters={filters} onFilterChange={setFilters} />

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          {loading ? (
            <div className="p-12 text-center">
              <Loader />
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
