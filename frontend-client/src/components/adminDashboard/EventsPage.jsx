import React, { useState, useRef } from "react";
import {
  FiCalendar,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiLoader,
  FiUpload,
  FiSave,
  FiAlertTriangle,
} from "react-icons/fi";
import { useAdmin } from "../../context/AdminContext";
import api from "../../services/BaseUrl";

const initialForm = {
  title: "",
  description: "",
  date: "",
  department: "All",
  mediaFile: null,
  previewUrl: "",
};

const EventsPage = () => {
  const { events, loading, refreshEvents } = useAdmin();
  const safeEvents = Array.isArray(events.events) ? events.events : [];
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [deleteModal, setDeleteModal] = useState({ open: false, eventId: null });
  const fileRef = useRef();


  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((f) => ({
        ...f,
        mediaFile: file,
        previewUrl: URL.createObjectURL(file),
      }));
    }
  };

  const openCreate = () => {
    setForm(initialForm);
    setEditingId(null);
    setModalOpen(true);
  };

  // Open edit modal
  const openEdit = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      date: event.date.split("T")[0],
      department: event.department,
      mediaFile: null,
      previewUrl: event.mediaUrl,
    });
    setEditingId(event.id);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    if (form.previewUrl && form.mediaFile) URL.revokeObjectURL(form.previewUrl);
    setForm(initialForm);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("date", form.date);
    fd.append("department", form.department);
    if (form.mediaFile) fd.append("media", form.mediaFile);
    if (editingId) fd.append("eventId", editingId);

    try {
      
      if (editingId) {
        await api.put(`/event/update/${editingId}`, fd);
      } else {
        await api.post("/event/create", fd);
      }
      closeModal();
      refreshEvents();
    } catch (err) {
      alert("Error saving event");
    }
    if (form.previewUrl && form.mediaFile) URL.revokeObjectURL(form.previewUrl);
  };

  // Delete handlers
  const openDelete = (id) => setDeleteModal({ open: true, eventId: id });
  const closeDelete = () => setDeleteModal({ open: false, eventId: null });
  const handleDelete = async () => {
    // Replace with your delete API call
    // await api.post("/event/delete", { eventId: deleteModal.eventId });
    closeDelete();
    refreshEvents();
  };

  return (
    <div className="bg-bg-body p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-text-heading">Manage Events</h1>
        <button
          onClick={openCreate}
          className="flex items-center bg-primary hover:bg-primary-hover text-text-inverted px-3 py-2 sm:px-4 rounded-lg w-full sm:w-auto justify-center"
        >
          <FiPlus className="mr-2" />
          Create Event
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-40 sm:h-64">
          <FiLoader className="animate-spin text-3xl sm:text-4xl text-primary" />
        </div>
      ) : (
        <div className="bg-bg-surface rounded-lg shadow-card overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead className="bg-bg-muted">
                <tr>
                  <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Event</th>
                  <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Department</th>
                  <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
                  <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {safeEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-bg-muted transition-colors">
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-md object-cover"
                          src={event.mediaUrl}
                          alt={event.title}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/40?text=Event";
                          }}
                        />
                        <div className="ml-2 sm:ml-4">
                          <div className="text-xs sm:text-sm font-medium text-text-heading">{event.title}</div>
                          <div className="text-xs sm:text-sm text-text-muted line-clamp-1">{event.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-text-body">{event.department}</td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-text-body">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <div className="flex space-x-2">
                        <button onClick={() => openEdit(event)} className="text-primary hover:text-primary-hover">
                          <FiEdit2 />
                        </button>
                        <button onClick={() => openDelete(event.id)} className="text-error hover:text-error/80">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-bg-surface rounded-lg shadow-xl w-full max-w-xs sm:max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-border p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-medium text-text-heading">
                {editingId ? "Edit Event" : "Create New Event"}
              </h3>
              <button onClick={closeModal} className="text-text-muted hover:text-text-heading">
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-text-heading mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInput}
                  className="w-full px-2 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-text-heading mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInput}
                  rows={3}
                  className="w-full px-2 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-text-heading mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleInput}
                  className="w-full px-2 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-text-heading mb-1">Department</label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleInput}
                  className="w-full px-2 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-xs sm:text-sm"
                >
                  <option value="All">All</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-text-heading mb-1">Event Image</label>
                <input
                  type="file"
                  ref={fileRef}
                  onChange={handleFile}
                  accept="image/*"
                  className="hidden"
                />
                <div
                  onClick={() => fileRef.current.click()}
                  className="border-2 border-dashed border-border rounded-md p-3 sm:p-4 text-center cursor-pointer hover:bg-bg-muted transition-colors"
                >
                  {form.previewUrl ? (
                    <div className="relative">
                      <img
                        src={form.previewUrl}
                        alt="Preview"
                        className="h-32 sm:h-40 w-full object-cover rounded-md mb-2"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setForm((f) => ({ ...f, mediaFile: null, previewUrl: "" }));
                        }}
                        className="absolute top-2 right-2 bg-error text-text-inverted rounded-full p-1"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <FiUpload className="text-xl sm:text-2xl text-text-muted" />
                      <p className="text-xs sm:text-sm text-text-muted">Click to upload or drag and drop</p>
                      <p className="text-xs text-text-muted">JPG, PNG (Max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-2 border border-border rounded-md text-text-body hover:bg-bg-muted text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-3 py-2 bg-primary hover:bg-primary-hover text-text-inverted rounded-md text-xs sm:text-sm"
                  disabled={
                    !form.title ||
                    !form.date ||
                    (!form.mediaFile && !editingId)
                  }
                >
                  {loading ? <FiLoader className="animate-spin mr-2" /> : <FiSave className="mr-2" />}
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-bg-surface rounded-lg shadow-xl w-full max-w-xs sm:max-w-md p-4 sm:p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-error/10 flex items-center justify-center text-error">
                <FiAlertTriangle className="h-5 w-5" />
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-base sm:text-lg font-medium text-text-heading">Delete Event</h3>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-text-body">
                  <p>Are you sure you want to delete this event? This action cannot be undone.</p>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                onClick={closeDelete}
                className="px-3 py-2 border border-border rounded-md text-text-body hover:bg-bg-muted text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center px-3 py-2 bg-error hover:bg-error/90 text-text-inverted rounded-md text-xs sm:text-sm"
              >
                <FiTrash2 className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
