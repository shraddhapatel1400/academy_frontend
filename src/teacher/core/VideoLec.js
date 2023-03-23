import React,{useState, useEffect} from 'react';
import { API } from '../../backend';
import { useParams,useHistory } from 'react-router-dom';
import Loading from '../../core/Loading';
import { loginnamet } from '../helper';

const VideoLec = () => {
    const [courses, setCourse] = useState([]);
    const [lectures, setlec] = useState([]);
    const [loading, setLoad] = useState(true);

    const loadingMess = () => {
        return(
            loading && (
                <Loading />
            )
        );
    }

    useEffect(() => {
        Promise.all([
            fetch(`${API}course/`,{method: "GET"}),
            fetch(`${API}lecture/`,{method: "GET"})
        ])
        .then(([res1,res2]) => Promise.all([res1.json(),res2.json()]))
        .then(([data1,data2]) => (
            setCourse(data1),
            setlec(data2),
            setLoad(false)
        ))
    });
    const { id } = useParams();
    const history = useHistory();
  return (

      lectures.filter(l => l.course == id).length > 0 ? 
    <div>
        <br /><br /><br />

    <div class="popular page_section">
        <div class="container">
                <div class="row">
                    {lectures.filter(l => l.course == id).slice(0,1).map((lec,ind) =>(
                    <div className="video-detail col-md-8">
                        <div className="embed-responsive embed-responsive-16by9 video-detail-animation">
                        <video name='demo' controls width='300px' height='200px'>
                            <source src={lec.video} type="video/mp4"></source>
                        </video>
                        </div>
                        <div className="details">
                            <div className="details-title">
                                <span style={{fontSize:"20px",fontFamily:"cursive"}}>#{ind}&nbsp;{lec.title}</span>
                            </div>
                            <div className="details-channel-title">
                                <p>{lec.created_at}</p>
                            </div><hr />
                            <div className="d-flex flex-row align-items-center">
                                <div className="course_author_image">
                                    <img src="/assets/images/author.jpg" alt="https://unsplash.com/@mehdizadeh" />
                                </div>
                                <div className="course_author_name">
                                    <h5>{loginnamet()}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                    <div class="col-12 col-lg-4">
                        <div class="about--content mb-100">
                            <div className="row">
                                <div className="col-lg-6"><h4>{courses.filter(c=>c.id==id).map(c=>c.coursename)}</h4></div>
                                <div className="col-lg-6"><button type="submit" style={{float : "right"}} className="btn btn-primary" onClick={() => {history.push(`/teacher/addlec/${id}`)}}>ADD Video</button></div>
                            </div><br />
                            <ul>
                                    {lectures.filter(l => l.course == id).map((lec,ind) =>(
                                    <li className="list-group-item list-item-custom">
                                        <div className="video-list media" key={ind}>
                                            <div className="media-body">
                                            <div className="media-heading">
                                                #{ind}&nbsp;{lec.title}
                                            </div>
                                            <div className="media-heading-channel-title">
                                                {loginnamet()}
                                            </div>
                                            <div className="media-heading-channel-date">
                                                {lec.created_at}
                                            </div>
                                            </div>
                                            <div className="media-right">
                                                <video  controls width='100px' height='70px' className="media-object" src={lec.video}/>
                                            </div>
                                        </div>
                                    </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    </div>  :
    <div className="container" style={{textAlign:"center",height:"550px",marginTop:"300px"}}>
        <h5 style={{color:"red"}}>No video found for <span style={{color:"black"}}>{courses.filter(c=>c.id==id).map(c=>c.coursename)}</span>.</h5>
        <button type="submit" className="btn btn-primary" onClick={() => {history.push(`/teacher/addlec/${id}`)}}>ADD Video</button>
    </div>
    
  );
}
export default VideoLec;
