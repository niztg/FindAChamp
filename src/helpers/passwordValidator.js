//*! passwordValidator.js v1.0 June 1 2023

// verifies that password is input
export function passwordValidator(password) {
  if (!password) return "Password can't be empty."
  // password at least 6 char
  if (password.length < 6) return 'Password must be at least 6 characters long.'
  return ''
}
