import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormPassword = ({
  placeholder,
  id,
  maxLength,
  isValidate,
  validation,
  disabled,
  defaultValue,
  register
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  return (
    <div style={{ position: 'relative' }}>
      <Form.Control
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        defaultValue={defaultValue}
        maxLength={maxLength}
        {...register(id, isValidate && validation)}
        disabled={disabled}
      />
      {showPassword ? (
        <FaEyeSlash className="password-eye" onClick={handleShowPassword} />
      ) : (
        <FaEye className="password-eye" onClick={handleShowPassword} />
      )}
    </div>
  );
};

export default FormPassword;
