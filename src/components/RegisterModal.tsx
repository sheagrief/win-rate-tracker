import React, { useState } from 'react';

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (role: string, isWin: boolean) => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onRegister }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [isWin, setIsWin] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onRegister(selectedRole, isWin);
    setSelectedRole('');
    setIsWin(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-4/5">
        <h2 className="text-xl font-bold mb-4">戦績を登録</h2>

        <label className="block mb-2">
          <span className="text-gray-700">役職</span>
          <select
            className="mt-1 block w-full border-gray-300 rounded"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">選択してください</option>
            <option value="村人">村人</option>
            <option value="占い師">占い師</option>
            <option value="霊能者">霊能者</option>
            <option value="狩人">狩人</option>
            <option value="人狼">人狼</option>
            <option value="狂人">狂人</option>
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">結果</span>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="result"
                value="win"
                checked={isWin}
                onChange={() => setIsWin(true)}
                className="form-radio"
              />
              <span className="ml-2">勝利</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="result"
                value="lose"
                checked={!isWin}
                onChange={() => setIsWin(false)}
                className="form-radio"
              />
              <span className="ml-2">敗北</span>
            </label>
          </div>
        </label>
        

        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            onClick={onClose}
          >
            キャンセル
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={!selectedRole}
          >
            登録
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
