import { type } from "os";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  className,
  disabled,
  onClick,
  fullWidth,
  type,
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    className,
    fullWidth && styles.fullWidth,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
