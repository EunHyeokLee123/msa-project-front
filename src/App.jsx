import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import Header from '../src/common-layouts/Header';
import CourseDetail from './features/course/CourseDetailPage';
import CourseUploadPage from './features/course/CourseUploadPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/TokenContext';
import Footer from '../src/common-layouts//Footer';
import MainPage from './components/MainPage';
import { CategoryProvider } from './context/CategoryContext';
import LoginPage from './page/LoginPage';
import SignupPage from './page/SignUpPage';
import CourseSearchPage from './features/course/CourseSearchPage';
import OrderPage from './features/order/OrderPage';
import { CartContextProvider } from './context/CartContext';
import OrderListComponent from './features/order/OrderListComponent';
import AdminOrderListComponent from './features/order/AdminOrderListComponent';
import { Dashboard } from '@mui/icons-material';
import DashBoardPage from './features/order/DashBoardPage';
import MyPage from './page/MyPage';
import ResetPassword from './page/ResetPassword';

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
                <Route path='/info/:courseId' element={<CourseDetail />} />
                <Route
                  path='/list?page=:page&size:size'
                  element={<CourseSearchPage />}
                />
                <Route
                  path='/category/:category'
                  element={<CourseSearchPage />}
                />
                <Route path='/courseCreate' element={<CourseUploadPage />} />
                <Route path='/post' element={<PostCard />} />
                <Route path='/post/create' element={<CreatePost />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/reset-password' element={<ResetPassword />} />

                <Route path='/signup' element={<SignupPage />} />
                {/* <Route path='/items' element={<CourseDetails />} /> */}
                <Route path='/order/cart' element={<OrderPage />} />
                <Route path='/mypage' element={<MyPage />} />
                <Route
                  path='/order/my-order'
                  element={<OrderListComponent />}
                />
                <Route path='/dashboard' element={<DashBoardPage />} />
                <Route
                  path='/order/my-course-order'
                  element={<AdminOrderListComponent />}
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
