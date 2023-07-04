import axios from 'axios';
import { useState } from 'react';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from "react-router-dom";
import '../../../assets/Styles/Styles.css';
import Heading from '../../../Components/Common/Heading';
import { api } from '../../../url';
import Loader from '../../Loader/Loader';

function Promote() {
  const email = JSON.parse(localStorage.getItem('all_data'))[0].email_id;
  const [service, setService] = useState('');
  const [frequency, setFrequency] = useState('');
  const [long, setLong] = useState('');
  // const [err, seterr] = useState(false);
  const [isLoader, setisLoader] = useState(true);
  // const [success, setSuccess] = useState(false);

  window.setTimeout(() => {
    setisLoader(false);
  }, 1000);
  function promoteHandler(e) {
    e.preventDefault();
    setisLoader(true);
    if (service.length > 2 && frequency.length > 2 && long.length > 2) {
      //('');
      axios
        .post(`${api}PromotionEm`, {
          what_service: service,
          how_frequent: frequency,
          how_long: long,
          email_id: email
        })
        .then((res) => {
          if (res.data.status == 'success') {
            //setSuccess('Promot updated successfully!!');
            NotificationManager.success('Promote updated successfully!!', 'Success', 3000);
            setisLoader(false);
          } else if (res.data.status == 'failed') {
            //seterr(res.data.error);
            NotificationManager.error(res.data.error, 'Error', 3000);
            setisLoader(false);
          } else {
            NotificationManager.error('Server Error', 'Error', 3000);
            setisLoader(false);
          }
          setLong('')
          setFrequency('')
          setService('')
        })
        .catch((err) => {
          NotificationManager.error('Whoops, looks like something went wrong', 'Error', 3000);
          setisLoader(false);
        });
    } else {
      if (long.length < 3) {
        NotificationManager.info('How Long You Want To Run Add, Requires More Than 2 Character', 'Alert', 3000);
      } else if (frequency.length < 3) {
        NotificationManager.info('Frequency To Show Add, Requires More Than 2 Character', 'Alert', 3000);
      } else if (service.length < 3) {
        NotificationManager.info('Product/service you are advertising, Required More Than 2 Character', 'Alert', 3000);

      } else {
        null
      }
      setisLoader(false);
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <Container className="mw-100 mh-100 mainLogin">
        {isLoader && <Loader />}
        <Row className="justify-content-center mainLogin">
          <Col className="mh-100 mt-xl-0 mt-xxl-5">
            <div className='row p-2'>
              <div className='col-1'>
                <ArrowLeftShort className="fs-1 m-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
              </div>
              <div className='col-10'>
                <Heading title="Promote" className='text-center text-decoration-underline fw-bold m-1' />
              </div>
            </div>

            {/*{err ? (*/}
            {/*  <div*/}
            {/*    className="alert alert-danger"*/}
            {/*    style={{ width: '50%', textAlign: 'center', marginLeft: '25%' }}>*/}
            {/*    {err}*/}
            {/*  </div>*/}
            {/*) : null}*/}

            {/*{success ? (*/}
            {/*  <div*/}
            {/*    className="alert alert-danger"*/}
            {/*    style={{ width: '50%', textAlign: 'center', marginLeft: '25%' }}>*/}
            {/*    {success}*/}
            {/*  </div>*/}
            {/*) : null}*/}

            <label className="offset-md-3 mt-4 fs-5 fw-light" style={{ paddingLeft: '5px' }}>
              How long will the ad run?
            </label>
            <div className="flex-column d-flex align-items-center mt-2">
              <input
                type="text"
                placeholder="Three days, one week, one month, etc."
                value={long}
                className="p-3 w-50 rounded loginInput w-100 border"
                onChange={(e) => setLong(e.target.value)}
              />
            </div>
            <label className="offset-md-3 mt-4 fs-5 fw-light" style={{ paddingLeft: '5px' }}>
              How frequently do you want it to show up on the app?
            </label>
            <div className="flex-column d-flex align-items-center mt-2">
              <input
                type="text"
                value={frequency}
                placeholder="Every day, once a week, etc."
                className="p-3 w-50 rounded loginInput w-100 border"
                onChange={(e) => setFrequency(e.target.value)}
              />
            </div>
            <label className="offset-md-3 mt-4 fs-5 fw-light" style={{ paddingLeft: '5px' }}>
              What is the product/service you are advertising?
            </label>
            <div className="flex-column d-flex align-items-center mt-2">
              <input
                type="text"
                value={service}
                placeholder="Add product/service"
                className="p-3 w-50 rounded loginInput w-100 border"
                onChange={(e) => setService(e.target.value)}
              />
            </div>

            <div className="text-center mt-xl-4 mt-4">
              <button
                className="loginButton p-3 w-50 rounded w-100 text-light fw-bold"
                onClick={(e) => promoteHandler(e)}>
                Promote
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Promote;
