import React, { useState } from 'react';
import { Data } from '../types/type';
import { deepCopy } from '../utils/deepCopy';

type BulkEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  roles: Data[];
  onSave: (updatedRoles: Data[]) => void;
};

const BulkEditModal: React.FC<BulkEditModalProps> = ({ isOpen, onClose, roles, onSave }) => {
  const [updatedRoles, setUpdatedRoles] = useState<Data[]>(deepCopy(roles)); // deep copy

  const handleRoleChange = (roleId: number, field: 'wins' | 'losses', value: number) => {
    setUpdatedRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId ? { ...role, [field]: value } : role
      )
    );
  };

  const handleCancel = () => {
    setUpdatedRoles(deepCopy(roles)); // キャンセル時に元の状態に戻す
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-4/5">
        <h2 className="text-xl font-bold mb-4">戦績を一括編集</h2>
        <div>
          {updatedRoles.map((role) => (
            <div key={role.id} className="mb-2">
              <p className="font-bold">{role.role}</p>
              <div className="flex">
                <input
                  type="number"
                  className="w-16 border rounded px-2"
                  value={role.wins}
                  onChange={(e) =>
                    handleRoleChange(role.id, 'wins', parseInt(e.target.value, 10) || 0)
                  }
                />
                <span>勝</span>
                <input
                  type="number"
                  className="w-16 ml-2 border rounded px-2"
                  value={role.losses}
                  onChange={(e) =>
                    handleRoleChange(role.id, 'losses', parseInt(e.target.value, 10) || 0)
                  }
                />
                <span>負</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            onClick={handleCancel} // handleCancel 関数を呼び出す
          >
            キャンセル
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => onSave(updatedRoles)}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkEditModal;