import React, { useState } from "react";
import {
    useFetchAllOrders,
    useUpdateOrderStatus,
} from "../../hooks/useCreateOrder";
import OrderDetailsModal from "../OrderDetailsModal";

const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400",
    processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-400",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400",
};

const PendingOrders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: orders = [], isLoading, isError } = useFetchAllOrders();
    const { mutate: updateStatus } = useUpdateOrderStatus();
    const [statusFilter, setStatusFilter] = useState("all");

    const handleStatusChange = (orderId, newStatus) => {
        updateStatus({ orderId, status: newStatus });
    };

    const filteredOrders =
        statusFilter === "all"
            ? orders
            : orders.filter((order) => order.status === statusFilter);

    if (isLoading) return <p className="p-4">Loading orders...</p>;
    if (isError) return <p className="p-4 text-red-500">Failed to load orders.</p>;

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">All Orders</h2>
                <div className="flex gap-2">
                    {["all", "pending", "processing", "completed"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                                statusFilter === status
                                    ? "bg-[#A62123] text-white border-[#A62123]"
                                    : "bg-white text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                            }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">No orders found</p>
            ) : (
                <div className="space-y-2">
                    {filteredOrders.map((order) => (
                        <div
                            key={order._id}
                            className="border border-gray-300 dark:border-gray-700 p-3 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => {
                                setSelectedOrder(order);
                                setIsModalOpen(true);
                            }}
                        >
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-gray-900 dark:text-gray-100">#{order._id.slice(-5)}</p>
                                <span
                                    className={`text-sm px-2 py-1 rounded ${statusStyles[order.status] || "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
                                >
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-1">
                                Order Type:{" "}
                                <span className="capitalize">
                                    {order.orderType || "N/A"}
                                </span>
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {order.userId?.username || "Unknown"} • {order.products.length} items
                            </p>
                            <p className="text-right font-bold mt-2 text-gray-900 dark:text-gray-100">Rs {order.total}</p>

                            {/* ✅ Admin only: status update */}
                            <div className="mt-2">
                                <label className="text-xs mr-2 text-gray-800 dark:text-gray-300">Change Status:</label>
                                <select
                                    className="text-sm border rounded p-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                                    value={order.status}
                                    onClick={(e) => e.stopPropagation()} // Prevent modal from opening
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ✅ Order Details Modal */}
            <OrderDetailsModal
                order={selectedOrder}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default PendingOrders;
