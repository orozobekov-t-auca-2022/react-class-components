export const getPasswordStrength = (password: string) => ({
  hasNumber: /\d/.test(password),
  hasUppercase: /[A-Z]/.test(password),
  hasLowercase: /[a-z]/.test(password),
  hasSpecial: /[^A-Za-z0-9]/.test(password),
});
