import React,{Component} from 'react';
import { deleteTeacher } from '../helper/index';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { API } from '../../backend';
import { NotificationManager } from 'react-notifications';
import Loading from '../../core/Loading';

export default class Teacher extends Component {

  constructor(props){
    super(props);
    this.state = {
        teacher: [],
        isModalOpen : false,
        deleteId:'',
        searchN : '',
        searchI : '',
        searchStud : [],
        searchIns : [],
        loading : true,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearchN = this.handleSearchN.bind(this);
    this.handleSearchI = this.handleSearchI.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSearchI = this.onSearchI.bind(this);
  }
  toggleModal(e){
    this.setState({
      isModalOpen : !this.state.isModalOpen,
      deleteId : e
    })
  } 
  handleDelete() {
    deleteTeacher(this.state.deleteId);
    const currentTe = this.state.teacher;
    this.setState({
      teacher : currentTe.filter(teach => teach.id !== this.state.deleteId),
      isModalOpen:!this.state.isModalOpen,
      deleteId:''
    });
    NotificationManager.success('You have deleted a Teacher!', 'Successful!', 3000);
  }
  handleSearchN(e){
    this.setState({searchN : e.target.value,searchStud:[]})
    console.log(e.target.value)
  }
  handleSearchI(e){
    this.setState({searchI : e.target.value,searchIns:[]})
    console.log(e.target.value)
  }
  onSearch(){
    const st = this.state.teacher.map(s=>s.fullname)
    const startsWithN = st.filter((s) => s.toLowerCase().startsWith(this.state.searchN.toLowerCase()));
    this.setState({ searchStud : startsWithN, searchN : ''})
    console.log(startsWithN)
  }
  onSearchI(){
    const ins = this.state.teacher.map(s=>s.institute)
    const startsWithI = ins.filter((s) => s.toLowerCase().startsWith(this.state.searchI.toLowerCase()));
    this.setState({ searchIns : startsWithI, searchI : ''})
    console.log(startsWithI)
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
        fetch(`${API}teacher/`,{method: "GET"}),
    ])
    .then(([res1]) => Promise.all([res1.json()]))
    .then(([data1]) => this.setState({
        teacher: data1,
        loading : false,
    }));
  }
  render(){
    return (
      this.state.loading ? this.loadingMess() :
      this.state.teacher.length > 0 ? 
        <div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div className="row">
              <div className="col-sm-5"><input type="text" className="form-control col-md-12" placeholder="Search Teacher by name.." name="search" onChange={(e)=>this.handleSearchN(e)} /></div>
              <button type="submit" className="btn btn-info col-md-1" onClick={()=>this.onSearch()}><i class="fa fa-search"></i></button>
              <div className="col-sm-5"><input type="text" className="form-control col-md-12" placeholder="Search Teacher by institute.." name="search" onChange={(e)=>this.handleSearchI(e)} /></div>
              <button type="submit" className="btn btn-info col-md-1" onClick={()=>this.onSearchI()}><i class="fa fa-search"></i></button>
            </div>
            <br />
        <table className="table table-striped table-responsive-md btn-table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Contact</th>
                    <th>Institute Name</th>
                    <th>Purpose</th>
                    <th></th>
                </tr>
            </thead>

            <tbody> <tr><td colSpan="8" className="text-center" style={{color:"blue"}}><h5>By Name</h5></td></tr>
             {this.state.searchStud.map((st, ind) => (
                <tr className="text-center">
                  <th scope="row">{ind+1}</th>
                  <td>{st}</td>
                  <td>{this.state.teacher.filter(s=>s.fullname === st).map(s=>s.email)}</td>
                  <td>{this.state.teacher.filter(s=>s.fullname === st).map(s=>s.phone)}</td>
                  <td>{this.state.teacher.filter(s=>s.fullname === st).map(s=>s.institute)}</td>
                  <td>{this.state.teacher.filter(s=>s.fullname === st).map(s=>s.purpose)}</td>
                  <td>
                    <button className="btn btn-danger" onClick={(e)=>this.toggleModal(this.state.teacher.filter(s=>s.fullname === st).map(s=>s.id))}>Delete</button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} backdrop="static">
                      <ModalHeader toggle={this.toggleModal}>Are you sure you want to delete this Student?</ModalHeader>
                      <ModalFooter>
                        <Button className="btn btn-secondary" onClick={this.toggleModal}>Close</Button>
                        <Button className="btn btn-danger" onClick={this.handleDelete}>Delete</Button>
                      </ModalFooter>
                    </Modal>
                  </td>
                </tr>
              ))}<br /> <tr><td colSpan="8" className="text-center" style={{color:"blue"}}><h5>By Institute</h5></td></tr>
            {this.state.searchIns.map((st, ind) => (
                <tr className="text-center">
                  <th scope="row">{ind+1}</th>
                  <td>{this.state.teacher.filter(s=>s.institute === st).map(s=>s.fullname)[ind]}</td>
                  <td>{this.state.teacher.filter(s=>s.institute === st).map(s=>s.email)[ind]}</td>
                  <td>{this.state.teacher.filter(s=>s.institute === st).map(s=>s.phone)[ind]}</td>
                  <td>{st}</td>
                  <td>{this.state.teacher.filter(s=>s.institute === st).map(s=>s.purpose)[ind]}</td>
                  <td>
                    <button className="btn btn-danger" onClick={(e)=>this.toggleModal(this.state.teacher.filter(s=>s.institute === st).map(s=>s.id)[ind])}>Delete</button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} backdrop="static">
                      <ModalHeader toggle={this.toggleModal}>Are you sure you want to delete this Student?</ModalHeader>
                      <ModalFooter>
                        <Button className="btn btn-secondary" onClick={this.toggleModal}>Close</Button>
                        <Button className="btn btn-danger" onClick={this.handleDelete}>Delete</Button>
                      </ModalFooter>
                    </Modal>
                  </td>
                </tr>
              ))}<br /> <tr><td colSpan="8" className="text-center" style={{color:"green"}}><h5>All Teacher</h5></td></tr>
              {this.state.teacher.map((te, index) => {
                return(
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{te.fullname}</td>
                    <td>{te.email}</td>
                    <td>{te.password}</td>
                    <td>{te.phone}</td>
                    <td>{te.institute}</td>
                    <td>{te.purpose}</td>
                    <td>
                    <button className="btn btn-danger" onClick={(e)=>this.toggleModal(te.id)}>Delete</button>
                      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} backdrop="static">
                        <ModalHeader toggle={this.toggleModal}>Are you sure you want to delete this Teacher?</ModalHeader>
                        <ModalFooter>
                          <Button className="btn btn-secondary" onClick={this.toggleModal}>Close</Button>
                          <Button className="btn btn-danger" onClick={this.handleDelete}>Delete</Button>
                        </ModalFooter>
                      </Modal>
                    </td>
                </tr>
             );
            })  }
            </tbody>
        </table>
        </div>
        : <img src="/assets/images/1.jpg" height="700px" width="500px" alt="" className="rounded mx-auto d-block"/>
    );
  }
}