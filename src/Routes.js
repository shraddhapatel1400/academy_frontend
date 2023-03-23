import React,{useState, useEffect} from "react";
import { Switch, BrowserRouter} from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Footer from './core/Footer'
import Main from "./core/Main";
import Header from "./core/Header";

const Routes = () => {
  const [loading, setLoad] = useState(true);
  const style = {textAlign: 'center'};

  const loadingMess = () => {
    return(
        loading && (
        <div className="popular page_section" style={{height:"1000px"}}>
            <br /><br/><br /><br /><br/><br /><br /><br/><br />
            <div className="sweet-loading" style={style}>
            <BeatLoader size={40} color={"#F5A623"}/>
            <span style={{fontSize:"30px",fontFamily:"cursive"}}>Loading...</span>
            <p>Please wait</p>
        </div>
        </div>
        )
    );
  }
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    },2000)
  },[])

  return (
    loading ? loadingMess() :
    <div className="super_container" >
        <BrowserRouter>
          <Header />
          <Switch><Main /></Switch>
          <Footer />
        </BrowserRouter>
    
    </div>
  );
};

export default Routes;
