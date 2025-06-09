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
  //java: javaImg,
  //카테고리: sqlImg,
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './CourseSearchPage.scss';
import styles from './CourseSearchPage.module.scss';
import { API_BASE_URL, COURSE } from '../../configs/host-config';
import { useCategory } from '../../context/CategoryContext';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 12;

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const { selectedCategory } = useCategory();
  const navigate = useNavigate();

  const fetchCourses = async (page) => {
    setLoading(true);

    let url;

    try {
      if (selectedCategory !== undefined && selectedCategory !== '') {
        url = `${API_BASE_URL}${COURSE}/category/${encodeURIComponent(
          selectedCategory,
        )}?page=${page}&size=${16}`;
      } else {
        url = `${API_BASE_URL}${COURSE}/list?page=${page}&size=${PAGE_SIZE}`;
      }

      const response = await axios.get(url);

      console.log(response);

      if (response.data.content) {
        // 페이징 결과
        setCourses(response.data.content);
        setTotalPages(response.data.totalPages);
      } else {
        // 전체 목록
        setCourses(response.data);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('강의 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(page);
  }, [selectedCategory, page]);

  useEffect(() => {
    fetchCourses(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  if (loading) {
    return <div className='course-list'>로딩 중...</div>;
  }

  if (!courses || courses.length === 0) {
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
          style={{ cursor: 'pointer' }}
        >
          <img src={categoryImages[course.category]} alt={course.category} />

          <div className={styles.info}>
            <h3 className={styles.title}>
              <a className={styles.filePath} href={course.filePath}>
                {course.productName}
              </a>
            </h3>
            <p className={styles.instructor}>{course.instructor}</p>
            <div className={styles.bottom}>
              <span className={styles.price}>₩{course.price.toLocaleString()}</span>
              {/* <span className={styles.category}>{course.category}</span> */}
            </div>
          </div>
        </div>
      ))}

      <div className='pagination'>
        <button onClick={handlePrev} disabled={page === 0}>
          이전
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx)}
            className={page === idx ? 'active' : ''}
          >
            {idx + 1}
          </button>
        ))}
        <button onClick={handleNext} disabled={page === totalPages - 1}>
          다음
        </button>
      </div>
    </div>
  );
};

export default CourseListPage;
