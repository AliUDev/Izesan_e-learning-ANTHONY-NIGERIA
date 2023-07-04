import styled from 'styled-components';
import ProfileIcon from '../../../assets/images/Profile-Icon.png';
import RatingIcon from '../../../assets/images/rating.png';
import { img } from '../../../url';

function TeacherCard({ isActive, handleActiveTeacher, currentIndex, teacherDetails }) {
  return (
    <StyledTeacherCard
      isActive={isActive}
      className="item-card"
      onClick={() => handleActiveTeacher(teacherDetails, currentIndex)}>
      <div className="item-image">
        <img
          className="profile-img"
          src={`${teacherDetails.dp && img + teacherDetails.dp || ProfileIcon}`}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="item-detail">
        <div className="item-name">{teacherDetails.name}</div>

        <div className="item-lesson-data">
          <div className="item-rate">
            <div className="item-rating">{teacherDetails.tutor_rating}</div>
            <img className="rate-icon" src={RatingIcon} />
            <div className="item-rate-count">({teacherDetails.tutor_rating})</div>
          </div>
          <div className="item-lessons font-manrope">{teacherDetails.compl_lessons} Lessons</div>
        </div>
        <div className="item-teaches font-manrope">
          <span>Teaches {teacherDetails.lang_to_teach}</span>
        </div>
      </div>
    </StyledTeacherCard>
  );
}

export default TeacherCard;

const StyledTeacherCard = styled.div`
text-transform: capitalized !important;
  cursor: ${(props) => (props.isActive ? 'default' : 'pointer')};
  /* width: 300px; */
  width: ${(props) => (props.isActive ? '350px' : '258px')};
  height: ${(props) => (props.isActive ? '115px' : '91px')};
  transition: transform 300ms;
  border-radius: 15px;
  display: flex;
  background: #ffffff;
  border: 1px solid;
  align-items: center;
  margin-right: 30px;
  flex: 1 1 auto;
  cursor: pointer;
  box-shadow: 0px 3px 6px #00000029;
  border-color: ${(props) => (props.isActive ? '#F19C00' : '#c7c7c7')};
  .profile-img {
    border-radius: 15px;
    width: ${(props) => (props.isActive ? '112px' : '91px')};
    height: ${(props) => (props.isActive ? '112px' : '91px')};
  }
  .item-detail {
    width: 160px;
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    flex: 1;
    margin: 0.9rem 0 0.9rem 1rem;

    .item-name {
      font-family: 'Roboto', sans-serif;
      font-size: ${(props) => (props.isActive ? '1.0rem' : '0.6rem')};
      font-weight: 600;
      color: #000000;
      margin-bottom: 0.5rem;
    }
    .item-lesson-data {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    .item-rate {
      display: flex;
      align-items: center;
      margin-right: 0.5rem;
    }
    .rate-icon {
      width: ${(props) => (props.isActive ? 'auto' : '10px')};
      height: ${(props) => (props.isActive ? 'auto' : '9px')};
    }
    .item-rate-count {
      color: #c7c7c7;
      font-size: ${(props) => (props.isActive ? 'auto' : '10px')};
    }
    .item-lessons {
      font-size: ${(props) => (props.isActive ? '0.8rem' : '0.6rem')};
      font-weight: 600;
    }
    .item-teaches {
      color: #8f8f8f;
      font-size: ${(props) => (props.isActive ? 'auto' : '0.6rem')};
    }
  }
  .item-rating {
    color: #f19c00;
    font-size: ${(props) => (props.isActive ? 'auto' : '10px')};
  }
  @media (max-width:576px) {
    width: ${(props) => (props.isActive ? '220px' : '240px')};
    height: ${(props) => (props.isActive ? '100px' : '91px')};
    margin-right: 10px;
    .profile-img {
    border-radius: 15px;
    width: ${(props) => (props.isActive ? '100px' : '91px')};
    height: ${(props) => (props.isActive ? '100px' : '91px')};
  }
    .item-detail {
    width: ${(props) => (props.isActive ? '100px' : '160px')};
    height:${(props) => (props.isActive ? '120px' : '100px')} ;
    margin-left: ${(props) => (props.isActive ? '0' : '2rem')};
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    flex: 1;
    margin: 0.9rem 0 0.9rem 1rem;

    .item-name {
      font-family: 'Roboto', sans-serif;
      font-size: ${(props) => (props.isActive ? '1.0rem' : '0.6rem')};
      font-weight: 600;
      color: #000000;
      margin-bottom: 0.5rem;
    }
    .item-lesson-data {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    .item-rate {
      display: flex;
      align-items: center;
      margin-right: 0.5rem;
    }
    .rate-icon {
      width: ${(props) => (props.isActive ? 'auto' : '10px')};
      height: ${(props) => (props.isActive ? 'auto' : '9px')};
    }
    .item-rate-count {
      color: #c7c7c7;
      font-size: ${(props) => (props.isActive ? 'auto' : '10px')};
    }
    .item-lessons {
      font-size: ${(props) => (props.isActive ? '0.6rem' : '0.6rem')};
      font-weight: 600;
    }
    .item-teaches {
      color: #8f8f8f;
      font-size: ${(props) => (props.isActive ? '0.6rem' : '0.6rem')};
    }
  }
  }
`;
