import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
// import Select from 'react-select';
import FormError from '../FormError';
import FormPassword from '../FormPassword';
import FormYesNo from '../FormYesNo';
import {
  CheckBoxInput,
  FileInput,
  RadioInput,
  StyledFormGroup,
  StyledFormLabel
} from '../Reuseables';
import { StyledSelect } from './Components';

export const FormGroup = ({
  id,
  label,
  type,
  fileType,
  labelClassName = '',
  register,
  disabled,
  defaultValue,
  error,
  placeholder,
  options,
  onChange,
  min,
  checked,
  max,
  acceptedFormats,
  isMulti,
  isValidate = true,
  className,
  passwordType,
  readOnly
}) => {
  let validation = { validate: {} };
  let innerComponent;

  switch (type) {
    case 'text':
    case 'email':
    case 'number':
      innerComponent = (
        <FormInput
          id={id}
          type={type}
          placeholder={placeholder}
          register={register}
          isValidate={isValidate}
          validation={validation}
          error={error}
          min={min}
          max={max}
          maxLength={max}
          onKeyPress={(evt) => {
            if (min === 0) {
              if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
                evt.preventDefault();
              }
            }
          }}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            }
            register(id).onChange(e);
          }}
          disabled={disabled}
          defaultValue={defaultValue}
          readOnly={readOnly}
        />
      );
      break;

    case 'password':
      innerComponent = (
        <FormPassword
          placeholder={placeholder}
          register={register}
          id={id}
          maxLength={max}
          passwordType={passwordType}
          isValidate={isValidate}
          validation={validation}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            }
            register(id).onChange(e);
          }}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      );
      break;
    case 'yes-no':
      innerComponent = (
        <FormYesNo
          register={register}
          id={id}
          isValidate={isValidate}
          validation={validation}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            }
            register(id).onChange(e);
          }}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      );
      break;
    case 'textarea':
      innerComponent = (
        <Form.Control
          as={type}
          placeholder={placeholder}
          {...register(id, validation)}
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            }
            register(id).onChange(e);
          }}
          rows={5}
          readOnly={readOnly}
        />
      );
      break;
    case 'file':
      innerComponent = (
        <Fragment>
          {defaultValue && (
            <div>
              {fileType === 'audio' ? (
                <audio controls controlsList="nodownload">
                  <source src={`${defaultValue}`} type="audio/mp3" />
                </audio>
              ) : (
                <Fragment>
                  {typeof defaultValue === 'string' ? (
                    <img
                      onClick={() => window.open(defaultValue, '_blank')}
                      src={defaultValue}
                      className="my-2"
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '3%'
                      }}
                      alt=""
                    />
                  ) : (
                    defaultValue?.map((imgSrc) => (
                      <img
                        onClick={() => window.open(imgSrc, '_blank')}
                        key={imgSrc}
                        src={imgSrc}
                        className="my-2"
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '3%'
                        }}
                        alt=""
                      />
                    ))
                  )}
                </Fragment>
              )}
            </div>
          )}
          <FileInput>
            <Form.Control
              id={id}
              type="file"
              accept={acceptedFormats.reduce((acc, cur) => (acc += cur + ','), '')}
              multiple={isMulti}
              disabled={disabled}
              {...register(id, validation)}
              onChange={(e) => {
                register(id).onChange(e);
                if (onChange) {
                  onChange(e);
                }
              }}
            />
          </FileInput>
        </Fragment>
      );
      break;
    case 'select':
      innerComponent = (
        <Fragment>
          <StyledSelect
            id={id}
            key={defaultValue?.value}
            options={options}
            placeholder={placeholder}
            onChange={(e) => onChange(e)}
            defaultValue={defaultValue}
            isDisabled={disabled}
            isMulti={isMulti}
            readOnly={readOnly}
          />
          <input type="text" {...((register && register(id, validation)) || {})} readOnly hidden />
        </Fragment>
      );
      break;

    case 'radio':
      innerComponent = (
        <RadioInput>
          {options?.map((option) => (
            <Fragment key={`${option.id}_${defaultValue}`}>
              <Form.Check
                key={option.id}
                id={option.id}
                value={option.value}
                type="radio"
                name={option.name}
                label={option.label}
                {...register(id, isValidate && validation)}
                onChange={(e) => {
                  if (onChange) {
                    onChange(e);
                  }
                  register(id).onChange(e);
                }}
                defaultChecked={defaultValue === option.value}
                readOnly={readOnly}
              />
            </Fragment>
          ))}
        </RadioInput>
      );
      break;
    case 'checkbox':
      // eslint-disable-next-line no-case-declarations
      const rest = {};
      if (checked !== undefined) {
        rest.checked = checked;
      }
      innerComponent = (
        <Fragment>
          <CheckBoxInput className={className}>
            {options?.map((option) => {
              if (defaultValue) {
                rest.defaultChecked = (defaultValue || []).includes(String(option.value));
              }
              return (
                <Form.Check
                  key={option.id}
                  id={option.id}
                  value={option.value}
                  type="checkbox"
                  label={option.label}
                  {...register(id, isValidate && validation)}
                  onChange={(e) => {
                    if (onChange) {
                      onChange(e);
                    }
                    register(id).onChange(e);
                  }}
                  {...rest}
                  disabled={disabled}
                  // defaultChecked={true}
                  // defaultChecked={(defaultValue || []).includes(String(option.value))}
                  readOnly={readOnly}
                />
              );
            })}
          </CheckBoxInput>
        </Fragment>
      );
      break;
    case 'year':
      innerComponent = (
        <Fragment>
          <Form.Control
            type={type}
            placeholder={placeholder}
            {...register(id, isValidate && validation)}
            onChange={onChange}
            disabled={disabled}
            defaultValue={defaultValue}
          />
        </Fragment>
      );
      break;
    case 'color':
      innerComponent = (
        <Fragment>
          <Form.Control
            type={type}
            placeholder={placeholder}
            {...register(id, isValidate && validation)}
            onChange={onChange}
            disabled={disabled}
            defaultValue={defaultValue}
            readOnly={readOnly}
          />
        </Fragment>
      );
      break;
    default:
      innerComponent = <div>Invalid Component</div>;
  }

  return (
    <StyledFormGroup className={`styledformgroup ${className ? className : ''}`}>
      {label && <FormLabel labelClassName={labelClassName} label={label} />}

      {innerComponent}
      {error && <FormError error={error[id]} />}
    </StyledFormGroup>
  );
};

