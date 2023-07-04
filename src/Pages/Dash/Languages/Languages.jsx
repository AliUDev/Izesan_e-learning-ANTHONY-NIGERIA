import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
// import { guestUser } from '../../../redux/action/userAction';
// import Image from '../../../assets/images/nav_logo_new.png';
import axios from 'axios';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import Heading from '../../../Components/Common/Heading';
import EnglishLogo from '../../../assets/images/languageslogo/english.png';
import EsanLogo from '../../../assets/images/languageslogo/esan.png';
import FulfuldeLogo from '../../../assets/images/languageslogo/fulfulde.png';
import HausaLogo from '../../../assets/images/languageslogo/hausa.png';
import IgboLogo from '../../../assets/images/languageslogo/igbo.png';
import IsixhosaLogo from '../../../assets/images/languageslogo/isixhosa.png';
import JamaicanLogo from '../../../assets/images/languageslogo/jamaican_creole.png';
import KanuriLogo from '../../../assets/images/languageslogo/kanuri.png';
import PidginLogo from '../../../assets/images/languageslogo/pidgin.png';
import SetswanaLogo from '../../../assets/images/languageslogo/setswana.png';
import SawahiliLogo from '../../../assets/images/languageslogo/swahili.png';
import TivLogo from '../../../assets/images/languageslogo/tiv.png';
import TwiLogo from '../../../assets/images/languageslogo/twi.png';
import YorubaLogo from '../../../assets/images/languageslogo/yoruba.png';
import ZuluLogo from '../../../assets/images/languageslogo/zulu.png';
import { api } from '../../../url';
import Loader from '../../Loader/Loader';

