import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    openModal,
    toggleModal,
  };
}
