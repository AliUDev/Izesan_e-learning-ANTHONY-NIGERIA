import styled from 'styled-components';
import GreyPic from '../../../assets/images/Profile-Icon.png';
import { img } from '../../../url';

import { useNavigate } from 'react-router-dom';
function UserCard1({ item }) {
  const navigate = useNavigate();
  return (
    <StyledUserCard
      onClick={() => navigate(`/profile-details?email_id=${item.email_id}`)}
      style={{ cursor: 'pointer' }}
      className="userProfile ">
      <div className="imgContainer">
        {/*<img src={`${profileImg}${item.picture}`} alt="user" />*/}
        {/*<p style={{ position: 'absolute', marginTop: '9rem', color: 'goldenrod' }}>*/}
        {/*  {item.email_id}*/}
        {/*</p>*/}
        <img
          className="image"
          src={`${img}${item.dp}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = GreyPic;
          }}
        />
      </div>
      <div style={{ width: '200px' }} className="pcontent">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
          <div
            className='text-center'
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              wordBreak: 'break-all',
              textAlign: 'center',
            }}>
          </div>

          {/*<div*/}
          {/*  style={{*/}
          {/*    display: 'flex',*/}
          {/*    flexDirection: 'row',*/}
          {/*    width: '192px',*/}
          {/*    justifyContent: 'space-between',*/}
          {/*    padding: '0px 10px'*/}
          {/*  }}>*/}
          {/*  <p*/}
          {/*    style={{*/}
          {/*      fontWeight: 'Bold',*/}
          {/*      fontSize: '14px'*/}
          {/*    }}>*/}
          {/*    {item?.teaches}*/}
          {/*  </p>*/}
          {/*  <p*/}
          {/*    style={{*/}
          {/*      fontWeight: 'Bold',*/}
          {/*      fontSize: '14px'*/}
          {/*    }}>*/}
          {/*    {item?.badge}*/}
          {/*  </p>*/}
          {/*</div>*/}
        </div>
      </div>
      <p
        className='position-absolute bottom-0 start-50 translate-middle-x w-100 text-light p-1 text-truncate'
        style={{
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgb(0,0,0,0.3)',
          fontSize: '12px',
          maxWidth: '100%',
        }}>
        {item.name ? item.name : item.email_id}
      </p>
    </StyledUserCard>
  );
}

export default UserCard1;

const StyledUserCard = styled.div`
  margin: auto;
  align-content: center;
  text-align: center;
  border: 1px solid  ${(props) => props.theme.secondary};
  height: 200px;
  width: 200px;
  position: relative;
  border-radius: 16px;
  margin-bottom: 2rem;
  .imgContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 100%;
    margin-left: -10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .online-indicator {
    width: 17px;
    height: 17px;
    background-color: #18e614;
    border-radius: 50px;
    position: absolute;
    right: -5px;
  }
  .cross-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50px;
    position: absolute;
    right: 0;
    color: #d80000;
  }
`;
