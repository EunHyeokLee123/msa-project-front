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
  카테고리: sqlImg,
  java: javaImg,
};

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PostCard from './PostCard';
import CartContext from '../context/CartContext';

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const { addCart, orderCourse } = useContext(CartContext);
  const location = useLocation();
  const courseId = location.state?.courseId;

  useEffect(() => {
    axios
      .get(
        `http://ec2-3-38-145-197.ap-northeast-2.compute.amazonaws.com:8000/course-service/courses/info/${courseId}`,
      )
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
          {/* <ul>
                        <li>강의 수: {course.courseCount}개</li>
                        <li>총 시간: {course.duration}</li>
                        <li>수강 기간: {course.period}</li>
                        <li>난이도: {course.level}</li>
                        <li>수료증: {course.certificate}</li>
                    </ul> */}
        </div>
      </div>

      {/* <div className="learning-points">
                <h3>이런 걸 배울 수 있어요</h3>
                <ul>
                    {course.learningPoints.map((point, idx) => (
                        <li key={idx}>✔ {point}</li>
                    ))}
                </ul>
            </div> */}

      {/* <div className="user-reviews">
                <h3>수강생 리뷰</h3>
                {course.userReviews.map((review, idx) => (
                    <div className="review" key={idx}>
                        <strong>{review.name}</strong>
                        <span>⭐ {review.rating}</span>
                        <p>{review.text}</p>
                    </div>
                ))}
            </div> */}
      <PostCard Id={courseId} />
    </div>
  );
};

export default CourseDetails;
