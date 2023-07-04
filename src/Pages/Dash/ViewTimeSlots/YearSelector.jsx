import { useState } from 'react';
import styled from 'styled-components';
import YellowLeft from '../../../assets/images/yellow_left_arrow.png';
import YellowRight from '../../../assets/images/yellow_right_arrow.png';
function YearSelector() {
  // array of years from 2000 to 2040
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  // array of months from january to december
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const handleYearIncrement = () => {
    setActiveYear(activeYear + 1);
  };
  const handleYearDecrement = () => {
    setActiveYear(activeYear - 1);
  };
  return (
    <StyledYearSelector>
      <div className="yearsection">
        <div className="icon-container" onClick={handleYearDecrement}>
          <img src={YellowLeft} />
        </div>
        <div className="year font-roboto">{activeYear}</div>
        <div className="icon-container" onClick={handleYearIncrement}>
          <img src={YellowRight} />
        </div>
      </div>

      <div className="row w-100 justify-content-between">
        {months.map((month, index) => {
          let state = '';
          if (index === 4) {
            state = 'active';
          } else if (index < 4) {
            state = 'available';
          } else {
            state = 'unavailable';
          }
          return (
            <StyledMonth key={month} className={`${state} col-4`}>
              <div className="text-break">{month}</div>
            </StyledMonth>
          );
        })}
      </div>
    </StyledYearSelector>
  );
}

export default YearSelector;

const StyledYearSelector = styled.div`
  padding: 1rem 0rem;
  border: 1px solid #c7c7c7;
  border-radius: 7px;
  .yearsection {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-container {
      cursor: pointer;
      width: 20px;
      height: 20px;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    .year {
      margin: 0 3rem;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
`;

const StyledMonth = styled.div`
  padding: 1rem;
  text-align: center;
  border-radius: 10px;
  max-width: 140px;
  &.active {
    color: #fff;
    background-color: #f19c00;
  }
  &.available {
  }
  &.unavailable {
    color: #0000004d;
  }
`;
