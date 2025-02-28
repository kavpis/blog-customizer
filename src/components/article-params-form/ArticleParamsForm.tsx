import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { ArticleStateType, OptionType, backgroundColors, contentWidthArr,
defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions} from 'src/constants/articleProps';
import { ArrowButton } from '../../ui/arrow-button';
import { Text } from '../../ui/text';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { Button } from '../../ui/button';

// Тип пропсов для компонента ArticleParamsForm
type Props = {
  onChange: (state: ArticleStateType) => void;
};
export const ArticleParamsForm = ({ onChange }: Props) => {
  // Состояние для отслеживания открытости формы
  const [isOpen, toggleMenu] = useState(false);
  // Состояние для хранения текущих параметров статьи
  const [currentParams, updateParams] = useState(defaultArticleState);
  // Создаем ссылку на контейнер формы для работы с внешними кликами
  const formContainerRef = useRef<HTMLDivElement>(null);
  // Используем кастомный хук для закрытия формы при клике вне её области
  useOutsideClickClose({
    isOpen,
    onClose: handleToggleMenu, // Обработчик закрытия
    rootRef: formContainerRef, // Ссылка на корневой элемент
  });
  // Функция для переключения состояния открытости формы
  function handleToggleMenu() {
    toggleMenu((prevIsOpen) => !prevIsOpen);
  }
  // Функция для обновления параметров по ключу
  function handleOptionChange(key: string, option: OptionType) {
    updateParams({ ...currentParams, [key]: option });
  }
  // Функция для сброса параметров к значениям по умолчанию
  function handleResetsettings() {
    updateParams(defaultArticleState); // Сбрасываем состояние
    onChange(defaultArticleState); // Вызываем коллбэк с дефолтными параметрами
  }
  // Функция для отправки формы и применения параметров
  function handleApplySettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы
    onChange(currentParams); // Передаем текущие параметры через коллбэк
  }
  // Возвращаем JSX-структуру компонента
  return (
    <div ref={formContainerRef}>
      {/* Кнопка для открытия/закрытия формы */}
      <ArrowButton isOpen={isOpen} onClick={handleToggleMenu} />
      {/* Боковая панель с формой параметров */}
      <aside className={clsx(styles.container, isOpen && styles.container_open)}>
        <form
          className={styles.form}
          onSubmit={handleApplySettings} // Обработчик отправки формы
          onReset={handleResetsettings}> {/* Обработчик сброса формы */}
          {/* Заголовок формы */}
          <Text as='p' size={31} weight={800} uppercase={true}>
		  	Задайте параметры
          </Text>
          {/* Выбор шрифта */}
          <Select
            title='шрифт'
            options={fontFamilyOptions}
            selected={currentParams.fontFamilyOption}
            onChange={(selected) => handleOptionChange('fontFamilyOption', selected)}
          />
          {/* Выбор размера шрифта */}
          <RadioGroup
            title='Размер шрифта'
            options={fontSizeOptions}
            selected={currentParams.fontSizeOption}
            onChange={(selected) => handleOptionChange('fontSizeOption', selected)}
            name='fontSize'
          />
          {/* Выбор цвета шрифта */}
          <Select
            title='Цвет шрифта'
            options={fontColors}
            selected={currentParams.fontColor}
            onChange={(selected) => handleOptionChange('fontColor', selected)}
          />
          {/* Разделитель */}
          <Separator />
          {/* Выбор цвета фона */}
          <Select
            title='Цвет фона'
            options={backgroundColors}
            selected={currentParams.backgroundColor}
            onChange={(selected) => handleOptionChange('backgroundColor', selected)}
          />
          {/* Выбор ширины контента */}
          <Select
            title='Ширина контента'
            options={contentWidthArr}
            selected={currentParams.contentWidth}
            onChange={(selected) => handleOptionChange('contentWidth', selected)}
          />
          {/* Контейнер с кнопками */}
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' type='reset' />
            <Button title='Применить' type='submit' />
          </div>
        </form>
      </aside>
    </div>
  );
};
