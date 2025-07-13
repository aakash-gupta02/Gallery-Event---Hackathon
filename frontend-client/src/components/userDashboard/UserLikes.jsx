import React from "react";
import { FiHeart, FiImage, FiLoader } from "react-icons/fi";
import { useUser } from "../../context/UserContext";

const UserLikes = () => {
    const { usersLikes, loading } = useUser();

    // usersLikes: { userLikes: [...], totalLikes: number }
    const likes = usersLikes?.userLikes || [];
    const totalLikes = usersLikes?.totalLikes || 0;

    return (
        <div className="bg-bg-body p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-text-heading flex items-center gap-2">
                    <FiHeart className="text-primary" /> Your Likes
                </h1>
                <div className="text-sm text-text-muted">
                    {totalLikes} {totalLikes === 1 ? "like" : "likes"} total
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center h-48 sm:h-64">
                    <FiLoader className="animate-spin text-3xl sm:text-4xl text-primary" />
                </div>
            )}

            {/* Likes Grid */}
            {!loading && (
                <>
                    {likes.length === 0 ? (
                        <div className="text-center text-text-muted py-16">
                            <FiImage className="mx-auto text-4xl mb-2" />
                            <div>No likes yet.</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {likes.map((like) => (
                                <div
                                    key={like.id}
                                    className="bg-bg-surface rounded-lg shadow-card overflow-hidden border border-border flex flex-col"
                                >
                                    <div className="aspect-w-1 aspect-h-1 bg-bg-muted">
                                        {like.media?.url ? (
                                            <img
                                                src={like.media.url}
                                                alt="Liked media"
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-text-muted">
                                                <FiImage size={32} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-2 text-xs text-text-muted text-right">
                                        {new Date(like.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UserLikes;
