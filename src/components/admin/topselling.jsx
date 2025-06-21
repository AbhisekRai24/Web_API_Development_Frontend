import React from 'react';

const items = [
  { name: 'Classic Burger', qty: 45, revenue: 'Rs675.00' },
  { name: 'Veggie Pizza', qty: 30, revenue: 'Rs900.00' },
];

const TopSellingItems = () => (
  <div className="bg-white p-4 rounded-2xl shadow">
    <h2 className="text-lg font-semibold mb-2">Top Selling Items Today</h2>
    <p className="text-sm text-gray-500 mb-4">Best performing menu items by quantity sold</p>

    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.qty}</td>
              <td className="px-4 py-2">{item.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TopSellingItems;
