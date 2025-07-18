"use client"

import { ShoppingCart, Clock, CheckCircle, RefreshCw, Trash2, Package } from "lucide-react"
import { getBackendImageUrl } from "../utils/backend-image"

const statusConfig = {
  pending: {
    label: "Pending",
    color:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
    icon: <Clock className="w-4 h-4" />,
  },
  processing: {
    label: "Processing",
    color:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
    icon: <RefreshCw className="w-4 h-4 animate-spin" />,
  },
  completed: {
    label: "Completed",
    color:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  default: {
    label: "Unknown",
    color:
      "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800",
    icon: <ShoppingCart className="w-4 h-4" />,
  },
}

function formatCurrency(amount) {
  return amount.toLocaleString("en-IN")
}

// Helper function to calculate grand total including add-ons
function calculateGrandTotal(products) {
  return products.reduce((total, item) => {
    const addonsTotal = item.addons
      ? item.addons.reduce((sum, addon) => sum + addon.price * addon.quantity, 0)
      : 0
    return total + item.price * item.quantity + addonsTotal
  }, 0)
}

export default function MyOrderCard({ order, onDelete }) {
  const status = statusConfig[order.status] || statusConfig.default
  const grandTotal = calculateGrandTotal(order.products || [])

  return (
    <article
      aria-label={`Order ${order._id}`}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
    >
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 transition-all duration-300 group-hover:translate-x-1">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Order #{order._id.slice(-8).toUpperCase()}
          </h3>
          <time dateTime={order.date} className="text-sm text-slate-500 dark:text-slate-400">
            {new Date(order.date).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </div>

        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 group-hover:scale-105 ${status.color}`}
        >
          {status.icon}
          {status.label}
        </div>
      </header>

      {/* Product List */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Items ({order.products?.length || 0})
        </h4>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
          {order.products?.map((item) => {
            const imgSrc = item.productImage?.startsWith("http")
              ? item.productImage
              : getBackendImageUrl(item.productImage)

            return (
              <div
                key={item._id}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  {item.productImage ? (
                    <img
                      src={imgSrc || "/placeholder.svg"}
                      alt={item.name}
                      loading="lazy"
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:scale-110 hover:shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                      <Package className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{item.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                    {item.addons && item.addons.length > 0 && (
                      <ul className="ml-4 mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {item.addons.map((addon, idx) => (
                          <li key={idx}>
                            + {addon.name} x {addon.quantity} (Rs {formatCurrency(addon.price * addon.quantity)})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    Rs {formatCurrency(item.price * item.quantity)}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Rs {formatCurrency(item.price)} each
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 transition-all duration-300 group-hover:border-slate-300 dark:group-hover:border-slate-700">
        <div className="space-y-1">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Amount</p>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Rs {formatCurrency(grandTotal)}
          </p>
        </div>

        <button
          onClick={() => onDelete(order._id)}
          aria-label="Delete order"
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
        >
          <Trash2 className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" />
          Delete
        </button>
      </footer>
    </article>
  )
}
