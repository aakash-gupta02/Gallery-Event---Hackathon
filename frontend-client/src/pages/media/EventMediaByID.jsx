import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiDownload,
  FiHeart,
  FiShare2,
  FiImage,
  FiVideo,
  FiMessageSquare,
} from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import api from "../../services/BaseUrl";
import CommentSection from "./CommentSection";
import MediaUpload from "./MediaUpload";

const EventMediaByID = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showComments, setShowComments] = useState(null);
  const [filter, setFilter] = useState("all");
  const [mediaLikes, setMediaLikes] = useState({});
  const [mediaLikeStatus, setMediaLikeStatus] = useState({});
  const [showUpload, setshowUpload] = useState(false);

  const fetchEventMediaByID = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/media/event/${id}`);
      setMediaData(response.data);

      // Initialize likes and like status for each media
      const likesData = {};
      const likeStatusData = {};

      await Promise.all(
        response.data.data.map(async (media) => {
          // Get like count
          const likeRes = await api.get(`/like/get/${media.id}`);
          likesData[media.id] = likeRes.data.totalLikes || 0;

          // Check if current user liked the media
          try {
            const isLikedRes = await api.get(`/like/is-liked/${media.id}`);
            likeStatusData[media.id] = isLikedRes.data.liked;
          } catch (err) {
            likeStatusData[media.id] = false;
          }
        })
      );

      setMediaLikes(likesData);
      setMediaLikeStatus(likeStatusData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching event media by ID:", error);
      setError("Failed to load media. Please try again later.");
      setLoading(false);
    }
  };

  const handleLike = async (mediaId) => {
    try {
      if (mediaLikeStatus[mediaId]) {
        await api.delete(`/like/remove/${mediaId}`);
        setMediaLikes((prev) => ({
          ...prev,
          [mediaId]: prev[mediaId] - 1,
        }));
      } else {
        await api.post(`/like/add/${mediaId}`);
        setMediaLikes((prev) => ({
          ...prev,
          [mediaId]: (prev[mediaId] || 0) + 1,
        }));
      }
      setMediaLikeStatus((prev) => ({
        ...prev,
        [mediaId]: !prev[mediaId],
      }));
    } catch (err) {
      setError("Failed to update like");
    }
  };

  useEffect(() => {
    fetchEventMediaByID();
  }, [id]);

  const filteredMedia = () => {
    if (!mediaData?.data) return [];

    let media = [...mediaData.data];

    switch (filter) {
      case "most-liked":
        return media.sort(
          (a, b) => (mediaLikes[b.id] || 0) - (mediaLikes[a.id] || 0)
        );
      case "most-commented":
        return media.sort(
          (a, b) => (b.commentCount || 0) - (a.commentCount || 0)
        );
      default:
        return media;
    }
  };

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
              <div
                key={i}
                className="bg-bg-surface rounded-lg shadow-card h-64 animate-pulse"
              />
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
          <h2 className="text-xl font-bold text-text-heading mb-2">
            Error Loading Media
          </h2>
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
        {/* Event Header */}
        <div className="mb-10 bg-white dark:bg-bg-surface rounded-2xl shadow-lg p-8 border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-primary font-medium hover:text-primary-hover transition-colors text-base"
            >
              <FiArrowLeft className="mr-2 text-lg" />
              Back to Events
            </button>
            <button
              onClick={() => setshowUpload(true)}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-hover transition-colors text-base font-semibold"
            >
              <FiImage className="text-lg" />
              Upload Media
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3 w-full flex-shrink-0">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-md border border-border bg-bg-muted">
                <img
                  src={mediaData.event.mediaUrl}
                  alt={mediaData.event.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            <div className="md:w-2/3 w-full">
              <h1 className="text-4xl font-extrabold text-text-heading mb-3 leading-tight">
                {mediaData.event.title}
              </h1>
              <p className="text-lg text-text-body mb-6">
                {mediaData.event.description || "Event media gallery"}
              </p>

              <div className="flex flex-wrap gap-5">
                <div className="flex flex-col items-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl px-6 py-4 min-w-[120px] shadow-sm">
                  <span className="text-xs text-text-muted mb-1 tracking-wide">
                    Total Media
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {mediaData.data.length}
                  </span>
                </div>
                <div className="flex flex-col items-center bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl px-6 py-4 min-w-[120px] shadow-sm">
                  <span className="text-xs text-text-muted mb-1 tracking-wide">
                    Event Date
                  </span>
                  <span className="text-2xl font-bold text-secondary">
                    {new Date(mediaData.event.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-col items-center bg-gradient-to-br from-pink-200/40 to-pink-100/40 rounded-xl px-6 py-4 min-w-[120px] shadow-sm">
                  <span className="text-xs text-text-muted mb-1 tracking-wide">
                    Total Likes
                  </span>
                  <span className="text-2xl font-bold text-pink-600">
                    {mediaData.data.reduce(
                      (sum, media) => sum + (media.likeCount || 0),
                      0
                    )}
                  </span>
                </div>
                <div className="flex flex-col items-center bg-gradient-to-br from-blue-200/40 to-blue-100/40 rounded-xl px-6 py-4 min-w-[120px] shadow-sm">
                  <span className="text-xs text-text-muted mb-1 tracking-wide">
                    Total Comments
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {mediaData.data.reduce(
                      (sum, media) => sum + (media.commentCount || 0),
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2 bg-bg-surface rounded-lg p-1 shadow-inner">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === "all"
                ? "bg-primary text-text-inverted"
                : "text-text-body hover:bg-bg-muted"
            }`}
          >
            All Media
          </button>
          <button
            onClick={() => setFilter("most-liked")}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === "most-liked"
                ? "bg-primary text-text-inverted"
                : "text-text-body hover:bg-bg-muted"
            }`}
          >
            Most Liked
          </button>
          <button
            onClick={() => setFilter("most-commented")}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === "most-commented"
                ? "bg-primary text-text-inverted"
                : "text-text-body hover:bg-bg-muted"
            }`}
          >
            Most Commented
          </button>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia().map((media) => (
            <div
              key={media.id}
              className="bg-bg-surface rounded-lg shadow-card overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Media Content */}
              <div
                className="relative h-48 overflow-hidden cursor-pointer"
                onClick={() => setSelectedMedia(media)}
              >
                {media.type === "image" ? (
                  <img
                    src={media.url}
                    alt={`Event media ${media.id}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FiVideo className="text-4xl text-gray-400" />
                  </div>
                )}
              </div>

              {/* Media Footer */}
              <div className="p-3 flex justify-between items-center">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={media.user?.profileImage || "/default-avatar.png"}
                    alt={media.user?.name || "User"}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-text-body">
                    {media.user?.name || "Anonymous"}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    className=" flex justify-center items-center text-text-muted gap-1 text-sm   "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(media.id);
                    }}
                  >
                    {mediaLikeStatus[media.id] ? (
                      <FiHeart className="text-error fill-error" />
                    ) : (
                      <IoMdHeartEmpty className="text-text-muted" />
                    )}{" "}
                    {mediaLikes[media.id] || 0}
                  </button>

                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowComments(media);
                    }}
                    className="flex items-center text-sm text-text-muted"
                  >
                    <FiMessageSquare className="mr-1" />{" "}
                    {media.commentCount || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMedia().length === 0 && (
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
                : `No media found with the selected filter.`}
            </p>
          </div>
        )}

        {/* Media Modal */}
        <div className="max-w-7xl mx-auto">
          {selectedMedia && (
            <div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
              onClick={() => setSelectedMedia(null)}
            >
              <div
                className="bg-bg-surface rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-text-heading">
                    {selectedMedia.type === "image" ? "Image" : "Video"} Preview
                  </h3>
                  <button
                    onClick={() => setSelectedMedia(null)}
                    className="text-text-muted hover:text-text-heading transition-colors"
                  >
                    &times;
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-auto">
                  <div className="p-4 flex justify-center">
                    {selectedMedia.type === "image" ? (
                      <img
                        src={selectedMedia.url}
                        alt="Selected media"
                        className="max-h-[60vh] max-w-full rounded-lg"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-black flex items-center justify-center">
                        <FiVideo className="text-4xl text-gray-400" />
                        <p className="text-text-inverted ml-2">
                          Video playback not implemented
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          selectedMedia.user?.profileImage ||
                          "/default-avatar.png"
                        }
                        alt={selectedMedia.user?.name || "User"}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium">
                          {selectedMedia.user?.name || "Anonymous"}
                        </div>
                        <div className="text-xs text-text-muted">
                          {new Date(
                            selectedMedia.createdAt
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex gap-3">
                        <button
                          className=" flex justify-center items-center  gap-1 text-sm   "
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(selectedMedia.id);
                          }}
                        >
                          {mediaLikeStatus[selectedMedia.id] ? (
                            <FiHeart className="text-error fill-error" />
                          ) : (
                            <IoMdHeartEmpty className="" />
                          )}{" "}
                          {mediaLikes[selectedMedia.id] || 0}
                        </button>

                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowComments(selectedMedia);
                          }}
                          className="flex items-center text-sm"
                        >
                          <FiMessageSquare className="mr-1" />{" "}
                          {selectedMedia.commentCount || 0}
                        </span>
                      </div>

                      <button
                        onClick={() => downloadMedia(selectedMedia.url)}
                        className="flex items-center gap-1 text-primary"
                      >
                        <FiDownload /> Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="max-w-7xl mx-auto">
          {showComments && (
            <div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
              onClick={() => setShowComments(false)}
            >
              <div
                className="bg-bg-surface rounded-xl max-w-4xl w-full max-h-[120vh] overflow-hidden flex flex-col p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <CommentSection mediaId={showComments.id} />
              </div>
            </div>
          )}
        </div>


{/* media uploads */}
        <div>
          {showUpload && (
            <div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
              onClick={() => setshowUpload(false)}
            >
              <div
                className="bg-bg-surface rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <MediaUpload eventId={mediaData.event.id} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventMediaByID;
