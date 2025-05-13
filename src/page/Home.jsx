
import React, { useEffect, useState } from 'react';

const Home = () => {
   
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole]= useState('');
 

  useEffect( ()=>{
     const token = localStorage.getItem('token');
     const id = localStorage.getItem('userId');
     const role = localStorage.getItem('userRole');
  
     if (token && id && role) {
        setUserId(id);
        setUserRole(role);
     }
  
    },[]);
    const handleLogout = ()=>{
      localStorage.clear();
      alert('로그아웃이 되었습니다.');
      navigator('/login')
    }

  return (
    <div style={{maxWidth:'600px', margin:'0 auto',textAlign:'center'}}>
    <h1>홈화면 </h1>
    {userId?(
          <div>
          <p><strong>환영합니다!</strong> 사용자 ID: {userId}</p>
          <p>권한: {userRole}</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <p>로그인이 필요합니다.</p>
          <button onClick={() => navigate('/login')}>로그인으로 이동</button>
        </div>
    )}

    </div>
  );
}

export default Home