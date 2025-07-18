// // src/components/CategoryProducts.jsx
// import React from 'react'
// import { useParams } from 'react-router-dom'
// import { useProductsByCategory } from '../hooks/admin/useAdminProduct'
// import { useGetOneCategory } from '../hooks/admin/useAdminCategory' 

// export default function CategoryProducts() {
//    const { categoryId } = useParams()


//   // Fetch products under the category
//   const { data: products = [], isLoading: productsLoading, isError: productsError } = useProductsByCategory(categoryId)

//   // Fetch category details (to get the name)
//   const { category, isLoading: categoryLoading, isError: categoryError } = useGetOneCategory(categoryId)

//   // Show loading spinner while either data is loading
//   if (productsLoading || categoryLoading) return (
//     <div className="flex justify-center items-center h-64">
//       <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   )

//   // Show error if either failed
//   if (productsError || categoryError) return (
//     <p className="text-center text-red-500">Failed to load products or category.</p>
//   )

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4 text-center">{category?.name || 'Category'}</h1>
//       {products.length === 0 ? (
//         <p className="text-center text-gray-500">No products found in this category.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {products.map(product => (
//             <div key={product._id} className="p-4 shadow rounded bg-white">
//               {product.productImage && (
//                 <img
//                   src={`http://localhost:5050/${product.productImage}`}
//                   alt={product.name}
//                   className="w-full h-48 object-cover rounded mb-3"
//                 />
//               )}
//               <h2 className="text-lg font-semibold">{product.name}</h2>
//               <p className="text-gray-600">Price: Rs {product.price}</p>
//               <p className="text-sm text-gray-500">{product.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }


// src/components/CategoryProducts.jsx
import React, { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ShoppingCart, Plus } from "lucide-react"
import { getBackendImageUrl } from '../utils/backend-image'
import { useProductsByCategory } from '../hooks/admin/useAdminProduct'
import { useGetOneCategory } from '../hooks/admin/useAdminCategory'
import { useCreateOrder } from "../hooks/useCreateOrder"
import { AuthContext } from "../auth/AuthProvider"
import { toast } from "react-toastify"
import UserSidebar from "./UserSideBar"
import AddToCartPopup from "./AddToCartPopup"
import ProductDetailsModal from "./ProductDetailsModal"  // import your modal
import OrderTypeModal from "./OrderType"

export default function CategoryProducts() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  // Fetch products under category
  const { data: products = [], isLoading: productsLoading, isError: productsError } = useProductsByCategory(categoryId)
  const { category, isLoading: categoryLoading, isError: categoryError } = useGetOneCategory(categoryId)

  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [popupProduct, setPopupProduct] = useState(null)
  const [popupQuantity, setPopupQuantity] = useState(0)
  const [isOrderTypeModalOpen, setIsOrderTypeModalOpen] = useState(false)
  const [selectedOrderType, setSelectedOrderType] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null);


  // Load saved cart
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const handleAddToCart = (productWithAddons) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => {
        if (item._id !== productWithAddons._id) return false;

        const a1 = item.addons || [];
        const a2 = productWithAddons.addons || [];
        if (a1.length !== a2.length) return false;
        for (let i = 0; i < a1.length; i++) {
          if (
            a1[i].name !== a2[i].name ||
            Number(a1[i].price) !== Number(a2[i].price) ||
            Number(a1[i].quantity) !== Number(a2[i].quantity)
          )
            return false;
        }
        return true;
      });

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += productWithAddons.quantity;
        return updated;
      }

      return [...prev, productWithAddons];
    });
  };


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

  const handleOrderTypeSelect = (type) => {
    setSelectedOrderType(type);
    setIsOrderTypeModalOpen(false);

    const order = {
      userId: user._id,
      products: cart,
      total: cart.reduce((sum, p) => sum + p.price * p.quantity, 0),
      orderType: type,
    };

    createOrderMutation.mutate(order);
  };

  // Loading or error UI
  if (productsLoading || categoryLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (productsError || categoryError) {
    return <p className="text-center text-red-500">Failed to load products or category.</p>
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center">{category?.name || 'Category'}</h1>
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Cart ({cart.length})
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id}
              className="
    p-4 shadow rounded-lg bg-white dark:bg-gray-800 dark:text-gray-100 flex flex-col
    transition-transform transition-shadow duration-300 ease-in-out
    hover:scale-[1.03] hover:shadow-2xl hover:z-10
    hover:bg-gray-50 dark:hover:bg-gray-700
    cursor-pointer
  "
            >
              {product.productImage && (
                <img
                  src={getBackendImageUrl(product.productImage)}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">Price: Rs {product.price}</p>
              <p className="text-sm text-gray-500 mb-4">{product.description}</p>
              <button
                onClick={() => {
                  console.log("Opening modal for:", product);
                  setSelectedProduct(product);
                }}
                className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add to Cart
              </button>

            </div>
          ))}
        </div>
      )}

      {/* Sidebar cart */}
      <UserSidebar
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
        onCheckout={handleCheckout}
      />

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(productWithAddons) => {
            console.log("Adding from modal:", productWithAddons);
            handleAddToCart(productWithAddons);
            setSelectedProduct(null);
          }}
        />
      )}



      {/* Order type modal */}
      <OrderTypeModal
        isOpen={isOrderTypeModalOpen}
        onClose={() => setIsOrderTypeModalOpen(false)}
        onSelect={handleOrderTypeSelect}
      />
    </div>
  )
}
