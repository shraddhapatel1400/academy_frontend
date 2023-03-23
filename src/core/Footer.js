import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const Footer = () => {
    
    return (
      <footer className="footer">
            <div className="container">               
                <div className="footer_bar d-flex flex-column flex-sm-row align-items-center">
                    <div className="footer_copyright text-white mb-auto">
                        <span className="text-center ml-sm-auto">{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                            Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | by Shraddha Patel
                            {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}</span><br />
                        <span>College of AIT, AAU, Anand-388110</span>
                    </div>
                    <div className="footer_social ml-sm-auto">
                        <ul className="menu_social text-white">
                            <li className="menu_social_item"><a href="https://in.pinterest.com/siddhipatel8990/boards/"><i className="fab fa-pinterest"></i></a></li>
                            <li className="menu_social_item"><a href="https://www.linkedin.com/in/shraddha-patel-b57b60169/"><i className="fab fa-linkedin-in"></i></a></li>
                            <li className="menu_social_item"><a href="https://www.instagram.com/i_siddhi_patel/"><i className="fab fa-instagram"></i></a></li>
                            <li className="menu_social_item"><a href="https://www.facebook.com/people/Siddhi-Patel/100010549817598"><i className="fab fa-facebook-f"></i></a></li>
                            <li className="menu_social_item"><a href="https://twitter.com/Siddhip98046349"><i className="fab fa-twitter"></i></a></li>
                        </ul>
                    </div>
                </div>   
            </div>
        </footer>
    );

}

export default withRouter(Footer);
