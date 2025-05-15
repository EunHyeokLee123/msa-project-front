import React, { useState } from 'react';
import axios from 'axios';
import './CourseUploadPage.scss';
import { API_BASE_URL, COURSE } from '../../configs/host-config';
import { useAuth } from '../../context/TokenContext';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Git',
  'Java',
  'SQL',
  'Linux',
  'Algorithm',
  'JDBC',
  'HTML/CSS',
  'JS',
  'React',
  'Spring',
];

const CourseUploadPage = () => {
  const userAuth = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productName: '',
    category: '',
    description: '',
    price: '',
    filePath: '',
  });

  const [courseList, setCourseList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (value) => {
    setForm((prev) => ({ ...prev, category: value }));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const { productName, category, description, price, filePath } = form;
    if (!productName || !category || !description || !price || !filePath) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    setCourseList((prev) => [...prev, form]);
    setForm({
      productName: '',
      category: '',
      description: '',
      price: '',
      filePath: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 현재 입력된 값도 리스트에 포함되도록 처리
    let allCourses = [...courseList];

    if (
      form.productName &&
      form.category &&
      form.description &&
      form.price &&
      form.filePath
    ) {
      allCourses.push(form); // 현재 작성 중인 것도 포함
    }

    console.log('토큰: ', userAuth.token);
    console.log('폼: ', allCourses);

    // if (!form.productName || !form.category || !form.description || !form.price || !form.filePath) {
    //     alert('모든 필드를 입력해주세요.');
    //     console.log(form);
    //     console.log();
    //     return;
    // }
    if (allCourses.length === 0) {
      alert('등록할 강의가 없습니다.');
      return;
    }

    console.log('여기까지옴');

    try {
      const res = await axios.post(
        `${API_BASE_URL}${COURSE}/create`,
        allCourses,
        {
          headers: {
            Authorization: `Bearer ${userAuth.token}`,
          },
          withCredentials: true,
          // },
        },
      ); // MSA Gateway 경유 가능
      if (res.status === 201) {
        alert('강의가 등록되었습니다.');
        navigate('/mypage');
        setCourseList([]);
        setForm({
          productName: '',
          category: '',
          description: '',
          price: '',
          filePath: '',
        });
      }
    } catch (err) {
      alert('등록 중 오류 발생');
      console.log('강의등록err : ' + err);
    }
  };

  return (
    <form className='course-form' onSubmit={handleSubmit}>
      <h2>강의 등록</h2>

      <label>강의명</label>
      <input
        type='text'
        name='productName'
        value={form.productName}
        onChange={handleChange}
      />

      <label>카테고리</label>
      <div className='category-options'>
        {categories.map((cat) => (
          <label
            key={cat}
            className={`radio-button ${
              form.category === cat ? 'selected' : ''
            }`}
          >
            <input
              type='radio'
              name='category'
              value={cat}
              checked={form.category === cat}
              onChange={() => handleCategorySelect(cat)}
            />
            {cat}
          </label>
        ))}
      </div>

      <label>강의 한줄 소개</label>
      <textarea
        name='description'
        value={form.description}
        onChange={handleChange}
      />

      <label>가격</label>
      <input
        type='number'
        name='price'
        value={form.price}
        onChange={handleChange}
      />

      <label>강의 링크</label>
      <input
        type='text'
        name='filePath'
        value={form.filePath}
        onChange={handleChange}
      />

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button type='button' onClick={handleAddCourse}>
          +
        </button>
        <button type='submit'>등록하기</button>
      </div>

      {courseList.length > 0 && (
        <table className='course-table'>
          <thead>
            <tr>
              <th>강의명</th>
              <th>카테고리</th>
              <th>소개</th>
              <th>가격</th>
              <th>링크</th>
            </tr>
          </thead>
          <tbody>
            {courseList.map((course, index) => (
              <tr key={index}>
                <td>{course.productName}</td>
                <td>{course.category}</td>
                <td>{course.description}</td>
                <td>{course.price}</td>
                <td>{course.filePath}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </form>
  );
};

export default CourseUploadPage;
