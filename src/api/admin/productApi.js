import axios from "../api"

export const getAllProductApi = (params) => axios.get("/admin/product", { params })
export const createProductApi = (data) => 
    axios.post("/admin/product", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
export const deleteOneProductApi = (id) => {
    return axios.delete(`/admin/product/${id}`);
};
export const getProductsByCategoryApi = (categoryId) =>
  axios.get(`/admin/product/category/${categoryId}`)
