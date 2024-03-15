import { ChangeEvent } from "react";

interface LabelledInputType {
  label: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

export const LabelledInput = ({
  label,
  placeholder,
  onchange,
  type,
}: LabelledInputType) => {
  return (
    <div className='flex flex-col mt-4'>
      <label htmlFor={label} className='font-semibold '>
        {label}
      </label>
      <input
        type={type}
        name={label}
        placeholder={placeholder}
        className='p-2 mt-2 rounded border border-1 border-slate-300 outline-none'
        onChange={onchange}
      />
    </div>
  );
};
