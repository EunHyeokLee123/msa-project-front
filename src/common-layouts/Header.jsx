import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCategory } from '../context/CategoryContext';
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/TokenContext';
import { COURSE } from '../configs/host-config';

const navItems = ['강의', '로드맵', '멘토링', '커뮤니티'];

const categoryTabs = [
  '전체',
  'Git',
  'Java',
  'SQL',
  'Linux',
  'Algorithm',
  'JDBC',
  'HTML/CSS',
  'JS',
  'React',
  'Spring',
];

const Header = () => {
  const { setSelectedCategory } = useCategory();
  const [logoClicked, setLogoClicked] = useState(false);
  const [activeTab, setActiveTab] = useState('전체');

  const navigate = useNavigate();

  const { isLoggedIn, logout } = useAuth();

  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // // 강의 정렬 로직직
  const [courses, setCourses] = useState([]);
  // const [sortOption, setSortOption] = useState("default");

  // // 정렬 옵션 바뀔 때마다 데이터 fetch
  // useEffect(() => {
  //   fetch(`/sort?sort=${sortOption}`)
  //     .then((res) => res.json())
  //     .then((data) => setCourses(data))
  //     .catch((err) => console.error("강의 데이터를 가져오는 데 실패했습니다.", err));
  // }, [sortOption]);

  return (
    <AppBar
      position='static'
      color='inherit'
      elevation={0}
      sx={{
        borderLeft: '1px solid white',
        borderRight: '1px solid white',
        borderBottom: '1px solid black',
      }}
    >
      <Box sx={{ maxWidth: '1280px', margin: '0 auto' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
          {/* 로고 */}
          <Box display='flex' alignItems='center'>
            <Typography
              variant='h6'
              sx={{
                color: '#00c471',
                fontWeight: 'bold',
                mr: 2,
                textDecoration: 'none',
                cursor: 'pointer',
                backgroundColor: logoClicked ? '#f0f0f0' : 'transparent',
                borderRadius: 1,
                px: 1,
                transition: 'background-color 0.2s ease',
              }}
              onClick={() => {
                setLogoClicked(true);
                setTimeout(() => setLogoClicked(false), 150); // 150ms 후 원상복구

                setSelectedCategory('전체');
                setActiveTab('전체');
                navigate('/');
              }}
            >
              Inflearn
            </Typography>

            {/* 네비게이션 */}
            {navItems.map((item, index) => (
              <Button key={index} sx={{ mx: 2, color: '#333' }}>
                {item}
              </Button>
            ))}
          </Box>

          {/* 검색창 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f1f3f5',
              borderRadius: 2,
              px: 2,
              width: '400px',
            }}
          >
            <SearchIcon sx={{ color: '#777' }} />
            <InputBase
              type='text'
              placeholder='나의 진짜 성장을 도와줄 실무 강의를 찾아보세요'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ ml: 1, flex: 1 }}
            />
          </Box>

          {/* 언어 & 로그인 */}
          <Box display='flex' alignItems='center'>
            <IconButton
              onClick={() => {
                navigate('/order/cart');
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
            {isLoggedIn ? (
              <>
                <Button
                  variant='contained'
                  sx={{ ml: 1 }}
                  onClick={() => {
                    navigate('/mypage');
                  }}
                >
                  MyPage
                </Button>
                <Button
                  variant='contained'
                  sx={{ ml: 1 }}
                  onClick={() => {
                    logout();
                    alert('로그아웃되었습니다.');
                    navigate('/');
                  }}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <Button
                variant='contained'
                sx={{ ml: 1 }}
                onClick={() => {
                  navigate('/login');
                }}
              >
                로그인
              </Button>
            )}
          </Box>
        </Toolbar>

        {/* 카테고리 탭 */}
        <Toolbar
          sx={{
            backgroundColor: '#fff',
            minHeight: '48px !important',
            justifyContent: 'center',
            overflowX: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              whiteSpace: 'nowrap',
            }}
          >
            {categoryTabs.map((label, index) => (
              <Button
                key={index}
                sx={{
                  color: '#555',
                  backgroundColor:
                    activeTab === label ? '#f0f0f0' : 'transparent', // 연한 회색
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                }}
                onClick={() => {
                  setSelectedCategory(label);
                  setActiveTab(label);
                  if (label === '전체') {
                    navigate('/');
                  } else {
                    if (label === 'HTML/CSS') {
                      label = 'HTMLCSS';
                    }
                    navigate(`/category/${label}`);
                  }
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Box>

      <div style={{ padding: "20px" }}>
        {/* <h2>강의 목록</h2> */}
        {/* 강의 카드 리스트 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {courses.map((course) => (
            <div
              key={course.productId}
              style={{
                width: "200px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={course.filePath}
                alt={course.productName}
                style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "5px" }}
              />
              <h4 style={{ margin: "10px 0" }}>{course.productName}</h4>
              <p>₩{course.price.toLocaleString()}</p>
              <p style={{ fontSize: "14px", color: "#888" }}>{course.category}</p>
              <p style={{ fontSize: "13px" }}>강사: {course.username}</p>
            </div>
          ))}
        </div>
      </div>


    </AppBar>
  );
};

export default Header;
