// import { useMutation } from "@tanstack/react-query";
// import { loginUserService } from "../services/authService";
// import { toast } from "react-toastify";
// import { useContext } from "react";
// import { AuthContext } from "../auth/AuthProvider";
// export const useLoginUser = () => {
//     const { login } = useContext(AuthContext)

//     return useMutation(
//         {
//             mutationFn: loginUserService,
//             mutationKey: ["login_key"],
//             onSuccess: (data) => { // data -> body
//                 login(data?.data, data?.token)
//                 toast.success(data?.message || "Login Success")
//             },
//             onError: (err) => {
//                 toast.error(err?.message || "Login Failed")
//             }
//         }
//     )
// }

// 
import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export const useLoginUser = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: loginUserService,
        mutationKey: ["login_key"],
        // onSuccess: (data) => {
        //     const user = data?.data;
        //     const token = data?.token;
        //     const role = user?.role;

        //     console.log("Login success data:", data);
        //     console.log("Extracted user:", user);
        //     console.log("Extracted role:", role);

        //     // Update context
        //     login(user, token);

        //     // Store in localStorage
        //     localStorage.setItem("user", JSON.stringify(user));
        //     localStorage.setItem("token", token);

        //     toast.success(data?.message || "Login Success");

        //     // Redirect based on role
        //     if (role?.toLowerCase() === "admin") {
        //         navigate("/admin/dashboard");
        //     } else {
        //         navigate("/normal/dash");
        //     }
        // },
        onSuccess: (data) => {
            const user = data?.data;
            const token = data?.token;
            const role = user?.role;

            console.log("Login success:", user);
            console.log("Role:", role);

            // ✅ Call login, which sets user + localStorage
            login(user, token);

            // ❌ DO NOT manually call localStorage.setItem again
            // It may override or race with the context

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
