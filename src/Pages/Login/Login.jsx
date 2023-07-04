import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginCorner from '../../assets/images/loginCorner.png';
import LoginImage from '../../assets/images/loginImage01_1_915x1000.png';
import Logo from '../../assets/images/web_logo@2x.png';
import '../../assets/Styles/Styles.css';
import { loginUser } from '../../redux';
import { guestUser } from '../../redux/action/userAction';

function Login(props) {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [email_id, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  let email = localStorage.getItem('email_id');
  if (email) {
    navigate('/languages');
  }

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



  return (
    <>
      <div className="loginCorner">
        <img src={LoginCorner} alt="logo" className="loginCornerImg" />
      </div>

      <div className="position-absolute">
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>

      <Container className="mw-100 mh-100 mainLogin">
        <Row className="justify-content-center">
          <div className="col-lg-6">
            <Col className="mh-auto mt-xl-0 mt-xxl-5">
              <div className="text-center" style={{ marginTop: '0rem' }}>
                <img style={{ justifyContent: 'space-between' }} src={Logo} alt="logo" />
              </div>
              <h1 className="loginName text-center">Login</h1>
              {props.msg1 ? (
                <div
                  className="flashMsg alert alert-danger"
                  style={{ width: '50%', textAlign: 'center', marginLeft: '25%' }}>
                  {props.msg1}
                </div>
              ) : null}
              <p className="loginPara text-center">Sign in to your account to countinue</p>
              <div className="flex-column d-flex align-items-center mt-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 w-50 rounded-pill loginInput"
                  onChange={(e) => setEmailId(e.target.value)}
                  value={email_id}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-3 w-50 mt-2 rounded-pill loginInput"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

              </div>
              <div className="d-flex justify-content-between w-75 mt-3">
                <p></p>
                <p></p>
                <p>
                  <label className="form-check-label">
                    <input
                      className='form-check-input mx-1'
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    Remember Me
                  </label>
                </p>
                <p
                  className="loginPara mt-2 ml-5"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/forgot-password');
                  }}>
                  Forgot Password?
                </p>
              </div>
              <div className="text-center mt-xl-2">
                <button
                  onClick={(e) => {
                    props.loginUser(email_id, password, email_id, rememberMe, e);
                  }}
                  className="loginButton p-3 w-50 rounded-pill text-light fw-bold">
                  Sign In
                </button>
              </div>
              <p className='text-center mt-3'>- or -</p>
              <div className='text-center text-warning pt-0 '>
                <span className='cursor-pointer text-normal fs-4' onClick={guestUser}>Learn as a guest!</span>
              </div>
              <p className="loginPara mt-1 text-center ">
                Don&apos;t have an account?{' '}
                <span
                  onClick={() => {
                    navigate('/sign-up');
                  }}
                  style={{ cursor: 'Pointer', color: 'blue' }}>
                  Sign Up
                </span>
              </p>

            </Col>
          </div>

          <div className="col-lg-6 overflow-hidden ">
            <Col className="imageDiv  d-none d-lg-block d-md-none d-xl-block d-xxl-block">
              <img
                src={`${LoginImage}`}
                alt="No Image"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Col>
          </div>
        </Row>
      </Container>
    </>
  );
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

export default connect(mapStatetoProps, mapDispatchtoProps)(Login);
