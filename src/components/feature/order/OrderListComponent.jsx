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
import axiosInstance from '../../../configs/axios-config';
import { API_BASE_URL, ORDER } from '../../../configs/host-config';
import AuthContext from '../../../context/UserContext';
import { useAuth } from '../../../context/TokenContext';

const OrderListComponent = () => {
  const [orderList, setOrderList] = useState([]);
  const { onLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = useAuth();
  console.log('토큰: ', token);

  const cancelOrder = async (id, orderDate) => {
    console.log('id, orderDate', id, orderDate);

    const orderDateStr = new Date(orderDate);
    const now = new Date();
    const diffInMs = now - orderDateStr;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays > 7) {
      alert('주문일로부터 7일이 지나 취소할 수 없습니다.');
      return;
    }

    if (!confirm('정말 취소하시겠습니까?')) return;

    try {
      const res = await axiosInstance.patch(
        `${API_BASE_URL}${ORDER}/cancel/${id}`,
      );
      // 주문 상태 업데이트
      setOrderList((prevList) =>
        prevList.map((order) =>
          order.id === id ? { ...order, orderStatus: 'CANCELED' } : order,
        ),
      );
    } catch (e) {
      console.log('orderlistComponent 에러 발생 ', e);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get(`${API_BASE_URL}${ORDER}/my-order`);
        setOrderList(res.data.result);
      } catch (e) {
        console.log('orderlistComponent 에러 발생 ', e);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      {/* <h2>{userName} 님의 주문 내역</h2> */}
      <h2>{orderList[0]?.userEmail ?? '사용자'} 님의 주문 내역</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>주문번호</TableCell>
              <TableCell>주문일자</TableCell>
              <TableCell>강의명</TableCell>
              <TableCell>주문상태</TableCell>
              <TableCell>액션</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((order) => (
              <React.Fragment key={order.id}>
                <TableRow>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>
                    {order.orderStatus === 'ORDERED'
                      ? '주문 완료'
                      : '주문 취소됨'}
                  </TableCell>
                  <TableCell>
                    {order.orderStatus === 'ORDERED' && (
                      <Button
                        color='secondary'
                        size='small'
                        onClick={() => cancelOrder(order.id, order.orderDate)}
                      >
                        CANCEL
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderListComponent;
