export const emptyValidate = (value) => {
  return !value ? "The value is empty" : null;
};

export const emailValidate = (value) => {
  const empty = emptyValidate(value);
  if (!empty) {
    return /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/.test(value)
      ? null
      : "Invalid Email";
  }

  return empty;
};

export const passwordValidate = (value) => {
  const empty = emptyValidate(value);
  if (!empty) {
    return value.length < 6 ? "Includes at least 6 characters" : null;
  }
  return empty;
};

export const passwordCheckValidate = (value, values) => {
  const empty = emptyValidate(value);
  if (!empty) {
    return value !== values.password ? "Passwords did not match" : null;
  }
  return empty;
};

export const zipcodeValidate = (value) => {
  const empty = emptyValidate(value);
  if (!empty) {
    return !/^\d{7}$/.test(value) ? "Includes zipcode" : null;
  }
  return empty;
};
