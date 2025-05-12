

import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/TokenContext';

import LoginPage from './page/LoginPage';
import SignupPage from './page/SignUpPage';


function App() {
  return (
    <>
          
          <Router>
          <Routes>
      <Route path="/login" element={<LoginPage/>} />
       <Route path='/signup'element={ <SignupPage/>}/>
          </Routes>
        </Router>
      
    </>
  );
}

export default App;
