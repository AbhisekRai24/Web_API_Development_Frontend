// src/components/CategoryProducts.jsx
import React from 'react'
import { useParams } from 'react-router-dom'
import { useProductsByCategory } from '../hooks/admin/useAdminProduct'
import { useGetOneCategory } from '../hooks/admin/useAdminCategory' 

export default function CategoryProducts() {
   const { categoryId } = useParams()
   

  // Fetch products under the category
  const { data: products = [], isLoading: productsLoading, isError: productsError } = useProductsByCategory(categoryId)

  // Fetch category details (to get the name)
  const { category, isLoading: categoryLoading, isError: categoryError } = useGetOneCategory(categoryId)

  // Show loading spinner while either data is loading
  if (productsLoading || categoryLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  // Show error if either failed
  if (productsError || categoryError) return (
    <p className="text-center text-red-500">Failed to load products or category.</p>
  )

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">{category?.name || 'Category'}</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="p-4 shadow rounded bg-white">
              {product.productImage && (
                <img
                  src={`http://localhost:5050/${product.productImage}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">Price: Rs {product.price}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
