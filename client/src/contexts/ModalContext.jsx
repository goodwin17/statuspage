import { createContext, useState } from 'react';

const ModalContext = createContext(null);

function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
export { ModalProvider };
