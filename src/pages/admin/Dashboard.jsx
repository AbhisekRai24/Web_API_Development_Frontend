import React from 'react';
import {
    DashboardStats,
    TopSellingItems,
    PendingOrders
} from '../../components/admin/admindashboard';

const Dashboard = () => {
    return (
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 min-h-screen w-full text-gray-900 dark:text-gray-100 transition-colors">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>
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
