import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../../url';

function SidebarNav({
  uniqueKey,
  path,
  label,
  icon,
  iconSelected,
  isActive,
  hideText,
  handleHideNavDrawer
}) {
  const navigate = useNavigate();
  function deleteAccount() {
    if (confirm('Are you sure you want to delete your account ?')) {
      axios
        .post(`${api}remove/user`, { email_id: localStorage.getItem('email_id') })
        .then((res) => {
          if (res.data.status == 'success') {
            NotificationManager.info('Your Account is Deleted!', 'Info', 3000);
            localStorage.clear()
            navigate('/')
          } else {
            NotificationManager.error('Firewall OR Network Error!!', 'Error', 3000);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            setisLoader(false);
            NotificationManager.error('Firewall OR Network Error!!', 'Error', 3000);
          }
        });
    }
  }

  function clearStorage() {
    localStorage.removeItem('state');
    localStorage.removeItem('all_data');
    localStorage.removeItem('count');
    localStorage.removeItem('chapter_no');
    localStorage.removeItem('chapter_type');
    localStorage.removeItem('crr_chapter_index');
    localStorage.removeItem('attempt');
    localStorage.removeItem('q_incr');
    localStorage.removeItem('email_id');
    localStorage.removeItem('crr_chapter_index');
    localStorage.removeItem('dropdown_item');
    localStorage.removeItem('tutor_id');
    localStorage.removeItem('price');
    localStorage.removeItem('userIds');
    localStorage.removeItem('tutor_active');
    localStorage.removeItem('selectedSession');
    localStorage.removeItem('bkId');
    localStorage.removeItem('booking_type');
    localStorage.removeItem('payment_status');
    localStorage.removeItem('lang');
    localStorage.removeItem('current_img');
  }
  function logout() {
    //e.preventDefault();
    axios
      .get(`${api}PersonLogout?email_id=${localStorage.getItem('email_id')}`)
      .then(() => {
        var date = new Date();
        var todayDate = date.toISOString().slice(0, 10);
        var userData = localStorage.getItem('all_data');
        var uniqueName = '';
        var site_time = '';
        if (userData) {
          var email = JSON.parse(localStorage.getItem('all_data'))[0].email_id;
          uniqueName = email.split('@')[0];
          site_time = parseInt(localStorage.getItem(uniqueName + '__' + todayDate));
        }
        //var current_day_target = localStorage.getItem('current_day_target');
        // localStorage.clear();
        //  localStorage.setItem(uniqueName + '__' + todayDate, site_time);
        //  localStorage.setItem('current_day_target', current_day_target);

        clearStorage();
        navigate('/login');
      })
      .catch((err) => console.log(err));
    // localStorage.removeItem('all_data')
    // localStorage.removeItem('email_id')
  }

  const handleClick = (e) => {
    // handleHideNavDrawer(false);
    if (label == 'Delete Account') {
      e.preventDefault();
      deleteAccount();
    } else if (label == 'Logout') {
      e.preventDefault();
      logout();
    } else {
      if (handleHideNavDrawer) handleHideNavDrawer(true);
    }
  };
  return (
    <StyledSidebarNav
      key={uniqueKey}
      to={path}
      active={isActive}
      onClick={(e) => handleClick(e)}>
      <Tooltip title={label} placement="right-end">
        <span
          className="d-block me-3 sidebar_icon"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent">
          <img src={isActive ? iconSelected : icon} />
        </span>
      </Tooltip>
      <span>{!hideText && label}</span>
    </StyledSidebarNav>
  );
}

export default SidebarNav;

const StyledSidebarNav = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: bold;
  color: ${(props) => (props.active === 'true' ? props.theme.primary : props.theme.text_secondary)};
  margin-bottom: 1.4rem;
  white-space: nowrap;
  .sidebar_icon {
    width: 28px;
  }
  :hover {
    color: ${(props) =>
    props.active === 'true' ? props.theme.primary : props.theme.text} !important;
  }
  svg {
    font-size: 1.6rem;
  }
`;
