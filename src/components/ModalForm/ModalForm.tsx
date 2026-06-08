import { useState, type FormEvent } from 'react';
import Modal from '../Modal/Modal';
import { type FormMode } from './types';
import type { RHFFormData } from './schema';
import Button from '../common/Button/Button';
import styles from './ModalForm.module.css';
import { useForm } from 'react-hook-form';
import UncontrolledForm from '../UncontrolledForm/UncontrolledForm';
import RHFForm from '../RHFForm/RHFForm';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/forms/formsSlice';
import { fileToBase64 } from './fileBaseTo64';
import { uncontrolledSchema, rhfSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

const RHF_DEFAULTS: RHFFormData = {
  name: '',
  email: '',
  gender: '',
  age: 0,
  acceptedTerms: false,
  country: '',
  image: undefined,
  password: '',
  confirmPassword: '',
};

const ModalForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [formMode, setFormMode] = useState<FormMode>('uncontrolled');
  const [uncontrolledErrors, setUncontrolledErrors] = useState<
    Record<string, string>
  >({});

  const {
    register,
    handleSubmit: handleRHFSubmit,
    reset,
    watch,
    formState,
  } = useForm<RHFFormData>({
    defaultValues: RHF_DEFAULTS,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(rhfSchema),
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    const form = e.currentTarget;
    const data = new FormData(form);

    const imageFile = data.get('image');
    const image =
      imageFile instanceof File && imageFile.size > 0 ? imageFile : null;

    const rawData = {
      name: data.get('name') as string,
      email: data.get('email') as string,
      gender: data.get('gender') as string,
      age: Number(data.get('age')),
      acceptedTerms: data.get('acceptedTerms') !== null,
      password: data.get('password') as string,
      confirmPassword: data.get('confirmPassword') as string,
      image,
      country: data.get('country') as string,
    };

    const result = uncontrolledSchema.safeParse(rawData);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!errors[field]) errors[field] = issue.message;
      });
      setUncontrolledErrors(errors);
      return;
    }

    setUncontrolledErrors({});
    const imageToBase64 = await fileToBase64(result.data.image);

    dispatch(
      addUser({
        ...result.data,
        id: crypto.randomUUID(),
        image: imageToBase64,
      })
    );

    form.reset();
    onClose();
  };

  const handleRHFFormSubmit = async (data: RHFFormData) => {
    const imageFile = data.image?.[0] ?? null;
    const imageToBase64 = imageFile ? await fileToBase64(imageFile) : null;

    dispatch(
      addUser({
        ...data,
        id: crypto.randomUUID(),
        image: imageToBase64,
      })
    );

    reset(RHF_DEFAULTS);
    onClose();
  };

  const handleModeChange = (mode: FormMode) => {
    setFormMode(mode);
    if (mode === 'rhf') reset();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        className={styles.formSwitcher}
        role="tablist"
        aria-label="Form mode"
      >
        <Button
          type="button"
          className={formMode === 'uncontrolled' ? styles.activeModeButton : ''}
          onClick={() => handleModeChange('uncontrolled')}
        >
          Uncontrolled form
        </Button>
        <Button
          type="button"
          className={formMode === 'rhf' ? styles.activeModeButton : ''}
          onClick={() => handleModeChange('rhf')}
        >
          RHF form
        </Button>
      </div>
      {formMode === 'uncontrolled' ? (
        <UncontrolledForm
          handleSubmit={handleSubmit}
          errors={uncontrolledErrors}
        />
      ) : (
        <RHFForm
          register={register}
          watch={watch}
          handleRHFSubmit={handleRHFSubmit}
          handleRHFFormSubmit={handleRHFFormSubmit}
          formState={formState}
        />
      )}
    </Modal>
  );
};

export default ModalForm;
