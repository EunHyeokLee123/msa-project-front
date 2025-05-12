import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CourseListPage.scss';

const CourseListPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/courses/list');
                setCourses(response.data);
            } catch (error) {
                console.error('강의 데이터를 불러오는데 실패했습니다.', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <div className="course-list">로딩 중...</div>;
    }

    return (
        <div className="course-list">
            {courses.map((course) => (
                <div key={course.productId} className="course-card">
                    <a className="filePath" href="course.filePath"></a>
                    <img src={course.image} alt={course.productName} />
                    {course.tag && <span className="tag">{course.tag}</span>}
                    <div className="info">
                        <h3 className="title">{course.productName}</h3>
                        <p className="instructor">{course.instructor}</p>
                        <div className="bottom">
                            <span className="price">{course.category}</span>
                            <span className="price">{course.description}</span>
                            <span className="price">₩{course.price.toLocaleString()}</span>
                            {/* <span className="rating">⭐ {course.rating} ({course.reviews}+)</span> */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseListPage;
