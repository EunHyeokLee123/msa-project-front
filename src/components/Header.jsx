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
import LanguageIcon from '@mui/icons-material/Language';
import { useCategory } from '../context/CategoryContext';
import { Link } from 'react-router-dom';

const navItems = ['강의', '로드맵', '멘토링', '커뮤니티'];

const categoryTabs = [
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
  '카테고리',
  'java',
];

const Header = () => {
  const { setSelectedCategory } = useCategory();

  const [activeTab, setActiveTab] = useState('Git');

  return (
    <AppBar position='static' color='inherit' elevation={1}>
      <Box sx={{ maxWidth: '1280px', margin: '0 auto' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
          {/* 로고 */}
          <Box display='flex' alignItems='center'>
            <Typography
              variant='h6'
              component={Link} // 여기를 Link로 변경
              to='/' // 메인 페이지로 이동
              sx={{
                color: '#00c471',
                fontWeight: 'bold',
                mr: 2,
                textDecoration: 'none', // 링크 밑줄 제거
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
              placeholder='나의 진짜 성장을 도와줄 실무 강의를 찾아보세요'
              sx={{ ml: 1, flex: 1 }}
            />
          </Box>

          {/* 언어 & 로그인 */}
          <Box display='flex' alignItems='center'>
            <IconButton>
              <LanguageIcon />
            </IconButton>
            <Button variant='contained' sx={{ ml: 1 }}>
              로그인
            </Button>
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
