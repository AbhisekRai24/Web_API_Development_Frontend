import axios from "./api"

export const registerUserApi = (formData) =>
  axios.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const loginUserApi = (data) => axios.post("/auth/login", data)

export const getUserByIdApi = (id) =>
  axios.get(`/admin/users/${id}`).then(res => res.data.data); // ✅ extract user

// UPDATE user info (with FormData for image upload)
export const updateUserApi = (id, formData) =>
  axios.put(`/admin/users/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then(res => res.data)