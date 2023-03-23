import React,{Component} from 'react';
import Loading from '../../core/Loading';
import { isAuthenticatedT } from '../helper';
import { API } from '../../backend';
import { OverlayTrigger, Tooltip, Popover } from 'react-bootstrap'

export default class Student extends Component {

constructor(props){
    super(props);
    this.state = {
        student: [],
        course: [],
        enroll : [],
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
      fetch(`${API}enroll/`,{method: "GET"}),
      fetch(`${API}student/`,{method: "GET"}),
      fetch(`${API}course/`,{method: "GET"}),
  ])
  .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
  .then(([data1, data2, data3]) => this.setState({
      enroll: data1,
      student: data2,
      course: data3,
      loading : false,
  }));
}

    render(){
        let enr = this.state.enroll.map(function (e) { return e.course });
        let co = this.state.course.filter(c => c.teacher === isAuthenticatedT().user.id).map(c=>(c.id))
        let e = co.filter(item => enr.includes(item)).map(e=>e)
        let s = this.state.enroll.map(function (e) { return e.student })
        let s1 = this.state.course.filter(c => (c.teacher === isAuthenticatedT().user.id) && (enr.includes(c))).map(e=>e)

    return (
        this.state.loading ? this.loadingMess() :
        <div className="container" style={{height:"800px"}}>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <table className="table table-striped table-responsive-md btn-table">
            <thead>
                <tr className="text-center">
                    <th>No.</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Course Name</th>
                </tr>
            </thead>

            <tbody>
            {e.map((std,index)=>{
                let e1 = this.state.enroll.filter(er=>er.course===std).map(er=>er.student)
                return(
                <tr className="text-center">
                    <th scope="row">{index+1}</th>
                    <td>{this.state.student.filter(s=>s.id==e1).map(s=>s.fullname).join(",")}</td>
                    <td>{this.state.student.filter(s=>s.id==e1).map(s=>s.email).join(",")}</td>
                    <td>{this.state.course.filter(c => c.id === std).map(c=>c.coursename)}</td>
                </tr>
             );
            })}   
            </tbody>
        </table>
        
        </div>
        
    );
  }
}
  