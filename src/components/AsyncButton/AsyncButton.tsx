import { FunctionComponent, useEffect, useState } from "react";

interface Props_AsyncButton {
  isLoading: boolean;
  error: boolean;
  className: {
    idle: string;
    success: string;
    loading: string;
    error: string;
  };
  iconClass: {
    idle: string;
    success: string;
    loading: string;
    error: string;
  },
  text?: {
    idle: string;
    success: string;
    loading: string;
    error: string;
  },
  onClick: () => void;
}

export const AsyncButton: FunctionComponent<Props_AsyncButton> = ({isLoading, error, className, iconClass, text, onClick}: Props_AsyncButton) => {
  const [localWasLoading, setLocalWasLoading] = useState<boolean>(false);
  const [isRecentSuccess, setIsRecentSuccess] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      setLocalWasLoading(true);
      if (timeoutId) {
        setTimeoutId(null);
        clearTimeout(timeoutId);
      }
      return;
    }

    if (localWasLoading && !error) {
      setLocalWasLoading(false);
      setIsRecentSuccess(true);
      setTimeoutId(
        setTimeout(() => {
          setIsRecentSuccess(false);
        }, 2000)
      ) 
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    }
  }, [isLoading, error, localWasLoading, timeoutId]);

  let currentText: string | undefined = undefined;
  let currentClass: string;
  let currentIconClass: string;
  
  if (isLoading) {
    currentText = text?.loading;
    currentClass = className.loading;
    currentIconClass = iconClass.loading;
  }
  else if (error) {
    currentText = text?.error;
    currentClass = className.error;
    currentIconClass = iconClass.error;
  }
  else if (isRecentSuccess) {
    currentText = text?.success;
    currentClass = className.success;
    currentIconClass = iconClass.success;
  }
  else {
    currentText = text?.idle;
    currentClass = className.idle;
    currentIconClass = iconClass.idle;
  }

  const actualOnClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isLoading) return;
    onClick()
  }

  return (
    <button
      className={currentClass}
      onClick={actualOnClick}
    >
      <i className={currentIconClass} />
      {
        currentText
          ? <span>{currentText}</span>
          : undefined
      }

    </button>
  )
} 