import axios from "./api"

export const registerUserApi = (formData) =>
  axios.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const loginUserApi = (data) => axios.post("/auth/login", data)