import React,{useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { API } from '../../backend';
import Loading from '../../core/Loading';

export default function Profile() {
    const [detail, setDetail] = useState([]);
    const [load, setLoad] = useState(true);
    const history = useHistory();

    const loadingMess = () => {
        return(
            load && (
                <Loading />
            )
        );
      }
      useEffect(() => {
        Promise.all([
            fetch(`${API}adminp/`,{method: "GET"})
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => (
            setDetail(data1),
            setLoad(false)
        ))
      });
  return (
    load ? loadingMess() : 
    <div>
        <br/><br/><br /><br/>
        {detail.map((det, index) => (
        <section class="section about-section gray-bg" id="about">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="dark-color">About Me
                                <button type="button" class="btn btn-light" data-toggle="tooltip" data-placement="bottom" title="Edit Profile" onClick={()=>{history.push('/admin/eprofile')}}><i className="fas fa-edit" /></button>
                            </h3>
                            <h6 class="theme-color lead">Name : {det.name ? det.name : "-"}</h6>
                            <div class="row about-list">
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>Age</label>
                                        <p>{det.age ? det.age : "-"} Yr</p>
                                    </div>
                                    <div class="media">
                                        <label>Address</label>
                                        <p>{det.address ? det.address : "-"}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>E-mail</label>
                                        <p>{det.email}</p>
                                    </div>
                                    <div class="media">
                                        <label>Phone</label>
                                        <p>{det.phone ? det.phone : "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="about-avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="" />
                        </div>
                    </div>
                </div>
                <div class="counter">
                    <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="500" data-speed="500"><i className="fab fa-facebook-f" /></h6>
                                <p class="m-0px font-w-600"><a href={det.fb ? det.fb : "https://www.facebook.com/"}>Facebook</a></p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="150" data-speed="150"><i className="fab fa-linkedin-in" /></h6>
                                <p class="m-0px font-w-600"><a href={det.linkedin ? det.linkedin : "https://www.linkedin.com/home"}>LinkedIn</a></p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="850" data-speed="850"><i className="fab fa-instagram" /></h6>
                                <p class="m-0px font-w-600"><a href={det.insta ? det.insta : "https://www.instagram.com/accounts/login/?hl=en"}>Instagram</a></p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="190" data-speed="190"><i className="fab fa-twitter" /></h6>
                                <p class="m-0px font-w-600"><a href={det.twitter ? det.twitter : "https://twitter.com/login?lang=en" }>Twitter</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        ))}
    </div>
  );
}
