import React,{useState, useEffect} from 'react';
import Loading from './Loading';

export default function Contact() {
  const [loading, setLoad] = useState(true);
	const style = {textAlign: 'center'};

  const loadingMess = () => {
    return(
        loading && (
        <Loading />
        )
    );
  }
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    },1000)
  },[])
  return (
    loading ? loadingMess() :
    <div>
        <br/>
        <div align="center" className="services page_section">
            <img src="/assets/images/ait.jpg " height="100%" /><br />
            <b>Address:</b>
            <u><a href="http://www.aau.in/college-menu/703" target="_blank"><b>College of Agricultural Information Technology,<br /></b></a></u>
            <b>Anand Agricultural University,
            Anand : 388110.
            Gujarat (INDIA).</b><br />
            <b>	Phone:</b>
            <b>(Office) +91-2692-263123,+91-2692-263124</b><br />
            <b>Email:</b><b>dit@aau.in</b><br />
        </div>
    </div>
  );
}
