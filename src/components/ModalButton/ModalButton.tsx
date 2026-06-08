import Button from '../common/Button/Button';

const ModalButton = ({ setOpen }: { setOpen: () => void }) => {
  return <Button onClick={() => setOpen()}>Fill out the form</Button>;
};

export default ModalButton;
