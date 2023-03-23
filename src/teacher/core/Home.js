import React,{Component} from 'react';
import { API } from '../../backend';
import { Link } from 'react-router-dom';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { isAuthenticatedT, loginnamet } from '../helper';
import Loading from '../../core/Loading';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            course: [],
            enroll: [],
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
            fetch(`${API}enroll/`,{method: "GET"}),
            fetch(`${API}student/`,{method: "GET"})
        ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
        .then(([data1, data2, data3]) => this.setState({
            course: data1, 
            enroll: data2,
            student: data3,
            loading:false,
        }));
    }
    teacher = () => {
        return( <div className="alert info text-center">
                  <strong>Hi, {loginnamet()}</strong><br />
                  Welcome to Academy!!!
                </div>
        )
      }
    render() {
        let enr = this.state.enroll.map(function (e) { return e.course });
        let co = this.state.course.filter(c => c.teacher === isAuthenticatedT().user.id).map(c=>(c.id))
        let c = co.filter(item => enr.includes(item)).map(e=>e)
        let enrs = this.state.enroll.filter(e => e.course === c.includes(e)).map(e => e.student)
        
        return (
            this.state.loading ? this.loadingMess() :
            <div className="services page_section">
                    <br/><br/>
                    <div className="container">
                        {this.teacher()}
                        <div className="row">
                            <div className="col">
                                <div className="section_title text-center">
                                    <h1>Our Services</h1>
                                </div>
                            </div>
                        </div>
        
                        <div className="row services_row">
            
                            <div className="col-lg-6 service_item text-center d-flex flex-column align-items-center justify-content-start">
                                <div className="icon_container d-flex flex-column justify-content-end">
                                    <img src="/assets/images/milestone_3.svg" alt="" />
                                    <div>
                                    {this.state.course.filter(cors => cors.teacher === isAuthenticatedT().user.id).map((cor, index) => {
                                        return(
                                            <NotificationBadge count={index+1} effect={Effect.SCALE}/>
                                        );
                                    })}    
                                    </div>
                                </div>
                                <h3>Approved Courses</h3>
                                <div class="news_post_button text-center trans_200">
                                    <Link to='/teacher/course'>View Courses</Link>
                                </div>
                            </div>

                            <div className="col-lg-6 service_item text-center d-flex flex-column align-items-center justify-content-start">
                                <div className="icon_container d-flex flex-column justify-content-end">
                                    <img src="/assets/images/milestone_1.svg" alt="" />
                                    <div>
                                    {co.filter(item => enr.includes(item)).map((e,index)=>{
                                        return(
                                            <NotificationBadge count={index+1} effect={Effect.SCALE}/>
                                        );
                                    })} 
                                    </div>
                                    
                                </div>
                                <h3>Current Students</h3>
                                <div class="news_post_button text-center trans_200">
                                    <Link to='/teacher/student'>View Students</Link>
                                </div>
                            </div>
                                
                        </div>
                    </div>
                </div>
          );
    }
}
