import { type SubmitEvent, type ChangeEvent } from 'react';

export interface ISearchProps {
  value: string;
  onSubmit: (e: SubmitEvent<Element>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
