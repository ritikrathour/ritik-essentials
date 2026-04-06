import { useMemo, useState } from "react";
import { Package } from "lucide-react";
import Loader from "../../components/Loader";
import { ProductRow } from "../../components/vendor/ProductRow";
import { FilterBar } from "../../components/FilterBar";
import ErrorUI from "../../components/ErrorsUI/ErrorUI";
import { useProduct } from "../../hooks/useProduct";
import { IPROD, IProdStatus } from "../../utils/Types/Product.types";
import Pagination from "../../components/Pagination";

// Main Component
const VendorProducts = () => {
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    category: "all",
  });
  const {
    data: products,
    error,
    isError,
    isLoading,
    refetch,
  } = useProduct().getVendorProducts(
    `/vendor-products?page=${paginationPage}`,
    true,
    paginationPage,
  );
  const { mutate, isPending } = useProduct().deleteVendorProduct();
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useProduct().updateProductStatus();

  // Event Handlers
  const handleStatusToggle = async (productId: string, status: IProdStatus) => {
    updateStatus({ productId, status });
  };
  const handleDelete = (productId: string) => {
    mutate(productId);
  };
  const filteredProducts = useMemo(() => {
    return (
      products?.data &&
      products?.data?.filter((product: IPROD) => {
        return (
          (filters.search === "" ||
            product?.name
              ?.toLowerCase()
              ?.includes(filters?.search?.toLowerCase())) &&
          (filters?.status === "all" || product?.status === filters?.status) &&
          (filters?.category === "all" ||
            product?.category === filters?.category)
        );
      })
    );
  }, [products, filters]);
  if (isError) {
    return (
      <>
        <ErrorUI error={error} onRetry={refetch} />
      </>
    );
  }
  if (isLoading) {
    return <Loader style="h-[80vh]" />;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 px-3">
          <h1 className="text-lg sm:text-3xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-600 mt-1 text-sm ">
            Manage your product catalog and inventory
          </p>
        </div>
        {/* Filter Bar */}
        <FilterBar filters={filters} onFilterChange={setFilters} />

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow border border-gray-200 pb-4">
          {isLoading ? (
            <div className="p-12 text-center">
              <Loader />
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts?.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No products found</p>
            </div>
          ) : (
            <>
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
                    {filteredProducts?.map((product: any) => {
                      return (
                        <ProductRow
                          key={product?._id}
                          product={product}
                          onStatusToggle={handleStatusToggle}
                          onDelete={handleDelete}
                          isPending={isPending}
                          isUpdatingStatus={isUpdatingStatus}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {products?.pagination && products?.pagination?.total > 6 && (
                <Pagination
                  page={paginationPage}
                  pages={products?.pagination && products?.pagination?.pages}
                  setPage={setPaginationPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProducts;
