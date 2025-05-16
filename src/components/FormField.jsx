import { useState } from 'react';

const FormField = ({ label, name, type, value, onChange, error, required, ...rest }) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div>
      <label htmlFor={name} className="label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={`input ${error ? 'border-red-500' : focused ? 'ring-2' : ''}`}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;