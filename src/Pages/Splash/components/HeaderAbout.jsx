import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import appStore from '../../../assets/splashassets/app_store.png';
import banner from '../../../assets/splashassets/banner@2x.png';
import banner2 from '../../../assets/splashassets/bkg_2.png';
import cloud from '../../../assets/splashassets/cloud_2.png';
import playStore from '../../../assets/splashassets/google.png';
import Menu from '../../../assets/splashassets/menu@2x.png';
import pic1 from '../../../assets/splashassets/pic_1.png';
const Header = () => {
  return (
    <HeaderParent>
      <img className="bg_img2" src={banner2} width="100%" />
      <img className="bg_img" src={banner} width="100%" />
      <div className="row m-0 text-light header_body_contentParent">
        <div className="col-xl-6 col-lg-6 col-md-7  col-sm-12 col-12 headerTextContainer">
          <h1 className="fw-bold" style={{ fontFamily: 'HeadingFont ' }}>
            We’re telling Africa's story one language at a time
          </h1>
          <h4>
            Izesan! is an e-learning platform for African languages that offers interactive lessons
            and exercises to teach users how to speak different African languages.
          </h4>
          <Link to="/">
            <button className="btn btn-light text-success fw-bolder aboutBtn mt-3">Home</button>
          </Link>
          <div className="d-flex flex-row iconWrapper">
            <a
              href="https://apps.apple.com/us/app/izesan/id1475916305"
              target="_blank"
              className="icon">
              <img className="w-100" src={appStore} alt="..." />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.tecjaunt.esan"
              target="_blank"
              className="icon">
              <img className="w-100" src={playStore} alt="..." />
            </a>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-5 col-sm-12 col-12 fadeElment d-flex align-items-center justify-content-center">
          <div data-aos="fade-left">
            <img className="w-100" src={pic1} />
          </div>
        </div>
      </div>
      <div className="m-auto">
        <img className="cloud_img" src={cloud} />
        <div className="w-100 m-auto">
          <img className="menu_img" src={Menu} />
          <div className="row menu_items text-center px-2 text-light">
            <div className="col-lg-3 col-md-3 col-sm-6 col-6 menu_item ">Find a Teacher</div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-6 menu_item ">Community</div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-6 menu_item ">Become Teacher</div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-6 menu_item ">Contact us</div>
          </div>
        </div>
      </div>
    </HeaderParent>
  );
};

export default Header;

const HeaderParent = styled.div`
  /* @font-face {
  font-family: 'aaaz';
  src: url("/assets/fonts/Montserrat-Regular.ttf");
} */
  .menu_item {
    font-weight: bolder;
    text-shadow: #fff 5px;
    font-size: 1.2rem;
  }
  .fadeElment {
    overflow-x: hidden;
  }
  .bg_img,
  .bg_img2 {
    z-index: -1;
    position: absolute;
    opacity: 5;
  }
  .aboutBtn {
    width: 60%;
  }
  .header_body_contentParent {
    padding-top: 100px;
  }
  .cloud_img {
    width: 100%;
    margin-top: -50px;
  }
  .headerTextContainer {
    padding: 8%;
  }
  .iconWrapper {
    margin: 6px 0;
  }
  .icon {
    cursor: pointer;
    margin: 0 1px;
    width: 30%;
  }
  .menu_img {
    margin-top: -40%;
    width: 100%;
  }
  .menu_items {
    margin: -22.4% 0 0 0;
    width: 100%;
  }
  .menu_items div:hover {
    transform: scale(1.1);
    cursor: pointer;
    transition-duration: 200ms;
  }
  @media (max-width: 760px) {
    .bg_img2 {
      height: 300%;
    }
  }
  @media (min-width: 768px) {
    .bg_img1 {
      display: none;
    }
  }
  @media (min-width: 769px) and (max-width: 1050px) {
    .menu_items {
      margin: -23% 0 0 0;
    }
  }
  @media (max-width: 768px) {
    .cloud_img {
      width: 100%;
      margin-top: -45px;
    }
    .headerTextContainer {
      padding: 5%;
    }
    .menu_item {
      padding: 8px 0;
    }
    .bg_img {
      display: none;
    }
    .menu_img {
      height: 150px;
      margin-top: -15% !important;
      margin-bottom: 20px;
    }
    .menu_items {
      margin: -19% 0 0 0;
    }
    /* .menu_items {
        margin: -40% 0 0 0;
  } */
  }
  @media (max-width: 700px) {
    .menu_items {
      margin: -22% 0 0 0;
    }
  }
  @media (max-width: 612px) {
    .menu_items {
      margin: -25% 0 0 0;
    }
    .header_body_contentParent {
      padding-left: 19px;
    }
  }

  @media (max-width: 500px) {
    .menu_items {
      margin: -30% 0 0 0;
    }
  }
  /* @media (min-width: 430px) and(max-width: 770px) {
    .menu_items {
        margin: -10.5% 0 0 0;
  }
} */
  @media (max-width: 460px) {
    .menu_items {
      margin: -23% 0 0 0;
    }
  }
  @media (max-width: 460px) {
    .menu_items {
      margin: -36% 0 0 0;
    }
  }
  @media (max-width: 390px) {
    .menu_items {
      margin: -40% 0 0 0;
    }
  }

  @media (max-width: 360px) {
    .menu_items {
      margin: -45% 0 0 0;
    }
  }
  @media (max-width: 330px) {
    .menu_items {
      margin: -50% 0 0 0;
    }
  }
  @media (max-width: 321px) {
    .menu_items {
      margin: -53% 0 0 0;
    }
  }
  @media (max-width: 290px) {
    .menu_items {
      margin: -58% 0 0 0;
    }
    .menu_item {
      padding: 4px 0;
    }
  }
  @media (max-width: 881px) {
    .menu_item {
      font-weight: bolder;
      text-shadow: #fff 5px;
      font-size: 1rem;
    }
  }
`;
