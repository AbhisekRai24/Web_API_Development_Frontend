"use client"
import { X, Plus, Minus, Trash2 } from "lucide-react"
import { getBackendImageUrl } from '../utils/backend-image'

export default function UserSidebar({
    cart,
    isOpen,
    onClose,
    removeFromCart,
    updateQuantity,
    clearCart,
    onCheckout
}) {
    const subtotal = cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
    )

    return (
        <>
            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-screen w-96 bg-[#222740] shadow-lg transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-700">
                    <h3 className="text-xl font-bold text-white">Your Cart</h3>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center bg-red-100/10 hover:bg-red-100/20 text-red-400 font-medium p-2 rounded-lg transition"
                        aria-label="Close cart"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col h-[calc(100vh-64px)]">
                    <div className="flex-1 overflow-y-auto p-5 space-y-4">
                        {cart.length === 0 ? (
                            <p className="text-gray-400 text-center mt-10">Your cart is empty.</p>
                        ) : (
                            cart.map((product) => (
                                <div
                                    key={product._id}
                                    className="flex gap-4 items-center border-b border-gray-600 pb-4"
                                >
                                    <img
                                        src={getBackendImageUrl(product.productImage)}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-white">{product.name}</h4>
                                        <div className="flex items-center gap-2 mt-1 mb-1">
                                            <button
                                                onClick={() => updateQuantity(product._id, product.quantity - 1)}
                                                className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-white"
                                                disabled={product.quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="px-2 text-sm font-medium text-white">{product.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(product._id, product.quantity + 1)}
                                                className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-white"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-blue-400 font-bold text-sm">
                                            Rs {(product.price * product.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(product._id)}
                                        className="flex items-center justify-center bg-red-100/10 hover:bg-red-100/20 text-red-400 font-medium px-3 py-1 rounded-lg transition text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="p-5 border-t border-gray-700 bg-[#222740] space-y-4">
                            <div className="flex justify-between text-lg font-medium text-white">
                                <span>Subtotal</span>
                                <span>Rs {subtotal.toLocaleString()}</span>
                            </div>
                            <button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                                onClick={onCheckout}
                            >
                                Checkout
                            </button>
                            <button
                                className="w-full flex items-center justify-center gap-2 bg-red-100/10 hover:bg-red-100/20 text-red-400 font-medium py-2 px-4 rounded-lg transition"
                                onClick={clearCart}
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                />
            )}
        </>
    )
}
