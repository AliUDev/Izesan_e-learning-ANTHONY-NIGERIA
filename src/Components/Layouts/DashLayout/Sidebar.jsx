import { useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { breakpointLg, breakpointSm } from '../../../constants/breakpoints';
import { useViewport } from '../../../utils/hooks/useViewport';
import MobileSidebar from './MobileSidebar';
import SidebarNavs from './SidebarNavs';
function Sidebar({ forceMiniSidebar = false, showNavDrawer, handleHideNavDrawer }) {
  const navigate = useNavigate();
  const { width } = useViewport();
  const location = useLocation();

  const [disabledNav, setdisabledNav] = useState(false);


  useLayoutEffect(() => {
    const lcLag = localStorage.getItem('lang');
    const email_id = localStorage.getItem('email_id');
    if (window.location.hash == '#/languages' && !lcLag || email_id == "guestUser") {
      setdisabledNav(true)
    } else {
      setdisabledNav(false)
    }
  }, [window.location.href])

  const [miniSidebar, setMiniSidebar] = useState(forceMiniSidebar);
  useLayoutEffect(() => {

    if (forceMiniSidebar) {
      setMiniSidebar(true);
    } else {
      if (width < breakpointLg) {
        setMiniSidebar(true);
      } else {
        setMiniSidebar(false);
      }
    }
  }, [width, forceMiniSidebar]);



  // for mobile screens
  if (width < breakpointSm) {
    return (
      <MobileSidebar showNavDrawer={showNavDrawer} handleHideNavDrawer={handleHideNavDrawer} />
    );
  }


  return (
    <StyledSidebar className="layout__left" style={{ pointerEvents: `${disabledNav ? 'none' : ''}`, opacity: `${disabledNav ? '0.3' : ''}` }} miniSidebar={miniSidebar}>
      <SidebarNavs hideText={miniSidebar} />
    </StyledSidebar>
  );
}
export default Sidebar;

var a = window.outerHeight;





const StyledSidebar = styled.aside`
  height: ${a}px;
  overflow-y: auto;
  padding: 1rem 1rem;
  position: relative;
  transition: width 150ms ease-in-out;
  width: ${(props) => (props.miniSidebar ? '75px' : '300px')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
  /* width */
  ::-webkit-scrollbar {
    width: 9px;
  }
  ::-webkit-scrollbar :hover {
    cursor: pointer;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 9px;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.secondary};
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.primary};
  }

  :hover {
    .caretToggler {
      opacity: 1;
    }
  }
`;

