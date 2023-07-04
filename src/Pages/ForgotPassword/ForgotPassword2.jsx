import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bird from '../../assets/images/bird.gif';
import bird2 from '../../assets/images/bird2.webp';
import banner from '../../assets/splashassets/banner@2x.png';
import banner2 from '../../assets/splashassets/bkg_2.png';
import '../../assets/Styles/Styles.css';
import { api } from '../../url';
import HeaderNav from '../Splash/components/HeaderNav';
const ForgotPassword2 = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoader, setisLoader] = useState(false);
    const [err, setErr] = useState(false);
    function submitHandler(e) {
        setisLoader(true)
        e.preventDefault();

        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(email)) {
            setisLoader(false);
            NotificationManager.error('Email format is invalid', 'Alert!', 3000);
            return false;
        }

        axios
            .post(`${api}ForgotPass`, {
                email_id: email
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.status == 'success') {
                    setisLoader(false);
                    NotificationManager.success('Your link is send to your Email!', 'Success!', 3000);
                    setErr('your link is send to your Email!!');
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                } else {
                    setisLoader(false);
                    setErr(res.data.error + '!!');
                    NotificationManager.error(res.data.error, 'Error!', 3000);
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <StyledForgotPassword >
            {isLoader ?
                <LinearProgress />
                :
                <></>
            }
            <HeaderNav />
            <div className="flying">
                <img src={bird} width="80" height="80" />
            </div>
            <img className='bg_img' src={banner} width="100%" />
            <img className='bg_img2' src={banner2} width="100%" />
            <div className='content_container text-center'>
                <img id="bird" src={bird2} alt="" />
                <div className='p-3 py-4'>
                    <h3 className='fw-bold'>Forgot Password?</h3>
                    <p>Please Enter Your Account Email Address we will get back to you with the reset password link and confirmation OTP</p>
                    <p className="loginPara">Add your email address there:</p>
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-3 w-75 rounded-pill border loginInput"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        onClick={(e) => submitHandler(e)}
                        className="loginButton p-3 w-75 rounded-pill mt-4 text-light fw-bold">
                        Send
                    </button>

                    <p className="loginPara text-light mt-4 ">
                        Click here to
                        <Link className='mx-2' to="/login">

                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </StyledForgotPassword >
    )
}

export default ForgotPassword2

const StyledForgotPassword = styled.div`

#bird {
  height: 100px;
  position: absolute;
  left: 14%;
  z-index: 1;
}
@media(max-width:1024px){
    #bird {
 
  left: 5%;

}
}
@media(max-width: 760px){
    #bird {
        display: none;
}
}
.flying {
position: fixed;
top: 150px;
left: 0;
display: flex;
animation-name: across, float;
animation-iteration-count: infinite, infinite;
animation-duration: 15s, 4s;
animation-play-state: running, running;
transform-origin: top;
}
.flying p {
display: inline-block;
margin-bottom: 2px;
margin-top: auto;
margin-right: 20px;
}
@keyframes across {
0% {left: -200px}
100% {left: 2000px; right: -50px}
}
@keyframes float {
0% {transform: translate(0px, 0px)}
25% {transform: translate(0px, 50px)}
50% {transform: translate(0px, -80px)}
100% {transform: translate(0px, 0px)}
}


.content_container{
margin: auto;
  width: 50%;
  padding-top: 160px;
  transition-duration: 200ms;

}
@media (max-height: 560px){
    .content_container{
       padding-top: 85px !important;
       transition-duration: 200ms;
}
}
.content_container div{
    background-color: #e7e7e737;
    backdrop-filter: blur(4px);
    border-radius: 10px;
    color: #000000;
}
.bg_img,  .bg_img2{
    z-index: -1;
    position: absolute;
    opacity: 5;
    height: 100vh;
}


@media(max-width:1024px){
    .content_container{
  width: 70%;
}
}
@media(min-width:760px){
    .bg_img2{
        display:none;
    }

}
@media (max-width: 760px) {
    .bg_img1 {
        display:none;
  }
  .content_container{
  width: 90%;
}
}


    
`
