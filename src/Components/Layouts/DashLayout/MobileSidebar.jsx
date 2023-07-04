import { useRef } from 'react';
import styled from 'styled-components';
// import LogoutIcon from '../../../assets/images/logout.png';
import Logo from '../../../assets/images/web_logo@2x.png';

import { useOutsideClickListener } from '../../../utils/hooks/useOutsideClickListener';
// import SidebarNav from '../../Common/SidebarNav';
import { useNavigate } from 'react-router-dom';
import SidebarNavs from './SidebarNavs';

function MobileSidebar({ showNavDrawer, handleHideNavDrawer }) {
  const DrawerRef = useRef(null);
  const navigate = useNavigate();
  useOutsideClickListener(DrawerRef, () => {
    if (handleHideNavDrawer) {
      handleHideNavDrawer(false);
    }
  });

  return (
    <StyledMobileSidebar className="drawer" showNavDrawer={showNavDrawer}>
      <div className="drawer__overlay"></div>

      <div className="drawer__sidebar" ref={DrawerRef}>
        <div className=" header d-flex  mb-5">
          <div className="d-flex align-items-center">
            <img className="me-lg-3 drawer_logo" src={Logo} />
            <h3 className="fw-bold langName ms-3">{localStorage.getItem('lang')}</h3>
          </div>
        </div>
        {localStorage.getItem('email_id') != 'guestUser' ? (
          <SidebarNavs handleHideNavDrawer={handleHideNavDrawer} />
        ) : (
          <>
            <button
              className="btn btn-warning w-100"
              onClick={() => localStorage.removeItem('email_id') + navigate('/login')}>
              Login
            </button>
          </>
        )}
      </div>
    </StyledMobileSidebar>
  );
}

export default MobileSidebar;

const StyledMobileSidebar = styled.div`
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: ${(props) => (props.showNavDrawer ? '100%' : '0')};
  transition: width 250ms ease-in-out 250ms;

  z-index: ${(props) => (props.showNavDrawer ? '9999' : '0')};
  .drawer_logo {
    width: 53px;
    height: 53px;
  }
  .header {
    align-items: center;
    justify-content: center;
  }
  .drawer__overlay {
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: ${(props) => (props.showNavDrawer ? '100%' : '0')};
    opacity: ${(props) => (props.showNavDrawer ? '1' : '0')};
    transition: opacity 250ms ease-in-out;

    background-color: rgba(0, 0, 0, 0.5);

    z-index: -1;
  }
  @media (max-width: 575px) {
    .langName {
      display: none;
    }
    .header {
      align-items: start;
      justify-content: start;
    }
  }
  .drawer__sidebar {
    /* Take full height */
    height: 100%;
    left: 0;
    position: fixed;
    overflow-y: scroll;
    /* overflow: hidden; */
    top: 0;
    padding: 1.8rem;
    width: 60%;
    transform: ${(props) => (props.showNavDrawer ? 'translateX(0px)' : 'translateX(-300px)')};
    max-width: 300px;
    transition: transform 250ms ease-in-out;

    /* Background */
    background-color: #fff;
  }
`;
