import React, {
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
  type ChangeEvent, type CSSProperties,
} from "react";
import { Form, Input } from "antd";
import type { InputProps } from "antd";
import type { RuleObject } from "antd/es/form";

export interface DigitsInputFieldProps extends Omit<InputProps, "suffix"> {
  /** Form.Item `name` prop */
  name: string;
  /** Form.Item `label` prop */
  label?: React.ReactNode;
  /** Minimum length of the input */
  minLength?: number;
  /** Maximum length of the input (InputProps already includes this) */
  maxLength?: number;
  /** Whether the field is required */
  required?: boolean;
  /** CSS class for the Form.Item wrapper */
  className?: string;
  /** CSS class for the Input element */
  inputClassName?: string;
  style?: CSSProperties;
  /** Disable the input */
  disabled?: boolean;
  /** Suffix element to display in the input */
  suffix?: React.ReactNode;
}

export const DigitsInputField: React.FC<DigitsInputFieldProps> = ({
  name,
  label,
  minLength,
  maxLength,
  required = false,
  className,
  inputClassName,
  disabled = false,
  suffix = null,
  style,
  ...rest
}) => {
  const [value, setValue] = useState<string>("");

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("Text").trim();
    if (/^\d+$/.test(pasteData)) {
      setValue(pasteData);
    } else {
      e.preventDefault(); // Block invalid paste
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target.value;
    if (/^\d*$/.test(inputData)) {
      setValue(inputData);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];
    const isCtrlV = e.ctrlKey && e.key.toLowerCase() === "v";
    const isCtrlC = e.ctrlKey && e.key.toLowerCase() === "c";
    const isCtrlX = e.ctrlKey && e.key.toLowerCase() === "x";

    if (
      !/^\d$/.test(e.key) &&
      !allowedKeys.includes(e.key) &&
      !isCtrlV &&
      !isCtrlC &&
      !isCtrlX
    ) {
      e.preventDefault();
    }
  };

  const rules = [
    ...(required ? [{ required: true, message: "Обязательное поле" }] : []),
    { pattern: /^\d+$/, message: "Допустимы только цифры" },
    ...(minLength
      ? [
          {
            validator: (_: RuleObject, val: string) => {
              if (!val || val.length >= minLength) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(`Минимальная длина значения ${minLength}`),
              );
            },
          },
        ]
      : []),
  ];

  return (
    <Form.Item
      name={name}
      label={label}
      required={required}
      rules={rules}
      className={className}
      style={style}
    >
      <Input
        value={value}
        maxLength={maxLength}
        onPaste={handlePaste}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={inputClassName}
        suffix={suffix}
        {...rest}
      />
    </Form.Item>
  );
};
