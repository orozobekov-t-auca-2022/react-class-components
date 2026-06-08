import { useState, type FormEvent } from "react";
import Modal from "../Modal/Modal";
import { type FormMode, type FormState } from "./types";
import Button from "../common/Button/Button";
import styles from "./ModalForm.module.css";
import { useForm } from "react-hook-form";
import UncontrolledForm from "../UncontrolledForm/UncontrolledForm";
import RHFForm from "../RHFForm/RHFForm";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/forms/formsSlice";

const FORMDATA: FormState = {
  id: 0,
  name: '',
  email: '',
  gender: null,
  age: null,
  acceptedTerms: false,
}

const ModalForm = ({open, onClose}: {open: boolean, onClose: () => void}) => {
  const [formMode, setFormMode] = useState<FormMode>('uncontrolled');

  const {register, handleSubmit: handleRHFSubmit, reset} = useForm<FormState>({defaultValues: FORMDATA});

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const user: FormState = {
      id: Date.now(),
      name: data.get("name") as string,
      email: data.get("email") as string,
      gender: (data.get("gender") as FormState["gender"]) || null,
      age: Number(data.get("age")),
      acceptedTerms: data.get("acceptedTerms") !== null,
    } 
    console.log(user);
    dispatch(addUser(user));

    form.reset();
  }

  const handleModeChange = (mode: FormMode) => {
    setFormMode(mode);

    if(mode === 'rhf') {
      reset();
    }
  }

  const handleRHFFormSubmit = (data: FormState) => {
    dispatch(addUser({ ...data, id: Date.now() }));
    reset(FORMDATA);
  }

  const renderUncontrolledForm = () => <UncontrolledForm handleSubmit={handleSubmit} />

  const renderRHFForm = () => <RHFForm register={register} handleRHFSubmit={handleRHFSubmit} handleRHFFormSubmit={handleRHFFormSubmit} />

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.formSwitcher} role="tablist" aria-label="Form mode">
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
