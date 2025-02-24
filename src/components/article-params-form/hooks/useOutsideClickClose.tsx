import { RefObject, useEffect, useRef } from 'react';

// Тип для параметров кастомного хука useOutsideClickClose
type UseOutsideClickClose = {
  isOpen: boolean; // Флаг, указывающий, открыта ли область
  onClose: () => void; // Функция для закрытия области
  rootRef: RefObject<HTMLDivElement>; // Ссылка на корневой элемент области
};
// Кастомный хук для закрытия области при клике вне её пределов
export const useOutsideClickClose = ({
  isOpen,
  onClose,
  rootRef,
}: UseOutsideClickClose) => {
  // Создаем ссылку для отслеживания, был ли клик внутри области
  const isClickInside = useRef(false);
  // Используем useEffect для добавления обработчиков событий
  useEffect(() => {
    // Обработчик клика по документу
    const handleExternalClick = () => {
      if (!isClickInside.current && isOpen) {
        // Если клик был вне области и она открыта, вызываем onClose
        onClose?.();
      } else {
        // Сбрасываем флаг после проверки
        isClickInside.current = false;
      }
    };

    // Проверяем, был ли клик внутри области
    const checkIfClickIsInside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (target && rootRef.current?.contains(target)) {
        // Если клик был внутри, устанавливаем флаг
        isClickInside.current = true;
      }
    };
    // Добавляем обработчики событий
    rootRef.current?.addEventListener('click', checkIfClickIsInside);
    window.addEventListener('click', handleExternalClick);
    // Удаляем обработчики событий при размонтировании компонента
    return () => {
      rootRef.current?.removeEventListener('click', checkIfClickIsInside);
      window.removeEventListener('click', handleExternalClick);
    };
  }, [isOpen, onClose]); // Зависимости для перезапуска эффекта
};