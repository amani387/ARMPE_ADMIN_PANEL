import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const stringfyBlogData = window.localStorage.getItem("blogData")
        if (stringfyBlogData) {
            const BlogData = JSON.parse(stringfyBlogData);
            const user = BlogData.user;
            setAuth(user)

        } else {
            setAuth(null)
        }

    }, [navigate, location]);
       return < AuthContext.Provider value = { auth } > { children }</AuthContext.Provider >

}
export const useAuth =()=>{
    const auth =useContext(AuthContext);
    return auth;
}
