import React,{useState, useEffect} from 'react';
import { isAuthenticatedS } from '../helper/index';
import { API } from '../../backend';
import { useHistory } from 'react-router-dom';
import Loading from '../../core/Loading';


export default function Profile() {
    const [detail, setDetail] = useState([]);
    const [loading, setLoad] = useState(true);
    const history = useHistory();
    
    useEffect(() => {
        Promise.all([
            fetch(`${API}student/`,{method: "GET"})
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => (
            setDetail(data1),
            setLoad(false)
        ))
    });
    const loadingMess = () => {
        return(
            loading && (
                <Loading />
            )
        );
      }
  return (
    loading ? loadingMess() : 
    <div>
        <br/><br/><br /><br/>
        {detail.filter(stud => stud.id === isAuthenticatedS().user.id).map((det) => (
        <section class="section about-section gray-bg" id="about">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="dark-color">About Me
                                <button type="button" class="btn btn-light" data-toggle="tooltip" data-placement="bottom" title="Edit Profile" onClick={() => {history.push('/student/eprofile')}}><i className="fas fa-edit" /></button>
                            </h3>
                            <h6 class="theme-color lead">Name : {det.fullname}</h6>
                            <div class="row about-list">
                                <div class="col-md-6">
                                <div class="media">
                                        <label>E-mail</label>
                                        <p>{det.email}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
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
                            <img src={det.image ? det.image : "https://bootdey.com/img/Content/avatar/avatar7.png"} title="" alt="" height="200px" width="200px" className="rounded mx-auto d-block" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        ))}
    </div>
  );
}
