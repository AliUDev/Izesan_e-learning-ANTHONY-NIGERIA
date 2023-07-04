import { ArrowLeftShort } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GreenTick from '../../../assets/images/green_tick.png';
import RatingIcon from '../../../assets/images/rating.png';
import Verified from '../../../assets/images/verified.png';
// import LightGreenBtn from '../../../assets/images/light_green_btn.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NotificationManager } from 'react-notifications';
import { useParams } from 'react-router-dom';
import DownIcon from '../../../assets/images/ddown.png';
import { api, tutors } from '../../../url';
import Loader from '../../Loader/Loader';
import SelectUser from './SelectUser';
import TeachersSlider from './TeachersSlider';

import VideoChats from './VideoChats';

// function LiveClassesDetail(props) {
const LiveClassesDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(false);
  const [allData, setAllData] = useState([]);
  const [price, setPrice] = useState('25');
  //const [loginUserData, setLoginUserData] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const [dropdownItem, setDropdownItem] = useState('Private 1-on-1 class');
  const [timeSpanPopup, setTimeSpanPopup] = useState(false);
  // const [selectedSession, setSelectedSession] = useState('');
  const [err, setErr] = useState('');
  const [memberPopup, setMemberPopup] = useState(false);
  const [userIds, setuserIds] = useState('');
  const [messagePopup, setMessagePopup] = useState(false);
  const [msg, setMsg] = useState('');

  let id = params.id;
  useEffect(() => {
    getData();
    localStorage.setItem('price', 2500);
    // getUser();
  }, [id]);

  function getData() {
    setisLoader(true);
    axios
      .get(`${tutors}ViewTutors?email_id=${localStorage.getItem('email_id')}`)
      .then((res) => {
        if (res.data.status == 'success') {
          setAllData(res.data.data.data);
          setData(res.data.data.data[id]);
          setisLoader(false);
        }
      })
      .catch((err) => console.log(err));
  }

  // function getUser() {
  //   let email_id = localStorage.getItem('email_id');
  //   axios
  //     .get(`${api}ViewUserProfile?email_id=${email_id}&profile_id=${email_id}`)
  //     .then((res) => {
  //       setLoginUserData(res.data.data[0]);
  //     })
  //     .catch((err) => console.log(err));
  // }

  function loadNew(id) {
    // getData();
    // getUser();
    navigate('/live-classes/detail/' + id);
  }

  function submitHandler(e) {
    e.preventDefault();
    var sessionValue = localStorage.getItem('selectedSession');
    if (sessionValue) {
      setErr(false);
      setTimeSpanPopup(false);
      setMemberPopup(true);
    } else {
      setErr('Please Choose Session');
    }
  }

  function showCalender(e) {
    e.preventDefault();
    // if (
    //   dropdownItem == 'Private 1-on-1 class' ||
    //   dropdownItem == '30 minute trial lesson' ||
    //   dropdownItem == '5-hours Package'
    // ) {
    localStorage.setItem('dropdown_item', dropdownItem);
    localStorage.setItem('tutor_id', data['email_id']);
    localStorage.setItem('current_img', data['dp']);
    localStorage.removeItem('booking_type');
    localStorage.removeItem('bkId');
    navigate('/time-slots');
    //setShowCalenderPopup(true);
    // } else {
    //   if (selectedSession != '') {
    //     setSelectUserPopup(true);
    //   }
    // }
  }

  function postMessages(e) {
    e.preventDefault();
    let date = new Date();
    let timestamp = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    let fd = new FormData();
    fd.append('sender', localStorage.getItem('email_id'));
    fd.append('receiver', data.email_id);
    fd.append('message', msg ? msg : 'nil');
    fd.append('timestamp', timestamp);
    axios
      .post(`${api}Chatting`, fd)
      .then((res) => {
        axios
          .get(
            `${api}ChatHistory?email_id=${localStorage.getItem('email_id')}&chat_id=${res.data.chat_id
            }`
          )
          .then((res1) => {
            console.log(res1);
            NotificationManager.success('Message has been sent.', 'Success', 3000);
            console.log(res1.data.data.data[0]['c_m_id']);
            navigate('/inbox/' + res.data.chat_id + '/' + res1.data.data.data[0].c_m_id);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    <StyledBooking>
      {isLoader && <Loader />}
      <div className='row w-100'>
        <div className='col-lg-1 col-md-1 col-sm-1'>
          <ArrowLeftShort className="fs-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
        </div>
        <div className='col-lg-10 col-md-10 col-sm-10 text-center fs-3 fw-bold'>
          Live Classes
        </div>
      </div>

      <TeachersSlider allData={allData} loadNew={loadNew} activeId={id} />

      <div className="">
        <div className="section2 row w-auto m-0 p-10 text-center">
          <div className="booking-section col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="booking-section-1">
              <div className="qualities-box-container">
                <div className="qualities-box-image">
                  <div className="imgContainer">
                    <img src={Verified} />
                  </div>
                </div>
                <span>verified</span>
              </div>
              <div className="qualities-box-container">
                <div className="qualities-box-image">
                  <div className="rating-box">
                    {data['tutor_rating']}
                    <div className="imgContainer">
                      <img src={RatingIcon} />
                    </div>
                  </div>
                </div>
                <span>rating</span>
              </div>
              <div className="qualities-box-container">
                <div className="qualities-box-image">
                  <div className="license-box">
                    30
                    <div className="imgContainer">
                      <img src={GreenTick} />
                    </div>
                  </div>
                </div>
                <span>lessons</span>
              </div>
            </div>
            <h5 className='fs-5 m-1'>About Me</h5>
            <div className="detail-section">{data['description']}</div>
            <div className="classesType-section">
              <select
                onChange={(e) => {
                  const [option] = e.target.selectedOptions;
                  setDropdownItem(option.dataset.name);
                  var selectedSession = '';
                  if (option.dataset.name == 'One seat in a Group Class') {
                    //selectedSession = 'month';
                    setTimeSpanPopup(true);
                  } else {
                    localStorage.setItem('selectedSession', selectedSession);
                  }

                  localStorage.setItem('price', e.target.value * 100);
                  setPrice(e.target.value);
                }}
                className="form-select drop-section">
                <option
                  data-name="Private 1-on-1 class"
                  key="25"
                  value="25"
                  className="drop-option">
                  Private 1-on-1 class
                </option>
                <option data-name="5-hours Package" key="15" value="15">
                  5-hours Package
                </option>
                <option data-name="One seat in a Group Class" key="100" value="100">
                  One seat in a Group Class
                </option>
                <option data-name="30 minute trial lesson" key="10" value="10">
                  30 minute trial lesson
                </option>
              </select>
              <img src={DownIcon} className="down" />
            </div>
            <button type="button" onClick={(e) => showCalender(e)} className="booking-btn">
              <span className="text-white fw-bold">Book Now</span>
              <span className="fw-bold rate-ph">${price}/h</span>
            </button>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-5">
            <div className="">
              <video width="100%" height="auto" key={data['intro_video']} controls>
                {data['intro_video'] ? (
                  <source src={data['intro_video']} type="video/mp4"></source>
                ) : (
                  ''
                )}
              </video>
            </div>
            <Modal show={timeSpanPopup} onHide={timeSpanPopup}>
              <Modal.Header>
                <Modal.Title>Choose Session</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {err ? <div className="text-danger">{err}</div> : null}
                <div>
                  <div className="ask-session-body">
                    <div className="form-group">
                      <select
                        className="form-control font-weight-bold mt-4"
                        onChange={(e) => {
                          if (e.target.value == 'session') {
                            setPrice(10);
                            localStorage.setItem('price', 10 * 100);
                          } else {
                            setPrice(100);
                            localStorage.setItem('price', 100 * 100);
                          }
                          localStorage.setItem('selectedSession', e.target.value);
                        }}>
                        <option value="">Select Session-</option>
                        <option value="session">1 Session</option>
                        <option value="month">1 Month</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={(e) => submitHandler(e)}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={memberPopup} onHide={memberPopup}>
              <Modal.Header>
                <Modal.Title>Choose Members</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ height: '500px', overflowY: 'auto' }}>
                {err ? <div className="text-danger">{err}</div> : null}
                <SelectUser
                  memberPopup={memberPopup}
                  setMemberPopup={setMemberPopup}
                  setuserIds={setuserIds}
                />
              </Modal.Body>
            </Modal>

            <div className="video-section">
              {/*<img className="video-image" src={VideoLesson} />*/}

              <VideoChats />
            </div>
            <div className="form-group" style={{ paddingBottom: '10px' }}>
              {/* <InputEmoji
        value={msg}
        className="formMsg"
        onChange={(e) => setMsg(e.target.value)}
        cleanOnEnter
        // onEnter={sendMessage}
        placeholder="Type a message"
      /> */}
              <input
                className="form-control formMsg"
                type="text"
                required
                placeholder="Write Message"
                onChange={(e) => setMsg(e.target.value)}
              />
              <Button variant="btn btn-success " className={`w-100 msgBtn ${msg.length < 1 ? "disabled" : ""} `} onClick={(e) => postMessages(e)}>
                Send Message
              </Button>
            </div>
          </div>


        </div>
      </div>
    </StyledBooking>
  );
};
// width: calc(100vw - 620px);

const StyledBooking = styled.div`
text-transform: capitalized !important;
  margin: 10px 0px;
  padding: 8rem 1rem;
  overflow-x: hidden;
  .section2 {
    margin-top: 2rem;

    .booking-section {
      

      margin-top: 3rem;
      .booking-section-1 {
        padding: 1rem 0;
        border-top: 1px solid #d6d6d6;
        border-bottom: 1px solid #d6d6d6;
        display: flex;
        justify-content: space-around;

        .qualities-box-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          .qualities-box-image {
            height: 25px;
            display: flex;
            flex-direction: row;
            .imgContainer {
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }

        .verified-section {
        }
        .rating-section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .license-section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .license-box {
          display: flex;
          align-items: center;
          flex-direction: row;
          .imgContainer {
            margin-left: 0.2rem;
          }
        }
        .rating-box {
          display: flex;
          flex-direction: row;
          color: #f19c00;
        }
        .verified-section img {
          object-fit: contain;
        }
        .rating-section img {
          object-fit: contain;
        }
        .license-section img {
          object-fit: contain;
          align-items: flex-end;
        }
      }
    }

    .message-btn {
      background-color: #bde1cc !important;
      color: #489a6b;
      width: 100%;
      text-align: center;
      outline: 0;
      border: 0;
      border-radius: 8px;
      padding: 0.6rem 0;
      margin: 2rem 0;
    }

    .detail-section {
      display: flex;

      font-size: 11px;
      padding: 2rem 0;
      border-top: 1px solid #d6d6d6;
      border-bottom: 1px solid #d6d6d6;
      color: #8f8f8f;
    }
.formMsg{
  margin: 13px 0;
}
.msgBtn{
  margin: 22px 0;
}
    .classesType-section {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin: 2rem 0;
      .drop-section {
        width: 100%;
        background: transparent;
        cursor: pointer;
      }
      .option {
        font-size: 12px !important;
        font-weight: 600 !important;
      }
      .down {
        position: absolute;
        right: 10px;
        top: 10px;
        pointer-events: none;
      }
    }

    .booking-btn {
      border: 0px;
      padding: 8px;
      border-radius: 4px;
      background-color: #489a6b;
      width: 100%;
      display: flex;
      justify-content: space-between;

      .rate-ph {
        color: #f19c00;
      }
    }

    .video-section {
      /* width: 60%; */
      display: flex;
      justify-content: space-evenly;
      position: relative;
      overflow: hidden;
      .video-image {
        height: 100%;
        width: 100%;
      }
    }
    .message-section {
      padding: 0.5rem;
      margin-top: 3rem;
      border-radius: 10px;
      box-shadow: 1px 2px 6px 1px #00000029;
      display: flex;
      align-items: center;
      .smile {
        width: 24px;
      }
      .input {
        flex: 1;
        border: 0;
        margin: 0 0.5rem;
        padding: 0 0.5rem;
        background: transparent;
      }
      .send {
        width: 48px;
      }
    }
  }

  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
 
`;

export default LiveClassesDetail;
