// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SelectOptionDownIcon from '../../assets/images/select_option_down_icon.png';
function Select({ hanleDropdownChange }) {
  // const navigate = useNavigate();

  const selectArr = [
    { value: "highest_kobo_earned", name: "Ɗangote’s Daddies" },
    { value: "highest_streaks", name: "Streak Slayers" },
    { value: "longest_time_spending_day", name: "Binge Barbarians" },
    { value: "longest_days_streak_maintained", name: "No Days Off" },
  ]
  return (
    <StyledSelect
      onChange={(e) => {
        hanleDropdownChange(e.target.value);
      }}>
      {
        selectArr.map((data, key) => (
          <option value={data.value}>{data.name}</option>
        ))
      }
    </StyledSelect>
  );
}

export default Select;

const StyledSelect = styled.select`
  background-color: #fff;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  appearance: none;
  /* Some browsers will not display the caret when using calc, so we put the fallback first */
  background: url(${SelectOptionDownIcon}) white no-repeat 98.5% !important; /* !important used for overriding all other customisations */
  background: url(${SelectOptionDownIcon}) white no-repeat calc(100% - 10px) !important; /* Better placement regardless of input width */

  @media (min-width: 576px) {
    width: 80%;
  }
`;
