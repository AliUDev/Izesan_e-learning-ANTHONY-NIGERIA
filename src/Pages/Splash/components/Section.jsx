import React from 'react';
import styled from 'styled-components';
import bird from '../../../assets/images/bird-cells-new.svg';
import section_bg from '../../../assets/splashassets/bkg.png';
import section_bg3 from '../../../assets/splashassets/bkg_3.png';
import pic2 from '../../../assets/splashassets/pic_2.png';

const Section = () => {
  return (
    <SectionParent>
      <img className="section_bg_img" src={section_bg} width="100%" />
      <img className="section_bg_img2" src={section_bg3} width="100%" />
      <div className="row m-0 mb-5">
        <div className="col-xl-6 col-lg-6 col-md-7  col-sm-12 col-12 p-5 textSection">
          <h1 style={{ fontFamily: 'HeadingFont ' }}>Our Mission</h1>
          <p className="display-6 fw-bolder">
            To document, digitize, and preserve the authenticity of African languages by providing a
            platform for their evolution.
          </p>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-5 col-sm-12 col-12 pic d-flex align-items-center justify-content-center">
          <img className="w-100" src={pic2} />
        </div>

        <div className="bird-container bird-container--one">
          <div className="bird bird--one" style={{ backgroundImage: `url(${bird})` }}></div>
        </div>

        <div className="bird-container bird-container--two">
          <div className="bird bird--two" style={{ backgroundImage: `url(${bird})` }}></div>
        </div>

        <div className="bird-container bird-container--three">
          <div className="bird bird--three" style={{ backgroundImage: `url(${bird})` }}></div>
        </div>

        <div className="bird-container bird-container--four">
          <div className="bird bird--four" style={{ backgroundImage: `url(${bird})` }}></div>
        </div>
      </div>
    </SectionParent>
  );
};

export default Section;

const SectionParent = styled.div`
  .pic {
    z-index: 1;
  }

  .bird {
    background-size: auto 100%;
    width: 88px;
    height: 125px;
    will-change: background-position;
    z-index: 0;
    animation-name: fly-cycle;
    animation-timing-function: steps(10);
    animation-iteration-count: infinite;
    &--one {
      animation-duration: 1s;
      animation-delay: -0.5s;
    }

    &--two {
      animation-duration: 0.9s;
      animation-delay: -0.75s;
    }

    &--three {
      animation-duration: 1.25s;
      animation-delay: -0.25s;
    }

    &--four {
      animation-duration: 1.1s;
      animation-delay: -0.5s;
    }
  }
  .bird-container {
    position: absolute;
    /* top: 165%; */
    transform: scale(0) translateX(-10vw);
    will-change: transform;
    width: fit-content;
    animation-name: fly-right-two;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    &--one {
      animation-duration: 15s;
      animation-delay: 0;
    }

    &--two {
      animation-duration: 16s;
      animation-delay: 1s;
    }

    &--three {
      animation-duration: 14.6s;
      animation-delay: 9.5s;
    }

    &--four {
      animation-duration: 16s;
      animation-delay: 10.25s;
    }
  }
  @keyframes fly-cycle {
    100% {
      background-position: -900px 0;
    }
  }
  @keyframes fly-right-two {
    0% {
      transform: translateY(-2vh) translateX(-10vw) scale(0.5);
    }

    10% {
      transform: translateY(0vh) translateX(10vw) scale(0.4);
    }

    20% {
      transform: translateY(-4vh) translateX(30vw) scale(0.6);
    }

    30% {
      transform: translateY(1vh) translateX(50vw) scale(0.45);
    }

    40% {
      transform: translateY(-2.5vh) translateX(70vw) scale(0.5);
    }

    50% {
      transform: translateY(0vh) translateX(90vw) scale(0.45);
    }

    51% {
      transform: translateY(0vh) translateX(90vw) scale(0.45);
    }

    100% {
      transform: translateY(10vh) translateX(140vw) scale(0.45);
      display: none;
      position: fixed;
    }
  }
  .textSection {
    z-index: 1;
  }
  .textSection h3,
  .textSection h1 {
    text-shadow: 0px 2px 1px #ffffff88;
  }
  .textSection h1 {
    font-size: 2rem;
  }
  .textSection p {
    font-size: 1.9rem;
  }
  .display-6 {
    text-shadow: 0px 2px 1px #ffffff88;
  }
  .section_bg_img,
  .section_bg_img2 {
    margin-top: -200px;
    position: absolute;
    z-index: -1;
  }

  @media (min-width: 767px) {
    .section_bg_img2 {
      display: none;
    }
    .textSection {
      margin: 30px 0;
    }
  }
  @media (max-width: 767px) {
    .section_bg_img {
      display: none;
    }
    .bird-container {
      display: none;
    }
    .textSection h1 {
      margin-top: 20px;
      font-size: 1.5rem;
    }
    .textSection p {
      font-size: 1.3rem;
    }
  }
  @media (max-width: 1450px) {
    .bird-container {
      top: 155%;
      /* top: 250%; */
    }
  }
  /* @media (max-width: 1440px) {
    .bird-container {
		top: 130%;
		/* top: 250%; */

  @media (max-width: 1280px) {
    .bird-container {
      /* top: 250%; */
    }
  }
  @media (max-width: 1024px) {
    .bird-container {
      /* display: none; */
    }
  }
  @media (max-width: 1000px) {
    .bird-container {
      display: none;
    }
  }
  @media (max-width: 450px) {
    .section_bg_img2 {
      height: 180vh;
    }
  }
`;
