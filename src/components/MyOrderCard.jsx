import { ShoppingCart, Clock, CheckCircle, RefreshCw, Trash2 } from "lucide-react";
import { getBackendImageUrl } from "../utils/backend-image";
const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-200 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-300",
    icon: <Clock className="w-4 h-4 mr-1" />,
  },
  processing: {
    label: "Processing",
    color: "bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-300",
    icon: <RefreshCw className="w-4 h-4 mr-1 animate-spin-slow" />,
  },
  completed: {
    label: "Completed",
    color: "bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-300",
    icon: <CheckCircle className="w-4 h-4 mr-1" />,
  },
  default: {
    label: "Unknown",
    color: "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-400",
    icon: <ShoppingCart className="w-4 h-4 mr-1" />,
  },
};

function formatCurrency(amount) {
  return amount.toLocaleString("en-IN");
}

const openDeleteModal = (orderId) => {
  setOrderToDelete(orderId);
  setDeleteModalOpen(true);
};

export default function MyOrderCard({ order, onDelete }) {
  const status = statusConfig[order.status] || statusConfig.default;
  return (
    <article
      className="p-6 border border-gray-600 dark:border-gray-500 rounded-lg shadow-lg bg-gray-800 dark:bg-gray-700 hover:shadow-xl transition-shadow transform hover:scale-[1.02]"
      aria-label={`Order ${order._id}`}
    >
      {/* Header: Order ID, Date & Status */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="text-gray-200 font-semibold text-lg break-words">
          Order #{order._id.slice(-8)}
        </div>

        <div className="flex items-center space-x-4 mt-2 md:mt-0 text-sm text-gray-300">
          <time dateTime={order.date}>
            {new Date(order.date).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>

          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${status.color}`}
          >
            {status.icon}
            {status.label}
          </span>
        </div>
      </header>

      {/* Products List */}
      <ul className="divide-y divide-gray-600 max-h-52 overflow-y-auto mb-6">
        {order.products?.map((item) => {
          const imgSrc = item.productImage?.startsWith("http")
            ? item.productImage
            : getBackendImageUrl(item.productImage);

          return (
            <li key={item._id} className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4">
                {item.productImage ? (
                  <img
                    src={imgSrc}
                    alt={item.name}
                    className="w-12 h-12 rounded-md object-cover border border-gray-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-md bg-gray-600 flex items-center justify-center text-gray-400">
                    📦
                  </div>
                )}

                <div className="text-gray-200 font-medium">
                  {item.name} × {item.quantity}
                </div>
              </div>

              <div className="font-semibold text-gray-200">
                Rs {formatCurrency(item.price * item.quantity)}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer: Total and Delete Button */}
       <footer className="flex justify-between items-center text-xl font-bold text-gray-200">
        <span>Total: Rs {formatCurrency(order.total)}</span>

        <button
          onClick={() => onDelete(order._id)}
          aria-label="Delete order"
          className="flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors text-sm font-semibold"
          type="button"
        >
          <Trash2 className="w-5 h-5" />
          Delete
        </button>
      </footer>
    </article>
  );
}