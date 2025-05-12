import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Mypage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 예: email을 쿼리 파라미터로 넘긴다고 가정
        const email = localStorage.getItem('email');
        const response = await axiosInstance.get('/user/userInfo', {
          params: { email },
        });

        setUserInfo(response.data);
      } catch (err) {
        console.error('유저 정보 요청 실패:', err);
        setError('사용자 정보를 불러오는 데 실패했습니다.');
      }
    };

    fetchUserInfo();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
      <div className="info-item">
        <strong>이름:</strong> {userInfo.username}
      </div>
      <div className="info-item">
        <strong>이메일:</strong> {userInfo.email}
      </div>
      <div className="info-item">
        <strong>권한:</strong> {userInfo.role}
      </div>
    </div>
  );
};

export default Mypage;
