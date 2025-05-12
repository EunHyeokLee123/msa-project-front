// src/contexts/AuthContext.js

import React, { createContext, useContext } from 'react';

// 하드코딩된 토큰
const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb29uMTExQG5hdmVyLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ3MDM2MDcxLCJleHAiOjE3NDcwMzk2NzF9.YOwNy9s2NQYVdADSXHz0QhhUbxa7DM3YZTAmZl8Mqwk';
// Context 생성
const AuthContext = createContext(token);

// Custom Hook
export const useAuth = () => useContext(AuthContext);

// Provider (고정된 값만 제공)
export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};
