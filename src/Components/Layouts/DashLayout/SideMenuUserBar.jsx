import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserImage from '../../Common/UserImage';

function SideMenuUserBar({ name, imgSrc, isOnline, id, action, url, module, dp }) {
  return (
    <Link
      to={action ? url : ''}
      onClick={() => {
        if (module == 'inbox') {
          localStorage.setItem('current_img', dp);
        }
      }}
      className="userBarLink"
      style={{ textDecoration: 'none' }}>
      <StyledSideMenuUserBar className="d-flex parent__div w-100">
        <div
          className="d-flex align-items-center teacher__list w-100 rounded p-2 my-1"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title={name}>
          <UserImage name={name} imgSrc={imgSrc} id={id} rounded={false} isOnline={isOnline} />
          <span>
            <div className="username d-inline-block text-truncate ms-2 ms-xl-3 fw-bold">{name}</div>
          </span>
        </div>
        {/*{action && (*/}
        {/*  <div>*/}
        {/*    <FaVideo />*/}
        {/*  </div>*/}
        {/*)}*/}
      </StyledSideMenuUserBar>
    </Link>
  );
}

export default SideMenuUserBar;

const StyledSideMenuUserBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  cursor: pointer;
  text-transform: capitalize;

  .username {
    white-space: nowrap;
    font-size: 14px;
    color: ${(props) => props.theme.text_dark};
    max-width: 165px;
  }

  svg {
    font-size: 28px;
    color: ${(props) => props.theme.secondary};
  }
  .teacher__list {
    transition-duration: 100ms;
  }

  .teacher__list:hover {
    background-color: ${(props) => props.theme.secondary};
    color: white !important;
    box-shadow: 1px 2px 2px #cbcbcb;
    transform: scale(1.01);
  }
`;
