import {
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaRegHeart,
  FaHeart,
  FaShare,
} from "react-icons/fa";
import {
  MdApartment,
  MdEvent,
  MdPhotoLibrary,
  MdPeople,
  MdWork,
} from "react-icons/md";
import { FiChevronDown, FiClock } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useEvent } from "../context/EventContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/BaseUrl";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getCategoryIcon = (category) => {
  switch (category) {
    case "conference":
      return <MdEvent className="text-lg" />;
    case "party":
      return <MdPhotoLibrary className="text-lg" />;
    case "retreat":
      return <MdPeople className="text-lg" />;
    case "office":
      return <MdWork className="text-lg" />;
    default:
      return <MdEvent className="text-lg" />;
  }
};

const EventGallery = () => {
  const [loading, setLoading] = useState(true);
  const [recentEvents, setRecentEvents] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/event/recent");
        setRecentEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get all departments and categories for filters
  const departments = [
    "All",
    ...new Set(recentEvents.map((e) => e.department)),
  ];
  const categories = [
    "All",
    ...new Set(recentEvents.map((e) => e.category || "event")),
  ];

  // Filter events
  const filteredEvents = recentEvents.filter((event) => {
    const matchesSearch = `${event.title} ${event.department} ${
      event.description || ""
    }`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesDept =
      departmentFilter === "All" || event.department === departmentFilter;
    const matchesCategory =
      categoryFilter === "All" ||
      (event.category || "event") === categoryFilter;
    return matchesSearch && matchesDept && matchesCategory;
  });

  const toggleLike = async (id) => {
    try {
      // Optimistic UI update
      setRecentEvents((prevEvents) =>
        prevEvents.map((event) => {
          if (event.id === id) {
            const newLikeStatus = !event.isLiked;
            return {
              ...event,
              likes: newLikeStatus ? event.likes + 1 : event.likes - 1,
              isLiked: newLikeStatus,
            };
          }
          return event;
        })
      );

      // API call to update like status
      await api.patch(`/event/${id}/like`);
    } catch (err) {
      console.error("Error updating like:", err);
      // Revert on error
      setRecentEvents((prevEvents) =>
        prevEvents.map((event) => {
          if (event.id === id) {
            return {
              ...event,
              likes: event.isLiked ? event.likes - 1 : event.likes + 1,
              isLiked: !event.isLiked,
            };
          }
          return event;
        })
      );
    }
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = "hidden";
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = "auto";
  };

  if (error) {
    return (
      <div className="min-h-screen bg-bg-body flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-bg-surface rounded-xl shadow-card max-w-md mx-auto"
        >
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-text-heading mb-2">
            Error Loading Events
          </h2>
          <p className="text-text-body mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-text-inverted rounded-lg hover:bg-primary-hover transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-body py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-text-heading mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover">
              Recent Office Events
            </span>
          </h1>
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            Browse through the most recent company events and celebrations
          </p>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12 bg-bg-surface rounded-xl p-6 shadow-card border border-border"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <FaSearch className="absolute top-4 left-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search events by title, department or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-bg-surface text-text-body placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Main Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            {/* Department Filter */}
            <div className="flex-1 relative">
              <label className="block text-sm font-medium text-text-muted mb-1">
                Department
              </label>
              <div className="relative">
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full appearance-none py-2.5 px-4 rounded-lg border border-border bg-bg-surface text-text-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
                >
                  {departments.map((dept, i) => (
                    <option key={i} value={dept}>
                      {dept === "All" ? "All Departments" : dept}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FiChevronDown className="text-text-muted" />
                </div>
              </div>
            </div>

            {/* Toggle Additional Filters */}
            <div className="flex items-end">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 py-2.5 px-4 rounded-lg border border-border bg-bg-surface text-text-body hover:bg-bg-muted transition-colors"
              >
                <FaFilter />
                {showFilters ? "Hide Filters" : "More Filters"}
              </button>
            </div>
          </div>

          {/* Additional Filters - Animated */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-border mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Category Filter */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-text-muted mb-1">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          className="w-full appearance-none py-2.5 px-4 rounded-lg border border-border bg-bg-surface text-text-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
                        >
                          {categories.map((cat, i) => (
                            <option key={i} value={cat}>
                              {cat === "All"
                                ? "All Categories"
                                : cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <FiChevronDown className="text-text-muted" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Content Area */}
        <div className="mb-12">
          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-bg-surface rounded-xl shadow-card border border-border h-80 animate-pulse"
                />
              ))}
            </motion.div>
          )}

          {/* No Results */}
          {!loading && filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="mx-auto w-24 h-24 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <FaSearch className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-medium text-text-heading mb-2">
                No events found
              </h3>
              <p className="text-text-body max-w-md mx-auto">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setDepartmentFilter("All");
                  setCategoryFilter("All");
                }}
                className="mt-4 px-6 py-2 bg-primary text-text-inverted rounded-lg hover:bg-primary-hover transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          )}

          {/* Event Grid */}
          {!loading && filteredEvents.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-bg-surface rounded-xl shadow-card border border-border overflow-hidden group"
                >
                  {/* Event Image */}
                  <div
                    className="relative h-48 overflow-hidden cursor-pointer"
                    onClick={() => openEventModal(event)}
                  >
                    <img
                      src={event.mediaUrl}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-text-inverted font-medium">
                        Click to view details
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        className="p-2 bg-black/40 rounded-full text-text-inverted hover:bg-black/60 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(event.id);
                        }}
                      >
                        {event.isLiked ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </button>
                      <button className="p-2 bg-black/40 rounded-full text-text-inverted hover:bg-black/60 transition-colors">
                        <FaShare />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-bg-surface/90 px-3 py-1 text-sm rounded-full text-text-heading font-medium shadow">
                      {formatDate(event.date)}
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h2
                        className="text-xl font-semibold text-text-heading cursor-pointer hover:text-primary transition-colors line-clamp-1"
                        onClick={() => openEventModal(event)}
                      >
                        {event.title}
                      </h2>
                      <div className="flex items-center text-primary">
                        {getCategoryIcon(event.category || "event")}
                      </div>
                    </div>

                    <div className="flex items-center text-text-muted text-sm mb-3">
                      <MdApartment className="mr-2 text-primary" />
                      {event.department}
                    </div>

                    {event.description && (
                      <p className="text-text-body text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    <div className="flex justify-between items-center pt-3 border-t border-border">
                      <div className="flex items-center text-sm text-text-muted">
                        <FiClock className="mr-1" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-sm text-text-muted">
                        <button
                          className={`flex items-center ${
                            event.isLiked ? "text-red-500" : "text-text-muted"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(event.id);
                          }}
                        >
                          {event.isLiked ? (
                            <FaHeart className="mr-1" />
                          ) : (
                            <FaRegHeart className="mr-1" />
                          )}
                          {event.likes || 0}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/event")}
            className="flex items-center bg-primary text-text-inverted px-6 py-3 rounded-lg shadow hover:bg-primary-hover transition-all"
          >
            <FaCalendarAlt className="mr-2" />
            View All Events
          </motion.button>
        </div>

        {/* Event Modal */}
        <AnimatePresence>
          {selectedEvent && (
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
                    onClick={closeEventModal}
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
                    <div className="p-6 border-b border-border flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-text-heading">
                        {selectedEvent.title}
                      </h3>
                      <button
                        onClick={closeEventModal}
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
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Image */}
                        <div className="relative h-64 lg:h-96 rounded-lg overflow-hidden">
                          <img
                            src={selectedEvent.mediaUrl}
                            alt={selectedEvent.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4 flex gap-2">
                            <button
                              className="p-2 bg-black/40 rounded-full text-text-inverted hover:bg-black/60 transition-colors"
                              onClick={() => toggleLike(selectedEvent.id)}
                            >
                              {selectedEvent.isLiked ? (
                                <FaHeart className="text-red-500" />
                              ) : (
                                <FaRegHeart />
                              )}
                            </button>
                            <button className="p-2 bg-black/40 rounded-full text-text-inverted hover:bg-black/60 transition-colors">
                              <FaShare />
                            </button>
                          </div>
                        </div>

                        {/* Details */}
                        <div>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center text-sm text-text-muted">
                              <MdApartment className="mr-2 text-primary" />
                              {selectedEvent.department}
                            </div>
                            <div className="flex items-center text-sm text-text-muted">
                              <FiClock className="mr-2 text-primary" />
                              {formatDate(selectedEvent.date)}
                            </div>
                            <div className="flex items-center text-sm text-text-muted">
                              {getCategoryIcon(
                                selectedEvent.category || "event"
                              )}
                              <span className="ml-2 capitalize">
                                {selectedEvent.category || "event"}
                              </span>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-lg font-medium text-text-heading mb-2">
                              Description
                            </h4>
                            <p className="text-text-body">
                              {selectedEvent.description ||
                                "No description available."}
                            </p>
                          </div>

                          <div className="flex items-center justify-between border-t border-border pt-4">
                            <div className="flex items-center">
                              <button
                                className={`flex items-center ${
                                  selectedEvent.isLiked
                                    ? "text-red-500"
                                    : "text-text-muted"
                                }`}
                                onClick={() => toggleLike(selectedEvent.id)}
                              >
                                {selectedEvent.isLiked ? (
                                  <FaHeart className="mr-2" />
                                ) : (
                                  <FaRegHeart className="mr-2" />
                                )}
                                <span>{selectedEvent.likes || 0} likes</span>
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <button
                                className="px-4 py-2 bg-primary text-text-inverted rounded-lg hover:bg-primary-hover transition-colors"
                                onClick={() => {
                                  closeEventModal();
                                  navigate(`/event/${selectedEvent.id}`);
                                }}
                              >
                                View Full Gallery
                              </button>
                            </div>
                          </div>
                        </div>
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

export default EventGallery;
