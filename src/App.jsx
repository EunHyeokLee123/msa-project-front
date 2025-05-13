import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import Header from './components/Header';
import CourseDetail from './features/course/CourseDetailPage';
import CourseUploadPage from './features/course/CourseUploadPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/TokenContext';
<<<<<<< HEAD
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import { CategoryProvider } from './context/CategoryContext';

import LoginPage from './page/LoginPage';
import SignupPage from './page/SignUpPage';
import Home from './page/Home';
import CourseDetails from './components/CourseDetails';
import CourseListPage from './features/course/CourseListPage';
import OrderPage from './components/feature/order/OrderPage';
import { CartContextProvider } from './context/CartContext';

function App() {
  return (
    <>
      <AuthProvider>
        <CategoryProvider>
          <CartContextProvider>
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/info' element={<CourseDetail />} />
              <Route path='/list' element={<CourseListPage />} />
              <Route path='/create' element={<CourseUploadPage />} />
              <Route path='/post' element={<PostCard />} />
              <Route path='/post/create' element={<CreatePost />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/items' element={<CourseDetails />} />
              <Route path='/order/cart' element={<OrderPage />} />
              <Route
                path='/courses/info/:courseId'
                element={<CourseDetail />}
              />
            </Routes>
          </Router>
          <Footer />
        </CartContextProvider>
        </CategoryProvider>
      </AuthProvider>
    </>
  );
}

export default App;
