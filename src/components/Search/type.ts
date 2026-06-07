import { type ChangeEvent, type FormEvent } from 'react';

export interface ISearchProps {
  value: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}