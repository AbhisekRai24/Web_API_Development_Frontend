"use client"
import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, Plus } from "lucide-react"
import { getBackendImageUrl } from '../utils/backend-image'
import { useAdminProduct } from '../hooks/admin/useAdminProduct'
import { useCreateOrder } from "../hooks/useCreateOrder"
import UserSidebar from "./UserSideBar"

import { AuthContext } from "../auth/AuthProvider"
import { generateOrderId } from "../utils/order-utils"
import { toast } from "react-toastify"
import OrderTypeModal from "./OrderType"
import PaymentMethodModal from "../components/payment/PaymentMethodModal"
import ProductDetailsModal from "./ProductDetailsModal"  // New modal component

export default function UserDashboard() {
  const { user } = useContext(AuthContext)
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

  // ProductDetails modal state
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Payment and OrderType modals state
  const [isOrderTypeModalOpen, setIsOrderTypeModalOpen] = useState(false)
  const [selectedOrderType, setSelectedOrderType] = useState(null)
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false)

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) setCart(JSON.parse(storedCart))
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Add product + addons from ProductDetailsModal to cart
  const addToCart = (productWithAddons) => {
    // Merge if same product + addons exists else add new entry
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => {
        if (item._id !== productWithAddons._id) return false

        // Check addons equality by name + price + qty length
        const a1 = item.selectedAddons || []
        const a2 = productWithAddons.selectedAddons || []
        if (a1.length !== a2.length) return false
        for (let i = 0; i < a1.length; i++) {
          if (
            a1[i].name !== a2[i].name ||
            Number(a1[i].price) !== Number(a2[i].price) ||
            Number(a1[i].quantity) !== Number(a2[i].quantity)
          )
            return false
        }
        return true
      })

      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex].quantity += productWithAddons.quantity
        return updated
      }

      return [...prev, productWithAddons]
    })
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

  const clearCart = () => setCart([])

  const createOrderMutation = useCreateOrder(() => {
    localStorage.removeItem("cart")
    setCart([])
    setIsCartOpen(false)
    navigate("/normal/myorders")
  })

  const handleCheckout = () => {
    if (cart.length === 0) return
    setIsOrderTypeModalOpen(true)
  }

  const handleOrderTypeSelect = (type) => {
    setSelectedOrderType(type)
    setIsOrderTypeModalOpen(false)
    setIsPaymentMethodModalOpen(true)
  }

  const handlePaymentMethodSelect = (method) => {
    setIsPaymentMethodModalOpen(false);

    // Calculate total including addons
    const total = cart.reduce((sum, p) => {
      const addonsTotal = (p.selectedAddons || []).reduce(
        (aSum, a) => aSum + a.price * a.quantity,
        0
      );
      return sum + (p.price * p.quantity + addonsTotal);
    }, 0);

    // Generate order ID here
    const orderId = generateOrderId();

    const order = {
      _id: orderId,         // Add orderId to the order
      userId: user._id,
      products: cart,
      total,
      orderType: selectedOrderType,
      paymentMethod: method,
    };

    console.log("Order payload:", order);


    if (method === "cash") {
      createOrderMutation.mutate(order); // create order immediately
    } else if (method === "online") {
      triggerEsewaPayment(order); // redirect to esewa for payment
    }
  };


  const triggerEsewaPayment = (order) => {
    axios
      .post("http://localhost:5050/api/esewa/create-payment", {
        amount: order.total,
        pid: order._id  // send generated orderId (pid) to backend
      })
      .then(({ data }) => {
        if (data.url) window.location.href = data.url;
        else toast.error("Failed to get payment URL");
      })
      .catch(() => {
        toast.error("Error initiating eSewa payment");
      });
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load products.</p>
  }

  return (
    <div className="p-10 bg-gray-200 dark:bg-gray-900 shadow-md rounded-xl">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Products</h2>
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Cart ({cart.length})
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="
              bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow
              transition-transform transition-shadow duration-300 ease-in-out
              hover:scale-[1.03] hover:shadow-2xl hover:z-10
              hover:bg-gray-50 dark:hover:bg-gray-700
              p-4 flex flex-col
              cursor-pointer
            "
          >
            <div className="relative w-full h-40 mb-4">
              <img
                src={getBackendImageUrl(product.productImage)}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-2 rounded-md opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setSelectedProduct(product)} // open modal
                  className="bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-600 transition flex items-center gap-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-3 flex-1">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  Rs {product.price.toLocaleString()}
                </span>
                <button
                  onClick={() => setSelectedProduct(product)}
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

      <div className="mt-10 flex justify-center items-center gap-6">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={!canPreviousPage}
          className={`px-4 py-2 rounded-lg text-white ${canPreviousPage
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Previous
        </button>

        <span className="text-gray-700 dark:text-gray-200 font-medium">
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <button
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={!canNextPage}
          className={`px-4 py-2 rounded-lg text-white ${canNextPage
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
            }`}
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

      {/* Product details + addons modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <OrderTypeModal
        isOpen={isOrderTypeModalOpen}
        onClose={() => setIsOrderTypeModalOpen(false)}
        onSelect={handleOrderTypeSelect}
      />

      <PaymentMethodModal
        isOpen={isPaymentMethodModalOpen}
        onClose={() => setIsPaymentMethodModalOpen(false)}
        onSelect={handlePaymentMethodSelect}
      />
    </div>
  )
}
