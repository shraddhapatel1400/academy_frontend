import React, { useState,useEffect } from 'react'
import { API } from '../../backend';
import { isAuthenticatedS } from '../helper';
import { useParams } from 'react-router-dom';
import Payment from './Payment';
import Loading from '../../core/Loading';

const Enrollment = () => {

    const [student, setstud] = useState([]);
    const [course, setcor] = useState([]);
    const [reload, setReload] = useState(false);
    const [loading, setLoad] = useState(true);
  
    useEffect(() => {
        Promise.all([
            fetch(`${API}student/`,{method: "GET"}),
            fetch(`${API}course/`,{method: "GET"})
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => (
            setstud(data1),
            setcor(data2),
            setLoad(false)
        ))
    }, [reload]);
    const loadingMess = () => {
        return(
            loading && (
               <Loading />
            )
        );
      }
    
    const { id } = useParams();
    return(
        loading ? loadingMess() : 
        <div>
            {course.filter(cours => cours.id == id).map((cors)=>{
                return(
                    <div>
                        <div className="row row-eq-height">
                            {student.filter(stud => stud.id === isAuthenticatedS().user.id).map((std)=>{
                                return(
                                <div className="col-lg-6 nopadding">
                                    <div className="register_section d-flex flex-column align-items-center justify-content-center">
                                        <div className="register_content text-center">
                                            <h1 className="register_title">Buy now the <strong className="text-success">{cors.coursename}</strong> course and get a discount <span>50%</span> discount until {cors.start_date}</h1>
                                            <p className="register_text">{cors.description}</p>
                                            <input className="form-control" type="text" defaultValue={std.fullname} required="required" /><br />
                                            <input className="form-control" type="text" defaultValue={cors.coursename} readOnly /><br />
                                            <input className="form-control" type="text" defaultValue={std.email} required/><br />
                                            <input className="form-control" type="text" defaultValue={(cors.price).concat('$')} readOnly />
                                        </div>
                                    </div>
                                </div>
                                );
                            })}
                            
                                <div className="col-lg-6 nopadding">
                                   <Payment course={cors} setReload={setReload} /> 
                                </div>
                        </div>
                           
                    </div>
                )
            })}
        </div>
    );
}

export default Enrollment;

