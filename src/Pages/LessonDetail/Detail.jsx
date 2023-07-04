import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment, useEffect, useState } from 'react';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BlueSpeaker from '../../assets/images/blue_speaker.png';
import Favorite from '../../assets/images/favorite@2x.png';
import UnFavorite from '../../assets/images/fvrt_red.png';
import LessonDetailsIcon from '../../assets/images/lesson_details2.png';
import AddFavNewUserPopup from '../../assets/images/popup.svg';
import { api, img } from '../../url';
// import QuizResponsePopup from '../Quiz/QuizResponsePopup';
import { NotificationManager } from 'react-notifications';
import BusImg from '../Loader/Bus';
import Loader from '../Loader/Loader';

import ChiefIcon from '../../assets/images/chief_icon.png';
import ElephantHunterIcon from '../../assets/images/elephant_hunter_icon.png';
import FarmerIcon from '../../assets/images/farmer_icon.png';
// import FishermanIcon from '../../assets/images/fisherman_icon.png';
import HunterIcon from '../../assets/images/hunter_icon.png';
import KingIcon from '../../assets/images/king_icon.png';
import NativeDoctorIcon from '../../assets/images/native_doctor_icon.png';

function Detail() {
  const navigate = useNavigate();
  const [choice, setChoice] = useState('');
  const [choices, setChoices] = useState([]);
  const [nextBtn, setNextBtn] = useState(false);
  const [questionData, setQuestionData] = useState(false);
  // console.log(questionData, 'questionData');
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [quizTrueAns, setQuizTrueAns] = useState(0);
  const [gifCount, setGifCount] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [count, setCount] = useState(0);
  console.log('count', count);
  const [answer, setAnswer] = useState(false);
  const [showLessonCompletePopup, setShowLessonCompletePopup] = useState(false);
  const [userData, setUserData] = useState(false);
  const [quizPopup, setQuizPopup] = useState(false);
  const [quizData, setQuizData] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [badge, setBadge] = useState('');
  const [q_choices, setq_Choices] = useState([]);
  const [quizStatus, setQuizStatus] = useState('Fail');
  const [quizAnswer, setQuizAnswer] = useState(false);
  const [addborder, setAddborder] = useState('');
  const [passPopup, setPassPopup] = useState(false);
  const [failPopup, setFailPopup] = useState(false);
  const [newScreen, setNewScreen] = useState(false);
  const [fave, setFave] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const [wrongAnswerPopup, setWrongAnswerPopup] = useState(false);
  const [ShowImage, setShowImage] = useState(false);
  const [questionCorrectAnswer, setQuestionCorrectAnswer] = useState('');
  const [response, setresponse] = useState('');
  const [hints, setHints] = useState([]);
  // console.log('Hints Data', hints);
  const [descriptionHint, setdescriptionHint] = useState([]);
  // console.log('Description Hint', descriptionHint);
  const [buttonText, setButtonText] = useState('Check');
  // console.log(response, 'response');
  const saveChapterProgress = (index) => {
    const email = localStorage.getItem('email_id');
    if (email != 'guestUser') {
      axios
        .post(`${api}save-chapter-progress`, {
          email_id: localStorage.getItem('email_id'),
          language: localStorage.getItem('lang'),
          module_no: localStorage.getItem('chapter_no'),
          current_question: index
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log('Save Chapter');
  };

  const getChapterProgress = () => {
    axios
      .get(
        `${api}get-chapter-progress?email_id=${localStorage.getItem(
          'email_id'
        )}&language=${localStorage.getItem('lang')}&module_no=${localStorage.getItem('chapter_no')}`
      )
      .then((res) => {
        var qn = res.data?.data[0]?.current_question;
        console.log(qn, 'qn');
        console.log('getChapterProgress', res.data?.data[0]);
        const a = Number(qn);
        setHints(questionData[a - 1].hints.split('@'));
        setdescriptionHint(questionData[a - 1].hints_description.split('@'));
        setCount(a - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function question() {
    setTimeout(() => {
      localStorage.removeItem('newuser');
    }, 6000);

    setisLoader(true);
    let chapter_no = localStorage.getItem('chapter_no');
    let chapter_type = localStorage.getItem('chapter_type');

    let lang = localStorage.getItem('lang');
    setChoice(false);
    setChoices([]);
    setFave(false);
    setNextBtn(false);
    axios
      .get(
        `${api}GetQuestionsNew?target_lang=${lang}&chapter_no=${chapter_no}&user_email=${localStorage.getItem(
          'email_id'
        )}`
      )
      .then((res) => {
        console.log(res, 'newQ');
        if (res.data.status == 'success') {
          setTimeout(() => {
            if (res.data.data) {
              const res2 = res.data.data;
              setQuestionData(res2);
              newHintFunction(res2);
            }
          }, 1000);
          setTimeout(() => {
            setisLoader(false);
          }, 2000);
          setTimeout(() => {
            if (localStorage.getItem('lang').indexOf('English') != -1) {
              if (res.data?.data[localStorage.getItem('count')]['question_type'] == 3) {
                var correctANS = res.data?.data[localStorage.getItem('count')].question.replace(
                  /,/g,
                  ' '
                );
                document.getElementById('sentenseSpeaker').click();
              } else if (res.data?.data[localStorage.getItem('count')]['question_type'] != 3) {
                var correctANS = res.data?.data[localStorage.getItem('count')].answer;
                document.getElementById('worldSpeaker').click();
              }
            } else {
              if (res.data?.data[localStorage.getItem('count')]['question_type'] == 3) {
                const audio = new Audio(
                  `${img}${res.data?.data[localStorage.getItem('count')].question_sound}`
                );
                audio.play();
              }
            }
          }, 2000);
        } else if (res.data.status == 'failed') {
          NotificationManager.error(res.data.error, 'Error', 3000);
          setisLoader(false);
        }
      })
      .catch((err) => console.log(err));
  }

  function getText() {
    let t = {};

    if (localStorage.getItem('lang') == 'Esan') {
      t = {
        title1:
          'Amọnghọn! Congratulations! In light of your hard work, the Ediọnwele (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Obọ ẹ dale!'
      };
    } else if (localStorage.getItem('lang') == 'Yoruba') {
      t = {
        title1:
          'Ẹkú àṣeyọrí! Congratulations! In light of your hard work, the Àwọn Alàgbà (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Obọ ẹ dale!'
      };
    } else if (localStorage.getItem('lang') == 'Igbo') {
      t = {
        title1:
          'Jisie ike! Congratulations! In light of your hard work, the Ndị okenye (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! mere nke ọma!'
      };
    } else if (localStorage.getItem('lang') == 'Hausa') {
      t = {
        title1:
          'San barka! Congratulations! In light of your hard work, the Dattawa (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Aiki ya yi kyau!'
      };
    } else if (localStorage.getItem('lang') == 'Zulu') {
      t = {
        title1:
          'Halala! Congratulations! In light of your hard work, the Abadala (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Usebenzile!'
      };
    } else if (localStorage.getItem('lang') == 'SeTswana') {
      t = {
        title1:
          'Thoholetsa! Congratulations! In light of your hard work, the Ba golo (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Mosebetsi o motle!'
      };
    } else if (localStorage.getItem('lang') == 'Twi') {
      t = {
        title1:
          'Wo titiri nkwa! Congratulations! In light of your hard work, the Mpanimfoɔ (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Adwuma pa!'
      };
    } else if (localStorage.getItem('lang') == 'Swahili') {
      t = {
        title1:
          'Hongera! Congratulations! In light of your hard work, the Wazee (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Kazi njema!'
      };
    } else if (localStorage.getItem('lang') == 'IsiXhosa') {
      t = {
        title1:
          'Sivuyisana nawe! Congratulations! In light of your hard work, the Abadala (elders) have decided to award you the title of :',
        title2: 'Keep up the good work!  Wenze kakuhle!'
      };
    }
    return t;
  }
  const [popupImage, setpopupImage] = useState('');
  let image;
  function showImage(img) {
    setpopupImage(img);
    setShowImage(true);
  }

  const [descriptionHintModal, setdescriptionHintModal] = useState(false);

  function hintDescriptionModal(description) {
    return (
      <>
        <Modal show={descriptionHintModal} onHide={descriptionHintModal}>
          <Modal.Header>
            <Modal.Title>Hint:</Modal.Title>
          </Modal.Header>
          <Modal.Body>{description}</Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={() => setdescriptionHintModal(false)}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function getQuiz(badge, cr_quiz) {
    return (
      <>
        <Modal show={quizPopup} onHide={quizPopup}>
          <Modal.Header>
            <Modal.Title>Knowledge Check Time</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You must take and pass this Knowledge Check to unlock the next chapters!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={() => setQuizPopup(false)}>
              Not Now
            </Button>
            <Button
              variant="success"
              onClick={(e) => {
                getQuizQuestions(e, badge, cr_quiz);
              }}>
              Go To Knowledge Check
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  var quizSocre = Math.round((quizTrueAns / quizData.length) * 100)
    ? Math.round((quizTrueAns / quizData.length) * 100)
    : 0;

  function getQuizQuestions(e, badge, cr_quiz) {
    e.preventDefault();
    // setisLoader(true);
    setCurrentQuiz(cr_quiz);
    setAttempts(attempts + 1);
    localStorage.setItem('attempt', attempts + 1);
    let lang = localStorage.getItem('lang');
    if (quizSocre >= 33) {
      setQuizStatus('Pass');
    }

    axios
      .get(`${api}QuizNew?target_lang=${lang}&badge=${badge}`)
      // .get(`${api}QuizNew?target_lang=${lang}&badge=king`)
      .then((res) => {
        if (res.data.status == 'success') {
          let newData = [];
          for (let i = 0; i < 50; i++) {
            newData.push(res.data.data[i]);
          }
          //  setisLoader(false);
          setQuizPopup(false);
          // setData(false);
          setQuizData(newData);
          setQuiz(true);
          setBadge(badge);
          console.log(newData, 'newData');
          var audio;
          if (res.data.data[0].question_type == 3) {
            audio = new Audio(`${img}${res.data.data[0].sound}`);
            audio.play();
          } else {
            audio = new Audio(`${img}${res.data.data[0].question_sound}`);
            audio.play();
          }
        } else {
          setQuizPopup(false);
          //  setisLoader(false);
          NotificationManager.error('no quiz content found!!', 'Error', 3000);
        }
      })
      .catch((err) => console.log(err));
  }

  function ViewCuerrentUser() {
    let lang = localStorage.getItem('lang');
    axios
      .get(`${api}GetLanguageDetails?language=${lang}&email_id=${localStorage.getItem('email_id')}`)
      .then((res) => {
        if (res.data.status == 'failed') {
          setUserData('');
        } else {
          setUserData(res.data.data);
        }
        setisLoader(false);
      })
      .catch((err) => console.log(err));
  }

  const next = () => {
    setChoices([]);
    setCount(count + 1);
    setHints(questionData[count].hints.split('@'));
    setdescriptionHint(questionData[count].hints_description.split('@'));
    questionData.length === questionData.length - 1 ? navigate('#/lessons') : null;
    console.log('Next');
    var questionResponse = questionData[count]['lang_response'];
    console.log(questionResponse);
  };
  const prev = () => {
    setChoices([]);
    setCount(count - 1);
  };

  function incrementQuestionsHandler(e, initialcount, index, t) {
    e.preventDefault();
    var audio = '';
    setFave(false);
    var questionType = questionData[count]['question_type'];
    var questionResponse = questionData[count]['lang_response'];
    setresponse(questionResponse);
    console.log(questionType, 'qt');
    console.log(questionResponse, 'qr');
    var questionCorrectAnswer = '';
    if (questionType == 3) {
      var match_answer = choices
        .toString()
        .replace(/,/g, ' ')
        .replace(/[0-9_]/g, '');
      console.log(match_answer);
      if (t == 'check') {
        var correctANS = questionData[count].answer.replace(/,/g, ' ');
        console.log(correctANS, 'cA');
        if (localStorage.getItem('lang').indexOf('English') != -1) {
          if (questionData[count].question) {
            var correctANS = questionData[count].question.replace(/,/g, ' ');
          } else {
            var correctANS = questionData[count].answer.replace(/,/g, ' ');
          }

        }
        questionCorrectAnswer = correctANS.trim();
        if (correctANS.trim() == match_answer) {
          setAnswer(true);
          setChoices([]);
          setGifCount(gifCount + 1);
          setWrongAnswerCount(0);
          saveChapterProgress(index);

          audio = new Audio('assets/sounds/success.mp3');
          const volumeCheck = localStorage.getItem('Volume');
          //This audio is for correct answer
          volumeCheck == 'true' ? audio.play() : null;

          setTimeout(() => {
            setAnswer(false);
            //setNextBtn(true);
          }, 1000);

          if (questionData.length == index) {
            completeChapter();
          } else {
            localStorage.setItem('count', index);
            setCount(index);
            setHints(questionData[index].hints.split('@'));
            setdescriptionHint(questionData[index].hints_description.split('@'));
          }

          if (localStorage.getItem('lang').indexOf('English') != -1) {
            speackEnglish(index, 'question');
          } else {
            audio = new Audio(`${img}${questionData[index].question_sound}`);
            audio.play();
          }
        } else {
          setGifCount(0);
          setButtonText('Wrong');
          window.setTimeout(() => {
            setButtonText('Check');
          }, 2000);
          setWrongAnswerCount(wrongAnswerCount + 1);
          if (wrongAnswerCount == 4) {
            setQuestionCorrectAnswer(questionCorrectAnswer);
            setWrongAnswerPopup(true);
            setWrongAnswerCount(0);
          }
          audio = new Audio('assets/sounds/fail.mp3');
          const volumeCheck = localStorage.getItem('Volume');
          volumeCheck == 'true' ? audio.play() : null;
        }
      } else if (t == 'next') {
        setChoices([]);
        setCount(index - 1);
        localStorage.setItem('count', index);
        setNextBtn(false);
        setGifCount(0);
        setButtonText('Wrong');
        window.setTimeout(() => {
          setButtonText('Check');
        }, 2000);

        if (localStorage.getItem('lang').indexOf('English') != -1) {
          speackEnglish(index, 'question');
        } else {
          audio = new Audio(`${img}${questionData[index].question_sound}`);
          audio.play();
        }
      }
    } else {
      questionCorrectAnswer = questionData[count]['answer'];
      if (questionData[count]['answer'] == choice) {
        // localStorage.setItem('count', index);
        setAnswer(true);
        audio = new Audio('assets/sounds/success.mp3');
        const volumeCheck = localStorage.getItem('Volume');
        volumeCheck == 'true' ? audio.play() : null;
        setGifCount(gifCount + 1);
        setWrongAnswerCount(0);
        setTimeout(() => {
          setAnswer(false);
        }, 1000);

        if (questionData.length == index) {
          completeChapter();
        } else {
          localStorage.setItem('count', index);
          setCount(index);
        }

        if (localStorage.getItem('lang').indexOf('English') != -1) {
          speackEnglish(index, 'question');
        } else {
          audio = new Audio(`${img}${questionData[index].question_sound}`);
          audio.play();
        }

        // setCount(index);
      } else {
        setButtonText('Wrong');
        window.setTimeout(() => {
          setButtonText('Check');
        }, 2000);
        setWrongAnswerCount(wrongAnswerCount + 1);
        if (wrongAnswerCount == 4) {
          setQuestionCorrectAnswer(questionCorrectAnswer);
          setWrongAnswerPopup(true);
          setWrongAnswerCount(0);
        }

        audio = new Audio('assets/sounds/fail.mp3');
        const volumeCheck = localStorage.getItem('Volume');
        volumeCheck == 'true' ? audio.play() : null;
      }
    }

    if (gifCount == 4) {
      setTimeout(() => {
        setGifCount(0);
      }, 4000);
    }
  }
  function speackEnglish(index, type, text = '') {
    if (type == 'question' && questionData[index]['question_type'] == 3) {
      //in case of sentenses
      var correctANS = questionData[index].question.replace(/,/g, ' ');
      setTimeout(() => {
        speak({ text: correctANS });
      }, 1800);
    } else if (type == 'question' && questionData[index]['question_type'] != 3) {
      setTimeout(() => {
        speak({ text: text });
      }, 1800);
    }
  }
  function startAudio(e, aud, index, type = '') {
    e.preventDefault();
    if (localStorage.getItem('lang').indexOf('English') != -1) {
      speackEnglish(index, type);
    } else {
      var audio = new Audio(`${img}${aud}`);
      audio.play();
    }
  }
  function quizChoicesHandler(e, val) {
    console.log(val, 'bleh');
    var quesData = questionData[count];
    console.log(quesData, 'ffytftf');
    e.preventDefault();
    setq_Choices([...q_choices, val]);
  }

  function quizDeleteChoices(e, val) {
    var array = [...q_choices]; // make a separate copy of the array
    var index = array.indexOf(val);
    if (index !== -1) {
      array.splice(index, 1);
      setq_Choices(array);
    }
  }

  function choiceHandler1(e, choice, setIndexOfBorder) {
    e.preventDefault();
    setAddborder(setIndexOfBorder);
    setChoice(choice);
  }

  function showQuizHandler(index) {
    if (quizData.length != index) {
      if (quizData[index].question_type == 3) {
        const split_array = quizData[index].lang_sen.split(' ');
        var shuffledArray = split_array.sort(() => 0.5 - Math.random());
      }
      return (
        <div className="container">
          <div className="row pb-5">
            {!newScreen && quizData[index].question_type == 3 ? (
              <StyledLayout2>
                <Container
                  className="mx-auto"
                  style={{
                    display: 'flex',
                    background: '#F9F9F9',
                    alignItems: 'center',
                    flexDirection: 'column',
                    margin: '1rem',
                    padding: '1rem',
                    justifyContent: 'center'
                  }}>
                  <Row
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                      // width: "42rem",
                    }}></Row>
                  <Row className="lessondiv">
                    <Col>
                      <img
                        className="bluespeaker2"
                        style={{
                          height: '2rem',
                          width: '3rem',
                          marginLeft: '2rem'
                        }}
                        src={BlueSpeaker}
                        onClick={(e) => startAudio(e, quizData[index].sound, index, 'quiz')}
                      />
                    </Col>
                  </Row>
                  <Row
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      flexDirection: 'column',
                      alignItems: 'flex-start'
                      // width: "52rem",
                    }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around'
                        // width: "52rem",
                      }}>
                      {q_choices.length > 0 &&
                        q_choices.map((d, i) => {
                          const split_d = d.split('_')[0];
                          return (
                            <Fragment key={i}>
                              <p
                                key={i}
                                onClick={(e) => quizDeleteChoices(e, d)}
                                style={{
                                  color: 'black',
                                  background: '#E1E1E1',
                                  paddingRight: '1rem',
                                  paddingLeft: '1rem',
                                  paddingTop: '0.5rem',
                                  paddingBottom: '0.5rem',
                                  marginRight: '1rem'
                                }}>
                                {split_d}
                              </p>
                            </Fragment>
                          );
                        })}
                    </div>
                    <hr
                      style={{
                        border: 'none',
                        borderTop: '1px dotted #707070',
                        color: '#fff',
                        backgroundColor: '#fff',
                        height: '1px'
                        // width: "25rem",
                      }}
                    />
                    <hr
                      style={{
                        border: 'none',
                        borderTop: '1px solid #707070',
                        color: '#fff',
                        backgroundColor: '#fff',
                        height: '1px'
                        // width: "25rem",
                      }}
                    />

                    <div
                      className="testinf"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'flex-start'
                        // width: "52rem",
                      }}>
                      {shuffledArray.map((data, i) => {
                        return (
                          <Fragment key={i}>
                            {q_choices.indexOf(data) == -1 ? (
                              <p
                                key={i}
                                onClick={(e) => quizChoicesHandler(e, data)}
                                style={{
                                  color: 'black',
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  background: '#E1E1E1',
                                  paddingRight: '1rem',
                                  paddingLeft: '1rem',
                                  paddingTop: '0.5rem',
                                  paddingBottom: '0.5rem',
                                  marginRight: '1rem'
                                }}>
                                {data}
                              </p>
                            ) : (
                              <div className="remove_choice"></div>
                            )}
                          </Fragment>
                        );
                      })}
                    </div>
                  </Row>
                </Container>
              </StyledLayout2>
            ) : (
              <>
                {newScreen ? (
                  ''
                ) : (
                  <StyledLayout>
                    <Row className="lessondiv">
                      <Col>
                        <img
                          className="bluespeaker2"
                          style={{
                            height: '2rem',
                            width: '3rem',
                            marginLeft: '60rem',
                            marginTop: '5rem'
                          }}
                          src={BlueSpeaker}
                          onClick={(e) =>
                            startAudio(e, quizData[index].question_sound, index, 'quiz')
                          }
                        />
                      </Col>
                    </Row>
                    <Row
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                        // width: "52rem",
                      }}></Row>
                    <Container
                      className="mx-auto"
                      style={{
                        display: 'flex',
                        background: '#F9F9F9',
                        //   height: "100%",
                        alignItems: 'center',
                        flexDirection: 'column',
                        margin: '1rem',
                        padding: '1rem',
                        justifyContent: 'center'
                      }}>
                      <Row
                        className="mx-auto justify-content-center"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                          // width: "42",
                        }}>
                        <Col
                          className="contentbox"
                          onClick={(e) => choiceHandler1(e, quizData[index].choice1, 1)}
                          style={{
                            boxShadow: `${addborder === 1
                              ? 'rgb(255 202 0) 0rem -0.05rem 0.3rem 0rem'
                              : '0rem -0.05rem 0.3rem 0rem #888888'
                              }`
                          }}>
                          {/* box */}
                          <img
                            id="HelloImg"
                            style={{
                              height: '5rem',
                              width: '5rem',
                              marginBottom: '2.5rem'
                            }}
                            src={`${img}${quizData[index].choice1_image}`}
                          />
                          <p
                            style={{
                              // borderTop: "1px solid #ddd7d7",
                              width: '100%',
                              textAlign: 'center',
                              // paddingBottom: "1rem",
                              height: '2.4rem',
                              margin: '0rem',
                              // marginTop: "20px",

                              background: `${addborder == 1 ? '#F19C00' : 'white'}`,
                              boxShadow: `${addborder === 1
                                ? '#0rem -0.05rem 0.06rem 0rem #F19C00'
                                : '0rem -0.05rem 0.06rem 0rem #888888'
                                }`,
                              color: `${addborder == 1 ? 'white' : 'black'}`,
                              fontWeight: `${addborder == 1 ? '700' : '400'}`,
                              // fontWeight: "700",

                              // boxShadow: "0rem -0.05rem 0.06rem 0rem #888888",
                              cursor: 'pointer'
                            }}></p>
                        </Col>

                        <Col
                          className="contentbox"
                          onClick={(e) => choiceHandler1(e, quizData[index].choice2, 2)}
                          style={{
                            boxShadow: `${addborder === 2
                              ? 'rgb(255 202 0) 0rem -0.05rem 0.3rem 0rem'
                              : '0rem -0.05rem 0.3rem 0rem #888888'
                              }`
                          }}>
                          {/* box */}
                          <img
                            id="HelloImg"
                            style={{
                              height: '5rem',
                              width: '5rem',
                              marginBottom: '2.5rem'
                            }}
                            src={`${img}${quizData[index].choice2_image}`}
                          />
                          <p
                            style={{
                              // borderTop: "1px solid #ddd7d7",
                              width: '100%',
                              textAlign: 'center',
                              // paddingBottom: "1rem",
                              height: '2.4rem',
                              margin: '0rem',
                              // marginTop: "20px",

                              background: `${addborder == 2 ? '#F19C00' : 'white'}`,
                              boxShadow: `${addborder === 2
                                ? '#0rem -0.05rem 0.06rem 0rem #F19C00'
                                : '0rem -0.05rem 0.06rem 0rem #888888'
                                }`,
                              color: `${addborder == 2 ? 'white' : 'black'}`,
                              fontWeight: `${addborder == 2 ? '700' : '400'}`,
                              cursor: 'pointer'
                            }}></p>
                        </Col>

                        <Col
                          className="contentbox"
                          onClick={(e) => choiceHandler1(e, quizData[index].choice3, 3)}
                          style={{
                            boxShadow: `${addborder === 3
                              ? 'rgb(255 202 0) 0rem -0.05rem 0.3rem 0rem'
                              : '0rem -0.05rem 0.3rem 0rem #888888'
                              }`
                          }}>
                          {/* box */}
                          <img
                            id="HelloImg"
                            style={{
                              height: '5rem',
                              width: '5rem',
                              marginBottom: '2.5rem'
                            }}
                            src={`${img}${quizData[index].choice3_image}`}
                          />
                          <p
                            style={{
                              // borderTop: "1px solid #ddd7d7",
                              width: '100%',
                              textAlign: 'center',
                              // paddingBottom: "1rem",
                              height: '2.4rem',
                              margin: '0rem',
                              // marginTop: "20px",

                              background: `${addborder == 3 ? '#F19C00' : 'white'}`,
                              boxShadow: `${addborder === 3
                                ? '#0rem -0.05rem 0.06rem 0rem #F19C00'
                                : '0rem -0.05rem 0.06rem 0rem #888888'
                                }`,
                              color: `${addborder == 3 ? 'white' : 'black'}`,
                              fontWeight: `${addborder == 3 ? '700' : '400'}`,
                              cursor: 'pointer'
                            }}></p>
                        </Col>

                        <Col
                          className="contentbox"
                          onClick={(e) => choiceHandler1(e, quizData[index].choice4, 4)}
                          style={{
                            boxShadow: `${addborder === 4
                              ? 'rgb(255 202 0) 0rem -0.05rem 0.3rem 0rem'
                              : '0rem -0.05rem 0.3rem 0rem #888888'
                              }`
                          }}>
                          {/* box */}
                          <img
                            id="HelloImg"
                            style={{
                              height: '5rem',
                              width: '5rem',
                              marginBottom: '2.5rem'
                            }}
                            src={`${img}${quizData[index].choice4_image}`}
                          />
                          <p
                            style={{
                              // borderTop: "1px solid #ddd7d7",
                              width: '100%',
                              textAlign: 'center',
                              // paddingBottom: "1rem",
                              height: '2.4rem',
                              margin: '0rem',
                              // marginTop: "20px",

                              background: `${addborder == 4 ? '#F19C00' : 'white'}`,
                              boxShadow: `${addborder === 3
                                ? '#0rem -0.05rem 0.06rem 0rem #F19C00'
                                : '0rem -0.05rem 0.06rem 0rem #888888'
                                }`,
                              color: `${addborder == 4 ? 'white' : 'black'}`,
                              fontWeight: `${addborder == 4 ? '700' : '400'}`,
                              cursor: 'pointer'
                            }}></p>
                        </Col>
                      </Row>
                    </Container>
                  </StyledLayout>
                )}
              </>
            )}
          </div>
        </div>
      );
    } else {
      setQuizCount(0);
      // setquizResponse(true);
      axios
        .post(`${api}/ScoreQuizNew`, {
          user_email: localStorage.getItem('email_id'),
          score: quizSocre == 0 ? 1 : quizSocre,
          badge: badge,
          language: localStorage.getItem('lang'),
          attempt: attempts,
          current_quiz: currentQuiz,
          quiz_status: quizStatus
        })
        .then(() => {
          ViewCuerrentUser(localStorage.getItem('lang'));
        })
        .catch((err) => console.log(err));
    }
  }

  function incrementQuizHandler(e, initialcount, index) {
    e.preventDefault();
    var audio = '';
    // //Means if quiz ended
    if (index == 50) {
      if (quizStatus == 'Pass') {
        setPassPopup(true);
      } else {
        setFailPopup(true);
      }
    }

    if (quizData[initialcount].question_type == 3) {
      if (quizData[initialcount].lang_sen == q_choices.toString().replace(/,/g, ' ')) {
        setChoices('');
        setq_Choices([]);
        setQuizAnswer(true);
        setTimeout(() => {
          setQuizAnswer(false);
          //setNextBtn(true);
        }, 1000);

        setQuizCount(index);

        setQuizTrueAns(quizTrueAns + 1);
        setGifCount(gifCount + 1);
        setWrongAnswerCount(0);
        audio = new Audio(`${img}${quizData[index].sound}`);
        audio.play();
      } else {
        setButtonText('Wrong');
        window.setTimeout(() => {
          setButtonText('Check');
        }, 2000);
        if (wrongAnswerCount == 4) {
          setQuestionCorrectAnswer(questionCorrectAnswer);
          setWrongAnswerPopup(true);
          setWrongAnswerCount(0);
        }
      }
    } else {
      if (quizData[initialcount].answer == choice) {
        setChoice('');
        setq_Choices([]);
        setQuizCount(index);

        setQuizAnswer(true);
        setTimeout(() => {
          setQuizAnswer(false);
          //setNextBtn(true);
        }, 1000);
        setQuizTrueAns(quizTrueAns + 1);
        setGifCount(gifCount + 1);
        setWrongAnswerCount(0);
        audio = new Audio(`${img}${quizData[index].question_sound}`);
        audio.play();
      } else {
        setButtonText('Wrong');
        window.setTimeout(() => {
          setButtonText('Check');
        }, 2000);
        if (wrongAnswerCount == 4) {
          setQuestionCorrectAnswer(questionCorrectAnswer);
          setWrongAnswerPopup(true);
          setWrongAnswerCount(0);
        }
      }
    }

    if (gifCount == 4) {
      setTimeout(() => {
        setGifCount(0);
      }, 4000);
    }
  }

  function completeChapter() {
    // var params = new URLSearchParams();
    if (localStorage.getItem('email_id')) {
      axios
        .post(`${api}SetScoreNewLang`, {
          curr_chapter_no: parseInt(localStorage.getItem('chapter_no')) + 1,
          current_target_lang: localStorage.getItem('lang'),
          email_id: localStorage.getItem('email_id')
        })
        .then(() => {
          let next = parseInt(localStorage.getItem('chapter_no')) + 1;
          localStorage.setItem('chapter_no', next);
          let currentchp = next - 1;

          localStorage.setItem('count', 0);
          localStorage.setItem('q_incr', 1);
          setQuestionData([]);
          setCount(0);
          setGifCount(0);
          setisLoader(true);
          ViewCuerrentUser();
          setTimeout(() => {
            var isTrue = 0;
            if (userData && userData[0].cur_chapter_no == 3 && userData[0].score_farmer < 33) {
              isTrue = 1;
            }

            if (userData && userData[0].cur_chapter_no == 11 && userData[0].score_fisherman < 33) {
              isTrue = 1;
            }

            if (userData && userData[0].cur_chapter_no == 16 && userData[0].score_fisherman < 33) {
              isTrue = 1;
            }

            if (userData && userData[0].cur_chapter_no == 21 && userData[0].score_fisherman < 33) {
              isTrue = 1;
            }
            if (userData && userData[0].cur_chapter_no == 26 && userData[0].score_fisherman < 33) {
              isTrue = 1;
            }

            if (userData && userData[0].cur_chapter_no == 31 && userData[0].score_fisherman < 33) {
              isTrue = 1;
            }
            setisLoader(false);
            console.log(userData, 'userData');
            if (isTrue) {
              console.log('IAM TRUE');
              console.log(userData[0], 'userData[0]');
              navigate('/lessonDetail/' + next);
              setQuizPopup(true);
            } else {
              console.log('IAM FALSE');
              question();
              setTimeout(() => {
                navigate('/lessonDetail/' + next);
              }, 2000);
            }
          }, 2000);
        })
        .catch((err) => console.log(err));
      NotificationManager.success('Lesson Completed', 'Success', 3000);
    }
  }

  function choiceHandler(e, choice, sound, index, type, text = '') {
    e.preventDefault();
    setChoice(choice);

    if (localStorage.getItem('lang').indexOf('English') != -1) {
      speackEnglish(index, type, text);
    } else {
      sound = `${img}${sound}`;
      let audio = new Audio(sound);
      audio.play();
    }
  }

  function closePopup(e) {
    e.preventDefault();
    setQuestionData(false);
    setShowLessonCompletePopup(false);
  }

  function choicesHandler(e, val) {
    console.log(val, 'hvalue');
    const selectAudio = new Audio('/assets/sounds/click.wav');
    const volumeCheck = localStorage.getItem('Volume');
    volumeCheck == 'true' ? selectAudio.play() : null;
    e.preventDefault();
    // const unique = (arr) => [...new Set(arr)];
    setChoices([...choices, val]);
  }

  function deleteChoices(e, i, val) {
    const selectAudio = new Audio('/assets/sounds/unselect.wav');
    const volumeCheck = localStorage.getItem('Volume');
    volumeCheck == 'true' ? selectAudio.play() : null;
    e.preventDefault();
    var array = [...choices]; // make a separate copy of the array
    var index = array.indexOf(val);
    if (index !== -1) {
      array.splice(index, 1);
      setChoices(array);
    }
  }

  function againQuiz(e) {
    setCount(0);
    setChoices('');
    setq_Choices([]);
    setQuizCount(0);
    setQuizTrueAns(0);

    if (
      (userData ? userData[0].cur_chapter_no : 1) == 3 &&
      (userData ? userData[0].score_farmer : 34) < 33
    ) {
      getQuizQuestions(e, 'farmer', 1);
    }
    if (
      (userData ? userData[0].cur_chapter_no : 1) == 11 &&
      (userData ? userData[0].score_fisherman : 34) < 33
    ) {
      getQuizQuestions(e, 'fisherman', 2);
    }
    if (
      (userData ? userData[0].cur_chapter_no : 1) == 16 &&
      (userData ? userData[0].score_nat_doctor : 34) < 33
    ) {
      getQuizQuestions(e, 'doctor', 3);
    }
    if (
      (userData ? userData[0].cur_chapter_no : 1) == 21 &&
      (userData ? userData[0].score_hunter : 34) < 33
    ) {
      getQuizQuestions(e, 'hunter', 4);
    }
    if (
      (userData ? userData[0].cur_chapter_no : 1) == 26 &&
      (userData ? userData[0].score_elephant_hunt : 34) < 33
    ) {
      getQuizQuestions(e, 'ehunter', 5);
    }
    if (
      (userData ? userData[0].cur_chapter_no : 1) == 31 &&
      (userData ? userData[0].score_chief : 34) < 33
    ) {
      getQuizQuestions(e, 'chief', 6);
    }

    if (
      (userData ? userData[0].cur_chapter_no : 1) == 36 &&
      (userData ? userData[0].score_king : 34) < 33
    ) {
      getQuizQuestions(e, 'king', 7);
    }
  }

  function fav(e, ques_id, ty) {
    const audio = new Audio('/assets/sounds/like.wav');
    const audio2 = new Audio('/assets/sounds/dislike.wav');

    const volumeCheck = localStorage.getItem('Volume');
    volumeCheck == 'true' ? (ty == 'fav' ? audio2.play() : audio.play()) : console.log('');

    e.preventDefault();
    let currentChapterNo = localStorage.getItem('chapter_no');
    setFave(!fave);
    setisLoader(true);
    var questionType = questionData[count]['question_type'];
    var favChapterType = 1;
    if (questionType == 3) {
      favChapterType = 2;
    }
    // chapter_type: chapterType
    axios
      .post(`${api}PersonFavourite`, {
        user_email: localStorage.getItem('email_id'),
        ques_id,
        chapter_type: favChapterType,
        language: localStorage.getItem('lang')
      })
      .then((res) => {
        setisLoader(false);
        if (res.data.status == 'success') {
          axios
            .get(
              `${api}GetQuestionsNew?target_lang=${localStorage.getItem(
                'lang'
              )}&chapter_no=${currentChapterNo}&user_email=${localStorage.getItem('email_id')}`
            )
            .then((res) => {
              if (res.data.status == 'success') {
                const response = res.data.data;
                setQuestionData(response);
              }
            })
            .catch((err) => console.log(err));
          setFave(true);
          setChoices([]);
          if (ty == 'un') {
            NotificationManager.success(
              'Question has been favourite successfully!',
              'Success',
              3000
            );
            setFave(true);
          } else {
            NotificationManager.success(
              'Question has been UnFavourite successfully!',
              'Success',
              3000
            );
            setFave(false);
          }
        } else {
          setFave(false);
          if (localStorage.getItem('email_id') == 'guestUser') {
            NotificationManager.info('Guest user can not add lessons to favorite!', 'Alert', 5000);
          } else {
            NotificationManager.error('error Adding!', 'Error', 3000);
          }
        }
      })
      .catch((err) => console.log(err));
  }
  const newHintFunction = (res) => {
    console.log('Function invoked to set arr', res);
    let newArr = [];
    if (res && res[0]?.chapter_no === 1) {
      console.log('Question data from the useEffect', res);
      res?.forEach((element) => {
        const { lang_response, hints, hints_description } = element;
        const newObject = {
          answer: lang_response,
          choices: lang_response?.split(' '),
          // choices: shuffle([choice]),
          hints: hints?.split('@')[1],
          hints_description: hints_description?.split('@')[1],
          images: null,
          question_type: 3
        };
        newArr.push(newObject);
      });
      let newArr2 = [];
      for (let i = 0; i < res.length; i++) {
        newArr2.push(res[i], newArr[i]);
      }
      console.log(newArr2, '______new Arr');
      setQuestionData(newArr2);
    }
  };

  useEffect(() => {
    getChapterProgress();
    var urlval = window.location.href;
    var result = urlval.split('/').pop();
    setGifCount(0);
    ViewCuerrentUser();
    let lang = localStorage.getItem('lang');

    axios
      .get(`${api}GetLanguageDetails?language=${lang}&email_id=${localStorage.getItem('email_id')}`)
      .then((res) => {
        console.log(res, 'res');
        if (res.data.status == 'failed') {
          console.log('fail');
          question();
        } else {
          var newdata = res.data.data;
          var isTrue = 0;
          if (result == 6 && result == newdata[0].cur_chapter_no && newdata[0].score_farmer < 33) {
            isTrue = 1;
          }

          if (
            result == 11 &&
            result == newdata[0].cur_chapter_no &&
            newdata[0].score_fisherman < 33
          ) {
            isTrue = 1;
          }

          if (
            result == 16 &&
            result == newdata[0].cur_chapter_no &&
            newdata[0].score_nat_doctor < 33
          ) {
            isTrue = 1;
          }

          if (result == 21 && result == newdata[0].cur_chapter_no && newdata[0].score_hunter < 33) {
            isTrue = 1;
          }
          if (
            result == 26 &&
            result == newdata[0].cur_chapter_no &&
            newdata[0].score_elephant_hunt < 33
          ) {
            isTrue = 1;
          }

          if (result == 31 && result == newdata[0].cur_chapter_no && newdata[0].score_chief < 33) {
            isTrue = 1;
          }

          if (result == 36 && result == newdata[0].cur_chapter_no && newdata[0].score_king < 33) {
            isTrue = 1;
          }
          console.log('istrue' + isTrue);
          if (isTrue == 1) {
            setQuizPopup(true);
            console.log(userData, 'userData');
          } else {
            question();
          }
        }
      });
  }, []);

  return (
    <>
      {isLoader && <Loader />}
      {gifCount == 5 && <BusImg />}
      {ShowImage && (
        <>
          <Modal aria-labelledby="contained-modal-title-vcenter" centered show={ShowImage}>
            <Modal.Header closeButton onClick={() => setShowImage(false)}></Modal.Header>
            <Modal.Body>
              <img className="w-100" src={popupImage} alt="..." />
            </Modal.Body>
          </Modal>
        </>
      )}
      {showLessonCompletePopup ? (
        <div className="l_main">
          <div className="lessonpoup">
            <div className="l_content">Lesson Completed Successfully!!</div>
            <div className="l-btn w-100">
              <div className="w-50 m-auto">
                <button className="btn btn-primary" onClick={(e) => closePopup(e)}>
                  OK!
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <>
        {quiz ? (
          <>
            {showQuizHandler(quizCount)}
            {newScreen ? (
              ''
            ) : (
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                  // width: "52rem",
                }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                    // width: "52rem",
                  }}>
                  {quizAnswer ? (
                    <button
                      style={{
                        marginTop: '10rem',
                        background: 'green',
                        border: '0',
                        color: 'white',
                        borderRadius: '20px',
                        height: '50px',
                        paddingRight: '6rem',
                        paddingLeft: '6rem',
                        paddingTop: '0.5rem',
                        paddingBottom: '0.5rem'
                      }}
                      onClick={(e) => incrementQuizHandler(e, quizCount, quizCount + 1)}>
                      Submit
                    </button>
                  ) : (
                    <button
                      style={{
                        marginTop: '10rem',
                        background: `${buttonText == 'Check' ? '#F19C00' : 'red'}`,
                        border: '0',
                        color: 'white',
                        borderRadius: '20px',
                        height: '50px',
                        paddingRight: '6rem',
                        paddingLeft: '6rem',
                        paddingTop: '0.5rem',
                        paddingBottom: '0.5rem'
                      }}
                      onClick={
                        buttonText == 'Check'
                          ? (e) => incrementQuizHandler(e, quizCount, quizCount + 1)
                          : ''
                      }>
                      {buttonText}....
                    </button>
                  )}
                </div>
              </Row>
            )}
          </>
        ) : (
          <></>
        )}
        {questionData?.length > 0 ? (
          <>
            {questionData?.length > 0 && questionData[count]['question_type'] == 3 ? (
              <StyledLayout2>
                <Container
                  className="mx-auto"
                  style={{
                    display: 'flex',
                    background: '#F9F9F9',
                    //   height: "100%",
                    alignItems: 'center',
                    flexDirection: 'column',
                    margin: '1rem',
                    padding: '1rem',
                    justifyContent: 'center'
                  }}>
                  {/* progress bar */}
                  <Row
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                    <Col
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="This is your progress!"
                      style={{
                        fontWeight: '600',
                        width: '60px'
                      }}>
                      {Math.round((count / questionData.length) * 100)}%
                    </Col>
                    <Col>
                      <div className="progressBar2">
                        <ProgressBar now={Math.round((count / questionData.length) * 100)} />
                      </div>
                    </Col>
                    {questionData[count]?.fave === 1 ||
                      (questionData[count]['favedata'] &&
                        questionData[count]['favedata']?.filter(
                          (t) => t.language == localStorage.getItem('lang')
                        ) != '' &&
                        questionData[count]['favedata'] != null) ? (
                      <Col>
                        <img
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Click to remove from favorite"
                          className="heartimage"
                          onClick={(e) => fav(e, questionData[count]['record_id'], 'fav')}
                          src={UnFavorite}
                        />
                      </Col>
                    ) : (
                      <Col>
                        <img
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Click to add to favorite"
                          className="heartimage"
                          onClick={(e) => fav(e, questionData[count]['record_id'], 'un')}
                          src={Favorite}
                        />
                        {localStorage.getItem('newuser') === 'true' ? (
                          <span class="hideMeAfter5Seconds">
                            <img className="fav_progress_img" src={AddFavNewUserPopup} />
                          </span>
                        ) : (
                          <></>
                        )}
                      </Col>
                    )}
                  </Row>
                  {/* Statement */}
                  <Row>
                    <p className="tasktodo p-2 m-0">Translate this sentence</p>
                  </Row>
                  <Row className="question_no">
                    <p>Question No {parseInt(count) + 1}</p>
                  </Row>
                  {/* Lesson picture */}
                  <Row className="lessondiv">
                    <Col>
                      {questionData && questionData[count]['question_image'] ? (
                        <img
                          className="taskimage"
                          onClick={() =>
                            showImage(img + questionData[count]['question_image']) +
                            setShowImage(true)
                          }
                          src={`${img}${questionData[count]['question_image']}`}
                          alt="img"
                        />
                      ) : (
                        <img className="taskimage" src={LessonDetailsIcon} alt="img" />
                      )}
                    </Col>
                    <Col>
                      <img
                        className="bluespeaker2"
                        id="sentenseSpeaker"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Click to play audio!"
                        style={{
                          height: '2rem',
                          width: '3rem',
                          marginLeft: '2rem'
                        }}
                        src={BlueSpeaker}
                        onClick={(e) =>
                          startAudio(e, questionData[count].question_sound, count, 'question')
                        }
                      />
                    </Col>
                  </Row>
                  {/* Boxes */}
                  <Row
                    className=""
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      cursor: 'pointer'
                      // width: "52rem",
                    }}>
                    <div
                      className="gridCls "
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around'
                        // width: "52rem",
                      }}>
                      {choices.length > 0 &&
                        choices.map((d, i) => {
                          const split_d = d.split('_')[0];
                          return (
                            <Fragment key={i}>
                              {nextBtn ? (
                                <div key={i}>{split_d}</div>
                              ) : (
                                <p
                                  key={i}
                                  onClick={(e) => deleteChoices(e, i, d)}
                                  className="selected__choices">
                                  {split_d}
                                </p>
                              )}
                            </Fragment>
                          );
                        })}
                    </div>
                    <hr
                      style={{
                        border: 'none',
                        borderTop: '1px dotted #707070',
                        color: '#fff',
                        backgroundColor: '#fff',
                        height: '1px'
                        // width: "25rem",
                      }}
                    />
                    <hr
                      style={{
                        border: 'none',
                        borderTop: '1px solid #707070',
                        color: '#fff',
                        backgroundColor: '#fff',
                        height: '1px'
                        // width: "25rem",
                      }}
                    />

                    <div
                      className="testinf gridCls"
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        alignItems: 'flex-start'
                        // width: "52rem",
                      }}>
                      {questionData && localStorage.getItem('lang').indexOf('English') != -1
                        ?
                        questionData[count][count % 2 === 0 ? 'english_choices' : 'choices'].map((item, index) => {
                          return (
                            <Fragment key={index}>
                              {choices.indexOf(`${item}_${index}`) == -1 ? (
                                <p
                                  className="selected__choices"
                                  onClick={(e) => choicesHandler(e, `${item}_${index}`)}
                                  key={index}
                                  style={{
                                    color: 'black',
                                    background: '#E1E1E1',
                                    paddingRight: '1rem',
                                    paddingLeft: '1rem',
                                    paddingTop: '0.5rem',
                                    paddingBottom: '0.5rem',
                                    marginRight: '1rem'
                                  }}>
                                  {item}
                                </p>
                              ) : (
                                <div className="remove_choice"></div>
                              )}
                            </Fragment>
                          );
                        })
                        : questionData[count]['choices'].length > 0 &&
                        questionData[count]['choices'].map((item, index) => {
                          return (
                            <Fragment key={index}>
                              s
                              {hintDescriptionModal(descriptionHint[0])}
                              {choices.indexOf(`${item}_${index}`) == -1 ? (
                                <p
                                  onClick={(e) => choicesHandler(e, `${item}_${index}`)}
                                  key={index}
                                  className="selected__choices">
                                  {hints.some(
                                    (hint) => hint.toLowerCase() === item.toLowerCase()
                                  ) ? (
                                    <span onClick={() => setdescriptionHintModal(true)}>
                                      <span className="text-decoration-underline">{item}</span>
                                    </span>
                                  ) : (
                                    item
                                  )}
                                </p>
                              ) : (
                                <div className="remove_choice"></div>
                              )}
                            </Fragment>
                          );
                        })}
                    </div>
                  </Row>
                  <div className="flex">
                    {localStorage.getItem('tutor_active') == 'true' ? (
                      <button
                        className={`btn btn-warning mx-1 ${count === 0 ? 'disabled' : ''}`}
                        onClick={() => prev()}>
                        Prev
                      </button>
                    ) : (
                      <></>
                    )}
                    {localStorage.getItem('tutor_active') == 'true' ? (
                      <button
                        className={`btn btn-warning mx-1 ${questionData.length === count + 1 ? 'disabled' : ''
                          }`}
                        onClick={() => next()}>
                        Next
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                  {questionData[count]['question_type'] == 3 ? (
                    <>
                      {nextBtn ? (
                        <button
                          className="btn btn-success"
                          style={{
                            marginTop: '10rem',
                            border: '0',
                            color: 'white',
                            borderRadius: '20px',
                            height: '50px',
                            paddingRight: '6rem',
                            paddingLeft: '6rem',
                            paddingTop: '0.5rem',
                            paddingBottom: '0.5rem'
                          }}
                          onClick={(e) => incrementQuestionsHandler(e, count, count + 1, 'next')}>
                          Next
                        </button>
                      ) : (
                        <>
                          {answer ? (
                            <button
                              className="btn btn-success"
                              style={{
                                marginTop: '2rem',
                                border: '0',
                                color: 'white',
                                borderRadius: '10px',
                                height: '50px',
                                paddingRight: '6rem',
                                paddingLeft: '6rem',
                                paddingTop: '0.5rem',
                                paddingBottom: '0.5rem'
                              }}>
                              Correct!
                            </button>
                          ) : (
                            <button
                              style={{
                                marginTop: '2rem',
                                background: `${buttonText == 'Check' ? '#F19C00' : 'red'}`,
                                border: '0',
                                color: 'white',
                                borderRadius: '8px',
                                height: '50px',
                                paddingRight: '6rem',
                                paddingLeft: '6rem',
                                paddingTop: '0.5rem',
                                paddingBottom: '0.5rem',
                                transitionDuration: '100ms',
                                cursor: 'pointer'
                              }}
                              className={`submit__btn btn ${choices.length == 0 ? 'disabled' : ''
                                } `}
                              onClick={
                                buttonText == 'Check'
                                  ? (e) => incrementQuestionsHandler(e, count, count + 1, 'check')
                                  : ''
                              }>
                              {buttonText}
                            </button>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {answer ? (
                        <button
                          className="btn btn-success"
                          style={{
                            marginTop: '4rem',
                            border: '0',
                            color: 'white',
                            borderRadius: '10px',
                            height: '50px',
                            paddingRight: '6rem',
                            paddingLeft: '6rem',
                            paddingTop: '0.5rem',
                            paddingBottom: '0.5rem'
                          }}>
                          Correct!
                        </button>
                      ) : (
                        <button
                          style={{
                            marginTop: '10rem',
                            background: `${buttonText == 'Check' ? '#F19C00' : 'red'}`,
                            border: '0',
                            color: 'white',
                            borderRadius: '20px',
                            height: '50px',
                            paddingRight: '6rem',
                            paddingLeft: '6rem',
                            paddingTop: '0.5rem',
                            paddingBottom: '0.5rem'
                          }}
                          onClick={
                            buttonText == 'Check'
                              ? (e) => incrementQuestionsHandler(e, count, count + 1, 'check')
                              : ''
                          }>
                          {buttonText}
                        </button>
                      )}
                    </>
                  )}
                </Container>
              </StyledLayout2>
            ) : (
              <StyledLayout>
                <Container
                  className="mx-auto"
                  style={{
                    display: 'flex',
                    background: '#F9F9F9',
                    //   height: "100%",
                    alignItems: 'center',
                    flexDirection: 'column',
                    margin: '1rem',
                    padding: '1rem',
                    justifyContent: 'center'
                  }}>
                  {/* progress bar */}
                  <Row
                    className="mx-auto justify-content-center"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                      // width: "42",
                    }}>
                    <Col>
                      <p
                        style={{
                          fontWeight: '600'
                        }}>
                        {questionData ? Math.round((count / questionData.length) * 100) : ''}%
                      </p>
                    </Col>
                    <Col>
                      {' '}
                      <div className="progressBar">
                        <ProgressBar
                          now={questionData ? Math.round((count / questionData.length) * 100) : ''}
                        />
                      </div>
                    </Col>

                    {fave ||
                      (questionData[count]['favedata'] &&
                        questionData[count]['favedata']?.filter(
                          (t) => t.language == localStorage.getItem('lang')
                        ) != '' &&
                        questionData[count]['favedata'] != null) ? (
                      <Col>
                        <span className="heartImage_cls">
                          <img
                            className="heartimage imageabc"
                            style={{
                              width: '1.5rem',
                              height: '1.5rem',
                              marginLeft: '3rem',
                              cursor: 'pointer'
                            }}
                            onClick={(e) => fav(e, questionData[count]['record_id'], 'fav')}
                            src={UnFavorite}
                          />
                        </span>
                      </Col>
                    ) : (
                      <Col>
                        <img
                          className="heartimage imageabcd"
                          style={{
                            width: '1.5rem',
                            height: '1.5rem',
                            marginLeft: '3rem',
                            cursor: 'pointer'
                          }}
                          onClick={(e) => fav(e, questionData[count]['record_id'], 'un')}
                          src={Favorite}
                        />
                      </Col>
                    )}
                  </Row>
                  {/* Question number */}
                  <Row className="question_no">
                    <p>Question No {parseInt(count) + 1}</p>
                  </Row>
                  {/* Question */}
                  <Row className="question">
                    <p>{questionData ? questionData[count]['question'] : ''}</p>
                  </Row>

                  <img
                    className="bluespeaker2"
                    id="worldSpeaker"
                    style={{
                      height: '2rem',
                      width: '3rem',
                      marginLeft: '2rem',
                      display: 'none'
                    }}
                    src={BlueSpeaker}
                    onClick={(e) =>
                      startAudio(e, questionData[count].question_sound, count, 'question')
                    }
                  />

                  {/* Boxes */}
                  <Row className="boxarea">
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexShrink: 1
                      }}>
                      {questionData && (
                        <Col
                          className="contentbox"
                          onClick={(e) =>
                            choiceHandler(
                              e,
                              questionData[count]['choices'][0],
                              questionData[count]['sounds'][0],
                              count,
                              'question',
                              questionData[count]['choices'][0]
                            )
                          }
                          style={{
                            boxShadow: `${questionData[count]['choices'][0] === choice
                              ? 'rgb(255 202 0) 0rem -0.05rem 0.3rem 0rem'
                              : '0rem -0.05rem 0.3rem 0rem #888888'
                              }`
                          }}>
                          {/* box */}
                          <img
                            id="HelloImg"
                            style={{
                              height: '5rem',
                              width: '5rem',
                              marginBottom: '2.5rem'
                            }}
                            alt="..."
                            src={`${img}${questionData[count]['images'][0]}`}
                          />
                          <p
                            style={{
                              // borderTop: "1px solid #ddd7d7",
                              width: '100%',
                              textAlign: 'center',
                              // paddingBottom: "1rem",
                              height: '2.4rem',
                              margin: '0rem',
                              // marginTop: "20px",

                              background: `${questionData[count]['choices'][0] === choice ? '#F19C00' : 'white'
                                }`,
                              boxShadow: `${questionData[count]['choices'][0] === choice
                                ? '#0rem -0.05rem 0.06rem 0rem #F19C00'
                                : '0rem -0.05rem 0.06rem 0rem #888888'
                                }`,
                              color: `${questionData[count]['choices'][0] === choice ? 'white' : 'black'
                                }`,
                              fontWeight: `${questionData[count]['choices'][0] === choice ? '700' : '400'
                                }`,
                              // fontWeight: "700",

                              // boxShadow: "0rem -0.05rem 0.06rem 0rem #888888",
                              cursor: 'pointer'
                            }}>
                            <p
                              style={{
                                marginTop: '6px'
                              }}>
                              {questionData[count]['choices'][0]}
                            </p>
                          </p>
                        </Col>
                      )}
                      {questionData && (
                        <Col
                          className="contentbox"
                          onClick={(e) =>
                            choiceHandler(
                              e,
                              questionData[count]['choices'][1],
                              questionData[count]['sounds'][1],
                              count,
                              'question',
                              questionData[count]['choices'][1]
                            )
                          }
                          style={{
                            boxShadow: `${questionData[count]['choices'][1] === choice
                              ? 'rgb(255 202 0) 0rem -0.05rem 0.3rem 0rem'
                              : '0rem -0.05rem 0.3rem 0rem #888888'
                              }`
                          }}>
                          {/* box */}
                          <img
                            id="HelloImg"
                            style={{
                              height: '5rem',
                              width: '5rem',
                              marginBottom: '2.5rem'
                            }}
                            src={`${img}${questionData[count]['images'][1]}`}
                          />
                          <p
                            style={{
                              // borderTop: "1px solid #ddd7d7",
                              width: '100%',
                              textAlign: 'center',
                              // paddingBottom: "1rem",
                              height: '2.4rem',
                              margin: '0rem',
                              // marginTop: "20px",

                              background: `${questionData[count]['choices'][1] === choice ? '#F19C00' : 'white'
                                }`,
                              boxShadow: `${questionData[count]['choices'][1] === choice
                                ? '#0rem -0.05rem 0.06rem 0rem #F19C00'
                                : '0rem -0.05rem 0.06rem 0rem #888888'
                                }`,
                              color: `${questionData[count]['choices'][1] === choice ? 'white' : 'black'
                                }`,
                              fontWeight: `${questionData[count]['choices'][1] === choice ? '700' : '400'
                                }`,

                              // fontWeight: "700",

                              // boxShadow: "0rem -0.05rem 0.06rem 0rem #888888",
                              cursor: 'pointer'
                            }}
                          // onClick={() => {
                          //   setSelected(questionData[count]['record_id']);
                          // }}
                          >
                            <p
                              style={{
                                marginTop: '6px'
                              }}>
                              {questionData[count]['choices'][1]}
                            </p>
                          </p>
                        </Col>
                      )}

                      {questionData && (
                        <Col
                          className="contentbox"
                          onClick={(e) =>
                            choiceHandler(
                              e,
                              questionData[count]['choices'][2],
                              questionData[count]['sounds'][2],
                              count,
                              'question',
                              questionData[count]['choices'][2]
                            )
                          }
                          style={{
                            boxShadow: `${questionData[count]['choices'][2] === choice
                              ? 'rgb(255 202 0) 0rem -0.05rem 0.3rem 0rem'
                              : '0rem -0.05rem 0.3rem 0rem #888888'
                              }`
                          }}>
                          {/* box */}
                          <img
                            id="HelloImg"
                            style={{
                              height: '5rem',
                              width: '5rem',
                              marginBottom: '2.5rem'
                            }}
                            src={`${img}${questionData ? questionData[count]['images'][2] : ''}`}
                          />
                          <p
                            style={{
                              // borderTop: "1px solid #ddd7d7",
                              width: '100%',
                              textAlign: 'center',
                              // paddingBottom: "1rem",
                              height: '2.4rem',
                              margin: '0rem',
                              // marginTop: "20px",

                              background: `${questionData[count]['choices'][2] === choice ? '#F19C00' : 'white'
                                }`,
                              boxShadow: `${questionData[count]['choices'][2] === choice
                                ? '#0rem -0.05rem 0.06rem 0rem #F19C00'
                                : '0rem -0.05rem 0.06rem 0rem #888888'
                                }`,
                              color: `${questionData[count]['choices'][2] === choice ? 'white' : 'black'
                                }`,
                              fontWeight: `${questionData[count]['choices'][2] === choice ? '700' : '400'
                                }`,

                              // fontWeight: "700",

                              // boxShadow: "0rem -0.05rem 0.06rem 0rem #888888",
                              cursor: 'pointer'
                            }}
                          // onClick={() => {
                          //   setSelected(questionData ? questionData[count]['record_id'] : '');
                          // }}
                          >
                            <p
                              style={{
                                marginTop: '6px'
                              }}>
                              {questionData ? questionData[count]['choices'][2] : ''}
                            </p>
                          </p>
                        </Col>
                      )}
                      {questionData && (
                        <Col
                          className="contentbox"
                          onClick={(e) =>
                            choiceHandler(
                              e,
                              questionData[count]['choices'][3],
                              questionData[count]['sounds'][3],
                              count,
                              'question',
                              questionData[count]['choices'][3]
                            )
                          }
                          style={{
                            boxShadow: `${questionData[count]['choices'][3] === choice
                              ? 'rgb(255 202 0) 0rem -0.05rem 0.3rem 0rem'
                              : '0rem -0.05rem 0.3rem 0rem #888888'
                              }`
                          }}>
                          {/* box */}
                          <img
                            id="HelloImg"
                            style={{
                              height: '5rem',
                              width: '5rem',
                              marginBottom: '2.5rem'
                            }}
                            src={`${img}${questionData[count]['images'][3]}`}
                          />
                          <p
                            style={{
                              // borderTop: "1px solid #ddd7d7",
                              width: '100%',
                              textAlign: 'center',
                              // paddingBottom: "1rem",
                              height: '2.4rem',
                              margin: '0rem',
                              // marginTop: "20px",

                              background: `${questionData[count]['choices'][3] === choice ? '#F19C00' : 'white'
                                }`,
                              boxShadow: `${questionData[count]['choices'][3] === choice
                                ? '#0rem -0.05rem 0.06rem 0rem #F19C00'
                                : '0rem -0.05rem 0.06rem 0rem #888888'
                                }`,
                              color: `${questionData[count]['choices'][3] === choice ? 'white' : 'black'
                                }`,
                              fontWeight: `${questionData
                                ? questionData[count]['choices'][3]
                                : '' === choice
                                  ? '700'
                                  : '400'
                                }`,
                              cursor: 'pointer'
                            }}>
                            <p
                              style={{
                                marginTop: '6px'
                              }}>
                              {questionData[count]['choices'][3]}
                            </p>
                          </p>
                        </Col>
                      )}
                    </div>
                  </Row>
                  {questionData[count]['question_type'] != 3 ? (
                    <>
                      {nextBtn ? (
                        <button
                          style={{
                            color: 'green',
                            borderRadius: '20px',
                            height: '50px',
                            borderColor: 'transparent',
                            width: '15%'
                          }}
                          className="btn btn-danger btnWorldButton"
                          onClick={(e) => incrementQuestionsHandler(e, count, count + 1, 'next')}>
                          Next
                        </button>
                      ) : (
                        <>
                          {answer ? (
                            <button
                              className="btn btn-success btnWorldButton"
                              style={{ borderRadius: '20px', height: '50px', width: '15%' }}>
                              Check
                            </button>
                          ) : (
                            <button
                              className="btnWorldButton"
                              style={{
                                borderRadius: '20px',
                                height: '50px',
                                width: '15%',
                                borderColor: 'transparent',
                                background: `${buttonText == 'Check' ? '#F19C00' : 'red'}`
                              }}
                              onClick={
                                buttonText == 'Check'
                                  ? (e) => incrementQuestionsHandler(e, count, count + 1, 'check')
                                  : ''
                              }>
                              {buttonText}
                            </button>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {answer ? (
                        <button
                          className="btn btn-success"
                          style={{
                            marginTop: '10rem',
                            border: '0',
                            color: 'white',
                            borderRadius: '20px',
                            height: '50px',
                            paddingRight: '6rem',
                            paddingLeft: '6rem',
                            paddingTop: '0.5rem',
                            paddingBottom: '0.5rem'
                          }}>
                          Submit
                        </button>
                      ) : (
                        <button
                          style={{
                            marginTop: '10rem',
                            background: `${buttonText == 'Check' ? '#F19C00' : 'red'}`,
                            border: '0',
                            color: 'white',
                            borderRadius: '20px',
                            height: '50px',
                            paddingRight: '6rem',
                            paddingLeft: '6rem',
                            paddingTop: '0.5rem',
                            paddingBottom: '0.5rem'
                          }}
                          onClick={
                            buttonText == 'Check'
                              ? (e) => incrementQuestionsHandler(e, count, count + 1, 'check')
                              : ''
                          }>
                          {buttonText}
                        </button>
                      )}
                    </>
                  )}
                </Container>
              </StyledLayout>
            )}
          </>
        ) : (
          <section className="content-area container px-4">
            {(userData && window.location.href.split('/').pop() == 3 && userData.length > 0
              ? userData[0].cur_chapter_no
              : 1) == 3 &&
              (userData && userData.length > 0 ? userData[0].score_farmer : 34) < 33 ? (
              <>{quizPopup ? getQuiz('farmer', 1) : null}</>
            ) : null}
            {(userData && window.location.href.split('/').pop() == 11 && userData.length > 0
              ? userData[0].cur_chapter_no
              : 1) == 11 &&
              (userData && userData.length > 0 ? userData[0].score_fisherman : 34) < 33 ? (
              <>{quizPopup ? getQuiz('fisherman', 2) : null}</>
            ) : null}
            {(userData && window.location.href.split('/').pop() == 16 && userData.length > 0
              ? userData[0].cur_chapter_no
              : 1) == 16 &&
              (userData && userData.length > 0 ? userData[0].score_nat_doctor : 34) < 33 ? (
              <>{quizPopup ? getQuiz('doctor', 3) : null}</>
            ) : null}
            {(userData && window.location.href.split('/').pop() == 21 && userData.length > 0
              ? userData[0].cur_chapter_no
              : 1) == 21 &&
              (userData && userData.length > 0 ? userData[0].score_hunter : 34) < 33 ? (
              <>{quizPopup ? getQuiz('hunter', 4) : null}</>
            ) : null}
            {(userData && window.location.href.split('/').pop() == 26 && userData.length > 0
              ? userData[0].cur_chapter_no
              : 1) == 26 &&
              (userData && userData.length > 0 ? userData[0].score_elephant_hunt : 34) < 33 ? (
              <>{quizPopup ? getQuiz('ehunter', 5) : null}</>
            ) : null}
            {(userData && window.location.href.split('/').pop() == 31 && userData.length > 0
              ? userData[0].cur_chapter_no
              : 1) == 31 && (userData && userData.length > 0 ? userData[0].score_chief : 34) ? (
              <>{quizPopup ? getQuiz('chief', 6) : null}</>
            ) : null}
            {(userData && window.location.href.split('/').pop() == 36 && userData.length > 0
              ? userData[0].cur_chapter_no
              : 1) == 36 && (userData && userData.length > 0 ? userData[0].score_king : 34) ? (
              <>{quizPopup ? getQuiz('king', 7) : null}</>
            ) : null}
          </section>
        )}

        {questionData.length > 0 && questionData.length == count ? completeChapter() : ''}
      </>
      <Modal show={wrongAnswerPopup} onHide={wrongAnswerPopup}>
        <Modal.Header>
          <Modal.Title>Correct Answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Correct Answer is: </p>
          <b>{questionCorrectAnswer}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setWrongAnswerPopup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={failPopup} onHide={failPopup}>
        <Modal.Header>
          <Modal.Title>Quiz Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Not Pass Quiz</h4>
          <p>Total Questions: {quizData ? quizData.length : 50}</p>
          <p>Correct Answer: {quizTrueAns ? quizTrueAns : 0}</p>
          <p>Wrong Answer: {quizData ? quizData.length - quizTrueAns : 0}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setPassPopup(false)}>
            Not Now
          </Button>
          <Button
            variant="success"
            onClick={(e) => {
              setFailPopup(false);
              againQuiz(e);
            }}>
            Again Quiz
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={passPopup} onHide={passPopup}>
        <Modal.Header>
          <Modal.Title>Quiz Result</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="title">{getText().title1}</div>
          <div className="badge_img mb-3">
            {(userData ? userData[0].cur_chapter_no : 1) == 3 && (
              <div style={{ margin: 'auto', width: '25%' }}>
                <img width="70" src={FarmerIcon} alt="badge_image" />
                {/*<span>Farmer</span>*/}
              </div>
            )}

            {(userData ? userData[0].cur_chapter_no : 1) == 11 && (
              <div style={{ margin: 'auto', width: '25%' }}>
                <img width="70" src={FarmerIcon} alt="badge_image" />
                {/*<span>Fisherman</span>*/}
              </div>
            )}
            {(userData ? userData[0].cur_chapter_no : 1) == 16 && (
              <div style={{ margin: 'auto', width: '25%' }}>
                <img width="70" src={NativeDoctorIcon} alt="badge_image" />
                {/*<span>Doctor</span>*/}
              </div>
            )}
            {(userData ? userData[0].cur_chapter_no : 1) == 21 && (
              <div style={{ margin: 'auto', width: '25%' }}>
                <img width="70" src={HunterIcon} alt="badge_image" />
                {/*<span>Hunter</span>*/}
              </div>
            )}
            {(userData ? userData[0].cur_chapter_no : 1) == 26 && (
              <div style={{ margin: 'auto', width: '25%' }}>
                <img width="70" src={ElephantHunterIcon} alt="badge_image" />
                {/*<span>Elephent Hunter</span>*/}
              </div>
            )}
            {(userData ? userData[0].cur_chapter_no : 1) == 31 && (
              <div style={{ margin: 'auto', width: '25%' }}>
                <img width="70" src={ChiefIcon} alt="badge_image" />
                {/*<span>Chief</span>*/}
              </div>
            )}
            {(userData ? userData[0].cur_chapter_no : 1) == 36 && (
              <div style={{ margin: 'auto', width: '25%' }}>
                <img width="70" src={KingIcon} alt="badge_image" />
                {/*<span>King</span>*/}
              </div>
            )}
          </div>
          <div className="title mb-3">{getText().title2}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setPassPopup(false);
              setUserData([]);
              question();
              setNewScreen(true);
            }}>
            Go To New Chapter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Detail;

