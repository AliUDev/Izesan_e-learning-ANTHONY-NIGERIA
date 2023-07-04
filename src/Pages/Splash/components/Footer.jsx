import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import bkg from '../../../assets/splashassets/bkg.png';
import logo from '../../../assets/splashassets/logo.png';
const Footer = () => {
  return (
    <FooterParent style={{ backgroundImage: `url(${bkg})` }}>
      <div className="row m-0 text-light p-3 footerRow">
        <div className="col-xl-2 col-lg-2  col-md-6 col-sm-12 col-12 d-flex align-items-center justify-content-center">
          <div>
            <img className="ImageLOgo " src={logo} width="60%" />
          </div>
        </div>
        <div className="col-xl-4 col-lg-4  col-md-6 col-sm-12 col-12 p-lg-4 p-md-3 mt-md-3 mt-sm-0 p-sm-0">
          <h1 className=" text-warning fw-bold izesanLogo mt-xl-4">Izesan!</h1>
          <p className="link fw-bold fs-5">Telling Africa's story one language at a time.</p>
        </div>

        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12  p-lg-3 mt-lg-3 text-md-center text-lg-start text-start text-sm-center m-sm-0 p-sm-0 footerList">
          <h4 className="text-warning fw-bold" style={{ textShadow: '0px 2px 1px #282121' }}>
            Services
          </h4>
          <Link className="link text-light" to="/">
            {' '}
            <li>Home</li>
          </Link>
          <Link className="link text-light" to="/about">
            {' '}
            <li>About</li>
          </Link>
          {localStorage.getItem('email_id') ? (
            <>
              <Link className="link text-light" to="/lessons">
                <li>Lessons</li>
              </Link>
              <Link className="link text-light" to="/live-classes">
                <li>Find A tutor</li>
              </Link>
            </>
          ) : (
            <>
              <Link className="link text-light" to="/login">
                <li>Login</li>
              </Link>
              <Link className="link text-light" to="/sign-up">
                <li>Signup</li>
              </Link>
            </>
          )}
          <li className="link text-light">Izesan Schools</li>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 p-lg-5 p-md-3 text-center">
          <h4 className="m-2 text-warning fw-bolder" style={{ textShadow: '0px 2px 1px #282121' }}>
            Sign up for special offer
          </h4>
          <input className="form-control rounded-pill text-dark fw-bold input_subscribe" />
          <button className="btn btn-warning rounded-pill mt-2 buttonScribe fs-6 px-5 w-75 fw-bolder ">
            Subscribe
          </button>
        </div>
      </div>
    </FooterParent>
  );
};

export default Footer;

const FooterParent = styled.div`
  width: 100%;
  position: absolute;
  height: auto;
  /* top: 100%; */
  margin-top: 13.5%;
  text-align: center;

  @media (max-width: 767px) {
    .input_subscribe {
      width: 75%;
      margin: auto;
    }
    margin-top: 60%;
  }

  .footerRow {
    background-color: rgb(135, 159, 128, 0.7);
  }
  .link {
    text-decoration: none;
    text-rendering: auto;
    text-shadow: 0px 2px 1px #4d4a4a;
    font-size: 1.2rem;
  }
  background-image: url(bkg.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .izesanLogo {
    text-shadow: 0px 2px 1px #282121;
    letter-spacing: 3px;
    font-size: 2.3rem;
  }
  .buttonScribe {
    box-shadow: 0px 0px 2px #282121;
    transition-duration: 130ms;
  }
  .buttonScribe:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 5px #282121;
    transition-duration: 130ms;
  }
  .footerList li {
    list-style: none;
  }

  @media (max-width: 540px) {
    margin-top: 50%;
    .ImageLOgo {
      width: 50%;
    }
  }
  @media (max-width: 575px) {
    margin-top: 70.5%;
    .footerList {
      display: none;
    }
  }
  @media (max-width: 370px) {
    margin-top: 90%;
    .ImageLOgo {
      width: 60%;
    }
  }
`;
