import React,{ useState, useEffect } from 'react';
import { addCourse } from '../helper';
import Select from 'react-select';  
import { API } from '../../backend';
import { useHistory } from 'react-router-dom';
import Alert from 'react-s-alert';
import { NotificationManager } from 'react-notifications';
import { toast } from 'react-toastify';
import Loading from '../../core/Loading';

const AddCourse = () => {
      const [teachers, setTe] = useState([]);
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
      const fileInput = React.createRef();
      useEffect(() => {
        Promise.all([
            fetch(`${API}teacher/`,{method: "GET"})
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => (
            setTe(data1),
            setLoad(false)
        ))
    });
    const loadingMess = () => {
      return(
          load && (
              <Loading />
          )
      );
    }
    const history = useHistory();
    let options = teachers.map(function (te) {
      return { value: te.fullname, label: te.fullname, id: te.id };
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
          addCourse({ coursename,description,image,price,popular,teacher,start_date,end_date })
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
            <div className="container" style={{height:"1000px"}} >
            <div className="register">
            <div className="card bg-light">
              <article className="card-body mx-auto" style={{width: "500px"}}>
                  <br /><br /><br /><br /><br /><br />
                  <h4 className="card-title mt-3 text-center">Add Course</h4>  
                              <form encType="multipart/form-data">
                                  <div className="form-group input-group">
                                    <input type="text" className="form-control" placeholder="Course Name" value={coursename} onChange={handleChange("coursename")}/>
                                    <span className="text-danger">{error[0]}</span>
                                  </div> 
                                  <div className="form-group input-group">
                                      <textarea className="form-control" placeholder="Course Description" type="text" value={description} onChange={handleChange("description")} />
                                      <span className="text-danger">{error[1]}</span>
                                  </div>
                                  <div className="form-group input-group"> Image : &nbsp;
                                    {/* <ImageUploader
                                      withPreview={true}
                                      withIcon={false}
                                      value={image}
                                      onChange={onDrop}
                                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                      maxFileSize={5242880}
                                    /> */}
                                    <input type="file" accept="image/png, image/jpeg" onChange={e => onChangePicture(e)}/>
                                    <span className="text-danger">{error[6] ? "This field is required" : ""}</span>
                                  </div> 
                                  <div className="form-group input-group">
                                    <input type="number" className="form-control" min="0" placeholder="Course Price($)" onChange={handleChange("price")}/>
                                    <span className="text-danger">{error[2]}</span>
                                  </div> 
                                  <div className="form-group input-group"> Popular : &nbsp;
                                    <input type="checkbox" className="form-control" value={popular} onChange={e=>handlePop(e)} />
                                  </div> 
                                  <div className="form-group"> Assign Teacher : &nbsp;
                                    <Select options={options} onChange={e=>handleTe(e)} placeholder="Select Teacher..."
                                    styles={{
                                      menu: provided => ({ ...provided, zIndex: 9999 })
                                    }} />
                                    <span className="text-danger">{error[5]}</span>
                                  </div>
                                  <div className="form-group input-group"> Start Date : &nbsp;
                                    <input type="date" className="form-control" min="03-09-2020" onChange={e=>handlestDate(e)} /> 
                                    <span className="text-danger">{error[3]}</span>
                                  </div>  
                                  <div className="form-group input-group"> End Date : &nbsp;
                                    <input type="date" className="form-control" max="2020-12-31" onChange={e=>handlendDate(e)} />
                                    <span className="text-danger">{error[4]}</span>
                                  </div>  
                                                                        
                                  <div className="form-group">
                                      <button className="btn btn-primary btn-block" onClick={onSubmit}>Submit</button>
                                  </div>      
                              </form>                                                             
                </article>
              </div> 
            </div> 
            </div>       
      
          )
      }
  
    return (
      load ? loadingMess() :           
      signupForm()
    );
  }
  
  export default AddCourse;