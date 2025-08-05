import { useState } from 'react';

const useVisibility = () => {
  const [isVisibility, setIsVisibility] = useState(false);

  return {
    isVisibility,
    show() {
      setIsVisibility(true);
    },
    hide() {
      setIsVisibility(false);
    },
    change() {
      setIsVisibility(!isVisibility);
    },
  };
};

export default useVisibility;
