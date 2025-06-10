import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/TokenContext';
import { API_BASE_URL, USER } from '../configs/host-config';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ 카카오 로그인 메시지 수신 처리
  useEffect(() => {
    const handleKakaoMessage = (event) => {
      const { type, token, role, provider } = event.data;
      if (type === 'OAUTH_SUCCESS' && provider === 'KAKAO') {
        console.log('✅ 카카오 로그인 성공!');

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        localStorage.setItem('KAKAO', provider);

        login(token, role);
        navigate('/');
      }
    };

    window.addEventListener('message', handleKakaoMessage);
    return () => window.removeEventListener('message', handleKakaoMessage);
  }, [login, navigate]);

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

  const handleKakaoLogin = () => {
    console.log('카카오 로그인 버튼 클릭!');
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&prompt=login`;

    window.open(
      kakaoAuthUrl,
      'kakao-login',
      'width=500,height=600,scrollbars=yes,resizable=yes',
    );
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
      // url 직접 기재하지 말아주세요. 배포시 하나하나 다 찾아서 변경하는 일이 없어야 합니다.
      const response = await axios.post(`${API_BASE_URL}${USER}/login`, {
        email: id,
        password: password,
      });

      if (response.status === 200) {
        alert('로그인 성공!');
        const token = response.data.result.token;
        const role = response.data.result.role;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        login(token, role);
        navigate('/');
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
            <Button
              variant='outlined'
              fullWidth
              onClick={handleKakaoLogin}
              sx={{
                mb: 2,
                borderColor: '#fee500',
                color: '#3c1e1e',
                backgroundColor: '#fee500',
                '&:hover': {
                  borderColor: '#fdd835',
                  backgroundColor: '#fdd835',
                },
                textTransform: 'none',
                fontSize: '16px',
                height: '48px',
              }}
              startIcon={
                <img
                  src='https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png'
                  alt='Kakao'
                  style={{ width: '20px', height: '20px' }}
                />
              }
            >
              Kakao로 로그인
            </Button>
            <Box component='form' onSubmit={onSubmitHandler}>
              <TextField
                label='이메일'
                fullWidth
                margin='normal'
                value={id}
                onChange={onChangeIdHandler}
                error={!!idError}
                helperText={idError}
              />
              <TextField
                label='비밀번호'
                type='password'
                fullWidth
                margin='normal'
                value={password}
                onChange={onChangePasswordHandler}
                error={!!passwordError}
                helperText={passwordError}
              />
              {loginError && (
                <Typography color='error' variant='body2' sx={{ mt: 1 }}>
                  {loginError}
                </Typography>
              )}
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mt: 2 }}
              >
                로그인
              </Button>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => {
                  navigate('/signup');
                }}
              >
                회원가입
              </Button>
              <Button
                variant='text'
                fullWidth
                sx={{ mt: 1, textDecoration: 'underline' }}
                onClick={() => navigate('/reset-password')}
              >
                비밀번호를 잊으셨나요?
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
