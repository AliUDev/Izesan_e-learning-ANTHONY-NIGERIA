import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import '../../../assets/Styles/Styles.css';
import { api } from '../../../url';
import axios from 'axios';

function Tutor() {
  const email = JSON.parse(localStorage.getItem('all_data'))[0].email_id;
  const [service, setService] = useState('');
  const [frequency, setFrequency] = useState('');
  const [long, setLong] = useState('');
  const [err, seterr] = useState(false);
  const [success, setSuccess] = useState(false);

  function promoteHandler(e) {
    e.preventDefault();
    if (service && frequency && long) {
      seterr('');
      axios
        .post(`${api}Contact`, {
          what_service: service,
          how_frequent: frequency,
          how_long: long,
          email_id: email
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status == 'success') {
            setSuccess('Promot updated successfully!!');
          } else if (res.data.status == 'failed') {
            seterr(res.data.error);
          }
        })
        .catch((err) => console.log(err));
    } else {
      seterr('Please fill all form fields');
    }
  }

  return (
    <>
      <Container className="mw-100 mh-100 mainLogin">
        <Row className="justify-content-center mainLogin">
          <Col className="mh-100 mt-xl-0 mt-xxl-5">
            <h1 className="loginName text-center">Promote</h1>
            {err ? (
              <div
                className="alert alert-danger"
                style={{ width: '50%', textAlign: 'center', marginLeft: '25%' }}>
                {err}
              </div>
            ) : null}

            {success ? (
              <div
                className="alert alert-danger"
                style={{ width: '50%', textAlign: 'center', marginLeft: '25%' }}>
                {success}
              </div>
            ) : null}

            <label className="offset-md-3 mt-4" style={{ paddingLeft: '20px' }}>
              How long will the ad run?
            </label>
            <div className="flex-column d-flex align-items-center mt-2">
              <input
                type="text"
                placeholder="Three days, one week, one month, etc."
                value={long}
                className="p-3 w-50 rounded-pill loginInput"
                onChange={(e) => setLong(e.target.value)}
              />
            </div>
            <label className="offset-md-3 mt-4" style={{ paddingLeft: '20px' }}>
              How frequently do you want it to show up on the app?
            </label>
            <div className="flex-column d-flex align-items-center mt-2">
              <input
                type="text"
                value={frequency}
                placeholder="Every day, once a week, etc."
                className="p-3 w-50 rounded-pill loginInput"
                onChange={(e) => setFrequency(e.target.value)}
              />
            </div>
            <label className="offset-md-3 mt-4" style={{ paddingLeft: '20px' }}>
              What is the product/service you are advertising?
            </label>
            <div className="flex-column d-flex align-items-center mt-2">
              <input
                type="text"
                value={service}
                placeholder="Add product/service"
                className="p-3 w-50 rounded-pill loginInput"
                onChange={(e) => setService(e.target.value)}
              />
            </div>

            <div className="text-center mt-xl-4">
              <button
                className="loginButton p-3 w-50 rounded-pill"
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
export default Tutor;
