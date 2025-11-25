import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/Button";
import { OptimizedImage } from "../ui/OptimizedImage";
import React from "react";
import { ICartItem } from "../../utils/Types/Cart.types";
import Rating from "../Rating";
import { Link } from "react-router-dom";
interface IItem {
  item: ICartItem;
  updateQuantity: () => void;
  removeItem: () => void;
}
// dummyn rate
const rating = { average: 4.3, count: 20 };
const CartItem: React.FC<any> = ({ item, removeItem, updateQuantity }) => {
  return (
    <div className="bg-white border border-[#c4c4c4] rounded-xl p-2">
      <div className="flex gap-1 sm:gap-4 ">
        {/* Product Image */}
        <div className="flex-shrink-0 flex flex-col gap-2 items-center">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
            <OptimizedImage
              objectFit="contain"
              className=""
              alt={item.name}
              src="../assets/cola.avif"
            />
          </div>
          {/* todo select  */}
        </div>

        {/* Product Details  */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <Link to={`/products/${item?.id}`}>
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                {item.name}
              </h3>
              <div className="flex flex-col gap-1">
                <Rating rating={{ ...rating }} />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600 font-medium">
                    35% off
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹445
                  </span>
                  <p className="text-sm font-semibold text-gray-900">
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
            <Button
              onClick={() => removeItem(item.id)}
              type="button"
              variant="dangerLight"
            >
              <Trash2 size={20} />
            </Button>
          </div>

          <div className="flex justify-between items-center">
            {/* Attributes */}
            <div>
              {item.color && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Color:</span> {item.color}
                </p>
              )}
              {item.material && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Material:</span>{" "}
                  {item.material}
                </p>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => updateQuantity(item.id, -1)}
              >
                <Minus size={16} />
              </Button>
              <span className="font-semibold text-lg w-8 text-center">
                {item.quantity}
              </span>
              <Button
                type="button"
                variant="ghost"
                onClick={() => updateQuantity(item.id, 1)}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
