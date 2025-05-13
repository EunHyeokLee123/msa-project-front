// src/contexts/AuthContext.js

import React, { createContext, useContext } from 'react';

// 하드코딩된 토큰
const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb29uMTExQG5hdmVyLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ3MDk0ODY2LCJleHAiOjE3NDcwOTg0NjZ9.6I_bAAuY8W9oU7d4SL1An0Yv4SM73Q_3dB8LBTsMbIs';
// Context 생성
const AuthContext = createContext(token);

// Custom Hook
export const useAuth = () => useContext(AuthContext);

// Provider (고정된 값만 제공)
export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};
