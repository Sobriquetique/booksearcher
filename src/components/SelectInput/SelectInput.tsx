import { useEffect, useRef, useState } from "react";
import { CategoryName } from "src/types/Category";
import { OrderByName } from "src/types/OrderByName";
import STYLES from "./SelectInput.module.scss";

type SelectOptionName = CategoryName | OrderByName;

export interface SelectOption<T extends SelectOptionName> {
  /** Для кастомных шрифтов с fontello из иконок fontawesome */
  iconClass: string;
  value: T;
}

interface Props_SelectInput<T extends SelectOptionName> {
  options: SelectOption<T>[];
  labelText: string;
  value: T;
  setValue: (value: T) => void;
}

function getOptionsWrapperClassName(isMenuShown: boolean): string {
  return STYLES.optionsWrapper + (isMenuShown ? " " + STYLES.optionsShown : "");
}


export function SelectInput<T extends SelectOptionName>({options, labelText, value, setValue}: Props_SelectInput<T>): JSX.Element {
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);
  const [iconClassName, setIconClassName] = useState<string>(options[0].iconClass);

  const pseudoSelectWrapperRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const pseudoSelectWrapper = pseudoSelectWrapperRef.current;
    if (!pseudoSelectWrapper) return;

    const mouseOverOptionsWrapper = () => {
      setIsMenuShown(true);
  
      const handleMouseOut = (event: MouseEvent) => {
        const related = event.relatedTarget as HTMLElement;
        //Если курсор перешел неизвестно куда или на сам враппер - грохаем
        if (!related || related.isEqualNode(pseudoSelectWrapper)) return;

        //Смотрим, чтобы меню оставалось показанным, если курсор "вышел" из враппера в его чилдов
        let target: HTMLElement | null = related;
        let parent = related.parentElement;
        while (parent !== null) {
          if (target && target.hasAttribute("data-options-index")) {
            const optionIndexValue = target.getAttribute("data-options-index");
            if (optionIndexValue) {
              const optionIndex = parseInt(optionIndexValue);
              setValue(options[optionIndex].value);
              setIconClassName(options[optionIndex].iconClass);
            }
            
          }
          if (parent.isEqualNode(pseudoSelectWrapper)) return;
          parent = parent.parentElement;
          target = parent;
        }

        //скрываем контент, если дропдаун ушел куда-то, кроме самого враппера
        setIsMenuShown(false);
        pseudoSelectWrapper.removeEventListener("mouseout", handleMouseOut);
      };

      pseudoSelectWrapper.addEventListener("mouseout", handleMouseOut);
    }
    const focusOutHandler = (event: FocusEvent) => {
      const related = event.relatedTarget as HTMLElement;
      console.log("related: ", related);
      if (!related) {
        setIsMenuShown(false);
        return;
      }

      let target: HTMLElement | null = related;
      let parent: HTMLElement | null = related.parentElement;
      while (parent !== null) {
        if (target && target.hasAttribute("data-options-index")) {
          const optionIndexValue = target.getAttribute("data-options-index");
          if (optionIndexValue) {
            const optionIndex = parseInt(optionIndexValue);
            setValue(options[optionIndex].value);
            setIconClassName(options[optionIndex].iconClass);
          }
          
        }
        if (parent.isEqualNode(pseudoSelectWrapper)) {
          console.log("equal");
          return;
        }
        parent = parent.parentElement;
      }

      setIsMenuShown(false);
    }

    pseudoSelectWrapper.addEventListener("mouseenter", mouseOverOptionsWrapper);
    pseudoSelectWrapper.addEventListener("focusout", focusOutHandler);

    return () => {
      pseudoSelectWrapper.removeEventListener("mouseenter", mouseOverOptionsWrapper);
      pseudoSelectWrapper.removeEventListener("focusout", focusOutHandler);
    };
  }, [options, setValue]);

  const onOptionClick = (value: T) => (event: React.MouseEvent) => {
    event.preventDefault();
    setValue(value);
    setIsMenuShown(false); 
  };

  return (
    <div className={STYLES.wrapper}>
      <label 
        className={STYLES.labelElem}
      >
        {labelText}
      </label>

      <button 
        className={STYLES.pseudoSelectWrapper}
        ref={pseudoSelectWrapperRef}
      >
        <div className={STYLES.pseudoSelect}>
          <i className={iconClassName} />
          <span>{value}</span>
          <i className={`icon-down-open ${STYLES.triangle}`} />
        </div>
        <div
          className={getOptionsWrapperClassName(isMenuShown)}
        >
          {
            options.map(({iconClass, value}: SelectOption<T>, i: number) => {
              return (
                <a
                  data-options-index={i}
                  href="/"
                  key={i}
                  className={STYLES.optionContainer}
                  onClick={onOptionClick(value)}
                >
                  <i
                    className={`${iconClass} ${STYLES.optionIcon}`}
                  />
                  <span 
                    className={STYLES.optionText}
                  >{value}</span>
                </a>
              );
            })
          }
        </div>
      </button>
    </div>
  );
}