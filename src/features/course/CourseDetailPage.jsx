import gitImg from '../../assets/git.png';
import javaImg from '../../assets/java.jpg';
import sqlImg from '../../assets/sql.png';
import linuxImg from '../../assets/Linux.png';
import algorithmImg from '../../assets/algorithm.png';
import jdbcImg from '../../assets/jdbc.png';
import htmlcssImg from '../../assets/html-css.jpg';
import jsImg from '../../assets/js.png';
import reactImg from '../../assets/react.png';
import springImg from '../../assets/spring.jpg';
import PostCard from '../../components/PostCard';
import './CourseDetailPage.scss';

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
  java: javaImg,
  카테고리: sqlImg,
};

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CartContext from '../../context/CartContext';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../context/TokenContext';
import { API_BASE_URL, COURSE } from '../../configs/host-config';
import './CourseDetailPage.scss';

const CourseDetailPage = () => {
  const [course, setCourse] = useState(null);
  const { addCart, orderCourse } = useContext(CartContext);
  const location = useLocation();
  // const courseId = location.state?.courseId;
  const { courseId } = useParams();
  const navigate = useNavigate();

  const user = useAuth();
  //console.log('user토큰: ', user.token);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}${COURSE}/info/${courseId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.error('강의 상세 정보를 불러오는데 실패했습니다:', err);
      });
  }, [courseId]);

  if (!course) return <div className='course-detail'>로딩 중...</div>;

  // 장바구니 클릭 이벤트 핸들러
  const handleAddToCart = () => {
    if (typeof user.token === 'undefined' || !user.token) {
      alert('로그인이 필요합니다!');
      return;
    }

    const product = {
      id: course.productId,
      name: course.productName,
      category: course.category,
      description: course.description,
      price: course.price,
    };

    console.log('장바구니 추가 대상:', product);

    if (confirm('강의를 수강바구니에 추가하시겠습니까?')) {
      addCart(product); // 장바구니에 추가
      // alert('강의가 수강바구니에 추가되었습니다!');
    }
  };

  // 수강신청하기 클릭 이벤트 핸들러
  const handleOrderCourse = () => {
    if (typeof user.token === 'undefined' || !user.token) {
      alert('로그인이 필요합니다!');
      return;
    }

    const product = {
      id: course.productId,
      name: course.productName,
      category: course.category,
      description: course.description,
      price: course.price,
    };

    console.log('구매할 강의 대상:', product);
    orderCourse(product);
    navigate('/order/cart');
  };

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

export default CourseDetailPage;
