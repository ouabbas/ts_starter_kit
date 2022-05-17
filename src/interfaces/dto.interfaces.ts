export interface CustomValidationSuccess {
  success: true;
  value: object;
}

export interface CustomValidationError {
  success: false;
  message: string;
  errors: any;
}
