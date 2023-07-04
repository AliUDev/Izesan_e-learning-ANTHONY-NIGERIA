import React, { useState } from 'react'
import profilePicture from '../../../../Assets/Images/profile_image.png'
import Rating from '../../../../Assets/Images/rating.png'
// import Arrow from '../../../../Assets/Images/arrow.png'
import Verified from '../../../../Assets/Images/verified.png'
import DropDown from '../../../../Assets/Images/dropdown1.png'
import License from '../../../../Assets/Images/license.png'
import Video from '../../../../Assets/Images/video.png'
import Smile from '../../../../Assets/Images/smile.png'
import Send from '../../../../Assets/Images/send_c.png'
import {
    Form,
    FormControl,
    Button,
    Navbar,
    Container,
    Col,
    Row,
    Card,
    InputGroup,
    Nav,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import LiveClassesCaurosel from './LiveClassesCaurosel'

function LiveClassesLanguage() {
    const [items, setItems] = useState([
        {
            id: 1,
            name: "Decosta Wereko",
            lessonsCount: 44,
            teaches: "Teaches Twi",
            stars: 5,
            totalRates: 1,
            image: profilePicture,
        },
        {
            id: 2,
            name: "Decosta Wereko",
            lessonsCount: 44,
            teaches: "Teaches Twi",
            stars: 5,
            totalRates: 1,
            image: profilePicture,
        },
        // {
        //     id: 3,
        //     name: "Decosta Wereko",
        //     lessonsCount: 44,
        //     teaches: "Teaches Twi",
        //     stars: 5,
        //     totalRates: 1,
        //     image: profilePicture,
        // },
        // {
        //     id: 4,
        //     name: "Decosta Wereko",
        //     lessonsCount: 44,
        //     teaches: "Teaches Twi",
        //     stars: 5,
        //     totalRates: 1,
        //     image: profilePicture,
        // },
    ]);

    return (
        <>
            <div className="lessontitle"
                style={{
                    // padding: "3rem 1rem 1rem 2rem",
                    marginBottom: "30px",
                    paddingRight: "3rem",
                    paddingLeft: "1rem",
                    paddingTop: "1rem",
                    paddingBottom: "0.5rem",
                    fontSize: "2rem",
                    fontWeight: "600",
                }}>Languague</div>
            <LiveClassesCaurosel />

            {/* <Container fluid>
                <Row className='justify-content-center d-flex align-items-center gx-0'
                    style={{
                        background: `url(${Arrow})`,
                        backgroundRepeat: "no-repeat",
                        height: "170px",
                        backgroundPosition: "right bottom 0.2rem",
                    }}>

                    {
                        items.map((item, index) => {
                            return (
                                <Col className='col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-3' style={{ zIndex: "100" }}>
                                    <Card style={{ width: '18rem', borderRadius: "16px" }}>
                                        <div className='d-flex flex-col'>
                                            <div className=''>
                                                <img src={item.image} />

                                            </div>
                                            <div>
                                                <h5>{item.name}</h5>
                                                <span>{item.stars} <img src={Rating} />({item.totalRates})</span>
                                                <p>{item.lessonsCount}{" "}Lessons</p>
                                                <span>{item.teaches}</span>
                                            </div>
                                        </div>

                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
           */}
            <div className='d-flex mt-4 justify-content-center flex-column flex-lg-row'>
                <div className='mx-5 w-25 w-sm-100'>
                    <div style={{ borderTop: "1px solid #D6D6D6" }} className='mb-3'></div>
                    <div className='d-flex w-75  justify-content-between mx-auto' >
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img src={Verified} width="18px" />
                            <p style={{ fontSize: "9px" }}>verified</p>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <span style={{ fontSize: "13px" }}>5<img src={Rating} width="13px" style={{ margin: "-2px 0 2px 0px" }} /></span>
                            <p style={{ fontSize: "9px" }}>rating</p>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <span style={{ fontSize: "13px" }}>30 <img src={License} width="13px" style={{ margin: "-2px 0 2px 0px" }} /></span>
                            <p style={{ fontSize: "9px" }}>license</p>
                        </div>
                    </div>
                    <div style={{ borderTop: "1px solid #D6D6D6" }} className='mb-4'></div>
                    <div>
                        <button className='w-100' style={{ backgroundColor: "#BDE1CC", color: "#489A6B", border: "none", height: "2.4rem", borderRadius: "7px" }}>Message me</button>
                    </div>
                    <div style={{ borderTop: "1px solid #D6D6D6" }} className='mb-5 mt-4'></div>

                    <div className='d-flex align-items-center'>
                        <p style={{ color: "#8F8F8F", fontSize: "9px" }}>Professional Twi teacher,patient and flexible.</p>
                    </div>
                    <div style={{ borderTop: "1px solid #D6D6D6" }} className='mt-4 mb-5'></div>

                    <div className='px-5 px-lg-1 mt-5'>
                        <InputGroup
                            className="mb-3"
                            style={{
                                display: "flex",
                                background: "#FAFAFA",
                                borderRadius: "8px",
                                // marginTop: "1rem",
                                // marginRight: "1rem",
                                border: "1px solid #D6D6D6"
                            }}
                        >

                            <FormControl
                                className="customsearch"
                                placeholder="Private 1-on-1 class"
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                            />
                            <InputGroup.Text className="customsearchi">
                                <img src={DropDown} />
                            </InputGroup.Text>
                        </InputGroup>
                    </div>
                    <div className='mt-5'>
                        <button className='w-100' style={{ backgroundColor: "#489A6B", border: "none", height: "2.4rem", borderRadius: "7px" }}>
                            <div className='d-flex justify-content-between px-2'>
                                <span style={{ color: "white", fontSize: "17px" }}>Book Now</span>
                                <span style={{ color: "#F19C00", fontSize: "14px" }}>$25/hr</span>
                            </div>
                        </button>
                    </div>
                </div>
                <div className='w-75 w-sm-100'>
                    <img src={Video} width='100%' height='80%' />
                    <div className='mt-5'>

                        <InputGroup
                            className="mb-3"
                            style={{
                                display: "flex",
                                background: "#FAFAFA",
                                borderRadius: "8px",
                                marginTop: "1rem",
                                marginRight: "1rem",
                                border: "1px solid #D6D6D6"
                            }}
                        >
                            <InputGroup.Text className="customsearchi">
                                <img src={Smile} />
                            </InputGroup.Text>
                            <FormControl
                                className="customsearch"
                                placeholder="Start typing here"
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                            />
                            <InputGroup.Text className="customsearchi">
                                <img src={Send} />
                            </InputGroup.Text>
                        </InputGroup>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LiveClassesLanguage