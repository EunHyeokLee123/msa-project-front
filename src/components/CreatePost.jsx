import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider, useAuth } from '../context/TokenContext';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.id;

  const { token, isLoggedIn } = useAuth();

  const handleSubmit = async () => {
    console.log('버튼이 클릭되었음!');
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    if (title.trim().length < 5) {
      alert('제목은 최소 5자 이상이어야 합니다.');
      return;
    }

    if (content.trim().length < 10) {
      alert('내용은 최소 10자 이상이어야 합니다.');
      return;
    }

    try {
      console.log(courseId);

      const response = await axios.post(
        'http://ec2-3-38-145-197.ap-northeast-2.compute.amazonaws.com:8000/post-service/post/create',
        {
          title,
          content,
          productId: courseId, // 필요 시 동적으로
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response);

      if (response.status === 201) {
        alert('질문이 등록되었습니다!');
        navigate(`/info/${courseId}`); // 등록 후 홈으로 이동
      }
    } catch (err) {
      console.error(err);
      alert('질문 등록 중 오류 발생, 다시 등록해주시기 바랍니다.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant='h5' mb={2}>
        질문 작성
      </Typography>

      <TextField
        fullWidth
        label='제목'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin='normal'
      />

      <TextField
        fullWidth
        label='내용'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin='normal'
        multiline
        rows={6}
      />

      <Button
        variant='contained'
        color='primary'
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        등록하기
      </Button>
    </Box>
  );
};

export default CreatePost;
