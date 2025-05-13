import React, { useState } from 'react';
import axios from 'axios';
import './CourseUploadPage.scss';
import { API_BASE_URL, COURSE } from '../../configs/host-config';

const categories = ['Git', 'Java', 'SQL', 'Linux', 'Algorithm', 'JDBC', 'HTML/CSS', 'JS', 'React', 'Spring'];

const CourseUploadPage = () => {
    const [form, setForm] = useState({
        title: '',
        category: '',
        description: '',
        price: '',
        link: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategorySelect = (value) => {
        setForm((prev) => ({ ...prev, category: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.category || !form.description || !form.price || !form.link) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}${COURSE}/create`, {
                            withCredentials: true,
                            // headers: {
                            //     Authorization: `Bearer ${token}`,
                            //     Content-Type: `application/json`,
                            //     userId: form.userId
                            // },
                        }, form); // MSA Gateway 경유 가능
            alert('강의가 등록되었습니다.');
            setForm({
                title: '',
                category: '',
                description: '',
                price: '',
                link: ''
            });
        } catch (err) {
            alert('등록 중 오류 발생');
            console.error(err);
        }
    };

    return (
        <form className="course-form" onSubmit={handleSubmit}>
            <h2>강의 등록</h2>

            <label>강의명</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} />

            <label>카테고리</label>
            <div className="category-options">
                {categories.map((cat) => (
                    <label key={cat} className={`radio-button ${form.category === cat ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="category"
                            value={cat}
                            checked={form.category === cat}
                            onChange={() => handleCategorySelect(cat)}
                        />
                        {cat}
                    </label>
                ))}
            </div>

            <label>강의 한줄 소개개</label>
            <textarea name="description" value={form.description} onChange={handleChange} />

            <label>가격</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} />

            <label>강의 링크</label>
            <input type="text" name="link" value={form.link} onChange={handleChange} />

            <button type="submit">등록하기</button>
        </form>
    );
};

export default CourseUploadPage;
