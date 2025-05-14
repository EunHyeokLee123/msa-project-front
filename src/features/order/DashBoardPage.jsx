import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../configs/axios-config';
import { API_BASE_URL, ORDER } from '../../configs/host-config';

import { useAuth } from '../../context/TokenContext';
import PostCard from '../../components/PostCard';

const DashBoardPage = () => {
  const [orderList, setOrderList] = useState([]);

  const navigate = useNavigate();
  const user = useAuth();

  //console.log('user: ', user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let res;
        if (user.role === 'USER') {
          res = await axiosInstance.get(`${API_BASE_URL}${ORDER}/dashboard`);
        } else {
          res = await axiosInstance.get(
            `${API_BASE_URL}${ORDER}/my-course-order`,
          );
        }
        setOrderList(res.data.result);
      } catch (e) {
        console.log('orderlistComponent 에러 발생 ', e);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <div
        style={{
          width: '60%',
          margin: 'auto',
        }}
      >
        <h2>내 학습</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>강의명</TableCell>
                <TableCell>강의번호</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList.length < 1 ? (
                <TableRow>
                  <TableCell colSpan={5} align='center'>
                    학습 중인 강의가 없습니다
                  </TableCell>
                </TableRow>
              ) : (
                orderList.map((order) => (
                  <React.Fragment key={order.id}>
                    <TableRow>
                      <TableCell>{order.productName}</TableCell>
                      <TableCell>
                        {order.orderStatus === 'ORDERED'
                          ? '주문 완료'
                          : '주문 취소됨'}
                      </TableCell>
                      <TableCell>{order.productId}</TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* PostCard와 위쪽 컨텐츠 사이 간격 주기 */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2>질문 목록</h2>
      </div>
      <div style={{ marginTop: '60px' }}>
        <PostCard Id={-1} type={'mypage'} />
      </div>
    </>
  );
};

export default DashBoardPage;
