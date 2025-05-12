import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import Comment from './Comment';
import { useNavigate } from 'react-router-dom'; // 추가
import { Button, Box } from '@mui/material'; // 추가
import { useAuth } from '../context/TokenContext';

const PostCard = () => {
  const courseId = 4;

  const navigate = useNavigate();

  const token = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/post-service/post/list?id=${courseId}`,
          {
            params: { id: courseId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(response);

        const resDto = response.data;

        if (resDto.statusCode === 200) {
          setPosts(resDto.result); // response는 posts 리스트
        } else {
          setError('질문을 불러오는 데 실패했습니다.');
        }
      } catch (err) {
        setError('서버 요청 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [courseId]);

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(
        'http://localhost:8000/post-service/post/delete',
        {
          params: { id: postId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        alert('게시물이 삭제되었습니다.');
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('게시물 삭제 권한이 없습니다.');
      } else {
        alert(
          error.response?.data?.message ||
            '게시물 삭제 중 오류가 발생했습니다.',
        );
      }
    }
  };

  // 🔹 수정 처리 함수
  const handleUpdatePost = async (postId, newTitle, newContent) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/post-service/post/modify',
        {
          postId: postId,
          title: newTitle,
          content: newContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.statusCode === 200) {
        alert('게시물이 수정되었습니다.');
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === postId
              ? { ...p, title: newTitle, content: newContent }
              : p,
          ),
        );
      } else {
        alert('수정 실패: ' + response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 304) {
        alert('게시물 수정 권한이 없습니다.');
      } else {
        alert(
          error.response?.data?.message ||
            '게시물 수정 중 오류가 발생했습니다.',
        );
      }
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* 질문 생성 버튼 */}
      <Box display='flex' justifyContent='center' sx={{ mt: 3, mb: 2 }}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/create')}
        >
          질문 생성
        </Button>
      </Box>
      {/* 게시물 리스트 */}
      {posts.map((post) => (
        <div key={post.id}>
          <PostItem
            post={post}
            onClick={() =>
              setSelectedPost((prev) => (prev?.id === post.id ? null : post))
            }
            onDelete={handleDeletePost}
            commentCount={post.commentCount}
            onUpdate={handleUpdatePost}
          />
          {selectedPost?.id === post.id && (
            <Comment
              post={post}
              onClose={() => setSelectedPost(null)}
              onCommentsUpdated={(delta) => {
                setPosts((prevPosts) =>
                  prevPosts.map((p) =>
                    p.id === post.id
                      ? { ...p, commentCount: p.commentCount + delta }
                      : p,
                  ),
                );
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostCard;
