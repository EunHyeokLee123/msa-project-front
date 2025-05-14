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
import styles from './MainPage.module.scss';
import { useAuth } from '../context/TokenContext';

const MainPage = () => {
  const userAuth = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const baseUrl = `${API_BASE_URL}${COURSE}/all`;
      console.log("baseUrl : " + baseUrl)
      const response = await axios.get(baseUrl);
      console.log(response);
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.log('강의 불러오기 실패:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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

        >
          <img src={categoryImages[course.category]} alt={course.category}
          />

          <div className={styles.info}>
            <h3 className={styles.title}>
              <a className={styles.filePath} href={course.filePath} target='_blank' rel='noopener noreferrer'>
                {course.productName}
              </a>
            </h3>
            <p className={styles.instructor}>{course.username}    [{course.category}]</p>
            <div className={styles.bottom}>
              <span className={styles.price}>₩{course.price.toLocaleString()}</span>
              {/* <span className={styles.category}>{course.category}</span> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
