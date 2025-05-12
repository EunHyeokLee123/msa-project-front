import './App.css';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import Header from './components/Header';
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
            <Route path='/post' element={<PostCard />} />
            <Route path='/create' element={<CreatePost />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
