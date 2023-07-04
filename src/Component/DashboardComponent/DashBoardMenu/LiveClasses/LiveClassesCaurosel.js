import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import profilePicture from '../../../../Assets/Images/profile_image.png'
import Rating from '../../../../Assets/Images/rating.png'
import {
    Container,
    Row,
    Col,
} from "react-bootstrap";


import "./liveClassesCaurosel.css";

const LiveClassesCaurosel = () => {
    const settings = {
        adaptiveHeight: false, //Eliminar propiedad o ponerla en false
        infinite: false,
        speed: 500,
        slidesToShow: 4.2,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.2,
                    dots: true
                }
            }
        ]
    };
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
        {
            id: 3,
            name: "Decosta Wereko",
            lessonsCount: 44,
            teaches: "Teaches Twi",
            stars: 5,
            totalRates: 1,
            image: profilePicture,
        },
        {
            id: 4,
            name: "Decosta Wereko",
            lessonsCount: 44,
            teaches: "Teaches Twi",
            stars: 5,
            totalRates: 1,
            image: profilePicture,
        },
    ]);

    return (
        // <Container>
        <div className="row justify-content-center align-items-center">
            {items.map((item) => {
                return (
                    <>
                        <div className="group-cards col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3" key={item.id}>
                            {/* <Slider {...settings} className="slider"> */}
                            <Card>
                                <div className='maincard' style={{ cursor: "pointer" }}>
                                    <h6 className="heading">{item.name}</h6>
                                    <div className="card-lesson mb-2"><span style={{ color: "#F19C00" }}>{item.stars}<img src={Rating} width='12px' className="starRating" /></span> ({item.totalRates}){" "} {item.lessonsCount} Lessons</div>
                                    <p className="card-twi">{item.teaches}</p>
                                </div>
                            </Card>
                            {/* </Slider> */}
                        </div>
                    </>
                )
            })}
        </div>
        // </Container>
    );
};

export default LiveClassesCaurosel;
