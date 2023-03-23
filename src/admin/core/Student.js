import React,{Component} from 'react';
import { deleteStudent } from '../helper/index';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { API } from '../../backend';
import { NotificationManager } from 'react-notifications';
import Loading from '../../core/Loading';

export default class Student extends Component {

  constructor(props){
    super(props);
    this.state = {
        student: [],
        isModalOpen : false,
        deleteId:'',
        search : '',
        searchStud : [],
        loading : true,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  toggleModal(e){
    this.setState({
      isModalOpen : !this.state.isModalOpen,
      deleteId : e
    })
  } 
  handleDelete() {
    deleteStudent(this.state.deleteId);
    const currentStd = this.state.student;
    this.setState({
      student : currentStd.filter(stud => stud.id !== this.state.deleteId),
      isModalOpen:!this.state.isModalOpen,
      deleteId:''
    });
    NotificationManager.success('You have deleted a student!!!', 'Successful!', 3000);
  }
  handleSearch(e){
    this.setState({search : e.target.value,searchStud:[]})
    console.log(e.target.value)
  }
  onSearch(){
    const st = this.state.student.map(s=>s.fullname)
    const startsWith = st.filter((s) => s.toLowerCase().startsWith(this.state.search.toLowerCase()));
    this.setState({ searchStud : startsWith, search : ''})
    console.log(startsWith)
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
      fetch(`${API}student/`,{method: "GET"}),
  ])
  .then(([res1]) => Promise.all([res1.json()]))
  .then(([data1]) => this.setState({
      student: data1,
      loading : false
  }));
}
    render(){
    return (
      this.state.loading ? this.loadingMess() :
      this.state.student.length > 0 ? 
        <div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div className="row">
              <div className="col-sm-11"><input type="text" className="form-control col-md-12" placeholder="Search Student..." name="search" onChange={(e)=>this.handleSearch(e)} /></div>
              <button type="submit" className="btn btn-info col-md-1" onClick={()=>this.onSearch()}><i class="fa fa-search"></i></button>
            </div>
            <br />
        <table className="table table-striped table-responsive-md btn-table">
            <thead>
                <tr className="text-center">
                    <th>No.</th>
                    <th>Full Name</th>
                    <th>Image</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Contact</th>
                    <th></th>
                    </tr>
            </thead>
            <tbody><tr><td colSpan="8" className="text-center" style={{color:"blue"}}><h5>By Name</h5></td></tr>
            {this.state.searchStud.map((st, ind) => (
                <tr className="text-center">
                    <th scope="row">{ind+1}</th>
                    <td>{st}</td>
                    <td>{st.image ? <img src={st.image} height="50px" width="50px" alt=""/> : <img src="https://bootdey.com/img/Content/avatar/avatar7.png" height="50px" width="50px" alt="" />}</td>
                    <td>{this.state.student.filter(s=>s.fullname === st).map(s=>s.email)}</td>
                    <td>{this.state.student.filter(s=>s.fullname === st).map(s=>s.phone ? s.phone : "-")}</td>
                    <td>
                      <button className="btn btn-danger" onClick={(e)=>this.toggleModal(this.state.student.filter(s=>s.fullname === st).map(s=>s.id))}>Delete</button>
                      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} backdrop="static">
                        <ModalHeader toggle={this.toggleModal}>Are you sure you want to delete this Student?</ModalHeader>
                        <ModalFooter>
                          <Button className="btn btn-secondary" onClick={this.toggleModal}>Close</Button>
                          <Button className="btn btn-danger" onClick={this.handleDelete}>Delete</Button>
                        </ModalFooter>
                      </Modal>
                    </td>
                </tr>
              ))}<br/>
            <tr><td colSpan="8" className="text-center" style={{color:"green"}}><h5>All Student</h5></td></tr>
            {this.state.student.map((std, index) => {
                return(
                <tr className="text-center">
                    <th scope="row">{index+1}</th>
                    <td>{std.fullname}</td>
                    <td>{std.image ? <img src={std.image} height="50px" width="50px" alt=""/> : <img src="https://bootdey.com/img/Content/avatar/avatar7.png" height="50px" width="50px" alt="" />}</td>
                    <td>{std.email}</td>
                    <td>{std.password}</td>
                    <td>{std.phone ? std.phone : "-"}</td>
                    <td>
                      <button className="btn btn-danger" onClick={(e)=>this.toggleModal(std.id)}>Delete</button>
                      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} backdrop="static">
                        <ModalHeader toggle={this.toggleModal}>Are you sure you want to delete this Student?</ModalHeader>
                        <ModalFooter>
                          <Button className="btn btn-secondary" onClick={this.toggleModal}>Close</Button>
                          <Button className="btn btn-danger" onClick={this.handleDelete}>Delete</Button>
                        </ModalFooter>
                      </Modal>
                    </td>
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
  