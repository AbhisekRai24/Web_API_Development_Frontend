import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAllProductService, createProductService, deleteProductService, getProductsByCategoryService } from "../../services/admin/productService";
import { useState } from "react";
import { toast } from "react-toastify";


export const useAdminProduct = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [search, setSearch] = useState("")

    const query = useQuery(
        {
            queryKey: ["admin_product", pageNumber, pageSize, search], // key/variable to rerun function
            queryFn: () => {
                return getAllProductService(
                    {
                        page: pageNumber,
                        limit: pageSize,
                        search: search
                    } // params
                )
            },
            keepPreviousData: true // cache old data
        }
    )
    const products = query.data?.data || []
    const pagination = query.data?.pagination || {
        page: 1,
        totalPages: 1,
        limit: 10
    }
    const canPreviousPage = pagination.page > 1
    const canNextPage = pagination.page < pagination.totalPages

    return {
        ...query,
        products,
        pageNumber,
        setPageNumber,
        pagination,
        canPreviousPage,
        canNextPage,
        pageSize,
        setPageSize,
        search,
        setSearch
    }
}
export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProductService,
        onSuccess: () => {
            toast.success("Product created");
            queryClient.invalidateQueries(["admin_products"]);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to create product");
        }
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProductService,
        onSuccess: () => {
            toast.success("Product deleted");
            queryClient.invalidateQueries(["admin_product"]); // ensure it refetches list
        },
        onError: (err) => {
            toast.error(err.message || "Failed to delete product");
        }
    });
};

export const useProductsByCategory = (categoryId) => {
    return useQuery({
        queryKey: ["products_by_category", categoryId],
        queryFn: () => getProductsByCategoryService(categoryId),
        enabled: !!categoryId
    })
}