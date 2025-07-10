import { useState } from "react";
import { useEvent } from "../../context/EventContext";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { motion } from "framer-motion";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const EventGallery = () => {
  const { events, loading } = useEvent();
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  // Get all departments for filter
  const departments = ["All", ...new Set(events.map((e) => e.department))];

  // Filtering & Sorting
  const filteredEvents = events
    .filter((event) => {
      const matchesSearch = `${event.title} ${event.department}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesDept =
        departmentFilter === "All" || event.department === departmentFilter;
      return matchesSearch && matchesDept;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="min-h-screen bg-bg-body py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-heading mb-2">
            🖼️ Explore Office Events
          </h1>
          <p className="text-text-muted text-base">
            Filter and relive your best team memories by department or date.
          </p>
        </div>

        {/* Controls: Search + Filter + Sort */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute top-3.5 left-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-base border border-border bg-bg-surface text-text-body placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="w-full py-2 px-4 rounded-base border border-border bg-bg-surface text-text-body focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {departments.map((dept, i) => (
              <option key={i} value={dept}>
                {dept === "All" ? "All Departments" : dept}
              </option>
            ))}
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full py-2 px-4 rounded-base border border-border bg-bg-surface text-text-body focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-text-muted text-lg animate-pulse">
            Loading events...
          </p>
        )}

        {/* No Result */}
        {!loading && filteredEvents.length === 0 && (
          <p className="text-center text-text-muted text-base mt-10">
            No events found with the selected filters.
          </p>
        )}

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              className="bg-bg-surface rounded-base shadow-card border border-border flex flex-col overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.mediaUrl}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-bg-surface px-3 py-1 text-xs rounded-full text-primary font-semibold shadow">
                  {formatDate(event.date)}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-text-heading mb-1 line-clamp-1">
                    {event.title}
                  </h2>
                  <div className="flex items-center text-text-muted text-sm mb-2">
                    <MdApartment className="mr-2 text-primary" />
                    {event.department}
                  </div>
                  {event.description && (
                    <p className="text-text-body text-sm line-clamp-2">
                      {event.description}
                    </p>
                  )}
                </div>
                <button className="mt-4 text-sm font-medium text-primary hover:text-primary-hover transition">
                  View Gallery →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default EventGallery;
