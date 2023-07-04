import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../../../Pages/Loader/Loader';
import Header from './Header';
import Sidebar from './Sidebar';
import SideMenu from './SideMenu';

function DashLayout({ hideSidebar }) {
  const [showNavDrawer, setShowNavDrawer] = useState(false);
  const [showSideMenuDrawer, setShowSideMenuDrawer] = useState(false);

  const handleShowNavDrawer = () => {
    setShowNavDrawer(true);
  };
  const handleHideNavDrawer = () => {
    setShowNavDrawer(false);
  };
  const handleShowSideMenu = () => {
    setShowSideMenuDrawer(true);
  };
  const handleHideSideMenu = () => {
    setShowSideMenuDrawer(false);
  };
  return (
    <StyledLayout>
      <Header handleShowNavDrawer={handleShowNavDrawer} handleShowSideMenu={handleShowSideMenu} />
      <main className="layout__main ">
        <Sidebar
          forceMiniSidebar={hideSidebar}
          showNavDrawer={showNavDrawer}
          handleHideNavDrawer={handleHideNavDrawer}
          handleHideSideMenu={handleHideSideMenu}
        />
        <div className="layout__middle">
          <Suspense fallback={<Loader />} >
            <Outlet />
          </Suspense>
        </div>
        <SideMenu
          forceHideSideMenu={hideSidebar}
          showSideMenuDrawer={showSideMenuDrawer}
          handleHideSideMenu={handleHideSideMenu}
        />
      </main>
    </StyledLayout>
  );
}

export default DashLayout;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${(props) => props.theme.white};
  .layout__main {
    margin-top: 0.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
  }
  .layout__middle {
    width: 100%;
    flex-grow: 1;
    background: ${(props) => props.theme.bg};
    border-radius: 15px;
  }
  @media (max-width: 400px) {
    width: 100%;
  }
`;
