import React, { useState } from 'react';
import { useAdminCategory, useDeleteOneCategory } from '../../hooks/admin/useAdminCategory';
import { getBackendImageUrl } from '../../utils/backend-image';
import { Link } from 'react-router-dom';
import DeleteModal from '../DeleteModal';

export default function CategoryTable() {
    const { categories, error, isPending } = useAdminCategory();
    const deleteCategoryHook = useDeleteOneCategory();
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = () => {
        deleteCategoryHook.mutate(deleteId, {
            onSuccess: () => {
                setDeleteId(null);
            },
        });
    };

    // Define colorful border styles
    const borderColors = [
      
        'border-blue-400',
        'border-green-400',
        'border-yellow-400',
        'border-purple-400',
        'border-orange-400',
    ];

    return (
        <div className="p-10 bg-gray-200 shadow-md rounded-xl">
            <DeleteModal
                isOpen={deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Confirmation"
                description="Click Confirm To Delete This Item."
            />
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold mb-6 text-black">Categories</h2>
                <Link to="/admin/category/create">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Add Category
                    </button>
                </Link>
            </div>

            {isPending && <p className="text-gray-500">Loading categories...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((cat, index) => (
                   <div
    key={cat._id}
    className={`bg-white border-2 ${borderColors[index % borderColors.length]} rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col`}
>
    <div className="relative w-full h-40 mb-4">
        <img
            src={getBackendImageUrl(cat.filepath)}
            alt={cat.name}
            className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 p-2 rounded-md opacity-0 hover:opacity-100 transition-opacity">
            <Link to={`/admin/category/${cat._id}`}>
                <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition">
                    View
                </button>
            </Link>
            <Link to={`/admin/category/${cat._id}/edit`}>
                <button className="bg-purple-500 text-white text-xs px-3 py-1 rounded hover:bg-purple-600 transition">
                    Edit
                </button>
            </Link>
            <button
                onClick={() => setDeleteId(cat._id)}
                className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition"
            >
                Delete
            </button>
        </div>
    </div>

    <h3 className="text-lg font-semibold text-gray-800 text-center">{cat.name}</h3>
</div>
                ))}
            </div>
        </div>
    );
}
