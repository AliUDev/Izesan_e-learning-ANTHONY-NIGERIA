import { useEffect, useState } from 'react';
import { Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LessonImage from '../../../assets/images/group_icon.png';

import axios from 'axios';
import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Marquee from 'react-fast-marquee';
import { connect } from 'react-redux';
import Heading from '../../../Components/Common/Heading';
import GreyPic from '../../../assets/images/gray_pic.png';
import { newsSubscribe } from '../../../redux';
import { api, img } from '../../../url';
import Loader from '../../Loader/Loader';

function Lessons(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  const [news, setNews] = useState('');
  const [isLoader, setisLoader] = useState(false);
  const [progressBar, setProgressBar] = useState('');
  const [showNews, setShowNews] = useState(true);
  const [inProgessChapterPopup, setInProgessChapterPopup] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [hideshowonScroll, sethideshowonScroll] = useState(true);


  var isSubcriebed = props.is_news_subscribe;
  if (isSubcriebed) var isSubscribe = 1;
  else var isSubscribe = 0;

  useEffect(() => {
    if (localStorage.getItem('isnewbar') == 1) {
      localStorage.removeItem('isnewbar');
      // location.reload();
    }
    // ViewCuerrentUser('English-Esan');
    ViewCuerrentUser(localStorage.getItem('lang'));
    getNews();
  }, []);


  function timeAgo(createAt) {
    const time = new Date(createAt);
    const now = new Date();
    const diff = (now.getTime() - time.getTime()) / 1000;
    if (diff < 60) {
      return 'just now';
    }
    if (diff < 3600) {
      return Math.round(diff / 60) + ' minutes ago';
    }
    if (diff < 86400) {
      return Math.round(diff / 3600) + ' hours ago';
    }
    if (diff < 604800) {
      return Math.round(diff / 86400) + ' days ago';
    }
    if (diff < 2592000) {
      return Math.round(diff / 604800) + ' weeks ago';
    }
    if (diff < 31536000) {
      return Math.round(diff / 2592000) + ' months ago';
    }
    if (diff < 315360000) {
      return Math.round(diff / 31536000) + ' years ago';
    }
    return time.toDateString();
  }

  function getDetail(item) {
    var title = '';
    var description = '';
    var receiverName = item.receiver_name;
    if (item.type == 'badge_earned') {
      title = item.title;
      if (item.position_win == 'farmer') {
        description = 'has earned Farmer badge in ';
      } else if (item.position_win == 'fisherman') {
        description = 'has earned Fisherman badge in ';
      } else if (item.position_win == 'doctor') {
        description = 'has earned Native doctor badge in ';
      } else if (item.position_win == 'hunter') {
        description = 'has earned Hunter badge in ';
      } else if (item.position_win == 'ehunter') {
        description = ' has earned Elephent hunter badge in ';
      } else if (item.position_win == 'chief') {
        description = 'has earned Chief badge in ';
      } else if (item.position_win == 'king') {
        description = ' has earned King badge in ';
      } else {
        description = 'has earned Omugbo badge in ';
      }
    } else {
      if (item.title == 'Longest Time Spending') {
        title = "Binge Barbarians";
        description = 'got ' + item.position_win + ' position in ';
      } else if (item.title == 'Streak Earned') {
        title = 'Streak Slayers';
        description = 'got ' + item.position_win + ' position in ';
      } else if (item.title == 'Kobo Earned') {
        title = 'Ɗangote’s Daddies';
        description = 'got ' + item.position_win + ' position in ';
      } else if (item.title == 'Longest Day Streak Maintained') {
        title = 'No Days Off';
        description = 'got ' + item.position_win + ' position in ';
      }
    }
    return { title, description, receiverName };
  }

  function getNews(offset = 1) {
    axios
      .post(`${api}get/notifications`, { page: offset })
      .then((res) => {
        if (res.data.status == 'success') {
          setNews(res.data.data.data);
        }
      })
      .catch((err) => console.log(err));
  }

  //current user information
  function ViewCuerrentUser(lang) {
    setisLoader(true);
    axios
      .get(`${api}GetLanguageDetails?language=${lang}&email_id=${localStorage.getItem('email_id')}`)
      .then((res) => {
        if (res.data.status == 'failed') {
          //NotificationManager.error(res.data.error, 'Error', 3000);
          setUserData('');
        } else {
          setUserData(res.data.data);
          setProgressBar(
            parseInt((res.data.data[0].cur_chapter_no / getCardsName().length) * 100) > 100
              ? 100
              : parseInt((res.data.data[0].cur_chapter_no / getCardsName().length) * 100)
          );
        }
        setisLoader(false);
      })
      .catch((err) => {
        if (err.message == 'Network Error') {
          setisLoader(false);
          alert('Oops! You Lost Your Internet Connection');
        }
        console.log(err);
      });
  }

  function getCardsName() {
    let cards_name = [];

    cards_name = [
      'Greetings & Pleasantries',
      'Questions',
      'Tenses',
      'Negation',
      'Parts of the body',
      'Objects in a home',
      'Compliments',
      'Basic Phrases',
      'Food',
      'Command Statements + Action Statements',
      'Complex Sentences',
      'Adjective & Adjectival Phrases',
      'Prepositions',
      'Animals',
      'Clothing & Accessories',
      'Parts of a building',
      'Occupations',
      'Environment',
      'Time',
      'Numbering',
      'Proverbs/Idioms'
    ];
    return cards_name;
  }
  function continueChapterPopup() {
    let chapterNo = localStorage.getItem('chapter_no');
    let questionCount = localStorage.getItem('count');
    if (questionCount > 0) {
      return (
        <>
          <Modal show={inProgessChapterPopup} onHide={inProgessChapterPopup}>
            <Modal.Header>
              <Modal.Title>Chapter Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Chapter {chapterNo} is already in progress. Do you want to continue?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="warning"
                onClick={() => {
                  localStorage.setItem('count', 0);
                  localStorage.setItem('chapter_no', currentChapterIndex);
                  setInProgessChapterPopup(false);
                  navigate('/lessonDetail/' + currentChapterIndex);
                }}>
                No
              </Button>
              <Button
                variant="success"
                onClick={(e) => {
                  navigate('/lessonDetail/' + chapterNo);
                  setInProgessChapterPopup(false);
                }}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }


  return (
    <>
      {isLoader && <Loader />}
      {/*<marquee*/}
      {/*  behavior="scroll"*/}
      {/*  onmouseover="this.stop();"*/}
      {/*  onmouseout="this.start();"*/}
      {/*  width="100%"*/}
      {/*  style={{ position: 'fixed' }}*/}
      {/*  direction="left"*/}
      {/*  height="100px">*/}
      {/*  this is a news flash....*/}
      {/*</marquee>*/}
      <StyledLessons>
        <div className='row w-100'>
          <div className='col-1'>
            <ArrowLeftShort className="fs-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
          </div>
          <div className='col-10'>
            <Heading title="Lessons" className='text-center text-decoration-underline m-1 fw-bold mb-4' />
          </div>
        </div>
        {currentChapterIndex > 0 && <>{continueChapterPopup ? continueChapterPopup() : null}</>}

        <Col>
          {progressBar && (
            <div className="progressBar2" style={{ paddingRight: '40px' }}>
              <ProgressBar now={progressBar} /> {progressBar}%
            </div>
          )}
        </Col>
        <Container fluid="sm">
          {isSubscribe
            ? showNews && hideshowonScroll && (
              <div
                className=" position-fixed bottom-0 start-50 translate-middle-x w-100"
                style={{
                  zIndex: '3',
                  borderTop: '1px dotted green',
                  backdropFilter: 'blur(2px)'
                }}>
                <span
                  className="position-absolute top-0 end-0 p-1"
                  tooltip="Close News"
                  onClick={() => setShowNews(false)}
                  style={{ zIndex: '5', cursor: 'pointer' }}>
                  <i className="bi bi-x-circle-fill"></i>
                </span>

                <Marquee
                  speed="5"
                  pauseOnHover="true">
                  {news &&
                    news.length > 0 &&
                    news.map((item, key) => {
                      let { title, description, receiverName } = getDetail(item);
                      return (
                        <div
                          key={key}
                          style={{
                            backdropFilter: 'blur(1px)',
                            opacity: "50px",
                          }}
                          className="transactionbar d-flex justify-content-between align-items-center my-2 p-2 pe-md-5">
                          <img
                            style={{
                              marginRight: '20px',
                              width: '60px',
                              height: '60px',
                              borderRadius: '50%'
                            }}
                            className="transaction-user"
                            src={`${img + '' + item.receiver_dp}`}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = GreyPic;
                            }}
                          />

                          <span className="transaction-date fs-4 fw-bold ">
                            <b style={{ color: 'goldenrod' }}>{title} &nbsp;</b>
                          </span>
                          <span className="transaction-date fs-4 fw-bold ">
                            <b>{receiverName}</b> {description} <b>{title}</b>
                          </span>

                          <span className="transaction-date fs-4 fw-bold ">
                            <b style={{ color: 'mediumpurple' }}>
                              &nbsp;{timeAgo(item.created_at)}
                            </b>
                          </span>
                        </div>
                      );
                    })}
                </Marquee>
              </div>
            )
            : ''}

          <Row className="w-100">
            {getCardsName().map((item, index) => {
              let nextIndex = index + 1;
              return (
                <Fragment key={index}>
                  {(userData ? userData[0].cur_chapter_no : 1) <= index ? (
                    <StyledLessonCardColClose sm="6" md="4" xl="3" key={item} className="p-0 gy-4">
                      <StyledLessonCard
                        onClick={() => {
                          let currentchp = index;
                          // if (
                          //   currentchp == 0 ||
                          //   currentchp == 1 ||
                          //   currentchp == 2 ||
                          //   currentchp == 3 ||
                          //   currentchp == 8 ||
                          //   currentchp == 9 ||
                          //   currentchp == 10 ||
                          //   currentchp == 11 ||
                          //   currentchp == 12 ||
                          //   currentchp == 13
                          // ) {
                          //   localStorage.setItem('chapter_type', 1);
                          // } else {
                          //   localStorage.setItem('chapter_type', 2);
                          // }

                          // if (nextIndex >= 5) {
                          //   localStorage.setItem('chapter_type', 2);
                          // } else {
                          //   localStorage.setItem('chapter_type', 1);
                          // }
                          if (localStorage.getItem('count') > 0) {
                            setCurrentChapterIndex(nextIndex);
                            setInProgessChapterPopup(true);
                            continueChapterPopup(nextIndex);
                          } else {
                            localStorage.setItem('count', 0);
                            localStorage.setItem('chapter_no', nextIndex);
                            navigate('/lessonDetail/' + nextIndex);
                          }
                        }}>
                        <StyledLessonCard.Img variant="top" src={LessonImage} />
                        <div className="px-3">
                          <p className="title font-roboto">{item}</p>

                          <StyledDivider />

                          <div className="justify-content-center d-flex align-items-center my-4">
                            <div className="w-100 d-flex justify-content-around align-items-center">
                              {[1, 2, 3].map((item, index) => {
                                return <StyledLoading key={item} index={index}></StyledLoading>;
                              })}
                              {/*<StyledProgress>30%</StyledProgress>*/}
                            </div>
                          </div>
                        </div>
                      </StyledLessonCard>
                    </StyledLessonCardColClose>
                  ) : (
                    <StyledLessonCardCol sm="6" md="4" xl="3" key={item} className="p-0 gy-4">
                      <StyledLessonCard
                        onClick={() => {
                          let currentchp = index;
                          // if (
                          //   currentchp == 0 ||
                          //   currentchp == 1 ||
                          //   currentchp == 2 ||
                          //   currentchp == 3 ||
                          //   currentchp == 8 ||
                          //   currentchp == 9 ||
                          //   currentchp == 10 ||
                          //   currentchp == 11 ||
                          //   currentchp == 12 ||
                          //   currentchp == 13
                          // ) {
                          //   localStorage.setItem('chapter_type', 1);
                          // } else {
                          //   localStorage.setItem('chapter_type', 2);
                          // }
                          // if (nextIndex >= 5) {
                          //   localStorage.setItem('chapter_type', 2);
                          // } else {
                          //   localStorage.setItem('chapter_type', 1);
                          // }
                          if (localStorage.getItem('count') > 0) {
                            setInProgessChapterPopup(true);
                            setCurrentChapterIndex(nextIndex);
                            continueChapterPopup(nextIndex);
                          } else {
                            localStorage.setItem('count', 0);
                            localStorage.setItem('chapter_no', nextIndex);
                            navigate('/lessonDetail/' + nextIndex);
                          }
                        }}>
                        <StyledLessonCard.Img variant="top" src={LessonImage} />
                        <div className="px-3">
                          <p className="title font-roboto">{item}</p>

                          <StyledDivider />

                          <div className="justify-content-center d-flex align-items-center my-4">
                            <div className="w-100 d-flex justify-content-around align-items-center">
                              {[1, 2, 3].map((item, index) => {
                                return <StyledLoading key={item} index={index}></StyledLoading>;
                              })}
                              {/*<StyledProgress>30%</StyledProgress>*/}
                            </div>
                          </div>
                        </div>
                      </StyledLessonCard>
                    </StyledLessonCardCol>
                  )}
                </Fragment>
              );
            })}
          </Row>
        </Container>
      </StyledLessons>
    </>
  );
}

const mapStatetoProps = (state) => {
  console.log(state);
  return {
    is_news_subscribe: state.user.newsSubscribe
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    newsSubscribe: function (isSubscribe) {
      dispatch(newsSubscribe(isSubscribe));
    }
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Lessons);

const StyledLessons = styled.div`

@media (max-width: 575px){
  margin-left: 8%;
}
margin-bottom: 100px;
  padding: 1rem 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;
const StyledLessonCardCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

// const StyledLessonCardColClose = styled(Col)`
//   display: flex;
//   justify-content: center;
//   pointer-events: none;
//   opacity: 0.7;
//   cursor: not-allowed;
// `;
const tutorfrom = localStorage.getItem('tutor_active');
const StyledLessonCardColClose = styled(Col)`
  display: flex;
  justify-content: center;
  pointer-events: ${tutorfrom == 'true' ? '' : 'none'} ;
  opacity: ${tutorfrom == 'true' ? '' : '0.7'};
  cursor: ${tutorfrom == 'true' ? '' : 'not-allowed'};
`;
const StyledLessonCard = styled(Card)`
  width: 100%;
  max-width: 350px;
  border-radius: 0.5rem;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.2);

  .title {
    font-size: 0.8rem;
    text-align: center;
    font-weight: 600;
  }

  .card-img-top {
    width: auto;
    padding: 1rem;
    object-fit: cover;
  }
  @media (min-width: 576px) {
    width: 200px;
  }
  @media (min-width: 992px) {
    margin-right: 0.5rem;
  }
  @media (min-width: 1200px) {
    width: 300px;
    margin-right: 1rem;
  }
`;

const StyledLoading = styled.div`
  height: 0.5rem;
  width: 1.2rem;
  background: ${(props) =>
    props.index === 0 ? '#' + Math.floor(Math.random() * 16777215).toString(16) : '#F1F4F5'};
  border-radius: 1rem;
`;

// const StyledProgress = styled.div`
//   font-size: 0.8rem;
//   font-weight: 800;
// `;
const StyledDivider = styled.div`
  width: 100%;
  border: 1px solid #e7e7e7;
`;
