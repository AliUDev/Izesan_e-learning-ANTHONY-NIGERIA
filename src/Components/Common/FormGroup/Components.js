import Select from 'react-select';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
  font-size: 0.8rem;
  &:focus {
    background-color: #fff;
    outline: 0;
  }
  &:hover div {
    border-color: #b8bcb8;
  }
  div {
    border-radius: 0.25rem;
    border-color: #b8bcb8;
    padding: 1px;
  }
`;
