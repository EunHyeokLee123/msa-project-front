import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box
} from '@mui/material';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const onChangeIdHandler = (e) => {
    setId(e.target.value);
    setIdError('');
    setLoginError('');
  };

  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
    setLoginError('');
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!id) {
      setIdError('이메일을 입력해주세요.');
      return;
    }

    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/user-service/user/login', {
        email: id,
        password: password
      });

      if (response.status === 200) {
        alert('로그인 성공!');
        // 예: 토큰 저장, 페이지 이동 등
        // localStorage.setItem('token', response.data.token);
        // navigate('/'); // React Router 사용 시
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setLoginError('아이디 또는 비밀번호가 올바르지 않습니다.');
      } else {
        alert('서버 오류입니다. 관리자에게 문의하세요.');
      }
      console.error(err);
    }
  };

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={5}>
        <Card sx={{ mt: 8 }}>
          <CardHeader title='로그인' sx={{ textAlign: 'center' }} />
          <CardContent>
            <Box component="form" onSubmit={onSubmitHandler}>
              <TextField
                label="이메일"
                fullWidth
                margin="normal"
                value={id}
                onChange={onChangeIdHandler}
                error={!!idError}
                helperText={idError}
              />
              <TextField
                label="비밀번호"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={onChangePasswordHandler}
                error={!!passwordError}
                helperText={passwordError}
              />
              {loginError && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {loginError}
                </Typography>
              )}
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                로그인
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
