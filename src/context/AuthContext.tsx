import { createContext, useState } from "react";
interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  handleLogout: () => void;
  handleLogin: (token: string) => void;
}

// create a context with default values
const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {}, // empty function
  handleLogout: () => {}, // empty function
  handleLogin: () => {}, // empty function
});

// children is a special prop that holds all the children(consumer) components
const AuthProvider: any = ({ children }: any) => {
  const [token, setToken] = useState<string | null>("tokennnn");

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
  }

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  }
  
  return (
    // provide the context to all the children
    <AuthContext.Provider value={{ token, setToken, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  )
}
// expport the context and the provider
export { AuthContext, AuthProvider };
