import React, { useState, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { ProductFilters } from "../utils/constant";
import ProductFilterItem from "../components/products/ProductFilter";
import CategoryNavigation from "../components/products/CategoryNavigation";
import ProductBestCard from "../components/products/ProductBestCard";
import Pagination from "../components/Pagination";
import { useProduct } from "../hooks/useProduct";
import { useLocation } from "react-router-dom";
import FilterAccordion from "../components/products/FilterAccordian";
type SortOption = "popularity" | "price-low" | "price-high" | "newest";

const Products = () => {
  const location = useLocation();
  // get products
  const { products, isLoading, error, isError, refetch } =
    useProduct().getProduct(
      location.search ? location.search : "products",
      `/products${location.search}`
    );

  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  //   const sortedProducts = useMemo(() => {
  //     let sorted = [...products];
  //
  //     switch (sortBy) {
  //       case "price-low":
  //         sorted.sort((a, b) => a.price - b.price);
  //         break;
  //       case "price-high":
  //         sorted.sort((a, b) => b.price - a.price);
  //         break;
  //       case "newest":
  //         sorted.reverse();
  //         break;
  //       default:
  //         break;
  //     }
  //
  //     if (searchQuery) {
  //       sorted = sorted.filter(
  //         (p) =>
  //           p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //           p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  //       );
  //     }
  //
  //     return sorted;
  //   }, [sortBy, searchQuery]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  console.log(location.search);

  return (
    <section className="md:px-10 px-2 min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm overflow-scroll">
        <CategoryNavigation />
      </nav>

      <div className="py-6">
        <div className="flex gap-2 p-2">
          {/* Sidebar Filters */}
          {/* <aside
            className={`${
              mobileFiltersOpen ? "fixed inset-0 z-50 bg-white" : "hidden"
            } lg:block lg:w-64 lg:flex-shrink-0`}
          >
            <div className="bg-white rounded-lg shadow-sm p-4 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h3 className="text-lg font-bold">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <h3 className="text-lg font-bold mb-4 hidden lg:block">
                Filters
              </h3>

              <div className="space-y-4">
                {ProductFilters.map((filter) => (
                  <React.Fragment key={filter.id}>
                    <ProductFilterItem filter={filter} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </aside> */}
          <FilterAccordion
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />
          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-2 md:p-4 mb-4">
              <div className="flex items-center justify-between flex-wrap gap-4 ">
                <div>
                  <h1 className="text-xl font-bold capitalize">
                    {(location.search && location.search.split("=")[1]) ||
                      "All Products"}
                  </h1>
                  <p className="text-sm text-gray-600">
                    Showing {products?.result?.pagination?.page}-
                    {products?.result?.pagination?.limit} products of{" "}
                    {products?.result?.pagination?.total} products
                  </p>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Menu className="w-4 h-4" />
                    Filters
                  </button>
                  <div className="flex items-center gap-2 text-sm flex-wrap border border-[#c4c4c4] p-1.5 rounded-md">
                    <span className="font-medium">Sort By</span>
                    <select name="sort-by" id="" className="outline-0">
                      <option value="price-lth">Price --Low to high</option>
                      <option value="price-htl">Price --High to Low</option>
                      <option value="newest-fisrt">Newest First</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
              {products?.result?.data?.map((product: any) => (
                <React.Fragment key={product?._id}>
                  <ProductBestCard product={product} isButton={false} />
                </React.Fragment>
              ))}
            </div>

            {/* Pagination */}
            <Pagination />
          </main>
        </div>
      </div>
    </section>
  );
};

export default Products;

{
  /* <button
                      onClick={() => setSortBy("popularity")}
                      className={`px-3 py-1 rounded ${
                        sortBy === "popularity"
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      Popularity
                    </button>
                    <button
                      onClick={() => setSortBy("price-low")}
                      className={`px-3 py-1 rounded whitespace-nowrap ${
                        sortBy === "price-low"
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      Price -- Low to High
                    </button>
                    <button
                      onClick={() => setSortBy("price-high")}
                      className={`px-3 py-1 rounded whitespace-nowrap ${
                        sortBy === "price-high"
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      Price -- High to Low
                    </button>
                    <button
                      onClick={() => setSortBy("newest")}
                      className={`px-3 py-1 rounded whitespace-nowrap ${
                        sortBy === "newest"
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      Newest First
                    </button> */
}
