import React,{ Component } from 'react';
import { API } from '../../backend';
import { isAuthenticatedT, updateTeacher } from '../helper';
import Loading from '../../core/Loading';

export default class EditProfile extends Component {

    constructor(props){
      super(props);
      this.state = {
          values : {},
          teachers: [],
          error: "",
          success: false,
          loading : true,
        };
    } 

    loadingMess = () => {
        return(
            this.state.loading && (
                <Loading />
            )
        );
      }

handleSubmit(id){
    updateTeacher(id,this.state.values)
}

handleChange(name,e){
    var values = Object.assign({}, this.state.values);
    values[name] = e.target.value;
    this.setState({
        values : values
    });
}
  componentDidMount(){
    Promise.all([
        fetch(`${API}teacher/`,{method: "GET"}),
    ])
    .then(([res1]) => Promise.all([res1.json()]))
    .then(([data1]) => this.setState({
        teachers: data1,
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
                {this.state.teachers.filter(t => t.id ==isAuthenticatedT().user.id).map((ad) => (  
                            <form>
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
                                        <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Contact No."> <i className="fa fa-phone"></i> </span>
                                    </div>
                                    <input defaultValue={ad.phone} className="form-control" placeholder="Phone number" type="text" onChange={this.handleChange.bind(this,"phone")} />
                                </div> 
                                
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Institute"> <i className="fa fa-university"></i> </span>
                                    </div>
                                    <input defaultValue={ad.institute} className="form-control" placeholder="Institute" type="text" onChange={this.handleChange.bind(this,"institute")} />
                                </div>  
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Purpose"> <i className="fa fa-tasks"></i> </span>
                                    </div>
                                    <input defaultValue={ad.purpose} className="form-control" placeholder="Purpose" type="text" onChange={this.handleChange.bind(this,"purpose")} />
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