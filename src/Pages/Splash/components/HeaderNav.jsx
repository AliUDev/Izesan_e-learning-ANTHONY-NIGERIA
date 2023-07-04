import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../assets/splashassets/logo.png';
const HeaderNav = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <div>
      <StyledNavBar>
        <nav
          className="navbar fixed-top position-fixed navbar-expand-xl navbar-dark w-100 topbar p-0"
          style={{
            backgroundColor: `${scrollPosition > 80 ? 'rgb(135,159,128,0.6)' : ''}`,
            zIndex: '50'
          }}>
          <div className="container-fluid">
            <a href="#" className="navbar-brand IzesanLogoWrapper">
              <img src={logo} className="IzesanNavLogo" width="40%" />
            </a>

            <button
              className="navbar-toggler"
              style={{ backgroundColor: 'rgb(137, 198, 118)' }}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#navbarOffcanvas"
              aria-controls="navbarOffcanvas"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end"
              id="navbarOffcanvas"
              tabindex="-1"
              aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <a href="#" className="navbar-brand IzesanLogoWrapper">
                  <img src={logo} className="IzesanNavLogo" width="40%" />
                </a>
                <button
                  type="button"
                  className="btn-close btn-close-dark text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <div className="navbar-nav justify-content-end flex-grow-1 pe-3 w-100">
                  <div className="services__nav">
                    {/* <h1 className='text-success fw-bold mx-4 mb-1 fs-1'>Services</h1> */}
                    <div>
                      <Link className="link text-decoration-none fs-4" to="/languages">
                        {' '}
                        Home
                      </Link>
                      <Link className="link text-decoration-none  fs-4" to="#/about">
                        {' '}
                        About
                      </Link>
                      <Link className="link text-decoration-none fs-4" to="/">
                        Izesan Schools
                      </Link>
                    </div>
                  </div>

                  {localStorage.getItem('email_id') ? (
                    <>
                      <Link className="text-decoration-none homeBtn" to="/languages">
                        <button className="signup_btn btn  fw-bolder">Home</button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link className="text-decoration-none loginBtn " to="/login">
                        Login
                      </Link>
                      <button
                        className="signup_btn btn fw-bolder"
                        onClick={() => {
                          navigate('/sign-up');
                        }}>
                        Signup
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </StyledNavBar>
    </div>
  );
};

export default HeaderNav;

const StyledNavBar = styled.div`
  .signup_btn {
    transition-duration: 200ms;
    text-align: center;
    text-decoration: none;
    background-color: #ffc400;
    /* background-image: linear-gradient(to right, #ffc400 , #77cf03df); */
    width: 150px;
  }
  .signup_btn:hover {
    transition-duration: 200ms;
    transform: scale(1.07);
  }
  .offcanvas-body,
  .navbar-toggler {
    z-index: 3;
    opacity: 2;
  }
  .buttonWrapper {
    width: fit-content;
    z-index: 3;
  }
  .topbar {
    z-index: 1;
  }
  .headNavbar {
    background-color: transparent;
  }
  .navBarCOlor {
    background: rgba(255, 255, 255, 0);
  }
  .services__nav {
    margin: 0 0 10px -18px;
  }
  @media (max-width: 1199px) {
    .homeBtn {
      display: none;
    }
  }
  @media (max-width: 770px) {
    .headerNavsWrapper {
      display: flex;
    }
  }

  .loginBtn {
    border-radius: 3px;
    text-shadow: 2px 2px 4px #000000;
    width: 100px;
    color: white;
    font-size: 1rem;
    font-weight: bolder;
    text-align: center;
  }
  .loginBtn:hover {
    transform: scale(1.05);
    color: white;
  }
  @media (max-width: 1199px) {
    .loginBtn {
      width: 150px;
      margin-bottom: 13px;
      text-shadow: 0px 0px 0px #000000;
      text-align: center;
      padding-left: 50px !important;
      background-color: #ffc400;
      color: #00000055;
    }
  }
  @media (max-width: 765px) {
    .signup_btn {
      margin: 0;
    }
  }
  @media (min-width: 1200px) {
    .services__nav {
      display: none;
    }
  }

  /* @media (max-width: 330px ) {
    .IzesanNavLogoContainer{
        width: 70%;
    }
}*/
  @media (max-width: 321px) {
    .IzesanLogoWrapper {
      width: 60%;
    }
  }
  .btn1 {
    cursor: pointer;
  }
  .btn1:hover {
    transform: translateY(1.5px);
    transition-duration: 0ms;
  }
`;
