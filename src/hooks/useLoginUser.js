import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUserService, updateUserService, getUserService, requestResetService , resetPasswordService} from "../services/authService";
import { toast } from "react-toastify";
import { useContext , useState  } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";


export const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const requestReset = async (email) => {
        setLoading(true);
        try {
            const res = await requestResetService(email);
            return res.data;
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (token, password) => {
        setLoading(true);
        try {
            const res = await resetPasswordService(token, password);
            return res.data;
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, requestReset, resetPassword };
};

export const useLoginUser = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: loginUserService,
        mutationKey: ["login_key"],

        onSuccess: (data) => {
            const user = data?.data;
            const token = data?.token;
            const role = user?.role;

            console.log("Login success:", user);
            console.log("Role:", role);

            // ✅ Call login, which sets user + localStorage
            login(user, token);


            toast.success(data?.message || "Login Success");

            if (role?.toLowerCase() === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/normal/dash");
            }
        },

        onError: (err) => {
            toast.error(err?.message || "Login Failed");
        },
    });
};

export const useUser = (userId) => {
    return useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserService(userId),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
    });
};

export const useUpdateUser = (userId) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (formData) => updateUserService(userId, formData),
        onSuccess: (data) => {
            toast.success(data?.message || "Profile updated successfully")
            // Invalidate user query to refresh updated data
            queryClient.invalidateQueries(["user", userId])
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to update profile")
        },
    })
}
