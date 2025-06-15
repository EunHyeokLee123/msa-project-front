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

const SORT_OPTIONS = [
  { label: '이름순', value: 'name' },
  { label: '가격 낮은순', value: 'priceAsc' },
  { label: '가격 높은순', value: 'priceDesc' },
  { label: '평점 높은순', value: 'ratingDesc' },
  { label: '평점 낮은순', value: 'ratingAsc' },
];



import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './CourseSearchPage.scss';
import styles from './CourseSearchPage.module.scss';
import { API_BASE_URL, COURSE, EVAL } from '../../configs/host-config';
import { useCategory } from '../../context/CategoryContext';
import { useNavigate, useLocation } from 'react-router-dom';

const PAGE_SIZE = 12;



const CourseSearchPage = () => {
  console.log('페이지 진입ㅃ!');

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  // 평점 데이터 상태변수
  const [ratings, setRatings] = useState({});

  const { selectedCategory } = useCategory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword') || '';

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'name';

  // 드롭다운 변경 시 URL 쿼리 갱신
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSearchParams({ sort: selectedSort });
  };

  // 정렬 기준 바뀌면 API 호출
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/courses?sort=${sort}`);
        setCourses(response.data);
      } catch (error) {
        console.error('강의 목록 정렬로 불러오기 실패:', error);
      }
    };
    fetchCourses();
  }, [sort]);


  // const filteredCourses = allCourses.filter((course) =>
  //   course.title.toLowerCase().includes(keyword.toLowerCase())
  // );

  const navigate = useNavigate();

  // 평점 요청용 로직
  const fetchCourseRatings = async (productIds) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${EVAL}/course-eval-rating`,
        productIds,
      );

      console.log(productIds);
      console.log(response);

      if (response.data && response.data.result) {
        setRatings(response.data.result);
      }
    } catch (error) {
      console.error('평점 가져오기 실패:', error);
    }
  };

  const fetchCourses = async (page) => {
    setLoading(true);

    let url;

    console.log('selectedCategory은 ' + selectedCategory);

    try {
      if (
        selectedCategory !== '전체' &&
        selectedCategory !== undefined &&
        selectedCategory !== ''
      ) {
        let category;
        if (selectedCategory === 'HTML/CSS') {
          category = 'HTMLCSS';
        } else {
          category = selectedCategory;
        }

        url = `${API_BASE_URL}${COURSE}/category/${encodeURIComponent(
          category,
        )}?page=${page}&size=${12}`;
      } else if (keyword !== undefined && keyword !== '') {
        // console.log("keyword은 " + keyword);
        url = `${API_BASE_URL}${COURSE}/search?keyword=${encodeURIComponent(
          keyword,
        )}`;
      } else {
        // url = `${API_BASE_URL}${COURSE}/list?page=${page}&size=${PAGE_SIZE}`;
        url = `${API_BASE_URL}${COURSE}/all`;
      }

      console.log(url);

      const response = await axios.get(url);

      console.log(response);

      if (response.data.content) {
        // 페이징 결과
        setCourses(response.data.content);
        setTotalPages(response.data.totalPages);

        // 평점을 볼 강의 리스트를 eva-ervice로 넘김
        const productIds = response.data.content.map(
          (course) => course.productId,
        );
        fetchCourseRatings(productIds);
      } else {
        // 전체 목록
        setCourses(response.data);
        setTotalPages(1);

        const productIds = response.data.map((course) => course.productId);
        fetchCourseRatings(productIds);
      }
    } catch (error) {
      console.error('강의 불러오기 실패:', error);
    } finally {
      console.log(courses);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(page);
  }, [selectedCategory, page, keyword]);

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
    <>
      <div>
        <div>
          <label>정렬: </label>
          <select value={sort} onChange={handleSortChange}>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <ul>
          {courses.map((course) => (
            <li key={course.productId}>
              <h3>{course.productName}</h3>
              <p>{course.description}</p>
              <p>₩{course.price}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles['course-list']}>
        {courses.map((course) => (
          <div
            className={styles['course-card']}
            key={course.productId}
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
                <a className={styles.filePath}>{course.productName}</a>
              </h3>
              <p className={styles.instructor}>
                {course.username} [{course.category}]
              </p>
              <div className={styles.bottom}>
                <span className={styles.price}>
                  ₩{course.price.toLocaleString()}
                </span>
                {
                  <p className={styles.rating}>
                    ⭐ {ratings[course.productId]?.toFixed(1) ?? '0.0'}
                  </p>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles['pagination-section']}>
        <div className={styles.pagination}>
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
    </>
  );
};

export default CourseSearchPage;
