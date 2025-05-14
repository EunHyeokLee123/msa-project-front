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
  java: javaImg,
  카테고리: sqlImg,
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, COURSE } from '../configs/host-config';
import './CourseSearchPage.scss';
<<<<<<< HEAD
import { throttle } from 'lodash';
=======
import { useAuth } from '../context/TokenContext';
>>>>>>> origin/feature/course

const MainPage = () => {
  const userAuth = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setLastPage] = useState(false);
  const pageSize = 12;

  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses(0);

    const throttledScroll = throttle(scrollPagination, 1000);

    window.addEventListener('scroll', throttledScroll);

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  useEffect(() => {
    if (currentPage > 0) fetchCourses(currentPage);
  }, [currentPage]);

  //강의 불러오는 함수
  const fetchCourses = async (page = currentPage) => {
    if (loading || isLastPage) return;
    console.log('아직 보여줄 컨텐트 더 있음');

    const params = {
      size: pageSize,
      page: currentPage,
    };

    console.log('백엔드로 보낼 params', params);

    setLoading(true);

    try {
      const baseUrl = `${API_BASE_URL}${COURSE}/all`;
<<<<<<< HEAD
      const response = await axios.get(baseUrl, { params });

=======
      print("baseUrl : " + baseUrl)
      console.log("baseUrl : " + baseUrl)
      const response = await axios.get(baseUrl);
>>>>>>> origin/feature/course
      console.log(response);
      console.log('response.length: ', response.data.length);

      if (response.data.length === 0) {
        setLastPage(true);
      } else {
        setCourses((prevCourses) => [...prevCourses, ...response.data]);
        console.log(
          'courses ids',
          courses.map((c) => c.productId),
        );
      }
      setLoading(false);
    } catch (error) {
<<<<<<< HEAD
      console.error('강의 불러오기 실패:', error);
    } finally {
      // 요청에 대한 응답 처리가 끝나고 난 후 로딩 상태를 다시 false로.
=======
      console.log('강의 불러오기 실패:', error);
>>>>>>> origin/feature/course
      setLoading(false);
    }
  };

  const scrollPagination = () => {
    const isBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 200;
    if (isBottom && !isLastPage && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  console.log('스크롤 위치', window.scrollY);

  if (loading) {
    return <div className='course-list'>로딩 중...</div>;
  }

  if (!courses || courses.length === 0) {
    return <div className='course-list'>현재 강의가 없습니다.</div>;
  }

  return (
    <div className='course-list'>
      {courses.map((course) => (
        <div
          key={course.productId}
          className='course-card'
<<<<<<< HEAD
          onClick={() => navigate(`/info/${course.productId}`)}
=======
          onClick={() =>
            navigate(`/info/${course.productId}`, {
              state: { courseId: course.productId },
            })
          }
          sx={{
            height: '45px',
            lineHeight: 1.4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            color: 'rgb(33, 37, 41)',
            fontSize: '1rem',
            textDecoration: 'none',
            fontWeight: '500',
            textUnderlinePosition: 'under',
          }}
>>>>>>> origin/feature/course
        >
          <img src={categoryImages[course.category]} alt={course.category} />

          <div className='info'>
            <h3 className='title'>
              <a
                className='filePath'
                href={course.filePath}
                target='_blank'
                rel='noopener noreferrer'
              >
                {course.productName}
              </a>
            </h3>
            <p className='instructor'>{course.username}</p>
            <div className='bottom'>
              <span className='price'>₩{course.price.toLocaleString()}</span>
              <span className='category'>{course.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
