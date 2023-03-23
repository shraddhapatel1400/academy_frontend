import React from 'react';
import Signup from '../student/core/Signup';
import Signupt from '../teacher/core/Signup';

const SignUp = () => {

  return (

    <div className="register">
    
    <div className="container-fluid">
        <div className="row row-eq-height">
            <div className="col-lg-6 nopadding">
                
                <Signupt />

            </div>
                        
            <div className="col-lg-6 nopadding">
                
                <Signup />

            </div>
        </div>
    </div>
</div>

  );
}

export default SignUp;