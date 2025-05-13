// src/contexts/AuthContext.js

import React, { createContext, useContext } from 'react';

// 하드코딩된 토큰
const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb29uMTExQG5hdmVyLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ3MTAwODczLCJleHAiOjE3NDcxMDQ0NzN9.5tx2uZADdl5GeCxo0Tj6dzhCgLc4Rsj75H8Ohgm0HI8';
// Context 생성
const AuthContext = createContext(token);

// Custom Hook
export const useAuth = () => useContext(AuthContext);

// Provider (고정된 값만 제공)
export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};

// 나중에 localStorage에 있는 값들을 받아서 전역적으로 사용하게끔
// 할 때 사용할 코드들
// // Context 생성
// const AuthContext = createContext(null);

// // Custom Hook
// export const useAuth = () => useContext(AuthContext);

// // Provider
// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     setToken(storedToken);
//   }, []);

//   return (
//     <AuthContext.Provider value={token}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
