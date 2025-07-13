import React, { useState } from "react";
import {
  FiTrash2,
  FiUser,
  FiImage,
  FiCalendar,
  FiLoader,
} from "react-icons/fi";
import api from "../../services/BaseUrl";
import { useUser } from "../../context/UserContext";

const UserComment = () => {
  const { comments = [], loading, refreshComments } = useUser();
  console.log("Comments:", comments);

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
    } catch (error) {
      console.error("Failed to delete comment:", error);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-bg-surface rounded-lg shadow-card border border-border overflow-hidden flex flex-col"
            >
              {/* Media Preview */}
              <div className="relative">
                {comment.media && comment.media.url ? (
                  <img
                    src={comment.media.url}
                    alt="Comment media"
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                    }}
                  />
                ) : (
                  <div className="w-full h-40 bg-bg-muted flex items-center justify-center">
                    <FiImage className="text-4xl text-text-muted" />
                  </div>
                )}
              </div>

              {/* Comment Info */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center mb-2">
                  <FiCalendar className="text-text-muted mr-2" />
                  <span className="text-sm text-text-body">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-text-body mb-3 line-clamp-3">
                  {comment.text}
                </p>
                {comment.media && (
                  <div className="flex items-center text-xs text-text-muted mt-auto">
                    <FiImage className="mr-1" />
                    <span>Media ID: {comment.media.id}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="px-4 py-3 border-t border-border flex justify-end">
                <button
                  onClick={() =>
                    setDeleteModal({
                      open: true,
                      commentId: comment.id,
                      commentText: comment.text,
                    })
                  }
                  className="flex items-center text-error hover:text-error/80"
                  disabled={deletingId === comment.id}
                >
                  {deletingId === comment.id ? (
                    <FiLoader className="animate-spin mr-1" />
                  ) : (
                    <FiTrash2 className="mr-1" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {comments.length === 0 && (
            <div className="col-span-full text-center py-12">
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

export default UserComment;
