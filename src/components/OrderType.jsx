import { FaUtensils, FaShoppingBag } from "react-icons/fa";
import React from "react";

export default function OrderTypeModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg text-center space-y-6 animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-800">Select Order Type</h2>
        <p className="text-gray-600">Please choose how you want to receive your order</p>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => onSelect("dine-in")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex flex-col items-center hover:bg-blue-700 transition"
          >
            <FaUtensils className="text-2xl mb-2" />
            <span>Dine-In</span>
          </button>

          <button
            onClick={() => onSelect("takeaway")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg flex flex-col items-center hover:bg-green-700 transition"
          >
            <FaShoppingBag className="text-2xl mb-2" />
            <span>Takeaway</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:underline mt-4"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
