import React,{ Component } from 'react';
import { API } from '../../backend';
import { updateAdmin } from '../helper';
import Loading from '../../core/Loading';

export default class EProfile extends Component {

    constructor(props){
      super(props);
      this.state = {
          values : {},
          admind: [],
          adId : '',
          error: "",
          success: false,
          loading: true,
      };
    }

handleSubmit(id){
    updateAdmin(id,this.state.values)
}

handleChange(name,e){
    var values = Object.assign({}, this.state.values);
    values[name] = e.target.value;
    this.setState({
        values : values
    });
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
        fetch(`${API}adminp/`,{method: "GET"}),
    ])
    .then(([res1]) => Promise.all([res1.json()]))
    .then(([data1]) => this.setState({
        admind: data1,
        loading : false
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
                {this.state.admind.map((ad) => (  
                    <div className="row">
                        <div className="col-lg-10">
                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Name"> <i className="fa fa-user"></i> </span>
                                    </div>
                                    <input defaultValue={ad.name} className="form-control" placeholder="Full name" type="text" required onChange={this.handleChange.bind(this,"name")} />
                                </div> 
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Email"> <i className="fa fa-envelope"></i> </span>
                                    </div>
                                    <input defaultValue={ad.email} className="form-control" placeholder="Email address" type="email" required onChange={this.handleChange.bind(this,"email")} />
                                </div> 
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Contact No."> <i className="fa fa-phone"></i> </span>
                                    </div>
                                    <input defaultValue={ad.phone} className="form-control" placeholder="Phone number" type="text" onChange={this.handleChange.bind(this,"phone")} />
                                </div> 
                                
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Age"> <i className="fa fa-child"></i> </span>
                                    </div>
                                    <input defaultValue={ad.age} className="form-control" placeholder="Age" type="text" onChange={this.handleChange.bind(this,"age")} />
                                </div>  
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Address"> <i className="fa fa-address-card"></i> </span>
                                    </div>
                                    <textarea defaultValue={ad.address} className="form-control" placeholder="Address" type="text" onChange={this.handleChange.bind(this,"address")} />
                                </div>                                      
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit.bind(this,ad.id)}>Save</button>
                                </div>      
                            </form>
                        </div>
                        <div className="col-lg-2">
                        <div class="icon-bar">
                            <a href={ad.fb ? ad.fb : "https://www.facebook.com/" } class="facebook"><i class="fa fa-facebook"></i></a> 
                            <a href={ad.insta ? ad.insta : "https://www.instagram.com/accounts/login/?hl=en" } class="instagram"><i class="fa fa-instagram"></i></a> 
                            <a href={ad.twitter ? ad.twitter : "https://twitter.com/login?lang=en" } class="twitter"><i class="fa fa-twitter"></i></a> 
                            <a href={ad.linkedin ? ad.linkedin : "https://www.linkedin.com/home" } class="linkedin"><i class="fa fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>  
                    
                ))}                                                              
            </article>
        </div> 
    </div> 
    );
  }
}