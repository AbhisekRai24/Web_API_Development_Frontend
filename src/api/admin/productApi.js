import axios from "../api"

export const getAllProductApi = (params) => axios.get("/admin/product", { params })