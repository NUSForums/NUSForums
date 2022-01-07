import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
  isSubmitButton?: Boolean;
}

const Button = ({ onClick, text, isSubmitButton }: ButtonProps) => {
  const t = isSubmitButton;
  return (
    <div
      onClick={onClick}
      className={`px-5 py-2 rounded-2xl mx-2 my-5 cursor-pointer ${t ? 'bg' : 'text'}-forum-createPost ${
        t ? 'text' : 'bg'
      }-white shadow-md`}
    >
      {text}
    </div>
  );
};

export default Button;
