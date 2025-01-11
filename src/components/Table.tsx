import React from "react";
import RoleRow from "./Row";
import { Data } from "../types/type";

type RoleTableProps = {
  roles: Data[];
  setRoles: React.Dispatch<React.SetStateAction<Data[]>>;
};

const RoleTable: React.FC<RoleTableProps> = ({ roles, setRoles }) => {

    const totalWins = roles.reduce((sum, role) => sum + role.wins, 0);
    const totalLosses = roles.reduce((sum, role) => sum + role.losses, 0);
    const totalGames = totalWins + totalLosses;
    const overallWinRate = totalGames === 0 ? '0%' : `${((totalWins / totalGames) * 100).toFixed(1)}%`;

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th  scope="col" className="px-6 py-3 rounded-s-lg">役職</th>
            <th  scope="col" className="px-6 py-3">勝率</th>
            <th  scope="col" className="px-6 py-3 rounded-e-lg">試合数</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <RoleRow key={role.id} role={role} />
          ))}
        </tbody>
        <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base">合計値</th>
                <td className="px-6 py-3">{overallWinRate}</td>
                <td className="px-6 py-3">{totalGames}</td>
            </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default RoleTable;
