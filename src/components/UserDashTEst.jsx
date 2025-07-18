











"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

import { useAdminProduct } from "../hooks/admin/useAdminProduct";
import { getBackendImageUrl } from "../utils/backend-image";
import { ChevronRight } from "lucide-react";
import Slider from "react-slick";

export default function UserHomePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { products } = useAdminProduct();

  const bannerItems = [
    { title: "Mega Sale! Up to 50% Off", bgColor: "bg-red-600" },
    { title: "New Arrivals! Fresh and Hot", bgColor: "bg-green-600" },
    { title: "Flash Deals! Limited Time", bgColor: "bg-blue-600" },
  ];

  const featured = Array.isArray(products)
    ? [...products.slice(0, 8)].reverse()
    : [];

  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const tickerSettings = {
    dots: false,
    infinite: true,
    speed: 8000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  // 🔐 Helper: only navigate if logged in
  const navigateWithAuth = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-100 text-black dark:text-white min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12">
        {/* 🔁 Banner Slider */}
        <Slider {...bannerSettings} className="mb-10 rounded-lg overflow-hidden max-w-full">
          {bannerItems.map((banner, i) => (
            <div
              key={i}
              className={`relative h-64 sm:h-80 md:h-[400px] flex items-center justify-center ${banner.bgColor}`}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white text-center px-4">
                {banner.title}
              </h2>
            </div>
          ))}
        </Slider>

        {/* 🏷️ Featured Products Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <button
            onClick={() => navigateWithAuth("/normal/dash")}
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            See More
            <ChevronRight size={16} />
          </button>
        </div>

        {/* 🛍️ Product Slider */}
        {featured.length > 0 ? (
          <Slider {...tickerSettings} className="ltr-flip">
            {featured.map((product) => (
              <div
                key={product._id}
                onClick={() =>
                  navigateWithAuth(`/normal/user/category/${product.categoryId}`)
                }
                className="bg-white dark:bg-gray-800 border rounded-lg p-4 mx-2 shadow-md max-w-full cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={getBackendImageUrl(product.productImage)}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-3 max-w-full"
                />
                <h3 className="text-md font-semibold text-center">{product.name}</h3>
                <p className="text-sm text-gray-500 text-center">{product.description}</p>
                <p className="text-center text-blue-600 font-bold mt-2">
                  Rs {product.price.toLocaleString()}
                </p>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500 py-10">No products available right now.</p>
        )}
      </div>
    </div>
  );
}






