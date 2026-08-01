export const ValidationConstants = {
  NAME_REGEX: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MOBILE_REGEX: /^07\d{8}$/,
  AGE_REGEX: /^\d{1,2}$/,
  PASSWORD_REGEX : /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/
};
