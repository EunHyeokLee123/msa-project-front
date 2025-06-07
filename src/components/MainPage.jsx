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
import { throttle } from 'lodash';

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
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, COURSE, EVAL } from '../configs/host-config';
import styles from './MainPage.module.scss';
import { useAuth } from '../context/TokenContext';

const MainPage = () => {
  const userAuth = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState({});

  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setLastPage] = useState(false);
  const pageSize = 100;

  const navigate = useNavigate();

  const fetchCourseRatings = async (productIds) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${EVAL}/course-eval-rating`,
        productIds,
      );
      if (response.data && response.data.result) {
        setRatings((prev) => ({ ...prev, ...response.data.result }));
      }
    } catch (error) {
      console.error('평점 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchCourses();

    const throttledScroll = throttle(scrollPagination, 1000);

    window.addEventListener('scroll', throttledScroll);

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  useEffect(() => {
    if (currentPage > 0) fetchCourses();
  }, [currentPage]);

  //강의 불러오는 함수
  const fetchCourses = async () => {
    if (isLastPage) return;

    console.log('아직 보여줄 컨텐트 더 있음');
    console.log('현재 페이지: ', currentPage);

    const params = {
      size: pageSize,
      page: currentPage,
    };

    console.log('백엔드로 보낼 params', params);

    setLoading(true);

    try {
      const baseUrl = `${API_BASE_URL}${COURSE}/all`;

      console.log('baseUrl : ' + baseUrl);
      const response = await axios.get(baseUrl, { params });
      console.log('response 값: ', response);
      console.log('response.length: ', response.data.length);

      if (response.data.length === 0) {
        setLastPage(true);
      } else {
        setCourses((prevCourses) => [...prevCourses, ...response.data]);

        const productIds = response.data.map((course) => course.productId);
        fetchCourseRatings(productIds); // 평점 요청
      }
    } catch (error) {
      console.log('강의 불러오기 실패:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const scrollPagination = () => {
    const isBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 600;
    if (isBottom && !isLastPage && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  console.log('스크롤 위치', window.scrollY);

  // if (loading && currentPage === 0) {
  //   return <div className='course-list'>로딩 중...</div>;
  // }

  if (currentPage === 0 && (!courses || courses.length === 0)) {
    return <div className='course-list'>현재 강의가 없습니다.</div>;
  }

  return (
    <div className={styles['course-list']}>
      {courses.map((course) => (
        <div
          key={course.productId}
          className={styles['course-card']}
          onClick={() =>
            navigate(`/info/${course.productId}`, {
              state: { courseId: course.productId },
            })
          }
        >
          <img src={categoryImages[course.category]} alt={course.category} />

          <div className={styles.info}>
            <h3 className={styles.title}>
              <a
                className={styles.filePath}
                // href={course.filePath}
                target='_blank'
                rel='noopener noreferrer'
              >
                {course.productName}
              </a>
            </h3>
            <p className={styles.instructor}>
              {course.username} [{course.category}]
            </p>
            <div
              style={{
                display: 'flex',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>
                ₩{course.price.toLocaleString()}
              </span>
              <p
                style={{
                  fontWeight: 'bold',
                  marginLeft: '3rem',
                }}
              >
                ⭐ {ratings[course.productId]?.toFixed(1) ?? '0.0'}
              </p>
              {/* <span className={styles.category}>{course.category}</span> */}
            </div>
          </div>
        </div>
      ))}
      {/* {(loading && currentPage) > 0 && <div>loading...</div>} */}
    </div>
  );
};

export default MainPage;
