import { useState } from "react";
import WishlistCard from "../components/WishListCard";

const Wishlist = () => {
  const dummyData = [
    {
      id: 0,
      name: "Wireless Headphones - Premium Sound",
      description:
        "Crystal clear audio with noise cancellation and 20-hour battery life.",
      price: 2999,
      image: "../public/assets/girl.png",
    },
    {
      id: 1,
      name: "Wireless Headphones - Premium Sound",
      description:
        "Crystal clear audio with noise cancellation and 20-hour battery life.",
      price: 2999,
      image: "../public/assets/girl.png",
    },
    {
      id: 2,
      name: "Running Shoes - Sport Edition",
      description: "Comfort fit, breathable mesh upper, and durable grip sole.",
      price: 4599,
      image: "../public/assets/girl.png",
    },
    {
      id: 3,
      name: "Smartwatch - Fitness Tracker",
      description:
        "Tracks steps, heart rate, sleep, and supports message alerts.",
      price: 6999,
      image: "../public/assets/girl.png",
    },
  ];
  const [wishlist, setWishlist] = useState(dummyData);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch wishlist from API
  //   useEffect(() => {
  //     const fetchWishlist = async () => {
  //       try {
  //         setLoading(true);
  //         const res = await fetch("/api/wishlist", {
  //           credentials: "include",
  //         });
  //         if (!res.ok) throw new Error("Failed to fetch wishlist");
  //         const data = await res.json();
  //         setWishlist(data);
  //       } catch (err: any) {
  //         console.error(err.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //
  //     fetchWishlist();
  //   }, []);
  //
  //   const removeFromWishlist = async (id: any) => {
  //     try {
  //       await fetch(`/api/wishlist/${id}`, {
  //         method: "DELETE",
  //         credentials: "include",
  //       });
  //       setWishlist((prev) => prev.filter((item: any) => item.id !== id));
  //     } catch (err) {
  //       console.error("Failed to remove item", err);
  //     }
  //   };

  return (
    <section className="md:px-10 h-full min-h-screen bg-gray-50 px-2 ">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        My Wishlist ❤️
      </h1>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* {Array.from({ length: 3 }).map((_, i) => (
            <WishlistSkeleton key={i} />
          ))} */}
        </div>
      ) : wishlist.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist?.map((item: any) => (
            <WishlistCard
              key={item.id}
              item={item}
              //   onRemove={() => removeFromWishlist(item.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-lg text-center">Your wishlist is empty 😔</p>
      )}
    </section>
  );
};

export default Wishlist;
