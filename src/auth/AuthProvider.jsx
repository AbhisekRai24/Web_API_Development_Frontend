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

//         if (token && storedUser) {
//             setUser(JSON.parse(storedUser));
//         }

//         setLoading(false);
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <AuthContext.Provider
//             value={{ user, login, logout, isAuthenticated: user !== null }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };


// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext()

// const AuthContextProvider = ( {children} ) => {
//     const [ user, setUser ] = useState(null)
//     const [ loading, setLoading ] = useState(true)

//     const login = (userData, token) => {
//         setLoading(true)
//         localStorage.setItem("token", token)
//         localStorage.setItem("user", JSON.stringify(userData))
//         setUser(userData)
//         setLoading(false)
//     }
//     const logout = () => {
//         setLoading(true)
//         localStorage.removeItem("token")
//         localStorage.removeItem("user")
//         setUser(null)
//         setLoading(false)
//     }
//     useEffect(() => {
//         setLoading(true)
//         const token = localStorage.getItem("token")
//         const storedUser = localStorage.getItem("user")
//         if(token && storedUser){
//             setUser(JSON.parse(storedUser))
//         }else{
//             logout()
//         }
//         setLoading(false)
//     }, [])
//     return (
//         <AuthContext.Provider
//             value={ {user, login, loading, logout, isAuthenticated: user !== null} }
//         >
//             {children}
//         </AuthContext.Provider>
//     )
// }
// export default AuthContextProvider


import { createContext, useState, useEffect } from "react";

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
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        console.log("🚨 AuthContextProvider -> localStorage user:", storedUser);

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false); // Only after checking localStorage
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
