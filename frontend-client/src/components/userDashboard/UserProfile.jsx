import React, { useState, useRef } from "react";
import { useUser } from "../../context/UserContext";
import { FiEdit2, FiLoader, FiSave, FiCamera, FiX } from "react-icons/fi";
import api from "../../services/BaseUrl";
import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
    const { user, loading, refresshUser } = useUser();
    const { updateUser } = useAuth();
    
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        profileImage: user?.profileImage || "",
    });
    const [previewImage, setPreviewImage] = useState(user?.profileImage || "");
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, profileImage: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            if (form.profileImage instanceof File) {
                formData.append("media", form.profileImage);
            }

            const response = await api.put("/auth/update-profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Update both context and local storage
            updateUser(response.data.user);
            await refresshUser();
            setEditMode(false);
        } catch (err) {
            console.error("Profile update error:", err);
        } finally {
            setSaving(false);
        }
    };

    const resetForm = () => {
        setForm({
            name: user?.name || "",
            email: user?.email || "",
            profileImage: user?.profileImage || "",
        });
        setPreviewImage(user?.profileImage || "");
        setEditMode(false);
    };

    React.useEffect(() => {
        resetForm();
    }, [user]);

    return (
        <div className="max-w-md mx-auto bg-bg-surface rounded-lg shadow-card overflow-hidden mt-8">
            {/* Profile Header */}
            <div className="bg-primary p-6 text-center">
                <h2 className="text-2xl font-bold text-text-inverted">User Profile</h2>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <FiLoader className="animate-spin text-4xl text-primary" />
                </div>
            ) : (
                <form onSubmit={handleSave} className="p-6 space-y-6">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center relative">
                        <div className="relative group">
                            <img
                                src={previewImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                alt={form.name}
                                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
                                onError={(e) => {
                                    e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                                }}
                            />
                            {editMode && (
                                <>
                                    <button
                                        type="button"
                                        className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-primary-hover transition-all"
                                        onClick={() => fileInputRef.current.click()}
                                        tabIndex={-1}
                                    >
                                        <FiCamera size={18} />
                                    </button>
                                    {previewImage && previewImage !== user?.profileImage && (
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 bg-error text-white rounded-full p-1 shadow-lg hover:bg-error/90 transition-all"
                                            onClick={() => {
                                                setPreviewImage(user?.profileImage || "");
                                                setForm({...form, profileImage: user?.profileImage || ""});
                                            }}
                                        >
                                            <FiX size={14} />
                                        </button>
                                    )}
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        {/* Name Field */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-text-heading">Name</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            ) : (
                                <div className="text-text-body text-lg p-2 bg-bg-muted rounded-lg">{user?.name}</div>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-text-heading">Email</label>
                            {editMode ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            ) : (
                                <div className="text-text-body text-lg p-2 bg-bg-muted rounded-lg">{user?.email}</div>
                            )}
                        </div>

                        {/* Admin Status */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-text-heading">Role</label>
                            <div className="text-text-body text-lg p-2 bg-bg-muted rounded-lg">
                                {user?.isAdmin ? "Administrator" : "Standard User"}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        {editMode ? (
                            <>
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-border rounded-lg text-text-body hover:bg-bg-muted transition-colors"
                                    onClick={resetForm}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
                                    disabled={saving}
                                >
                                    {saving ? (
                                        <FiLoader className="animate-spin mr-2" />
                                    ) : (
                                        <FiSave className="mr-2" />
                                    )}
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                className="flex items-center px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
                                onClick={() => setEditMode(true)}
                            >
                                <FiEdit2 className="mr-2" />
                                Edit Profile
                            </button>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
};

export default UserProfile;