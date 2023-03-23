import React,{Component} from 'react';
import { API } from '../../backend';
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { deleteCourse, updateTeacher } from '../helper/index';
import { NotificationManager } from 'react-notifications';
import Loading from '../../core/Loading';

export default class Course extends Component {

  constructor(props){
    super(props);
    this.state = {
        course: [],
        teacher: [],
        selected: '',
        corId:'',
        deleteId:'',
        pop:'',
        popcorId : '',
        isModalOpen : false,
        isModalChange : false,
        isModalPop : false,
        loading : true,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.changeModal = this.changeModal.bind(this);
    this.closeChange = this.closeChange.bind(this);
    this.popModal = this.popModal.bind(this);
    this.handlePop = this.handlePop.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTe = this.handleTe.bind(this);
} 
toggleModal(e){
  this.setState({
    isModalOpen : !this.state.isModalOpen,
    deleteId : e
  })
} 
closeChange(){this.setState({isModalChange : !this.state.isModalChange})}
changeModal(e,corid){
  this.setState({
    isModalChange : !this.state.isModalChange,
    selected: e.id,
    corId: corid
  })
}
popModal(e,cori){
  const p = e.target.checked ? 'true' : 'false'
  this.setState({
    isModalPop : !this.state.isModalPop,
    pop : p,
    popcorId : cori
  })
}
handlePop(){
  const detail = {
    popular : this.state.pop
  }
  updateTeacher(this.state.popcorId,detail);
  this.setState({
      isModalPop:!this.state.isModalPop,
      pop : '',
      popcorId: ''
    })
    NotificationManager.success('Changes saved for popular!!', 'Successful!', 3000);
}

handleDelete() {
  deleteCourse(this.state.deleteId); 
  const currentCor = this.state.course;
  this.setState({
    course : currentCor.filter(cour => cour.id !== this.state.deleteId),
    isModalOpen:!this.state.isModalOpen,
    deleteId:''
  });
  NotificationManager.success('You have deleted a course!!', 'Successful!', 3000);
}

handleTe(){
  const detail = {
    teacher : this.state.selected
  }
  updateTeacher(this.state.corId,detail);
  this.setState({
      isModalChange:!this.state.isModalChange,
      selected: '',
      corId: ''
    }) 
    NotificationManager.success('You assign a teacher for course!!', 'Successful!', 3000);
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
      fetch(`${API}teacher/`,{method: "GET"})
  ])
  .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
  .then(([data1, data2]) => this.setState({
      course: data1, 
      teacher: data2,
      loading : false
  }));
}

    render(){
      const history = this.props.history;
      let options = this.state.teacher.map(function (te) {
        return { value: te.fullname, label: te.fullname, id: te.id };
      });
      return (
      this.state.loading ? this.loadingMess() :
        this.state.course.length > 0 ? 
        <div className="container">
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <table className="table table-striped table-responsive-md btn-table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Popular</th>
                    <th>Course Title</th>
                    <th>Image</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Price</th>
                    <th>Teacher</th>
                    <th></th>
                    <th></th>
                    </tr>
            </thead>
            
            <tbody>
            {this.state.course.map((cor, index) => {
                return(
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>
                      <input type="checkbox" defaultChecked={cor.popular} onChange={(e)=>this.popModal(e,cor.id)}/>
                      <Modal isOpen={this.state.isModalPop} toggle={this.popModal} backdrop="static">
                        <ModalHeader toggle={this.popModal}>Are you sure you want to do?</ModalHeader>
                        <ModalFooter>
                          <Button className="btn btn-secondary" onClick={this.popModal}>Close</Button>
                          <Button className="btn btn-success" onClick={this.handlePop}>Sure</Button>
                        </ModalFooter>
                      </Modal>
                    </td>
                    <td>{cor.coursename}</td>
                    <td><img src={cor.image ? cor.image : "/assets/images/course_1.jpg"} height="50px" width="50px" alt="" /></td>
                    <td>{cor.start_date}</td>
                    <td>{cor.end_date}</td>
                    <td>{(cor.price).concat('$')}</td>
                    <td>
                      <Select options={options} placeholder={cor.teacher ?
                      (this.state.teacher.filter(cour => cour.id === cor.teacher).map((cors) => (
                        cors.fullname ))) : "Select"} onChange={(e)=>this.changeModal(e,cor.id)} />
                      <Modal isOpen={this.state.isModalChange} toggle={this.changeModal} backdrop="static">
                        <ModalHeader toggle={this.closeChange}>Are you sure you want to Assign this Teacher?</ModalHeader>
                        <ModalFooter>
                          <Button className="btn btn-secondary" onClick={this.closeChange}>Close</Button>
                          <Button className="btn btn-info" onClick={this.handleTe}>Assign</Button>
                        </ModalFooter>
                      </Modal>
                    </td>
                    
                    <td>
                    <button className="btn btn-danger" onClick={(e)=>this.toggleModal(cor.id)}>Delete</button>
                      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} backdrop="static">
                        <ModalHeader toggle={this.toggleModal}>Are you sure you want to delete this Course?</ModalHeader>
                        <ModalFooter>
                          <Button className="btn btn-secondary" onClick={this.toggleModal}>Close</Button>
                          <Button className="btn btn-danger" onClick={this.handleDelete}>Delete</Button>
                        </ModalFooter>
                      </Modal>
                    </td>
                    <td><button className="btn btn-info" onClick={()=> history.push(`/admin/editcourse/${cor.id}`)}>Edit</button></td>
                </tr>
             );
            })}   
            </tbody>
        </table>
        <br /><br /><br /><br /><br /><br /><br />
        </div>
        : <img src="/assets/images/1.jpg" height="700px" width="500px" alt="" className="rounded mx-auto d-block"/>
    );
    }
  }
  