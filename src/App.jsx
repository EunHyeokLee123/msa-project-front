import './App.css';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import Header from './components/Header';
import CourseDetail from './features/course/CourseDetailPage';
import CourseUploadPage from './features/course/CourseUploadPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/TokenContext';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import { CategoryProvider } from './context/CategoryContext';

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   BrowserRouter,
// } from 'react-router-dom';

import LoginPage from './page/LoginPage';
import SignupPage from './page/SignUpPage';
import Home from './page/Home';
import CourseListPage from './features/course/CourseListPage';
import OrderPage from './components/feature/order/OrderPage';
import { CartContextProvider } from './context/CartContext';
import OrderListComponent from './components/feature/order/OrderListComponent';
import AdminOrderListComponent from './components/feature/order/AdminOrderListComponent';

function App() {
  return (
    <>
      <AuthProvider>
        <CategoryProvider>
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/info' element={<CourseDetail />} />
              <Route path='/list' element={<CourseListPage />} />
              <Route path='/create' element={<CourseUploadPage />} />
              <Route path='/post' element={<PostCard />} />
              <Route path='/create' element={<CreatePost />} />

              <Route
                path='/courses/info/:courseId'
                element={<CourseDetail />}
              />
              <Route path='/order/cart' element={<OrderPage />} />
              <Route path='/order/my-order' element={<OrderListComponent />} />
              <Route
                path='/order/my-course-order/:userId'
                element={<AdminOrderListComponent />}
              />
            </Routes>
            <Footer />
          </Router>
        </CategoryProvider>
      </AuthProvider>

      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
