import React, { useState } from 'react';
import styled from 'styled-components';
import bkg from '../../../assets/splashassets/bkg.png';
import bkg2 from '../../../assets/splashassets/bkg_3.png';
import cloud from '../../../assets/splashassets/cloud.png';
import cardIcon from '../../../assets/splashassets/line.png';
import card1 from '../../../assets/splashassets/pic_3.png';
import card2 from '../../../assets/splashassets/pic_4.png';
import card3 from '../../../assets/splashassets/pic_5.png';
import WindLine from './Animations/WindLine/WindLine';
const OurPrograms = () => {
    const [expanded1, setexpanded1] = useState(true);
    const [expanded2, setexpanded2] = useState(true);
    const [expanded3, setexpanded3] = useState(true);
    return (
        <OurProgramsParent style={{ backgroundImage: `url(${bkg})` }}>
            <img className='bkg_img' src={bkg} width="100%" />
            <img className='bkg_img2' src={bkg2} width="100%" />
            <img className='cloud_img' src={cloud} width="100%" />
            <h1 className='text-center text-success cloud_title' style={{ fontFamily: "HeadingFont " }}>Our Programs</h1>
            <WindLine />

            <div className="container px-4 card_parent">
                <div className="row gx-5" >
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4">
                        <div className="p-3 border bg-light card">
                            <div style={{ height: "250px" }}>
                                <img src={card1} width="100%" height="100%" />
                            </div>
                            <h2 className='text-success mt-3' style={{ fontFamily: "HeadingFont " }} >Tutors</h2>
                            <img src={cardIcon} width="100%" />
                            <p className='text-muted p-1' >
                                {
                                    expanded1 ?
                                        <>We currently have over 13 language experts who provide a standard academic curriculum to teach users all they need to start learning....</> : <>We currently have over 13 language experts who provide a standard academic curriculum to teach users all they need to start learning any African language of their choice from our available language courses.</>
                                }
                            </p>
                            <p className='cursor-pointer text-success fw-bolder m-0'>{expanded1 ? <span onClick={() => setexpanded1(!expanded1)}>show more</span> : <span onClick={() => setexpanded1(!expanded1)}> show less</span>}</p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4">
                        <div className="p-3 border bg-light card">
                            <div style={{ height: "250px" }}>
                                <img src={card2} width="100%" height="100%" />
                            </div>
                            <h2 className='text-success mt-3' style={{ fontFamily: "HeadingFont " }} >Lessons</h2>
                            <img src={cardIcon} width="100%" />
                            <p className='text-muted p-1' >
                                {
                                    expanded2 ?
                                        <>We offer interactive lessons using flashcards and other exercises to teach users how to speak diverse African languages and We offer....</> : <>We offer interactive lessons using flashcards and other exercises to teach users how to speak diverse African languages and available languages courses</>
                                }
                            </p>
                            <p className='cursor-pointer text-success fw-bolder m-0'>{expanded2 ? <span onClick={() => setexpanded2(!expanded2)}>show more</span> : <span onClick={() => setexpanded2(!expanded2)}>show less</span>}</p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-4">
                        <div className='card3'>
                            <div className="p-3 border bg-light card cardInner">
                                <div style={{ height: "250px" }}>
                                    <img src={card3} width="100%" height="100%" />
                                </div>
                                <h2 className='text-success mt-3' style={{ fontFamily: "HeadingFont " }} >Online Classes</h2>
                                <img src={cardIcon} width="100%" />

                                <p className='text-muted p-1 ' >{
                                    expanded3 ?
                                        <>Our goal is to make the learning process of any African language as effective as possible. We have over 13 language teachers.... </> : <>Our goal is to make the learning process of any African language as effective as possible. We have over 13 language teachers professionally trained to support your language learning journey virtually.</>
                                }</p>
                                <p className='cursor-pointer text-success fw-bolder m-0'>{expanded3 ? <span onClick={() => setexpanded3(!expanded3)}>show more</span> : <span onClick={() => setexpanded3(!expanded3)}>show less</span>}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-6'><WindLine /></div>

        </OurProgramsParent>
    )
}

export default OurPrograms

const OurProgramsParent = styled.div`

@media (max-width: 800px) {
    background-image: url${({ bkg })};
background-position: center;
background-repeat: no-repeat;
background-size: cover;
.bkg_img2 {
        display: none;
    }
    .bkg_img {
        display: none;
    }
}
    .cloud_img{
        margin-top: -20%;
    }
.cloud_title{
    margin-top: -29%;

}
.bkg_img , .bkg_img2{
    position: absolute;
    margin-top: 10%;
    z-index: -1;
}
@media (min-width: 768px) {
    .bkg_img2 {
        display: none;
    }
}
@media (max-width: 767px) {
    /* .bkg_img {
        height: 300vh;
    } */
} 
.card_parent{
    margin-top: 100px;
}
.card{
    border-radius: 20px;
    text-align: center;
    transform: translateY(-20px);
    transition-duration: 100ms;

}
.card:hover{
    transform: translateY(-10px);
    transition-duration: 200ms;
}
@media (min-width:768px) and (max-width:991px) {
    .card3{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .cardInner{
        width: 320px;
    border-radius: 20px;
    text-align: center;
    transform: translateY(-20px);
}
}
`