import React,{Component} from 'react';
import { API } from '../../backend';
import { isAuthenticatedS } from '../helper';
import { ProgressBar, Media} from 'react-bootstrap';
import Loading from '../../core/Loading';
import { Link } from 'react-router-dom';

export default class Student extends Component {

    constructor(props){
        super(props);
        this.state = {
            enroll: [],
            course : [],
            loading : true
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
      fetch(`${API}enroll/`,{method: "GET"}),
      fetch(`${API}course/`,{method: "GET"}),
  ])
  .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
  .then(([data1, data2]) => this.setState({
      enroll : data1,
      course : data2,
      loading : false
  }));
}
    render(){
        const i = [0,2,50,0,90,24,67,12]
    return (
        this.state.loading ? this.loadingMess() :
        <div class="popular page_section">
        {this.state.enroll.filter(stud => stud.student == isAuthenticatedS().user.id).length > 0 ?
        <div>
        <br /><br/>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="section_title text-center">
                            <h1>My Enrollment</h1>
                        </div>
                    </div>
                </div>
            
            {this.state.enroll.filter(stud => stud.student == isAuthenticatedS().user.id).map((std,ind) => {
            return(
                <div>
                    {this.state.course.filter(cour => cour.id == std.course).map((cor,index) => (
                        <Media className="mt-5" key={index}>
                            <img width={300} height={150} className="mr-3" src={cor.image ? cor.image : "/assets/images/course_1.jpg"} alt="Generic placeholder" />
                            <Media.Body>
                                <p>Course</p><p className="animated fadeInDown"><mark>Purchased</mark></p>
                                <h5><Link to={`/student/lecture/${cor.id}`} >{cor.coursename}</Link></h5>
                                <div class="progress">
                                    <div class="progress-bar bg-warning" role="progressbar" style={{width: i[ind]+"%",color:"black"}} aria-valuenow={i[ind]} aria-valuemin="0" aria-valuemax="100">{i[ind]}%</div>
                                </div>
                            </Media.Body>
                        </Media>
                    ))}
                
                </div>
             );
            })}   
            </div>
        </div>
        : <div>
            <img src="/assets/images/1.jpg" height="700px" width="500px" alt="" className="rounded mx-auto d-block"/>
          </div>
        }
        </div>
    );
  }
}
  