import React, { SelectHTMLAttributes } from "react";

import "./styles.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  placeholder: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({
  name,
  placeholder,
  options,
  ...rest
}: SelectProps) => {
  return (
    <div className="select-block">
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
