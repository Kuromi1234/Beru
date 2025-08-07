import { createContext, useContext, useState, useEffect } from "react";

// Helper to decode JWT
const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (err) {
    console.error("Token decode failed", err);
    return null;
  }
};

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      const decodedToken = decodeToken(token);

      // Attach empId if present in token
      if (decodedToken?.employeeId) {
        return { ...parsedUser, employeeId: decodedToken.employeeId };
      }

      return parsedUser;
    }

    return null;
  });

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));

    const token = localStorage.getItem("token");
    const decodedToken = decodeToken(token);

    // Add empId from token to the user object
    const userWithEmpId = decodedToken?.employeeId
      ? { ...userData, employeeId: decodedToken.employeeId }
      : userData;

    setUser(userWithEmpId);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
