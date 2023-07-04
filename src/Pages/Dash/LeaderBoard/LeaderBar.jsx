import styled from 'styled-components';
import BronzeMedal from '../../../assets/images/bronze.png';
import CopperMedal from '../../../assets/images/copper.png';
import GreyPic from '../../../assets/images/gray_pic.png';
import SilverMedal from '../../../assets/images/silver.png';
function LeaderBar({ imgSrc, name, position, number, value }) {
  let medalSrc = null;
  switch (position) {
    case 'first':
      medalSrc = SilverMedal;
      break;
    case 'second':
      medalSrc = BronzeMedal;
      break;
    case 'third':
      medalSrc = CopperMedal;
      break;
    default:
      medalSrc = null;
  }

  return (
    <StyledLeaderBar className="leaderBoardUserContainer w-100 border rounded-3 mb-2">
      <div className="tabWrapper ">
        <div className={`position m-3 mx-4 ${position}`}>{number}</div>
        <div style={{ width: "99px" }}>
          <img
            style={{ objectFit: 'cover', width: "99px", borderRadius: "50px" }}
            className="image m-2"
            src={imgSrc}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = GreyPic;
            }}
          />
        </div>

        <div className='NameWrapper'>
          <div className="name m-2 mx-4 text-capitalize" style={{ width: '100px' }}>
            {name}
          </div>
          <br />
          <div
            style={{
              display: 'block',
              color: '#' + Math.floor(Math.random() * 16777215).toString(16)
            }}
            className="name">
            {value ? value : ''}
          </div>
          <div>
            {medalSrc && (
              <div className="medal medalCls">
                <img src={medalSrc} alt="jonny" />
              </div>
            )}
          </div>
        </div>
      </div>

    </StyledLeaderBar>
  );
}

export default LeaderBar;

const StyledLeaderBar = styled.div`
.leaderBoardUserContainer{
  display:flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
}
  background: white;
  // overflow-x: scroll;
  box-shadow: 0 2px 2px 0px #d4d4d4;
  .position {
    font-size: 1.6rem;
    font-weight: 800;
    /* margin-right: 3.5rem; */
    &.first {
      color: #f19c00;
    }
    &.second {
      color: #75b28f;
    }
    &.third {
      color: #b458f4;
    }
  }
  .image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 15px;
    /* margin-right: 3rem; */
  }
  .name {
    font-weight: bold;
    font-size: 1.1rem;
  }
  .medal {
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  @media (max-width: 576px) {
    .position {
      font-size: 1.2rem;
      margin-right: 1rem;
      display: none;
    }
    .image {
      /* margin-right: 2rem; */
      width: 30%;
      border-radius: 20%;
    }
    .medal {
      display: none;
      width: 80px;
      height: 80px;
    }
  }
  .tabWrapper{
    display: flex;
    align-items:center;
    justify-content :center;
    width: 100%;
  }
  .NameWrapper{
    display: flex;
    align-items:center;
    justify-content : space-between ;
     width: 100%;
  }
  @media (max-width:600px) {
    .NameWrapper{
    display: flex;
    align-items:center;
    justify-content :center;
    flex-direction: column;
    text-align: center;
  }
  .medal{
    display: none;
  }
  .name{
    width: 100%;
  }
  }
@media (max-width: 300px) {
  .medal{
    display: none;
  }
  .NameWrapper{
    width: 30%;
    display: flex;
    align-items:center;
    justify-content : start;
    flex-direction: column;
    text-align: center;
  }
   .position {
      /* font-size: 1.2rem; */
      /* margin-right: 1rem; */
      display: none;
    }
    .image {
      /* margin-right: 2rem; */
      width: 30%;
      border-radius: 20%;
    }
    /* .medal {
      width: 80px;
      height: 80px;
    } */
}
`;
