const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/
const ONLYNUMERIC_REGEX = /^[0-9]+$/

export { EMAIL_REGEX, PASSWORD_REGEX, ALPHANUMERIC_REGEX, ONLYNUMERIC_REGEX }
