import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ProductDetailsAccordion = ({ details }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const productDetails = details
    ? [
        { label: "Brand", value: details.brand },
        { label: "Color", value: details.color },
        { label: "category", value: details?.category },
        { label: "description", value: details.description },
        {
          label: "height",
          value: details?.dimensions?.height,
        },
        {
          label: "width",
          value: details?.dimensions?.width,
        },
        {
          label: "length",
          value: details?.dimensions?.length,
        },
        { label: "sku", value: details.sku },
        { label: "weigth", value: details.weight },
      ]
    : [];

  return (
    <div className="w-full mx-auto p-6 bg-gray-50">
      <div className=" bg-white rounded-sm shadow-sm px-2">
        {/* Accordion Header */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-lg font-medium text-gray-900">Product Details</h2>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Accordion Content */}
        {isOpen && (
          <div className="px-6 pb-6 border-t border-gray-200">
            <div className="pt-4">
              {productDetails.map((detail, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="col-span-1 text-sm text-gray-600 capitalize">
                    {detail.label}
                  </div>
                  <div className="col-span-2 text-sm text-gray-900 font-normal">
                    {detail.value ? detail?.value : "..."}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsAccordion;
