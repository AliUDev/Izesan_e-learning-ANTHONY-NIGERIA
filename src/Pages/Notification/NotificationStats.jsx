import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import Circle from '../../assets/images/circle.png';
import Coin from '../../assets/images/coin.png';
// import Fire from '../../assets/images/fire_2.png';
// import Setting from '../../assets/images/setting.png';
import Heading from '../../Components/Common/Heading';
// import Helpers from '../../Helpers';
import axios from 'axios';
import React, { useState } from 'react';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router';
import { api } from '../../url';
import Loader from '../Loader/Loader';


function NotificationStats() {
  const navigate = useNavigate();
  const [isLoader, setisLoader] = useState(false);
  const [data, setData] = useState('');
  const [weeklyData, setWeeklyData] = useState([]);
  const [weekDays, setWeekDays] = useState([]);
  const [totalStreaks, setTotalStreaks] = useState([]);
  var emailId = localStorage.getItem('email_id');
  const [currentTheme, setCurrentTheme] = React.useState('');
  const [remaingTime, setRemaingTime] = useState(0);
  const [targetTime, setTargetTime] = useState(0);
  const [usageTime, setUsageTime] = useState(0);
  const [notificationState, setnotificationState] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [totalKobo, settotalKobo] = useState(0);

  const [loading, setloading] = useState(false);
  const getKoobos = () => {
    setloading(true)
    const email = localStorage.getItem('email_id')
    axios.post(`${api}get/kobo/details`, {
      email_id: email
    })
      .then((res) => {
        settotalKobo(res.data.data[0].total_koobo);
        setloading(false)

      }).catch((err) => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setShowNotification(true);
        }
      });
    } else {
      setShowNotification(true);
    }
    if (data.targeted_usage_time === usageTime && notificationState === 1) {
      NotificationManager.success(`Congratulations you have completed your ${data.targeted_usage_time}min goal`, 'Success', 4000)
      if (showNotification) {
        new Notification('Daily Goal Completed!', {
          body: `Congratulations! you have completed your ${data.targeted_usage_time}min goal`,
        });
      }
    } else if (usageTime === data.targeted_usage_time - 2 && notificationState === 1) {
      NotificationManager.success(`Only 2 minutes left to achieve your daily goal!`, 'Success', 4000)
      if (showNotification) {
        new Notification('Reminder!', {
          body: `Only 2 minutes left to achieve your daily goal!`,
        });
      }
    }
  }, [usageTime])


  var mytarget = 0;

  var userData = localStorage.getItem('all_data');
  var uniqueName = '';
  if (userData) {
    var email = JSON.parse(localStorage.getItem('all_data'))[0].email_id;
    uniqueName = email.split('@')[0];
  }
  var date = new Date();
  let olDate = date.toISOString().slice(0, 10);

  function getData() {
    var url = 'get/todays-goal';
    var date = new Date();
    var todayDate = date.toISOString().slice(0, 10);
    var body = {
      user_id: emailId,
      date: todayDate
    };
    axios
      .post(`${api}${url}`, body)
      .then((res) => {
        if (res.data.status == 'success') {
          setisLoader(false);
          console.log(res.data.data);
          setData(res.data.data);
          setTargetTime(res.data.data.targeted_usage_time);
          mytarget = res.data.data.targeted_usage_time;
          console.log('targetTime' + targetTime);
        } else {
          setisLoader(false);
          NotificationManager.error('No Content Found!!', 'Error', 3000);
        }
      })
      .catch((err) => console.log(err));
  }

  function getWeekDayData(oldDate, weeklyData, format = 'short', locale = 'en') {
    const names = [];
    const data = [];
    const date = new Date(oldDate);
    let days = 7;
    while (days !== 0) {
      date.setDate(date.getDate() + 1);
      var olDate = date.toISOString().slice(0, 10);
      var nodeValue = 0;
      for (var i = 0; i < weeklyData.length; i++) {
        if (olDate == weeklyData[i].date) {
          nodeValue = parseInt(weeklyData[i].streak);
        }
      }
      data.push(nodeValue);
      names.push(date.toLocaleDateString(locale, { weekday: format }));
      days--;
    }
    setWeeklyData(data);
    setWeekDays(names);
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      const timingKey = localStorage.getItem(uniqueName + '__' + olDate);
      if (timingKey) {
        var usage_time = timingKey;
      } else {
        var usage_time = localStorage.getItem('__' + olDate);
      }
      usage_time = Math.floor(usage_time / 60);
      if (parseInt(usage_time) > 0) {
        if (parseInt(mytarget) >= parseInt(usage_time)) {
          setUsageTime(parseInt(usage_time));
          setRemaingTime(parseInt(mytarget) - parseInt(usage_time));
        } else if (parseInt(usage_time) > parseInt(mytarget)) {
          setUsageTime(parseInt(mytarget));
          setRemaingTime(0);
        }
      }
    }, 1000);
    setNotification()
    getData();
    getWeeklyGraph();
    getKoobos()

    return () => clearInterval(interval);
  }, []);


  const setNotification = () => {
    const state = localStorage.getItem('all_data');
    const parsedState = JSON.parse(state);
    setnotificationState(parsedState[0].is_notifications_enabled);
  }

  const notifcationHandler = (param) => {
    const state = localStorage.getItem('all_data');
    var parsedState = JSON.parse(state);
    parsedState[0].is_notifications_enabled = param === 0 ? 0 : 1;
    localStorage.setItem('all_data', JSON.stringify(parsedState));
    param === 0 ?
      NotificationManager.success('Notifications Disabled', 'Success', 3000) :
      NotificationManager.success('Notifications Enabled', 'Success', 3000)

    setNotification()
  }



  function getWeeklyGraph() {
    axios.post(`${api}get/performance/weekly`, { user_id: emailId }).then((res) => {
      if (res.data.status == 'success') {
        var weeklyData = res.data.data;

        var date = new Date();
        date.setDate(date.getDate() - 7);
        var olDate = date.toISOString().slice(0, 10);
        getWeekDayData(olDate, weeklyData);
        setTotalStreaks(res.data.totalStreaks);
      } else {
        setisLoader(false);
        NotificationManager.error('No Content Found!!', 'Error', 3000);
      }
    });
  }

  //const xAxisCategories = ['Sun', 'Mon', 'Tue ', 'Wed', 'Thu', 'Fri', 'Sat'];
  const xAxisCategories = weekDays;
  const options = {
    // title: {
    //   text: 'Title'
    // },
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    theme: {
      monochrome: {
        enabled: true,
        color: '#EFBF58',
        shadeTo: 'light',
        shadeIntensity: 0.65
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.5,
        stops: [100]
      }
    },
    xaxis: {
      categories: xAxisCategories,
      tickPlacement: 'between',

      labels: {
        style: {
          colors: ['#8F8F8F', '#8F8F8F', '#8F8F8F', '#8F8F8F', '#8F8F8F', '#8F8F8F', '#8F8F8F']
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: ['#8F8F8F', '#8F8F8F', '#8F8F8F', '#8F8F8F', '#8F8F8F', '#8F8F8F', '#8F8F8F']
        }
      }
    },
    stroke: {
      curve: 'straight'
    },
    markers: {
      size: 8
    }
  };
  const series = [
    {
      // data: [13, 18, 17, 14, 13, 16, 38]
      data: weeklyData
    }
  ];

  return (
    <StyledNotificationLayout className="w-100">
      {isLoader && <Loader />}
      <div className="d-flex justify-content-between">
        <div className='row p-2'>
          <div className='col-2'>
            <ArrowLeftShort className="fs-1 m-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
          </div>
          <div className='col-10 mt-1'>
            <Heading title="Daily Performance" className='text-center' />
          </div>
        </div>

        <StyledTopBar>
          {/*<div className="top-box me-3">*/}
          {/*  <div className="imgContainer">*/}
          {/*    <img src={Fire} />*/}
          {/*  </div>*/}
          {/*  <div className="value"> 500</div>*/}
          {/*</div>{' '}*/}
          <div className="top-box">
            <div className="imgContainer">
              <img src={Coin} />
            </div>
            <div className="value">
              {
                loading ? (
                  <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>{totalKobo}</>
                )
              }
            </div>
            <span>
              {
                notificationState === 0 ?
                  <i className="bi bi-bell-slash-fill cursor-pointer fs-4 mx-2 text-danger" onClick={() => notifcationHandler(1)} ></i> :
                  <i className="bi bi-bell-fill cursor-pointer fs-4 mx-2 text-warning " onClick={() => notifcationHandler(0)} ></i>
              }
            </span>
          </div>
        </StyledTopBar>
      </div>

      <StyledNotificationStats>
        <div className="head-stats">
          <div className="daily-goal-stats">
            <div>
              {/* <div className="daily-goal-stats-title font-roboto">DAILY GOAL </div> */}
              <div>
                <div className="daily-goal-circle-container">
                  <img src={Circle} />
                  <div className="circle-text-container font-roboto">
                    <div className="circle-text-value">
                      {usageTime ?? 0}/{data.targeted_usage_time ?? 0}
                    </div>
                    <div className="circle-text-label">xp goal met</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="side-stats side-stats-container ">
            {/*<div className="side-stats-settings mb-2">*/}
            {/*  <img src={Setting} />*/}
            {/*</div>*/}
            <div className="side-stats align-items-end mb-md-2">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="side-stats-count">{totalStreaks ?? ''}</div>
                <div className="side-stats-label">day streak</div>
              </div>
            </div>
            <div className="side-stats align-items-end">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="side-stats-count">{remaingTime < 1 ? data.targeted_usage_time : remaingTime}</div>
                <div className="side-stats-label">Minutes left</div>
              </div>
            </div>
          </div>
        </div>
        <StyledGraphContainer className="mt-3">
          <ReactApexChart options={options} series={series} type="area" key={options} />
        </StyledGraphContainer>
      </StyledNotificationStats>
    </StyledNotificationLayout>
  );
}
export default NotificationStats;

const StyledTopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  .top-box {
    display: flex;
    align-items: center;
    .imgContainer {
      margin-right: 5px;
      width: 40px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .value {
      color: #8f8f8f;
      font-size: 16px;
      font-weight: 600;
    }
  }
  @media (min-width: 576px) {
    .top-box {
      .imgContainer {
        width: 50px;
        height: 50px;
      }
      .value {
        font-size: 20px;
      }
    }
  }
  @media (max-width: 332px) {
    flex-direction: column;
    .top-box {
      margin-bottom: 10px;
    }
  }
`;
const StyledGraphContainer = styled.div`
  #apexchartsbasicxbar {
    width: 100% !important;
    svg {
      width: 100% !important;
    }
  }
`;
const StyledNotificationStats = styled.div`
  .head-stats {
    display: flex;
    margin-top: 1rem;
    justify-content: space-between;
    .daily-goal-stats {
      display: flex;
      justify-content: center;
      .daily-goal-stats-title {
        font-size: 16px;
        font-weight: 600;
        color: #8f8f8f;
      }
      .daily-goal-circle-container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 200px;
        height: 200px;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .circle-text-container {
          z-index: 1;
          margin-top: 26px;
          .circle-text-value {
            color: #f6953a;
            font-size: 32px;
            font-weight: 600;
          }
          .circle-text-label {
            color: #8f8f8f;
            font-size: 14px;
            text-align: center;
          }
        }
      }
    }
    .side-stats-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .side-stats {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      flex-direction: column;
      align-items: flex-end;
      .side-stats-settings {
        width: 25px;
        height: 25px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .side-stats-count {
        font-size: 38px;
        font-weight: 500;
        color: #f6953a;
      }
      .side-stats-label {
        font-weight: 500;
        color: #8f8f8f;
      }
      @media (min-width: 576px) {
        .side-stats-count {
          font-size: 42px;
        }
      }
    }
  }
  @media (max-width: 332px) {
    .head-stats {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const StyledNotificationLayout = styled.div`
  padding: 2rem 1rem;
  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;


