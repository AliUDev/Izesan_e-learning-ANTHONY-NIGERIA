import { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useViewport } from '../../../utils/hooks/useViewport';

import axios from 'axios';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { api, img } from '../../../url';

// import Paystack from './paystack';
import { useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router';
import Loader from '../../Loader/Loader';
import Koboos from './koboos';
function ViewTimeSlots() {

  const navigate = useNavigate();
  // const [timeData] = useState(new Array(43).fill('12:00 am-01:00 am'));
  // const [topData, setTopData] = useState(timeData.slice(0, 8));
  // const [remainingData, setRemainingData] = useState(timeData.slice(8));
  const [date, setDate] = useState(new Date());
  const [todayDate, setTodayDate] = useState(false);
  const [err, setErr] = useState(false);
  const [singleData, setSingleData] = useState(false);
  const [doubleData, setDoubleData] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  // const [showSlots, setShowSlots] = useState(false);
  const [slots, setslots] = useState([]);
  const [numCount, setNumCount] = useState(0);
  const [item, setItem] = useState(localStorage.getItem('dropdown_item'));
  const [selectedSession, setSelectedSession] = useState(localStorage.getItem('selectedSession'));
  const [price] = useState(localStorage.getItem('price'));
  const [reqBodyAlertComponent, setReqBodyAlertComponent] = useState({});
  const [ts_ids, setts_ids] = useState(false);
  const [currentPayamount, setCurrentPayamount] = useState(0);
  // const [paymentPopup, setPaymentPopup] = useState(false);
  const [koboosPopup, setKoboosPopup] = useState(false);
  // const [showSubmitButton, setShowSubmitButton] = useState(false);
  const { width } = useViewport();
  const myRefname = useRef(null);
  const [loginUserData, setLoginUserData] = useState(false);

  useEffect(() => {
    loginUser();
  }, []);

  function timeSpan(item) {
    var span;
    var selectedSession = localStorage.getItem('selectedSession');
    if (item == '5-hours Package') {
      span = '5';
    } else if (item == 'One seat in a Group Class' && selectedSession == 'month') {
      span = '30';
    }
    // else if (item == 'One seat in a Group Class' && selectedSession == 'session') {
    //   span = '1';
    // }
    return span;
  }

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

  async function kHandler(e, val) {
    e.preventDefault();
    var item = localStorage.getItem('dropdown_item');
    if (
      (item == '5-hours Package' && slots.length <= 4) ||
      (item == 'One seat in a Group Class' && slots.length <= 29)
    ) {
      setslots([...slots, val]);
    } else if (
      (item == '5-hours Package' && slots.length > 4) ||
      (item == 'One seat in a Group Class' && slots.length > 29)
    ) {
      switch (item) {
        case '5-hours Package':
          // alert('you can select only 5 slots!!');
          NotificationManager.error('you can select only 5 slots!!', 'Error', 3000);
          break;
        case 'One seat in a Group Class':
          // alert('you can select only 30 slots!!');
          NotificationManager.error('you can select only 30 slots!!', 'Error', 3000);
          break;

        default:
          break;
      }
    }
  }

  function deleteSlots(e, val) {
    e.preventDefault();
    var array = [...slots]; // make a separate copy of the array
    var index = array.indexOf(val);
    if (index !== -1) {
      array.splice(index, 1);
      setslots(array);
    }
  }

  function submitSingleHandler(e, ts_id, tutor_id, currentID) {
    e.preventDefault();
    var ele = document.getElementById(currentID);

    // if (item == 'Private 1-on-1 class') {
    //   setCurrentPayamount(50 * 100);
    // }

    setReqBodyAlertComponent({
      ts_id,
      todayDate,
      tutor_id,
      price,
      item
    });
    //setPaymentPopup(true);
    setKoboosPopup(true);
    ele.closest('div').style.display = 'none';

    // setShowSlots(false);
  }
  function check1() {
    var data;
    if (item == 'One seat in a Group Class') {
      data = slots.length == 30;
    } else if (item == '5-hours Package') {
      data = slots.length == 5;
    }
    return data;
  }

  function refundItem() {
    //var token = 'pk_test_432e1b0acaeb81879fc81e3164e2d423240e79ec';
    var token = 'sk_test_ae6adc07dbdea137f318eace005c3465632d8b91';
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios
      .post('https://api.paystack.co/refund', { transaction: '1662124543506' }, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function submitHandler(e, tutor_id) {
    e.preventDefault();
    if (check1() && slots.length != 0) {
      // setPaymentPopup(true);
      setKoboosPopup(true);
      setReqBodyAlertComponent({
        todayDate,
        tutor_id,
        price,
        item
      });
      setts_ids(slots.toString());
      //setPaymentPopup(true);
      setKoboosPopup(true);
    } else {
      switch (item) {
        case 'One seat in a Group Class':
          if (slots.length == 0) {
            NotificationManager.error('select timespan in given list!!', 'Error', 3000);
          }
          if (slots.length > 30 || slots.length < 30) {
            NotificationManager.error('select 30 timespan must!!', 'Error', 3000);
          }
          break;
        case '5-hours Package':
          if (slots.length == 0) {
            NotificationManager.error('select timespan in given list!!', 'Error', 3000);
          }
          if (slots.length > 5 || slots.length < 5) {
            NotificationManager.error('select 5 timespan must!!', 'Error', 3000);
          }
          break;
        default:
          break;
      }
    }
  }

  const onChange = (date) => {
    console.log('dssd');
    setisLoader(true);
    setDate(date);
    let dt = date;
    let splitDate = dt.toLocaleDateString().split('/');
    let month = splitDate[0] < 10 ? '0' + splitDate[0] : splitDate[0];
    let checkDate = splitDate[1] < 10 ? '0' + splitDate[1] : splitDate[1];
    let final_date = `${splitDate[2]}-${month}-${checkDate}`;
    setTodayDate(final_date);
    var item = localStorage.getItem('dropdown_item');
    //  var selectedSession = '';
    var tutor_id = localStorage.getItem('tutor_id');
    if (
      item == 'Private 1-on-1 class' ||
      item == '30 minute trial lesson' ||
      selectedSession == 'session'
    ) {
      axios.get(`${api}ViewTutorSlotsAv?email_id=${tutor_id}&date=${final_date}`).then((res) => {
        // console.log(res.data);
        if (res.data.status == 'success') {
          setTimeout(() => {
            setDoubleData(false);
            setSingleData(res.data.data);
            NotificationManager.success('Booking Available!', 'Alert', 3000);
            setisLoader(false);
          }, 2000);
        } else {
          setisLoader(false);
          NotificationManager.info('No Booking Available!', 'Oops!', 3000);
          setSingleData('')
        }
      });
    } else if (item == '5-hours Package' || item == 'One seat in a Group Class') {
      axios
        .get(
          `${api}TutorSlotsMonth?tutor_id=${tutor_id}&date=${final_date}&timespan=${timeSpan(item)}`
        )
        .then((res) => {
          if (res.data.status == 'success') {
            setTimeout(() => {
              setSingleData(false);
              setDoubleData(res.data.data);
              var dData = res.data.data;
              var num_count = 0;
              if (dData) {
                for (let i = 0; i < dData.length; i++) {
                  num_count = num_count + dData[i].timeslots.length;
                }
              }
              setNumCount(num_count);
              // setShowSlots(true);
              setisLoader(false);
            }, 2000);
          } else {
            setisLoader(false);
            NotificationManager.error('No Data Found!!', 'Error', 3000);
          }
        });
    } else {
      console.log('no Data');
    }
  };

  useLayoutEffect(() => {
    // if (width >= 1420) {
    //   setTopData(timeData.slice(0, 8));
    //   setRemainingData(timeData.slice(8));
    // } else if (width < 768) {
    //   setTopData([]);
    //   setRemainingData(timeData.slice(0));
    // } else {
    //   setTopData(timeData.slice(0, 4));
    //   setRemainingData(timeData.slice(4));
    // }
  }, [width]);
  return (
    <StyledViewTimeSlots>
      {isLoader && <Loader />}
      <Koboos
        koboosPopup={koboosPopup}
        setKoboosPopup={setKoboosPopup}
        total_koobo={loginUserData.total_koobo}
        reqBodyFromSlots={reqBodyAlertComponent}
        userIds={localStorage.getItem('userIds')}
        selectedSession={selectedSession}
        ts_ids={ts_ids}
        bkId={localStorage.getItem('bkId') ? localStorage.getItem('bkId') : ''}
        type={localStorage.getItem('booking_type') ? localStorage.getItem('booking_type') : ''}
      />
      {/*</Modal>*/}

      <div className='row w-100 m-0' >
        <div className='col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12 ' style={{ cursor: "pointer" }}>
          <ArrowLeftShort className="fs-1 text-warning" style={{ cursor: "pointer" }} onClick={() => { navigate(-1) }} />
        </div>
        <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 mt-1'>
          <h4 className='w-100 heading fw-bold'>View Time Slots</h4>
        </div>

      </div>
      <div className="main">
        <div className="top-content">
          <div className="selected-time-slots-title top-content-text fs-5 fw-normal">Selected Time Slots</div>
          <div className="privte-class-div">
            <div className="top-content-text fs-5 fw-normal">{localStorage.getItem('dropdown_item')}</div>
            <div className="user-image m-1">
              <img
                src={`${img}${localStorage.getItem('current_img')}`}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        <div className="time-slots-container d-flex align-items-center justify-content-center">
          <Calendar ref={myRefname} onChange={onChange} minDate={new Date()} value={date} />
        </div>

        {err ? <div className="alert alert-danger">{err}</div> : null}

        <div className="d-flex flex-wrap justify-content-around">


          {singleData &&
            singleData.map((data, index) => {
              let time = data.time.split(',')[0];
              return (
                <div className="p-1 d-flex" key={index}>
                  <StyledTimeSlot
                    style={{ cursor: 'pointer' }}
                    onClick={(e) =>
                      submitSingleHandler(e, data.ts_id, data.tutor_id, 'id_' + index)
                    }
                    id={'id_' + index}
                    className="timeslot my-3">
                    {time}
                  </StyledTimeSlot>
                </div>
              );
            })}

          {doubleData ? (
            <>
              {item == '5-hours Package' ? (
                <>
                  {numCount >= 5 ? (
                    doubleData.map((data, index) => {
                      return (
                        <>
                          <div key={index} style={{ marginTop: '25px' }}>
                            <h4 className="text-center pb-2">{data.date}</h4>
                            {data.timeslots.map((items) => {
                              let time = items.time.split(',')[0];
                              return (
                                <>
                                  {slots.indexOf(items.ts_id) == -1 ? (
                                    <div
                                      className="p-1 d-flex"
                                      style={{ cursor: 'pointer' }}
                                      onClick={(e) => kHandler(e, items.ts_id)}>
                                      <StyledTimeSlot className="timeslot my-3">
                                        {time}
                                      </StyledTimeSlot>
                                    </div>
                                  ) : (
                                    <div
                                      className="p-1 d-flex"
                                      style={{ cursor: 'pointer', border: '2px solid red' }}
                                      onClick={(e) => deleteSlots(e, items.ts_id)}>
                                      <StyledTimeSlot className="timeslot my-3">
                                        {time}
                                      </StyledTimeSlot>
                                    </div>
                                  )}
                                </>
                              );
                            })}
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <div
                        className="alert alert-danger"
                        style={{ marginTop: '25px', marginLeft: '25%' }}>
                        You cannot select this tutor for 5 slots.
                      </div>
                    </>
                  )}

                  {item == '5-hours Package' ? (
                    <div className="double-btn clearfix col-lg-12" style={{ textAlign: 'center' }}>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => submitHandler(e, doubleData[0].timeslots[0].tutor_id)}>
                        Submit
                      </button>
                    </div>
                  ) : null}
                </>
              ) : null}

              {item == 'One seat in a Group Class' && selectedSession == 'month' ? (
                <>
                  {numCount >= 30 ? (
                    doubleData.map((data, index) => {
                      return (
                        <>
                          <div key={index} style={{ marginTop: '25px' }}>
                            <h4 className="text-center pb-2">{data.date}</h4>
                            {data.timeslots.map((items) => {
                              let time = items.time.split(',')[0];
                              return (
                                <>
                                  {slots.indexOf(items.ts_id) == -1 ? (
                                    <div
                                      className="p-1 d-flex"
                                      style={{ cursor: 'pointer' }}
                                      onClick={(e) => kHandler(e, items.ts_id)}>
                                      <StyledTimeSlot className="timeslot my-3">
                                        {time}
                                      </StyledTimeSlot>
                                    </div>
                                  ) : (
                                    <div
                                      className="p-1 d-flex"
                                      style={{ cursor: 'pointer', border: '2px solid red' }}
                                      onClick={(e) => deleteSlots(e, items.ts_id)}>
                                      <StyledTimeSlot className="timeslot my-3">
                                        {time}
                                      </StyledTimeSlot>
                                    </div>
                                  )}
                                </>
                              );
                            })}
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <div
                        className="alert alert-danger"
                        style={{ marginTop: '25px', marginLeft: '25%' }}>
                        You cannot select this tutor for 5 slots.
                      </div>
                    </>
                  )}

                  {selectedSession == 'month' || item == 'One seat in a Group Class' ? (
                    <div className="double-btn clearfix col-lg-12" style={{ textAlign: 'center' }}>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => submitHandler(e, doubleData[0].timeslots[0].tutor_id)}>
                        Submit
                      </button>
                    </div>
                  ) : null}
                </>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </StyledViewTimeSlots>
  );
}

export default ViewTimeSlots;

const StyledViewTimeSlots = styled.div`
  padding: 2rem 1rem;

  .main {
    margin-top: 3rem;
  }
  .top-content {
    display: flex;
    flex-direction: column-reverse;
    .top-content-text {
      font-size: 1rem;
      font-weight: bold;
      color: #000;
    }
    .selected-time-slots-title {
      display: flex;
      align-items: center;
    }
    .privte-class-div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      .user-image {
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        img {
          width: 100%;
        }
      }
    }
  }

  .time-slots-container {
    margin-top: 1rem;

    .yearselect {
      max-width: 500px;
      margin: auto;
    }

    .timeslot {
      grid-area: timeslot;
    }
  }

  @media (min-width: 768px) {
    .top-content {
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      .privte-class-div {
        width: 40%;
      }
      .top-content-text {
        font-size: 1.5rem;
      }
    }
    .time-slots-container {
      display: flex;
    }

    .yearselect-container {
      width: 60%;
    }
    .timeslotContainer {
      width: 40%;
    }
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;

const StyledTimeSlot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  color: #489a6b;
  background-color: #d2eadc;
`;
