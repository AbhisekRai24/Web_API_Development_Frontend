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

import React, { useState } from 'react';

export default function AddProductForm() {
    const [formData, setFormData] = useState({
        category: '',
        itemName: '',
        description: '',
        price: '',
        image: null
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // You should replace this with your actual logged-in userId
    const userId = '68499d70f51812472f093425';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const data = new FormData();
            data.append('name', formData.itemName);
            data.append('price', formData.price);
            data.append('categoryId', formData.category); // assuming your backend categoryId is string like "Drinks"
            data.append('userId', userId);
            data.append('description', formData.description);
            if (formData.image) {
                data.append('image', formData.image);
            }

            const res = await fetch('/api/products', {
                method: 'POST',
                body: data,
            });

            const result = await res.json();

            if (res.ok) {
                setMessage('Product created successfully!');
                setFormData({
                    category: '',
                    itemName: '',
                    description: '',
                    price: '',
                    image: null,
                });
            } else {
                setMessage(result.message || 'Failed to create product');
            }
        } catch (error) {
            setMessage('Server error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Product Information</h2>
            <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
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
                        <option value="Drinks">Drinks</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Meals">Meals</option>
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

                {message && <p className="text-center text-red-600">{message}</p>}

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => {
                            setFormData({ category: '', itemName: '', description: '', price: '', image: null });
                            setMessage('');
                        }}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-[#A62123] hover:bg-[#C14547] text-white font-medium py-2 px-6 rounded"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Confirm & Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}

