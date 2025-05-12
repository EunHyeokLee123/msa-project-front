import './App.css';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import CourseDetail from './features/course/CourseDetailPage';
import CourseListPage from './features/course/CourseListPage';
import CourseUploadPage from './features/course/CourseUploadPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/TokenContext';
import CourseListPage from './features/course/CourseListPage';
import CourseDetail from './features/course/CourseDetailPage';
import OrderPage from './components/feature/order/OrderPage';
import { CartContextProvider } from './context/CartContext';

function App() {
  return (
    <>
      <AuthProvider>
        <CartContextProvider>
          <Router>
            <Routes>
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
              <Route path='/courses/list' element={<CourseListPage />} />
            </Routes>
          </Router>
        </CartContextProvider>
      </AuthProvider>
    </>
  );
}

export default App;
