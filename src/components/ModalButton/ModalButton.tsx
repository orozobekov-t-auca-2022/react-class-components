import Button from "../common/Button/Button";

const ModalButton = ({setOpen}: {setOpen: () => void}) => {
  return (
    <Button onClick={() => setOpen()}>Add pokemon</Button>
  ) 
}

export default ModalButton;
