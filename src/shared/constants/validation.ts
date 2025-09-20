export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: (fieldName?: string) =>
    fieldName ? `${fieldName} is required` : 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must not exceed ${max} characters`,
  PASSWORD_MISMATCH: 'Passwords do not match',
  INVALID_NUMBER: 'Please enter a valid number',
  MIN_VALUE: (min: number) => `Must be at least ${min}`,
  MAX_VALUE: (max: number) => `Must not exceed ${max}`,
}
