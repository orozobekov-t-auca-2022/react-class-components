import type { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import type { FormState } from "../ModalForm/types";

export interface RHFFormProps{
  handleRHFFormSubmit: (data: FormState) => void;
  handleRHFSubmit: UseFormHandleSubmit<FormState, FormState>;
  register: UseFormRegister<FormState>;
}