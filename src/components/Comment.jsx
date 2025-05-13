import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete'; // 추가
import { useAuth } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';

export default function Comment({ post, onClose, onCommentsUpdated }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const token = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/post-service/post/comment/find',
          {
            params: { id: post.id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setComments(response.data.result);
        // 댓글 수를 상위 컴포넌트로 전달
      } catch (error) {
        console.error('댓글 불러오기 실패:', error);
      }
    };

    fetchComments();
  }, [post.id]);

  const handleCreateComment = async () => {
    const trimmed = newComment.trim();

    if (!trimmed) return;

    if (trimmed.length < 10) {
      alert('댓글은 최소 10자 이상 입력해야 합니다.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/post-service/post/comment/create',
        {
          content: newComment,
          postId: post.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert('답변이 등록되었습니다.');
      setNewComment(''); // 입력창 초기화
      setComments((prev) => [...prev, response.data.result]); // 새 댓글 추가
      if (typeof onCommentsUpdated === 'function') {
        onCommentsUpdated(1); // 댓글 1개 증가
      }
    } catch (err) {
      console.error('답변 등록 실패:', err);
      alert('답변 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <Card variant='outlined' sx={{ p: 3, my: 2, backgroundColor: '#f9f9f9' }}>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5'>{post.title}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant='subtitle2' color='text.secondary' mb={2}>
        작성자 ID: {post.userId}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
        {post.content}
      </Typography>

      <Stack direction='row' spacing={1} mb={3}>
        <Chip label={`상태: ${post.status}`} />
      </Stack>

      <Typography variant='h6' gutterBottom>
        답변 {comments.length}
      </Typography>

      <Stack spacing={2} mb={3}>
        {comments.map((comment, idx) => (
          <Paper
            key={idx}
            sx={{
              p: 2,
              backgroundColor: '#fff',
              position: 'relative',
              overflow: 'visible',
            }}
            elevation={1}
          >
            {/* 삭제 버튼 */}
            <IconButton
              size='small'
              sx={{ position: 'absolute', top: 4, right: 4 }}
              onClick={async () => {
                const confirmDelete = window.confirm(
                  '정말로 이 댓글을 삭제하시겠습니까?',
                );
                if (!confirmDelete) return;

                try {
                  console.log(comment);

                  const response = await axios.delete(
                    'http://localhost:8000/post-service/post/comment/delete',
                    {
                      params: { id: comment.commentId },
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    },
                  );

                  if (response.data.result === true) {
                    alert('댓글이 삭제되었습니다.');
                    setComments((prev) =>
                      prev.filter((c) => c.commentId !== comment.commentId),
                    );
                    if (typeof onCommentsUpdated === 'function') {
                      onCommentsUpdated(-1); // 댓글 1개 감소
                    }
                  }
                } catch (error) {
                  console.log(error);

                  if (error.response?.status === 401) {
                    alert('댓글 삭제 권한이 없습니다.');
                  } else {
                    alert(
                      error.response?.data?.message ||
                        '댓글 삭제 중 오류가 발생했습니다.',
                    );
                  }
                }
              }}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>

            {/* 댓글 내용 */}
            <Typography variant='subtitle2' color='text.secondary'>
              사용자 ID: {comment.userId}
            </Typography>
            <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
              {comment.content}
            </Typography>
          </Paper>
        ))}
      </Stack>

      {/* 답변 작성 영역 */}
      <TextField
        fullWidth
        label='답변 입력'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        multiline
        rows={3}
        variant='outlined'
      />
      <Button
        variant='contained'
        color='primary'
        onClick={handleCreateComment}
        sx={{ mt: 2 }}
      >
        답변 등록
      </Button>
    </Card>
  );
}
