import { useEffect, useRef } from 'react';

interface Props {
  onOutsideClick: () => void;
}

const useOutsideEvent = <T extends HTMLElement = HTMLElement>({
  onOutsideClick,
}: Props) => {
  const modalRef = useRef<T>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const modal = modalRef.current;

    if (modal != null && !modal.contains(e.target as HTMLElement)) {
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
