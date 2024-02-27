"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const { createContext, useState, useContext, useEffect } = require("react");

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const pathName = usePathname();
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/profile");
            const data = await response.data;
            setUser(data?.user);
        } catch (error) {
            toast.error(error.message);
            router.push("/login");
        }
    };

    const logoutHandler = async () => {
        try {
            const resposne = await axios.post("/api/logout");
            const data = await resposne.data;
            toast.success(data.msg);
            setUser(null);
            router.push("/login");
        } catch (error) {
            toast.error(error?.resposne?.data?.error);
        }
    };

    const isPrivatePath = ["/", "/update-profile"];

    useEffect(() => {
        if (isPrivatePath.includes(pathName)) {
            fetchData();
        } else {
            setUser(null);
        }
    }, [pathName]);

    return (
        <AuthContext.Provider value={{ user, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    );
};
