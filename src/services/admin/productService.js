import { getAllProductApi } from "../../api/admin/productApi";

export const getAllProductService = async (params) => {
    try {
        const response = await getAllProductApi(params)
        return response.data
    } catch (err) {
        throw err.response?.data || { message: 'Product fetch failed' }
    }
}