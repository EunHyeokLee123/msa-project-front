import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Card,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function PostItem({
  post,
  onClick,
  onDelete,
  commentCount,
  onUpdate,
}) {
  const { title, content, status } = post;

  const statusLabel = status === 'ANSWERED' ? '해결됨' : '미해결';
  const statusColor = status === 'ANSWERED' ? 'success' : 'default';

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(post.id, editedTitle, editedContent);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setIsEditing(false);
  };

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
        position: 'relative', // 삭제버튼 위치 지정 위해 추가
      }}
      onClick={() => {
        if (!isEditing) onClick?.();
      }}
    >
      {/* 우상단 삭제 버튼 */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation(); // 카드 클릭 이벤트 방지
          onDelete?.(post.id); // 삭제 함수 호출
        }}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
      >
        <DeleteIcon />
      </IconButton>

      {/* 수정 버튼 */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        sx={{
          position: 'absolute',
          top: 8,
          right: 48,
        }}
      >
        <EditIcon />
      </IconButton>

      <Stack spacing={1}>
        <Chip
          label={statusLabel}
          size='small'
          color={statusColor}
          sx={{ width: 'fit-content' }}
        />

        {isEditing ? (
          <>
            <TextField
              label='제목'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label='내용'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
            <Box display='flex' justifyContent='flex-end' gap={1} mt={1}>
              <Button variant='outlined' onClick={handleCancel}>
                취소
              </Button>
              <Button variant='contained' onClick={handleSave}>
                저장
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant='h6' fontWeight='bold'>
              {title}
            </Typography>

            <Typography variant='body2' color='text.secondary'>
              {content.length > 100 ? content.slice(0, 100) + '...' : content}
            </Typography>
          </>
        )}

        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='caption' color='text.secondary'>
            사용자 {post.userId}
          </Typography>
          <Typography variant='body2'>댓글 수: {commentCount}</Typography>
        </Box>
      </Stack>
    </Card>
  );
}
