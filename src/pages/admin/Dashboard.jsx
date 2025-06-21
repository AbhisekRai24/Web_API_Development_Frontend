import React from 'react';
import {
    DashboardStats,
    TopSellingItems,
    PendingOrders
} from '../../components/admin/admindashboard';

const Dashboard = () => {
    return (
        <main className="flex-1 bg-gray-100 p-6 min-h-screen w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
                <span className="text-green-600 font-medium">Live</span>
            </div>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <TopSellingItems />
                <PendingOrders />
            </div>
        </main>
    );
};
export default Dashboard;
