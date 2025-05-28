import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Rating } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/TokenContext';
import { API_BASE_URL, EVAL } from '../configs/host-config';

const CreateEvaluation = () => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.courseId;

  const { token, isLoggedIn } = useAuth();

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    if (content.trim().length < 10) {
      alert('내용은 최소 10자 이상이어야 합니다.');
      return;
    }

    if (rating < 1) {
      alert('별점을 1점 이상 선택해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}${EVAL}/create`,
        {
          content,
          rating,
          productId: courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 201) {
        alert('평가가 등록되었습니다!');
        navigate(`/info/${courseId}`);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        alert('이미 평가를 진행하셨습니다.');
        navigate(`/info/${courseId}`);
        return;
      }
      alert('평가 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant='h5' mb={2}>
        강의 평가 작성
      </Typography>

      <TextField
        fullWidth
        label='내용'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin='normal'
        multiline
        rows={6}
      />

      <Box display='flex' alignItems='center' sx={{ mt: 2, mb: 2 }}>
        <Typography sx={{ mr: 2 }}>별점:</Typography>
        <Rating
          name='rating'
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>

      <Button
        variant='contained'
        color='primary'
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        평가 등록
      </Button>
    </Box>
  );
};

export default CreateEvaluation;
