"use client"
import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, Plus } from "lucide-react"
import { getBackendImageUrl } from '../utils/backend-image'
import { useAdminProduct } from '../hooks/admin/useAdminProduct'
import { useCreateOrder } from "../hooks/useCreateOrder"
import UserSidebar from "./UserSideBar"
import AddToCartPopup from "./AddToCartPopup"
import { AuthContext } from "../auth/AuthProvider"
import { generateOrderId } from "../utils/order-utils"
import { toast } from "react-toastify"
import OrderTypeModal from "./OrderType";

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const {
    products,
    isLoading,
    isError,
    pageNumber,
    setPageNumber,
    canPreviousPage,
    canNextPage,
    pagination,

  } = useAdminProduct()
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])
  const [popupProduct, setPopupProduct] = useState(null)
  const [popupQuantity, setPopupQuantity] = useState(0)

  const closePopup = () => {
    setPopupProduct(null)
    setPopupQuantity(0)
  }

  const incrementPopupQty = () => {
    updateQuantity(popupProduct._id, popupQuantity + 1)
    setPopupQuantity((q) => q + 1)
  }

  const decrementPopupQty = () => {
    if (popupQuantity > 1) {
      updateQuantity(popupProduct._id, popupQuantity - 1)
      setPopupQuantity((q) => q - 1)
    }
  }

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === product._id)
      if (existing) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        )
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
    setPopupProduct(product)
    setPopupQuantity(
      (cart.find((p) => p._id === product._id)?.quantity || 0) + 1
    )
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p._id !== productId))
  }

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])

  }
  const createOrderMutation = useCreateOrder(() => {
    localStorage.removeItem("cart");
    setCart([]);
    setIsCartOpen(false);
    navigate("/normal/myorders");
  });

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsOrderTypeModalOpen(true);
  };
  const [isOrderTypeModalOpen, setIsOrderTypeModalOpen] = useState(false);
  const [selectedOrderType, setSelectedOrderType] = useState(null);

  const handleOrderTypeSelect = (type) => {
    setSelectedOrderType(type);
    setIsOrderTypeModalOpen(false);

    // Proceed with actual checkout
    const order = {
      userId: user._id,
      products: cart,
      total: cart.reduce((sum, p) => sum + p.price * p.quantity, 0),
      orderType: type, // optional - include if your backend supports
    };

    createOrderMutation.mutate(order);
  };




  return (
    <div className="p-10 bg-gray-200 shadow-md rounded-xl">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold mb-6 text-black">Products</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Cart ({cart.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white border-2 border-gray-200 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <div className="relative w-full h-40 mb-4">
              <img
                // src={getBackendImageUrl(`uploads/${product.productImage}`)}
                src={getBackendImageUrl(product.productImage)}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-2 rounded-md opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-600 transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-3 flex-1">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">
                  Rs {product.price.toLocaleString()}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center items-center gap-6">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={!canPreviousPage}
          className={`px-4 py-2 rounded-lg text-white ${canPreviousPage ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          Previous
        </button>

        <span className="text-gray-700 font-medium">
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <button
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={!canNextPage}
          className={`px-4 py-2 rounded-lg text-white ${canNextPage ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          Next
        </button>
      </div>
      <UserSidebar
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
        onCheckout={handleCheckout}
      />
      {popupProduct && (
        <AddToCartPopup
          product={popupProduct}
          quantity={popupQuantity}
          onIncrement={incrementPopupQty}
          onDecrement={decrementPopupQty}
          onClose={closePopup}


        />
      )}

      <OrderTypeModal
        isOpen={isOrderTypeModalOpen}
        onClose={() => setIsOrderTypeModalOpen(false)}
        onSelect={handleOrderTypeSelect}
      />
    </div>
  )
}


