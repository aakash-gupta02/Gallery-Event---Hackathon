import { useState, useRef } from "react";
import { FiUpload, FiX, FiImage, FiVideo, FiLoader } from "react-icons/fi";
import api from "../../services/BaseUrl";
import { toast } from "react-toastify";

const MediaUpload = ({ eventId, onUploadSuccess }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setError(null);
    const newFiles = Array.from(e.target.files);

    // Validate file size (50MB max)
    const validFiles = newFiles.filter((file) => file.size <= 50 * 1024 * 1024);

    if (validFiles.length !== newFiles.length) {
      setError("Some files exceeded 50MB limit and were not added");
      toast.warn("Some files exceeded 50MB limit and were not added");
    }

    setFiles([...files, ...validFiles]);
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);

    setError(null);
    toast.info("File removed");
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("eventId", eventId);
    files.forEach((file) => {
      formData.append("media", file);
    });

    try {
      const response = await api.post("/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          }
        },
      });
      console.log("Upload response:", response.data);

      setFiles([]);
      toast.success("Upload successful!");
      if (onUploadSuccess) onUploadSuccess(response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      setError(
        error.response?.data?.message || "Upload failed. Please try again."
      );
      toast.error(
        error.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setIsUploading(false);
      setProgress(0);
      console.log("finshed uploading");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-bg-surface rounded-lg shadow-card p-6 border border-border max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-text-heading mb-4">
        Upload Media
      </h2>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-error/10 text-error text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 cursor-pointer transition-colors ${
          files.length > 0
            ? "border-border bg-bg-body"
            : "border-primary bg-primary-light/20 hover:bg-primary-light/30"
        }`}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept="image/*,video/*"
        />
        <div className="flex flex-col items-center justify-center space-y-2">
          <FiUpload className="text-3xl text-primary" />
          <p className="text-text-body">
            <span className="text-primary font-medium">Click to upload</span> or
            drag and drop
          </p>
          <p className="text-xs text-text-muted">
            Supports JPG, PNG, MP4 (Max 50MB each)
          </p>
        </div>
      </div>

      {/* Selected Files Preview */}
      {files.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-text-heading mb-3">
            Selected Files ({files.length})
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-bg-muted rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {file.type.startsWith("image/") ? (
                    <FiImage className="text-lg text-text-body" />
                  ) : (
                    <FiVideo className="text-lg text-text-body" />
                  )}
                  <div className="truncate max-w-xs">
                    <p className="text-sm text-text-body truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-text-muted hover:text-error transition-colors"
                  aria-label="Remove file"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {isUploading && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-text-body mb-1">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        {files.length > 0 && !isUploading && (
          <button
            onClick={() => {
              setFiles([]);
              setError(null);
            }}
            className="px-4 py-2 text-sm font-medium text-text-body hover:text-error transition-colors"
          >
            Clear All
          </button>
        )}
        <button
          onClick={handleUpload}
          disabled={files.length === 0 || isUploading}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            files.length === 0 || isUploading
              ? "bg-disabled text-text-muted cursor-not-allowed"
              : "bg-primary hover:bg-primary-hover text-text-inverted"
          }`}
        >
          {isUploading ? (
            <span className="flex items-center space-x-2">
              <FiLoader className="animate-spin" />
              <span>Uploading...</span>
            </span>
          ) : (
            `Upload ${files.length} File${files.length !== 1 ? "s" : ""}`
          )}
        </button>
      </div>
    </div>
  );
};

export default MediaUpload;
