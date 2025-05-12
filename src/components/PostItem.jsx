import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

export default function PostItem({ post, onClick }) {
  const { title, content, status } = post;

  // 상태에 따라 Chip 색상 바꾸기 예시
  const statusLabel = status === 'ANSWERED' ? '해결됨' : '미해결';
  const statusColor = status === 'ANSWERED' ? 'success' : 'default';

  return (
    <Card
      variant='outlined'
      sx={{
        borderRadius: 2,
        p: 2,
        mb: 2,
        width: '40%',
        maxWidth: '1800px',
        mx: 'auto',
      }}
      onClick={onClick}
    >
      <Stack spacing={1}>
        {/* 상태 배지 */}
        <Chip
          label={statusLabel}
          size='small'
          color={statusColor}
          sx={{ width: 'fit-content' }}
        />

        {/* 제목 */}
        <Typography variant='h6' fontWeight='bold'>
          {title}
        </Typography>

        {/* 내용 요약 */}
        <Typography variant='body2' color='text.secondary'>
          {content.length > 100 ? content.slice(0, 100) + '...' : content}
        </Typography>

        {/* 하단 정보 */}
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mt={1}
        >
          <Typography variant='caption' color='text.secondary'>
            사용자 {post.userId}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
