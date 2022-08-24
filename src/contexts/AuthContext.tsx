import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";

interface IUser {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: IUser;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: IUser;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { data } = await api.post("/sessions", {
        email,
        password,
      });

      setData({
        token: data.token,
        user: data.user,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
