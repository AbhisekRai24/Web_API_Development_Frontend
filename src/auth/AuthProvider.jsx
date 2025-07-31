

// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// const AuthContextProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const login = (userData, token) => {
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(userData));
//         setUser(userData);
//     };

//     const logout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setUser(null);
//     };

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const storedUser = localStorage.getItem("user");

//         console.log("🚨 AuthContextProvider -> localStorage user:", storedUser);

//         if (token && storedUser) {
//             setUser(JSON.parse(storedUser));
//         }

//         setLoading(false); // Only after checking localStorage
//     }, []);

//     return (
//         <AuthContext.Provider
//             value={{ user, login, logout, loading, isAuthenticated: !!user }}
//         >
//             {loading ? <div>Loading...</div> : children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContextProvider;
import { createContext, useState, useEffect } from "react";
import { getUserService } from "../services/authService";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        // ❌ Do NOT navigate here
    };

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (token && storedUser) {
                try {
                    const userData = JSON.parse(storedUser);
                    await getUserService(userData._id);
                    setUser(userData);
                } catch (error) {
                    logout(); // just clears state & localStorage
                }
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, login, logout, loading, isAuthenticated: !!user }}
        >
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
