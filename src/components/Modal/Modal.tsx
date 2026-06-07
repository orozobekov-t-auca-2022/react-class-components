import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import type { ModalProps } from "./type";
import { useEffect, useRef } from "react";

const Modal = ({children, onClose, open}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousActive = document.activeElement as HTMLElement;

    const focus = ref.current?.querySelectorAll<HTMLDivElement>(
      'button, input, textarea, select, a[href]'
    );

    focus?.[0]?.focus();

    return () => {
      previousActive?.focus();
    }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if(e.key === "Escape") {
        onClose();
      }
    }
    
    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose])

  if(!open) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onMouseDown={onClose}
      >
      <div
        className={styles.modal}
        ref={ref}
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
        >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  )
}

export default Modal;
