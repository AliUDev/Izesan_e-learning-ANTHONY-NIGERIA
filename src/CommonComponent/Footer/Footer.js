import { MDBCol, MDBContainer, MDBFooter, MDBRow } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/web_logo@2x.png';
// import Logo from '';

import appleLogo from '../../assets/images/apple.png';
import googleLogo from '../../assets/images/google_play.png';
import UpFooter from '../../assets/images/up_footer.png';
import './footer.css';

export default function Footer() {
  return (
    <MDBFooter
      className="text-center text-lg-left mx-auto d-none d-lg-block"
      style={{ marginTop: '25px' }}>
      <MDBContainer className="p-4">
        <MDBRow className="text-align-center justify-content-center">
          <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            <img height="124px" width="117px" src={Logo} alt="" />
          </MDBCol>

          <MDBCol lg="2" md="6" className="mb-4 mb-md-0 text-start">
            <h5 className="text-uppercase mb-3">Community</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-dark text-decoration-none">
                  Create Account
                </a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">
                  Go to Premium
                </a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">
                  Prefer A Friend
                </a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">
                  Get Coupon Code
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg="2" md="6" className="mb-4 mb-md-0 text-start">
            <h5 className="text-uppercase mb-3">Support</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-dark text-decoration-none">
                  Terms Condition
                </a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">
                  Privacy & Policy
                </a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">
                  Copyright Issue
                </a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">
                  Get Help
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg="2" md="6" className="mb-4 mb-md-0 text-start">
            <h5 className="text-uppercase mb-3">Join Us</h5>

            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-dark text-decoration-none">
                  Become Teacher
                </a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">
                  Become Student
                </a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">
                  Become Both
                </a>
              </li>
              <li>
                <a href="#!" className="text-dark text-decoration-none">
                  Partnership
                </a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol lg="2" md="6" className="mb-4 mb-md-0 text-start">
            <h5 className="text-uppercase mb-3">Download App</h5>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
              <img src={appleLogo} alt="" />
              <img src={googleLogo} alt="" />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className="d-flex justify-content-around" style={{ borderTop: '1px solid #334565' }}>
        {/* &copy; {new Date().getFullYear()} Copyright:{' '} */}
        <a className="text-dark text-decoration-none">Copyright © 2010-2019 Pro.skill</a>
        <a className="text-dark text-decoration-none">
          Go to To{' '}
          <span>
            <Link to="">
              <img src={UpFooter} alt="" />
            </Link>
          </span>
        </a>
      </div>
    </MDBFooter>
  );
}
