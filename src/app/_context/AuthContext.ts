// src/context/AuthContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useSelector } from "react-redux";

// Definisikan tipe data untuk konteks otentikasi
interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
  login: (credentials: any) => void;
  logout: () => void;
}

// Buat konteks otentikasi dengan nilai default
const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  token: null,
  login: () => {},
  logout: () => {},
});

// Komponen penyedia otentikasi
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Menggunakan useSelector untuk mengakses state dari Redux
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const token = useSelector((state: any) => state.auth.token);

  // Ambil aksi login dan logout dari Redux
  const login = (credentials: any) => {
    // Dispatch aksi login dari Redux
    // Misalnya, menggunakan useDispatch untuk memanggil aksi login dari Redux
  };

  const logout = () => {
    // Dispatch aksi logout dari Redux
    // Misalnya, menggunakan useDispatch untuk memanggil aksi logout dari Redux
  };

  // Nilai konteks yang akan disediakan kepada komponen anak
  const contextValue: AuthContextProps = {
    isAuthenticated,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Fungsi utilitas untuk menggunakan konteks otentikasi
export const useAuth = () => {
  return useContext(AuthContext);
};
