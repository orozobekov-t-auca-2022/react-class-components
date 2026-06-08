import { useState, type ChangeEvent, type FormEvent } from "react";
import Modal from "../Modal/Modal";
import { type FormMode, type FormState } from "./types";
import Button from "../common/Button/Button";
import styles from "./ModalForm.module.css";
import { useForm } from "react-hook-form";
import UncontrolledForm from "../UncontrolledForm/UncontrolledForm";
import RHFForm from "../RHFForm/RHFForm";

const ModalForm = ({open, onClose}: {open: boolean, onClose: () => void}) => {
  const [formMode, setFormMode] = useState<FormMode>('uncontrolled');

  const [formData, setFormData] = useState<FormState>({
    id: 0,
    name: '',
    email: '',
    gender: null,
    age: null,
    acceptedTerms: false,
  });

  const {register, handleSubmit: handleRHFSubmit, reset} = useForm<FormState>({defaultValues: formData});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setFormData((prev) =>({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }))
  }

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      acceptedTerms: e.target.checked,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  }

  const handleModeChange = (mode: FormMode) => {
    setFormMode(mode);

    if(formMode === 'rhf') {
      reset(formData);
    }
  }

  const handleRHFFormSubmit = (data: FormState) => {
    reset(data);
  }

  const renderUncontrolledForm = () => <UncontrolledForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} handleCheckboxChange={handleCheckboxChange} />

  const renderRHFForm = () => <RHFForm register={register} handleRHFSubmit={handleRHFSubmit} handleRHFFormSubmit={handleRHFFormSubmit} />

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.formSwitcher} role="tablisht" aria-label="Form mode">
        <Button
          type="button"
          className={formMode === "uncontrolled" ? styles.activeModeButton : ""}
          onClick={() => handleModeChange("uncontrolled")}
        >
          Uncontrolled form
        </Button>
        <Button
          type="button"
          className={formMode === "rhf" ? styles.activeModeButton : ""}
          onClick={() => handleModeChange("rhf")}
        >
          RHF form
        </Button>
      </div>
      {
        formMode === "uncontrolled" ? renderUncontrolledForm() : renderRHFForm()
      }
    </Modal>
  )
}

export default ModalForm;
