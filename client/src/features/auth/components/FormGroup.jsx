import React, { useState } from 'react'
import '../styles/_form-group.scss'
import { Eye, EyeOff } from 'lucide-react'

const FormGroup = ({ label, id, placeholder, type, value, onChange, name, hasError }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`form-group${hasError ? ' error' : ''}`}>
      <input
        value={value}
        onChange={onChange}
        name={name || id}
        className={`form-input ${isPassword ? 'has-icon' : ''}`}
        type={inputType}
        id={id}
        placeholder={placeholder || " "} />
      <label className='form-label' htmlFor={id}>{label}</label>
      
      {isPassword && (
        <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  )
}

export default FormGroup