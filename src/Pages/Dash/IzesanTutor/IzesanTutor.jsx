import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
// import Image from '../../../assets/images/nav_logo_new.png';
import { useNavigate } from 'react-router-dom';
import Image from '../../../assets/images/web_logo@2x.png';
import Heading from '../../../Components/Common/Heading';

import { NotificationManager } from 'react-notifications';
const IzesanTutor = () => {

    const data_user = JSON.parse(localStorage.getItem('all_data'));
    console.log(data_user[0].tutor_st);

    data_user[0].tutor_st === 1 ?
        localStorage.setItem('tutor_active', true) :
        localStorage.setItem('tutor_active', false);



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
        if (!localStorage.getItem('lang')) {
            NotificationManager.info('Choose your native language first', 'Info', 4000);
        }
        setisLoader(true);
        setTimeout(() => {
            setisLoader(false);
            if (timesPopupShow == false) {
                if (!localStorage.getItem(uniqueName + '__' + 'current_day_target')) {
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

    return (
        <div>
            <StyledLanguages>
                {
                    data_user[0]?.tutor_st === 1 ?
                        (
                            <div>


                                <Heading title="Languages" className='text-center text-decoration-underline fw-bold' />
                                {lang_eng ? (
                                    <p className='text-center'>What language would you like to learn</p>
                                ) : (
                                    <p className='text-center'>Choose your native language</p>
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
                                                    className="text-warning pb-5 font-weight-bold cursor text-decoration-underline back-btn">
                                                    Back
                                                </span>

                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            borderRadius: '0.5rem',
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
                                                            src={Image}
                                                        />
                                                        <Card.Body
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                padding: '0 2px 0 2px',
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                                Zulu
                                                            </p>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                                IsiXhosa
                                                            </p>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                            </>
                                        ) : (
                                            <>
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                                Zulu
                                                            </p>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                                IsiXhosa
                                                            </p>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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
                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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

                                                <Col className="col col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 languagecards">
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
                                                            src={Image}
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

                                            </>
                                        )}
                                    </Row>
                                </div>

                            </div>
                        ) : (
                            <h3 className='text-center'>Only tutors can access this page!</h3>
                        )
                }
            </StyledLanguages>
        </div>
    )
}

export default IzesanTutor

const StyledLanguages = styled.div`
.card__styling{
  transition-duration: 150ms;
}
.card__styling:hover{
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