import React, { useState } from 'react';
// import { useHistory } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../url';
import { Alert } from './alert';

const Koboos = ({
  koboosPopup,
  setKoboosPopup,
  total_koobo,
  reqBodyFromSlots,
  userIds,
  selectedSession,
  ts_ids,
  bkId,
  getBookings,
  type,
  setRefundPopup
}) => {
  const [err, setErr] = useState(false);
  const [koboos, setKoboos] = useState('');
  const [isLoader, setisLoader] = useState(false);
  const [bankAskPopup, setBankAskPopup] = useState(false);
  const navigate = useNavigate();
  const is_tuitor = JSON.parse(localStorage.getItem('all_data'))[0].tutor_st;

  // useEffect(() => {
  //   console.log(koboosPopup);
  //   if (koboosPopup && !total_koobo) {
  //     setKoboosPopup(false);
  //     setBankAskPopup(true);
  //   }
  // }, []);

  //let history = useHistory();

  function inputHandler(e) {
    e.preventDefault();
    if (e.target.value > parseInt(total_koobo)) {
      setErr('kindly type required koboos!!');
      setKoboos('');
    } else {
      setErr(false);
      setKoboos(e.target.value);
    }
  }
  function closePopup(e) {
    e.preventDefault();
    setisLoader(true);
    setTimeout(() => {
      setisLoader(false);
      setBankAskPopup(true);
      setKoboosPopup(false);
    }, 1000);
  }
  function loadBookings() {
    if (getBookings) {
      getBookings();
    }
    if (is_tuitor == 0) {
      navigate('/user-booking');
    } else {
      navigate('/booking');
    }
  }
  function submitHandler(e) {
    e.preventDefault();
    if (koboos != '') {
      setisLoader(true);
      if (koboos == reqBodyFromSlots.price) {
        if (type == 'paying') {
          axios
            .post(`${api}MembersPayment`, {
              learner_id: localStorage.getItem('email_id'),
              booking_id: bkId,
              nonce: 'nil',
              amount: koboos,
              booking_type: packageHandle(),
              payment_method: 'koobo',
              complete_st: '1'
            })
            .then((res) => {
              if (res.data.status == 'success') {
                setKoboosPopup(false);
                setisLoader(false);
                loadBookings();
              }
            })
            .catch((err) => console.log(err));
        } else if (type == 'refund') {
          axios
            .post(`${api}PaymoreBooking`, {
              bk_id: bkId,
              nonce: 'nil',
              amount: koboos,
              email_id: localStorage.getItem('email_id'),
              payment_method: 'koobo',
              complete_st: '1'
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.status == 'success') {
                setKoboosPopup(false);
                setRefundPopup(false);
                setisLoader(false);
                loadBookings();
              }
            })
            .catch((err) => console.log(err));
        } else {
          bookingMembers();
        }
      } else {
        setTimeout(() => {
          setisLoader(false);
          setBankAskPopup(true);
          setKoboosPopup(false);
        }, 1000);
      }
    } else {
      setErr('kindly type required koboos!!');
    }
  }
  function packageHandle() {
    var pkg;
    if (reqBodyFromSlots.item == 'Private 1-on-1 class') {
      pkg = '1on1';
    } else if (reqBodyFromSlots.item == '5-hours Package') {
      pkg = '5hour';
    } else if (reqBodyFromSlots.item == 'One seat in a Group Class') {
      pkg = 'group';
    } else if (reqBodyFromSlots.item == '30 minute trial lesson') {
      pkg = 'trial';
    }
    return pkg;
  }
  function bookingMembers() {
    function learnerId() {
      var Id;
      if (
        reqBodyFromSlots.item == 'Private 1-on-1 class' ||
        reqBodyFromSlots.item == '5-hours Package' ||
        reqBodyFromSlots.item == '30 minute trial lesson'
      ) {
        Id = localStorage.getItem('email_id');
      } else if (reqBodyFromSlots.item == 'One seat in a Group Class') {
        Id = localStorage.getItem('email_id') + ',' + userIds;
      }
      return Id;
    }
    function memberCount() {
      var count;
      if (
        reqBodyFromSlots.item == 'Private 1-on-1 class' ||
        reqBodyFromSlots.item == '5-hours Package' ||
        reqBodyFromSlots.item == '30 minute trial lesson'
      ) {
        count = '1';
      } else if (reqBodyFromSlots.item == 'One seat in a Group Class') {
        count = userIds.split(',').length;
      }
      return count;
    }
    function timeSpan() {
      var span;
      if (
        reqBodyFromSlots.item == 'Private 1-on-1 class' ||
        reqBodyFromSlots.item == '30 minute trial lesson' ||
        selectedSession == 'session'
      ) {
        span = '1';
      } else if (reqBodyFromSlots.item == '5-hours Package') {
        span = '5';
      } else if (
        reqBodyFromSlots.item == 'One seat in a Group Class' &&
        selectedSession == 'month'
      ) {
        span = '30';
      }
      return span;
    }
    function timeSlotId() {
      var ts_id;
      if (
        reqBodyFromSlots.item == 'Private 1-on-1 class' ||
        reqBodyFromSlots.item == '30 minute trial lesson' ||
        selectedSession == 'session'
      ) {
        ts_id = reqBodyFromSlots.ts_id;
      } else if (reqBodyFromSlots.item == '5-hours Package') {
        ts_id = ts_ids;
      } else if (
        reqBodyFromSlots.item == 'One seat in a Group Class' &&
        selectedSession == 'month'
      ) {
        ts_id = ts_ids;
      }
      return ts_id;
    }
    function bookingType() {
      var type;
      if (
        reqBodyFromSlots.item == 'Private 1-on-1 class' ||
        reqBodyFromSlots.item == '5-hours Package' ||
        reqBodyFromSlots.item == '30 minute trial lesson'
      ) {
        type = 'single';
      } else if (reqBodyFromSlots.item == 'One seat in a Group Class') {
        type = 'group';
      }
      return type;
    }
    function reqBody() {
      var data = {
        timeslot_id: timeSlotId(),
        member_count: memberCount(), // 1
        timespan: timeSpan(), // 1
        perhead: reqBodyFromSlots.price, // rate$
        starting_date: reqBodyFromSlots.todayDate, //calender date
        tutor_id: reqBodyFromSlots.tutor_id, // tutor email
        booking_type: bookingType(), // single
        totalamount: reqBodyFromSlots.price, // rate $
        learner_id: learnerId(), // loign user email
        payment_method: 'nil', // nil
        package: packageHandle(), // 1on1  5hour group trial
        invited_by: localStorage.getItem('email_id'), // loign user email
        invited_by_name: JSON.parse(localStorage.getItem('all_data'))[0].name, // loign user name
        timestamp: new Date().toLocaleTimeString() // current time (format)
      };
      return data;
    }
    // setLearnersId(learnerId())
    let body = reqBody();
    axios
      .post(`${api}AddBookingMembers`, body)
      .then((res) => {
        if (res.data.status == 'success') {
          // setBookingId(res.data.bk_id)
          axios
            .post(`${api}MembersPayment`, {
              learner_id: localStorage.getItem('email_id'),
              booking_id: res.data.bk_id,
              nonce: 'nil',
              amount: koboos,
              booking_type: packageHandle(),
              payment_method: 'koobo',
              complete_st: '1'
            })
            .then((res) => {
              // console.log(res.data);
              if (res.data.status == 'success') {
                if (type == 'reschadule') {
                  axios
                    .get(`${api}BookingReschedule?bk_id=${bkId}`)
                    .then((res) => {
                      console.log(res.data, 'BookingReschedule');
                      if (res.data.status == 'success') {
                        setKoboosPopup(false);
                        setisLoader(false);
                        loadBookings();
                      }
                    })
                    .catch((err) => console.log(err));
                } else {
                  setKoboosPopup(false);
                  setisLoader(false);
                  loadBookings();
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (res.data.status == 'failed') {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function showPopup() {
    if (bankAskPopup == false) {
      setKoboosPopup(false);
      setBankAskPopup(true);
      return;
    }
  }

  return (
    <>
      {/*<Modal.Body>*/}
      {koboosPopup && !total_koobo ? (
        showPopup()
      ) : (
        <div className={koboosPopup ? 'popup  center koboos active' : 'popup center'}>
          <div className="title">
            <h4>Do you want to use KOBO for Payment?</h4>
          </div>
          <div className="aside-content">
            <div>
              <span
                style={{
                  fontSize: '20px',
                  color: 'darkgoldenrod'
                }}
                className="left-content">
                Available:
              </span>
              <span style={{ fontSize: '20px', paddingLeft: '25px' }} className="right-value">
                {total_koobo}
              </span>
            </div>
            <div>
              <span style={{ fontSize: '20px' }} className="left-content text-success">
                Required:
              </span>
              <span style={{ fontSize: '20px', paddingLeft: '25px' }} className="right-value">
                {reqBodyFromSlots.price}
              </span>
            </div>
            <div style={{ padding: '15px' }} className="form-group mb-2">
              <input
                type="number"
                onChange={(e) => inputHandler(e)}
                className="form-control koboos-input"
                placeholder="Add Kobo"
              />
              {err ? <div className="text-danger pt-2">{err}</div> : null}
            </div>

            <div className="form-group">
              <button
                className="btn btn-success cs_koboo_btn use-kobo-btn"
                onClick={(e) => submitHandler(e)}>
                Use KOBO
              </button>
            </div>
            <div className="form-group">
              <div
                className="btn btn-warning cs_koboo_btn not-now-btn"
                onClick={(e) => closePopup(e)}>
                Not Now
              </div>
            </div>

            {/* {isLoader ? (
              <div className="container">
                <div className="row">
                  <div>
                    <div className="col-md-3 col-sm-3 col-lg-3 col-xl-3 col-3 m-auto">
                      <div className="loader-div">
                        <img src="assets/loader/loader.gif" alt="" className="loader" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null} */}
          </div>
        </div>
      )}

      {/*</Modal.Body>*/}
      {/*<Modal.Footer></Modal.Footer>*/}

      {/*<Modal show={bankAskPopup} onHide={bankAskPopup}>*/}
      {/*  <Modal.Header>*/}
      {/*    <Modal.Title>Place Booking</Modal.Title>*/}
      {/*  </Modal.Header>*/}
      {/*  <Modal.Body style={{ height: '500px', overflowY: 'auto' }}>*/}
      <Alert
        bankAskPopup={bankAskPopup}
        setBankAskPopup={setBankAskPopup}
        reqBodyFromSlots={reqBodyFromSlots}
        userIds={userIds}
        selectedSession={selectedSession}
        ts_ids={ts_ids}
        koboos={koboos}
        bkId={bkId}
        getBookings={getBookings}
        payStatus={type}
        setRefundPopup={setRefundPopup}
      />
      {/*  </Modal.Body>*/}
      {/*</Modal>*/}
    </>
  );
};

export default Koboos;
