export interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}
