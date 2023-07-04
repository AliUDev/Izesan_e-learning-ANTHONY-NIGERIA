import axios from 'axios';
import { useEffect, useState } from 'react';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GreyPic from '../../../assets/images/gray_pic.png';
import ProfileImage from '../../../assets/images/profile_image.png';
import Heading from '../../../Components/Common/Heading';
import { api, img } from '../../../url';
import Loader from '../../Loader/Loader';
import Koboos from '../ViewTimeSlots/koboos';
import Refund from '../ViewTimeSlots/refund';
import ViewSlots from '../ViewTimeSlots/ViewSlots';

function UserBooking() {
  const [headValue, setheadValue] = useState('pending');
  const [isLoader, setisLoader] = useState(false);
  const [data, setData] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const [timeSlots, setTimeSlots] = useState(false);
  const [reqBodyAlertComponent, setReqBodyAlertComponent] = useState({});
  const [bkId, setbkId] = useState('');
  // const [err, setErr] = useState(false);
  const [count, setCount] = useState(0);
  const [refundPopup, setRefundPopup] = useState(false);
  const [dataSendToRefund, setdataSendToRefund] = useState({});
  // const [showCalenderPopup, setShowCalenderPopup] = useState(false);
  const [dataToBookingCalender, setDataToBookingCalender] = useState({});
  const [loginUserData, setLoginUserData] = useState(false);
  // const [paymentPopup, setPaymentPopup] = useState(false);
  const [koboosPopup, setKoboosPopup] = useState(false);

  const navigate = useNavigate();
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

  useEffect(() => {
    setisLoader(true);
    setData(false);
    getBookings();
    //loginUser();
    console.log('booking for user');
  }, []);

  function loginUser() {
    axios
      .get(
        `${api}ViewUserProfile?email_id=${localStorage.getItem(
          'email_id'
        )}&profile_id=${localStorage.getItem('email_id')}`
      )
      .then((res) => {
        setLoginUserData(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  }

  function getBookings() {
    loginUser();
    setisLoader(true);
    setRefundPopup(false);
    axios
      .get(`${api}ViewBookings?email_id=${localStorage.getItem('email_id')}`)
      .then((res) => {
        if (res.data.status == 'success') {
          setisLoader(false);
          setData(res.data.data);
          console.log(res.data.data);
          let filter_group_data = res.data.data.filter(
            (t) => t.booking_type == 'group' && t.status == 'pending'
          );
          filter_group_data.map((d) => {
            console.log(d);
            axios
              .post(`${api}VerifyPaymentStatus`, { bk_id: d.bk_id })
              .then(() => {
                // console.log(res.data);
              })
              .catch((err) => console.log(err));
          });
        } else {
          setisLoader(false);
          NotificationManager.error('no content found!!', 'Error', 3000);
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

  function pendingHandler(e) {
    e.preventDefault();
    NotificationManager.error('first accept this booking in notifications!!', 'Error', 3000);
  }

  function getConvertTime(dataTime) {
    let utcTime1 = dataTime.split(',')[1].split('|')[0].split('-')[0];
    let utcTime2 = dataTime.split(',')[1].split('|')[0].split('-')[1];
    let utcDt = dataTime.split(',')[1].split('|')[1];
    // 02:00 pm-03:00 pm|2021-09-29
    function convertUtcToLocalTime(time, dait) {
      let dat1e = new Date(`${dait} ${time} UTC`);
      return dat1e.toLocaleString();
    }
    let c_t_1 = convertUtcToLocalTime(utcTime1, utcDt).split(',')[1];
    let c_t_2 = convertUtcToLocalTime(utcTime2, utcDt).split(',')[1];
    let [n, t, s] = c_t_1.split(':');
    let [n1, t1, s1] = c_t_2.split(':');
    function convertToSmall(modifier) {
      let t;
      if (modifier == 'AM') {
        t = 'am';
      } else if (modifier == 'PM') {
        t = 'pm';
      }
      return t;
    }
    let f_t_1 = `${n < 10 ? '0' + n.replace(/\s/g, '') : n.replace(/\s/g, '')
      }:${t} ${convertToSmall(s.split(' ')[1])}`;
    let f_t_2 = `${n1 < 10 ? '0' + n1.replace(/\s/g, '') : n1.replace(/\s/g, '')
      }:${t1} ${convertToSmall(s1.split(' ')[1])}`;
    let total_final_time = `${f_t_1}-${f_t_2}`;
    return total_final_time;
  }

  function sessionHandler(
    e,
    session,
    bk_id,
    session_start,
    booking_type,
    pkg,
    timespan,
    bks_id,
    timeslot
  ) {
    e.preventDefault();
    let d = new Date();
    let dt = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    let m = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    let currentDt = `${d.getFullYear()}-${m}-${dt}`;
    let storeTime = timeslot?.filter((t) => {
      if (t.taken == 0) {
        return t.time;
      }
    });
    // console.log(storeTime[0].time.split(',')[1].split('|'));

    let getTime = storeTime[0].time.split('-')[0];
    function convertTime12to24(time12h) {
      const [time, modifier] = time12h.split(' ');
      let [hours, minutes] = time.split(':');

      if (hours === '12') {
        hours = '00';
      }

      if (modifier === 'pm') {
        hours = parseInt(hours, 10) + 12;
      }

      return `${hours}:${minutes}`;
    }
    var convertedTime = convertTime12to24(getTime);
    var hr = convertedTime.split(':')[0];
    var mi = 0;
    var sec = 0;
    var d1 = new Date();
    d1.setHours(hr);
    d1.setMinutes(mi);
    d1.setSeconds(sec);
    //to compare with the current time
    var d2 = new Date();
    if (session == 'start') {
      if (currentDt == session_start) {
        if (d2 < d1) {
          NotificationManager.success(
            `Your session starting at ${getConvertTime(storeTime[0].time)} today!!`,
            'Success',
            3000
          );
        } else {
          function body() {
            let body;
            if (session == 'start') {
              body = {
                bk_id,
                session_start,
                booking_status: 'nil',
                booking_type,
                token: localStorage.getItem('email_id'),
                day: '1',
                package: pkg,
                timespan,
                bks_id: bks_id == null ? 'nil' : bks_id
              };
            }
            return body;
          }
          axios
            .post(`${api}BookingSession`, body())
            .then((res) => {
              if (res.data.status == 'success') {
                setisLoader(false);
                NotificationManager.success('Session has been started!', 'Success', 3000);
                getBookings();
              } else {
                setisLoader(false);
                NotificationManager.error('your request not complete', 'Error', 3000);
              }
            })
            .catch((err) => {
              console.log(err);
              if (err) {
                setisLoader(false);
                NotificationManager.error('Firewall OR Network Error!!', 'Error', 3000);
              }
            });
        }
      } else if (currentDt < session_start) {
        NotificationManager.error('no session today!!', 'Error', 3000);
      } else if (currentDt > session_start) {
        NotificationManager.error('session time passed!!', 'Error', 3000);
      }
    } else if (session == 'end') {
      let body = {
        bk_id,
        session_end: session_start,
        booking_status: 'nil',
        booking_type,
        token: localStorage.getItem('email_id'),
        day: '1',
        package: pkg,
        timespan,
        bks_id: bks_id == null ? 'nil' : bks_id,
        ts_id: storeTime[0].ts_id
      };
      axios
        .post(`${api}BookingSession`, body)
        .then((res) => {
          console.log(res.data);
          if (res.data.status == 'success') {
            setisLoader(false);
            NotificationManager.success('Session has been ended!', 'Success', 3000);
            getBookings();
          } else {
            setisLoader(false);
            NotificationManager.error('your request not complete', 'Error', 3000);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            setisLoader(false);
            NotificationManager.error('Firewall OR Network Error!!', 'Error', 3000);
          }
        });
    }
  }

  function payHandler(e, pkg, amount, bk_id, details) {
    e.preventDefault();
    setKoboosPopup(true);
    setbkId(bk_id);
    setReqBodyAlertComponent({
      price: amount,
      item: items()
    });
    setDataToBookingCalender({
      l_id: details.learner_id,
      session_s: sessionSelected(),
      tsIds: details.timeslot_id
    });
    function items() {
      var t;
      if (details.package == '1on1') {
        t = 'Private 1-on-1 class';
      } else if (details.package == '5hour') {
        t = '5-hours Package';
      } else if (details.package == 'group') {
        t = 'One seat in a Group Class';
      } else if (details.package == 'trial') {
        t = '30 minute trial lesson';
      }
      return t;
    }
    function sessionSelected() {
      var t;
      if (details.timespan == 1) {
        t = 'session';
      } else if (details.timespan == 30) {
        t = 'month';
      }
      return t;
    }
  }

  function refundHandler(e, dt) {
    e.preventDefault();
    // console.log(dt.timespan);
    setRefundPopup(true);
    setdataSendToRefund({
      bk_id: dt.bk_id,
      t_slot: dt.timeslot_time,
      time_span: dt.timespan
    });
  }

  function rescheduleHandler(e, details) {
    e.preventDefault();
    // console.log(details);
    function items() {
      var t;
      if (details.package == '1on1') {
        t = 'Private 1-on-1 class';
      } else if (details.package == '5hour') {
        t = '5-hours Package';
      } else if (details.package == 'group') {
        t = 'One seat in a Group Class';
      } else if (details.package == 'trial') {
        t = '30 minute trial lesson';
      }
      return t;
    }
    function sessionSelected() {
      var t;
      if (details.timespan == 1) {
        t = 'session';
      } else if (details.timespan == 30) {
        t = 'month';
      }
      return t;
    }
    setDataToBookingCalender({
      t_id: details.tutor_id,
      item: items(),
      price: details.amount,
      l_id: details.learner_id,
      session_s: sessionSelected(),
      bkId: details.bk_id
    });

    localStorage.setItem('dropdown_item', items());
    localStorage.setItem('tutor_id', details.tutor_id);
    localStorage.setItem('price', details.amount);
    localStorage.setItem('userIds', details.learner_id);
    localStorage.setItem('selectedSession', sessionSelected());
    localStorage.setItem('bkId', details.bk_id);
    localStorage.setItem('booking_type', 'reschadule');
    localStorage.setItem('payment_status', details.payment_st);

    navigate('/time-slots');
    // setShowCalenderPopup(true);
  }

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
      {/*{err ? <div className="alert alert-danger">{err}</div> : null}*/}
      <div className="d-flex flex-row flex-wrap justify-content-evenly mt-4">
        {data && data.length > 0 && headValue == 'pending' ? (
          <>
            {data.map((item, index) => {
              let d = new Date();
              let dt = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
              let m = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
              let currentDt = `${d.getFullYear()}-${m}-${dt}`;
              return (
                <>
                  {(item.tutor_req_st == 'pending' && item.booking_status != 'rescheduled') ||
                    (item.booking_status == null &&
                      item.status == 'pending' &&
                      item.booking_status != 'rescheduled') ? (
                    <>
                      {item.package == 'group'
                        ? item.learners?.map((f) => {
                          return (
                            <>
                              {f.learner_id == localStorage.getItem('email_id') ? (
                                <>
                                  <StyledDiv
                                    key={index}
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
                                          <span className="fw-bold font-roboto title">
                                            {item.tutor_name}
                                          </span>
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
                                            {calculateRemainingSession(
                                              item.no_of_sessions,
                                              item.package
                                            )}
                                          </span>
                                          <span className="font-fade">
                                            Completed: {item.no_of_sessions} {item.bk_id}
                                          </span>
                                        </div>
                                        <div className="sec-right">
                                          {f.status == 'Accepted' ? (
                                            <>
                                              {item.tutor_req_st == 'pending' &&
                                                f.payment_st != 0 ? (
                                                <>
                                                  {item.booking_status != 'cancelled' ? (
                                                    <>
                                                      {item.session_start == null &&
                                                        item.session_end == null ? (
                                                        <button
                                                          className="accept btn my-1 px-4"
                                                          onClick={() =>
                                                            NotificationManager.error(
                                                              'Tutor not accepted this Slot!!',
                                                              'Error',
                                                              3000
                                                            )
                                                          }>
                                                          Start Session
                                                        </button>
                                                      ) : null}
                                                      {item.session_start != null &&
                                                        item.session_end == null ? (
                                                        <button
                                                          className="accept btn my-1 px-4"
                                                          onClick={() =>
                                                            NotificationManager.success(
                                                              'Tutor not accepted this Slot!!',
                                                              'Success',
                                                              3000
                                                            )
                                                          }>
                                                          End Session
                                                        </button>
                                                      ) : null}
                                                    </>
                                                  ) : (
                                                    <button
                                                      className="accept btn my-1 px-4"
                                                      onClick={(e) => rescheduleHandler(e, item)}>
                                                      Reschedule
                                                    </button>
                                                  )}
                                                </>
                                              ) : (
                                                <>
                                                  {item.payment_st != 0 &&
                                                    item.status == 'pending' ? (
                                                    <button
                                                      className="accept btn my-1 px-4"
                                                      onClick={() =>
                                                        NotificationManager.error(
                                                          'payment or acceptance not done by all members!!',
                                                          'Error',
                                                          3000
                                                        )
                                                      }>
                                                      Pay
                                                    </button>
                                                  ) : (
                                                    <>
                                                      {f.payment_st == 0 ? (
                                                        <>
                                                          {currentDt > item.starting_date ? (
                                                            <button
                                                              className="accept btn my-1 px-4"
                                                              onClick={() =>
                                                                NotificationManager.error(
                                                                  'booking has passed its session date.',
                                                                  'Error',
                                                                  3000
                                                                )
                                                              }>
                                                              Pay
                                                            </button>
                                                          ) : (
                                                            <>
                                                              {item.booking_status !=
                                                                'cancelled' ? (
                                                                <>
                                                                  {f.payment_st == 0 &&
                                                                    item.tutor_req_st ==
                                                                    'pending' ? (
                                                                    <button
                                                                      className="accept btn my-1 px-4"
                                                                      onClick={() =>
                                                                        NotificationManager.error(
                                                                          'Tutor not accepted this slot!!',
                                                                          'Error',
                                                                          3000
                                                                        )
                                                                      }>
                                                                      Pay
                                                                    </button>
                                                                  ) : (
                                                                    <button
                                                                      className="accept btn my-1 px-4"
                                                                      onClick={(e) =>
                                                                        payHandler(
                                                                          e,
                                                                          item.package,
                                                                          item.amount,
                                                                          item.bk_id,
                                                                          item
                                                                        )
                                                                      }>
                                                                      Pay
                                                                    </button>
                                                                  )}
                                                                </>
                                                              ) : (
                                                                <button
                                                                  className="accept btn my-1 px-4"
                                                                  onClick={(e) =>
                                                                    rescheduleHandler(e, item)
                                                                  }>
                                                                  Reschedule
                                                                </button>
                                                              )}
                                                            </>
                                                          )}
                                                        </>
                                                      ) : (
                                                        <>
                                                          {item.tutor_req_st == 'pending' ? (
                                                            <>
                                                              {item.session_start == null &&
                                                                item.session_end == null ? (
                                                                <button
                                                                  className="accept btn my-1 px-4"
                                                                  onClick={() =>
                                                                    NotificationManager.error(
                                                                      'Tutor not accepted this slot!!',
                                                                      'Error',
                                                                      3000
                                                                    )
                                                                  }>
                                                                  Start Session
                                                                </button>
                                                              ) : null}
                                                              {item.session_start != null &&
                                                                item.session_end == null ? (
                                                                <button
                                                                  className="accept btn my-1 px-4"
                                                                  onClick={() =>
                                                                    NotificationManager.error(
                                                                      'Tutor not accepted this slot!!',
                                                                      'Error',
                                                                      3000
                                                                    )
                                                                  }>
                                                                  End Session
                                                                </button>
                                                              ) : null}
                                                            </>
                                                          ) : null}
                                                        </>
                                                      )}
                                                    </>
                                                  )}
                                                </>
                                              )}

                                              <button
                                                className="reject btn my-1 px-4"
                                                style={{ marginTop: '3px' }}
                                                onClick={() => {
                                                  setShowSlots(true);
                                                  setTimeSlots(item.timeslot_time);
                                                }}>
                                                View Slots
                                              </button>
                                            </>
                                          ) : null}
                                          {f.status == 'pending' ? (
                                            <>
                                              {item.payment_st == 0 ? (
                                                <button
                                                  className="accept btn my-1 px-4"
                                                  onClick={(e) => pendingHandler(e)}>
                                                  Pay {item.bk_id}
                                                </button>
                                              ) : (
                                                <>
                                                  {item.session_start == null &&
                                                    item.session_end == null ? (
                                                    <button
                                                      className="accept btn my-1 px-4"
                                                      onClick={() =>
                                                        NotificationManager.error(
                                                          'Tutor not accepted this slot!!',
                                                          'Error',
                                                          3000
                                                        )
                                                      }>
                                                      Start Session
                                                    </button>
                                                  ) : null}
                                                  {item.session_start != null &&
                                                    item.session_end == null ? (
                                                    <button
                                                      className="accept btn my-1 px-4"
                                                      onClick={() =>
                                                        NotificationManager.error(
                                                          'Tutor not accepted this slot!!',
                                                          'Error',
                                                          3000
                                                        )
                                                      }>
                                                      End Session
                                                    </button>
                                                  ) : null}
                                                </>
                                              )}
                                              <button
                                                className="reject btn my-1 px-4"
                                                style={{ marginTop: '3px' }}
                                                onClick={() => {
                                                  setShowSlots(true);
                                                  setTimeSlots(item.timeslot_time);
                                                }}>
                                                View Slots
                                              </button>
                                            </>
                                          ) : null}
                                        </div>
                                      </div>
                                      <div className="section3 text-decoration-underline font-roboto">
                                        {item.payment_st == 1 ? (
                                          <>
                                            {item.booking_status == 'cancelled' ? (
                                              <span className=" fw-bold text-danger">
                                                Tuotor has rejected the booking
                                              </span>
                                            ) : (
                                              <span className="fw-bold text-warning">
                                                Session is not started
                                              </span>
                                            )}
                                          </>
                                        ) : (
                                          <span className="pending red-color">
                                            {f.status == 'pending' ? (
                                              <span className=" fw-boldtext-warning">
                                                Payment or Acceptance Pending
                                              </span>
                                            ) : (
                                              <>
                                                {item.booking_status == 'cancelled' ? (
                                                  <span className=" fw-boldtext-danger">
                                                    Tuotor has rejected the booking
                                                  </span>
                                                ) : (
                                                  <span className="pending red-color">
                                                    Pending
                                                  </span>
                                                )}
                                              </>
                                            )}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </StyledDiv>
                                </>
                              ) : (
                                ''
                              )}
                            </>
                          );
                        })
                        : null}

                      {item.package == '1on1' ||
                        item.package == '5hour' ||
                        item.package == 'trial' ? (
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
                                {/*<div className="bookings-btn">*/}
                                {item.payment_st == 0 && item.tutor_req_st == 'pending' ? (
                                  <>
                                    {item.booking_status != 'cancelled' ? (
                                      <button
                                        className="accept btn my-1 px-4"
                                        onClick={() =>
                                          NotificationManager.error(
                                            'Tutor not accepted this slot!!',
                                            'Error',
                                            3000
                                          )
                                        }>
                                        Pay
                                      </button>
                                    ) : (
                                      <button
                                        className="accept btn my-1 px-4"
                                        onClick={(e) => rescheduleHandler(e, item)}>
                                        Reschedule
                                      </button>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {item.payment_st == 0 && item.tutor_req_st == 'Accepted' ? (
                                      <>
                                        {currentDt > item.starting_date ? (
                                          <button
                                            className="accept btn my-1 px-4"
                                            onClick={() =>
                                              NotificationManager.error(
                                                'booking has passed its session date.',
                                                'Error',
                                                3000
                                              )
                                            }>
                                            Pay
                                          </button>
                                        ) : (
                                          <button
                                            className="accept btn my-1 px-4"
                                            onClick={(e) =>
                                              payHandler(
                                                e,
                                                item.package,
                                                item.amount,
                                                item.bk_id,
                                                item
                                              )
                                            }>
                                            Pay
                                          </button>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {item.booking_status != 'cancelled' ? (
                                          <>
                                            {item.session_start == null &&
                                              item.session_end == null ? (
                                              <button
                                                className="accept btn my-1 px-4"
                                                onClick={() =>
                                                  NotificationManager.error(
                                                    'Tutor not accepted this Slot!!',
                                                    'Error',
                                                    3000
                                                  )
                                                }>
                                                Start Session
                                              </button>
                                            ) : null}
                                            {item.session_start != null &&
                                              item.session_end == null ? (
                                              <button
                                                className="accept btn my-1 px-4"
                                                onClick={() =>
                                                  NotificationManager.error(
                                                    'Tutor not accepted this Slot!!',
                                                    'Error',
                                                    3000
                                                  )
                                                }>
                                                End Session
                                              </button>
                                            ) : null}
                                          </>
                                        ) : (
                                          <button
                                            className="accept btn my-1 px-4"
                                            style={{ float: 'right' }}
                                            onClick={(e) => rescheduleHandler(e, item)}>
                                            Reschedule
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                                <button
                                  className="reject btn my-1 px-4"
                                  onClick={() => {
                                    setShowSlots(true);
                                    setTimeSlots(item.timeslot_time);
                                  }}>
                                  View Slots
                                </button>

                                {/*</div>*/}
                              </div>
                            </div>

                            <div className="section3 text-decoration-underline font-roboto">
                              {item.payment_st == 1 ? (
                                <>
                                  {item.booking_status == 'cancelled' ? (
                                    <span className="text-danger">
                                      Tuotor has rejected the booking
                                    </span>
                                  ) : (
                                    <span className="text-warning">Session is not started</span>
                                  )}
                                </>
                              ) : (
                                <>
                                  {item.booking_status == 'cancelled' ? (
                                    <span className="text-danger">
                                      Tuotor has rejected the booking
                                    </span>
                                  ) : (
                                    <span className="pending red-color">Pending</span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </StyledDiv>
                      ) : (
                        ''
                      )}
                    </>
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
                  {item.booking_status == 'nil' ||
                    (item.booking_status == null &&
                      item.status == 'paid' &&
                      item.booking_status != 'rescheduled' &&
                      item.tutor_req_st == 'Accepted') ? (
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
                            {/*<div className="bookings-btn">*/}
                            {item.payment_st == 0 ? (
                              <button className="btn btn-danger pay-btn">Pay</button>
                            ) : (
                              <>
                                {item.booking_type == 'group' && item.package == 'group' ? (
                                  <>
                                    {item.learners?.length > 1 ? (
                                      <>
                                        {item.session_start == null && item.session_end == null ? (
                                          <button
                                            className="accept btn my-1 px-4"
                                            onClick={(e) =>
                                              sessionHandler(
                                                e,
                                                'start',
                                                item.bk_id,
                                                item.starting_date,
                                                item.booking_type,
                                                item.package,
                                                item.timespan,
                                                item.bks_id,
                                                item.timeslot_time
                                              )
                                            }>
                                            Start Session
                                          </button>
                                        ) : null}
                                      </>
                                    ) : (
                                      <>
                                        {item.session_start == null && item.session_end == null ? (
                                          <button
                                            className="accept btn my-1 px-4"
                                            onClick={(e) => refundHandler(e, item)}>
                                            Start Session
                                          </button>
                                        ) : null}
                                      </>
                                    )}
                                    {item.session_start != null && item.session_end == null ? (
                                      <button
                                        className="accept btn my-1 px-4"
                                        onClick={(e) =>
                                          sessionHandler(
                                            e,
                                            'end',
                                            item.bk_id,
                                            item.starting_date,
                                            item.booking_type,
                                            item.package,
                                            item.timespan,
                                            item.bks_id,
                                            item.timeslot_time
                                          )
                                        }>
                                        End Session
                                      </button>
                                    ) : null}
                                  </>
                                ) : (
                                  <>
                                    {item.session_start == null && item.session_end == null ? (
                                      <button
                                        className="accept btn my-1 px-4"
                                        onClick={(e) =>
                                          sessionHandler(
                                            e,
                                            'start',
                                            item.bk_id,
                                            item.starting_date,
                                            item.booking_type,
                                            item.package,
                                            item.timespan,
                                            item.bks_id,
                                            item.timeslot_time
                                          )
                                        }>
                                        Start Session
                                      </button>
                                    ) : null}
                                    {item.session_start != null && item.session_end == null ? (
                                      <button
                                        className="accept btn my-1 px-4"
                                        onClick={(e) =>
                                          sessionHandler(
                                            e,
                                            'end',
                                            item.bk_id,
                                            item.starting_date,
                                            item.booking_type,
                                            item.package,
                                            item.timespan,
                                            item.bks_id,
                                            item.timeslot_time
                                          )
                                        }>
                                        End Session
                                      </button>
                                    ) : null}
                                  </>
                                )}
                              </>
                            )}
                            <button
                              className="reject btn my-1 px-4"
                              style={{ paddingTop: '3px' }}
                              onClick={() => {
                                setShowSlots(true);
                                setTimeSlots(item.timeslot_time);
                              }}>
                              View Slots
                            </button>
                            {/*</div>*/}
                          </div>
                        </div>

                        <div className="section3 text-decoration-underline font-roboto">
                          <span className="pending red-color">
                            <span className="pending red-color">Pending</span>
                          </span>
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
                            {/*<span className="pending red-color">pending</span>*/}
                            <button className="accept btn my-1 px-4">Session Completed</button>
                            <button
                              className="reject btn my-1 px-4"
                              onClick={() => {
                                setShowSlots(true);
                                setTimeSlots(item.timeslot_time);
                              }}>
                              View Slots
                            </button>
                          </div>
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
              Close
            </button>
          </Modal.Footer>
        </Modal>

        <Koboos
          koboosPopup={koboosPopup}
          setKoboosPopup={setKoboosPopup}
          total_koobo={loginUserData.total_koobo}
          reqBodyFromSlots={reqBodyAlertComponent}
          userIds={dataToBookingCalender.l_id}
          selectedSession={dataToBookingCalender.l_id}
          ts_ids={dataToBookingCalender.tsIds}
          bkId={bkId}
          type='paying'
          getBookings={getBookings}
        />

        {/*<Modal show={paymentPopup} onHide={paymentPopup}>*/}
        {/*  <Modal.Header>*/}
        {/*    <Modal.Title>Place Booking</Modal.Title>*/}
        {/*  </Modal.Header>*/}

        {/*  <Paystack*/}
        {/*    setPaymentPopup={setPaymentPopup}*/}
        {/*    reqBodyFromSlots={reqBodyAlertComponent}*/}
        {/*    userIds={dataToBookingCalender.l_id}*/}
        {/*    selectedSession={dataToBookingCalender.l_id}*/}
        {/*    ts_ids={dataToBookingCalender.tsIds}*/}
        {/*    bkId={bkId}*/}
        {/*    type={'paying'}*/}
        {/*    getBookings={getBookings}*/}
        {/*  />*/}
        {/*</Modal>*/}

        <Modal show={refundPopup} onHide={refundPopup}>
          <Modal.Header>
            <Modal.Title>Refund Item</Modal.Title>
          </Modal.Header>
          <Refund
            refundPopup={refundPopup}
            setRefundPopup={setRefundPopup}
            dataSendToRefund={dataSendToRefund}
            getBookings={getBookings}
          />
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

export default UserBooking;
