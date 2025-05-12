// src/contexts/AuthContext.js

import React, { createContext, useContext } from 'react';

// 하드코딩된 토큰
const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYUBuYXZlci5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0NzA1MzAwNSwiZXhwIjoxNzQ3MDU2NjA1fQ.vyqXE5I_N7Vts-TSEle2MJBrLWKODqC9ITQJ_mKNP5g';
const AuthContext = createContext(token);

// Custom Hook
export const useAuth = () => useContext(AuthContext);

// Provider (고정된 값만 제공)
export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};
