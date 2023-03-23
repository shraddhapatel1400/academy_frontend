import React,{ Component } from 'react';
import { updateCourse } from '../helper';
import Select from 'react-select';  
import { API } from '../../backend';
import { useHistory, useParams } from 'react-router-dom';
import Alert from 'react-s-alert';
import { NotificationManager } from 'react-notifications';
import { toast } from 'react-toastify';
import Loading from '../../core/Loading';

export default class EditCourse extends Component {
  constructor(props){
    super(props);
    this.state = {
        teachers : [],
        courses : [],
        values : {},
        error: "",
        success: false,
        loading: true
    };
  }

handleSubmit(id){
  console.log(id)
  updateCourse(id,this.state.values)
}

handleChange(name,e){
  var values = Object.assign({}, this.state.values);
  values[name] = e.target.value;
  this.setState({
      values : values
  });
}
onChangePicture(e){
  var values = Object.assign({}, this.state.values);
  values["image"] = e.target.files[0];
  this.setState({
      values : values
  });
}
handlePop(e){
  const p = e.target.checked ? "true" : "false" 
  var values = Object.assign({}, this.state.values);
  values["popular"] = p;
  this.setState({
      values : values
  });
}
handleTe(e) {
  var values = Object.assign({}, this.state.values);
  values["teacher"] = e.id;
  this.setState({
      values : values
  });
}
handlestDate(e){
var values = Object.assign({}, this.state.values);
  values["start_date"] = e.target.value;
  this.setState({
      values : values
  });
}
handlendDate(e){
  var values = Object.assign({}, this.state.values);
  values["end_date"] = e.target.value;
  this.setState({
      values : values
  });
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
    fetch(`${API}course/`,{method: "GET"}),
  ])
  .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
  .then(([data1, data2]) => this.setState({
      teachers: data1,
      courses : data2,
      loading : false
  }));
}
  render(){
    let Id = this.props.match.params.id;
    let options = this.state.teachers.map(function (te) {
      return { value: te.fullname, label: te.fullname, id: te.id };
    });
  return (
  this.state.loading ? this.loadingMess() : 
      this.state.courses.filter(c=>c.id==Id).map((cor)=>{
        return(
      <div className="register">
      <div className="card bg-light">
        <article className="card-body mx-auto" style={{width: "500px"}}>
            <br /><br /><br /><br /><br /><br />
            <h4 className="card-title mt-3 text-center">Edit Course</h4> 
                        <form encType="multipart/form-data">
                            <div className="form-group input-group">
                              <input type="text" className="form-control" defaultValue={cor.coursename} onChange={this.handleChange.bind(this,"coursename")}/>
                              <span className="text-danger"></span>
                            </div> 
                            <div className="form-group input-group">
                                <textarea className="form-control" placeholder="Course Description" type="text" defaultValue={cor.description} onChange={this.handleChange.bind(this,"description")} />
                                <span className="text-danger"></span>
                            </div>
                            <div className="form-group input-group"> Image : &nbsp;
                              <input type="file" accept="image/png, image/jpeg" onChange={(e)=>this.onChangePicture.bind(e)} /><span>{cor.image}</span>
                              <span className="text-danger"></span>
                            </div> 
                            <div className="form-group input-group">
                              <input type="number" className="form-control" min="0" placeholder="Course Price($)" onChange={this.handleChange.bind(this,"price")} defaultValue={cor.price}/>
                              <span className="text-danger"></span>
                            </div> 
                            <div className="form-group input-group"> Popular : &nbsp;
                              <input type="checkbox" className="form-control" onChange={e=>this.handlePop(e)} defaultChecked={cor.popular} />
                            </div> 
                            <div className="form-group"> Assign Teacher : &nbsp;
                              <Select options={options} onChange={e=>this.handleTe(e)} placeholder={cor.teacher ?
                                  (this.state.teachers.filter(cour => cour.id == cor.teacher).map((cors) => (cors.fullname ))) : "Select"}
                                  styles={{
                                    menu: provided => ({ ...provided, zIndex: 9999 })
                                }} />
                              <span className="text-danger"></span>
                            </div>
                            <div className="form-group input-group"> Start Date : &nbsp;
                              <input type="date" className="form-control" min="03-09-2020" onChange={e=>this.handlestDate(e)} defaultValue={cor.start_date} /><span>{cor.start_date}</span>
                              <span className="text-danger"></span>
                            </div>  
                            <div className="form-group input-group"> End Date : &nbsp;
                              <input type="date" className="form-control" max="2020-12-31" onChange={e=>this.handlendDate(e)} defaultValue={cor.end_date} /><span>{cor.end_date}</span>
                              <span className="text-danger"></span>
                            </div>  
                                                                  
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" onClick={this.handleSubmit.bind(this,Id)}>Submit</button>
                            </div>      
                        </form>                                                                                          
          </article>
        </div> 
      </div> 
        );              
    })
  );
}
}
/* 
import React,{ useState, useEffect } from 'react';
import { updateCourse } from '../helper';
import Select from 'react-select';  
import { API } from '../../backend';
import { useHistory, useParams } from 'react-router-dom';
import Alert from 'react-s-alert';
import { NotificationManager } from 'react-notifications';
import { toast } from 'react-toastify';
import Loading from '../../core/Loading';

const EditCourse = () => {
      const [teachers, setTe] = useState([]);
      const [courses, setCourse] = useState([]);
      const [load, setLoad] = useState(true);
      const [values, setValues] = useState({
          coursename: "",
          description: "",
          image : [],
          price : '',
          popular : '',
          teacher : '',
          start_date:'',
          end_date : '',
          error: "",
          success: false,
          loading: false,
      });
      const loadingMess = () => {
        return(
            load && (
                <Loading />
            )
        );
      }
      useEffect(() => {
        Promise.all([
            fetch(`${API}teacher/`,{method: "GET"}),
            fetch(`${API}course/`,{method: "GET"}),
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => (
            setTe(data1),
            setCourse(data2),
            setLoad(false)
        ))
    });
    const { id } = useParams();
    const history = useHistory();
    let options = teachers.map(function (te) {
      return { value: te.fullname, label: te.fullname, id: te.id };
    });
    let cor = courses.filter(c=>c.id===id).map(function (c) {
      return c;
    });
      const { coursename, description,image,price,popular,teacher,start_date,end_date, error, success,loading } = values;
      const handleChange = (name) =>
      (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
      const onChangePicture = e => {
        setValues({ ...values ,error: false,image : e.target.files[0]});
    };
      const handleTe = e => {
        setValues({...values,error: false,teacher : e.id})
      }
      const handlestDate = e => {
        setValues({...values,error: false, start_date : e.target.value})
      }
      const handlendDate = e => {
        setValues({...values,error: false, end_date : e.target.value})
      }
      const handlePop = e => {
        const p = e.target.checked ? "true" : "false" 
        setValues({ ...values, error: false, popular:p});
      }; 
      
      const onSubmit = (event) => {
          event.preventDefault();
          setValues({ ...values, error: false, loading: true });
          updateCourse({ id, coursename,description,image,price,popular,teacher,start_date,end_date })
          .then((data) => {
              console.log("DATA", data);
              if (data.coursename === coursename) {
                setValues({
                  ...values,
                  coursename: "",
                  description: "",
                  image: [],
                  price : '',
                  popular : '',
                  teacher : '',
                  start_date:'',
                  end_date : '',
                  error: "",
                  success: true,
                  loading: false,
                });
                history.push("/admin/course");
                toast.success("You have Added Course!!!", {
                  position: toast.POSITION.TOP_RIGHT
                });
              } else {
                setValues({
                  ...values,
                  error: [data.coursename,data.description,data.price,data.start_date,data.end_date,data.teacher,data.image],
                  success: false,
                  loading: false,
                });
                Alert.error('Please fix this all errors!!!', {
                  position: 'bottom-left',
                  effect: 'slide',
                  beep: 'http://s-alert-demo.meteorapp.com/beep.mp3'
                });
              }
          })
          .catch((e) => {
            NotificationManager.error('Error while Creating new course!', 'Error!')
          }); 
        };

      const signupForm = () => {
        
          return(
            courses.filter(c=>c.id == id).map((cor)=>{
              return(
            <div className="register">
            <div className="card bg-light">
              <article className="card-body mx-auto" style={{width: "500px"}}>
                  <br /><br /><br /><br /><br /><br />
                  <h4 className="card-title mt-3 text-center">Edit Course</h4> 
                              <form encType="multipart/form-data">
                                  <div className="form-group input-group">
                                    <input type="text" className="form-control" defaultValue={cor.coursename} onChange={handleChange("coursename")}/>
                                    <span className="text-danger">{error[0]}</span>
                                  </div> 
                                  <div className="form-group input-group">
                                      <textarea className="form-control" placeholder="Course Description" type="text" defaultValue={cor.description} onChange={handleChange("description")} />
                                      <span className="text-danger">{error[1]}</span>
                                  </div>
                                  <div className="form-group input-group"> Image : &nbsp;
                                    <input type="file" accept="image/png, image/jpeg" onChange={e => onChangePicture(e)} /><span>{cor.image}</span>
                                    <span className="text-danger">{error[6] ? "This field is required" : ""}</span>
                                  </div> 
                                  <div className="form-group input-group">
                                    <input type="number" className="form-control" min="0" placeholder="Course Price($)" onChange={handleChange("price")} defaultValue={cor.price}/>
                                    <span className="text-danger">{error[2]}</span>
                                  </div> 
                                  <div className="form-group input-group"> Popular : &nbsp;
                                    <input type="checkbox" className="form-control" value={popular} onChange={e=>handlePop(e)} defaultChecked={cor.popular} />
                                  </div> 
                                  <div className="form-group"> Assign Teacher : &nbsp;
                                    <Select options={options} onChange={e=>handleTe(e)} placeholder={cor.teacher ?
                                        (teachers.filter(cour => cour.id == cor.teacher).map((cors) => (cors.fullname ))) : "Select"}
                                        styles={{
                                          menu: provided => ({ ...provided, zIndex: 9999 })
                                      }} />
                                    <span className="text-danger">{error[5]}</span>
                                  </div>
                                  <div className="form-group input-group"> Start Date : &nbsp;
                                    <input type="date" className="form-control" min="03-09-2020" onChange={e=>handlestDate(e)} defaultValue={cor.start_date} /> 
                                    <span className="text-danger">{error[3]}</span>
                                  </div>  
                                  <div className="form-group input-group"> End Date : &nbsp;
                                    <input type="date" className="form-control" max="2020-12-31" onChange={e=>handlendDate(e)} defaultValue={cor.end_date} />
                                    <span className="text-danger">{error[4]}</span>
                                  </div>  
                                                                        
                                  <div className="form-group">
                                      <button className="btn btn-primary btn-block" onClick={onSubmit}>Submit</button>
                                  </div>      
                              </form>                                                                                          
                </article>
              </div> 
            </div> 
              );              
          })
          );
      }
  
    return (      
      load ? loadingMess() :       
      signupForm()
    );
  }
   */