import React from "react";
import { Route, withRouter } from "react-router-dom";

import Home from './Home';
import SignUp from "../account/SignUp";
import Signin from "../account/SignIn";
import Login from "../account/LogIn";
import Course from '../course/Home';
import Contact from "./Contact";
import About from "./About";

import AHome from '../admin/core/Home';
import AStudent from "../admin/core/Student";
import ACourse from "../admin/core/Course";
import AddCourse from "../admin/core/AddCourse";
import EditCourse from "../admin/core/EditCourse";
import ATeacher from '../admin/core/Teacher';
import AEnroll from '../admin/core/Enrollment';
import AProfile from '../admin/core/Profile';
import AEprofile from '../admin/core/EditProfile';

import THome from '../teacher/core/Home';
import TCourse from '../teacher/core/Course';
import TStudent from '../teacher/core/Student';
import TProfile from "../teacher/core/Profile";
import TEProfile from "../teacher/core/EditProfile";
import TAddLec from "../teacher/core/Lecture";
import TLec from "../teacher/core/VideoLec";

import SHome from '../student/core/Home';
import SCourse from '../student/core/Course';
import SEnroll from '../student/core/Enrollment';
import SDashboard from '../student/core/Dashboard';
import SProfile from '../student/core/Profile';
import SEProfile from '../student/core/EProfile';
import SLecture from '../student/core/Lecture';

import PrivateRoutes from "../student/helper/PrivateRoutes";
import StudentDashboard from "../student/core/Enrollment";

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Main = () => {
  return (
    <div className="super_container">
          {/* <SemipolarLoading/> http://139.196.82.33:8080/iframe.html?id=demo--demo */}
                <Route exact path="/" component={Home} />
                <Route exact path="/course" component={Course}/>
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/about" component={About} />

                <Route exact path="/admin" component={AHome} />
                <Route exact path="/admin/student" component={AStudent} />
                <Route exact path="/admin/course" component={ACourse} />
                <Route exact path="/admin/addcourse" component={AddCourse} />
                <Route exact path="/admin/editcourse/:id" component={EditCourse} />
                <Route exact path="/admin/teacher" component={ATeacher} />
                <Route exact path="/admin/enrollment" component={AEnroll} />
                <Route exact path="/admin/profile" component={AProfile} />
                <Route exact path="/admin/eprofile" component={AEprofile} />

                <Route exact path="/student" component={SHome}/>
                <Route exact path="/student/course" component={SCourse}/>
                <Route exact path="/student/dashboard/:id" component={SEnroll} /> 
                <Route exact path="/student/lecture/:id" component={SLecture} /> 
                <Route exact path='/student/enrollment' component={SDashboard} /> 
                <Route exact path="/student/profile" component={SProfile} />
                <Route exact path="/student/eprofile" component={SEProfile} />

                <Route exact path="/teacher" component={THome} />
                <Route exact path="/teacher/course" component={TCourse}/>
                <Route exact path="/teacher/student" component={TStudent}/>
                <Route exact path="/teacher/profile" component={TProfile}/>
                <Route exact path="/teacher/eprofile" component={TEProfile}/>
                <Route exact path="/teacher/addlec/:id" component={TAddLec}/>
                <Route exact path="/teacher/video/:id" component={TLec}/>

                <PrivateRoutes path="/student/dashboard" exact component={StudentDashboard} />

              <Alert stack={{limit: 3}} />
              <NotificationContainer />
              <ToastContainer />
    </div>
  );
};

export default withRouter(Main);
