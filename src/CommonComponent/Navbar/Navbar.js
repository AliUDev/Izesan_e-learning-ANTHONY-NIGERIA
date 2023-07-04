import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HiOutlineMenu } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/images/web_logo@2x.png';
import UserImage from '../../Components/Common/UserImage';
import { img } from '../../url';
import './navbar.css';
export default function NavBar() {
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState('#action1');

  return (
    <>
      <StyledMobileHeader className="d-lg-none">
        <Navbar.Toggle aria-controls="mobileNavbarScroll">
          <span className="burgerMenu">
            <HiOutlineMenu className="d-block d-lg-none" />
          </span>
        </Navbar.Toggle>
        <Navbar.Collapse id="mobileNavbarScroll" className="justify-content-between">
          <Nav
            className="d-flex justify-content-around bg-info me-auto my-2 my-lg-0 mx-auto"
            style={{
              padding: '0px 0px 0px 32px',
              width: '60%'
              // background: "red",
            }}
            defaultActiveKey={activeLink}
            onSelect={(selectedKey, event) => {
              event.preventDefault();
              setActiveLink(selectedKey);
            }}
            mobileNavbarScroll>
            <Nav.Link href="#action1">Find A Teacher</Nav.Link>
            <Nav.Link href="#action2">Community</Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/become-a-tutor');
              }}
              href="#action3">
              Became A Teacher
            </Nav.Link>
            <Nav.Link href="#action4">Contact us</Nav.Link>
          </Nav>
          <span className="d-flex">
            <img src={`${img}${JSON.parse(localStorage.getItem('all_data'))[0].dp}`} alt="" />
            <span className="navbarCrafty p-2">
              {JSON.parse(localStorage.getItem('all_data'))[0].name}
            </span>
          </span>
        </Navbar.Collapse>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <UserImage id="123123a" name={JSON.parse(localStorage.getItem('all_data'))[0].name} />
            <span className="ms-2 d-block fw-bold username">
              {JSON.parse(localStorage.getItem('all_data'))[0].name}
            </span>
          </div>
        </div>
      </StyledMobileHeader>

      <Navbar
        className="navv d-none d-lg-flex"
        expand="lg"
        style={{ borderBottom: '1px solid #7a8da4' }}>
        <Container fluid className="flex justify-content-between">
          <Navbar.Brand href="#">
            <img src={Logo} alt="" width="80px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-between">
          <Nav
            className="d-flex justify-content-around me-auto my-2 my-lg-0 mx-auto"
            style={{
              padding: '0px 0px 0px 32px',
              width: '60%'
              // background: "red",
            }}
            defaultActiveKey={activeLink}
            onSelect={(selectedKey, event) => {
              event.preventDefault();
              setActiveLink(selectedKey);
            }}
            navbarScroll>
            <Nav.Link href="#action1">Find A Teacher</Nav.Link>
            <Nav.Link href="#action2">Community</Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/become-a-tutor');
              }}
              href="#action3">
              Became A Teacher
            </Nav.Link>
            <Nav.Link href="#action4">Contact us</Nav.Link>
          </Nav>
          <span className="d-flex">
            <img src={`${img}${JSON.parse(localStorage.getItem('all_data'))[0].dp}`} alt="" />
            <span className="navbarCrafty p-2">
              {JSON.parse(localStorage.getItem('all_data'))[0].name}
            </span>
          </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export const StyledMobileHeader = styled.div`
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .burgerMenu {
    background-color: ${(props) => props.theme.primary};
    width: 54px;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    svg {
      color: white;
      font-size: 38px;
    }
  }
  .chatIcon {
    color: ${(props) => props.theme.primary};
    font-size: 38px;
    cursor: pointer;
  }

  .username {
    font-size: 20px;
  }
`;
