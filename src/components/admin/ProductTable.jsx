import React from 'react'
import { useAdminProduct } from '../../hooks/admin/useAdminProduct'

export default function ProductTable() {
    const { data, error, isPending, products, pageNumber,
        setPageNumber, pagination, canNextPage, canPreviousPage,
        pageSize, setPageSize, search, setSearch } = useAdminProduct()

    if (error) return <div className="text-red-600 font-semibold">{error.message}</div>

    const handlePrev = () => {
        if (canPreviousPage) {
            setPageNumber((prev) => prev - 1)
        }
    }
    const handleNext = () => {
        if (canNextPage) {
            setPageNumber((prev) => prev + 1)
        }
    }
    const handleSearch = (e) => {
        setPageNumber(1) // reset page number
        setSearch(e.target.value)
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Product Table</h2>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
                {/* Page Size Selector */}
                <div className="flex items-center space-x-2">
                    <label htmlFor="pageSize" className="font-medium text-gray-700">
                        Show
                    </label>
                    <select
                        id="pageSize"
                        value={pagination.limit}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                </div>

                {/* Search Input */}
                <div className="flex items-center space-x-2 mx-auto ">
                    <label htmlFor="search" className="font-medium text-gray-700">
                        Search:
                    </label>
                    <input
                        id="search"
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search products..."
                        className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-6 py-3 font-semibold text-gray-700 border-b border-gray-300">
                                Name
                            </th>
                            <th className="text-left px-6 py-3 font-semibold text-gray-700 border-b border-gray-300">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((row) => (
                            <tr
                                key={row._id}
                                className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                            >
                                <td className="px-6 py-4 border-b border-gray-200">{row.name}</td>
                                <td className="px-6 py-4 border-b border-gray-200">Rs.{row.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination Controls */}
            <div className="mt-6 flex justify-between items-center">
                <button
                    onClick={handlePrev}
                    disabled={!canPreviousPage}
                    className={`px-4 py-2 rounded-md font-medium transition ${canPreviousPage
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    Back
                </button>
                <span className="text-gray-700 font-medium">
                    Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={!canNextPage}
                    className={`px-4 py-2 rounded-md font-medium transition ${canNextPage
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
{/*             
            {
                products.map((row )=>
                    <>{row.name}</>
                )
            }

            {data.message} {data.success}
            {
                data.data && data.data.map(
                    (row) => 
                        <>
                            <p>{row.name}</p>
                            <p>{row.price}</p>
                        </>
                    
                )
            } */}
