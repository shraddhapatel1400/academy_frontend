import React,{Component} from 'react';
import { API } from '../../backend';
import Loading from '../../core/Loading';

export default class Enrollment extends Component {

  constructor(props){
    super(props);
    this.state = {
        courses: [],
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
        fetch(`${API}student/`,{method: "GET"}),
    ])
    .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
    .then(([data1, data2, data3]) => this.setState({
        courses: data1,
        enroll: data2,
        student: data3,
        loading : false
    }));
  }
  render(){
    return (
        this.state.loading ? this.loadingMess() :
        this.state.enroll.length > 0 ? 
        <div className="container">
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            
            <table className="table table-striped table-responsive-md btn-table">
            
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Transaction Id</th>
                    <th>Student Name</th>
                    <th>Student email</th>
                    <th>Course Name</th>
                    <th>Total Amount</th>
                    <th>Purchased Date</th>
                </tr>
            </thead>

            <tbody>
            {this.state.enroll.map((en, index) => {
                return(     
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{(en.transaction_id).concat(Math.floor(Math.random() * 100000))}</td>
                        <td>{this.state.student.filter(cour => cour.id == en.student).map((cors) => ( cors.fullname ))}</td>
                        <td>
                            {this.state.student.filter(cour => cour.id == en.student).map((cors) => (
                            cors.email ))}
                        </td>
                        <td>
                            {this.state.courses.filter(cour => cour.id == en.course).map((cors) => (
                            cors.coursename ))}
                        </td>
                        <td>{(en.total_amount).concat('$')}</td>
                        <td>{en.created_at}</td>
                    </tr>
                );
            })}   
            </tbody>
            </table>
        </div>
        : <img src="/assets/images/1.jpg" height="700px" width="500px" alt="" className="rounded mx-auto d-block"/>
    );
  }
}