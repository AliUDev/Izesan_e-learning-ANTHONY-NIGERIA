import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SideMenuLessonBar({ name, imgSrc, id }) {
  return (
    <Link to={`lessonDetail/${id}`} className="userBarLink" style={{ textDecoration: 'none' }}>
      <StyledSideMenuLessonBar className="d-flex">
        <div
          className="d-flex align-items-center rounded p-1 leason"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={name}>
          <div className="imgContainer">
            <img src={imgSrc} alt={name} />
          </div>
          <div className="lessonName ms-3 fw-bold text-truncate" style={{ maxWidth: '110px' }}>
            {name}
          </div>
        </div>
      </StyledSideMenuLessonBar>
    </Link>
  );
}

export default SideMenuLessonBar;

const StyledSideMenuLessonBar = styled.div`
  .leason {
    transition-duration: 150ms;
  }
  .leason:hover {
    background-color: ${(props) => props.theme.secondary};
    color: white !important;
    box-shadow: 1px 2px 2px #cbcbcb;
    transform: scale(1.01);
    transition-duration: 150ms;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 1rem 0;
  cursor: pointer;
  .imgContainer {
    width: 100px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .lessonName {
    white-space: nowrap;
    color: ${(props) => props.theme.text_dark};
  }

  svg {
    font-size: 28px;
    color: ${(props) => props.theme.secondary};
  }
`;
