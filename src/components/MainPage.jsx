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
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
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

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';

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
    setCourses([]);
    setRatings({});
    setCurrentPage(0);
    setLastPage(false);
  }, [sort]);

  useEffect(() => {
    fetchCourses();

    const throttledScroll = throttle(scrollPagination, 1000);

    window.addEventListener('scroll', throttledScroll);

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  useEffect(() => {
    if (!isLastPage) {
      fetchCourses();
    }
  }, [currentPage, sort]);

  // ⭐ 정렬 드롭다운 핸들러
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    // setSearchParams({ sort: selectedSort });
    setCourses([]);
    setRatings({});
    setCurrentPage(0);
    setLastPage(false);
    navigate(`/?sort=${selectedSort}`);
  };

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
      let baseUrl = ''; // ✅ baseUrl 선언 추가

      if (sort) {
        baseUrl = `${API_BASE_URL}${COURSE}/all/sort`;
      } else {
        baseUrl = `${API_BASE_URL}${COURSE}/all`;
      }

      console.log('baseUrl : ' + baseUrl);

      const response = await axios.get(baseUrl, {
        params: {
          ...params,
          ...(sort ? { sort } : {}),
        },
        headers: {
          Authorization: `Bearer ${userAuth.token}`,
        },
      });

      console.log('response 값: ', response.data);
      console.log('response.content: ', response.content);
      console.log('response.length: ', response.data.length);

      let newCourses = response.content;
      let courseCnt = response.data.length;
      if (response.data.content) {
        console.log('response.data.content 있음');
        newCourses = response.data.content;
        courseCnt = response.data.length;
      } else {
        console.log('response.data.content 없음');
        newCourses = response.data;
        courseCnt = response.data.length;
      }

      console.log('newCourses: ', newCourses);
      console.log('courseCnt: ', courseCnt);

      if (courseCnt === 0) {
        setLastPage(true);
      } else {
        setCourses((prevCourses) => {
          const existingIds = new Set(prevCourses.map((c) => c.productId));
          const filteredCourses = newCourses.filter(
            (c) => !existingIds.has(c.productId),
          );
          return [...prevCourses, ...filteredCourses];
        });

        const productIds = newCourses.map((course) => course.productId); // ✅ 수정
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
    <>
      <div style={{ padding: "18px" }}>
        <h2>강의 목록</h2>
      </div>
      <div className={styles['sort-bar']}>
        <select value={sort} onChange={handleSortChange}>
          <option value=''>기본 정렬</option>
          <option value='name'>이름순</option>
          <option value='priceAsc'>가격 낮은 순</option>
          <option value='priceDesc'>가격 높은 순</option>
          <option value='ratingDesc'>평점 높은 순</option>
          <option value='ratingAsc'>평점 낮은 순</option>
        </select>
      </div>
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
    </>
  );
};

export default MainPage;
