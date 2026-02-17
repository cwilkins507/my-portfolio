import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import ContactForm from './ContactForm';

const ContactModal = ({ isOpen, onClose, initialService, email }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Handle click outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Focus management and focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button when modal opens
    closeButtonRef.current?.focus();

    const modalElement = modalRef.current;
    if (!modalElement) return;

    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    modalElement.addEventListener('keydown', handleTab);
    return () => modalElement.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-[var(--color-surface)] border border-[var(--color-border)] w-full sm:max-w-2xl h-full sm:h-auto max-h-screen sm:max-h-[90vh] rounded-t-2xl sm:rounded-2xl overflow-y-auto shadow-2xl transform transition-all duration-200 animate-in fade-in zoom-in-95"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] rounded-lg transition z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-8 pb-6">
          <h2 id="modal-title" className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
            Get in Touch
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Let's discuss how I can help with your project
          </p>
        </div>

        {/* Form Content */}
        <div className="px-8 pb-8">
          <ContactForm
            email={email}
            initialService={initialService}
            onSuccess={() => {
              // Optionally auto-close after success
              // setTimeout(() => onClose(), 2000);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
