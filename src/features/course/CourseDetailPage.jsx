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
import { Box, Tab, Tabs } from '@mui/material';

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

import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CartContext from '../../context/CartContext';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../context/TokenContext';
import { API_BASE_URL, COURSE, ORDER, EVAL } from '../../configs/host-config';
import './CourseDetailPage.scss';
import axiosInstance from '../../configs/axios-config';
import ReactPlayer from 'react-player';
import EvaluationList from '../../components/EvaluationList';

const CourseDetailPage = () => {
  const [course, setCourse] = useState(null);
  const { addCart, orderCourse } = useContext(CartContext);
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0); // 탭 상태
  // const courseId = location.state?.courseId;
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

  const user = useAuth();
  console.log('user토큰: ', user.token);

  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);

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

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axiosInstance.get(`${API_BASE_URL}${ORDER}/dashboard`);
      setOrderList(res.data.result);
    };
    fetchOrders();
  }, []);

  // 평점을 가져오는 메소드
  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        console.log(courseId);

        const response = await axios.post(
          `${API_BASE_URL}${EVAL}/course-eval-rating`,
          [Number(courseId)], // 리스트 형식으로 보내야 함
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        console.log(response);

        const ratingMap = response.data.result;
        const ratingValue = ratingMap[courseId];

        if (ratingValue !== undefined) {
          setAverageRating(parseFloat(ratingValue.toFixed(1))); // 소수점 1자리
        }
      } catch (error) {
        console.error('평균 평점을 불러오는데 실패했습니다:', error);
      }
    };

    fetchAverageRating();
  }, [courseId]);

  console.log('orderList: ', orderList);

  const isEnrolled = orderList.some(
    (order) => order.productId === Number(courseId),
  );
  console.log('isEnrolled:', isEnrolled);

  if (!course) return <div className='course-detail'>로딩 중...</div>;

  // 장바구니 클릭 이벤트 핸들러
  const handleAddToCart = () => {
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

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleProgress = ({ playedSeconds }) => {
    if (playedSeconds >= 10) {
      playerRef.current?.seekTo(0); // 처음으로 되감기
      setPlaying(false);
    }
  };

  return (
    <div className='course-detail'>
      <div className='course-header'>
        <img src={categoryImages[course.category]} alt={course.category} />
        <div className='info'>
          <h2>{course.productName}</h2>
          <p className='subtitle'>{course.description}</p>
          <p className='tags'>{course.category}</p>
          <p className='user_id'>강사명 : {course.username}</p>
          <p className='rating'>
            ⭐ {averageRating !== null ? averageRating : '평가 없음'}
          </p>
        </div>
        <div className='side-info'>
          {isEnrolled ? (
            <div className='side-info'>
              <button onClick={() => window.open(course.filePath, '_blank')}>
                학습하기
              </button>
            </div>
          ) : (
            <div className='side-info'>
              <div className='price-info'>
                <span className='Pinfo'>수강 가격 : </span>
                <span className='price'>{course.price.toLocaleString()}원</span>
              </div>
              <button onClick={handleAddToCart}>장바구니 담기</button>
              <button onClick={handleOrderCourse}>수강신청 하기</button>
            </div>
          )}
        </div>
      </div>

      <ReactPlayer
        url={course.filePath}
        controls
        className='player'
        onProgress={handleProgress}
        ref={playerRef}
        playing
      />

      {/* ✅ TabBar 추가 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label='강의 질문' />
          <Tab label='강의 평가' />
        </Tabs>
      </Box>

      {/* ✅ 탭에 따라 렌더링 */}
      <div className='course-tab-content'>
        {tabIndex === 0 && <PostCard Id={courseId} type={'course'} />}
        {tabIndex === 1 && <EvaluationList courseId={courseId} />}
      </div>
    </div>
  );
};

export default CourseDetailPage;
