import * as ReactModal from "react-modal";
import { RiCloseLine } from "react-icons/ri";

type ModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  toggleModal,
  children,
}) => {
  return (
    <ReactModal.default
      isOpen={isOpen}
      onRequestClose={toggleModal}
      className="react-modal"
      overlayClassName="react-modal-overlay"
      ariaHideApp={false}
      preventScroll={false}
    >
      {children}

      <button className="close-modal-button" onClick={toggleModal}>
        <RiCloseLine />
      </button>
    </ReactModal.default>
  );
};
