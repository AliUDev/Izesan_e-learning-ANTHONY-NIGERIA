import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import styled from 'styled-components';
import Corner from '../../../assets/images/corner_fvrt.png';
// import Doctor from '../../../assets/images/doctor.png';
import DropDownIcon from '../../../assets/images/dropdown_icon_2.png';
// import Guitar from '../../../assets/images/guitarboy.png';
import axios from 'axios';
import BlueSpeaker from '../../../assets/images/blue_speaker.png';
import Favorite from '../../../assets/images/favorite@2x.png';
import UnFavorite from '../../../assets/images/fvrt_red.png';
import Heading from '../../../Components/Common/Heading';
import { api, img } from '../../../url';
function Favorites() {
  const [data, setData] = useState(false);
  // const [isLoader, setisLoader] = useState(false);
  const [questionData, setQuestionData] = useState(false);
  const [fave, setFave] = useState(false);
  const [addborder, setAddborder] = useState('');
  // const [b_color_name, setb_color_name] = useState('');
  const [answer, setAnswer] = useState(false);
  const [choice, setChoice] = useState('');
  const [lang, setLang] = useState(false);
  const [chapterType, setChapterType] = useState(false);
  const [choices, setChoices] = useState([]);
  const [nextBtn, setNextBtn] = useState(false);
  // const [err, seterr] = useState(false);
  const [currentLang, setCurrentLang] = useState('');

  function getData(language) {
    //let language = e.target.value;
    localStorage.setItem('fav_current_dropdown_value', language);
    // setisLoader(true);
    axios
      .get(
        `${api}PersonFavouritesAllNew?user_email=${localStorage.getItem(
          'email_id'
        )}&language=${language}`
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.status == 'success') {
          // setisLoader(false);
          setData(res.data.data);
        } else {
          // setisLoader(false);
          setData([]);
          // seterr('No content found!!');
        }
      })
      .catch((err) => console.log(err));
  }
  function fav(e, ques_id, ty, lang = '') {
    if (lang == '') {
      lang = localStorage.getItem('fav_current_dropdown_value');
      // lang = localStorage.getItem('lang');
    }

    e.preventDefault();
    setFave(!fave);
    axios
      .post(`${api}PersonFavourite`, {
        user_email: localStorage.getItem('email_id'),
        ques_id,
        language: lang,
        chapter_type: chapterType
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 'success') {
          setFave(true);
          if (ty == 'un') {
            alert('UnFavorite');
            setFave(true);
            setTimeout(() => {
              getData(lang);
              setQuestionData(false);
            }, 2000);
          } else {
            alert('Favourite');
            setFave(false);
            getData(lang);
            // setTimeout(() => {
            //   setFmsg(false);
            // }, 2000);
          }
        } else {
          setFave(false);
          alert('error Adding!');
          // setFmsg('error adding!!');
        }
      })
      .catch((err) => console.log(err));
  }
  function choiceHandler(e, choice, setIndexOfBorder, sound, langType) {
    e.preventDefault();
    setAddborder(setIndexOfBorder);
    // setb_color_name('1px solid #f10a0a');
    setChoice(choice);
    switch (langType) {
      case 'Esan':
        var audio = new Audio(`${img}/${sound}`);
        audio.play();
        break;
      default:
        break;
    }
  }

  function startAudio(e, aud) {
    e.preventDefault();
    var audio = new Audio(`${img}/${aud}`);
    audio.play();
  }

  function getQuestions(e, allData, ln, ct) {
    e.preventDefault();
    setAnswer(false);
    setFave(false);
    // setb_color_name(false);
    setChoice(false);
    console.log('all data');
    console.log(allData);
    setQuestionData(allData);
    setLang(ln);
    setChapterType(ct);
  }
  function incrementQuestionsHandler(e) {
    e.preventDefault();
    setFave(false);
    var audio = '';
    if (chapterType == 2) {
      if (lang == 'English') {
        if (questionData.question == choices.toString().replace(/,/g, ' ')) {
          setAnswer(true);
          audio = new Audio('assets/sounds/success.mp3');
          audio.play();
          setTimeout(() => {
            setAnswer(false);
            setNextBtn(true);
            setQuestionData(false);
          }, 1000);
        } else {
          audio = new Audio('assets/sounds/fail.mp3');
          audio.play();
        }
      } else {
        if (questionData.answer == choices.toString().replace(/,/g, ' ')) {
          setAnswer(true);
          audio = new Audio('assets/sounds/success.mp3');
          audio.play();
          setTimeout(() => {
            setAnswer(false);
            setNextBtn(true);
            setQuestionData(false);
          }, 1000);
        } else {
          audio = new Audio('assets/sounds/fail.mp3');
          audio.play();
        }
      }
    } else {
      if (questionData.answer == choice) {
        setAnswer(true);
        audio = new Audio('assets/sounds/success.mp3');
        audio.play();
        // setb_color_name('1px solid green');
        setTimeout(() => {
          // setb_color_name('0px');
          setQuestionData(false);
        }, 1000);
      } else {
        audio = new Audio('assets/sounds/fail.mp3');
        audio.play();
        // setb_color_name('1px solid #f10a0a');
      }
    }
  }
  function choicesHandler(e, val) {
    e.preventDefault();
    setChoices([...choices, val]);
  }

  function deleteChoices(e, i, val) {
    var array = [...choices]; // make a separate copy of the array
    var index = array.indexOf(val);
    if (index !== -1) {
      array.splice(index, 1);
      setChoices(array);
    }
  }

  useEffect(() => {
    setCurrentLang(
      localStorage.getItem('fav_current_dropdown_value')
        ? localStorage.getItem('fav_current_dropdown_value')
        : ''
    );
    //getData();
  }, []);
  return (
    <>
      {questionData ? (
        <>
          {chapterType != 2 ? (
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

                <Row className="question_no">
                  <p>Question No {questionData['question_no']}</p>
                  <p>Question: {questionData['question']}</p>
                  {fave ? (
                    <Col>
                      Do you want to Favourite ?
                      <img
                        className="heartimage"
                        style={{
                          width: '1.5rem',
                          height: '1.5rem',
                          marginLeft: '3rem',
                          cursor: 'pointer'
                        }}
                        onClick={(e) =>
                          fav(e, questionData['record_id'], 'fav', questionData['language'])
                        }
                        src={Favorite}
                      />
                    </Col>
                  ) : (
                    <Col>
                      Do you want to UnFavorite ?
                      <img
                        className="heartimage"
                        style={{
                          width: '1.5rem',
                          height: '1.5rem',
                          marginLeft: '3rem',
                          cursor: 'pointer'
                        }}
                        onClick={(e) =>
                          fav(e, questionData['record_id'], 'un', questionData['language'])
                        }
                        src={UnFavorite}
                      />
                    </Col>
                  )}
                </Row>

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
                    onClick={(e) =>
                      choiceHandler(
                        e,
                        questionData['choices'][0],
                        1,
                        questionData['sounds'] ? questionData['sounds'][0] : null
                      )
                    }
                    style={{
                      boxShadow: `${addborder == 1
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
                      src={`${img}/${questionData['images'][0]}`}
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
                        boxShadow: `${addborder == 1
                          ? '#0rem -0.05rem 0.06rem 0rem #F19C00'
                          : '0rem -0.05rem 0.06rem 0rem #888888'
                          }`,
                        color: `${addborder == 1 ? 'white' : 'black'}`,
                        fontWeight: `${addborder == 1 ? '700' : '400'}`,
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
                        {questionData.choices[0] ? questionData.choices[0] : null}
                      </p>
                    </p>
                  </Col>

                  <Col
                    className="contentbox"
                    onClick={(e) =>
                      choiceHandler(
                        e,
                        questionData['choices'][1],
                        2,
                        questionData['sounds'] ? questionData['sounds'][1] : null
                      )
                    }
                    style={{
                      boxShadow: `${addborder == 2
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
                      src={`${img}/${questionData['images'][1]}`}
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
                        boxShadow: `${addborder == 2
                          ? '#0rem -0.05rem 0.06rem 0rem #F19C00'
                          : '0rem -0.05rem 0.06rem 0rem #888888'
                          }`,
                        color: `${addborder == 2 ? 'white' : 'black'}`,
                        fontWeight: `${addborder == 2 ? '700' : '400'}`,
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
                        {questionData.choices[1] ? questionData.choices[1] : null}
                      </p>
                    </p>
                  </Col>

                  <Col
                    className="contentbox"
                    onClick={(e) =>
                      choiceHandler(
                        e,
                        questionData['choices'][2],
                        3,
                        questionData['sounds'] ? questionData['sounds'][2] : null
                      )
                    }
                    style={{
                      boxShadow: `${addborder == 3
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
                      src={`${img}/${questionData['images'][2]}`}
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
                        boxShadow: `${addborder == 3
                          ? '#0rem -0.05rem 0.06rem 0rem #F19C00'
                          : '0rem -0.05rem 0.06rem 0rem #888888'
                          }`,
                        color: `${addborder == 3 ? 'white' : 'black'}`,
                        fontWeight: `${addborder == 3 ? '700' : '400'}`,
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
                        {questionData.choices[2] ? questionData.choices[2] : null}
                      </p>
                    </p>
                  </Col>

                  <Col
                    className="contentbox"
                    onClick={(e) =>
                      choiceHandler(
                        e,
                        questionData['choices'][3],
                        4,
                        questionData['sounds'] ? questionData['sounds'][3] : null
                      )
                    }
                    style={{
                      boxShadow: `${addborder == 4
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
                      src={`${img}/${questionData['images'][3]}`}
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
                        boxShadow: `${addborder == 4
                          ? '#0rem -0.05rem 0.06rem 0rem #F19C00'
                          : '0rem -0.05rem 0.06rem 0rem #888888'
                          }`,
                        color: `${addborder == 4 ? 'white' : 'black'}`,
                        fontWeight: `${addborder == 4 ? '700' : '400'}`,
                        // fontWeight: "700",

                        // boxShadow: "0rem -0.05rem 0.06rem 0rem #888888",
                        cursor: 'pointer'
                      }}>
                      <p
                        style={{
                          marginTop: '6px'
                        }}>
                        {questionData.choices[3] ? questionData.choices[3] : null}
                      </p>
                    </p>
                  </Col>
                </Row>
              </Container>
            </StyledLayout>
          ) : (
            ''
          )}

          {chapterType != 2 ? (
            <div className="col-md-12">
              {/*<span*/}
              {/*  onClick={() => {*/}
              {/*    setQuestionData(false);*/}
              {/*  }}*/}
              {/*  className="text-warning pb-5 font-weight-bold cursor text-decoration-underline back-btn">*/}
              {/*  Back To Favourite*/}
              {/*</span>*/}

              {/*<div className="head text-center">*/}
              {/*  <div>Question: {questionData.question_no}</div>*/}
              {/*</div>*/}
              {/*<div className="q_name">{questionData.question}</div>*/}
              {/*<div className="question-images-area">*/}
              {/*  <div className="row">*/}
              {/*    <div className="col-md-6 mb-4">*/}
              {/*      <div*/}
              {/*        className="sec_area"*/}
              {/*        style={addborder == 1 ? { border: b_color_name } : null}*/}
              {/*        onClick={(e) =>*/}
              {/*          choiceHandler(*/}
              {/*            e,*/}
              {/*            questionData.choices[0],*/}
              {/*            1,*/}
              {/*            questionData.sounds ? questionData.sounds[0] : null*/}
              {/*          )*/}
              {/*        }>*/}
              {/*        <div className="q_img">*/}
              {/*          {questionData.images ? (*/}
              {/*            <img src={`${img}/${questionData.images[0]}`} alt="add Img" />*/}
              {/*          ) : null}*/}
              {/*        </div>*/}
              {/*        <div className="q_options_name">*/}
              {/*          {questionData.choices[0] ? questionData.choices[0] : null}*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*    <div className="col-md-6 mb-4">*/}
              {/*      <div*/}
              {/*        className="sec_area"*/}
              {/*        style={addborder == 2 ? { border: b_color_name } : null}*/}
              {/*        onClick={(e) =>*/}
              {/*          choiceHandler(*/}
              {/*            e,*/}
              {/*            questionData.choices[1],*/}
              {/*            2,*/}
              {/*            questionData.sounds ? questionData.sounds[1] : null*/}
              {/*          )*/}
              {/*        }>*/}
              {/*        <div className="q_img">*/}
              {/*          {questionData.images ? (*/}
              {/*            <img src={`${img}/${questionData.images[1]}`} alt="add Img" />*/}
              {/*          ) : null}*/}
              {/*        </div>*/}
              {/*        <div className="q_options_name">*/}
              {/*          {questionData.choices[1] ? questionData.choices[1] : null}*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*    <div className="col-md-6 mb-4">*/}
              {/*      <div*/}
              {/*        className="sec_area"*/}
              {/*        style={addborder == 3 ? { border: b_color_name } : null}*/}
              {/*        onClick={(e) =>*/}
              {/*          choiceHandler(*/}
              {/*            e,*/}
              {/*            questionData.choices[2],*/}
              {/*            3,*/}
              {/*            questionData.sounds ? questionData.sounds[2] : null*/}
              {/*          )*/}
              {/*        }>*/}
              {/*        <div className="q_img">*/}
              {/*          {questionData.images ? (*/}
              {/*            <img src={`${img}/${questionData.images[2]}`} alt="add Img" />*/}
              {/*          ) : null}*/}
              {/*        </div>*/}
              {/*        <div className="q_options_name">*/}
              {/*          {questionData.choices[2] ? questionData.choices[2] : null}*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*    <div className="col-md-6 mb-4">*/}
              {/*      <div*/}
              {/*        className="sec_area"*/}
              {/*        style={addborder == 4 ? { border: b_color_name } : null}*/}
              {/*        onClick={(e) =>*/}
              {/*          choiceHandler(*/}
              {/*            e,*/}
              {/*            questionData.choices[3],*/}
              {/*            4,*/}
              {/*            questionData.sounds ? questionData.sounds[3] : null*/}
              {/*          )*/}
              {/*        }>*/}
              {/*        <div className="q_img">*/}
              {/*          {questionData.images ? (*/}
              {/*            <img src={`${img}/${questionData.images[3]}`} alt="add Img" />*/}
              {/*          ) : null}*/}
              {/*        </div>*/}
              {/*        <div className="q_options_name">*/}
              {/*          {questionData.choices[3] ? questionData.choices[3] : null}*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className="check-btn mb-5" style={{ marginLeft: '40%', marginTop: '-2%' }}>
                {/*{answer ? (*/}
                {/*  <button className="btn btn-success w-100">Check</button>*/}
                {/*) : (*/}
                {/*  <button*/}
                {/*    className="btn btn-danger w-100"*/}
                {/*    onClick={(e) => incrementQuestionsHandler(e)}>*/}
                {/*    Check*/}
                {/*  </button>*/}
                {/*)}*/}

                {answer ? (
                  <button
                    className="btn btn-success"
                    style={{
                      marginTop: '10rem',
                      border: '0',
                      color: 'white',
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
                      background: '#F19C00',
                      border: '0',
                      color: 'white',
                      paddingRight: '6rem',
                      paddingLeft: '6rem',
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem'
                    }}
                    onClick={(e) => incrementQuestionsHandler(e)}>
                    Submit
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
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
                  <Row
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      flexDirection: 'column',
                      alignItems: 'flex-start'
                      // width: "52rem",
                    }}>
                    <Col>
                      <img
                        className="bluespeaker2"
                        style={{
                          height: '2rem',
                          width: '3rem',
                          marginLeft: '2rem',
                          marginBottom: '5rem'
                        }}
                        src={BlueSpeaker}
                        onClick={(e) => startAudio(e, questionData['question_sound'])}
                      />
                    </Col>
                    <Row className="question_no">
                      <p>Question No: {questionData['question_no']}</p>

                      {fave ? (
                        <Col>
                          Do you want to Favourite ?
                          <img
                            className="heartimage"
                            style={{
                              width: '1.5rem',
                              height: '1.5rem',
                              marginLeft: '3rem',
                              cursor: 'pointer'
                            }}
                            onClick={(e) =>
                              fav(e, questionData['record_id'], 'fav', questionData['language'])
                            }
                            src={Favorite}
                          />
                        </Col>
                      ) : (
                        <Col>
                          Do you want to UnFavorite ?
                          <img
                            className="heartimage"
                            style={{
                              width: '1.5rem',
                              height: '1.5rem',
                              marginLeft: '3rem',
                              cursor: 'pointer'
                            }}
                            onClick={(e) =>
                              fav(e, questionData['record_id'], 'un', questionData['language'])
                            }
                            src={UnFavorite}
                          />
                        </Col>
                      )}
                    </Row>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around'
                        // width: "52rem",
                      }}>
                      {choices.length > 0
                        ? choices.map((d, i) => {
                          return (
                            <>
                              {nextBtn ? (
                                <div key={i}>{d}</div>
                              ) : (
                                <p
                                  key={i}
                                  onClick={(e) => deleteChoices(e, i, d)}
                                  style={{
                                    color: 'black',
                                    background: '#E1E1E1',
                                    paddingRight: '1rem',
                                    paddingLeft: '1rem',
                                    paddingTop: '0.5rem',
                                    paddingBottom: '0.5rem',
                                    marginRight: '1rem'
                                  }}>
                                  {d}
                                </p>
                              )}
                            </>
                          );
                        })
                        : null}
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
                      {/*<div className="content_data">*/}
                      {/*  {questionData.choices.map((data, i) => {*/}
                      {/*    return (*/}
                      {/*      <>*/}
                      {/*        {choices.indexOf(data) == -1 ? (*/}
                      {/*          <div key={i} onClick={(e) => choicesHandler(e, data)}>*/}
                      {/*            {data}*/}
                      {/*          </div>*/}
                      {/*        ) : (*/}
                      {/*          <div className="remove_choice"></div>*/}
                      {/*        )}*/}
                      {/*      </>*/}
                      {/*    );*/}
                      {/*  })}*/}
                      {/*</div>*/}

                      {questionData &&
                        questionData['choices'].length > 0 &&
                        questionData['choices'].map((data, i) => {
                          return (
                            <>
                              {choices.indexOf(data) == -1 ? (
                                <p
                                  onClick={(e) => choicesHandler(e, data)}
                                  key={i}
                                  style={{
                                    color: 'black',
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
                            </>
                          );
                        })}
                    </div>
                  </Row>
                </Container>
              </StyledLayout2>
              {/*chpter type 2*/}
              <div className="col-md-12">
                {/*<span*/}
                {/*  onClick={() => {*/}
                {/*    setQuestionData(false);*/}
                {/*  }}*/}
                {/*  className="text-warning pb-5 font-weight-bold cursor text-decoration-underline back-btn">*/}
                {/*  Back To Favourite*/}
                {/*</span>*/}
                {/*<div className="heart_icon">*/}
                {/*  {fave ? (*/}
                {/*    <img src="assets/img/un_favorite.png" alt="un_favorite" />*/}
                {/*  ) : (*/}
                {/*    <img*/}
                {/*      src="assets/img/favorite.png"*/}
                {/*      alt="favorite"*/}
                {/*      onClick={(e) => fav(e, questionData.record_id, 'un')}*/}
                {/*    />*/}
                {/*  )}*/}
                {/*</div>*/}
                {/*<div className="head text-center">*/}
                {/*  <div>Question: {questionData.question_no}</div>*/}
                {/*</div>*/}
                {/*<div className="row">*/}
                {/*  <div className="col-md-12">*/}
                {/*    <div className="show_questionsHandler">*/}
                {/*      <div className="content_data">*/}
                {/*        {choices.length > 0*/}
                {/*          ? choices.map((d, i) => {*/}
                {/*              return (*/}
                {/*                <>*/}
                {/*                  {nextBtn ? (*/}
                {/*                    <div key={i}>{d}</div>*/}
                {/*                  ) : (*/}
                {/*                    <div key={i} onClick={(e) => deleteChoices(e, i, d)}>*/}
                {/*                      {d}*/}
                {/*                    </div>*/}
                {/*                  )}*/}
                {/*                </>*/}
                {/*              );*/}
                {/*            })*/}
                {/*          : null}*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*    <div className="show_answersHandler">*/}
                {/*      {lang == 'English' ? (*/}
                {/*        <div className="content_data">*/}
                {/*          {questionData.english_choices.map((data, i) => {*/}
                {/*            return (*/}
                {/*              <>*/}
                {/*                {choices.indexOf(data) == -1 ? (*/}
                {/*                  <div key={i} onClick={(e) => choicesHandler(e, data)}>*/}
                {/*                    {data}*/}
                {/*                  </div>*/}
                {/*                ) : (*/}
                {/*                  <div className="remove_choice"></div>*/}
                {/*                )}*/}
                {/*              </>*/}
                {/*            );*/}
                {/*          })}*/}
                {/*        </div>*/}
                {/*      ) : (*/}
                {/*        <div className="content_data">*/}
                {/*          {questionData.choices.map((data, i) => {*/}
                {/*            return (*/}
                {/*              <>*/}
                {/*                {choices.indexOf(data) == -1 ? (*/}
                {/*                  <div key={i} onClick={(e) => choicesHandler(e, data)}>*/}
                {/*                    {data}*/}
                {/*                  </div>*/}
                {/*                ) : (*/}
                {/*                  <div className="remove_choice"></div>*/}
                {/*                )}*/}
                {/*              </>*/}
                {/*            );*/}
                {/*          })}*/}
                {/*        </div>*/}
                {/*      )}*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <div className="check-btn mb-5" style={{ marginLeft: '40%', marginTop: '-2%' }}>
                  {answer ? (
                    <button
                      className="btn btn-success"
                      style={{
                        marginTop: '10rem',
                        border: '0',
                        color: 'white',
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
                        background: '#F19C00',
                        border: '0',
                        color: 'white',
                        paddingRight: '6rem',
                        paddingLeft: '6rem',
                        paddingTop: '0.5rem',
                        paddingBottom: '0.5rem'
                      }}
                      onClick={(e) => incrementQuestionsHandler(e)}>
                      Submit
                    </button>
                  )}

                  {/*{answer ? (*/}
                  {/*  <button className="btn btn-success w-100">Check</button>*/}
                  {/*) : (*/}
                  {/*  <button*/}
                  {/*    className="btn btn-danger w-100"*/}
                  {/*    onClick={(e) => incrementQuestionsHandler(e)}>*/}
                  {/*    Check*/}
                  {/*  </button>*/}
                  {/*)}*/}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <StyledFavorites>
          <Heading title="Favorites" />
          <div style={{ width: '100%' }}>
            <div className="mt-5">
              <select
                defaultValue={currentLang}
                onChange={(e) => getData(e.target.value)}
                className="form-select"
                aria-label="Filter select">
                <option value="">Select Language</option>
                <option value="Esan">Esan</option>
                <option value="Yoruba">Yoruba</option>
                <option value="Igbo">Igbo</option>
                <option value="Hausa">Hausa</option>

                <option value="Swahili">Swahili</option>
                <option value="Zulu">Zulu</option>
                <option value="Twi">Twi</option>
                <option value="SeTswana">SeTswana</option>

                <option value="IsiXhosa">IsiXhosa</option>
                <option value="Fulfulde">Fulfulde</option>
                <option value="Jamaican">Jamaican</option>
                <option value="English-Esan">English-Esan</option>

                <option value="English-Yoruba">English-Yoruba</option>
                <option value="English-Igbo">English-Igbo</option>
                <option value="English-Hausa">English-Hausa</option>
                <option value="English-Swahili">English-Swahili</option>

                <option value="English-Zulu">English-Zulu</option>
                <option value="English-Twi">English-Twi</option>
                <option value="English-SeTswana">English-SeTswana</option>
                <option value="English-IsiXhosa">English-IsiXhosa</option>

                <option value="English-Fulfulde">English-Fulfulde</option>
                <option value="English-Jamaican">English-Jamaican</option>
              </select>
            </div>
            <Row className="mt-5 gy-5 justify-content-center">
              {data && data.length > 0
                ? data.map((item, index) => {
                  return (
                    <Col
                      key={index}
                      className="col col-sm-6 col-md-4 col-lg-4 col-xl-3 lessoncards mx-auto">
                      <Card
                        onClick={(e) =>
                          getQuestions(e, item.favedata[0], item.language, item.chapter_type)
                        }
                        style={{
                          width: 'auto',
                          marginBottom: '1rem',
                          marginTop: '1rem',
                          borderRadius: '0.5rem',
                          border: '2px solid #F94848'
                        }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'right'
                          }}>
                          <Card.Img
                            variant="top"
                            style={{
                              height: 'auto',
                              width: 'auto',
                              margin: '-1px',
                              cursor: 'pointer'
                            }}
                            src={Corner}
                            onClick={(e) =>
                              fav(
                                e,
                                item.favedata[0]['record_id'],
                                'un',
                                item.favedata[0]['language']
                              )
                            }
                          />
                        </div>
                        <Card.Img
                          variant="top"
                          style={{
                            // height: 'auto',
                            // width: 'auto',
                            padding: '1rem',
                            height: '100px',
                            width: '100px'
                          }}
                          src={`${img}${item.favedata[0].question_image}`}
                        />
                        <Card.Body
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '40px',
                            color: 'white',
                            backgroundColor: '#F94848'
                          }}>
                          <Card.Text>
                            <p style={{ margin: '2px' }}>{item.favedata[0].question}</p>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
                : 'No Record Found'}
            </Row>
          </div>
        </StyledFavorites>
      )}
    </>
  );
}

export default Favorites;

const StyledFavorites = styled.div`
  padding: 2rem 1rem;
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent url(${DropDownIcon}) no-repeat 99% center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .form-select {
    font-weight: 600 !important;
  }
  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;

const StyledLayout2 = styled.div`
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
    height: 229px;
    width: 267px;
  }
  .lessondiv {
    display: flex;
    flex-direction: row;
    margin-bottom: 4rem;
    margin-top: 2rem;
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
    .heartimage {
      margin-left: 1rem;
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
