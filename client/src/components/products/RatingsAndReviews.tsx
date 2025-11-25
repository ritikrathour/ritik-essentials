import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, MoreVertical, Star } from "lucide-react";

// Dummy API call simulation
const fetchRatingsData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        averageRating: 3.9,
        totalRatings: 71893,
        totalReviews: 2714,
        customerFeatures: [
          "Fabric Quality",
          "Colour",
          "Style",
          "Comfort",
          "True to Specs",
          "Stitching Quality",
        ],
        customerImages: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&h=200&fit=crop",
        ],
        moreImagesCount: 710,
        reviews: [
          {
            id: 1,
            rating: 5,
            text: "Very good jacket 👍",
            image:
              "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
            userName: "Anu Karki",
            timeAgo: "8 months ago",
            location: "Bangalore",
            certified: true,
            likes: 273,
            dislikes: 76,
          },
          {
            id: 2,
            rating: 4,
            text: "It is a good jacket but the fabric is not as described, it is polyester inside, everything else is good, the look is also good.",
            image:
              "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=200&h=200&fit=crop",
            userName: "Teekam Prajapat",
            timeAgo: "Oct, 2024",
            location: "Tonk District",
            certified: true,
            likes: 746,
            dislikes: 357,
          },
        ],
      });
    }, 1000);
  });
};

const RatingsAndReviews = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const reviewsData = await fetchRatingsData();
      setData(reviewsData);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12 text-gray-500">
          Loading reviews...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 bg-white">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-medium text-gray-900">
            Ratings & Reviews
          </h1>
          <div className="flex items-center gap-2">
            <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-1">
              {data.averageRating}
              <Star className="w-3 h-3 fill-white" />
            </span>
            <span className="text-gray-600 text-sm">
              {data.totalRatings.toLocaleString()} ratings and{" "}
              {data.totalReviews.toLocaleString()} reviews
            </span>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-medium">
          Rate Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* What our customers felt */}
        <div>
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <span className="text-2xl">😊</span>
            What our customers felt:
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.customerFeatures.map((feature: any, index: number) => (
              <span
                key={index}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:border-gray-400 transition-colors"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Images uploaded by customers */}
        <div>
          <h2 className="text-lg font-medium mb-4">
            Images uploaded by customers:
          </h2>
          <div className="flex gap-2">
            {data.customerImages.map((image: string, index: number) => (
              <div key={index} className="relative">
                <img
                  src="../assets/girl.png"
                  alt={`Customer upload ${index + 1}`}
                  className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
            <div className="w-20 h-20 bg-gray-800 rounded flex items-center justify-center text-white font-medium cursor-pointer hover:bg-gray-700 transition-colors">
              + {data.moreImagesCount}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {data.reviews.map((review: any) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            {/* Rating Badge and Text */}
            <div className="flex items-start gap-3 mb-3">
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                {review.rating}
                <Star className="w-3 h-3 fill-white" />
              </span>
              <p className="text-gray-900 flex-1">{review.text}</p>
            </div>

            {/* Review Image */}
            {review.image && (
              <div className="mb-3 w-[200px]">
                <img
                  src="../assets/girl.png"
                  alt="Review"
                  className="object-cover w-full h-full rounded cursor-pointer hover:opacity-90 transition-opacity"
                />
              </div>
            )}

            {/* Reviewer Info and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium text-gray-900">
                  {review.userName}
                </span>
                <span>{review.timeAgo}</span>
                {review.certified && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>Certified Buyer, {review.location}</span>
                  </div>
                )}
              </div>

              {/* Like/Dislike/More Actions */}
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{review.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                  <span className="text-sm">{review.dislikes}</span>
                </button>
                <button className="text-gray-600 hover:text-gray-900 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsAndReviews;
