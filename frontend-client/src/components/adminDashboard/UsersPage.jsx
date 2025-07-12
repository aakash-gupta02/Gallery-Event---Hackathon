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
    <div className="bg-bg-body p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-text-heading">Manage Users</h1>
        <div className="text-sm text-text-muted">
          {users.length} {users.length === 1 ? "user" : "users"} total
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <FiLoader className="animate-spin text-4xl text-primary" />
        </div>
      )}

      {/* Users Table */}
      {!loading && (
        <div className="bg-bg-surface rounded-lg shadow-card overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Email
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Status
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-light text-primary flex items-center justify-center overflow-hidden">
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
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text-heading">
                            {user.name}
                            {user.isAdmin && (
                              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-primary-light text-primary">
                                Admin
                              </span>
                            )}
                          </div>
                   
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-body">
                      {user.email}
                    </td>

                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.isActive
                            ? "bg-success/10 text-success"
                            : "bg-error/10 text-error"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td> */}

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
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
