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

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/header' element={<Header />} />
            <Route path='/footer' element={<Footer />} />
            <Route path='/info' element={<CourseDetail />} />
            <Route path='/list' element={<CourseListPage />} />
            <Route path='/create' element={<CourseUploadPage />} />
            <Route path='/post' element={<PostCard />} />
            <Route path='/create' element={<CreatePost />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
