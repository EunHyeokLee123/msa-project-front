import {
  Button,
  Checkbox,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../../context/CartContext';
import axiosInstance from '../../../configs/axios-config';
import { API_BASE_URL, ORDER } from '../../../configs/host-config';

const OrderPage = () => {
  const {
    productsInCart,
    clearCart: onClear,
    forceSelectProductId,
  } = useContext(CartContext);
  const [selectedProducts, setSelectedProducts] = useState([]);

  console.log(productsInCart);

  const clearCart = () => {
    onClear();
  };

  useEffect(() => {
    if (
      forceSelectProductId !== null &&
      !selectedProducts.includes(forceSelectProductId)
    ) {
      setSelectedProducts((prev) => [...prev, forceSelectProductId]);
    }
  }, [forceSelectProductId]);

  // 체크박스 클릭 시 선택된 제품을 추적
  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        // 이미 선택된 제품이 클릭되면 선택 해제
        return prevSelected.filter((id) => id !== productId);
      } else {
        // 선택되지 않은 제품이면 선택
        return [...prevSelected, productId];
      }
    });
  };

  // 선택된 강의들의 총 가격 계산
  const totalPrice = productsInCart
    .filter((product) => selectedProducts.includes(product.id))
    .reduce((sum, product) => sum + product.price, 0);

  const orderCreate = async () => {
    // 백엔드가 달라는 형태로 줘야하니까 그에 맞게 객체를 매핑
    const orderProducts = productsInCart
      .filter((p) => selectedProducts.includes(p.id))
      .map((p) => ({ productId: p.id }));

    if (orderProducts.length < 1) {
      alert('구매 선택한 강의가 없습니다!');
      return;
    }

    const yesOrNo = confirm(
      `${orderProducts.length}개의 강의를 신청하시겠습니까?`,
    );

    if (!yesOrNo) {
      alert('구매가 취소되었습니다.');
      return;
    }

    try {
      console.log('백엔드로 보낼 데이터 ', orderProducts);

      const res = await axiosInstance.post(
        `${API_BASE_URL}${ORDER}/create`,
        orderProducts,
      );

      // const data = res.json(); -> fetch를 사용했을 때는 데이터를 꺼내는 과정이 있음.
      alert('강의 구매가 완료되었습니다.');
      clearCart();
    } catch (err) {
      // handleAxiosError(err);
      console.error('강의 구매 실패!: ', err);
    }
  };

  return (
    <Container>
      <Grid container justifyContent='center' style={{ margin: '20px 0' }}>
        <Typography variant='h5'>수강바구니</Typography>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>선택</TableCell>
              <TableCell>제품ID</TableCell>
              <TableCell>강의명</TableCell>
              <TableCell>가격</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsInCart.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)} // 체크 여부
                    onChange={() => handleCheckboxChange(product.id)} // 클릭 시 선택 상태 변경
                  />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        justifyContent='space-between'
        style={{ marginBottom: '20px' }}
      >
        <Button onClick={clearCart} color='secondary' variant='contained'>
          장바구니 비우기
        </Button>
        <Typography variant='h6' style={{ marginTop: '1rem' }}>
          ₩{totalPrice.toLocaleString()}
        </Typography>
        <Button onClick={orderCreate} color='primary' variant='contained'>
          결제하기
        </Button>
      </Grid>
    </Container>
  );
};

export default OrderPage;
