import type { FormEvent } from "react";

export interface UncontrolledFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}