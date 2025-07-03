import { getAllProductApi , createProductApi , deleteOneProductApi ,getProductsByCategoryApi} from "../../api/admin/productApi";

export const getAllProductService = async (params) => {
    try {
        const response = await getAllProductApi(params)
        return response.data
    } catch (err) {
        throw err.response?.data || { message: 'Product fetch failed' }
    }
}

export const createProductService = async (data) => {
    try {
        const response = await createProductApi(data)
        return response.data
    } catch (err) {
        throw err.response?.data || { "message": "Failed to create" }
    }

}
export const deleteProductService = async (id) => {
    try {
        const response = await deleteOneProductApi(id);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to delete product" };
    }
};

export const getProductsByCategoryService = async (categoryId) => {
  const response = await getProductsByCategoryApi(categoryId)
  // You can do additional processing here if needed
  return response.data.data  // Return the actual product array
}