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
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../configs/axios-config';
import { API_BASE_URL, ORDER } from '../../../configs/host-config';
import { useAuth } from '../../../context/TokenContext';

const AdminOrderListComponent = () => {
  const [orderList, setOrderList] = useState([]);

  const navigate = useNavigate();
  const { userId } = useParams();
  const token = useAuth();
  console.log('userId: ', userId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get(
          `${API_BASE_URL}${ORDER}/my-course-order/${userId}`,
        );
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
      <h2>전체 주문 내역</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>주문번호</TableCell>
              <TableCell>주문일자</TableCell>
              <TableCell>강의명</TableCell>
              <TableCell>구매자번호</TableCell>
              <TableCell>주문상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((order) => (
              <React.Fragment key={order.id}>
                <TableRow>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>{order.userId}</TableCell>

                  <TableCell>
                    {order.orderStatus === 'ORDERED'
                      ? '주문 완료'
                      : '주문 취소됨'}
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

export default AdminOrderListComponent;
