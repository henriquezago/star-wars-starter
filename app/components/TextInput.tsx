"use client";

import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";
import styles from "./TextInput.module.scss";

interface TextInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  fullWidth?: boolean;
  testId?: string;
}

export default function TextInput({
  value,
  onChange,
  placeholder,
  className,
  fullWidth,
  testId,
}: TextInputProps) {
  const [inputValue, setInputValue] = useState<string>(value);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange(e);
    },
    [onChange]
  );

  const inputClasses = [
    styles.textInput,
    className,
    fullWidth && styles.fullWidth,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <input
      className={inputClasses}
      data-testid={testId}
      type="text"
      value={inputValue}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
