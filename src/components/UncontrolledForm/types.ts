import type { ChangeEvent, FormEvent } from "react";
import type { FormState } from "../ModalForm/types";

export interface UncontrolledFormProps {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: FormState
}