import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import ordersImg from "../../assets/images/total_order.jpg";
import revenueImg from "../../assets/images/total_revenue.jpg";
import servedImg from "../../assets/images/served.jpg";
import pendingImg from "../../assets/images/pending.jpg";
import { useFetchAllOrders } from "../../hooks/useCreateOrder";

const DashboardStats = () => {
  const { data: orders = [], isLoading } = useFetchAllOrders();

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

    const pendingOrders = orders.filter(order => order.status === "pending");
    setPendingOrdersCount(pendingOrders.length);

    const totalServed = orders.filter(order => order.status === "completed").length;
    setTotalOrdersServed(totalServed);
  }, [orders]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Orders Today"
        value={isLoading ? "Loading..." : completedTodayCount}
        bgImage={ordersImg}
      // Add dark mode classes or pass a prop for dark styling if needed
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
