import React from "react";
import {
  FiCalendar,
  FiHeart,
  FiMessageSquare,
  FiTrendingUp,
  FiRefreshCw,
  FiImage,
  FiPlus,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";
import { useAdmin } from "../../context/AdminContext";

const Dashboard = () => {
  const { events, loading, refreshEvents } = useAdmin();
  console.log("Events data:", events);
  

  // Handle loading and fallback for events
  const stats = {
    totalEvents: events?.totalEvents || 0,
    totalLikes: events?.totalLikes || 0,
    totalComments: events?.totalComments || 0,
  };

  // Engagement Rate calculation
  const engagementRate =
    stats.totalEvents > 0
      ? ((stats.totalLikes + stats.totalComments) / stats.totalEvents).toFixed(
          1
        )
      : "0.0";

  return (
    <div className="bg-bg-body p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-text-heading">
          Dashboard Overview
        </h1>
        <button
          onClick={refreshEvents}
          className="flex items-center text-primary hover:text-primary-hover transition-colors"
          disabled={loading}
        >
          <FiRefreshCw className={`mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Events */}
        <div className="bg-bg-surface rounded-lg shadow-card p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Total Events</p>
              <h3 className="text-2xl font-bold text-text-heading mt-1">
                {stats.totalEvents}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-primary-light text-primary">
              <FiCalendar size={20} />
            </div>
          </div>
        </div>

        {/* Total Likes */}
        <div className="bg-bg-surface rounded-lg shadow-card p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Total Likes</p>
              <h3 className="text-2xl font-bold text-text-heading mt-1">
                {stats.totalLikes}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-primary-light text-primary">
              <FiHeart size={20} />
            </div>
          </div>
        </div>

        {/* Total Comments */}
        <div className="bg-bg-surface rounded-lg shadow-card p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Total Comments</p>
              <h3 className="text-2xl font-bold text-text-heading mt-1">
                {stats.totalComments}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-primary-light text-primary">
              <FiMessageSquare size={20} />
            </div>
          </div>
        </div>

        {/* Engagement Rate */}
        <div className="bg-bg-surface rounded-lg shadow-card p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Engagement Rate</p>
              <h3 className="text-2xl font-bold text-text-heading mt-1">
                {engagementRate}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-primary-light text-primary">
              <FiTrendingUp size={20} />
            </div>
          </div>
          <p className="text-sm text-text-muted mt-4">Interactions per event</p>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-bg-surface rounded-lg shadow-card p-6 border border-border">
        <h2 className="text-xl font-semibold text-text-heading mb-6">
          Recent Events
        </h2>

        {events.events?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {events.events.map((event) => (
              <div
                key={event.id}
                className="border border-border rounded-lg overflow-hidden"
              >
                <div className="h-40 relative">
                  <img
                    src={event.mediaUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-text-heading truncate">
                    {event.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    {event.department}
                  </p>
                  <div className="flex justify-between mt-3 text-sm">
                    <span className="text-text-body">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-center py-8">No events found</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-bg-surface rounded-lg shadow-card p-6 border border-border">
        <h2 className="text-xl font-semibold text-text-heading mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 border border-border rounded-lg hover:bg-primary-light/20 transition-colors">
            <div className="p-3 mb-2 rounded-full bg-primary-light text-primary">
              <FiPlus size={18} />
            </div>
            <span className="text-sm text-text-body">Create Event</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-border rounded-lg hover:bg-primary-light/20 transition-colors">
            <div className="p-3 mb-2 rounded-full bg-primary-light text-primary">
              <FiImage size={18} />
            </div>
            <span className="text-sm text-text-body">Approve Media</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-border rounded-lg hover:bg-primary-light/20 transition-colors">
            <div className="p-3 mb-2 rounded-full bg-primary-light text-primary">
              <FiUsers size={18} />
            </div>
            <span className="text-sm text-text-body">Manage Users</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-border rounded-lg hover:bg-primary-light/20 transition-colors">
            <div className="p-3 mb-2 rounded-full bg-primary-light text-primary">
              <FiBarChart2 size={18} />
            </div>
            <span className="text-sm text-text-body">View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
