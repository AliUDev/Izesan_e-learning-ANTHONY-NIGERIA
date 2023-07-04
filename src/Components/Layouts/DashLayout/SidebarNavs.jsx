import { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarNav from '../../Common/SidebarNav';
import { sidebarData } from './SidebarData';
function SidebarNavs({ hideText, handleHideNavDrawer }) {
  const location = useLocation();
  // var localData = localStorage.getItem('all_data');
  // var is_tuitor = 0;
  // if (localData && localData.length > 0) {
  //   is_tuitor = JSON.parse(localStorage.getItem('all_data'))[0].tutor_st;
  // }
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

  return (
    <div style={{ pointerEvents: `${disabledNav ? 'none' : ''}` }}>
      {sidebarData?.map((sidebar, index) => {
        // if (sidebar.path == '/booking' && is_tuitor == 0) {
        //   sidebar.path = '/user-booking';
        //   sidebar.label = 'User-Booking';
        // }
        // console.log(sidebar.path);
        let isActive = sidebar.path === location.pathname ? 'true' : undefined;
        return (
          <SidebarNav
            key={index}
            path={sidebar.path}
            label={sidebar.label}
            icon={sidebar.icon}
            iconSelected={sidebar.iconSelected}
            isActive={isActive}
            hideText={hideText}
            handleHideNavDrawer={handleHideNavDrawer}
          />
        );
      })}
    </div>
  );
}

export default SidebarNavs;
