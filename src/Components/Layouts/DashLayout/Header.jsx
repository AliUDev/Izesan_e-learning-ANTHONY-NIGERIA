import { Dropdown, DropdownButton } from 'react-bootstrap';
import { BiBell } from 'react-icons/bi';
import { BsCaretDown } from 'react-icons/bs';
import { HiOutlineMenu } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BellIcon from '../../../assets/images/bell_topbar.png';
import Logo from '../../../assets/images/web_logo@2x.png';
import { img } from '../../../url';
import UserImage from '../../Common/UserImage';
import VolumeButton from './VolumeButton';
function Header({ handleShowNavDrawer }) {
  const navigate = useNavigate();
  var localData = localStorage.getItem('all_data');
  var emailId = '';
  var namelocal = '';
  var dplocal = '';
  if (localData) {
    emailId = JSON.parse(localStorage.getItem('all_data'))[0].email_id
      ? JSON.parse(localStorage.getItem('all_data'))[0].email_id
      : '';

    namelocal = JSON.parse(localStorage.getItem('all_data'))[0].name;
    dplocal = JSON.parse(localStorage.getItem('all_data'))[0].dp;
  }

  return (
    <>
      <StyledMobileHeader className="d-sm-none">
        <span className="burgerMenu">
          <HiOutlineMenu onClick={handleShowNavDrawer} className="d-block d-sm-none" />
        </span>

        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            {localStorage.getItem('email_id') != 'guestUser' ? (
              <UserImage id="123123a" name={namelocal} imgSrc={`${img}${dplocal}`} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </StyledMobileHeader>
      <StyledHeader className="d-none d-sm-flex">
        <div className="left-section d-flex align-items-center">
          <img
            onClick={() => {
              navigate('/languages');
            }}
            className="me-lg-3 navbar_logo mx-3"
            src={Logo}
            style={{ objectFit: 'cover' }}
          />
          {/*<div className="d-none d-lg-flex align-items-center">*/}
          {/*  <h5 className="fw-bold ">*/}
          {/*    {localStorage.getItem('lang')*/}
          {/*      ? localStorage.getItem('lang').replace(/English-/g, '')*/}
          {/*      : ''}*/}
          {/*  </h5>*/}
          {/*  /!*<FiChevronDown className="ms-2 mb-1" />*!/*/}
          {/*</div>*/}
        </div>

        <div
          className="middle-section d-flex align-items-center justify-content-between"
          style={{ marginLeft: '20px' }}>
          <h4 style={{ margin: 'auto' }} className="font-poppins">
            Welcome to Izesan!
            <strong className="bold__text px-1">
              Speak{' '}
              <span>
                {' '}
                {localStorage.getItem('lang')
                  ? localStorage.getItem('lang').replace(/English-/g, '')
                  : ''}
                !
              </span>
            </strong>
          </h4>
          {/* <div className="searchbar">
            <SearchBar placeholder="Search" />
          </div> */}
        </div>

        <div className="right-section d-flex align-items-center justify-content-center right-section">
          <div className="nav-icons-div d-none d-lg-flex">
            <VolumeButton />
            {localStorage.getItem('email_id') === 'guestUser' ? (
              ''
            ) : (
              <>
                {/* <img
            onClick={() => {
              navigate('/profile-details?email_id=' + emailId);
            }}
            src={UserIcon}
            className="fiUser me-4"
            alt="user"
          /> */}
                <img
                  onClick={() => {
                    navigate('/notification');
                  }}
                  src={BellIcon}
                  className="biBell"
                  alt="bell"
                />
              </>
            )}
          </div>
          <div className="d-flex align-items-center">
            {/* <div className="d-flex d-lg-none align-items-center me-2">
              <BsChatText
                className="chatIcon"
                onClick={() => {
                  navigate('/inbox');
                }}
              />
            </div> */}

            {localData && localData.length > 0 && (
              <>
                {localStorage.getItem('email_id') === 'guestUser' ? (
                  <button
                    className="btn btn-primary rounded"
                    onClick={() => {
                      localStorage.clear();
                      navigate('/login');
                    }}>
                    Login
                  </button>
                ) : (
                  <>
                    <UserImage
                      id="123123a"
                      name={JSON.parse(localStorage.getItem('all_data'))[0].name}
                      size="38"
                      imgSrc={`${img}${JSON.parse(localStorage.getItem('all_data'))[0].dp}`}
                    />
                    <div
                      style={{ cursor: 'pointer' }}
                      className="d-none d-lg-flex align-items-center"
                      onClick={() => {
                        navigate('/profile-details?email_id=' + emailId);
                      }}>
                      <span className="ms-2 d-block fw-bold username">
                        {JSON.parse(localStorage.getItem('all_data'))[0].name}
                      </span>
                    </div>
                  </>
                )}

                {/* <UserImage
                  id="123123a"
                  name={JSON.parse(localStorage.getItem('all_data'))[0].name}
                  size="38"
                  imgSrc={`${img}${JSON.parse(localStorage.getItem('all_data'))[0].dp}`}
                /> */}

                <div className="nav-dropdown d-flex d-lg-none ms-2">
                  <DropdownButton
                    id="dropdown-item-button"
                    title={<BsCaretDown fontSize={26} className="biBell" />}>
                    <Dropdown.ItemText>
                      {JSON.parse(localStorage.getItem('all_data'))[0].name}
                    </Dropdown.ItemText>
                    <Dropdown.Item
                      onClick={() => {
                        navigate('/notification');
                      }}
                      as="button"
                      className="dropdown-item">
                      <BiBell fontSize={26} className="biBell me-2" /> Notification
                    </Dropdown.Item>
                    {/* <Dropdown.Item
                      onClick={() => {
                        navigate('/profile-details');
                      }}
                      as="button"
                      className="dropdown-item">
                      <FiUser fontSize={26} className="fiUser me-2" /> Users
                    </Dropdown.Item> */}
                    <Dropdown.Item>
                      <VolumeButton title="Volume" />
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </>
            )}
          </div>
        </div>
      </StyledHeader>
    </>
  );
}

export default Header;

const StyledHeader = styled.div`
  width: 100%;
  padding: 1rem 0rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  .navbar_logo {
    width: 100px;
    height: 75px;
    cursor: pointer;
    padding-left: 20px;
  }
  .left-section {
    display: flex;
    align-items: center;
    justify-content: flex-start !important;
    width: 75px;
    @media (min-width: 992px) {
      width: 180px;
    }
  }
  .middle-section {
    display: flex;
    flex: 1;
    .searchbar {
      width: 50%;
    }
  }
  .right-section {
    display: flex;
    width: 20%;
    max-width: 370px;
    .nav-dropdown {
      .dropdown-toggle {
        padding: 0;
        background: transparent;
        border: 0;
        box-shadow: none;
        ::after {
          content: none;
        }
        svg {
          color: ${(props) => props.theme.secondary};
        }
      }
    }
  }
  .bold__text {
    color: ${(props) => props.theme.secondary};
  }
  .nav-icons-div {
    border-right: 2px solid #a7a7a7;
    margin-right: 1rem;
    padding-right: 1rem;
    display: flex;
    align-items: center;
  }
  .fiUser,
  .biBell {
    color: ${(props) => props.theme.secondary};
    cursor: pointer;
  }
  .chatIcon {
    color: ${(props) => props.theme.primary};
    font-size: 32px;
    cursor: pointer;
  }
  .dropdown-item {
  }
`;
const StyledMobileHeader = styled.div`
  padding: 0.5rem 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .burgerMenu {
    background-color: ${(props) => props.theme.secondary};
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10%;

    svg {
      color: white;
      font-size: 35px;
    }
  }
  .burgerMenu:hover {
    cursor: pointer;
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
