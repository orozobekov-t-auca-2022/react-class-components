export interface FormState {
  name: string;
  age: number;
  gender: string;
  email: string;
  acceptedTerms: boolean;
  image: string | null;
  password: string;
  confirmPassword: string;
  country: string;
}

export type FormMode = 'uncontrolled' | 'rhf';
