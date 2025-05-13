import './App.css';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import Header from './components/Header';
import CourseDetail from './features/course/CourseDetailPage';
import CourseListPage from './features/course/CourseListPage';
import CourseUploadPage from './features/course/CourseUploadPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/TokenContext';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import { CategoryProvider } from './context/CategoryContext';

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
            </Routes>
            <Footer />
          </Router>
        </CategoryProvider>
      </AuthProvider>
    </>
  );
}

export default App;
