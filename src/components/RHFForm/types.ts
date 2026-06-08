import type {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
  FormState as RHFFormState,
} from 'react-hook-form';
import type { RHFFormData } from '../ModalForm/schema';

export interface RHFFormProps {
  handleRHFFormSubmit: (data: RHFFormData) => void;
  handleRHFSubmit: UseFormHandleSubmit<RHFFormData, RHFFormData>;
  register: UseFormRegister<RHFFormData>;
  watch: UseFormWatch<RHFFormData>;
  formState: RHFFormState<RHFFormData>;
}
