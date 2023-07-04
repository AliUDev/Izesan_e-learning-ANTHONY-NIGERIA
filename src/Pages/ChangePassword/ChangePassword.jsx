import axios from 'axios';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import '../../assets/Styles/Styles.css';
import Heading from '../../Components/Common/Heading';
import { api } from '../../url';
import Loader from '../Loader/Loader';

function ChangePassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('all_data'))[0].email_id);
  const [old, setold] = useState('');
  const [newp, setnewp] = useState('');
  const [cnewp, setCnewp] = useState('');
  const [isLoader, setisLoader] = useState(true);

  function logout() {
    axios
      .get(`${api}PersonLogout?email_id=${localStorage.getItem('email_id')}`)
      .then(() => {
        //var date = new Date();
        //var todayDate = date.toISOString().slice(0, 10);
        // var site_time = parseInt(localStorage.getItem(todayDate));
        //  var current_day_target = localStorage.getItem('current_day_target');
        clearStorage();
        // localStorage.clear();
        // localStorage.setItem(todayDate, site_time);
        // localStorage.setItem('current_day_target', current_day_target);
        navigate('/login');
      })
      .catch((err) => console.log(err));
  }

  function clearStorage() {
    localStorage.removeItem('state');
    localStorage.removeItem('all_data');
    localStorage.removeItem('count');
    localStorage.removeItem('chapter_no');
    localStorage.removeItem('chapter_type');
    localStorage.removeItem('crr_chapter_index');
    localStorage.removeItem('attempt');
    localStorage.removeItem('q_incr');
    localStorage.removeItem('email_id');
    localStorage.removeItem('crr_chapter_index');
    localStorage.removeItem('dropdown_item');
    localStorage.removeItem('tutor_id');
    localStorage.removeItem('price');
    localStorage.removeItem('userIds');
    localStorage.removeItem('selectedSession');
    localStorage.removeItem('bkId');
    localStorage.removeItem('booking_type');
    localStorage.removeItem('payment_status');
    localStorage.removeItem('lang');
  }

  window.setTimeout(() => {
    setisLoader(false);
  }, 1000);

  function changePasswordHandler(e) {
    e.preventDefault();
    if (cnewp != newp) {
      NotificationManager.error('New password and confirm password should be same', 'Error', 3000);
    } else {
      setisLoader(true);
      axios
        .post(`${api}PersonPwdChange`, {
          old_password: old,
          new_password: newp,
          email_id: email
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status == 'success') {
            NotificationManager.success('password updated successfully!!', 'Success', 3000);
            setisLoader(false);
            setTimeout(function () {
              logout();
            }, 2000);
          } else if (res.data.status == 'failed') {
            NotificationManager.error(res.data.error, 'Error', 3000);
            setisLoader(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <Container className="mw-100 mh-100 mainLogin">
        {isLoader && <Loader />}
        <Row className="justify-content-center mainLogin">
          <Col className="mh-100 mt-xl-0 mt-xxl-5">
            <Heading title="Change Password" className='text-center fw-bold mt-4' />
            <div className="flex-column d-flex align-items-center mt-4">
              <input
                type="email"
                placeholder="Email"
                disabled="disabled"
                value={email}
                className="p-3 w-75 rounded loginInput"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex-column d-flex align-items-center mt-4">
              <input
                type="password"
                placeholder="Old Password"
                className="p-3 w-75 rounded loginInput"
                onChange={(e) => setold(e.target.value)}
              />
            </div>
            <div className="flex-column d-flex align-items-center mt-4">
              <input
                type="password"
                placeholder="New Password"
                className="p-3 w-75 rounded loginInput"
                onChange={(e) => setnewp(e.target.value)}
              />
            </div>
            <div className="flex-column d-flex align-items-center mt-4">
              <input
                type="password"
                placeholder="Confirm New Password"
                className="p-3 w-75 rounded loginInput"
                onChange={(e) => setCnewp(e.target.value)}
              />
            </div>
            <div className="text-center mt-xl-2  mt-4">
              {/*{email != '' && old != '' && newp != '' && cnewp != '' && newp == cnewp ? (*/}
              <button
                className="loginButton p-3 w-75 rounded mt-2"
                onClick={(e) => changePasswordHandler(e)}>
                Change
              </button>
              {/*) : (*/}
              {/*  <button className="loginButton p-3 w-75 rounded" disabled>*/}
              {/*    Change*/}
              {/*  </button>*/}
              {/*)}*/}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default ChangePassword;
