import { useState } from 'react';
import styled from 'styled-components';

const FormYesNo = ({ id, isValidate, validation, disabled, defaultValue, register }) => {
  const [value, setValue] = useState(defaultValue || '');
  const handleYesValue = () => setValue('Yes');
  const handleNoValue = () => setValue('No');
  return (
    <div style={{ position: 'relative' }}>
      <StyledButton
        className="font-roboto margin-right"
        variant="primary"
        onClick={handleYesValue}
        disabled={disabled}
        value={value}
        button="Yes">
        Yes
      </StyledButton>
      <StyledButton
        className="font-roboto"
        variant="secondary"
        onClick={handleNoValue}
        disabled={disabled}
        value={value}
        button="No">
        No
      </StyledButton>
      <input
        id={id}
        {...register(id, isValidate && validation)}
        type="text"
        hidden
        readOnly
        value={value}
      />
    </div>
  );
};

export default FormYesNo;

const StyledButton = styled.button`
  cursor: pointer;
  font-size: 14px;
  width: 143px;
  height: 39px;
  text-align: center;
  color: white;
  border: 1px solid #e8e8e8;
  border-radius: 22px;
  background-color: ${(props) =>
    props.variant === 'primary' ? props.theme.primary : props.theme.secondary};

  opacity: ${(props) => (props.value ? (props.value === props.button ? '1' : '0.5') : '1')};

  transition: transform 200ms, opacity 200ms;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }

  &.margin-right {
    margin-right: 40px;
  }
  @media (min-width: 576px) {
    &.margin-right {
      margin-right: 82px;
    }
  }
`;
