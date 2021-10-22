import { useEffect, useRef } from 'react';

interface Props {
  onOutsideClick: () => void;
}

const useOutsideEvent = ({ onOutsideClick }: Props) => {
  const modalRef = useRef(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (!modalRef.current?.contains(e.target)) {
      onOutsideClick();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const close = (e: KeyboardEvent) => {
    if (e.key === 'Ese' || e.key === 'Escape') {
      onOutsideClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', close);
    return () => {
      window.addEventListener('keydown', close);
    };
  }, []);

  return { modalRef };
};

export default useOutsideEvent;
