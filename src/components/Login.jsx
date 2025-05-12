import React, { useState } from 'react';

// 로그인 API 시뮬레이션 (실제 백엔드 연동 시 대체)
const loginRequest = async ({ id, password }) => {
  // 예시: "testuser", "testpass"로 로그인 성공 처리
  if (id === 'testuser' && password === 'testpass') {
    return { success: true };
  }
  return { success: false };
};

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
      setIdError('아이디를 입력해주세요.');
      return;
    }

    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const result = await loginRequest({ id, password });
      if (result.success) {
        alert('로그인 성공!');
        // 예: 홈으로 이동 또는 토큰 저장 등
      } else {
        setLoginError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      alert('서버 오류입니다. 관리자에게 문의하세요.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>로그인</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>아이디</label>
          <input type='text' value={id} onChange={onChangeIdHandler} />
          <div style={{ color: 'red' }}>{idError}</div>
        </div>

        <div>
          <label>비밀번호</label>
          <input type='password' value={password} onChange={onChangePasswordHandler} />
          <div style={{ color: 'red' }}>{passwordError}</div>
        </div>

        <button type='submit'>로그인</button>
        <div style={{ color: 'red', marginTop: '10px' }}>{loginError}</div>
      </form>
    </div>
  );
};

export default Login;
