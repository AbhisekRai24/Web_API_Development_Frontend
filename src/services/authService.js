import { loginUserApi, registerUserApi , getUserByIdApi , updateUserApi} from "../api/authApi";

export const registerUserService = async (formData) => {
    try {
        const response = await registerUserApi(formData)
        return response.data // reponse body
    } catch (err) {
        throw err.response?.data || { message: "Registration Failed" }
    }
}
export const loginUserService = async (formData) => {
    try {
        const response = await loginUserApi(formData)
        return response.data
    } catch (err) {
        throw err.response?.data || { message: "Login Failed" }
    }
}


export const getUserService = async (id) => {
  try {
    const data = await getUserByIdApi(id)
    return data
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch user" }
  }
}

export const updateUserService = async (id, formData) => {
  try {
    const data = await updateUserApi(id, formData)
    return data
  } catch (err) {
    throw err.response?.data || { message: "Failed to update user" }
  }
}
