import React,{ useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticatedS } from '../helper/index';
import Loading from '../../core/Loading';

const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        success: false,
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = values;

    const handleChange = (name) =>
    (event) => {
      setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({email, password})
        .then(data => {
            console.log("DATA", data)
            if (data.token) {
                //let sessionToken = data.token;
                authenticate(data, () => {
                    console.log("TOKEN ADDED");
                    setValues({
                        ...values,
                        didRedirect: true,
                        error: false,
                    });
                    
                });
            } else {
                setValues({
                    ...values,
                    loading: false,
                    error: data.error,
                });
            }
        })
        .catch(e=>console.log(e))
    }

    const performRedirect = () => {
        if (isAuthenticatedS()) {
          return (<Redirect to="/student" />)
        }
    };

    const LoadingMess = () => {
        return(
            loading && (
                <Loading />
            )
        );
    }
    
    const errorMessage = () => {
        return(
            
                    <div className="alert" style={{ display: error ? "" : "none" }}>
                        {/* <span className="closebtn" onclick={!error}>&times;</span> */} 
                        <strong>Opps!</strong> {error}
                    </div>
        )
    }

    const signinForm = () => {
        return(
            <div className="search_section d-flex flex-column align-items-center justify-content-center">
                <div class="search_background" style={{ backgroundImage:"url(/assets/images/search_background.jpg)" }}></div>
                <div className="search_content text-center">
                    <br/><br/><br/><br/><br/><br/><br/>
                    <h1>Student Login</h1>
                        {errorMessage()}
                        <form id="search_form" className="search_form">
                            <div className="form-group">
                                <input type="email"
                                className="input_field search_form_name" placeholder="Email"
                                value={email} onChange={handleChange("email")} />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                className="input_field search_form_name" placeholder="Password"
                                value={password} onChange={handleChange("password")} />
                            </div>
                            <button className="btn btn-warning btn-block" onClick={onSubmit}>Submit</button>
                            <br />
                        </form>
                </div>
            </div>
        )
    }


  return (
      loading ? LoadingMess() :
    <div style={{height:"750px"}}>
        {signinForm()}
        {performRedirect(didRedirect)}
    </div>
  );
}

export default Signin;