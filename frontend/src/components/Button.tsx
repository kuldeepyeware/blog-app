interface ButtonType {
  onclick: () => void;
  label: string;
}

export const Button = ({ onclick, label }: ButtonType) => {
  return (
    <div
      className='bg-black w-full p-2 mt-6 text-white cursor-pointer rounded-lg text-center'
      onClick={onclick}>
      {label}
    </div>
  );
};
