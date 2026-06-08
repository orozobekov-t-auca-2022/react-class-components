export interface FormState{
  id: number;
  name: string;
  age: number | null;
  gender: 'male' | 'female' | null;
  email: string;
  acceptedTerms: boolean;
}

export type FormMode = 'uncontrolled' | 'rhf';