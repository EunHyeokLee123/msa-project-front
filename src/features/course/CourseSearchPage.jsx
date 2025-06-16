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
import { useAuth } from '../../context/TokenContext';

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
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const PAGE_SIZE = 12;

const CourseSearchPage = () => {
  const userAuth = useAuth();
  console.log('페이지 진입ㅃ!');

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setLastPage] = useState(false);
  // 평점 데이터 상태변수
  const [ratings, setRatings] = useState({});

  const { selectedCategory } = useCategory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword') || '';

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'name';
  const pageParam = parseInt(searchParams.get('page') || '0', 10);
  const [page, setPage] = useState(0);
  const pageSize = 16;

  useEffect(() => {
    if (!isLastPage) {
      fetchCourses();
    }
  }, [currentPage, sort]);

  // ⭐ 정렬 드롭다운 핸들러
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    const params = new URLSearchParams();
    // setSearchParams({ sort: selectedSort });
    if (keyword) params.set('keyword', keyword);
    params.set('sort', selectedSort);

    setCourses([]);
    setRatings({});
    setCurrentPage(0);
    setLastPage(false);
    // navigate(`/?sort=${selectedSort}`);
    navigate(`${location.pathname}?${params.toString()}`);
  };
  // 정렬 기준 바뀌면 API 호출
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await axios.get(`/api/courses?sort=${sort}`);
  //       setCourses(response.data);
  //     } catch (error) {
  //       console.error('강의 목록 정렬로 불러오기 실패:', error);
  //     }
  //   };
  //   fetchCourses();
  // }, [sort]);

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

  //강의 불러오는 함수
  const fetchCourses = async (page) => {
    setCourses([]);

    const params = {
      size: pageSize,
      page: currentPage,
    };

    setLoading(true);

    let url;
    console.log('selectedCategory은 ' + selectedCategory);
    const category = selectedCategory === 'HTML/CSS' ? 'HTMLCSS' : selectedCategory;
    const isKeywordSearch = keyword !== '';
    const isCategorySearch = selectedCategory && selectedCategory !== '전체' && selectedCategory !== '';
    const isSortSet = !!sort;

    // try {
    // if (
    //   selectedCategory !== '전체' &&
    //   selectedCategory !== undefined &&
    //   selectedCategory !== ''
    // ) {
    //   url = `${API_BASE_URL}${COURSE}/category/${encodeURIComponent(
    //     category,
    //   )}?page=${page}&size=${12}`;
    // } else if (keyword !== undefined && keyword !== '') {
    //   // console.log("keyword은 " + keyword);
    //   url = `${API_BASE_URL}${COURSE}/search?keyword=${encodeURIComponent(
    //     keyword,
    //   )}`;
    // } else {
    //   // url = `${API_BASE_URL}${COURSE}/list?page=${page}&size=${PAGE_SIZE}`;
    //   url = `${API_BASE_URL}${COURSE}/all`;
    // }

    try {
      // ✅ 1. 키워드만
      if (isKeywordSearch && !isCategorySearch && !isSortSet) {
        url = `${API_BASE_URL}${COURSE}/search?keyword=${encodeURIComponent(keyword)}`;
      }

      // ✅ 2. 카테고리만
      else if (!isKeywordSearch && isCategorySearch && !isSortSet) {
        url = `${API_BASE_URL}${COURSE}/category/${encodeURIComponent(category)}`;
      }

      // ✅ 3. 정렬만
      else if (!isKeywordSearch && !isCategorySearch && isSortSet) {
        url = `${API_BASE_URL}${COURSE}/all/sort`;
      }

      // ✅ 4. 카테고리 + 정렬
      else if (!isKeywordSearch && isCategorySearch && isSortSet) {
        url = `${API_BASE_URL}${COURSE}/category/${encodeURIComponent(category)}/sort`;
      }


      console.log('[fetchCourses] URL:', url);
      const response = await axios.get(url, {
        params: {
          ...params,
          ...(sort ? { sort } : {}),
        },
        headers: {
          Authorization: `Bearer ${userAuth.token}`,
        },
      });
      // setCourses(response.data);

      console.log('response.data 값: ', response.data);
      console.log('response.content: ', response.content);
      console.log('response.data.length: ', response.data.length);
      console.log('response.data.content: ', response.data.content);
      console.log('response.data.content.length: ', response.data.content.length);


      let newCourses = response.content;
      let courseCnt = response.data.length;
      if (response.data.content) {
        console.log('response.data.content 있음');
        newCourses = response.data.content;
        courseCnt = response.data.content.length;
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
      console.error('강의 불러오기 실패:', error);
    } finally {
      console.log(courses);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(page);
  }, [selectedCategory, keyword, sort, page]);

  const updatePage = (newPage) => {
    searchParams.set('page', newPage);
    setSearchParams(searchParams);
    setPage(newPage);
  };

  const handlePrev = () => {
    if (page > 0) updatePage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) updatePage(page + 1);
  };

  if (loading) {
    return <div className='course-list'>로딩 중...</div>;
  }

  if (!courses || courses.length === 0) {
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
              <p className={styles.description}>
                {course.description}
              </p>
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
              onClick={() => updatePage(idx)}
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