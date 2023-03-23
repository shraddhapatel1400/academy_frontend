import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API } from '../../backend';
import { isAuthenticatedS } from '../helper';
import Loading from '../../core/Loading';

export default function Course() {

    const [courses, setCourse] = useState([]);
    const [enroll, setEnroll] = useState([]);
    const [teacher, setTe] = useState([]);
    const [loading, setLoad] = useState(true);
  
    useEffect(() => {
        Promise.all([
            fetch(`${API}enroll/`,{method: "GET"}),
            fetch(`${API}course/`,{method: "GET"}),
            fetch(`${API}teacher/`,{method: "GET"}),
        ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
        .then(([data1, data2, data3]) => (
            setEnroll(data1),
            setCourse(data2),
            setTe(data3),
            setLoad(false)
        ))
    });
    const loadingMess = () => {
        return(
            loading && (
                <Loading />
            )
        );
      }
    const opensweetalert = (te) => {
        teacher.filter(cour => cour.id === te).map((cors) => (
            Swal.fire({
                title: cors.fullname,
                html: "<span>If you have any query please contact me : <b>" + cors.email + '</b> or <b>'+cors.phone+'</b></span>' +
                      '<hr />I am working at <h5>' +cors.institute +
                      '</h5>and my purpose is '+cors.purpose,
            })
        ))
    }
    return (
        loading ? loadingMess() : 
        <div>
            <div className="popular page_section">
                <div className="container">
                    <br /><br />
                    <div className="row">
                        <div className="col">
                            <div className="section_title text-center">
                                <h1>Available Courses</h1>
                            </div>
                        </div>
                    </div>
                    <div class="event_items">
                    {courses.map((cor, index) => (
                        
                    <div class="row event_item" key={index}>
                        <div class="col">
                            
                            <div class="row d-flex flex-row align-items-end">
    
                                <div class="col-lg-2 order-lg-1 order-2">
                                    <div class="event_date d-flex flex-column align-items-center justify-content-center">
                                        <div class="event_day">{cor.start_date.slice(0,2)}</div>
                                        <div class="event_month">{cor.start_date.slice(3,6)}</div>
                                    </div>
                                </div>
    
                                <div class="col-lg-6 order-lg-2 order-3">
                                    <div class="event_content">
                                        <div className="row">
                                        <div className="col-lg-10">
                                            <div class="event_name">
                                                <h5>
                                                    {enroll.length > 0 ? (enroll.some(e => (e.course === cor.id) && (e.student === isAuthenticatedS().user.id)) ? 
                                                        (<Link to={`/student/enrollment/`} >{cor.coursename}</Link>) :
                                                        (<Link to={`/student/dashboard/${cor.id}`} >{cor.coursename}</Link>)
                                                    ) : (<Link to={`/student/dashboard/${cor.id}`} >{cor.coursename}</Link>)}
                                                </h5>
                                                <span onClick={()=>opensweetalert(cor.teacher)}>{teacher.filter(cour => cour.id === cor.teacher).map((cors) => (cors.fullname))}</span>
                                            </div>
                                            <div class="event_location">End Date : {cor.end_date}</div>
                                            <p>{cor.description}</p>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="course_price d-flex flex-column align-items-center justify-content-center"><span>{cor.price}$</span></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="col-lg-4 order-lg-3 order-1">
                                    <div class="event_image">
                                        <img src={cor.image ? cor.image : "/assets/images/course_1.jpg"} alt="https://unsplash.com/@theunsteady5"  height="150px" width="100px"/>
                                    </div>
                                </div>
                            </div>
                            
                            <hr style={{backgroundColor: "yellow",height: 1}} />
                        </div>
                        
                    </div>
                ))}
                </div>
                </div>
            </div>
		</div>

    );
  }
