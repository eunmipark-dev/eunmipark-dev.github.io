import { useEffect, useState } from 'react';

const useOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return {
    isOpen,
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
    change() {
      setIsOpen(!isOpen);
    },
  };
};

export default useOverlay;
