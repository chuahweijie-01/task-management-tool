import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

type AuthContextType = {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    return context!
}