import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helper';
import { toast } from 'react-toastify';
import BeatLoader from "react-spinners/BeatLoader";
import Loading from '../../core/Loading';

const Signup = () => {

    const [values, setValues] = useState({
        fullname: "",
        email: "",
        password: "",
        error: "",
        success: false,
        loading: false,
    });
    
    const { fullname, email, password, error, success,loading } = values;
    
    const handleChange = (name) =>
    (event) => {
      setValues({ ...values, error: false, [name]: event.target.value });
    };
    
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signup({ fullname, email, password })
        .then((data) => {
            console.log("DATA", data);
            if (data.email === email) {
              setValues({
                ...values,
                fullname: "",
                email: "",
                password: "",
                error: "",
                success: true,
                loading: false,
              });
              toast.success("You are registered now!!! Please login..", {
                position: toast.POSITION.TOP_RIGHT
              });
            } else {
              setValues({
                ...values,
                error: [data.fullname,data.email,data.password],
                success: false,
                loading: false,
              });
            }
        })
        .catch((e) => console.log(e));
      };
    
    const LoadingMess = () => {
        return(
            loading && (
              <Loading />
            )
        );
    }
    
    const successMessage = () => {
        return(
                    <div 
                        className="alert success"
                        style={{ display: success ? "" : "none" }} >
                        New Account created successfully!!! Please <strong><Link to="/signin">Login</Link></strong> now.
                    </div>
        )
    }

    
    const signupForm = () => {
        return(
            <div className="search_section d-flex flex-column align-items-center justify-content-center">
                <div class="search_background" style={{ backgroundImage:"url(/assets/images/search_background.jpg)" }}></div>
                    <div className="search_content text-center">
                        <h1>Student Registration</h1>
                        {successMessage()}
                        <form id="search_form" className="search_form">
                            <div className="form-group">
                                <input type="text"
                                    className="input_field search_form_name" placeholder="Full Name"
                                value={fullname} onChange={handleChange("fullname")} />
                                <span className="text-danger">{error[0]}</span>
                            </div>
                            <div className="form-group">
                                <input type="email"
                                className="input_field search_form_name" placeholder="Email"
                                value={email} onChange={handleChange("email")} />
                                <span className="text-danger">{error[1]}</span>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                className="input_field search_form_name" placeholder="Password"
                                value={password} onChange={handleChange("password")} />
                                <span className="text-danger">{error[2]}</span>
                            </div>
                            <button className="btn btn-warning btn-block" onClick={onSubmit}>Submit</button>
                        </form>
                    </div> 
            </div>
                        
    
        )
    }

  return (  
    loading ? LoadingMess() :         
    <div style={{height:"750px"}}>{signupForm()}</div>  
  );
}

export default Signup;