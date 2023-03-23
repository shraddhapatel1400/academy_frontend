import React,{Component} from 'react';
import { API } from '../../backend';
import { loginnamet, isAuthenticatedT } from '../helper';
import { Link } from 'react-router-dom';
import Loading from '../../core/Loading';

export default class Course extends Component {
    constructor(props){
        super(props);
        this.state = {
            course: [],
            teacher: [],
            student: [],
            loading : true,
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
            fetch(`${API}student/`,{method: "GET"})
        ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
        .then(([data1, data2, data3]) => this.setState({
            course: data1, 
            teacher: data2,
            student: data3,
            loading : false
        }));
    }
    render() {
        return (
            this.state.loading ? this.loadingMess() :
            <div><br /><br />
                <div class="popular page_section">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="section_title text-center">
                                    <h1>Courses For You!!!</h1>
                                </div>
                            </div>
                        </div>

                        <div class="row course_boxes">
                        {this.state.course.filter(cors => cors.teacher == isAuthenticatedT().user.id).map((course, index) => (
                            <div className="col-lg-4 course_box">
                                <div className="card mb-2" key={index}>
                                
                                    <img class="card-img-top" src={course.image ? course.image : "/assets/images/course_1.jpg"} alt="https://unsplash.com/@kellybrito" height="200px" width="200px" />
                                    <div class="card-body text-center">
                                        <div class="card-title"><Link to={`/teacher/video/${course.id}`} >{course.coursename}</Link></div>
                                        <div class="card-text">{course.description}</div>
                                    </div>
                                    <div class="price_box d-flex flex-row align-items-center">
                                        <div class="course_author_image">
                                            <img src="/assets/images/author.jpg" alt="https://unsplash.com/@mehdizadeh" />
                                        </div>
                                        <div class="course_author_name">{course.start_date}</div>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
          );
    }
}
