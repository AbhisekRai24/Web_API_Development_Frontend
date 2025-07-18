"use client";

import { useFetchOrdersByUser, useDeleteOrder } from "../hooks/useCreateOrder";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { MdRemoveShoppingCart } from "react-icons/md";
import MyOrderCard from "../components/MyOrderCard";
import DeleteModal from "../components/DeleteModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion"

// Helper: Group orders by formatted date
const groupOrdersByDate = (orders) => {
  const grouped = {};
  orders.forEach((order) => {
    const dateKey = new Date(order.date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(order);
  });
  return grouped;
};

export default function MyOrders() {
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const { data: orders = [], isLoading, isError } = useFetchOrdersByUser(userId);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const deleteOrderMutation = useDeleteOrder();

  const openDeleteModal = (orderId) => {
    setOrderToDelete(orderId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  const confirmDelete = () => {
    if (!orderToDelete) return;

    deleteOrderMutation.mutate(orderToDelete, {
      onSuccess: () => {

        closeDeleteModal();
      },
      onError: () => {
        toast.error("Failed to delete order.");
        closeDeleteModal();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="p-10 max-w-5xl mx-auto space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse h-32 bg-gray-100 dark:bg-gray-700 rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  if (isError)
    return (
      <p className="p-10 text-center text-red-500 text-lg">
        Failed to load your orders.
      </p>
    );

  if (orders.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
        <MdRemoveShoppingCart className="text-6xl mb-4 text-gray-400 dark:text-gray-600" />
        <p className="text-xl font-medium">You have no orders yet.</p>
        <p className="text-sm mt-1">Start exploring and place your first order!</p>
      </div>
    );

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">My Orders</h1>

      {Object.entries(groupedOrders).map(([date, ordersOnDate]) => (
        <section key={date} className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            {date}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {ordersOnDate.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <MyOrderCard order={order} onDelete={openDeleteModal} />
              </motion.div>
            ))}
          </div>
        </section>
      ))}

      {/* Delete confirmation modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Order"
        description="Are you sure you want to delete this order? This action cannot be undone."
      />
    </div>
  );
}