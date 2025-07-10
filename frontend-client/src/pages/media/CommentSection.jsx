import React, { useState, useEffect } from "react";
import {
  FiHeart,
  FiMessageSquare,
  FiSend,
  FiBookmark,
  FiMoreHorizontal,
} from "react-icons/fi";
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
  const [media, setmedia] = useState("")
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(1243);
  const [isLiked, setIsLiked] = useState(false);


  // Fetch comments for the media
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/comment/get/${mediaId}`);
        const mediaResponse = await api.get(`/media/${mediaId}`);
        setmedia(mediaResponse.data.data);
        console.log("Media Data:", mediaResponse.data.data);
        console.log( "Comments" ,response.data);
        

        

        setComments(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load comments");
        setLoading(false);
      }
    };

    fetchComments();
  }, [mediaId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await api.post("/comments/add", {
        mediaId,
        content: newComment,
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
        await api.delete(`/likes/media/${mediaId}`);
        setLikes(likes - 1);
      } else {
        await api.post(`/likes/media/${mediaId}`);
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      setError("Failed to update like");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/delete/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      setError("Failed to delete comment");
    }
  };

  const handleUpdateComment = async (commentId, newContent) => {
    try {
      const response = await api.put(`/comments/update/${commentId}`, {
        content: newContent,
      });
      setComments(
        comments.map((comment) =>
          comment.id === commentId ? response.data : comment
        )
      );
    } catch (err) {
      setError("Failed to update comment");
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

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-bg-surface rounded-lg shadow-card overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Image */}
          <div className="w-full md:w-1/2 lg:w-3/5 bg-black flex items-center justify-center">
            <img
              src={ media.url }
              alt="Post"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>

          {/* Right Side - Comment Section */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                <img
                  src={ media.user?.profileImage }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-semibold text-text-heading"> { media.user?.name } </div>
              <button className="ml-auto text-text-muted hover:text-text-heading">
                <FiMoreHorizontal />
              </button>
            </div>

            {/* Comments */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Post caption */}
              
              <div className="flex">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-semibold text-text-heading">
                    jane_doe
                  </span>
                  <span className="text-text-body">
                    {" "}
                    This is such a beautiful sunset! 😍 #nature #sunset
                  </span>
                  <div className="text-xs text-text-muted mt-1">
                    2 hours ago
                  </div>
                </div>
              </div>

              {/* Comments list */}
              {comments.map((comment) => (
                <div key={comment.id} className="flex group">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                    <img
                      src={
                        comment.user?.profileImage ||
                        "https://randomuser.me/api/portraits/men/32.jpg"
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
                        <span className="text-text-body">
                          {" "}
                          {comment.text}
                        </span>
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

            {/* Action buttons */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-4 mb-2">
                <button
                  onClick={handleLike}
                  className={`text-2xl ${
                    isLiked ? "text-error fill-error" : "text-text-muted"
                  }`}
                >
                  <FiHeart />
                </button>
                <button className="text-2xl text-text-muted">
                  <FiMessageSquare />
                </button>
                <button className="text-2xl text-text-muted">
                  <FiSend />
                </button>
                <button className="text-2xl ml-auto text-text-muted">
                  <FiBookmark />
                </button>
              </div>
              <div className="font-semibold text-text-heading mb-1">
                {likes.toLocaleString()} likes
              </div>
              <div className="text-xs text-text-muted mb-3">2 hours ago</div>

              {/* Comment input */}
              <form
                onSubmit={handleAddComment}
                className="flex items-center border-t border-border pt-3"
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
    </div>
  );
};

export default CommentSection;
