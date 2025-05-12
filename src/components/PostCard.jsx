import axios from "axios";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom"; // 추가
import { Button, Box } from "@mui/material"; // 추가
import { useAuth } from "../context/TokenContext";

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
          }
        );

        console.log(response);

        const resDto = response.data;

        if (resDto.statusCode === 200) {
          setPosts(resDto.result); // response는 posts 리스트
        } else {
          setError("질문을 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        setError("서버 요청 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [courseId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* 질문 생성 버튼 */}
      <Box display="flex" justifyContent="center" sx={{ mt: 3, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/create")}
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
          />
          {selectedPost?.id === post.id && (
            <Comment post={post} onClose={() => setSelectedPost(null)} />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostCard;
