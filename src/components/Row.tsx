import React from 'react';
import { Data } from '../types/type';

type RoleRowProps = {
  role: Data;
};

const RoleRow: React.FC<RoleRowProps> = ({ role }) => {
  const totalGames = role.wins + role.losses;
  const winRate = totalGames === 0 ? '0%' : `${((role.wins / totalGames) * 100).toFixed(1)}%`;

  return (
    <tr className="border bg-white dark:bg-gray-800">
      <th scope="row" className="border px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{role.role}</th>
      <td className="border px-6 py-4">{winRate}</td>
      <td className="border px-6 py-4">{totalGames}</td>
    </tr>
  );
};

export default RoleRow;
