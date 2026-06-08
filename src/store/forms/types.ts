import type { FormState } from '../../components/ModalForm/types';

export interface FormsHistoryState {
  submissions: NewFormState[];
}

export interface NewFormState extends FormState {
  id: string;
}
