

import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';


import LoginPage from './page/LoginPage';
import SignupPage from './page/SignUpPage';
import Home from './page/Home';


function App() {
  return (
    <>
          
          <Router>
          <Routes>
          <Route path='/' element={ <Home/>} />
      <Route path="/login" element={<LoginPage/>} />
       <Route path='/signup'element={ <SignupPage/>}/>
          </Routes>
        </Router>
      
    </>
  );
}

export default App;
