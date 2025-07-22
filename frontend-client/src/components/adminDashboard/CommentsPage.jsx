import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import {
  FiTrash2,
  FiUser,
  FiImage,
  FiCalendar,
  FiLoader,
} from "react-icons/fi";
import api from "../../services/BaseUrl";
import { toast } from "react-toastify";

const CommentsPage = () => {
  const { comments = [], loading, refreshComments } = useAdmin();
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    commentId: null,
    commentText: "",
  });
  const [deletingId, setDeletingId] = useState(null);

  // Handle comment deletion
  const handleDelete = async () => {
    if (!deleteModal.commentId) return;

    try {
      setDeletingId(deleteModal.commentId);
      // Replace with your actual API call
      await api.delete(`/comment/delete/${deleteModal.commentId}`);

      refreshComments();
      toast.success("Comment deleted successfully.");
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Failed to delete comment.");
    } finally {
      setDeletingId(null);
      setDeleteModal({ open: false, commentId: null, commentText: "" });

    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-bg-body p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-text-heading">
          Comments Management
        </h1>
        <div className="text-sm text-text-muted">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <FiLoader className="animate-spin text-4xl text-primary" />
        </div>
      )}

      {/* Comments List */}
      {!loading && (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-bg-surface rounded-lg shadow-card border border-border p-4"
            >
              <div className="flex justify-between items-start">
                {/* User Info */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      src={comment.user.profileImage}
                      alt={comment.user.name}
                      className="h-10 w-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-text-heading truncate">
                        {comment.user.name}
                      </p>
                      <span className="text-xs text-text-muted">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-text-body mt-1">
                      {comment.text}
                    </p>
                    {comment.media && (
                      <div className="mt-2 flex items-center text-xs text-text-muted">
                        <FiImage className="mr-1" />
                        <span>Media ID: {comment.media.id}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() =>
                    setDeleteModal({
                      open: true,
                      commentId: comment.id,
                      commentText: comment.text,
                    })
                  }
                  className="text-error hover:text-error/80 p-1"
                  disabled={deletingId === comment.id}
                >
                  {deletingId === comment.id ? (
                    <FiLoader className="animate-spin" />
                  ) : (
                    <FiTrash2 />
                  )}
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {comments.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-bg-muted text-text-muted mb-4">
                <FiUser size={24} />
              </div>
              <h3 className="text-lg font-medium text-text-heading">
                No comments yet
              </h3>
              <p className="text-text-muted mt-1">
                Comments will appear here once users start engaging
              </p>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-bg-surface rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-error/10 flex items-center justify-center text-error">
                <FiTrash2 className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-text-heading">
                  Delete Comment
                </h3>
                <div className="mt-2 text-sm text-text-body">
                  <p>Are you sure you want to delete this comment?</p>
                  <p className="mt-2 p-2 bg-bg-muted rounded text-text-body">
                    "{deleteModal.commentText}"
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() =>
                  setDeleteModal({
                    open: false,
                    commentId: null,
                    commentText: "",
                  })
                }
                className="px-4 py-2 border border-border rounded-md text-text-body hover:bg-bg-muted"
                disabled={deletingId !== null}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center px-4 py-2 bg-error hover:bg-error/90 text-text-inverted rounded-md"
                disabled={deletingId !== null}
              >
                {deletingId ? (
                  <FiLoader className="animate-spin mr-2" />
                ) : (
                  <FiTrash2 className="mr-2" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;
