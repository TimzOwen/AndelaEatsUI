const inputValidation = (formFields) => {
  const errors = {};
  Object.entries(formFields).forEach(([key, value]) => {
    if (value.toString().trim() === "" 
    && key !== 'errors' && key !== 'id') {
      errors[key] = '*required';
    }
    // eslint-disable-next-line no-useless-escape
    if (key === 'tel' && /[^0-9\+]/.test(value)) {
      errors[key] = 'Phone number should contain numbers only';
    }
  });

  return {
    isEmpty: Object.keys(errors).length === 0,
    errors 
  };
};

export default inputValidation;
