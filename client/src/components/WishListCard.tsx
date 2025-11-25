import Rating from "./Rating";
import { Button } from "./ui/Button";

const WishlistCard = ({ item }: any) => {
  return (
    <div className="bg-white shadow-sm border border-[#c4c4c4] rounded-xl overflow-hidden flex flex-col">
      <div className="w-full h-52">
        <img
          src="../public/assets/girl.png"
          alt="image"
          className=" object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            item.name
          </h2>
          <p className="text-gray-600 mb-2 line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
            explicabo eveniet aliquid blanditiis, veniam earum inventore nemo
            odio nam adipisci eaque possimus, vitae distinctio, quibusdam libero
            temporibus asperiores. Vero, architecto.
          </p>
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-gray-900">₹999</p>
            <Rating />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <Button
            type="button"
            // onClick={onRemove}
            variant="danger"
            className="w-1/2 bg-red-100! text-red-600! font-medium! hover:bg-red-200! "
          >
            Remove
          </Button>
          <Button type="button" className="w-1/2  ">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
