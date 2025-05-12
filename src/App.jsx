import './App.css';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/TokenContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/post' element={<PostCard />} />
            <Route path='/create' element={<CreatePost />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
