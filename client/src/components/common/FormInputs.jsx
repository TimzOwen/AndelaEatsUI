import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import Select from 'react-select';

const Input = ({
  id, value, onChangeHandler, options, name, label,
  type, error, clearErrors, isRequired
}) => (
  <div className="form-field-set">
    <label htmlFor={id}>
      {label}
      { type === 'select'
        ? (
          <Select
            value={value}
            onChange={onChangeHandler}
            options={options}
          />
        )
        : null
        }
      { type === 'date-picker'
        ? (
          <DatePicker
            selected={value}
            onChange={onChangeHandler}
            name={name}
          />
        )
        : (
          <input
            id={id}
            className="input"
            name={name}
            onChange={onChangeHandler}
            onFocus={clearErrors}
            value={value}
            type={type}
          />
        )
      }
      <span className="input-validation">{isRequired ? '* Required' : ''}</span>
      <span className="form-error">
        {error || ''}
      </span>
    </label>
  </div>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  options: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isRequired: PropTypes.bool.isRequired,
};

export default Input;
