import React from 'react';

type RegisterButtonProps = {
  onClick: () => void;
};

const RegisterButton: React.FC<RegisterButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      onClick={onClick}
    >
      戦績登録
    </button>
  );
};

export default RegisterButton;
