import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { ChevronDown, X } from "lucide-react";
import { useProduct } from "../../hooks/useProduct";
import { Button } from "../ui/Button";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface FilterOption {
  label: string;
  value: string;
  count: number;
}

interface AccordionSection {
  id: string;
  title: string;
  defaultOpen?: boolean;
}

interface PriceRange {
  min: string;
  max: string;
}

interface FilterState {
  availability: string[];
  productTypes: string[];
  brands: string[];
  priceRange: PriceRange;
}

interface FilterAccordionProps {
  availabilityOptions?: FilterOption[];
  maxPrice?: number;
  onFilterChange?: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
  className?: string;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: any;
}

// ============================================================================
// UTILITIES
// ============================================================================

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const validatePrice = (value: string): boolean => {
  if (value === "") return true;
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0;
};

// ============================================================================
// ACCORDION SECTION COMPONENT
// ============================================================================

interface AccordionSectionProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  testId?: string;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  id,
  title,
  isOpen,
  onToggle,
  children,
  testId,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      className="border-b border-gray-200 last:border-b-0"
      data-testid={testId}
    >
      <button
        ref={buttonRef}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        type="button"
      >
        <span className="text-base sm:text-sm font-medium text-gray-700 uppercase tracking-wide text-left">
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ml-2 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        ref={contentRef}
        id={`accordion-content-${id}`}
        role="region"
        aria-labelledby={`accordion-button-${id}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 pb-6">{children}</div>
      </div>
    </div>
  );
};

// ============================================================================
// CHECKBOX FILTER COMPONENT
// ============================================================================

interface CheckboxFilterProps {
  options: FilterOption[];
  selected: string[];
  onChange: (value: string) => void;
  onReset: () => void;
  ariaLabel?: string;
}

const CheckboxFilter: React.FC<any> = ({
  options,
  selected,
  onChange,
  onReset,
  ariaLabel,
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500" aria-live="polite">
          {selected.length} selected
        </span>
        <button
          onClick={onReset}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selected.length === 0}
          aria-label={`Reset ${ariaLabel || "filters"}`}
        >
          Reset
        </button>
      </div>

      <div
        className={`space-y-3  overflow-hidden transition-all duration-200 ease-in-out ${
          showMore ? "max-h-[1000px]" : "max-h-[280px]"
        }`}
        role="group"
        aria-label={ariaLabel}
      >
        {options?.map((option: any) => {
          const isChecked = selected.includes(
            option?.name || option?.brand || option?.value
          );
          const checkboxId = `checkbox-${
            option?.name || option?.brand || option?.value
          }`;
          return (
            <label
              key={option?.name || option?.brand || option?.value}
              htmlFor={checkboxId}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center flex-1 min-w-0">
                <input
                  id={checkboxId}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() =>
                    onChange(option?.name || option?.brand || option?.value)
                  }
                  className="w-5 h-5 border-gray-300 rounded  flex-shrink-0"
                />
                <span className="ml-3 text-gray-700 group-hover:text-gray-900 truncate">
                  {option?.name || option?.brand}
                </span>
              </div>
              <span
                className="text-gray-400 text-sm ml-2 flex-shrink-0"
                aria-hidden="true"
              >
                20
              </span>
            </label>
          );
        })}
      </div>
      <Button
        type="button"
        variant="ghost"
        className="text-sm mt-1"
        onClick={() => {
          setShowMore((prev) => !prev);
        }}
      >
        {options?.length > 5 && (showMore ? "Show Less" : "Show More")}
      </Button>
    </>
  );
};

// ============================================================================
// PRICE RANGE FILTER COMPONENT
// ============================================================================

interface PriceRangeFilterProps {
  minPrice: string;
  maxPrice: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  onReset: () => void;
  maxPriceLimit: number;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  onReset,
  maxPriceLimit,
}) => {
  const [minError, setMinError] = useState("");
  const [maxError, setMaxError] = useState("");

  const handleMinChange = (value: string) => {
    if (!validatePrice(value)) {
      setMinError("Please enter a valid price");
      return;
    }
    setMinError("");
    onMinChange(value);
  };

  const handleMaxChange = (value: string) => {
    if (!validatePrice(value)) {
      setMaxError("Please enter a valid price");
      return;
    }
    setMaxError("");
    onMaxChange(value);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          The highest price is ${maxPriceLimit.toFixed(2)}
        </span>
        <button
          onClick={onReset}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!minPrice && !maxPrice}
          aria-label="Reset price range"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="min-price"
            className="block text-sm text-gray-600 mb-2"
          >
            Min price:
          </label>
          <input
            id="min-price"
            type="number"
            value={minPrice}
            onChange={(e) => handleMinChange(e.target.value)}
            placeholder="0"
            min="0"
            step="10"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              minError ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!minError}
            aria-describedby={minError ? "min-price-error" : undefined}
          />
          {minError && (
            <p
              id="min-price-error"
              className="text-red-500 text-xs mt-1"
              role="alert"
            >
              {minError}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="max-price"
            className="block text-sm text-gray-600 mb-2"
          >
            Max price:
          </label>
          <input
            id="max-price"
            type="number"
            value={maxPrice}
            onChange={(e) => handleMaxChange(e.target.value)}
            placeholder={maxPriceLimit.toString()}
            min="0"
            step="10"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              maxError ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!maxError}
            aria-describedby={maxError ? "max-price-error" : undefined}
          />
          {maxError && (
            <p
              id="max-price-error"
              className="text-red-500 text-xs mt-1"
              role="alert"
            >
              {maxError}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

// ============================================================================
// MAIN FILTER ACCORDION COMPONENT
// ============================================================================

const DEFAULT_AVAILABILITY_OPTIONS: FilterOption[] = [
  { label: "In stock", value: "in-stock", count: 25 },
  { label: "Out of stock", value: "out-of-stock", count: 8 },
];

export default function FilterAccordion({
  availabilityOptions = DEFAULT_AVAILABILITY_OPTIONS,
  maxPrice = 780,
  onFilterChange,
  initialFilters = {},
  className = "",
  mobileFiltersOpen,
  setMobileFiltersOpen,
}: FilterAccordionProps) {
  // State management
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    availability: true,
    price: true,
    productType: true,
    brand: false,
  });
  // get brands
  const { brands } = useProduct().getBrands("/brands");
  // get category / type product
  const { categories } = useProduct().getCategories("/categories");
  const [filters, setFilters] = useState<FilterState>({
    availability: initialFilters.availability || [],
    productTypes: initialFilters.productTypes || [],
    brands: initialFilters.brands || [],
    priceRange: initialFilters.priceRange || { min: "", max: "" },
  });
  console.log(filters);

  // Debounced filter change callback
  const debouncedOnFilterChange = useMemo(
    () => (onFilterChange ? debounce(onFilterChange, 300) : null),
    [onFilterChange]
  );

  // Effect to call onFilterChange when filters update
  useEffect(() => {
    if (debouncedOnFilterChange) {
      debouncedOnFilterChange(filters);
    }
  }, [filters, debouncedOnFilterChange]);

  // Section toggle handler
  const toggleSection = useCallback((section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  // Availability handlers
  const handleAvailabilityChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      availability: prev.availability.includes(value)
        ? prev.availability.filter((v) => v !== value)
        : [...prev.availability, value],
    }));
  }, []);

  const resetAvailability = useCallback(() => {
    setFilters((prev) => ({ ...prev, availability: [] }));
  }, []);

  // Product type handlers
  const handleProductTypeChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      productTypes: prev.productTypes.includes(value)
        ? prev.productTypes.filter((v) => v !== value)
        : [...prev.productTypes, value],
    }));
  }, []);

  const resetProductTypes = useCallback(() => {
    setFilters((prev) => ({ ...prev, productTypes: [] }));
  }, []);

  // Brand handlers
  const handleBrandChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(value)
        ? prev.brands.filter((v) => v !== value)
        : [...prev.brands, value],
    }));
  }, []);

  const resetBrands = useCallback(() => {
    setFilters((prev) => ({ ...prev, brands: [] }));
  }, []);

  // Price handlers
  const handleMinPriceChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, min: value },
    }));
  }, []);

  const handleMaxPriceChange = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, max: value },
    }));
  }, []);

  const resetPrice = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { min: "", max: "" },
    }));
  }, []);

  return (
    <div
      className={`${
        mobileFiltersOpen ? "fixed inset-0 z-50 bg-white" : "hidden"
      } lg:block w-full md:w-[330px] mx-auto h-full lg:min-h-screen overflow-scroll px-2 ${className}`}
    >
      <div className="flex items-center justify-between lg:hidden ">
        <h3 className="text-lg font-bold">Filters</h3>
        <button onClick={() => setMobileFiltersOpen(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <header className="bg-white rounded-lg shadow-sm p-5">
          <h1 className="text-lg font-bold mb-4 hidden lg:block">Filters</h1>
        </header>

        {/* Availability Section */}
        <AccordionSection
          id="availability"
          title="Availability"
          isOpen={openSections.availability}
          onToggle={() => toggleSection("availability")}
          testId="availability-section"
        >
          <CheckboxFilter
            options={availabilityOptions}
            selected={filters.availability}
            onChange={handleAvailabilityChange}
            onReset={resetAvailability}
            ariaLabel="Availability filters"
          />
        </AccordionSection>

        {/* Price Section */}
        <AccordionSection
          id="price"
          title="Price"
          isOpen={openSections.price}
          onToggle={() => toggleSection("price")}
          testId="price-section"
        >
          <PriceRangeFilter
            minPrice={filters.priceRange.min}
            maxPrice={filters.priceRange.max}
            onMinChange={handleMinPriceChange}
            onMaxChange={handleMaxPriceChange}
            onReset={resetPrice}
            maxPriceLimit={maxPrice}
          />
        </AccordionSection>

        {/* Product Type Section */}
        <AccordionSection
          id="productType"
          title="Product Type"
          isOpen={openSections.productType}
          onToggle={() => toggleSection("productType")}
          testId="product-type-section"
        >
          <CheckboxFilter
            options={categories?.category?.slice(0, 12)}
            selected={filters.productTypes}
            onChange={handleProductTypeChange}
            onReset={resetProductTypes}
            ariaLabel="Product type filters"
          />
        </AccordionSection>

        {/* Brand Section */}
        <AccordionSection
          id="brand"
          title="Brand"
          isOpen={openSections.brand}
          onToggle={() => toggleSection("brand")}
          testId="brand-section"
        >
          <CheckboxFilter
            options={brands}
            selected={filters.brands}
            onChange={handleBrandChange}
            onReset={resetBrands}
            ariaLabel="Brand filters"
          />
        </AccordionSection>
      </div>
    </div>
  );
}
