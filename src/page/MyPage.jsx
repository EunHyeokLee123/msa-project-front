import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/TokenContext';
import MyTabBar from './MyTabBar';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { token, logout, role } = useAuth();

  const isKakaoUser = localStorage.getItem('KAKAO') === 'KAKAO';

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8000/user-service/user/myinfo',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo(res.data.result);
      } catch (error) {
        console.error('유저 정보를 불러오는 중 오류:', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/user-service/user/password',
        {
          email: userInfo.email,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('비밀번호가 변경되었습니다.');
      setNewPassword('');
      setConfirmPassword('');
      setErrorMsg('');
      logout();
      navigate('/login');
    } catch (error) {
      console.error(error);
      setErrorMsg('비밀번호 변경에 실패했습니다.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('KAKAO'); // ✅ 카카오 정보 제거
    navigate('/login');
  };

  if (!userInfo) return <Typography>로딩 중...</Typography>;

  return (
    <>
      <Grid container justifyContent='center'>
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={{ mt: 5 }}>
            <CardHeader title='마이페이지' sx={{ textAlign: 'center' }} />
            <CardContent>
              <Typography variant='h6'>사용자 정보</Typography>
              <Typography>Email: {userInfo.email}</Typography>
              <Typography>이름: {userInfo.username}</Typography>
              <Typography>
                역할:
                {userInfo.role === 'USER'
                  ? ' 학생'
                  : userInfo.role === 'ADMIN'
                  ? ' 강사'
                  : ''}
              </Typography>

              {/* ✅ 카카오 사용자가 아닐 때만 비밀번호 변경 폼 표시 */}
              {!isKakaoUser ? (
                <Box component='form' onSubmit={handlePasswordChange} mt={4}>
                  <Typography variant='h6'>비밀번호 변경</Typography>
                  <TextField
                    label='새 비밀번호'
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    margin='normal'
                  />
                  <TextField
                    label='비밀번호 확인'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin='normal'
                  />
                  {errorMsg && (
                    <Typography color='error' variant='body2'>
                      {errorMsg}
                    </Typography>
                  )}
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    비밀번호 변경
                  </Button>
                </Box>
              ) : (
                <Typography sx={{ mt: 4 }} color='text.secondary'>
                  카카오 로그인 사용자는 비밀번호를 변경할 수 없습니다.
                </Typography>
              )}

              <Box mt={3}>
                <Button
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <MyTabBar userRole={role} />
    </>
  );
};

export default MyPage;
