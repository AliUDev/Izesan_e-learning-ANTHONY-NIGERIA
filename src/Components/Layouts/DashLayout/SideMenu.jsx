import styled from 'styled-components';
import { breakpointLg } from '../../../constants/breakpoints';
import { useViewport } from '../../../utils/hooks/useViewport';
import MobileSideMenu from './MobileSideMenu';
import SideMenuContent from './SideMenuContent';
function SideMenu({ forceHideSideMenu = false, showSideMenuDrawer, handleHideSideMenu }) {




  const { width } = useViewport();

  // for mobile screens
  if (width < breakpointLg) {
    return (
      <MobileSideMenu showNavDrawer={showSideMenuDrawer} handleHideNavDrawer={handleHideSideMenu} />
    );
  }
  if (forceHideSideMenu) {
    return null;
  }

  return (
    <StyledSideMenu className="layout__left d-none d-lg-block">
      <SideMenuContent />
    </StyledSideMenu>
  );
}
export default SideMenu;

const StyledSideMenu = styled.aside`
  width: 20%;
  min-width: 280px;
  max-width: 370px;
`;
