import React, { InputHTMLAttributes } from "react";
import { BsSearch } from "react-icons/bs";

import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }: InputProps) => {
  return (
    <div className="input-block">
      <input type="text" id={name} {...rest} />
      <span style={{ position: "absolute", top: 25, right: 20 }}>
        <BsSearch size={20} />
      </span>
    </div>
  );
};

export default Input;
