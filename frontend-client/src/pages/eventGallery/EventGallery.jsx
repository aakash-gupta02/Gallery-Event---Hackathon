import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaArrowUp,
  FaArrowDown,
  FaRegHeart,
  FaHeart,
  FaShare,
  FaEllipsisH,
} from "react-icons/fa";
import {
  MdApartment,
  MdEvent,
  MdPhotoLibrary,
  MdPeople,
  MdWork,
} from "react-icons/md";
import { FiChevronDown, FiChevronUp, FiClock } from "react-icons/fi";
import { useEvent } from "../../context/EventContext";
import { useNavigate } from "react-router-dom";

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
  const { events } = useEvent();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get all departments and categories for filters
  const departments = ["All", ...new Set(events.map((e) => e.department))];
  const categories = ["All", ...new Set(events.map((e) => e.category))];

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        `${event.title} ${event.department} ${event.description}`
          .toLowerCase()
          .includes(search.toLowerCase());
      const matchesDept =
        departmentFilter === "All" || event.department === departmentFilter;
      const matchesCategory =
        categoryFilter === "All" || event.category === categoryFilter;
      return matchesSearch && matchesDept && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const openEventModal = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = "hidden";
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="min-h-screen bg-bg-body py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="mb-12 text-left transition-all duration-500 opacity-100 translate-y-0">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-heading mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover">
              Office Event Gallery
            </span>
          </h1>
          <p className="text-lg text-text-body max-w-2xl ">
            Relive your company's most memorable moments. Filter by department,
            category, or date to find specific events.
          </p>
        </div>

        {/* Controls Section */}
        <div className="mb-12 bg-bg-surface rounded-xl p-6 shadow-card border border-border transition-all duration-500 opacity-100">
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

            {/* Sort Order */}
            <div className="flex-1 relative">
              <label className="block text-sm font-medium text-text-muted mb-1">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full appearance-none py-2.5 px-4 rounded-lg border border-border bg-bg-surface text-text-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {sortOrder === "desc" ? (
                    <FaArrowDown className="text-text-muted" />
                  ) : (
                    <FaArrowUp className="text-text-muted" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          {showFilters && (
            <div className="overflow-hidden transition-all duration-300">
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
                  {/* Add more filters here as needed */}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="mb-12">
          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-bg-surface rounded-xl shadow-card border border-border h-80 animate-pulse transition-all duration-500"
                />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && filteredEvents.length === 0 && (
            <div className="text-center py-16 transition-all duration-500">
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
            </div>
          )}

          {/* Event Grid */}
          {!loading && filteredEvents.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-bg-surface rounded-xl shadow-card border border-border overflow-hidden group transition-transform duration-300 hover:-translate-y-1"
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

                    <div className="absolute top-3 right-3 bg-bg-surface/90 px-3 py-1 text-sm rounded-full text-text-heading font-medium shadow">
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Event Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 transition-opacity duration-300">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={closeEventModal}
              >
                <div className="absolute inset-0"></div>
              </div>

              {/* Modal content */}
              <div
                className="inline-block align-bottom bg-bg-surface rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full relative z-10"
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
                      <div className="relative h-64 lg:h-96 rounded-lg overflow-hidden">
                        <img
                          src={selectedEvent.mediaUrl}
                          alt={selectedEvent.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

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
                          <div className="flex gap-2">
                            <button
                              className="px-4 py-2 cursor-pointer  bg-primary text-text-inverted rounded-lg hover:bg-primary-hover transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventGallery;
