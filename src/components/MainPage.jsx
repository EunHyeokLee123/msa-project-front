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

const MainPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const baseUrl = `${API_BASE_URL}${COURSE}/all`;
      const response = await axios.get(baseUrl);

      console.log(response);
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('강의 불러오기 실패:', error);
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
    <div className='course-list'>
      {courses.map((course) => (
        <div
          key={course.productId}
          className='course-card'
          onClick={() =>
            navigate('/info/:courseId', {
              state: { courseId: course.productId },
            })
          }
        >
          <img src={categoryImages[course.category]} alt={course.category} />

          <div className='info'>
            <h3 className='title'>
              <a className='filePath' href={course.filePath}>
                {course.productName}
              </a>
            </h3>
            <p className='instructor'>{course.instructor}</p>
            <div className='bottom'>
              <span className='price'>{course.category}</span>
              <span className='price'>{course.description}</span>
              <span className='price'>₩{course.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
