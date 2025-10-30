import React, { FC } from "react";

interface InputViewProps {
  name: string;
  placeholder: string;
  clickHandle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputView: FC<InputViewProps> = ({ name, placeholder, clickHandle }) => {
  return (
    <div className="mb-4 text-start">
      <label
        htmlFor={name}
        className="text-base mb-2 block text-gray-200 font-semibold"
      >
        {name}
      </label>
      <input
        type="text"
        id={name}
        onChange={clickHandle}
        placeholder={placeholder}
        className="border border-gray-600 block w-full rounded-lg bg-transparent py-2 px-3 text-white placeholder-gray-400 focus:border-green-400 focus:ring-0 transition"
      />
    </div>
  );
};

export default InputView;