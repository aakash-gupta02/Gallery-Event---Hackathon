import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiDownload, FiHeart, FiShare2, FiImage, FiVideo } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/BaseUrl";

const EventMediaByID = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'approved', 'pending'

  const fetchEventMediaByID = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/media/event/${id}`);
      setMediaData(response.data);

      console.log(response.data );
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching event media by ID:", error);
      setError("Failed to load media. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventMediaByID();
  }, [id]);

  const filteredMedia = mediaData?.data.filter(media => {
    if (filter === "all") return true;
    if (filter === "approved") return media.approved;
    if (filter === "pending") return !media.approved;
    return true;
  });

  const downloadMedia = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "event-media";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-body py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-bg-surface rounded-lg shadow-card h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg-body flex items-center justify-center">
        <div className="text-center p-8 bg-bg-surface rounded-xl shadow-card max-w-md mx-auto">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-text-heading mb-2">Error Loading Media</h2>
          <p className="text-text-body mb-6">{error}</p>
          <button
            onClick={fetchEventMediaByID}
            className="px-6 py-2 bg-primary text-text-inverted rounded-lg hover:bg-primary-hover transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!mediaData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-body py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-primary hover:text-primary-hover mb-4 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Events
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-heading mb-2">
              {mediaData.event.title}
            </h1>
            <p className="text-text-body">
              {mediaData.event.description || "Event media gallery"}
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-bg-surface rounded-lg p-1 shadow-inner">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-md text-sm ${filter === "all" ? "bg-primary text-text-inverted" : "text-text-body hover:bg-bg-muted"}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-3 py-1 rounded-md text-sm ${filter === "approved" ? "bg-primary text-text-inverted" : "text-text-body hover:bg-bg-muted"}`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-1 rounded-md text-sm ${filter === "pending" ? "bg-primary text-text-inverted" : "text-text-body hover:bg-bg-muted"}`}
            >
              Pending
            </button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia?.map((media) => (
            <motion.div
              key={media.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-bg-surface rounded-lg shadow-card overflow-hidden group relative"
            >
              {/* Media Type Badge */}
              <div className="absolute top-2 left-2 bg-black/70 text-text-inverted px-2 py-1 rounded-full text-xs z-10 flex items-center">
                {media.type === "image" ? (
                  <FiImage className="mr-1" />
                ) : (
                  <FiVideo className="mr-1" />
                )}
                {media.type}
              </div>

              {/* Approval Status Badge */}
              {!media.approved && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-text-inverted px-2 py-1 rounded-full text-xs z-10">
                  Pending
                </div>
              )}

              {/* Media Content */}
              <div 
                className="relative h-48 overflow-hidden cursor-pointer"
                onClick={() => setSelectedMedia(media)}
              >
                {media.type === "image" ? (
                  <img
                    src={media.url}
                    alt={`Event media ${media.id}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FiVideo className="text-4xl text-gray-400" />
                  </div>
                )}
              </div>

              {/* Media Footer */}
              <div className="p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">
                    {new Date(media.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadMedia(media.url);
                      }}
                      className="text-text-muted hover:text-primary transition-colors"
                      title="Download"
                    >
                      <FiDownload />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Implement share functionality
                      }}
                      className="text-text-muted hover:text-primary transition-colors"
                      title="Share"
                    >
                      <FiShare2 />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMedia?.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-primary-light rounded-full flex items-center justify-center mb-4">
              <FiImage className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-medium text-text-heading mb-2">
              No media found
            </h3>
            <p className="text-text-body max-w-md mx-auto">
              {filter === "all"
                ? "This event doesn't have any media yet."
                : `No ${filter} media found for this event.`}
            </p>
          </div>
        )}

        {/* Media Modal */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={() => setSelectedMedia(null)}
                  ></div>
                </motion.div>

                {/* Modal content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="inline-block align-bottom bg-bg-surface rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-bg-surface">
                    {/* Header */}
                    <div className="p-4 border-b border-border flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-text-heading">
                        {selectedMedia.type === "image" ? "Image" : "Video"} Preview
                      </h3>
                      <button
                        onClick={() => setSelectedMedia(null)}
                        className="text-text-muted hover:text-text-heading transition-colors"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                      <div className="flex flex-col items-center">
                        {selectedMedia.type === "image" ? (
                          <img
                            src={selectedMedia.url}
                            alt="Selected media"
                            className="max-h-[70vh] w-auto max-w-full rounded-lg"
                          />
                        ) : (
                          <div className="w-full aspect-video bg-black flex items-center justify-center">
                            <FiVideo className="text-4xl text-gray-400" />
                            <p className="text-text-inverted ml-2">Video playback not implemented</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-border flex justify-between items-center">
                      <span className="text-sm text-text-muted">
                        Uploaded: {new Date(selectedMedia.createdAt).toLocaleString()}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => downloadMedia(selectedMedia.url)}
                          className="flex items-center px-4 py-2 bg-primary text-text-inverted rounded-lg hover:bg-primary-hover transition-colors"
                        >
                          <FiDownload className="mr-2" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default EventMediaByID;