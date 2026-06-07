import Modal from "../Modal/Modal";

const ModalForm = ({open, onClose}: {open: boolean, onClose: () => void}) => {
  
  return (
    <Modal open={open} onClose={onClose}>
      <form>
        <input placeholder="Name" />
        
        <button type="submit">Send</button>
      </form>
    </Modal>
  )
}

export default ModalForm;
