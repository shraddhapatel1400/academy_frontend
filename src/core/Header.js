import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout, loginname } from '../account/helper';
import { isAuthenticatedS, signouts, loginnames } from '../student/helper';
import { isAuthenticatedT, signoutt, loginnamet } from '../teacher/helper';
import { NavDropdown } from 'react-bootstrap';

const currentTab = (history,path) => {
  if (history.location.pathname === path){
      return {color: "#2ecc72"}
  } else {
      return {color: ""}
  }
}
const Header = ({history}) => {
    return (
      <div>
      <header className="header d-flex flex-row">
            <div className="header_content d-flex flex-row align-items-center">

                <div className="logo_container">
                    <div className="logo">
                        <img src="/assets/images/logo.png" alt="" />
                        <span>Academy</span>
                    </div>
                </div>
    
                
                <nav className="main_nav_container">
                    <div className="main_nav">
                        <ul className="main_nav_list">
                          {!isAuthenticated() && !isAuthenticatedS() && !isAuthenticatedT() && (
                            <Fragment>
                              <li className="main_nav_item"><Link style={currentTab(history, "/")} to="/">Home</Link></li>
                              <li className="main_nav_item"><Link style={currentTab(history, "/about")} to="/about">About</Link></li>
                              <li className="main_nav_item"><Link style={currentTab(history, "/course")} to="/course">Course</Link></li>
                              <li className="main_nav_item"><Link style={currentTab(history, "/contact")} to="/contact">Contact</Link></li>
                              <li className="main_nav_item"><Link style={currentTab(history, "/signup")} to="/signup">Sign Up</Link></li>
                              <NavDropdown title={<strong className="text-warning">Login</strong>} className="main_nav_item">
                                <NavDropdown.Item><Link style={currentTab(history, "/signin")} to="/signin">Student / Teacher</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link style={currentTab(history, "/login")} to="/login">Admin</Link></NavDropdown.Item>
                              </NavDropdown>
                            </Fragment>
                          )}

                            {isAuthenticated() && (
                              <Fragment>
                                <li className="main_nav_item"><Link style={currentTab(history, "/admin")} to="/admin">Home</Link></li>
                                <li className="main_nav_item"><Link style={currentTab(history, "/admin/student")} to="/admin/student">Student</Link></li>
                                <li className="main_nav_item"><Link style={currentTab(history, "/admin/teacher")} to="/admin/teacher">Teacher</Link></li>
                                <li className="main_nav_item"><Link style={currentTab(history, "/admin/enrollment")} to="/admin/enrollment">Enrolled Student</Link></li>
                                <NavDropdown title={<strong className="text-warning">Course</strong>} className="main_nav_item">
                                  <NavDropdown.Item><Link style={currentTab(history, "/admin/course")} to="/admin/course">View Course</Link></NavDropdown.Item>
                                  <NavDropdown.Item><Link style={currentTab(history, "/admin/addcourse")} to="/admin/addcourse">Add Course</Link></NavDropdown.Item>
                                </NavDropdown>
                                <li className="main_nav_item">
                                    <span className="nav-link" onClick={() => {signout(() => {history.push("/")})}}><strong>Logout</strong></span> 
                                </li>
                                <NavDropdown title={<strong className="text-primary">Welcome {loginname()}</strong>} className="main_nav_item">
                                  <NavDropdown.Item><Link style={currentTab(history, "/admin/profile")} to="/admin/profile">View Profile</Link></NavDropdown.Item>
                                  <NavDropdown.Item><Link style={currentTab(history, "/admin/eprofile")} to="/admin/eprofile">Edit Profile</Link></NavDropdown.Item>
                                </NavDropdown>
                              </Fragment>
                            )}
                            {isAuthenticatedS() && (
                              <Fragment>
                                <li className="main_nav_item"><Link style={currentTab(history, "/student")} to="/student">Home</Link></li>
                                <li className="main_nav_item"><Link style={currentTab(history, "/student/course")} to="/student/course">Explore</Link></li>
                                <li className="main_nav_item"><Link style={currentTab(history, "/student/enrollment")} to="/student/enrollment">My Enrollment</Link></li>
                                <li className="main_nav_item">
                                    <span className="nav-link" onClick={() => {signouts(() => {history.push("/")})}}><strong>Logout</strong></span> 
                                </li>
                                <NavDropdown title={<strong className="text-primary">Welcome {loginnames()}</strong>} className="main_nav_item">
                                  <NavDropdown.Item><Link style={currentTab(history, "/student/profile")} to="/student/profile">View Profile</Link></NavDropdown.Item>
                                  <NavDropdown.Item><Link style={currentTab(history, "/student/eprofile")} to="/student/eprofile">Edit Profile</Link></NavDropdown.Item>
                                </NavDropdown>
                              </Fragment>
                            )}
                            {isAuthenticatedT() && (
                              <Fragment>
                                <li className="main_nav_item"><Link style={currentTab(history, "/teacher")} to="/teacher">Home</Link></li>
                                <li className="main_nav_item"><Link style={currentTab(history, "/teacher/course")} to="/teacher/course">Course</Link></li>
                                <li className="main_nav_item"><Link style={currentTab(history, "/teacher/student")} to="/teacher/student">Enrolled Student</Link></li>
                                <li className="main_nav_item">
                                    <span className="nav-link" onClick={() => {signoutt(() => {history.push("/")})}}><strong>Logout</strong></span> 
                                </li>
                                <NavDropdown title={<strong className="text-primary">Welcome {loginnamet()}</strong>} className="main_nav_item">
                                  <NavDropdown.Item><Link style={currentTab(history, "/teacher/profile")} to="/teacher/profile">View Profile</Link></NavDropdown.Item>
                                  <NavDropdown.Item><Link style={currentTab(history, "/teacher/eprofile")} to="/teacher/eprofile">Edit Profile</Link></NavDropdown.Item>
                                </NavDropdown>
                              </Fragment>
                            )}
                              
                          </ul>
                    </div>
                </nav>
            </div>
            <div className="header_side d-flex flex-row justify-content-center align-items-center">
                <img src="/assets/images/phone-call.svg" alt="" />
                <span>+43 4566 7788 2457</span>
            </div>
    
           
            <div className="hamburger_container">
                <i className="fas fa-bars trans_200"></i>
            </div>
    
        </header>
        <div className="menu_container menu_mm">
    
        <div className="menu_close_container">
            <div className="menu_close"></div>
        </div>

        <div className="menu_inner menu_mm">
            <div className="menu menu_mm">
                <ul className="menu_list menu_mm">
                  {!isAuthenticated() && !isAuthenticatedS() && !isAuthenticatedT() && (
                  <Fragment>
                    <li className="menu_list menu_mm"><Link style={currentTab(history, "/")} to="/">Home</Link></li>
                    <li className="menu_list menu_mm"><Link style={currentTab(history, "/about")} to="/about">About</Link></li>
                    <li className="menu_list menu_mm"><Link style={currentTab(history, "/course")} to="/course">Course</Link></li>
                    <li className="menu_list menu_mm"><Link style={currentTab(history, "/contact")} to="/contact">Contact</Link></li>
                    <li className="menu_list menu_mm"><Link style={currentTab(history, "/signup")} to="/signup">Sign Up</Link></li>
                    <NavDropdown title={<strong className="text-warning">Login</strong>} className="menu_list menu_mm">
                      <NavDropdown.Item><Link style={currentTab(history, "/signin")} to="/signin">Student / Teacher</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link style={currentTab(history, "/login")} to="/login">Admin</Link></NavDropdown.Item>
                    </NavDropdown>
                  </Fragment>
                  )} 
                  {isAuthenticated() && (
                              <Fragment>
                              <li className="menu_item menu_mm"><Link style={currentTab(history, "/admin")} to="/admin">Home</Link></li>
                              <li className="menu_item menu_mm"><Link style={currentTab(history, "/admin/student")} to="/admin/student">Student</Link></li>
                              <li className="menu_item menu_mm"><Link style={currentTab(history, "/admin/teacher")} to="/admin/teacher">Teacher</Link></li>
                              <li className="menu_item menu_mm"><Link style={currentTab(history, "/admin/enrollment")} to="/admin/enrollment">Enrolled Student</Link></li>
                              <NavDropdown title={<strong className="text-warning">Course</strong>} className="menu_item menu_mm">
                                <NavDropdown.Item><Link style={currentTab(history, "/admin/course")} to="/admin/course">View Course</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link style={currentTab(history, "/admin/addcourse")} to="/admin/addcourse">Add Course</Link></NavDropdown.Item>
                              </NavDropdown>
                              <li className="menu_item menu_mm">
                                  <span className="nav-link" onClick={() => {signout(() => {history.push("/")})}}><strong className="menu_item menu_mm">Logout</strong></span> 
                              </li>
                              <NavDropdown title={<strong className="text-primary">Welcome {loginname()}</strong>} className="menu_item menu_mm">
                                <NavDropdown.Item><Link style={currentTab(history, "/admin/profile")} to="/admin/profile">View Profile</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link style={currentTab(history, "/admin/eprofile")} to="/admin/eprofile">Edit Profile</Link></NavDropdown.Item>
                              </NavDropdown>
                            </Fragment>
                            )}
                            {isAuthenticatedS() && (
                              <Fragment>
                                <li className="menu_item menu_mm"><Link style={currentTab(history, "/student")} to="/student">Home</Link></li>
                                <li className="menu_item menu_mm"><Link style={currentTab(history, "/student/course")} to="/student/course">Explore</Link></li>
                                <li className="menu_item menu_mm"><Link style={currentTab(history, "/student/enrollment")} to="/student/enrollment">My Enrollment</Link></li>
                                <li className="menu_item menu_mm">
                                    <span className="nav-link" onClick={() => {signouts(() => {history.push("/")})}}><strong className="menu_item menu_mm">Logout</strong></span> 
                                </li>
                                <NavDropdown title={<strong className="text-primary">Welcome {loginnames()}</strong>} className="menu_item menu_mm">
                                  <NavDropdown.Item><Link style={currentTab(history, "/student/profile")} to="/student/profile">View Profile</Link></NavDropdown.Item>
                                  <NavDropdown.Item><Link style={currentTab(history, "/student/eprofile")} to="/student/eprofile">Edit Profile</Link></NavDropdown.Item>
                                </NavDropdown>
                              </Fragment>
                            )}
                            {isAuthenticatedT() && (
                              <Fragment>
                                <li className="menu_item menu_mm"><Link style={currentTab(history, "/teacher")} to="/teacher">Home</Link></li>
                                <li className="menu_item menu_mm"><Link style={currentTab(history, "/teacher/course")} to="/teacher/course">Course</Link></li>
                                <li className="menu_item menu_mm"><Link style={currentTab(history, "/teacher/student")} to="/teacher/student">Enrolled Student</Link></li>
                                <li className="menu_item menu_mm">
                                    <span className="nav-link" onClick={() => {signoutt(() => {history.push("/")})}}><strong className="menu_item menu_mm">Logout</strong></span> 
                                </li>
                                <NavDropdown title={<strong className="text-primary">Welcome {loginnamet()}</strong>} className="menu_item menu_mm">
                                  <NavDropdown.Item><Link style={currentTab(history, "/teacher/profile")} to="/teacher/profile">View Profile</Link></NavDropdown.Item>
                                  <NavDropdown.Item><Link style={currentTab(history, "/teacher/eprofile")} to="/teacher/eprofile">Edit Profile</Link></NavDropdown.Item>
                                </NavDropdown>
                              </Fragment>
                            )}
                </ul>

                
                <div className="menu_social_container menu_mm">
                    <ul className="menu_social menu_mm">
                        <li className="menu_social_item menu_mm"><i className="fab fa-pinterest"></i></li>
                        <li className="menu_social_item menu_mm"><i className="fab fa-linkedin-in"></i></li>
                        <li className="menu_social_item menu_mm"><i className="fab fa-instagram"></i></li>
                        <li className="menu_social_item menu_mm"><i className="fab fa-facebook-f"></i></li>
                        <li className="menu_social_item menu_mm"><i className="fab fa-twitter"></i></li>
                    </ul>
                </div>

                <div className="menu_copyright menu_mm">Copyright All rights reserved</div>
            </div>

        </div>

    </div>
      
    </div>
    );
}

export default withRouter(Header);