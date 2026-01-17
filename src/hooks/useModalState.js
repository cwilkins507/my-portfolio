import { useState, useEffect } from 'react';

const useModalState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    // Check URL parameters on mount and when URL changes
    const checkURLParams = () => {
      const params = new URLSearchParams(window.location.search);
      const modalParam = params.get('modal');
      const serviceParam = params.get('service');

      if (modalParam === 'contact') {
        setIsOpen(true);
        setSelectedService(serviceParam || '');
      } else {
        setIsOpen(false);
        setSelectedService('');
      }
    };

    // Check on mount
    checkURLParams();

    // Listen for custom events (for programmatic opening)
    const handleOpenModal = (event) => {
      const service = event.detail?.service || '';
      openModal(service);
    };

    window.addEventListener('openContactModal', handleOpenModal);

    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', checkURLParams);

    return () => {
      window.removeEventListener('openContactModal', handleOpenModal);
      window.removeEventListener('popstate', checkURLParams);
    };
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const openModal = (service = '') => {
    const url = new URL(window.location);
    url.searchParams.set('modal', 'contact');
    if (service) {
      url.searchParams.set('service', service);
    }
    window.history.pushState({}, '', url);
    setIsOpen(true);
    setSelectedService(service);
  };

  const closeModal = () => {
    const url = new URL(window.location);
    url.searchParams.delete('modal');
    url.searchParams.delete('service');
    window.history.pushState({}, '', url);
    setIsOpen(false);
    setSelectedService('');
  };

  return {
    isOpen,
    selectedService,
    openModal,
    closeModal,
  };
};

export default useModalState;
