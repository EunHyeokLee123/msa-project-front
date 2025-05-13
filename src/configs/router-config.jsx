import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Comment from '../components/Comment';
import CreatePost from '../components/CreatePost';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import PostItem from '../components/PostItem';
import CartContext from '../context/CartContext';
import CourseDetailPage from '../features/course/CourseDetailPage';
import CourseSearchPage from '../features/course/CourseSearchPage';
import CourseUploadPage from '../features/course/CourseUploadPage';
import OrderListComponent from '../features/order/OrderListComponent';
import RootLayout from '../components/Rootlayout';
import MainPage from '../components/MainPage';
import Login from '../components/Login';
import { useEffect } from 'react';

import LoginPage from '../login/LoginPage';
import Mypage from '../my-page/MyPage';
import RootLayout from '../components/Rootlayout';
import BrandStartUp from '../BrandStartUp/BrandStartUp';
import MainPage from '../components/MainPage';
import { LoginProvider } from '../context/loginContext';
import { useEffect } from 'react';
import MyPageOrderBox from '../my-page/component/view/MyPageOrderBox';
import MyPageInfoBox from '../my-page/component/view/MyPageInfoBox';
import MyPageDeliveryBox from '../my-page/component/view/MyPageDeliveryBox';
import MyPageCouponBox from '../my-page/component/view/MyPageCouponBox';

import { API_BASE_URL, USER, COURSE, ORDER, POST } from '../../configs/host-config';

// 라우터 설정
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          index: true, // 부모 경로가 활성화 되었을 때 기본으로 사용할 컴포넌트
          element: <MainPage />,
        },
        {
          path: `${USER}/login`,
          element: <Login />,
        },
        // {
        //   path: 'mypage/',
        //   element: <Mypage />,
        // },
        {
          path: `${COURSE}/list`,
          element: <CourseSearchPage />,
        },
        {
          path: `${COURSE}/category`,
          element: <CourseSearchPage />,
        },
        {
          path: `${COURSE}/category`,
          element: <CourseSearchPage />,
        },
      ],
    },
    {
      path: '/brand_startup',
      element: <BrandStartUp />,
    },
  ],
  {
    basename: '/project-nene-chicken',
  },
);

export default function Router() {
  return (
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  );
}
