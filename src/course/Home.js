import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { API } from '../backend';
import Loading from '../core/Loading';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export default function Home() {

    const [courses, setCourse] = useState([]);
    const [teacher, setTe] = useState([]);
    const [loading, setLoad] = useState(true);
	const style = {textAlign: 'center'};

  const loadingMess = () => {
    return(
        loading && (
        <Loading />
        )
    );
  }
    useEffect(() => {
        Promise.all([
            fetch(`${API}course/`,{method: "GET"}),
            fetch(`${API}teacher/`,{method: "GET"}),
        ])
        .then(([res1, res2]) => Promise.all([res1.json(),res2.json()]))
        .then(([data1, data2]) => (
            setCourse(data1),
            setTe(data2),
            setLoad(false)
        ));
    });
  
    return (
        loading ? loadingMess() :
        <div class="popular page_section">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="section_title text-center">
                        <h1>Available Courses</h1>
                    </div>
                </div>
            </div>

            <div class="row course_boxes">
            {courses.map((course, index) => {
                return (
                <div className="col-lg-4 course_box">
                    <div className="card mb-2" key={index}>
                    
                        <img class="card-img-top" src={course.image ? course.image : "/assets/images/course_1.jpg"} alt="https://unsplash.com/@kellybrito" height="200px" width="200px" />
                        <div class="card-body text-center">
                            <div class="card-title"><Link to={{ pathname:'/student/dashboard',data:(course.id)}} >{course.coursename}</Link></div>
                            <div class="card-text">{course.description}</div>
                        </div>
                        <div class="price_box d-flex flex-row align-items-center">
                            <div class="course_author_image">
                                <img src="assets/images/author.jpg" alt="https://unsplash.com/@mehdizadeh" />
                            </div>
                            <div class="course_author_name">{teacher.filter(cour => cour.id == course.teacher).map((cors) => (cors.fullname))}, <span>Author</span></div>
                            <div class="course_price d-flex flex-column align-items-center justify-content-center"><span>{course.price.concat('$')}</span></div>
                        </div>
                    </div>
                </div>
                )
                })}
            </div>
        </div>
        </div>


    );
  }
