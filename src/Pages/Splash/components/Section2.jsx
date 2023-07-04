import React from 'react';
import styled from 'styled-components';
import section_bg from '../../../assets/splashassets/aboutBg.png';
import section_bg3 from '../../../assets/splashassets/aboutUsbg.png';
import pic2 from '../../../assets/splashassets/cell@2x.png';
import arrowImg from '../../../assets/splashassets/line.png';
const Section = () => {
    return (
        <SectionParent>
            <img className='section_bg_img' src={section_bg} width="100%" />
            <img className='section_bg_img2' src={section_bg3} width="100%" />
            <div className='row m-0 pt-5'>
                <div className='col-xl-5 col-lg-6 col-md-7  col-sm-12 col-12 p-5 textSection'>
                    <h1 style={{ fontFamily: "HeadingFont " }} >About Us</h1>
                    <img className="w-50" src={arrowImg} alt="..." />
                    <p className='display-6 fw-bolder'>To document, digitise, and preserve the authenticity of African languages by providing a platform for their evolution.</p>
                </div>
                <div className='col-xl-7 col-lg-6 col-md-5 col-sm-12 col-12 pic d-flex align-items-center justify-content-center'>
                    <img className='w-50' src={pic2} />
                </div>


            </div>
        </SectionParent>
    )
}

export default Section

const SectionParent = styled.div`
.pic,.bg_img2,.section_bg_img2{
    z-index: 1;
    opacity: 7;
}
.textSection{
    z-index: 1;
}
.textSection h3, .textSection h1{
    text-shadow: 0px 2px 1px #ffffff88;
    
}
.textSection p{
	font-size: 2rem;
}
.display-6{
    text-shadow: 0px 2px 1px #ffffff88;
}
.section_bg_img{
	margin-top: -90px;
    position: absolute;
    z-index: -1;
}
 .section_bg_img2{
    margin-top: -100px;
    position: absolute;
    z-index: -1;
	/* margin-top: %; */
}

@media (min-width: 767px) {
    .section_bg_img2 {
        display:none
    }
}
@media (max-width: 767px) {
    .section_bg_img {
        display:none;
    }
    .bird-container {
     display: none;
    }
} 
@media (max-width: 1280px) {
    .bird-container {
		top: 125%;
    }
} 
@media (max-width: 1024px) {
    .bird-container {
		top: 135%;
    }
} 
@media (max-width: 1000px) {
    .bird-container {
     display: none;
    }
} 
@media (min-width: 450px) and (max-width: 760px) {
    .section_bg_img2{
		height: 180vh;
	}
    
}
@media (max-width:450px) {
	.section_bg_img2{
		height: 180vh;
	}
}
`