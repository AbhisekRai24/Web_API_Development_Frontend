import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { getBackendImageUrl } from '../utils/backend-image'

export default function ProductDetailsModal({ product, onClose, onAddToCart }) {
    const [quantity, setQuantity] = useState(1)
    const [addons, setAddons] = useState([])

    useEffect(() => {
        setAddons(
            (product.addons || []).map((addon) => ({
                addonId: addon._id,
                name: addon.name,
                price: addon.price,
                selected: false,
                quantity: 1,
            }))
        );
        setQuantity(1);
    }, [product])

    const toggleAddon = (index) => {
        setAddons((prev) =>
            prev.map((addon, i) => {
                if (i !== index) return addon
                const selected = !addon.selected
                return {
                    ...addon,
                    selected,
                    quantity: selected ? addon.quantity : 1,
                }
            })
        )
    }

    const changeAddonQty = (index, val) => {
        const v = Math.max(1, Number(val) || 1)
        setAddons((prev) =>
            prev.map((addon, i) =>
                i === index ? { ...addon, quantity: v } : addon
            )
        )
    }

    const baseTotal = product.price * quantity
    const addonsTotal = addons.reduce(
        (sum, a) => (a.selected ? sum + a.price * a.quantity : sum),
        0
    )
    const total = baseTotal + addonsTotal

    const handleAdd = () => {
        const selectedAddons = addons
            .filter((a) => a.selected)
            .map(({ addonId, name, price, quantity }) => ({
                addonId,
                name,
                price,
                quantity
            }));

        const { addons: _, ...cleanProduct } = product;

        const productToAdd = {
            ...cleanProduct,
            quantity,
            ...(selectedAddons.length > 0 && { addons: selectedAddons })
        };

        onAddToCart(productToAdd);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-8"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-7xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden relative"
                style={{ minHeight: "500px" }}
            >
                {/* Close button */}
                <button
                    className="absolute top-5 right-5 text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-700 transition z-10"
                    onClick={onClose}
                    aria-label="Close product details"
                >
                    <X size={28} />
                </button>

                {/* Left side - Image container */}
                <div className="flex-shrink-0 w-full md:w-1/2 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-6 overflow-hidden">
                    <div className="relative w-full h-[400px] md:h-[600px] rounded-md overflow-hidden bg-white dark:bg-gray-800 shadow">
                        <img
                            src={getBackendImageUrl(product.productImage)}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Right side - Content & controls */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <h2 className="text-4xl font-semibold mb-6 text-gray-900 dark:text-gray-100">{product.name}</h2>

                    <p className="mb-8 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{product.description || "No description available."}</p>

                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">
                        Rs {product.price.toLocaleString()}
                    </p>

                    {/* Quantity control */}
                    <div className="mb-8 flex items-center gap-6">
                        <label className="font-semibold text-gray-900 dark:text-gray-100 text-lg">Quantity:</label>
                        <button
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 dark:bg-gray-600"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                            className="w-24 text-center border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg"
                        />
                        <button
                            className="px-4 py-2 bg-gray-300 rounded dark:bg-gray-600"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>

                    {/* Add-ons */}
                    {addons.length > 0 && (
                        <div className="mb-8">
                            <h3 className="font-semibold text-2xl mb-4 text-gray-900 dark:text-gray-100">Add-ons:</h3>
                            <div className="flex flex-col gap-5 max-h-52 overflow-y-auto">
                                {addons.map((addon, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            checked={addon.selected}
                                            id={`addon-${idx}`}
                                            onChange={() => toggleAddon(idx)}
                                            className="cursor-pointer scale-125"
                                        />
                                        <label htmlFor={`addon-${idx}`} className="flex-1 cursor-pointer text-gray-900 dark:text-gray-100 text-lg">
                                            {addon.name} (+ Rs {addon.price.toLocaleString()})
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={addon.quantity}
                                            onChange={(e) => changeAddonQty(idx, e.target.value)}
                                            className={`w-24 border border-gray-300 rounded px-3 py-2 transition-opacity duration-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg ${addon.selected ? "opacity-100" : "opacity-0 pointer-events-none"
                                                }`}
                                            disabled={!addon.selected}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Total */}
                    <p className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
                        Total: Rs {total.toLocaleString()}
                    </p>

                    {/* Add to cart */}
                    <button
                        onClick={handleAdd}
                        className="bg-[#A62123] hover:bg-[#C14547] text-white font-semibold py-4 rounded w-full md:w-auto text-xl"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
