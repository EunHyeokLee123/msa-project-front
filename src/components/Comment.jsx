import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Stack,
  Chip,
  IconButton,
  Divider,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/TokenContext";

export default function Comment({ post, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const token = useAuth();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/post-service/post/comment/find",
          {
            params: { id: post.id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComments(response.data.result);
      } catch (error) {
        console.error("댓글 불러오기 실패:", error);
      }
    };

    fetchComments();
  }, [post.id]);

  const handleCreateComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/post-service/post/comment/create",
        {
          content: newComment,
          postId: post.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("답변이 등록되었습니다.");
      setNewComment(""); // 입력창 초기화
      setComments((prev) => [...prev, response.data.result]); // 새 댓글 추가
    } catch (err) {
      console.error("답변 등록 실패:", err);
      alert("답변 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Card variant="outlined" sx={{ p: 3, my: 2, backgroundColor: "#f9f9f9" }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">{post.title}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="subtitle2" color="text.secondary" mb={2}>
        작성자 ID: {post.userId}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mb: 2 }}>
        {post.content}
      </Typography>

      <Stack direction="row" spacing={1} mb={3}>
        <Chip label={`상태: ${post.status}`} />
      </Stack>

      <Typography variant="h6" gutterBottom>
        답변 {comments.length}
      </Typography>

      <Stack spacing={2} mb={3}>
        {comments.map((comment, idx) => (
          <Paper key={idx} sx={{ p: 2, backgroundColor: "#fff" }} elevation={1}>
            <Typography variant="subtitle2" color="text.secondary">
              사용자 ID: {comment.userId}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {comment.content}
            </Typography>
          </Paper>
        ))}
      </Stack>

      {/* 답변 작성 영역 */}
      <TextField
        fullWidth
        label="답변 입력"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        multiline
        rows={3}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateComment}
        sx={{ mt: 2 }}
      >
        답변 등록
      </Button>
    </Card>
  );
}
