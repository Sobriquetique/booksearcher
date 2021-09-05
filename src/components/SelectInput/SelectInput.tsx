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

  const optionsWrapperRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLAnchorElement>>([]);

  const mouseEnterOptionsWrapper = () => setIsMenuShown(true);
  const mouseLeaveOptionsWrapper = () => setIsMenuShown(false);
  useEffect(() => {
    const optionsWrapper = optionsWrapperRef.current;
    const optionElems = optionRefs.current;
    if (!optionsWrapper) return;

    optionsWrapper.addEventListener("mouseenter", mouseEnterOptionsWrapper);
    optionsWrapper.addEventListener("mouseleave", mouseLeaveOptionsWrapper);

    optionElems.forEach((elem: HTMLAnchorElement, i: number) => {
      const mouseEnterOption = () => {
        setValue(options[i].value);
        setIconClassName(options[i].iconClass);
      };
      
      elem.addEventListener("mouseenter", mouseEnterOption);
    });

    return () => {
      optionsWrapper.removeEventListener("mouseenter", mouseEnterOptionsWrapper);
      optionsWrapper.removeEventListener("mouseleave", mouseLeaveOptionsWrapper);
    };
  }, [options, setValue, optionRefs]);

  const onOptionClick = (value: T) => () => {
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
        ref={optionsWrapperRef}
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
                  href="/"
                  key={i}
                  className={STYLES.optionContainer}
                  ref={elem => {
                    if (elem) {
                      optionRefs.current[i] = elem
                    }
                  }}
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