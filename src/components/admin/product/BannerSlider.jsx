"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";

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

export default function BannerSlider() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Update this to your backend base URL
    const API_URL = "http://localhost:5050";
    useEffect(() => {
        async function fetchBanners() {
            try {
                const res = await fetch(`${API_URL}/api/admin/banner`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const json = await res.json();
                setBanners(json.data || []);
            } catch (err) {
                setError(err.message || "Failed to load banners");
            } finally {
                setLoading(false);
            }
        }
        fetchBanners();
    }, [API_URL]);

    if (loading) {
        return <p className="text-center py-10">Loading banners...</p>;
    }

    if (error) {
        return <p className="text-center py-10 text-red-600">Error: {error}</p>;
    }

    if (!banners.length) {
        return <p className="text-center py-10">No banners available.</p>;
    }

    return (
        <Slider {...bannerSettings} className="mb-10 rounded-lg overflow-hidden max-w-full">
            {banners.map((banner) => (
                <div
                    key={banner._id}
                    className="relative h-96 sm:h-[500px] md:h-[600px] flex items-center justify-center bg-gray-200 dark:bg-gray-700"
                >
                    {/* Banner Image */}
                    <img
                        src={`${API_URL}/${banner.imageUrl.replace(/\\/g, "/")}`}
                        alt={banner.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />


                </div>
            ))}
        </Slider>
    );
}
