// components/DashboardStats.jsx
import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import ordersImg from "../../assets/images/total_order.jpg";
import revenueImg from "../../assets/images/total_revenue.jpg";
import servedImg from "../../assets/images/served.jpg";
import pendingImg from "../../assets/images/pending.jpg";
import { useFetchAllOrders } from "../../hooks/useCreateOrder";

const DashboardStats = () => {
  const { data: orders = [], isLoading } = useFetchAllOrders();

  // Completed orders today
  const [completedTodayCount, setCompletedTodayCount] = useState(0);
  const [revenueToday, setRevenueToday] = useState(0);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [totalOrdersServed, setTotalOrdersServed] = useState(0);

  useEffect(() => {
    if (!orders.length) {
      setCompletedTodayCount(0);
      setRevenueToday(0);
      setPendingOrdersCount(0);
      setTotalOrdersServed(0);

      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Completed orders today
    const completedTodayOrders = orders.filter((order) => {
      if (order.status !== "completed") return false;
      const orderDate = new Date(order.date);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    });

    setCompletedTodayCount(completedTodayOrders.length);

    const totalRevenue = completedTodayOrders.reduce(
      (sum, order) => sum + (order.total || 0),
      0
    );
    setRevenueToday(totalRevenue);

    // Pending orders count (all time or you can filter by today if you want)
    const pendingOrders = orders.filter(order => order.status === "pending");
    setPendingOrdersCount(pendingOrders.length);

    // Total orders served (all completed orders overall)
    const totalServed = orders.filter(order => order.status === "completed").length;
    setTotalOrdersServed(totalServed);
  }, [orders]);


  // You can create similar hooks/logic for revenue, pending orders, etc.

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Orders Today"
        value={isLoading ? "Loading..." : completedTodayCount}
        bgImage={ordersImg}
      />
      <StatCard
        title="Revenue Today"
        value={isLoading ? "Loading..." : `Rs ${revenueToday.toLocaleString()}`}
        bgImage={revenueImg}
      />
      <StatCard
        title="Total Orders Served"
        value={isLoading ? "Loading..." : totalOrdersServed}
        bgImage={servedImg}
      />
      <StatCard
        title="Pending Orders"
        value={isLoading ? "Loading..." : pendingOrdersCount}
        bgImage={pendingImg}
      />
    </div>
  );
};

export default DashboardStats;
