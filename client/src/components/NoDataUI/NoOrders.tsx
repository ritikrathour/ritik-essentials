import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

const NoOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <h2 className="text-xl font-semibold text-gray-800">No orders yet</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        Looks like you haven’t placed any orders yet. Start shopping and your
        orders will appear here.
      </p>
      <Link to="/products">
        <Button type="button" variant="outline" className="mt-4">
          Shop Now
        </Button>
      </Link>
    </div>
  );
};

export default NoOrders;
