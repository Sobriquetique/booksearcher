import { FunctionComponent } from "react";

interface Props_AsyncButton {
  isLoading: boolean;
  error: boolean;
  className?: string;
  iconClass: {
    loading: string;
    idle: string;
  },
  text?: {
    idle: string;
    loading?: string;
    error?: string;
  },
  onClick: () => void;
}

export const AsyncButton: FunctionComponent<Props_AsyncButton> = ({isLoading, error, className, iconClass, text, onClick}: Props_AsyncButton) => {
  
  const currentIconClass = isLoading ? iconClass.loading : iconClass.idle;
  let currentText: string | undefined = undefined;
  if (text) {
    if (error && text.error) {
      currentText = text.error;
    }
    else if (isLoading && text.loading) {
      currentText = text.loading;
    }
    else {
      currentText = text.idle;
    }
  }

  const actualOnClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isLoading) return;
    onClick()
  }

  return (
    <button
      className={className}
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