import React,{Component} from 'react';
import { API } from '../../backend'
import { Link } from 'react-router-dom';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { loginname } from '../../account/helper'
import Loading from '../../core/Loading';
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            course: [],
            teacher: [],
            student: [],
            loading : true
        };
    } 
     admin = () => {
        return( <div className="alert info text-center">
                  <strong>Hi, {loginname()}</strong><br />
                  Welcome to Acadevo!!!
                </div>
        )
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
            loading: false
        }));
    }
    render() {
        return (
            this.state.loading ? this.loadingMess() :
            <div>
            <div className="services page_section">
                    <div className="container">
                        <br /><br />
                    {this.admin()}
                        <div className="row">
                            <div className="col">
                                <div className="section_title text-center">
                                    <h1>Our Services</h1>
                                </div>
                            </div>
                        </div>
        
                        <div className="row services_row">
            
                            <div className="col-lg-4 service_item text-left d-flex flex-column align-items-center justify-content-start">
                                <div className="icon_container d-flex flex-column justify-content-end">
                                    <img src="/assets/images/milestone_3.svg" alt="" />
                                    <div>
                                    {this.state.course.map((cor, index) => {
                                        return(
                                            <NotificationBadge count={index+1} effect={Effect.SCALE}/>
                                        );
                                    })}    
                                    </div>
                                </div>
                                <h3>Approved Courses</h3>
                                <div class="news_post_button text-center trans_200">
                                    <Link to='/admin/course'>View Courses</Link>
                                </div>
                            </div>
            
                            <div className="col-lg-4 service_item text-left d-flex flex-column align-items-center justify-content-start">
                                <div className="icon_container d-flex flex-column justify-content-end">
                                    <img src="/assets/images/milestone_2.svg" alt="" />
                                    <div>
                                    {this.state.teacher.map((te, index) => {
                                        return(
                                            <NotificationBadge count={index+1} effect={Effect.SCALE}/>
                                        );
                                    })}    
                                    </div>
                                </div>
                                <h3>Certified Teachers</h3>
                                <div class="news_post_button text-center trans_200">
                                    <Link to='/admin/teacher'>View Teachers</Link>
                                </div>
                            </div>

                            <div className="col-lg-4 service_item text-left d-flex flex-column align-items-center justify-content-start">
                                <div className="icon_container d-flex flex-column justify-content-end">
                                    <img src="/assets/images/milestone_1.svg" alt="" />
                                    <div>
                                    {this.state.student.map((std, index) => {
                                        return(
                                            <NotificationBadge count={index+1} effect={Effect.SCALE}/>
                                        );
                                    })}    
                                    </div>
                                </div>
                                <h3>Current Students</h3>
                                <div class="news_post_button text-center trans_200">
                                    <Link to='/admin/student'>View Students</Link>
                                </div>
                            </div>
                                
                        </div>
                    </div>
                </div>
                </div>
          );
    }
}
