import axios from 'axios';
import { useState } from 'react';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import '../../../assets/Styles/Styles.css';
import Heading from '../../../Components/Common/Heading';
import { api } from '../../../url';
import Loader from '../../Loader/Loader';

function ReportProblem() {
  const email = JSON.parse(localStorage.getItem('all_data'))[0].email_id;
  const [image, setImage] = useState('');
  const [description, setDesciption] = useState('');
  const [topic, setTopic] = useState('');
  const [isLoader, setisLoader] = useState(true);

  window.setTimeout(() => {
    setisLoader(false);
  }, 1000);
  function promoteHandler(e) {
    e.preventDefault();
    setisLoader(true);
    if (topic && description && image) {
      let data = new FormData();
      data.append('user_email', email);
      data.append('description', description);
      data.append('topic', topic);
      data.append('image', image);
      axios
        .post(`${api}add-feedback`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status == 'success') {
            NotificationManager.success('Problem has been reported', 'Success', 3000);
            setisLoader(false);
          } else if (res.data.status == 'failed') {
            NotificationManager.error(res.data.error, 'Error', 3000);
            setisLoader(false);
          }
          setDesciption('')
          setTopic('')
          setImage('')
          document.getElementById('file-input').value = ''
        })
        .catch((err) => {
          NotificationManager.error('Whoops, looks like something went wrong', 'Error', 3000);
          setisLoader(false);
        });
    } else {
      if (!topic) {
        NotificationManager.warning('Topic is required!', 'Warning', 3000);
      } else if (!description) {
        NotificationManager.warning('Description is required!', 'Warning', 3000);
      } else if (!image) {
        NotificationManager.warning('Image is required!', 'Warning', 3000);
      }
      setisLoader(false);
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <Container className="mw-100 mh-100 mainLogin" >
        {isLoader && <Loader />}
        <Row className="justify-content-center mainLogin p-4">
          <Col className="mh-100 mt-xl-0 mt-xxl-5">
            <div className='row m-0'>
              <div className='col-1 p-1'>
                <ArrowLeftShort className="fs-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
              </div>
              <div className='col-10'>
                <Heading title="Report Problem" className='text-center fw-bold m-2' />
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
              <label className=" text-start m-2 fw-light fs-5  w-100 " >
                Topic:
              </label>
            </div>
            <div className="flex-column d-flex align-items-center mt-2">
              <input
                type="text"
                required
                autoFocus
                placeholder="Type here"
                style={{ borderRadius: '2rem', border: '1px solid #f19c00' }}

                value={topic}
                className="p-3 w-100 rounded loginInput rp_100"
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className='d-flex align-items-center justify-content-center'>
              <label className="text-start m-2 fw-light fs-5  w-100 " >
                Description:
              </label>
            </div>
            <div className="flex-column d-flex align-items-center mt-2">
              <textarea
                value={description}
                required
                style={{ borderRadius: '2rem', border: '1px solid #f19c00' }}
                onChange={(e) => setDesciption(e.target.value)}
                placeholder="Start writing here"
                className="p-3 w-100 rounded"
                rows="10"></textarea>
              {/*/>*/}
            </div>
            <label className="offset-md-2 mt-3 mb-4" ></label>
            <div className="flex-column d-flex align-items-center text-center mb-4">
              <input className='form-control w-100' accept='image/*' type="file" id="file-input" required onChange={(e) => setImage(e.target.files[0])} />
            </div>


            {/*<div className="flex-column d-flex align-items-center mt-2">*/}
            {/*  */}
            {/*</div>*/}

            <div className="text-center mt-xl-4 mb-3">
              <button
                className="loginButton p-3 w-100 rounded rp_100 mb-3"
                onClick={(e) => promoteHandler(e)}>
                Report
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default ReportProblem;
