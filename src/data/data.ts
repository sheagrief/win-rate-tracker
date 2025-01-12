import { Data } from "../types/type";

// LocalStorageからのデータ読み込み
export const loadRolesFromLocalStorage = (): Data[] => {
  const storedRoles = localStorage.getItem("roles");
  return storedRoles ? JSON.parse(storedRoles) : initialRoles;
};

// LocalStorageへのデータ保存
export const saveRolesToLocalStorage = (roles: Data[]): void => {
  localStorage.setItem("roles", JSON.stringify(roles));
};

// 初期データの定義
export const initialRoles: Data[] = [
  { id: 1, role: "村人", wins: 0, losses: 0 },
  { id: 2, role: "占い師", wins: 0, losses: 0 },
  { id: 3, role: "霊能者", wins: 0, losses: 0 },
  { id: 4, role: "狩人", wins: 0, losses: 0 },
  { id: 5, role: "人狼", wins: 0, losses: 0 },
  { id: 6, role: "狂人", wins: 0, losses: 0 },
];
