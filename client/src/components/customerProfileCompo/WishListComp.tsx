import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import WishlistCard from "../WishListCard";
import { Fragment } from "react/jsx-runtime";

const WishlistCompo = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">My Wishlist 💖</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item, i) => (
          <Fragment key={i}>
            <WishlistCard />
          </Fragment>
        ))}
      </div>
      {[1, 2, 3, 4, 5, 6].length > 5 && (
        <Link to="/wishlist" className="text-center pt-5 block">
          <Button variant="secondary" type="button" className="w-1/6">
            See More
          </Button>
        </Link>
      )}
    </>
  );
};
export default WishlistCompo;
