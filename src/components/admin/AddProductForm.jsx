// import React, { useState } from 'react';

// export default function AddProductForm() {
//     const [formData, setFormData] = useState({
//         category: '',
//         itemName: '',
//         description: '',
//         price: '',
//         image: null
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleImageChange = (e) => {
//         setFormData(prev => ({ ...prev, image: e.target.files[0] }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Simulate API call
//         console.log('Product submitted:', formData);
//         // TODO: Add actual API integration logic
//     };

//     return (
//         <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md p-8 rounded-lg">
//             <h2 className="text-2xl font-semibold mb-6 text-gray-800">Product Information</h2>
//             <form onSubmit={handleSubmit} className="space-y-5">

//                 <div>
//                     <label className="block mb-1 font-medium text-left">Category *</label>
//                     <select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                         required
//                         className="w-full border border-gray-300 px-3 py-2 rounded-md"
//                     >
//                         <option value="">Select a category</option>
//                         <option value="Drinks">Drinks</option>
//                         <option value="Snacks">Snacks</option>
//                         <option value="Meals">Meals</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium text-left" >Item Name *</label>
//                     <input
//                         type="text"
//                         name="itemName"
//                         value={formData.itemName}
//                         onChange={handleChange}
//                         required
//                         className="w-full border border-gray-300 px-3 py-2 rounded-md"
//                         placeholder="Enter item name"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium text-left">Description *</label>
//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         required
//                         className="w-full border border-gray-300 px-3 py-2 rounded-md"
//                         placeholder="Enter item description"
//                         rows={3}
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium text-left">Price *</label>
//                     <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleChange}
//                         required
//                         className="w-full border border-gray-300 px-3 py-2 rounded-md"
//                         placeholder="0.00"
//                         min="0"
//                         step="0.01"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-2 font-medium text-left">Product Image</label>
//                     <input
//                         type="file"
//                         accept="image/png, image/jpeg, image/gif"
//                         onChange={handleImageChange}
//                         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
//                                    file:rounded-md file:border-0 file:text-sm file:font-semibold
//                                    file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                     />
//                 </div>

//                 <div className="flex justify-between">
//                     <button
//                         type="button"
//                         onClick={() => setFormData({ category: '', itemName: '', description: '', price: '', image: null })}
//                         className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         className="bg-[#A62123] hover:bg-[#C14547] text-white font-medium py-2 px-6 rounded"
//                     >
//                         Confirm & Add Product
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../auth/AuthProvider'; // Adjust path as needed
import { useCreateProduct } from '../../hooks/admin/useAdminProduct';
import { useAdminCategory } from '../../hooks/admin/useAdminCategory';


export default function AddProductForm() {
    const { user } = useContext(AuthContext);
    const userId = user?._id;

    const { categories, isLoading: loadingCategories } = useAdminCategory();
    const { mutate: createProduct, isLoading: creating } = useCreateProduct();

    const [formData, setFormData] = useState({
        category: "",
        itemName: "",
        description: "",
        price: "",
        image: null,
    });
    const [message, setMessage] = useState("");

    // State to hold preview URL
    const [previewUrl, setPreviewUrl] = useState(null);

    // Update preview URL when image changes
    useEffect(() => {
        if (!formData.image) {
            setPreviewUrl(null);
            return;
        }
        const objectUrl = URL.createObjectURL(formData.image);
        setPreviewUrl(objectUrl);

        // Cleanup when component unmounts or image changes
        return () => URL.revokeObjectURL(objectUrl);
    }, [formData.image]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        if (!userId) {
            setMessage("You must be logged in to add a product.");
            return;
        }

        const data = new FormData();
        data.append("name", formData.itemName);
        data.append("price", formData.price);
        data.append("categoryId", formData.category);
        data.append("userId", userId);
        data.append("description", formData.description);

        if (formData.image) {
            data.append("productImage", formData.image);
        }

        createProduct(data, {
            onSuccess: () => {
                setMessage("Product created successfully!");
                setFormData({
                    category: "",
                    itemName: "",
                    description: "",
                    price: "",
                    image: null,
                });
            },
            onError: (error) => {
                setMessage(error?.message || "Failed to create product.");
            },
        });
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Product Information
            </h2>
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
                encType="multipart/form-data"
            >
                <div>
                    <label className="block mb-1 font-medium text-left">Category *</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md"
                    >
                        <option value="">Select a category</option>
                        {loadingCategories ? (
                            <option disabled>Loading categories...</option>
                        ) : (
                            categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium text-left">Item Name *</label>
                    <input
                        type="text"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md"
                        placeholder="Enter item name"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-left">Description *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md"
                        placeholder="Enter item description"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-left">Price *</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium text-left">Product Image</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                {/* Image Preview */}
                {previewUrl && (
                    <div className="mt-4 text-center">
                        <p className="text-gray-700 font-semibold mb-3">Image Preview:</p>
                        <div className="inline-block border border-gray-300 shadow-md rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 mx-auto">
                            <img
                                src={previewUrl}
                                alt="preview"
                                className="w-64 h-64 object-cover"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{formData.image?.name}</p>
                    </div>
                )}


                {message && (
                    <p
                        className={`text-center ${message.includes("successfully")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() =>
                            setFormData({
                                category: "",
                                itemName: "",
                                description: "",
                                price: "",
                                image: null,
                            })
                        }
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded"
                        disabled={creating}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-[#A62123] hover:bg-[#C14547] text-white font-medium py-2 px-6 rounded"
                        disabled={creating}
                    >
                        {creating ? "Adding..." : "Confirm & Add Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}