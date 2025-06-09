import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setSuccessMessage('');
    setErrorMessage('');

    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/user-service/user/reset-password',
        { email }
      );

      if (response.status === 200) {
        setSuccessMessage('임시 비밀번호가 이메일로 전송되었습니다. 메일함을 확인해주세요.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('해당 이메일로 등록된 계정을 찾을 수 없습니다.');
      } else {
        setErrorMessage('서버 오류입니다. 관리자에게 문의하세요.');
      }
      console.error(error);
    }
  };

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={5}>
        <Card sx={{ mt: 8 }}>
          <CardHeader title='비밀번호 찾기' sx={{ textAlign: 'center' }} />
          <CardContent>
            <Box component='form' onSubmit={handleSubmit}>
              <TextField
                label='이메일'
                fullWidth
                margin='normal'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />

              {successMessage && (
                <Alert severity='success' sx={{ mt: 2 }}>
                  {successMessage}
                </Alert>
              )}

              {errorMessage && (
                <Alert severity='error' sx={{ mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}

              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mt: 2 }}
              >
                임시 비밀번호 발급
              </Button>

              <Button
                variant='outlined'
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate('/login')}
              >
                로그인으로 돌아가기
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
