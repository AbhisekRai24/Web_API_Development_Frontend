import React from 'react';
import Sidebar from '../../components/admin/sidebar';
import AddProductForm from '../../components/admin/AddProductForm';

const AddProductPage = () => {
    return (
        <div className="flex">

            <div className="flex-1 p-6 bg-gray-50 min-h-screen">
                <AddProductForm />
            </div>
        </div>
    );
};

export default AddProductPage;
