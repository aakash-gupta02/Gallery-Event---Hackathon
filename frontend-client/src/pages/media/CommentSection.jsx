import React, { useState, useEffect } from "react";
import {
  FiHeart,
  FiMessageSquare,
  FiSend,
  FiBookmark,
  FiMoreHorizontal,
} from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import api from "../../services/BaseUrl";

function formatReadableDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const CommentSection = ({ mediaId }) => {
  const [comments, setComments] = useState([]);
  const [media, setMedia] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commentRes, mediaRes, likeRes] = await Promise.all([
          api.get(`/comment/get/${mediaId}`),
          api.get(`/media/${mediaId}`),
          api.get(`/like/get/${mediaId}`),
        ]);
        setComments(commentRes.data);
        setMedia(mediaRes.data.data);
        setLikes(likeRes.data.totalLikes || 0);
        setLoading(false);
      } catch (err) {
        setError("Failed to load comments");
        setLoading(false);
      }
    };

    const checkLiked = async () => {
      try {
        const res = await api.get(`/like/is-liked/${mediaId}`);
        console.log("Is Liked Response:", res.data.liked);

        setIsLiked(res.data.liked);
      } catch (err) {
        setIsLiked(false);
      }
    };

    fetchData();
    checkLiked();
  }, [mediaId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const response = await api.post("/comment/add", {
        mediaId,
        text: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (err) {
      setError("Failed to post comment");
    }
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        await api.delete(`/like/remove/${mediaId}`);
        setLikes(likes - 1);
      } else {
        await api.post(`/like/add/${mediaId}`);
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      setError("Failed to update like");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comment/delete/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      setError("Failed to delete comment");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error/10 text-error p-4 rounded-lg">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="ml-2 text-primary hover:text-primary-hover"
        >
          Retry
        </button>
      </div>
    );
  }

  // Dynamic image container style
  const imageContainerStyle = {
    aspectRatio: "auto",
    maxHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#000",
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-bg-surface rounded-lg shadow-card overflow-hidden">
        <div className="flex flex-col md:flex-row h-[90vh] md:h-auto">
          {/* Left Side - Image */}
          <div
            className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center"
            style={imageContainerStyle}
          >
            <img
              src={media?.url}
              alt={media?.title || "Post"}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>

          {/* Right Side - Comment Section */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col h-[90vh] md:h-[80vh]">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center flex-shrink-0 bg-bg-surface z-10">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                <img
                  src={
                    media?.user?.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-semibold text-text-heading">
                {media?.user?.name || "Unknown"}
              </div>
              <button className="ml-auto text-text-muted hover:text-text-heading">
                <FiMoreHorizontal />
              </button>
            </div>

            {/* Comments List (Scrollable) */}
            <div
              className="
                flex-1 overflow-y-auto p-4 space-y-4 bg-bg-surface
                min-h-0
                "
              style={{
                // For mobile: ensure comment list doesn't get pushed out of view
                maxHeight: "calc(100vh - 220px)",
              }}
            >
              {comments.map((comment) => (
                <div key={comment.id} className="flex group">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                    <img
                      src={
                        comment.user?.profileImage ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div>
                        <span className="font-semibold text-text-heading">
                          {comment.user?.name || "Anonymous"}
                        </span>
                        <span className="text-text-body"> {comment.text}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="ml-2 text-text-muted hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      {formatReadableDate(comment.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons & Comment Input (Fixed at bottom) */}
            <div className="border-t border-border bg-bg-surface flex flex-col flex-shrink-0">
              <div className="p-4">
                <div className="flex space-x-4 mb-2">
                  <button onClick={handleLike}>
                    {isLiked ? (
                      <FiHeart className="text-error fill-error text-2xl " />
                    ) : (
                      <IoMdHeartEmpty className="text-text-muted text-2xl " />
                    )}
                  </button>
                </div>
                <div className="font-semibold text-text-heading mb-1">
                  {likes.toLocaleString()} likes
                </div>
                <div className="text-xs text-text-muted mb-3">
                  {formatReadableDate(media?.createdAt)}
                </div>
              </div>
              {/* Comment input */}
              <form
                onSubmit={handleAddComment}
                className="flex items-center border-t border-border pt-3 px-4 pb-4 bg-bg-surface"
              >
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 outline-none text-sm bg-transparent text-text-body placeholder:text-text-muted"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className={`text-sm ml-2 ${
                    newComment.trim()
                      ? "text-primary font-semibold"
                      : "text-text-muted"
                  }`}
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Responsive fix: add extra bottom padding for mobile so input is visible above keyboard */}
      <div className="block md:hidden h-8" />
    </div>
  );
};

export default CommentSection;
