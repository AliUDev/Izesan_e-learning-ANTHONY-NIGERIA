import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { NotificationManager } from 'react-notifications';

import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import cartoon_img from '../../assets/images/auth/cartoon.png';
import team_img from '../../assets/images/auth/image.png';
import form_bg from '../../assets/images/auth/signup_bkg.png';
import logo from '../../assets/images/web_logo@2x.png';
import background from '../../assets/splashassets/bkg.png';
import backgroundfull from '../../assets/splashassets/bkgfull.png';
import '../../assets/Styles/Styles.css';
import { loginUser } from '../../redux';
import { guestUser } from '../../redux/action/userAction';
const Login2 = (props) => {
    const navigate = useNavigate();
    const [email_id, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    let email = localStorage.getItem('email_id');
    if (email) {
        navigate('/languages');
    }
    useEffect(() => {
        props.msg1 ?
            NotificationManager.error(props?.msg1, 'Alert!', 3000) : null
    }, [props.msg1])

    useEffect(() => {
        const storedEmail = Cookies.get('email');
        const storedPassword = Cookies.get('password');
        if (storedEmail) {
            setEmailId(storedEmail);
        }
        if (storedPassword) {
            setPassword(storedPassword);
        }
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            props.loginUser(email_id, password, email_id, rememberMe)
        }
    };

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);

    const focuseing = () => {
        if (email_id.length < 1) {
            handleFocus1()
        } else if (password.length < 1) {
            handleFocus2()
        } else {
            null
        }
    }
    const handleFocus1 = () => {
        inputRef1.current.focus();
    };
    const handleFocus2 = () => {
        inputRef2.current.focus();
    };

    return (
        <StyledSignin className='bkg_img' style={{ backgroundImage: width > 767 ? `url(${background})` : `url(${backgroundfull})`, height: "100vh" }}>
            <div className='row m-0' style={{ height: "100vh", overflowY: "scroll" }}>
                <div className=' col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12 m-0 p-0' style={{ backgroundImage: width > 991 ? `url(${team_img})` : `url(${''})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                    {width < 992 && width > 767 &&
                        <img src={cartoon_img} width="100%" style={{ marginTop: "50%" }} />
                    }
                </div>
                <div className='col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12 m-0 p-xl-5 p-lg-5 p-md-3 p-sm-1 p-1'  >
                    <div className='text-center position-relative'  >
                        <div className='position-absolute w-100 p-1' style={{ transform: "translate(0%, -22%)", top: "25%", left: "0%" }}>
                            <img src={logo} width="27%" className='cursor-pointer' onClick={() => navigate('/')} />
                            <h2 className='text-light'>Sign in</h2>
                            <div className='form_body'>
                                <Container className="mw-100 mh-100 mainLogin">
                                    <Row className="justify-content-center m-0">
                                        <div>
                                            <Col className="mh-auto mt-xl-0 mt-xxl-5">
                                                <p className="loginPara text-center text-light">Sign in to your account to countinue</p>
                                                <div className="flex-column d-flex align-items-center mt-2">
                                                    <input
                                                        ref={inputRef1}
                                                        type="email"
                                                        placeholder="Email"
                                                        className="p-3 w-75 rounded-pill loginInput mt-2"
                                                        onChange={(e) => setEmailId(e.target.value)}
                                                        value={email_id}
                                                        onKeyDown={handleKeyDown}
                                                    />
                                                    <input
                                                        ref={inputRef2}
                                                        type="password"
                                                        placeholder="Password"
                                                        className="p-3 w-75 mt-2 rounded-pill loginInput mt-3"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        onEnter={(e) => props.loginUser(email_id, password, email_id, rememberMe, e)}
                                                        value={password}
                                                        onKeyDown={handleKeyDown}
                                                    />

                                                </div>
                                                <div className="d-flex justify-content-between w-75 m-auto mt-3 p-2">
                                                    <p className='text-light' style={{ fontSize: "15px" }}>
                                                        <input
                                                            className='form-check-input mx-1'
                                                            type="checkbox"
                                                            checked={rememberMe}
                                                            onChange={() => setRememberMe(!rememberMe)}
                                                        />
                                                        Remember Me
                                                    </p>

                                                    <p
                                                        className="ml-5 text-light"
                                                        style={{ cursor: 'pointer', fontSize: "15px" }}
                                                        onClick={() => {
                                                            navigate('/forgot-password');
                                                        }}>
                                                        Forgot Password?
                                                    </p>
                                                </div>
                                                <div className="text-center mt-xl-2 text-light">
                                                    <button
                                                        onClick={(e) => {
                                                            focuseing() +
                                                                props.loginUser(email_id, password, email_id, rememberMe, e);
                                                        }}
                                                        className="loginButton p-3 w-75 rounded-pill text-light fw-bold">
                                                        Sign In
                                                    </button>
                                                </div>
                                                <div className='text-center text-warning pt-0 mt-3 '>
                                                    <span className='cursor-pointer text-normal fs-4' onClick={guestUser}>Learn as a guest!</span>
                                                </div>
                                                <p className="loginPara mt-1 text-center text-light">
                                                    Don&apos;t have an account?{' '}
                                                    <span
                                                        onClick={() => {
                                                            navigate('/sign-up');
                                                        }}
                                                        className="text-decoration-underline"
                                                        style={{ cursor: 'Pointer' }}>
                                                        Sign Up
                                                    </span>
                                                </p>

                                            </Col>
                                        </div>


                                    </Row>
                                </Container>
                            </div>
                        </div>
                        <img src={form_bg} className="form_bg" width="100%" />
                    </div>
                </div>
            </div>
        </StyledSignin>
    )
}

const mapStatetoProps = (state) => {
    return {
        email_id: state.user.email_id,
        password: state.user.password,
        msg1: state.user.msg1,
        success: state.user.success
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        loginUser: function (email_id, password, rememberMe, e) {
            dispatch(loginUser(email_id, password, rememberMe, e));
        },
        guestUser: function () {
            dispatch(guestUser())
        }
    };

};

export default connect(mapStatetoProps, mapDispatchtoProps)(Login2);

const StyledSignin = styled.div`


  .bkg_img{
      width: 100%;
      background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    height: 100em;
  
  }
  .form_body{
      height: 460px;
      /* overflow-y: scroll; */
      width: 100%;
      /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ffffff;
    border-radius: 10px;
  }
  }
  .signup_input{
      border-radius: 25px;
      height:47px;
  }
  
  @media (max-width : 1320px){
      .form_body{
      height: 440px;
      }
  }
  @media (max-width : 1300px){
      .form_body{
      height: 420px;
      }
  }
  @media (max-width : 1230px){
      .form_body{
      height: 410px;
      }
  }
  @media (max-width : 1200px){
      .form_body{
      height: 350px;
      }
  }
  @media (max-width : 1100px){
      .form_body{
      height: 490px;
      }
  }
  @media (max-width : 1043px){
      .form_body{
      height: 500px;
      }
  }

  @media (max-width : 850px){
      .form_body{
      height: 600px;
      }
  }
  @media (max-width : 767px){
      .form_body{
      height: 600px;
      }
  }
  @media (max-width : 647px){
      .form_body{
      height: 550px;
      }
  }
  @media (max-width : 600px){
      .form_body{
      height: 500px;
      }
  }
  @media (max-width : 565px){
      .form_body{
      height: 450px;
      }
  }
  @media (max-width : 531px){
      .form_body{
      height: 370px;
      }
  }
  @media (max-width : 470px){
      .form_body{
      height: 330px;
      }
  }
  @media (max-width : 440px){
      .form_body{
      height: 300px;
      }
  
  }
  @media (max-width : 415px){
      .form_body{
      height: 270px;
      }

  }
  @media (max-width : 383px){
      .form_body{
      height: 270px;
      }
      .form_bg{
          height: 100vh;
      }
  }
  
  
  
  `