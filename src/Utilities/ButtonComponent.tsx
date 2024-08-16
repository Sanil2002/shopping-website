import React from 'react';

interface ButtonComponentProps {
  value: string;
  cl?: string; // Optional additional class names
  onClick?: () => void; // Optional click handler
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ value, cl = '', onClick }) => {
  return (
    <button
      className={`p-4 m-2 inline-flex items-center justify-center rounded-xl border border-transparent bg-black px-5 py-3 font-medium text-white hover:bg-white hover:text-black ${cl}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default ButtonComponent;
