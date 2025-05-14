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
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('USER');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const navigate = useNavigate();

  const onChangeUsernameHandler = (e) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameError(value ? '' : '이름을 입력해주세요.');
  };

  const onChangeEmailHandler = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[\w.-]+@[a-z\d.-]+\.[a-z]{2,}$/i;
    if (!value) {
      setEmailError('이메일을 입력해주세요.');
    } else if (!emailRegex.test(value)) {
      setEmailError('유효한 이메일 형식을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const onChangePasswordHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
      validatePasswords(value, confirm);
    } else {
      setConfirm(value);
      validatePasswords(password, value);
    }
  };

  const validatePasswords = (pw, cf) => {
    const pwRegex = /^[a-z\d!@*&-_]{8,16}$/;
    setPasswordError(
      !pw
        ? '비밀번호를 입력해주세요.'
        : !pwRegex.test(pw)
        ? '비밀번호는 8~16자의 영소문자, 숫자, !@*&-_만 허용됩니다.'
        : '',
    );
    setConfirmError(cf && pw !== cf ? '비밀번호가 일치하지 않습니다.' : '');
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      usernameError ||
      !username ||
      emailError ||
      !email ||
      passwordError ||
      confirmError ||
      !password ||
      !confirm
    ) {
      alert('입력값을 확인해주세요.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:8000/user-service/user/create',
        {
          username,
          email,
          password,
          role,
        },
      );
      if (res.status === 201) {
        alert('회원가입 성공!');
        setUsername('');
        setEmail('');
        setPassword('');

        setRole('USER');
        navigate('/login');
      }
    } catch (err) {
      alert('회원가입 실패: ' + (err.response?.data?.message || '서버 오류'));
      console.error(err);
    }
  };

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <Card sx={{ mt: 8 }}>
          <CardHeader title='회원가입' sx={{ textAlign: 'center' }} />
          <CardContent>
            <Box component='form' onSubmit={onSubmitHandler}>
              <TextField
                fullWidth
                label='이름'
                value={username}
                onChange={onChangeUsernameHandler}
                error={!!usernameError}
                helperText={usernameError}
                margin='normal'
              />

              <TextField
                fullWidth
                label='이메일'
                value={email}
                onChange={onChangeEmailHandler}
                error={!!emailError}
                helperText={emailError}
                margin='normal'
              />

              <FormControl component='fieldset' margin='normal'>
                <FormLabel component='legend'>
                  무슨 목적으로 가입하십니까?
                </FormLabel>
                <RadioGroup
                  row
                  name='role'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel
                    value='USER'
                    control={<Radio />}
                    label='학생'
                  />
                  <FormControlLabel
                    value='ADMIN'
                    control={<Radio />}
                    label='강사'
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                fullWidth
                label='비밀번호'
                type='password'
                name='password'
                value={password}
                onChange={onChangePasswordHandler}
                error={!!passwordError}
                helperText={passwordError}
                margin='normal'
              />

              <TextField
                fullWidth
                label='비밀번호 확인'
                type='password'
                name='confirm'
                value={confirm}
                onChange={onChangePasswordHandler}
                error={!!confirmError}
                helperText={confirmError}
                margin='normal'
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                sx={{ mt: 2 }}
              >
                회원가입
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
