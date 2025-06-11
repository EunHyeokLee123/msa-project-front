// // src/contexts/AuthContext.js

// // Custom Hook
// export const useAuth = () => useContext(AuthContext);

// // Provider (고정된 값만 제공)
// export const AuthProvider = ({ children }) => {
//   return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
// };

// src/context/TokenContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setToken(token);
    setRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('KAKAO');
    setToken('');
    setRole('');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ token, role, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook으로 쉽게 사용할 수 있도록
export const useAuth = () => useContext(AuthContext);
