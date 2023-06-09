//*! emailValidator.js v1.0 June 1 2023

// verifies that email format is correct
export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email cannot be empty."
  if (!re.test(email)) return 'invalid email.'
  return ''
}
