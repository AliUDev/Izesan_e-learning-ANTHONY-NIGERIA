import axios from 'axios';
import { useEffect, useState } from 'react';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GreyPic from '../../../assets/images/gray_pic.png';
import ProfileImage from '../../../assets/images/profile_image.png';
import Heading from '../../../Components/Common/Heading';
import { api, img } from '../../../url';
import Loader from '../../Loader/Loader';
import ViewSlots from '../ViewTimeSlots/ViewSlots';

function Booking() {
  const [headValue, setheadValue] = useState('pending');
  const [isLoader, setisLoader] = useState(false);
  const [data, setData] = useState(false);
  const [err1, setErr1] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const [timeSlots, setTimeSlots] = useState(false);
  useEffect(() => {
    setisLoader(true);
    setData(false);
    getBookings();
    console.log('booking for tuitor');
  }, []);

  function getBookings() {
    axios
      .get(`${api}ViewBookingsTutor?tutor_id=${localStorage.getItem('email_id')}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data.status == 'success') {
          setisLoader(false);
          setData(res.data.data);
        } else {
          setisLoader(false);
          setErr1(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  }

  function calculateRemainingSession(sessions, package_name) {
    if (package_name == '1on1') {
      return 1 - sessions;
    } else if (package_name == '5hour') {
      return 5 - sessions;
    } else if (package_name == 'group') {
      return 30 - sessions;
    } else if (package_name == 'trial') {
      return 1 - sessions;
    }
  }

  function tutorStatusHandler(e, status, booking_id, amount) {
    e.preventDefault();
    setisLoader(true);
    function body() {
      let body;
      if (status == 'Accepted') {
        body = {
          booking_id,
          status
        };
      } else if (status == 'Rejected') {
        body = {
          booking_id,
          status,
          koobo: amount
        };
      }
      return body;
    }
    axios
      .post(`${api}TutorBookingAccept  `, body())
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 'success') {
          getBookings();
          if (status == 'Accepted') {
            setErr1('you have accepted this slot!!');
            getBookings();
            setisLoader(false);
            setTimeout(() => {
              setErr1(false);
            }, 3000);
          } else if (status == 'Rejected') {
            setErr1('Tutor has rejected the booking!!');
            getBookings();
            setisLoader(false);
            setTimeout(() => {
              setErr1(false);
            }, 3000);
          }
        } else {
          setErr1('your request not complete');
          setisLoader(false);
          setTimeout(() => {
            setErr1(false);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          setisLoader(false);
          setErr1('Firewall OR Network Error!!');
          setTimeout(() => {
            setErr1(false);
          }, 3000);
        }
      });
  }
  console.log(data);
  const [initialProgressState] = useState([
    {
      id: 1,
      state: 'Pending',
      keyname: 'pending',
      completed: true
    },
    {
      id: 2,
      state: 'Scheduled',
      keyname: 'scheduled',
      completed: false
    },
    {
      id: 3,
      state: 'Completed',
      keyname: 'completed',
      completed: false
    }
  ]);
  const [progressState, setProgressState] = useState(initialProgressState);

  function changeState(item) {
    setheadValue(item.keyname);
    const newState = progressState.map((obj) => {
      if (obj.id === item.id) {
        return { ...obj, completed: true };
      } else {
        return { ...obj, completed: false };
      }
    });

    setProgressState(newState);
  }
  const navigate = useNavigate()
  return (
    <StyledBooking>
      {isLoader && <Loader />}
      <div className="row m-1">
        <div className='col-1'>
          <ArrowLeftShort className="fs-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
        </div>
        <div className='col-10'>
          <Heading title="Bookings" className='text-center m-1 text-decoration-underline fw-bold' />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <div className="d-flex progess-container w-50 justify-content-between">
          <div className="dotted-line"></div>
          {progressState?.map((item) => {
            return (
              <ProgressStyle
                style={{ cursor: 'pointer' }}
                key={item.id}
                completed={item.completed}
                onClick={() => changeState(item)}>
                <p>{item.id}</p>
                <span>{item.state}</span>
              </ProgressStyle>
            );
          })}
        </div>
      </div>
      {err1 ? <div className="alert alert-danger">{err1}</div> : null}
      <div className="d-flex flex-row flex-wrap justify-content-evenly mt-4">
        {data && data.length > 0 && headValue == 'pending' ? (
          <>
            {data.map((item) => {
              return (
                <>
                  {(item.tutor_req_st == 'pending' && item.booking_status != 'cancelled') ||
                    (item.booking_status == null &&
                      item.status == 'pending' &&
                      item.booking_status != 'rescheduled') ? (
                    <StyledDiv
                      key={item.id}
                      className="col-12 col-sm-6 col-md-4 d-flex justify-content-center my-3 px-2">
                      <div className="content">
                        <div className="section1">
                          {item.tutor_dp ? (
                            <img
                              style={{ objectFit: 'cover' }}
                              src={`${img}${item.tutor_dp}`}
                              alt=""
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = GreyPic;
                              }}
                            />
                          ) : (
                            <img
                              style={{ objectFit: 'cover' }}
                              src={ProfileImage}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = GreyPic;
                              }}
                            />
                          )}

                          <div className="detail">
                            <span className="fw-bold font-roboto title">{item.tutor_name}</span>
                            <span className="fw-lighter font-roboto date">
                              Date: {item.starting_date}
                            </span>
                          </div>
                        </div>
                        <div className="section2">
                          <div className="sec-left">
                            <span className="title">{item.package}</span>
                            <span className="fw-bold mt-2">Sessions</span>
                            <span className="font-fade">
                              Remaining:{' '}
                              {calculateRemainingSession(item.no_of_sessions, item.package)}
                            </span>
                            <span className="font-fade">Completed: {item.no_of_sessions}</span>
                          </div>
                          <div className="sec-right">
                            <span
                              className="fw-bold"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setShowSlots(true);
                                setTimeSlots(item.timeslot_time);
                              }}>
                              View Slots
                            </span>
                            <button
                              className="reject btn my-1 px-4"
                              onClick={(e) =>
                                tutorStatusHandler(e, 'Rejected', item.bk_id, item.amount)
                              }>
                              Reject
                            </button>
                            <button
                              className="accept btn my-1 px-4"
                              onClick={(e) => tutorStatusHandler(e, 'Accepted', item.bk_id)}>
                              Accept
                            </button>
                          </div>
                        </div>
                        <div className="section3 text-decoration-underline font-roboto">
                          Invited By:{' '}
                          <span className="cursor-pointer linky">{item.invited_by_name}</span>
                        </div>
                      </div>
                    </StyledDiv>
                  ) : null}
                </>
              );
            })}
          </>
        ) : null}

        {data && data.length > 0 && headValue == 'scheduled' ? (
          <>
            {data.map((item) => {
              return (
                <>
                  {item.booking_status == null &&
                    item.status == 'paid' &&
                    item.booking_status != 'rescheduled' &&
                    item.tutor_req_st == 'Accepted' ? (
                    <StyledDiv
                      key={item.id}
                      className="col-12 col-sm-6 col-md-4 d-flex justify-content-center my-3 px-2">
                      <div className="content">
                        <div className="section1">
                          {item.tutor_dp ? (
                            <img
                              style={{ objectFit: 'cover' }}
                              src={`${img}${item.tutor_dp}`}
                              alt=""
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = GreyPic;
                              }}
                            />
                          ) : (
                            <img
                              style={{ objectFit: 'cover' }}
                              src={ProfileImage}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = GreyPic;
                              }}
                            />
                          )}

                          <div className="detail">
                            <span className="fw-bold font-roboto title">{item.tutor_name}</span>
                            <span className="fw-lighter font-roboto date">
                              Date: {item.starting_date}
                            </span>
                          </div>
                        </div>
                        <div className="section2">
                          <div className="sec-left">
                            <span className="title">{item.package}</span>
                            <span className="fw-bold mt-2">Sessions</span>
                            <span className="font-fade">
                              Remaining:{' '}
                              {calculateRemainingSession(item.no_of_sessions, item.package)}
                            </span>
                            <span className="font-fade">Completed: {item.no_of_sessions}</span>
                          </div>
                          <div className="sec-right">
                            <span
                              className="fw-bold"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setShowSlots(true);
                                setTimeSlots(item.timeslot_time);
                              }}>
                              View Slots
                            </span>
                          </div>
                        </div>
                        <div className="section3 text-decoration-underline font-roboto">
                          Invited By:{' '}
                          <span className="cursor-pointer linky">{item.invited_by_name}</span>
                        </div>
                      </div>
                    </StyledDiv>
                  ) : null}
                </>
              );
            })}
          </>
        ) : null}

        {data && data.length > 0 && headValue == 'completed' ? (
          <>
            {data.map((item) => {
              return (
                <>
                  {item.booking_status == 'complete' &&
                    item.status == 'pending' &&
                    item.booking_status != 'rescheduled' &&
                    item.tutor_req_st == 'Accepted' ? (
                    <StyledDiv
                      key={item.id}
                      className="col-12 col-sm-6 col-md-4 d-flex justify-content-center my-3 px-2">
                      <div className="content">
                        <div className="section1">
                          {item.tutor_dp ? (
                            <img
                              style={{ objectFit: 'cover' }}
                              src={`${img}${item.tutor_dp}`}
                              alt=""
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = GreyPic;
                              }}
                            />
                          ) : (
                            <img
                              style={{ objectFit: 'cover' }}
                              src={ProfileImage}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = GreyPic;
                              }}
                            />
                          )}

                          <div className="detail">
                            <span className="fw-bold font-roboto title">{item.tutor_name}</span>
                            <span className="fw-lighter font-roboto date">
                              Date: {item.starting_date}
                            </span>
                          </div>
                        </div>
                        <div className="section2">
                          <div className="sec-left">
                            <span className="title">{item.package}</span>
                            <span className="fw-bold mt-2">Sessions</span>
                            <span className="font-fade">
                              Remaining:{' '}
                              {calculateRemainingSession(item.no_of_sessions, item.package)}
                            </span>
                            <span className="font-fade">Completed: {item.no_of_sessions}</span>
                          </div>
                          <div className="sec-right">
                            <span className="fw-bold">View Slots</span>
                            <button className="accept btn my-1 px-4">Session Completed</button>
                          </div>
                        </div>
                        <div className="section3 text-decoration-underline font-roboto">
                          Invited By:{' '}
                          <span className="cursor-pointer linky">{item.invited_by_name}</span>
                        </div>
                      </div>
                    </StyledDiv>
                  ) : null}
                </>
              );
            })}
          </>
        ) : null}
        <Modal show={showSlots} onHide={showSlots}>
          <Modal.Header>
            <Modal.Title>View Slots</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewSlots showSlots={showSlots} timeSlots={timeSlots} />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-warning" onClick={() => setShowSlots(false)}>
              Close{' '}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </StyledBooking>
  );
}

const StyledBooking = styled.div`
  padding: 2rem 1rem;
  .progess-container {
    max-width: 480px;
    min-width: 310px;
    position: relative;
  }
  .dotted-line {
    position: absolute;
    border: 2px dashed #489a6b;
    width: 80%;
    margin-top: 1rem;
    left: 42px;
  }
  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;
const ProgressStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5%;
  z-index: 2;
  p {
    all: initial;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    padding: 10px;
    background: ${(props) => (props.completed ? '#489A6B' : '#FFFFFF')};
    font: 16px/19px Roboto;
    /* border: 3px solid #000; */
    color: ${(props) => (props.completed ? '#FFFFFF' : '#489A6B')};
    border: #489a6b 1px solid;

    text-align: center;
    /* font: 32px Arial, sans-serif; */
  }
  span {
    text-align: left;
    font: normal normal medium 16px/19px Roboto;
    letter-spacing: 0px;
    color: #489a6b;
    margin-top: 0.5rem;
    opacity: 1;
  }
`;
const StyledDiv = styled.div`
  min-width: 230px;
  .content {
    padding: 1rem 1rem;
    max-width: 377px;
    background-color: white;
    border-radius: 25px;
    /* padding: 10px; */
    box-shadow: 0px 3px 6px #00000029;
    @media (min-width: 1400px) {
      /* padding: 2rem; */
      padding-bottom: 1rem;
    }
  }
  .section1 {
    display: flex;
    flex-direction: row;
  }
  .section1 img {
    border-radius: 50%;
    width: 65px;
    height: 65px;
  }
  .section1 .detail {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 20px;
    }
    .date {
      font-size: 12px;
      color: #8f8f8f;
    }
  }
  .section2 {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .section2 .sec-left {
    display: flex;
    flex-direction: column;
    .title {
      color: #636668;
      font-size: 14px;
    }
    .font-fade {
      color: #8f8f8f;
      font-size: 14px;
    }
  }
  .section2 .sec-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .section3 {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .linky {
      color: #0076c5;
    }
  }
  .reject {
    background: #f19c00;
    border-radius: 22px;
    border: 0px;
    color: white;
  }
  .accept {
    background: #489a6b;
    border-radius: 22px;
    border: 0px;
    color: white;
  }
  .sec-right .fw-bold {
    color: #489a6b;
  }
`;

export default Booking;
