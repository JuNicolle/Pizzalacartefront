import { createContext } from "react";

const AuthContext = createContext({ 
    isAuthentified: false,
    setIsAuthentified: () => {},
    user: {},
    setUser: () => {}
    //roles : [],
    //setRoles: () => {}
});

export default AuthContext