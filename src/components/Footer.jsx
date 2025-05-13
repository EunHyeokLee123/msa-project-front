import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';

const footerData = [
  {
    title: '인프런',
    items: ['인프런 소개', '인프런 피드', '수강평 모아보기', '블로그'],
  },
  {
    title: '신청하기',
    items: ['지식공유참여', '멘토링 소개', '인프런 비즈니스', '인프런 제휴'],
  },
  {
    title: '코드 등록',
    items: ['수강코드 등록', '포인트코드 등록'],
  },
  {
    title: '고객센터',
    items: [
      '공지사항',
      '자주묻는 질문',
      '저작권 신고센터',
      '수료증 확인',
      '강의 · 기능요청',
    ],
  },
  {
    title: '인프랩',
    items: [
      '인프랩 실Log',
      'With us',
      '인프랩 스토리',
      '인프랩 테크',
      'IT 인재 채용 서비스',
    ],
  },
];

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#2d333b', color: '#fff', py: 6 }}>
      <Box
        sx={{
          maxWidth: '1280px',
          mx: 'auto',
          px: 2,
          textAlign: 'center',
        }}
      >
        <Grid container spacing={6}>
          {footerData.map((section, idx) => (
            <Grid item xs={6} sm={4} md={2} key={idx}>
              <Typography
                variant='subtitle1'
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                {section.title}
              </Typography>
              {section.items.map((item, i) => (
                <Link
                  key={i}
                  href='#'
                  underline='none'
                  color='inherit'
                  sx={{
                    display: 'block',
                    fontSize: 14,
                    my: 1.2,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Grid>
          ))}

          {/* QR 섹션 */}
          <Grid item xs={12} sm={4} md={2} sx={{ textAlign: 'center' }}>
            <Box
              component='img'
              src='/qr-placeholder.png'
              alt='QR Code'
              sx={{ width: 64, height: 64, mb: 1 }}
            />
            <Typography variant='body2'>Get the app</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;