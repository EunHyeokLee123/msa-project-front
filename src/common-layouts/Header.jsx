import React, { useState } from 'react';
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

  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim() !== "") {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


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
                navigate('/all');
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
              type="text"
              placeholder='나의 진짜 성장을 도와줄 실무 강의를 찾아보세요'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ ml: 1, flex: 1 }

              }
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
                    navigate('/all');
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
                    navigate('/all');
                  } else {
                    if (label === 'HTML/CSS') {
                      label = 'HTMLCSS'
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
    </AppBar>
  );
};

export default Header;
