import React from 'react';

const PendingOrders = () => (
    <div className="bg-white p-4 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Pending Orders</h2>
            <button className="text-blue-600 text-sm hover:underline">View All</button>
        </div>
        <div className="space-y-2">
            <div className="border p-3 rounded">
                <div className="flex justify-between items-center">
                    <p className="font-semibold">#1</p>
                    <span className="bg-gray-200 text-sm px-2 rounded">preparing</span>
                </div>
                <p className="text-sm text-gray-600">John Doe • 3 items</p>
                <p className="text-right font-bold mt-2">Rs100</p>
            </div>
        </div>
    </div>
);

export default PendingOrders;
