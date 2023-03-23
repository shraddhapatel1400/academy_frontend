import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { API } from '../../backend';
import { loginnames } from '../helper/index';
import Loading from '../../core/Loading';

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
    const [teacher, setTeacher] = useState([]);
    const [loading, setLoad] = useState(true);
  
    useEffect(() => {
            Promise.all([
                fetch(`${API}course/`,{method: "GET"}),
                fetch(`${API}teacher/`,{method: "GET"}),
            ])
            .then(([res1, res2]) => Promise.all([res1.json(),res2.json()]))
            .then(([data1, data2]) => (
                setCourse(data1),
                setTeacher(data2),
                setLoad(false)
            ));
    });
     const student = () => {
        return( <div className="alert info text-center">
                  <strong>Hi, {loginnames()}</strong><br />
                  Welcome to Academy!!!
                </div>
        )
      }
      const loadingMess = () => {
        return(
            loading && (
                <Loading />
            )
        );
      }

    return (
        loading ? loadingMess() : 
        <div>
            <br /><br />
            <div class="popular page_section">
                <div class="container">
                    
                    {student()}
                    <div class="row">
                        <div class="col-sm-11">
                            <div class="section_title text-center">
                                <h1>Popular Courses</h1>
                            </div>
                        </div>
                        <div className="col-sm-1 mt-5">
                            <Link to='/student/course'>View All</Link>
                        </div>
                    </div>
                   
                    <Carousel responsive={responsive}>
                       {courses.filter(cors => cors.popular === true).map((course, index) => {
                        return (
                                <div className="card text-left mt-3" key={index}>
                                    <img className="card-img-top" src={course.image ? course.image : "/assets/images/course_1.jpg"} alt="https://unsplash.com/@kellybrito" height="250px" width="200px" />
                                    <div className="card-body text-center">
                                        <div className="card-title"><Link to={`/student/course`} >{course.coursename}</Link></div>
                                        <div className="card-text">{course.description}</div>
                                    </div>
                                    <div className="price_box d-flex flex-row align-items-center">
                                        <div className="course_author_image">
                                            <img src="/assets/images/author.jpg" alt="https://unsplash.com/@mehdizadeh" />
                                        </div>
                                        <div className="course_author_name">
                                            {teacher.filter(cour => cour.id == course.teacher).map((cors) => (cors.fullname))}
                                            , <span>Author</span>
                                        </div>
                                        <div className="course_price d-flex flex-column align-items-center justify-content-center"><span>{course.price}$</span></div>
                                    </div>
                                </div>

                            )
                        })}
                    </Carousel>
                </div>
            </div>
        
		</div>
    );
}