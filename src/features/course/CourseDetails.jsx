// src/features/course/CourseDetailPage.jsx에 병합되어 미사용되는 파일이지만
// 임시로 남겨둠.

import gitImg from '../assets/git.png';
import javaImg from '../assets/java.jpg';
import sqlImg from '../assets/sql.png';
import linuxImg from '../assets/Linux.png';
import algorithmImg from '../assets/algorithm.png';
import jdbcImg from '../assets/jdbc.png';
import htmlcssImg from '../assets/html-css.jpg';
import jsImg from '../assets/js.png';
import reactImg from '../assets/react.png';
import springImg from '../assets/spring.jpg';

const categoryImages = {
  Git: gitImg,
  Java: javaImg,
  SQL: sqlImg,
  Linux: linuxImg,
  Algorithm: algorithmImg,
  JDBC: jdbcImg,
  'HTML/CSS': htmlcssImg,
  JS: jsImg,
  React: reactImg,
  Spring: springImg,
  // 카테고리: sqlImg,
  // java: javaImg,
};

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PostCard from '../../components/PostCard';
import CartContext from '../../context/CartContext';

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const { addCart, orderCourse } = useContext(CartContext);
  const location = useLocation();
  const courseId = location.state?.courseId;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/course-service/courses/info/${courseId}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.error('강의 상세 정보를 불러오는데 실패했습니다:', err);
      });
  }, [courseId]);

  // 장바구니 클릭 이벤트 핸들러
  const handleAddToCart = () => {
    const product = {
      id: course.productId,
      name: course.productName,
      price: course.price,
    };

    console.log('장바구니 추가 대상:', product);

    if (confirm('강의를 수강바구니에 추가하시겠습니까?')) {
      addCart(product); // 장바구니에 추가
    }
  };

  // 수강신청하기 클릭 이벤트 핸들러
  const handleOrderCourse = () => {
    const product = {
      id: course.productId,
      name: course.productName,
      price: course.price,
    };

    console.log('구매할 강의:', product);
    orderCourse(product);
    navigate('/order/cart');
  };

  if (!course) return <div className='course-detail'>로딩 중...</div>;

  return (
    <div className='course-detail'>
      <div className='course-header'>
        <img src={categoryImages[course.category]} alt={course.category} />
        <div className='info'>
          <h2>{course.productName}</h2>
          <p className='subtitle'>{course.description}</p>
          <p className='tags'>{course.category}</p>
          {/* <p className="rating">⭐ {course.rating} ({course.reviews}개 리뷰)</p> */}
        </div>
        <div className='side-info'>
          <div className='price'>{course.price.toLocaleString()}원</div>
          <button onClick={handleAddToCart}>장바구니 담기</button>
          <button onClick={handleOrderCourse}>수강신청 하기</button>
        </div>
      </div>

      <PostCard Id={courseId} />
    </div>
  );
};

export default CourseDetails;
