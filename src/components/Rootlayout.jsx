import React from 'react';
import Header from '../common-layouts/Header';
import Footer from '../common-layouts/Footer';
import { Outlet } from 'react-router';

const Rootlayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Rootlayout;
