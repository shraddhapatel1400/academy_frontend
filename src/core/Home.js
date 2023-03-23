import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { API } from '../backend';

import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loading from './Loading';

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

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            courses: [],
            teacher : [],
            loading: true,
        };
    } 
    loadingMess = () => {
        return(
            this.state.loading && (
                <Loading />
            )
        );
      }
    componentDidMount(){
        Promise.all([
            fetch(`${API}course/`,{method: "GET"}),
            fetch(`${API}teacher/`,{method: "GET"}),
        ])
        .then(([res1, res2]) => Promise.all([res1.json(),res2.json()]))
        .then(([data1, data2]) => this.setState({
            courses: data1,
            teacher: data2,            
            loading: false,
        }));
    }
  render() {
    return (
        this.state.loading ? this.loadingMess() :
    <div>
    <div className="home">
        <div className="hero_slider_container">
        <div className="hero_slider">
            <div className="hero_slide">
                <div className="hero_slide_background" style ={{backgroundImage:"url(assets/images/slider_background.jpg)"}}></div>
                <div className="hero_slide_container d-flex flex-column align-items-center justify-content-center">
                    <div className="hero_slide_content text-center">
                        <h1 data-animation-in="fadeInUp" data-animation-out="animate-out fadeOut">Get your <span>Education</span> today!</h1>
                    </div>
                </div>
            </div>
            
        </div>

        <div className="hero_slider_left hero_slider_nav trans_200"><span className="trans_200">prev</span></div>
        <div className="hero_slider_right hero_slider_nav trans_200"><span className="trans_200">next</span></div>
        </div>
    </div>
    
        <div className="hero_boxes">
            <div className="hero_boxes_inner">
                <div className="container">
                    <div className="row">
    
                        <div className="col-lg-4 hero_box_col">
                            <div className="hero_box d-flex flex-row align-items-center justify-content-start">
                                <img src="/assets/images/earth-globe.svg" className="svg" alt="" />
                                <div className="hero_box_content">
                                    <h2 className="hero_box_title">Online Courses</h2>
                                    <Link to="/course" className="hero_box_link">view more</Link>
                                </div>
                            </div>
                        </div>
    
                        <div className="col-lg-4 hero_box_col">
                            <div className="hero_box d-flex flex-row align-items-center justify-content-start">
                                <img src="/assets/images/milestone_1.svg" className="svg" alt="" />
                                <div className="hero_box_content">
                                    <h2 className="hero_box_title">Our Students</h2>
                                    <a href="/about" className="hero_box_link">view more</a>
                                </div>
                            </div>
                        </div>
    
                        <div className="col-lg-4 hero_box_col">
                            <div className="hero_box d-flex flex-row align-items-center justify-content-start">
                                <img src="/assets/images/professor.svg" className="svg" alt="" />
                                <div className="hero_box_content">
                                    <h2 className="hero_box_title">Our Teachers</h2>
                                    <a href="/about" className="hero_box_link">view more</a>
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
        </div>

        <div className="popular page_section">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="section_title text-center">
                            <h1>Popular Courses</h1>
                        </div>
                    </div>
                </div>
    
                    <Carousel responsive={responsive}>
                       {this.state.courses.filter(cors => cors.popular === true).map((course, index) => {
                        return (
                                <div className="card text-left mt-3" key={index}>
                                    <img className="card-img-top" src={course.image ? course.image : "/assets/images/course_1.jpg"} alt="https://unsplash.com/@kellybrito" height="250px" width="200px" />
                                    <div className="card-body text-center">
                                        <div className="card-title"><Link to={{ pathname:'/student/dashboard',data:(course.id)}} >{course.coursename}</Link></div>
                                        <div className="card-text">{course.description}</div>
                                    </div>
                                    <div className="price_box d-flex flex-row align-items-center">
                                        <div className="course_author_image">
                                            <img src="/assets/images/author.jpg" alt="https://unsplash.com/@mehdizadeh" />
                                        </div>
                                        <div className="course_author_name">
                                            {this.state.teacher.filter(cour => cour.id === course.teacher).map((cors) => (cors.fullname))}
                                            , <span>Author</span></div>
                                        <div className="course_price d-flex flex-column align-items-center justify-content-center"><span>{course.price}$</span></div>
                                    </div>
                                </div>

                            )
                        })}
                    </Carousel>
            </div>		
        </div>

      </div>
    )
  }
}

    