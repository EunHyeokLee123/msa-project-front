// src/contexts/AuthContext.js

import React, { createContext, useContext } from "react";

// 하드코딩된 토큰
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyeXU5OTlAbmF2ZXIuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NDcwMjcyOTUsImV4cCI6MTc0NzAzMDg5NX0.rtb0sX6aHYXpdEOG1Ek3LzqwykAljfoqqvi4gjpDQUA";
// Context 생성
const AuthContext = createContext(token);

// Custom Hook
export const useAuth = () => useContext(AuthContext);

// Provider (고정된 값만 제공)
export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};
