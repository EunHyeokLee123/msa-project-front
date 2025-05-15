import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import OrderListComponent from '../features/order/OrderListComponent';
import DashBoardPage from '../features/order/DashBoardPage';
import AdminOrderListComponent from '../features/order/AdminOrderListComponent';

const MyTabBar = ({ userRole, userId }) => {
  const [value, setValue] = useState(0);

  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box>
      <Tabs value={tabIndex} onChange={handleChange} centered>
        {userRole === 'USER' ? <Tab label='학습' /> : <Tab label='내 강의' />}
        {userRole === 'USER' ? (
          <Tab label='주문 내역' />
        ) : (
          <Tab label='강의 주문 현황' />
        )}
      </Tabs>
      <Box mt={2}>
        {tabIndex === 0 ? (
          userRole === 'USER' ? (
            <DashBoardPage id={userId} />
          ) : (
            <DashBoardPage id={userId} />
          )
        ) : tabIndex === 1 ? (
          userRole === 'USER' ? (
            <OrderListComponent />
          ) : (
            <AdminOrderListComponent />
          )
        ) : null}
      </Box>
    </Box>
  );
};

export default MyTabBar;
