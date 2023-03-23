import React from 'react';
import Signin from '../student/core/SignIn';
import Signint from '../teacher/core/SignIn';

const SignIn = () => {

  return (

    <div className="register">
    
    <div className="container-fluid">
        <div className="row row-eq-height">
            <div className="col-lg-6 nopadding">
                
                <Signint />

            </div>
                        
            <div className="col-lg-6 nopadding">
                
                <Signin />

            </div>
        </div>
    </div>
</div>

  );
}

export default SignIn;