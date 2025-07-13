import { useState } from "react";
import {
  FiImage,
  FiTrash2,
  FiCheck,
  FiUser,
  FiCalendar,
  FiLoader,
} from "react-icons/fi";
import api from "../../services/BaseUrl";
import { useUser } from "../../context/UserContext";

const DeleteModal = ({ isOpen, onClose, onConfirm, title, description }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
];

const UserMedia = () => {
  const { media, loading, refreshMedia } = useUser();

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    mediaId: null,
    mediaUrl: "",
  });
  const [approvingId, setApprovingId] = useState(null);
  const [filter, setFilter] = useState("all");

  // Approve media
  const approveMedia = async (mediaId) => {
    try {
      setApprovingId(mediaId);
      const res = await api.put(`/media/approve/${mediaId}`);
      refreshMedia();
    } catch (error) {
      console.error("Failed to approve media:", error);
    } finally {
      setApprovingId(null);
    }
  };

  // Delete media
  const handleDelete = async () => {
    try {
      await api.delete(`/media/delete/${deleteModal.mediaId}`);
      refreshMedia();
    } catch (error) {
      console.error("Failed to delete media:", error);
    } finally {
      setDeleteModal({ open: false, mediaId: null, mediaUrl: "" });
    }
  };

  // Filter media based on filter state
  const filteredMedia = media.filter((item) => {
    if (filter === "all") return true;
    if (filter === "pending") return !item.approved;
    if (filter === "approved") return item.approved;
    return true;
  });

  return (
    <div className="bg-bg-body p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-text-heading">Media Gallery</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-text-muted">
            {filteredMedia.length}{" "}
            {filteredMedia.length === 1 ? "item" : "items"}
          </div>
          {/* Filter Bar */}
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-1 rounded ${
                  filter === f.value
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } text-sm font-medium`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <FiLoader className="animate-spin text-4xl text-primary" />
        </div>
      )}

      {/* Media Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-bg-surface rounded-lg shadow-card border border-border overflow-hidden"
            >
              {/* Media Preview */}
              <div className="relative">
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={item.event?.title || "Event media"}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-bg-muted flex items-center justify-center">
                    {/* You can add a video icon here if needed */}
                    <FiImage className="text-4xl text-text-muted" />
                  </div>
                )}
                {!item.approved && (
                  <div className="absolute top-2 left-2 bg-warning/90 text-white text-xs px-2 py-1 rounded">
                    Pending
                  </div>
                )}
              </div>

              {/* Media Info */}
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <FiUser className="text-text-muted mr-2" />
                  <span className="text-sm text-text-body truncate">
                    {item.user?.name || "Unknown"}
                  </span>
                </div>
                <div className="flex items-center mb-3">
                  <FiCalendar className="text-text-muted mr-2" />
                  <span className="text-sm text-text-body">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {item.event && (
                  <p className="text-sm font-medium text-text-heading truncate">
                    {item.event.title}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="px-4 py-3 border-t border-border flex justify-between">
                {!item.approved && (
                  <button
                    onClick={() => approveMedia(item.id)}
                    disabled={approvingId === item.id}
                    className="flex items-center text-success hover:text-success/80"
                  >
                    {approvingId === item.id ? (
                      <FiLoader className="animate-spin mr-1" />
                    ) : (
                      <FiCheck className="mr-1" />
                    )}
                    Approve
                  </button>
                )}
                <button
                  onClick={() =>
                    setDeleteModal({
                      open: true,
                      mediaId: item.id,
                      mediaUrl: item.url,
                    })
                  }
                  className="flex items-center text-error hover:text-error/80"
                >
                  <FiTrash2 className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <FiImage className="mx-auto text-4xl text-text-muted mb-4" />
          <h3 className="text-lg font-medium text-text-heading">
            No media found
          </h3>
          <p className="text-text-muted mt-1">
            Upload some media to get started
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.open}
        onClose={() =>
          setDeleteModal({ open: false, mediaId: null, mediaUrl: "" })
        }
        onConfirm={handleDelete}
        title="Delete Media"
        description="Are you sure you want to delete this media item? Deleting this media Results in deleting all the releated comments & likes! This action cannot be undone."
      />
    </div>
  );
};

export default UserMedia;
