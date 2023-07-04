import styled from 'styled-components';
import GreyPic from '../../../assets/images/gray_pic.png';
import { getLeaderboardPosition } from '../../../utils/_methods';

const LeaderCard = ({ imgSrc, name, position, value }) => {
  let leaderPost = getLeaderboardPosition(position);
  return (
    <StyledLeaderCard position={position} color={leaderPost.color} className={`${position}`}>
      <div className="leaderImg">
        <img
          className="image"
          src={imgSrc}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = GreyPic;
          }}
        />
        <div className="position">{leaderPost.post}</div>
      </div>
      <div className="name">{name}</div>
      <div
        className="name"
        style={{ color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`, fontSize: "20px" }}>
        {value ? value : ''}
      </div>
    </StyledLeaderCard>
  );
};

export default LeaderCard;

const StyledLeaderCard = styled.div`
  width: 100%;
  width: ${(props) => (props.position === 'first' ? '230px' : '180px')};
  min-height: ${(props) => (props.position === 'first' ? '320px' : '250px')};
  border-top: 8px solid ${(props) => props.color};
  display: flex;
  flex-direction: column;
  align-items: center;

  .leaderImg {
    position: relative;
    margin-top: ${(props) => (props.position === 'first' ? '2.5rem' : '3rem')};
    .image {
      width: ${(props) => (props.position === 'first' ? '150px' : '100px')};
      height: ${(props) => (props.position === 'first' ? '150px' : '100px')};
      object-fit: cover;
      border-radius: 50%;
    }
    .position {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      width: ${(props) => (props.position === 'first' ? '40px' : '35px')};
      height: ${(props) => (props.position === 'first' ? '40px' : '35px')};
      background-color: ${(props) => props.color};
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: bolder;
      font-size: ${(props) => (props.position === 'first' ? '1.4rem' : '1rem')};
    }
  }
  .name {
    margin-top: 2rem;
    font-weight: bold;
    font-size: ${(props) => (props.position === 'first' ? '1.8rem' : '1.4rem')};
    color: #f19c00;
    text-align: center;
    padding: 0 0.2rem;
  }
  @media (max-width: 1200px) {
    width: ${(props) => (props.position === 'first' ? '180px' : '140px')};
    min-height: ${(props) => (props.position === 'first' ? '280px' : '230px')};
    .leaderImg {
      margin-top: ${(props) => (props.position === 'first' ? '2rem' : '2rem')};
      .image {
        width: ${(props) => (props.position === 'first' ? '120px' : '90px')};
        height: ${(props) => (props.position === 'first' ? '120px' : '90px')};
      }
    }
  }

  @media (max-width: 576px) {
    width: ${(props) => (props.position === 'first' ? '230px' : '180px')};
    min-height: ${(props) => (props.position === 'first' ? '260px' : '200px')};
    .leaderImg {
      margin-top: ${(props) => (props.position === 'first' ? '2rem' : '2rem')};
      .image {
        width: ${(props) => (props.position === 'first' ? '90px' : '75px')};
        height: ${(props) => (props.position === 'first' ? '90px' : '75px')};
      }
    }
  }

  @media (min-width: 425px) and (max-width: 425px) {
    width: ${(props) => (props.position === 'first' ? '160px' : '130px')};
  }
`;
