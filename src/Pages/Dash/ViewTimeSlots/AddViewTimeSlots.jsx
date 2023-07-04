import { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
// import Will from '../../../assets/images/profile_image.png';
// import Heading from '../../../Components/Common/Heading';
import axios from 'axios';
import { api } from '../../../url';
import { useViewport } from '../../../utils/hooks/useViewport';
import Loader from '../../Loader/Loader';

// import YearSelector from './YearSelector';
// import YellowLeft from '../../../assets/images/yellow_left_arrow.png';
// import YellowRight from '../../../assets/images/yellow_right_arrow.png';
function ViewTimeSlots() {
  const [timeData] = useState(new Array(43).fill('12:00 am-01:00 am'));
  const [topData, setTopData] = useState(timeData.slice(0, 8));
  const [remainingData, setRemainingData] = useState(timeData.slice(8));
  const [isLoader, setisLoader] = useState(false);

  const [timeSlotsData, setTimeslotsData] = useState(false);
  const [time1, setTime1] = useState(false);
  const [time2, setTime2] = useState(false);
  const [time3, setTime3] = useState(false);
  const [time4, setTime4] = useState(false);
  const [time5, setTime5] = useState(false);
  const [time6, setTime6] = useState(false);
  const [time7, setTime7] = useState(false);
  const [time8, setTime8] = useState(false);
  const [time9, setTime9] = useState(false);
  const [time10, setTime10] = useState(false);
  const [time11, setTime11] = useState(false);
  const [time12, setTime12] = useState(false);
  const [time13, setTime13] = useState(false);
  const [time14, setTime14] = useState(false);
  const [time15, setTime15] = useState(false);
  const [time16, setTime16] = useState(false);
  const [time17, setTime17] = useState(false);
  const [time18, setTime18] = useState(false);
  const [time19, setTime19] = useState(false);
  const [time20, setTime20] = useState(false);
  const [time21, setTime21] = useState(false);
  const [time22, setTime22] = useState(false);
  const [time23, setTime23] = useState(false);
  const [time24, setTime24] = useState(false);
  const [day, setDay] = useState('Monday');
  const [indexDay, setIndexDay] = useState(0);

  const weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday', 'Sunday'];

  const { width } = useViewport();

  useEffect(() => {
    viewData(indexDay);
  }, []);

  useLayoutEffect(() => {
    if (width >= 1420) {
      setTopData(timeData.slice(0, 8));
      setRemainingData(timeData.slice(8));
    } else if (width < 768) {
      setTopData([]);
      setRemainingData(timeData.slice(0));
    } else {
      setTopData(timeData.slice(0, 4));
      setRemainingData(timeData.slice(4));
    }
  }, [width]);

  var Mdate = 0;
  var Tdate = 0;
  var Wdate = 0;
  var Thdate = 0;
  var Fdate = 0;
  var Sdate = 0;
  var Sudate = 0;
  function addTimeSlots(e, day, indexDay, time) {
    e.preventDefault();
    var currentdate = new Date();
    var temp = currentdate.getDay();
    calculateMonday(currentdate, temp);
    var Monday = Mdate + ' 00:00';
    var date1 = calculateWeekDates(Monday, indexDay);
    let date2 = date1.split('/');
    var date = `${date2[2]}-${date2[0]}-${date2[1]}`;
    // split time
    let splitTime = time.split('-');
    // utc time 1
    let a1 = splitTime[0].split(':');
    let a2 = a1[1].split(' ');
    let hours1 = a1[0];
    let minutes1 = a2[0];
    let modifier1 = a2[1];
    if (hours1 === '12') {
      hours1 = '00';
    }

    if (modifier1 === 'pm') {
      hours1 = parseInt(hours1, 10) + 12;
    }
    let utc1 = new Date(`${date} ${hours1}:${minutes1}`);
    let convertTime1 = utc1.toUTCString();
    let c_time1 = convertTime1.split(' ');
    let t1 = tConvert(c_time1[4]);
    let t2 = t1.split(':');
    let exactTime1 = `${t2[0]}:${t2[1]} ${t2[2].split(' ')[1]}`; // exact convert utc time 1
    let convert_m1 = getMonthFromString(c_time1[2]);
    convert_m1 = convert_m1 < 10 ? '0' + convert_m1 : convert_m1;
    let exact_c_date1 = `${c_time1[3]}-${convert_m1}-${c_time1[1]}`; // exact convert utc date
    // utc time 2
    let a11 = splitTime[1].split(':');
    let a22 = a11[1].split(' ');
    let hours2 = a11[0];
    let minutes2 = a22[0];
    let modifier2 = a22[1];
    if (hours1 === '12') {
      hours1 = '00';
    }
    if (modifier2 === 'pm') {
      hours2 = parseInt(hours2, 10) + 12;
    }
    let utc2 = new Date(`${date} ${hours2}:${minutes2}`);
    let convertTime2 = utc2.toUTCString();
    let c_time2 = convertTime2.split(' ');
    let t3 = tConvert(c_time2[4]);
    let t4 = t3.split(':');
    let exactTime2 = `${t4[0]}:${t4[1]} ${t4[2].split(' ')[1]}`; // exact convert utc time 2
    //  ///// Combine UTC Time
    let combineTimeUtc = `${exactTime1}-${exactTime2}|${exact_c_date1}`;
    // combine all time
    var combineAllTime = `${time},${combineTimeUtc}`;
    let array = [];
    let obj = {
      day: day,
      time: combineAllTime,
      date: date
    };
    array.push(obj);
    // console.log(array);
    axios
      .post(`${api}EditTimeSlots`, {
        email_id: localStorage.getItem('email_id'),
        time_slots: JSON.stringify(array)
      })
      .then((res) => {
        if (res.data.status == 'success') {
          viewTimeSlots(date);
        }
      })
      .catch((err) => console.log(err));
  }
  function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' am' : ' pm'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }
  function getMonthFromString(mon) {
    var d = Date.parse(mon + '1, 2012');
    if (!isNaN(d)) {
      return new Date(d).getMonth() + 1;
    }
    return -1;
  }

  function calculateMonday(date, temp) {
    if (temp == 1) {
      Mdate = calculateWeekDates(date, 0);
    } else if (temp == 0) {
      Mdate = calculateWeekDates(date, -6);
    } else {
      Mdate = calculateWeekDates(date, temp - (temp * 2 - 1));
    }
  }

  function calculateWeekDates(date, day) {
    var targetDate = new Date(date);
    targetDate.setDate(targetDate.getDate() + day);

    // So you can see the date we have created
    var dd = targetDate.getDate();
    var mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
    var yyyy = targetDate.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    var dateString = mm + '/' + dd + '/' + yyyy;

    // So you can see the output
    return dateString;
  }
  function viewTimeSlots(date) {
    setisLoader(true);
    setTime1(false);
    setTime2(false);
    setTime3(false);
    setTime4(false);
    setTime5(false);
    setTime6(false);
    setTime7(false);
    setTime8(false);
    setTime9(false);
    setTime10(false);
    setTime11(false);
    setTime12(false);
    setTime13(false);
    setTime14(false);
    setTime15(false);
    setTime16(false);
    setTime17(false);
    setTime18(false);
    setTime19(false);
    setTime20(false);
    setTime21(false);
    setTime22(false);
    setTime23(false);
    setTime24(false);
    axios
      .get(`${api}ViewTutorSlotsAv?email_id=${localStorage.getItem('email_id')}&date=${date}`)
      .then((res) => {
        if (res.data.status == 'success') {
          setTimeslotsData(res.data.data);
          // let time = res.data.data.time.split(',')
          res.data.data.map((data) => {
            let time = data.time.split(',');
            switch (time[0]) {
              case '12:00 am-01:00 am': //1
                setTime1(true);
                break;
              case '01:00 am-02:00 am': // 2
                setTime2(true);
                break;
              case '02:00 am-03:00 am': //3
                setTime3(true);
                break;
              case '03:00 am-04:00 am': //3
                setTime4(true);
                break;
              case '04:00 am-05:00 am': // 4
                setTime5(true);
                break;
              case '05:00 am-06:00 am': // 5
                setTime6(true);
                break;
              case '06:00 am-07:00 am': // 6
                setTime7(true);
                break;
              case '07:00 am-08:00 am': // 7
                setTime8(true);
                break;
              case '08:00 am-09:00 am': // 8
                setTime9(true);
                break;
              case '09:00 am-10:00 am': // 9
                setTime10(true);
                break;
              case '10:00 am-11:00 am': // 10
                setTime11(true);
                break;
              case '11:00 am-12:00 pm': // 11
                setTime12(true);
                break;
              case '12:00 pm-01:00 pm': // 12
                setTime13(true);
                break;
              case '01:00 pm-02:00 pm': // 13
                setTime14(true);
                break;
              case '02:00 pm-03:00 pm': // 14
                setTime15(true);
                break;
              case '03:00 pm-04:00 pm': // 15
                setTime16(true);
                break;
              case '04:00 pm-05:00 pm': // 16
                setTime17(true);
                break;
              case '05:00 pm-06:00 pm': // 17
                setTime18(true);
                break;
              case '06:00 pm-07:00 pm': // 18
                setTime19(true);
                break;
              case '07:00 pm-08:00 pm': // 19
                setTime20(true);
                break;
              case '08:00 pm-09:00 pm': // 20
                setTime21(true);
                break;
              case '09:00 pm-10:00 pm': // 21
                setTime22(true);
                break;
              case '10:00 pm-11:00 pm': // 22
                setTime23(true);
                break;
              case '11:00 pm-12:00 am': // 23
                setTime24(true);
                break;
              default:
                break;
            }
            setisLoader(false);
          });
        } else {
          setTimeslotsData([]);
          setisLoader(false);
        }
      })
      .catch((err) => console.log(err));
  }
  function deleteTimeSlots(e, id, day, time) {
    e.preventDefault();
    axios
      .get(`${api}DeleteTimeslot?ts_id=${id}&day=${day}&time=${time}`)
      .then(() => {
        viewData(getDayPosition(day));
      })
      .catch((err) => console.log(err));
  }
  var days = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6
  };
  function getDayPosition(day) {
    return days[day];
  }
  function viewData(indexDay) {
    var currentdate = new Date();
    var temp = currentdate.getDay();
    calculateMonday(currentdate, temp);
    var Monday = Mdate + ' 00:00';
    var date1 = calculateWeekDates(Monday, indexDay);
    let date2 = date1.split('/');
    var date = `${date2[2]}-${date2[0]}-${date2[1]}`;
    viewTimeSlots(date);
    //  setTimeslotPopup(true);
  }

  return (
    <>
      <StyledYearSelector>
        {isLoader && <Loader />}
        {/*<Heading title="View Time Slots" />*/}
        <div style={{ padding: '20px' }} className="row w-100 justify-content-between">
          {weeks.map((week, index) => {
            let state = '';
            if (indexDay === index) {
              state = 'active';
            }
            // else if (index < 4) {
            //   state = 'available';
            // } else {
            //   state = 'unavailable';
            // }
            return (
              <StyledMonth key={week} className={`${state} col-4`}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setDay(week);
                    setIndexDay(index);
                    viewData(index);
                  }}
                  className="text-break">
                  {week}
                </div>
              </StyledMonth>
            );
          })}
        </div>
      </StyledYearSelector>
      <StyledViewTimeSlots>
        <div className="main">
          <h3>Please Book Timeslots</h3>
          <div className="time-slots-container">
            <div className="d-flex flex-wrap justify-content-around">
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '12:00 am-01:00 am')}
                  style={time1 == true ? { pointerEvents: 'none', border: '1px solid red' } : null}>
                  12:00 am-01:00 am
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '01:00 am-02:00 am')}
                  style={time2 == true ? { pointerEvents: 'none', border: '1px solid red' } : null}>
                  01:00 am-02:00 am
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '02:00 am-03:00 am')}
                  style={time3 == true ? { pointerEvents: 'none', border: '1px solid red' } : null}>
                  02:00 am-03:00 am
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '03:00 am-04:00 am')}
                  style={time4 == true ? { pointerEvents: 'none', border: '1px solid red' } : null}>
                  03:00 am-04:00 am
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '04:00 am-05:00 am')}
                  style={time5 == true ? { pointerEvents: 'none', border: '1px solid red' } : null}>
                  04:00 am-05:00 am
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '05:00 am-06:00 am')}
                  style={time6 == true ? { pointerEvents: 'none', border: '1px solid red' } : null}>
                  05:00 am-06:00 am
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '06:00 am-07:00 am')}
                  style={time7 == true ? { pointerEvents: 'none', border: '1px solid red' } : null}>
                  06:00 am-07:00 am
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '07:00 am-08:00 am')}
                  style={time8 == true ? { pointerEvents: 'none', border: '1px solid red' } : null}>
                  07:00 am-08:00 am
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '08:00 am-09:00 am')}
                  style={time9 == true ? { pointerEvents: 'none', border: '1px solid red' } : null}>
                  08:00 am-09:00 am
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '09:00 am-10:00 am')}
                  style={
                    time10 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  09:00 am-10:00 am
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '10:00 am-11:00 am')}
                  style={
                    time11 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  10:00 am-11:00 am
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '11:00 am-12:00 pm')}
                  style={
                    time12 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  11:00 am-12:00 pm
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '12:00 pm-01:00 pm')}
                  style={
                    time13 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  12:00 pm-01:00 pm
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '01:00 pm-02:00 pm')}
                  style={
                    time14 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  01:00 pm-02:00 pm
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '02:00 pm-03:00 pm')}
                  style={
                    time15 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  02:00 pm-03:00 pm
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '03:00 pm-04:00 pm')}
                  style={
                    time16 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  03:00 pm-04:00 pm
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '04:00 pm-05:00 pm')}
                  style={time17 == true ? { pointerEvents: 'none' } : null}>
                  04:00 pm-05:00 pm
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '05:00 pm-06:00 pm')}
                  style={
                    time18 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  05:00 pm-06:00 pm
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '06:00 pm-07:00 pm')}
                  style={
                    time19 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  06:00 pm-07:00 pm
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '07:00 pm-08:00 pm')}
                  style={
                    time20 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  07:00 pm-08:00 pm
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '08:00 pm-09:00 pm')}
                  style={
                    time21 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  08:00 pm-09:00 pm
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '09:00 pm-10:00 pm')}
                  style={
                    time22 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  09:00 pm-10:00 pm
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '10:00 pm-11:00 pm')}
                  style={
                    time23 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  10:00 pm-11:00 pm
                </StyledTimeSlot>
              </div>
              <div className="p-1">
                <StyledTimeSlot
                  className="timeslot"
                  onClick={(e) => addTimeSlots(e, day, indexDay, '11:00 pm-12:00 am')}
                  style={
                    time24 == true ? { pointerEvents: 'none', border: '1px solid red' } : null
                  }>
                  11:00 pm-12:00 am
                </StyledTimeSlot>
              </div>
            </div>
          </div>

          <h3 style={{ paddingTop: '100px' }}>Already Booked Timeslots</h3>

          <div className="time-slots-container">
            <div className="d-flex flex-wrap justify-content-around">
              {timeSlotsData &&
                timeSlotsData.length > 0 &&
                timeSlotsData.map((data, index) => {
                  let time = data.time.split(',');
                  return (
                    <div className="p-1">
                      <StyledTimeSlot
                        className="timeslot"
                        onClick={(e) => {
                          if (window.confirm('Are you sure you Want to delete this TimeSlots?'))
                            deleteTimeSlots(e, data.ts_id, data.day, data.time);
                        }}>
                        {time[0]}
                      </StyledTimeSlot>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </StyledViewTimeSlots>
    </>
  );
}

export default ViewTimeSlots;

const StyledYearSelector = styled.div`
  padding: 1rem 0rem;
  border: 1px solid #c7c7c7;
  border-radius: 7px;
  .yearsection {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-container {
      cursor: pointer;
      width: 20px;
      height: 20px;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    .year {
      margin: 0 3rem;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
`;

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
  cursor: pointer;
  background-color: #d2eadc;
`;

const StyledMonth = styled.div`
  padding: 1rem;
  text-align: center;
  border-radius: 10px;
  max-width: 140px;
  &.active {
    color: #fff;
    background-color: #f19c00;
  }
  &.available {
  }
  &.unavailable {
    color: #0000004d;
  }
`;
