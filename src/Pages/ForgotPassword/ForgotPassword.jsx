import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import LoginCorner from '../../assets/images/loginCorner.png';
// import Logo from '../../assets/images/nav_logo_new_178x178.png';
import Logo from '../../assets/images/web_logo@2x.png';
import '../../assets/Styles/Styles.css';
import { api } from '../../url';
import axios from 'axios';
import LoginImage from '../../assets/images/loginImage01_1_915x1000.png';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoader, setisLoader] = useState(false);
  const [err, setErr] = useState(false);
  function submitHandler(e) {
    e.preventDefault();

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
      setisLoader(false);
      setErr('Email format is invalid');
      return false;
    }

    setisLoader(false);
    axios
      .post(`${api}ForgotPass`, {
        email_id: email
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 'success') {
          setisLoader(false);
          setErr('your link is send to your Email!!');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setisLoader(false);
          setErr(res.data.error + '!!');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="loginCorner">
        <img src={LoginCorner} alt="logo" className="loginCornerImg" />
      </div>
      {isLoader ? (
        <>
          <div className="bg-blur"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-3 col-lg-3 col-xl-3 col-3 m-auto">
                <img src="assets/loader/loader.gif" alt="" className="loader loader-2" />
              </div>
            </div>
          </div>
        </>
      ) : null}

      <Container className="mw-100 mh-100 mainLogin">
        <Row className="justify-content-center mainLogin">
          <div className="col-lg-6">
            <Col className="mh-100 mt-xl-0 mt-xxl-5">
              <div className="text-center" style={{ marginTop: '6rem' }}>
                <img src={Logo} alt="logo" />
              </div>
              <h1 className="forgetName text-center">Forgot Password</h1>
              {err ? (
                <div
                  className="flashMsg alert alert-danger"
                  style={{ width: '50%', textAlign: 'center', marginLeft: '25%' }}>
                  {err}
                </div>
              ) : null}

              <p className="loginPara text-center">Add your email address</p>
              <div className="flex-column d-flex align-items-center mt-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 w-50 rounded-pill loginInput"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="text-center mt-xl-2 mt-4">
                <button
                  onClick={(e) => submitHandler(e)}
                  className="loginButton p-3 w-50 rounded-pill">
                  Send
                </button>
              </div>

              <p className="loginPara mt-1 text-center mt-2">
                Click here to
                <span
                  onClick={() => {
                    navigate('/login');
                  }}
                  style={{ cursor: 'Pointer', color: 'blue' }}>
                  {' '}
                  Login{' '}
                </span>
              </p>
            </Col>
          </div>
          <div className="col-lg-6">
            <Col className="imageDiv mh-100 d-none d-lg-block d-md-block d-xl-block d-xxl-block">
              <img
                src={`${LoginImage}`}
                alt="No Image"
                style={{ width: '912px', height: '100vh', objectFit: 'cover' }}
              />
            </Col>
          </div>
        </Row>
      </Container>
    </>
  );
}
export default ForgotPassword;
