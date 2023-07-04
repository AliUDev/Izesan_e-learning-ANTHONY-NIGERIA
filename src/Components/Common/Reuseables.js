import { Col, Form } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledFormGroup = styled(Form.Group)`
  width: 100%;
  margin-bottom: 30px;
`;
// export const StyleDateInput = styled(Form.Label)`
//   font-size: 1.5rem;
// `;

export const StyledFormLabel = styled(Form.Label)`
  color: ${(props) => props.theme.label};
  margin-bottom: 12px;
  font-size: 14px;
`;

export const FileInput = styled.div`
  border: 2px dashed black;
  border-radius: 10px;
  padding: 0.5rem;
  .form-control {
    border: none;
  }
`;
export const RadioInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  .form-check {
    margin-right: 20px;
  }
`;

export const CheckBoxInput = styled.div`
  padding: 0.5rem;
  width: 100%;
  column-count: 1;
  @media screen and (min-width: 600px) {
    column-count: 2;
  }
  @media screen and (min-width: 1400px) {
    column-count: 3;
  }
  &.no-column {
    column-count: auto;
  }
  &.physicalLocationSetCheckboxs,
  &.provinceLocationSetCheckboxs {
    display: flex;
    flex-direction: column;
    max-height: 300px;
    overflow-y: auto;
    column-count: none;
    border-radius: 5px;
    .form-label {
      margin-bottom: 0;
      margin-top: 0.5rem;
      font-weight: bold;
      font-size: 18px;
      color: #627afa;
    }
  }
  .form-check {
    color: black;
  }
`;

export const StepNav = styled.div`
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  display: inline-flex;
  div {
    color: #007bff;
    padding: 5px;
    border-right: 1px solid #d4d4d4;
  }
  div:last-child {
    border-right: 0;
  }
  .last-step {
    border-right: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .first-step {
    border-right: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;
