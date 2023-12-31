import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest, editUserRequest, deleteUserRequest } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            //console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response.data.message);
            setErrors(error.response.data.message);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            //console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            // console.log(error);
            setErrors(error.response.data.message);
        }
    }

    const logout = () => {
        logoutRequest();
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function chekLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
            }
        }
        chekLogin();
    }, []);

    const editUser = async (username, id) => {
        try {
            const res = await editUserRequest(username, id);
            console.log(res.data);
            setUser({ ...user, username: username })
        } catch (error) {
            console.log(error.response.data.message);
            setErrors(error.response.data.message);
        }
    }
    
    const deleteUser = async (id) => {
        logoutRequest();
        const res = await deleteUserRequest(id)
        console.log(res);
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            user,
            isAuthenticated,
            errors,
            loading,
            logout,
            editUser,
            deleteUser
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe estar definido en un contexto');

    }
    return context;
}
