import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";

import styles from "./TextInput.module.scss";
const {mainWrapper, labelElem, inputWrapper, inputElem, buttonElem, iElem, hasText: hasTextClassName, focused: isFocusedClassName} = styles;
const htmlFor = "search-books";
const labelText = "Search books";

interface Props_TextInput {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
  children?: never;
}

/** Стандартный бойлерплейт для текст инпута с кнопкой прямо на нем */
export const TextInput: FunctionComponent<Props_TextInput> = ({onChange, onButtonClick, value}): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasText, setHasText] = useState<boolean>(false);

  useEffect(() => {
    const input = ref.current;
    if (!input) return;

    const focusinHandler = () => {
      setIsFocused(true);

      input.addEventListener("focusout", () => {
        setIsFocused(false);
      });
    };

    input.addEventListener("focusin", focusinHandler);

    return () => {
      input.removeEventListener("focusin", focusinHandler);
    };
  });

  const onChangeIntercept = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "" && !hasText) {
      setHasText(true);
    }
    else if (event.target.value === "" && hasText) {
      setHasText(false);
    }
    onChange(event);
  };

  const getInputWrapperClassName = (): string => {
    let cname = inputWrapper;
    if (hasText) {
      cname += " " + hasTextClassName;
    }
    if (isFocused) {
      cname += " " + isFocusedClassName;
    }
    return cname;
  };
  
  return (
    <div className={mainWrapper}>
      <label className={labelElem} htmlFor={htmlFor}>{labelText}</label>
      <div className={`${getInputWrapperClassName()}`}>
        <input 
          ref={ref}
          className={inputElem}
          id={htmlFor}
          type="text"
          onChange={onChangeIntercept}
          value={value}
        />
        <button 
          className={`raw-button ${buttonElem}`}
          onClick={onButtonClick}
          tabIndex={undefined}
        >
          <i className={`icon-search ${iElem}`} />
        </button>
      </div>
    </div>
  );
};