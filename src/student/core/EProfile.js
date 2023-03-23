import React,{ Component } from 'react';
import { API } from '../../backend';
import { isAuthenticatedS, updateStudent } from '../helper/index';
import Loading from '../../core/Loading';

export default class EProfile extends Component {

    constructor(props){
      super(props);
      this.state = {
          student : [],
          pictures: [],
          values : {},
          error: "",
          success: false,
          loading: true,
      };
    }

handleSubmit(id){
    updateStudent(id,this.state.values)
}

handleChange(name,e){
    var values = Object.assign({}, this.state.values);
    values[name] = e.target.value;
    this.setState({
        values : values
    });
    
}
onChangePicture = name => event => {
    var values = Object.assign({}, this.state.values);
    values[name] = event.target.files[0];
    this.setState({
        values : values
    });
    console.log(event.target.files[0])
};
/* onDrop(name,picture) {
    var values = Object.assign({}, this.state.values);
    values[name] = picture[0];
    console.log(picture[0])
    this.setState({
        values : values
    });
} */
loadingMess = () => {
    return(
        this.state.loading && (
            <Loading />
        )
    );
  }
  componentDidMount(){
    Promise.all([
        fetch(`${API}student/`,{method: "GET"}),
    ])
    .then(([res1]) => Promise.all([res1.json()]))
    .then(([data1]) => this.setState({
        student: data1,
        loading: false
    }));
  }
    render(){

    return (
        this.state.loading ? this.loadingMess() :
        <div className="register">
            <div className="card bg-light">
            <article className="card-body mx-auto" style={{width: "500px"}}>
                <br /><br /><br /><br /><br /><br />
                <h4 className="card-title mt-3 text-center">Edit Profile</h4>
                {this.state.student.filter(stud => stud.id == isAuthenticatedS().user.id).map((ad) => (  
                    
                            <form encType="multipart/form-data">
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Name"> <i className="fa fa-user"></i> </span>
                                    </div>
                                    <input defaultValue={ad.fullname} className="form-control" placeholder="Full name" type="text" required onChange={this.handleChange.bind(this,"fullname")} />
                                </div> 
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Email"> <i className="fa fa-envelope"></i> </span>
                                    </div>
                                    <input defaultValue={ad.email} className="form-control" placeholder="Email address" type="email" required onChange={this.handleChange.bind(this,"email")} />
                                </div> 
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Image"> <i className="fa fa-image"></i> </span>
                                    </div>
                                    <input type="file" accept="image/png, image/jpeg" onChange={this.onChangePicture(this,"image")} />
                                    {/* <ImageUploader withPreview singleImage={true} withIcon={false} buttonText={ad.image ? 'Current:'.concat(ad.image) : 'Choose images'} onChange={this.onDrop.bind(this,"image")} imgExtension={['.jpg', '.gif', '.png', '.gif']} 
                                        maxFileSize={5242880} /> */}
                                </div> 
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Contact No."> <i className="fa fa-phone"></i> </span>
                                    </div>
                                    <input defaultValue={ad.phone} className="form-control" placeholder="Phone number" type="text" onChange={this.handleChange.bind(this,"phone")} />
                                </div> 
                                                          
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit.bind(this,ad.id)}>Save</button>
                                </div>      
                            </form>
                ))}                                                              
            </article>
        </div> 
    </div> 
    );
  }
}