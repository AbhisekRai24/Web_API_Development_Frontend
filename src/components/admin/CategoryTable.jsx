import React, { useState } from 'react';
import { useAdminCategory, useDeleteOneCategory } from '../../hooks/admin/useAdminCategory';
import { getBackendImageUrl } from '../../utils/backend-image';
import { Link } from 'react-router-dom';
import DeleteModal from '../DeleteModal'

export default function CategoryTable() {
    const { categories, error, isPending } = useAdminCategory();
    const deleteCategoryHook = useDeleteOneCategory()
    const [deleteId, setDeleteId] = useState(null)
    const handleDelete = () => {
        deleteCategoryHook.mutate(
            deleteId,
            {
                onSuccess: () => {
                    setDeleteId(null)
                }
            }
        )
    }

    return (
        <div className="p-10 bg-gray-50 shadow-md rounded-xl">
            <DeleteModal
                isOpen={deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Confirmation"
                description="Click Confirm To Delete This Item."
            />
            <div className="flex items-center justify-between mb-10">

                <h2 className="text-2xl font-bold mb-6 text-gray-800">Categories</h2>
                <Link to="/admin/category/create">
                    <button className="bg-grey-600 text-blue px-4 py-2 rounded-lg border border-color-green hover:bg-blue-700 text-whitetransition">
                        Add Category
                    </button>
                </Link>
            </div>

            {isPending && <p className="text-gray-500">Loading categories...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <div key={cat._id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between">
                        <img
                            src={getBackendImageUrl(cat.filepath)}
                            alt={cat.name}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{cat.name}</h3>
                        <div className="mt-auto flex gap-2">
                            <Link to={"/admin/category/" + cat._id} className="flex-1">
                                <button className="w-full bg-grey-500 text-blue py-1 rounded hover:bg-blue-600 transition text-sm">
                                    View
                                </button>
                            </Link>
                            <Link to={`/admin/category/${cat._id}/edit`} className="flex-1">
                                <button className="w-full bg-grey-500 text-green py-1 rounded hover:bg-yellow-600 transition text-sm">
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={() => setDeleteId(cat._id)}
                                className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}