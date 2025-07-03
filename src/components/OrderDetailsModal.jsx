import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 shadow-sm",
  processing: "bg-blue-100 text-blue-800 shadow-sm",
  completed: "bg-green-100 text-green-800 shadow-sm",
};

function formatCurrency(amount) {
  return amount.toLocaleString("en-IN");
}

export default function OrderDetailsModal({ order, isOpen, onClose }) {
  if (!order) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        {/* Backdrop blur overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 backdrop-blur-none"
          enterTo="opacity-100 backdrop-blur-sm"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 backdrop-blur-sm"
          leaveTo="opacity-0 backdrop-blur-none"
        >
          <div className="fixed inset-0 bg-transparent backdrop-filter backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="flex items-center justify-center min-h-screen p-4 text-center">
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <Dialog.Title className="text-xl font-bold text-gray-900">
                  Order #{order._id.slice(-5)}
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-700 transition"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* User & Date */}
              <div className="mb-4 space-y-1">
                <p className="text-gray-700">
                  <strong>User:</strong> {order.userId?.username || "Unknown"}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {new Date(order.date).toLocaleString()}
                </p>
                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[order.status]}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <hr className="my-4 border-gray-200" />

              {/* Products list */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Items:</h3>
                <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                  {order.products.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center py-2"
                    >
                      <div className="flex items-center gap-3">
                        {item.productImage && (
                          <img
                            src={item.productImage}
                            alt={item.name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                        )}
                        <span className="text-gray-800">
                          {item.name} x {item.quantity}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        Rs {formatCurrency(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <hr className="my-4 border-gray-200" />

              {/* Total */}
              <div className="text-right font-semibold text-lg text-gray-900">
                Total: Rs {formatCurrency(order.total)}
              </div>

              {/* Footer Close Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
