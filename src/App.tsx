import { useEffect, useState } from "react";
import "./App.css";

import RoleTable from "./components/Table";
import {
  loadRolesFromLocalStorage,
  saveRolesToLocalStorage,
} from "./data/data";
import RegisterButton from "./components/RegisterButton";
import RegisterModal from "./components/RegisterModal";
import BulkEditModal from "./components/BulkEditModal";
import { Data } from "./types/type";

function App() {
  const [roles, setRoles] = useState<Data[]>(loadRolesFromLocalStorage());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false);

  const handleSaveRoles = (updatedRoles: Data[]) => {
    setRoles(updatedRoles);
    saveRolesToLocalStorage(updatedRoles); // ローカルストレージに保存
    setIsBulkEditModalOpen(false); // 一括編集モーダルを閉じる
  };

  const handleRegister = (role: string, isWin: boolean) => {
    setRoles((prevRoles) => {
      const existingRole = prevRoles.find((r) => r.role === role);
      if (existingRole) {
        return prevRoles.map((r) =>
          r.role === role
            ? {
                ...r,
                wins: r.wins + (isWin ? 1 : 0),
                losses: r.losses + (isWin ? 0 : 1),
              }
            : r
        );
      }
      return [
        ...prevRoles,
        {
          id: prevRoles.length + 1,
          role,
          wins: isWin ? 1 : 0,
          losses: isWin ? 0 : 1,
        },
      ];
    });
  };

  useEffect(() => {
    saveRolesToLocalStorage(roles); // rolesが変更されるたびにLocalStorageに保存
  }, [roles]);

  return (
    <>
      <p className="text-3xl">人狼勝率記録ツール</p>
      <p className="read-the-docs">
        このツールは、人狼ゲームの役職ごとの勝率を記録するためのツールです。
      </p>

      <div>
        <RoleTable roles={roles} setRoles={setRoles} />
      </div>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        onClick={() => setIsBulkEditModalOpen(true)}
      >
        一括編集
      </button>
      <RegisterButton onClick={() => setIsModalOpen(true)} />
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegister={handleRegister}
      />
      <BulkEditModal
        isOpen={isBulkEditModalOpen}
        onClose={() => setIsBulkEditModalOpen(false)}
        roles={roles}
        onSave={handleSaveRoles}
      />
    </>
  );
}

export default App;
