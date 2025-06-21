import React from 'react';
import ordersImg from '../../assets/images/total_order.jpg';
import revenueImg from '../../assets/images/total_revenue.jpg';
import servedImg from '../../assets/images/served.jpg';
import pendingImg from '../../assets/images/pending.jpg';
const stats = [
  { title: "Total Orders Today", value: 127, bgImage: ordersImg },
  { title: "Revenue Today", value: "Rs4000", bgImage: revenueImg },
  { title: "Total Orders Served", value: "500", bgImage: servedImg },
  { title: "Pending Orders", value: 8, bgImage: pendingImg },
];

const DashboardStats = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {stats.map((item, idx) => (
      <div
        key={idx}
        className="relative p-4 rounded shadow text-white h-40 flex flex-col justify-end"
        style={{
          backgroundImage: `url(${item.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded"></div>

        {/* Content */}
        <h3 className="relative text-sm font-semibold">{item.title}</h3>
        <p className="relative text-2xl font-bold">{item.value}</p>
      </div>
    ))}
  </div>
);

export default DashboardStats;
