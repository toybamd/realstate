import { createContext, useState, useEffect } from "react";

import api from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        loadUser();

    }, []);

    const loadUser = async () => {

        const token = localStorage.getItem("access");

        if (!token) {

            setUser(null);

            return;

        }

        try {

            const response = await api.get(
                "admin-check/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(response.data);

        } catch (error) {

            console.log(error);

            setUser(null);

        }

    };

    const login = async (access, refresh) => {

        localStorage.setItem("access", access);

        localStorage.setItem("refresh", refresh);

        await loadUser();

    };

    const logout = () => {

        localStorage.removeItem("access");

        localStorage.removeItem("refresh");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}