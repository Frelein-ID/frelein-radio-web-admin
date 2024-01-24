import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAdminData } from "../_services/AdminServices";
import { Users } from "../_interfaces/Users";

interface AuthContextProps {
  user: Users | null;
  token: string | null;
}

// Buat konteks otentikasi dengan nilai default
const AuthContext = createContext<AuthContextProps>({
  user = null,
  token = null,
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const loadDataFromLocalStorage = (data: string): string => {
    return localStorage.getItem(data) || "";
  };

  useEffect(() => {
    setToken(loadDataFromLocalStorage("token"));
    setUserId(loadDataFromLocalStorage("userId"));
  }, []);

  useEffect(() => {
    try {
      await getAdminData(token, userId).then((value) => {
        return setUser(value);
      });
    } catch (error) {
      console.log({ error });
    }
  }, [token, userId]);

  // Nilai konteks yang akan disediakan kepada komponen anak
  const contextValue: AuthContextProps = {
    user,
    token,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Fungsi utilitas untuk menggunakan konteks otentikasi
export const useAuth = () => {
  return useContext(AuthContext);
};
