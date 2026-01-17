/**
 * Form validation utilities
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  if (email.length > 254) return false;
  const [localPart] = email.split('@');
  if (localPart.length > 64) return false;
  return true;
};

export const validatePassword = (password: string, minLength: number = 6): boolean => {
  return password.length >= minLength;
};

export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateSignUpForm = (data: SignUpFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(data.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (!validatePasswordMatch(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export interface SignInFormData {
  email: string;
  password: string;
}

export const validateSignInForm = (data: SignInFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