function Languages() {
  localStorage.setItem('tutor_active', false);
  const guestUser = localStorage.getItem('email_id');
  const navigate = useNavigate();
  const [lang_eng, setlang_eng] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const [notificationPopup, setNotificationPopup] = useState(false);
  var userData = localStorage.getItem('all_data');
  var uniqueName = '';
  if (userData) {
    var email = JSON.parse(localStorage.getItem('all_data'))[0].email_id;
    uniqueName = email.split('@')[0];
  }
  var currentDayTarget = localStorage.getItem(uniqueName + '__' + 'current_day_target');
  var timesPopupShow = false;
  if (!currentDayTarget) {
    timesPopupShow = true;
  }
  const [timesPopup, setTimespopup] = useState(timesPopupShow);
  const [buyStreak, setBuyStreak] = useState(false);
  const [currentActive, setCurrentActive] = useState(5);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [userStreaks, setUserStreaks] = useState(0);

  // const [onlyEng, setonlyEng] = useState(false);
  useEffect(() => {
    // getStreak();
    if (!localStorage.getItem('lang')) {
      NotificationManager.info('Choose your native language first', 'Info', 4000);
    }
    setisLoader(true);
    setTimeout(() => {
      setisLoader(false);
      if (timesPopupShow == false) {
        if (localStorage.getItem(uniqueName + '__' + 'current_day_target')) {
          getStreak();
        }
      }
    }, 2000);
  }, []);

  function resetSidebar() {
    var collection = document.querySelectorAll('.cQLQZi');
    collection.forEach((ele, ind) => {
      ele.style.removeProperty('pointer-events');
      ele.style.removeProperty('opacity');
    });

    var collection = document.querySelectorAll('.dGznHn');
    collection.forEach((ele, ind) => {
      ele.style.removeProperty('pointer-events');
      ele.style.removeProperty('opacity');
    });
    localStorage.setItem('isnewbar', 1);
    // window.location.href = '/lessons';
  }
  function getStreak() {
    axios
      .get(`${api}LatestStreak?email_id=${localStorage.getItem('email_id')}`)
      .then((res) => {
        console.log(res);
        const total_streak = 7;
        if (res.data.status == 'success') {
          let streak = res.data.data[0].streak;
          setUserStreaks(res.data.data[0]);
          if (streak > 0) {
            if (streak > 7) {
              setNotificationMsg('Congratulations on earning 1 more kọbọ! You’re on fire');
              setNotificationPopup(true);
            } else {
              setNotificationMsg(
                total_streak -
                streak +
                ' more days left! You’re almost there! Complete your 7 day streak for a chance to earn kọbọ!'
              );
              setNotificationPopup(true);
            }
          } else {
            setNotificationMsg('Start a 7 day streak for a chance to earn kọbọ!');
            setNotificationPopup(true);
          }
        } else {
          setNotificationMsg('Start a 7 day streak for a chance to earn kọbọ!');
          setNotificationPopup(true);
          // alert('Start a 7 day streak for a chance to earn kọbọ!');
        }
      })
      .catch((err) => console.log(err));
  }

  function buyStreakHandler() {
    var totalStreak = userStreaks.streak;
    var totalKoobs = userStreaks.koobo;
    if (parseInt(totalKoobs) < 5) {
      alert('5 koobs are required to buy a streak');
      setBuyStreak(false);
    } else {
      var date = new Date();
      var todayDate = date.toISOString().slice(0, 10);
      var totalTime = Math.floor(parseInt(localStorage.getItem(todayDate)) / 60);
      date = new Date();
      date.setDate(date.getDate() - 1);
      var yesterdayDate = date.toISOString().slice(0, 10);
      if (totalTime > 0) {
        axios
          .post(`${api}buy-streak`, {
            email_id: localStorage.getItem('email_id'),
            usage_time: totalTime,
            date: yesterdayDate,
            streak: totalStreak + 1
          })
          .then((res) => {
            if (res.data.status == 'success') {
              setBuyStreak(false);
              window.setTimeout(() => {
                alert(res.data.message);
              }, 1000);
            } else if (res.data.status == 'failed') {
              setBuyStreak(false);
              window.setTimeout(() => {
                alert(res.data.error);
              }, 1000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
  function notificationHandler() {
    setNotificationPopup(false);
    var date = new Date();
    var lastStreakDate = new Date(userStreaks.date);
    const diffTime = Math.abs(date - lastStreakDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
      if (!localStorage.getItem(uniqueName + '__' + 'current_day_target')) {
        setBuyStreak(true);
      }
    }
  }

  function usageTime(value) {
    setCurrentActive(value);
    var emailId = localStorage.getItem('email_id');
    var date = new Date();
    date = date.toISOString().slice(0, 10);
    axios
      .post(`${api}set/todays-goal`, { user_id: emailId, targeted_usage_time: value, date: date })
      .then((res) => {
        if (res.data.status == 'success') {
          setTimespopup(false);
          var currentDay = localStorage.getItem(date);
          localStorage.setItem(uniqueName + '__' + 'current_day_target', currentDay + '-' + value);
          getStreak();
        } else if (res.data.status == 'failed') {
          NotificationManager.info(res.data.error, 'Info', 3000);
          setTimespopup(false);
          if (res.data.error == 'Goal already settled for today.') {
            var currentDay = localStorage.getItem(date);
            localStorage.setItem(uniqueName + '__' + 'current_day_target', currentDay + '-' + 5);
          }
          getStreak();
          // var currentDay = localStorage.getItem(date);
          // localStorage.setItem(uniqueName + '__' + 'current_day_target', currentDay + '-' + value);
        }
      });
  }

  return (
    <>
      {isLoader && <Loader />}

      <Modal show={notificationPopup} onHide={notificationPopup}>
        <Modal.Header className="text-center">
          <Modal.Title style={{ color: 'darkgoldenrod' }}>Notification</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div className="ask-session-body">{notificationMsg}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-warning" onClick={() => notificationHandler()}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {guestUser === 'guestUser' ? (
        ' '
      ) : (
        <Modal show={timesPopup} onHide={timesPopup}>
          <Modal.Header>
            <Modal.Title style={{ color: 'darkgoldenrod' }}>Today Usage</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="list-group">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  usageTime(5);
                }}
                className={
                  currentActive == 5
                    ? 'list-group-item list-group-item-action flex-column align-items-start active'
                    : 'list-group-item list-group-item-action flex-column align-items-start'
                }>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">5 Minutes Usage</h5>
                </div>
                <p className="mb-1">Use 5 minutes a day.</p>
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  usageTime(10);
                }}
                className={
                  currentActive == 10
                    ? 'list-group-item list-group-item-action flex-column align-items-start active'
                    : 'list-group-item list-group-item-action flex-column align-items-start'
                }>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">10 Minutes Usage</h5>
                </div>
                <p className="mb-1">Use 10 minutes a day.</p>
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  usageTime(15);
                }}
                className={
                  currentActive == 15
                    ? 'list-group-item list-group-item-action flex-column align-items-start active'
                    : 'list-group-item list-group-item-action flex-column align-items-start'
                }>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">15 Minutes Usage</h5>
                </div>
                <p className="mb-1">Use 15 minutes a day.</p>
              </a>
            </div>
          </Modal.Body>
          {/*<Modal.Footer>*/}
          {/*  <Button variant="btn btn-warning" onClick={() => setTimespopup(false)}>*/}
          {/*    Close*/}
          {/*  </Button>*/}
          {/*</Modal.Footer>*/}
        </Modal>
      )}

      <Modal show={buyStreak} onHide={buyStreak}>
        <Modal.Header>
          <Modal.Title style={{ color: 'darkgoldenrod' }}>Buy Streak</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div className="ask-session-body">Do you want to buy streaks ?</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-warning" onClick={() => setBuyStreak(false)}>
            Close
          </Button>
          <Button variant="btn btn-success" onClick={(e) => buyStreakHandler(e)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <StyledLanguages>
        <Heading title="Languages" className="text-center m-1 fw-bold" />
        {lang_eng ? (
          <p className="text-center fw-light text-warning">What language would you like to learn</p>
        ) : (
          <p className="text-center">Choose your native language</p>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
          }}>
          <Row className="gy-5 justify-content-center">
            {lang_eng ? (
              <>
                <span
                  onClick={() => setlang_eng(false)}
                  style={{ cursor: 'pointer' }}
                  className="text-warning  fw-normal fs-4 cursor m-0 backBtn back-btn">
                  <ArrowLeftShort className="fs-1 text-warning" style={{ cursor: 'pointer' }} />
                </span>

                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'English-Esan');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={EsanLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Esan
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'English-Yoruba');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={YorubaLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Yoruba
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'English-Igbo');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={IgboLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Igbo
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'English-Hausa');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={HausaLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Hausa
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'English-Swahili');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={SawahiliLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Swahili
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'English-Zulu');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={ZuluLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                        }}>
                        isiZulu
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'English-Twi');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={TwiLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>Twi</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'English-SeTswana');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={SetswanaLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        SeTswana
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'English-IsiXhosa');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={IsixhosaLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        isiXhosa
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'English-Fulfulde');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={FulfuldeLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Fulfulde
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'English-Jamaican');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={JamaicanLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>
                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Jamaican
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Kanuri');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={KanuriLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Kanuri
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                {/* TIV Language  */}

                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Tiv');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={TivLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Tiv
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Nigerian Pidgin Language  */}

                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Pidgin');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={PidginLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Nigerian Pidgin
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            ) : (
              <>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      setlang_eng(true);
                      localStorage.setItem('onlyEng', 'English');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={EnglishLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        English
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Esan');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={EsanLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Esan
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Yoruba');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={YorubaLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Yoruba
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Igbo');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={IgboLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Igbo
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Hausa');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={HausaLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Hausa
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Swahili');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={SawahiliLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Swahili
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Zulu');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={ZuluLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        IsiZulu
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Twi');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={TwiLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Twi
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'SeTswana');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={SetswanaLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        SeTswana
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'IsiXhosa');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={IsixhosaLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        isiXhosa
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Fulfulde');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={FulfuldeLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Fulfulde
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Jamaican');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={JamaicanLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Jamaican
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Kanuri Language  */}

                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Kanuri');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={KanuriLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Kanuri
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                {/* TIV Language  */}

                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Tiv');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={TivLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Tiv
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Nigerian Pidgin Language  */}

                <Col className="col-4 col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-3 languagecards">
                  <Card
                    className="mx-auto card__styling"
                    onClick={() => {
                      resetSidebar();
                      localStorage.setItem('lang', 'Pidgin');
                      localStorage.setItem('chapter_no', 0);
                      localStorage.setItem('count', 0);
                      navigate('/lessons');
                      // setonlyEng('English');
                    }}
                    style={{
                      width: 'auto',
                      minHeight: '150px',
                      borderRadius: '0.5rem'
                    }}>
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{
                        width: '11vw',
                        minWidth: '100px',
                        padding: '1rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                      src={PidginLogo}
                    />
                    <Card.Body
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2px 0 2px'
                      }}>
                      <Container>
                        <div
                          style={{
                            width: '100%',
                            border: '1px solid #E7E7E7'
                          }}></div>
                      </Container>

                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'Bold',
                          margin: '12px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex'
                        }}>
                        Nigerian Pidgin
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            )}
          </Row>
        </div>
      </StyledLanguages>
    </>
  );
}

export default Languages;

const StyledLanguages = styled.div`
  margin-bottom: 35px;
  .card__styling {
    transition-duration: 150ms;
  }
  .card__styling:hover {
    box-shadow: 0px 2px 3px grey;
    transition-duration: 150ms;
    transform: scale(1.03);
  }
  padding: 2rem 1rem;
  .languagecards {
    max-width: 16rem !important;
    min-width: 14rem !important;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;
