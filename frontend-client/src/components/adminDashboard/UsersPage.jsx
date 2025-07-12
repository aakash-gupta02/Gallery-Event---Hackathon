import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiTrash2,
  FiUserCheck,
  FiLoader,
  FiPhoneOff,
} from "react-icons/fi";
import { useAdmin } from "../../context/AdminContext";
import api from "../../services/BaseUrl";

const UsersPage = () => {
  const { users, loading, refreshUsers } = useAdmin();

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    userId: null,
    userName: "",
  });
  const [actionLoading, setActionLoading] = useState(false);

  // Handle user deletion
  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await api.delete(`/users/${deleteModal.userId}`);
      refreshUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setActionLoading(false);
      setDeleteModal({ open: false, userId: null, userName: "" });
    }
  };

  // Toggle admin status
  const toggleAdminStatus = async (userId, currentStatus) => {
    setActionLoading(true);
    try {
      await api.put(`/auth/toggle-admin/${userId}`);
      refreshUsers();
    } catch (error) {
      console.error("Failed to update admin status:", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-bg-body p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-text-heading">Manage Users</h1>
        <div className="text-sm text-text-muted">
          {users.length} {users.length === 1 ? "user" : "users"} total
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-48 sm:h-64">
          <FiLoader className="animate-spin text-3xl sm:text-4xl text-primary" />
        </div>
      )}

      {/* Users Table */}
      {!loading && (
        <div className="bg-bg-surface rounded-lg shadow-card overflow-x-auto border border-border">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-bg-muted">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                  User
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                  Email
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-bg-muted transition">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary-light text-primary flex items-center justify-center overflow-hidden">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FiUser size={18} />
                        )}
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-text-heading flex items-center">
                          {user.name}
                          {user.isAdmin && (
                            <span className="ml-2 px-2 py-0.5 text-[10px] sm:text-xs rounded-full bg-primary-light text-primary">
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-text-body break-all max-w-[120px] sm:max-w-xs">
                    {user.email}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                    <div className="flex space-x-2 sm:space-x-3">
                      <button
                        onClick={() =>
                          toggleAdminStatus(user.id, user.isAdmin)
                        }
                        disabled={actionLoading}
                        className={`p-2 rounded-md ${
                          user.isAdmin
                            ? "text-primary hover:bg-primary-light"
                            : "text-text-muted hover:bg-bg-muted"
                        }`}
                        title={user.isAdmin ? "Remove admin" : "Make admin"}
                      >
                        {actionLoading ? (
                          <FiLoader className="animate-spin" />
                        ) : (
                          <FiUserCheck />
                        )}
                      </button>
                      {/* <button
                        onClick={() =>
                          setDeleteModal({
                            open: true,
                            userId: user.id,
                            userName: user.name,
                          })
                        }
                        className={`p-2 rounded-md ${
                          user.isAdmin
                            ? "text-error hover:bg-error/10"
                            : "text-text-muted hover:bg-bg-muted"
                        }`}
                        title="Delete user"
                      >
                        <FiTrash2 />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {/* <DeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, userId: null, userName: '' })}
        onConfirm={handleDelete}
        title={`Delete ${deleteModal.userName}`}
        description="This will permanently remove the user and all their data. This action cannot be undone."
        loading={actionLoading}
      /> */}
    </div>
  );
};

export default UsersPage;
