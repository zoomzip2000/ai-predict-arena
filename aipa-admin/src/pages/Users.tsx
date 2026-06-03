import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Eye, Coins, Lock, LockOpen, Trash, MagnifyingGlass } from "@phosphor-icons/react";
import { RootState } from "../store";
import { 
  UserItem, 
  blockUser, 
  unblockUser, 
  deleteUser, 
  updateUserBalance 
} from "../store/slices/usersSlice";
import EditBalanceModal from "../components/users/EditBalanceModal";
import UserDetailsModal from "../components/users/UserDetailsModal";

export default function Users() {
  const dispatch = useDispatch();
  const userList = useSelector((state: RootState) => state.users.list);
  const [search, setSearch] = useState("");
  
  // Modal states
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isEditBalanceOpen, setIsEditBalanceOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredUsers = userList.filter((u) => 
    u.username.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleBlock = (user: UserItem) => {
    if (user.blocked) {
      dispatch(unblockUser(user.id));
    } else {
      dispatch(blockUser(user.id));
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleOpenBalanceEdit = (user: UserItem) => {
    setSelectedUser(user);
    setIsEditBalanceOpen(true);
  };

  const handleOpenDetails = (user: UserItem) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  const handleSaveBalance = (id: number, amount: number, isDemo: boolean) => {
    dispatch(updateUserBalance({ id, amount, isDemo }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-dark mb-1">
            Управление пользователями
          </h1>
          <p className="text-sm text-text-muted">
            Просмотр профилей, блокировка аккаунтов и редактирование балансов USDT
          </p>
        </div>

        {/* Search Input */}
        <div className="relative flex items-center w-full sm:max-w-xs">
          <span className="absolute left-3.5 text-text-muted">
            <MagnifyingGlass size={18} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по логину или email..."
            className="form-control-nm pl-11"
          />
        </div>
      </div>

      {/* Users table card */}
      <div className="nm-card p-6">
        <div className="overflow-x-auto">
          <table className="table-nm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Пользователь</th>
                <th>Email</th>
                <th>Реальный баланс</th>
                <th>Демо баланс</th>
                <th>Статус</th>
                <th style={{ textAlign: "right" }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-text-muted py-8 font-bold">
                    Пользователи не найдены
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="font-bold">#{user.id}</td>
                    <td>
                      <span className="font-bold text-text-dark">@{user.username}</span>
                      <span className="block text-[10px] font-extrabold text-text-muted">{user.role}</span>
                    </td>
                    <td>{user.email}</td>
                    <td className="font-bold">{user.balance.toLocaleString()} USDT</td>
                    <td className="font-bold text-text-muted">{user.demoBalance.toLocaleString()} USDT</td>
                    <td>
                      {user.blocked ? (
                        <span className="badge-nm badge-nm-danger">Заблокирован</span>
                      ) : (
                        <span className="badge-nm badge-nm-success">Активен</span>
                      )}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div className="inline-flex gap-2">
                        {/* Eye details */}
                        <button
                          onClick={() => handleOpenDetails(user)}
                          className="btn-nm p-2 border-nm-border cursor-pointer rounded-lg"
                          title="Просмотреть детали"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Balance Edit */}
                        <button
                          onClick={() => handleOpenBalanceEdit(user)}
                          className="btn-nm p-2 border-nm-border cursor-pointer rounded-lg"
                          title="Изменить баланс"
                        >
                          <Coins size={16} className="text-secondary" />
                        </button>

                        {/* Block / Unblock */}
                        <button
                          onClick={() => handleToggleBlock(user)}
                          className={`btn-nm p-2 border-nm-border cursor-pointer rounded-lg`}
                          title={user.blocked ? "Разблокировать" : "Заблокировать"}
                        >
                          {user.blocked ? (
                            <LockOpen size={16} className="text-success" />
                          ) : (
                            <Lock size={16} className="text-danger" />
                          )}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn-nm p-2 border-nm-border cursor-pointer rounded-lg"
                          title="Удалить аккаунт"
                        >
                          <Trash size={16} className="text-danger" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <EditBalanceModal
        isOpen={isEditBalanceOpen}
        onClose={() => {
          setIsEditBalanceOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSave={handleSaveBalance}
      />

      <UserDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </div>
  );
}
