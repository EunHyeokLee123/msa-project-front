import React, { useState } from 'react';

// 예시: ID 중복 확인 API 시뮬레이션 (실제 백엔드 연동 시 대체)
const idDuplicateCheck = async (id) => {
  if (id === 'testuser') return false;
  return true;
};

// 예시: 회원가입 요청 API 시뮬레이션 (실제 백엔드 연동 시 대체)
const signupRequest = async ({ id, email, password }) => {
  console.log('회원가입 데이터 전송:', { id, email, password });
  return { success: true };
};

const Signup = () => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [idError, setIdError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [isIdCheck, setIsIdCheck] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(false);

  const onChangeIdHandler = (e) => {
    const idValue = e.target.value;
    setId(idValue);
    setIsIdCheck(false);
  };

  const onChangeEmailHandler = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailRegex = /^[\w.-]+@[a-z\d.-]+\.[a-z]{2,}$/i;
    if (!emailValue) {
      setEmailError('이메일을 입력해주세요.');
    } else if (!emailRegex.test(emailValue)) {
      setEmailError('유효한 이메일 형식을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const onChangePasswordHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
      passwordCheckHandler(value, confirm);
    } else {
      setConfirm(value);
      passwordCheckHandler(password, value);
    }
  };

  const idCheckHandler = async () => {
    const idRegex = /^[a-z\d]{5,10}$/;
    if (id === '') {
      setIdError('아이디를 입력해주세요.');
      setIsIdAvailable(false);
      return;
    } else if (!idRegex.test(id)) {
      setIdError('아이디는 5~10자의 영소문자, 숫자만 입력 가능합니다.');
      setIsIdAvailable(false);
      return;
    }

    try {
      const responseData = await idDuplicateCheck(id);
      if (responseData) {
        setIdError('사용 가능한 아이디입니다.');
        setIsIdCheck(true);
        setIsIdAvailable(true);
      } else {
        setIdError('이미 사용중인 아이디입니다.');
        setIsIdAvailable(false);
      }
    } catch (error) {
      alert('서버 오류입니다. 관리자에게 문의하세요.');
      console.error(error);
    }
  };

  const passwordCheckHandler = (password, confirm) => {
    const passwordRegex = /^[a-z\d!@*&-_]{8,16}$/;
    if (password === '') {
      setPasswordError('비밀번호를 입력해주세요.');
    } else if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 8~16자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
    } else {
      setPasswordError('');
    }

    if (confirm && confirm !== password) {
      setConfirmError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmError('');
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!isIdCheck || !isIdAvailable) {
      alert('아이디 중복 확인을 해주세요.');
      return;
    }

    if (emailError || !email) {
      alert('이메일을 확인해주세요.');
      return;
    }

    if (passwordError || confirmError || !password || !confirm) {
      alert('비밀번호를 확인해주세요.');
      return;
    }

    try {
      const result = await signupRequest({ id, email, password });
      if (result.success) {
        alert('회원가입 성공!');
        // 필요 시 폼 초기화
      } else {
        alert('회원가입 실패. 다시 시도해주세요.');
      }
    } catch (err) {
      alert('서버 오류입니다. 관리자에게 문의하세요.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>회원가입</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>아이디</label>
          <input type='text' value={id} onChange={onChangeIdHandler} />
          <button type='button' onClick={idCheckHandler}>
            중복 확인
          </button>
          <div style={{ color: isIdAvailable ? 'green' : 'red' }}>{idError}</div>
        </div>

        <div>
          <label>이메일</label>
          <input type='text' value={email} onChange={onChangeEmailHandler} />
          <div style={{ color: 'red' }}>{emailError}</div>
        </div>

        <div>
          <label>비밀번호</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChangePasswordHandler}
          />
          <div style={{ color: 'red' }}>{passwordError}</div>
        </div>

        <div>
          <label>비밀번호 확인</label>
          <input
            type='password'
            name='confirm'
            value={confirm}
            onChange={onChangePasswordHandler}
          />
          <div style={{ color: 'red' }}>{confirmError}</div>
        </div>

        <button type='submit'>회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
