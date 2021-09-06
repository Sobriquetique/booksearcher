import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";
import { useBookPreviewsStatus } from "src/features/bookPreviews/bookPreviewsSlice";
import { AsyncButton } from "../AsyncButton";
import STYLES from "./TextInput.module.scss";

const htmlFor = "search-books";
const labelText = "Search books";

interface Props_TextInput {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
  value: string;
  children?: never;
}

/** Стандартный бойлерплейт для текст инпута с кнопкой прямо на нем */
export const TextInput: FunctionComponent<Props_TextInput> = ({onChange, onButtonClick, value}): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasText, setHasText] = useState<boolean>(false);

  const {error, status} = useBookPreviewsStatus();

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
    let cname = STYLES.inputWrapper;
    if (hasText) {
      cname += " " + STYLES.hasText;
    }
    if (isFocused) {
      cname += " " + STYLES.isFocused;
    }
    return cname;
  };
  
  return (
    <div className={STYLES.mainWrapper}>
      <label className={STYLES.labelElem} htmlFor={htmlFor}>{labelText}</label>
      <div className={`${getInputWrapperClassName()}`}>
        <input 
          ref={ref}
          className={STYLES.inputElem}
          id={htmlFor}
          type="text"
          onChange={onChangeIntercept}
          value={value}
        />

        <AsyncButton 
          className={{
            "idle": `${STYLES.buttonElem}`,
            "error": `${STYLES.buttonElem} ${STYLES.error}`,
            "loading": `${STYLES.buttonElem}`,
            "success": `${STYLES.buttonElem} ${STYLES.success}`
          }}
          error={!!error}
          isLoading={status === "loading"}
          iconClass={{
            "idle": `icon-arrows-cw spin`,
            "error": `icon-cw`,
            "loading": `icon-arrows-cw spin`,
            "success": `icon-ok`
          }}
          onClick={onButtonClick}
        />
      </div>
    </div>
  );
};