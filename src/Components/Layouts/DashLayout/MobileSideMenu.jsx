import { useRef } from 'react';
import styled from 'styled-components';
import { useOutsideClickListener } from '../../../utils/hooks/useOutsideClickListener';
import SideMenuContent from './SideMenuContent';

function MobileSideMenu({ showNavDrawer, handleHideNavDrawer }) {
  const DrawerRef = useRef(null);
  // const [sidebar, setSidebar] = useState(false);
  useOutsideClickListener(DrawerRef, () => {
    if (handleHideNavDrawer) {
      handleHideNavDrawer(false);
    }
  });
  // const showSidebar = () => setSidebar(!sidebar);

  return (
    <StyledMobileSideMenu className="drawer" showNavDrawer={showNavDrawer}>
      <div className="drawer__overlay"></div>

      <div className="drawer__sidemenu" ref={DrawerRef}>
        <SideMenuContent />
      </div>
    </StyledMobileSideMenu>
  );
}

export default MobileSideMenu;

const StyledMobileSideMenu = styled.div`
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: ${(props) => (props.showNavDrawer ? '100%' : '0')};
  transition: width 250ms ease-in-out 250ms;
  z-index: ${(props) => (props.showNavDrawer ? '9999' : '0')};
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

  .drawer__sidemenu {
    /* Take full height */
    height: 100%;
    right: 0;
    position: fixed;
    top: 0;
    padding-top: 1.2rem;
    width: 100%;
    transform: ${(props) => (props.showNavDrawer ? 'translateX(0px)' : 'translateX(300px)')};
    max-width: 300px;
    transition: transform 250ms ease-in-out;

    /* Background */
    background-color: #fff;
  }
`;
