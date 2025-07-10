import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCalendarAlt, 
  FaSearch, 
  FaFilter,
  FaArrowUp,
  FaArrowDown,
  FaRegHeart,
  FaHeart,
  FaShare,
  FaEllipsisH
} from "react-icons/fa";
import { 
  MdApartment,
  MdEvent,
  MdPhotoLibrary,
  MdPeople,
  MdWork
} from "react-icons/md";
import { 
  FiChevronDown,
  FiChevronUp,
  FiClock
} from "react-icons/fi";

// Mock data - replace with your actual data source
const mockEvents = [
  {
    id: 1,
    title: "Annual Tech Conference 2023",
    department: "Engineering",
    date: "2023-11-15",
    description: "Our biggest tech event of the year featuring cutting-edge innovations and guest speakers from industry leaders.",
    mediaUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    likes: 124,
    isLiked: false,
    category: "conference"
  },
  {
    id: 2,
    title: "Product Launch Party",
    department: "Marketing",
    date: "2023-09-22",
    description: "Celebrating the successful launch of our new product line with the entire company.",
    mediaUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    likes: 89,
    isLiked: true,
    category: "party"
  },
  {
    id: 3,
    title: "Q3 Team Building Retreat",
    department: "HR",
    date: "2023-07-10",
    description: "Three days of team activities and bonding in the mountains.",
    mediaUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    likes: 156,
    isLiked: false,
    category: "retreat"
  },
  {
    id: 4,
    title: "Office Renovation Reveal",
    department: "Facilities",
    date: "2023-05-18",
    description: "Showcasing our newly renovated workspace with modern amenities.",
    mediaUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    likes: 72,
    isLiked: false,
    category: "office"
  },
  {
    id: 5,
    title: "Holiday Celebration",
    department: "All",
    date: "2022-12-15",
    description: "Year-end celebration with awards, dinner, and dancing.",
    mediaUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    likes: 203,
    isLiked: true,
    category: "holiday"
  },
  {
    id: 6,
    title: "New Hire Orientation",
    department: "HR",
    date: "2023-03-05",
    description: "Welcoming our newest team members with an orientation session.",
    mediaUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    likes: 68,
    isLiked: false,
    category: "orientation"
  },
];

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getCategoryIcon = (category) => {
  switch(category) {
    case 'conference':
      return <MdEvent className="text-lg" />;
    case 'party':
      return <MdPhotoLibrary className="text-lg" />;
    case 'retreat':
      return <MdPeople className="text-lg" />;
    case 'office':
      return <MdWork className="text-lg" />;
    default:
      return <MdEvent className="text-lg" />;
  }
};

const EventGallery = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get all departments and categories for filters
  const departments = ["All", ...new Set(mockEvents.map((e) => e.department))];
  const categories = ["All", ...new Set(mockEvents.map((e) => e.category))];

  // Filtering & Sorting
  const filteredEvents = events
    .filter((event) => {
      const matchesSearch = `${event.title} ${event.department} ${event.description}`
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

  const toggleLike = (id) => {
    setEvents(events.map(event => {
      if (event.id === id) {
        return {
          ...event,
          likes: event.isLiked ? event.likes - 1 : event.likes + 1,
          isLiked: !event.isLiked
        };
      }
      return event;
    }));
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = 'hidden';
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto';
  };

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
              Office Event Gallery
            </span>
          </h1>
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            Relive your company's most memorable moments. Filter by department, category, or date to find specific events.
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
              <label className="block text-sm font-medium text-text-muted mb-1">Department</label>
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
              <label className="block text-sm font-medium text-text-muted mb-1">Sort By</label>
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

            {/* Toggle Additional Filters */}
            <div className="flex items-end">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 py-2.5 px-4 rounded-lg border border-border bg-bg-surface text-text-body hover:bg-bg-muted transition-colors"
              >
                <FaFilter />
                {showFilters ? 'Hide Filters' : 'More Filters'}
              </button>
            </div>
          </div>

          {/* Additional Filters - Animated */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-border mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Category Filter */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-text-muted mb-1">Category</label>
                      <div className="relative">
                        <select
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          className="w-full appearance-none py-2.5 px-4 rounded-lg border border-border bg-bg-surface text-text-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
                        >
                          {categories.map((cat, i) => (
                            <option key={i} value={cat}>
                              {cat === "All" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
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
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setDepartmentFilter('All');
                  setCategoryFilter('All');
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
                        {getCategoryIcon(event.category)}
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
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center text-sm text-text-muted">
                        <button 
                          className={`flex items-center ${event.isLiked ? 'text-red-500' : 'text-text-muted'}`}
                          onClick={() => toggleLike(event.id)}
                        >
                          {event.isLiked ? <FaHeart className="mr-1" /> : <FaRegHeart className="mr-1" />}
                          {event.likes}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
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
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeEventModal}></div>
                </motion.div>

                {/* Modal content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="inline-block align-bottom bg-bg-surface rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
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
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
                              {getCategoryIcon(selectedEvent.category)}
                              <span className="ml-2 capitalize">{selectedEvent.category}</span>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-lg font-medium text-text-heading mb-2">Description</h4>
                            <p className="text-text-body">
                              {selectedEvent.description || "No description available."}
                            </p>
                          </div>

                          <div className="flex items-center justify-between border-t border-border pt-4">
                            <div className="flex items-center">
                              <button 
                                className={`flex items-center ${selectedEvent.isLiked ? 'text-red-500' : 'text-text-muted'}`}
                                onClick={() => toggleLike(selectedEvent.id)}
                              >
                                {selectedEvent.isLiked ? <FaHeart className="mr-2" /> : <FaRegHeart className="mr-2" />}
                                <span>{selectedEvent.likes} likes</span>
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <button className="px-4 py-2 bg-primary text-text-inverted rounded-lg hover:bg-primary-hover transition-colors">
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