const StyledLayout2 = styled.div`
  .fav_progress_img {
    width: 280px;
    position: absolute;
    margin-left: -280px;
    margin-top: 25px;
    animation: shake 1.5s;
    animation-iteration-count: infinite;
  }
  @keyframes shake {
    0% {
      transform: translate(0px, 0px) rotate(0deg);
    }
    50% {
      transform: translate(-4px, 8px) rotate(0deg);
    }
    100% {
      transform: translate(0px, 0px) rotate(0deg);
    }
  }
  .hideMeAfter5Seconds {
    animation: hideAnimation 0s ease-in 5s;
    animation-fill-mode: forwards;
  }

  @keyframes hideAnimation {
    to {
      visibility: hidden;
      width: 0;
      height: 0;
    }
  }
  .heartimage {
    width: 1.6rem;
    height: 1.5rem;
    margin-left: 0.5rem;
    margin-bottom: 0.6rem;
    cursor: pointer;
    transition-duration: 150ms;
  }
  .heartimage:hover {
    transform: scale(1.13);
    transition-duration: 150ms;
  }
  .submit__btn:hover {
    transform: scale(1.03);
    transition-duration: 100ms;
    box-shadow: 0px 1px 2px darkgrey;
  }

  .selected__choices {
    color: black;
    background: #e1e1e1;
    padding-right: 1rem;
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-right: 1rem;
    transition-duration: 100ms;
  }
  .selected__choices:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition-duration: 150ms;
    box-shadow: 0px 1px 2px darkgrey;
  }

  .bluespeaker2 {
    transition-duration: 150ms;
    background-color: transparent;
  }
  .bluespeaker2:hover {
    cursor: pointer;
    color: red;
    transform: scale(1.2);
    transition-duration: 150ms;
  }
  .progressBar2 {
    margin-top: 0.2rem;
    width: 32rem;
  }
  .boxarea2 {
    display: flex;
    align-items: center;
  }
  .progress-bar {
    background-color: #a1d363 !important;
  }
  .question2 {
    font-weight: 700;
  }
  .question_no2 {
    font-weight: 800;
    text-transform: uppercase;
  }
  .contentbox2 {
    display: flex;
    flex-direction: column;
    background: white;
    justify-content: flex-end;
    min-height: 12rem;
    min-width: 10rem;
    max-height: 12rem;
    max-width: 10rem;
    padding: 0 !important;
    align-items: center;
    margin-left: 1rem;
    margin-bottom: 1rem;

    /* padding-bottom: 1rem; */
  }
  .tasktodo {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 1rem;
  }
  .taskimage {
    cursor: pointer;
    height: 229px;
    width: 267px;
  }
  .lessondiv {
    display: flex;
    flex-direction: row;
    margin-bottom: 2.5rem;
    margin-top: 0.5rem;
    margin-left: 6rem;
  }

  @media screen and (max-width: 1333px) {
    .progressBar2 {
      width: 28rem;
    }
  }
  @media screen and (max-width: 1272px) {
    .lessondiv {
      margin-left: 6rem;
    }
  }
  @media screen and (max-width: 1176px) {
    .lessondiv {
      margin-left: 6rem;
    }
  }
  @media screen and (max-width: 1144px) {
    .progressBar2 {
      width: 18rem;
    }
    .lessondiv {
      margin-left: 4rem;
    }
  }
  @media screen and (max-width: 1086px) {
    .progressBar2 {
      width: 16rem;
    }
    .tasktodo {
      font-size: 1.5rem;
    }
    .nextimage2 {
      margin-left: 0rem;
    }
    .bluespeaker2 {
      margin-left: 1rem;
    }

    .taskimage {
      height: 183.2px;
      width: 213.6px;
    }
  }
  @media screen and (max-width: 1026px) {
    .progressBar2 {
      width: 20rem;
    }
    .bluespeaker2 {
      margin-left: 0rem;
    }
    .lessondiv {
      margin-left: 2rem;
    }
    .col {
      padding-left: 0rem !important;
    }
  }
  /* @media screen and (max-width: 888px) {
  .lessondiv {
    margin-left: rem;
  }
} */

  @media screen and (max-width: 770px) {
    .progressBar2 {
      width: 16rem;
    }

    .col {
      padding-left: 0rem !important;
    }
  }

  @media screen and (max-width: 704px) {
    .progressBar2 {
      width: 12rem;
    }
    .col {
      padding-left: 0rem !important;
    }
    .heartimage {
      margin-left: 1rem;
    }
    .bluespeaker2 {
      margin-left: 0rem;
    }
    .taskimage {
      height: 137.4px;
      width: 160.2px;
    }
  }

  @media screen and (max-width: 563px) {
    .progressBar2 {
      width: 12rem;
    }
    .taskimage {
      height: 137.4px;
      width: 160.2px;
    }
  }

  @media screen and (max-width: 540px) {
    .progressBar2 {
      width: 12rem;
    }
    .taskimage {
      height: 109.92px;
      width: 128.16px;
    }
    .tasktodo {
      font-size: 1rem;
    }
    .col {
      padding-right: 0rem !important;
    }
  }
`;
const StyledLayout = styled.div`
  .progressBar {
    margin-top: 0.2rem;
    width: 32rem;
    margin-bottom: 2rem;
  }

  .boxarea {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
  .boxarea .row {
    /* flex-shrink: 1 !important;
  width: auto;
  max-width: auto; */
  }
  .progress-bar {
    background-color: #a1d363 !important;
  }
  .question {
    font-weight: 700;
    margin-bottom: 4rem;
  }
  .question_no {
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
  .contentbox {
    display: flex;
    flex-direction: column;
    background: white;
    justify-content: flex-end;
    min-height: 12rem;
    min-width: 10rem;
    max-height: 12rem;
    max-width: 10rem;
    padding: 0 !important;
    align-items: center;
    margin-left: 1rem;
    margin-bottom: 1rem;

    /* padding-bottom: 1rem; */
  }
  @media screen and (max-width: 1333px) {
    .progressBar {
      width: 28rem;
    }
  }
  @media screen and (max-width: 1086px) {
    .progressBar {
      width: 24rem;
    }
  }
  @media screen and (max-width: 1022px) {
    .progressBar {
      width: 21rem;
    }
  }
  @media screen and (max-width: 768px) {
    .progressBar {
      width: 18rem;
    }
  }
  @media screen and (max-width: 560px) {
    .progressBar {
      width: 12rem;
    }
  }
`;
