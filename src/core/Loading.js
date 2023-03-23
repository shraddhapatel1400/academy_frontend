import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";

export default function Loading() {
  return (
    <div className="popular page_section" style={{height:"1000px"}}>
        <br /><br/><br /><br /><br/><br /><br /><br/><br />
        <div className="sweet-loading" style={{textAlign:"center"}}>
            <BeatLoader size={40} color={"#F5A623"}/>
                <span style={{fontSize:"30px",fontFamily:"cursive"}}>Loading...</span>
                <p>Please wait</p>
        </div>
    </div>
  );
}
