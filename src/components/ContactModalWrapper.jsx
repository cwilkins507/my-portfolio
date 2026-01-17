import React from 'react';
import ContactModal from './ContactModal';
import useModalState from '../hooks/useModalState';

const ContactModalWrapper = ({ email }) => {
  const { isOpen, selectedService, closeModal } = useModalState();

  return (
    <ContactModal
      isOpen={isOpen}
      onClose={closeModal}
      initialService={selectedService}
      email={email}
    />
  );
};

export default ContactModalWrapper;
