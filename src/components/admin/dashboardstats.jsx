import React from 'react';

const stats = [
  { title: "Total Orders Today", value: 127, note: "+12% from yesterday" },
  { title: "Revenue Today", value: "Rs4000", note: "+8.2% from yesterday" },
  { title: "Total Orders Served", value: "500", note: "-2.1% from yesterday" },
  { title: "Pending Orders", value: 8, note: "Requires attention" },
];

const DashboardStats = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {stats.map((item, idx) => (
      <div key={idx} className="bg-white p-4 rounded shadow">
        <h3 className="text-sm text-gray-500">{item.title}</h3>
        <p className="text-2xl font-bold">{item.value}</p>
        <p className={`text-sm ${item.note.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
          {item.note}
        </p>
      </div>
    ))}
  </div>
);

export default DashboardStats;
