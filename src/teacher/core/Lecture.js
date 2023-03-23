import React,{Component} from 'react';
import { API } from '../../backend';
import { sendEmail, uploadVideo } from '../helper';
import { toast } from 'react-toastify';
import Loading from '../../core/Loading';

class Lecture extends Component{
    constructor(props){
        super(props);
        this.state = {
            values : {},
            courses : [],
            error : "",
            loading : true,
            load : false,
            corId : props.match.params.id
        }
    };
    handleChange(name,e){
        var values = Object.assign({}, this.state.values);
        values[name] = e.target.value;
        this.setState({
            values : values
        });
        console.log(e.target.value)
    }
    handleFile = (name,e) =>{
        var values = Object.assign({}, this.state.values);
        values[name] = e.target.files[0];
        values["course"] = this.state.corId;
        this.setState({
            values : values
        });
        console.log(e.target.files[0])
    }
    loadingMess = () => {
        return(
            this.state.loading && (
                <Loading />
            )
        );
      }
    componentDidMount(){
        Promise.all([
            fetch(`${API}course/`,{method: "GET"})
        ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => this.setState({
            courses : data1,
            loading : false
        }));
      }
    
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(this.state.values))
        uploadVideo(this.state.values)
            .then((data) => {
                console.log("DATA",data);
                toast.success("You have Added video to the Course!!!", {
                  position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(() => this.setState({
                    load : true
                }),2000);
                this.props.history.push(`/teacher/video/${this.state.corId}`);
            })
        sendEmail()
        .then((data)=>{
            alert("send mail successfully!")
        }).catch(console.log("Error"))
    }
render(){
  return (
      this.state.loading ? this.loadingMess() :
        this.state.courses.filter(c => c.id==this.state.corId).map(cor => (
            <div style={ { backgroundImage: "url(" + cor.image + ")" , 
                backgroundSize: "1500px 1000px", width:"1500px", height:"1000px", backgroundRepeat: 'no-repeat',opacity:"0.6" } }>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <div>
                <h3 class="text-center" style={{color:"black"}}>Add Video Lecture</h3>
                <div class="col-sm-12 col-lg-4 mr-auto ml-auto border p-4 mt-5" style={{backgroundColor:"pink"}}>
                    <form encType="multipart/form-data">
                        <div class="form-group">
                            <input type="text" className="form-control" placeholder="Video Title" onChange={this.handleChange.bind(this,"title")}/><br/>
                            <div class="custom-file">
                                <input type="file" accept="video/mp4,video/x-m4v,video/*" class="form-control"  onChange={this.handleFile.bind(this,"video")} />
                            </div>
                        </div>
                        <div class="form-group">
                            <button onClick={this.handleSubmit.bind(this)} className="form-control btn btn-dark"><i class="fa fa-fw fa-upload"></i> Upload</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        ))
  );
}
}
export default Lecture;
