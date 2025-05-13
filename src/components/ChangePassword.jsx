import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirm) {
            setError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.put('http://localhost:8080/user/password', {
                email,
                currentPassword,
                newPassword,
            });

            if (response.status === 200) {
                alert('비밀번호가 성공적으로 변경되었습니다.');
                navigate('/');
            } else {
                setError('비밀번호 변경에 실패했습니다.');
            }
        } catch (err) {
            setError('서버 오류 또는 비밀번호 정보가 잘못되었습니다.');
            console.error(err);
        }
    };

    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12} sm={8} md={6}>
                <Card sx={{ mt: 5 }}>
                    <CardHeader title='비밀번호 변경' sx={{ textAlign: 'center' }} />
                    <CardContent>
                        <form onSubmit={handleChangePassword}>
                            <TextField
                                label='이메일'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                margin='normal'
                                required
                            />
                            <TextField
                                label='현재 비밀번호'
                                type='password'
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                fullWidth
                                margin='normal'
                                required
                            />
                            <TextField
                                label='새 비밀번호'
                                type='password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                fullWidth
                                margin='normal'
                                required
                            />
                            <TextField
                                label='새 비밀번호 확인'
                                type='password'
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                fullWidth
                                margin='normal'
                                required
                            />

                            {error && (
                                <Typography color='error' variant='body2'>
                                    {error}
                                </Typography>
                            )}

                            <Box mt={2}>
                                <Button type='submit' variant='contained' color='primary' fullWidth>
                                    비밀번호 변경
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ChangePassword;