FormGroup.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fileType: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.number
  ]),
  error: PropTypes.object,
  options: PropTypes.array,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  lessThan: PropTypes.number,
  acceptedFormats: PropTypes.array,
  isMulti: PropTypes.bool,
  isValidate: PropTypes.bool
};

export const FormLabel = ({ labelClassName, label }) => {
  return (
    <StyledFormLabel>
      <span className={`label-text font-manrope ${labelClassName ? labelClassName : ''} `}>
        {label}
      </span>
    </StyledFormLabel>
  );
};

export const FormInput = ({
  type,
  placeholder,
  register,
  id,
  isValidate,
  validation,
  min,
  max,
  onChange,
  onKeyPress,
  disabled,
  defaultValue,
  readOnly,
  className = ''
}) => {
  return (
    <StyledFormInput
      className={`${className}`}
      type={type}
      placeholder={placeholder}
      {...register(id, isValidate && validation)}
      min={min}
      max={max}
      maxLength={max}
      onKeyPress={(e) => {
        if (onKeyPress) {
          onKeyPress(e);
        }
      }}
      onChange={(e) => {
        if (onChange) {
          onChange(e);
        }
      }}
      disabled={disabled}
      defaultValue={defaultValue}
      readOnly={readOnly}
    />
  );
};

const StyledFormInput = styled(Form.Control)`
  border: 1px solid;
  border-color: ${(props) => props.theme.input_border};
  border-radius: 5px;
  font-size: 16px;
  padding: 10px;
  background-color: ${(props) => props.theme.text_input_bg};
  color: ${(props) => props.theme.label};
`;
