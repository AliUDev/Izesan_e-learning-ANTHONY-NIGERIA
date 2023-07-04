import { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import styled from 'styled-components';
import { countriesLabels, countriesNames } from './CountrySelect/customLabel';
function CountrySelect() {
  const [selected, setSelected] = useState('US');

  return (
    <StyledCountrySelect>
      <ReactFlagsSelect
        className="select-flag"
        selected={selected}
        onSelect={(code) => setSelected(code)}
        customLabels={countriesLabels}
      />

      <input
        className="select-input"
        id="country"
        value={countriesNames[selected]}
        placeholder="Select country"
      />
    </StyledCountrySelect>
  );
}

export default CountrySelect;

const StyledCountrySelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid;
  border-color: #cecece;
  border-radius: 5px;
  color: #1e2843;
  margin-bottom: 14px;
  background-color: #f6f6f8;

  .select-flag {
    min-width: 115px;
    padding: 0;
    button {
      background-color: transparent;
      border: 0;
      &::after {
        border-top: 10px solid #f19c00;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 0;
      }
    }
  }
  .select-input {
    flex: 1;
    background-color: transparent;
    border: 0;
    outline: 0;
    padding-left: 4rem;
  }
`;
