import React,{useState, useEffect} from 'react';
import { isAuthenticatedT } from '../helper/index';
import { API } from '../../backend';
import { useHistory } from 'react-router-dom';
import Loading from '../../core/Loading';

export default function Profile() {
    const [detail, setDetail] = useState([]);
    const [loading, setLoad] = useState(true);
    const history = useHistory();
    const loadingMess = () => {
        return(
            loading && (
                <Loading />
            )
        );
      }
    useEffect(() => {
        Promise.all([
            fetch(`${API}teacher/`,{method: "GET"})
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => (
            setDetail(data1),
            setLoad(false)
        ))
    });
  return (
    loading ? loadingMess() :
    <div>
        <br/><br/><br /><br/>
        {detail.filter(stud => stud.id === isAuthenticatedT().user.id).map((det) => (
        <section class="section about-section gray-bg" id="about">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="dark-color">About Me
                                <button type="button" class="btn btn-light" data-toggle="tooltip" data-placement="bottom" title="Edit Profile" onClick={() => {history.push('/teacher/eprofile')}}><i className="fas fa-edit" /></button>
                            </h3>
                            <h6 class="theme-color lead">Name : {det.fullname}</h6>
                            <div class="row about-list">
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>E-mail</label>
                                        <p>{det.email}</p>
                                    </div>
                                    <div class="media">
                                        <label>Institute</label>
                                        <p>{det.institute}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>Phone</label>
                                        <p>{det.phone}</p>
                                    </div>
                                    <div class="media">
                                        <label>Purpose</label>
                                        <p>{det.purpose}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="about-avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="" height="200px" width="200px" className="rounded mx-auto d-block" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        ))}
    </div>
  );
}
