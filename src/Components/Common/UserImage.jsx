import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GreyPic from '../../assets/images/gray_pic.png';
import { getInitials, getRandomColor } from '../../utils/_methods';

function UserImage({ id, size = 48, rounded = true, imgSrc = GreyPic, name, className, isOnline }) {
  const navigate = useNavigate();
  var localData = localStorage.getItem('all_data');
  var emailId = '';
  if (localData) {
    emailId = JSON.parse(localStorage.getItem('all_data'))[0].email_id
      ? JSON.parse(localStorage.getItem('all_data'))[0].email_id
      : '';
  }

  return (
    <StyledUserImageContainer>
      <StyledUserImage size={size} rounded={rounded}>
        {imgSrc ? (
          <img
            onClick={() => {
              navigate('/profile-details?email_id=' + emailId);
            }}
            src={imgSrc}
            style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '50px' }}
            alt={name}
            className={className}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = GreyPic;
            }}
          />
        ) : (
          <div className="initials" style={{ background: getRandomColor(id) }}>
            <span className="text-white">{getInitials(name)}</span>
          </div>
        )}
      </StyledUserImage>
      {isOnline && <div className="online-indicator" />}
    </StyledUserImageContainer>
  );
}

export default UserImage;

const StyledUserImageContainer = styled.div`
  position: relative;
  .online-indicator {
    z-index: 2;
    position: absolute;
    top: -3px;
    right: -5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #4de54a;
  }
`;
const StyledUserImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => (props.rounded ? '0px' : '100px')};
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .initials {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
  }
`;
