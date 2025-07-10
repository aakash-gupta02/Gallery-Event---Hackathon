import { FaCalendarAlt } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { motion } from "framer-motion";
import { useEvent } from "../context/EventContext";
import axios from "axios";
import api from "../services/BaseUrl";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const EventGallery = () => {
  const [loading, setloading] = useState(true);
  const [recentEvents, setRecentEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/event/recent");
        setRecentEvents(response.data);
        console.log("Response:", response.data);
        setloading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
        setloading(false);
      }
    };

    fetch();
  }, []);

  if (error) {
    return <p className="text-center text-text-muted py-20 text-lg">{error}</p>;
  }

  if (loading) {
    return (
      <p className="text-center text-text-muted py-20 text-lg animate-pulse">
        Loading events...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-bg-body py-10 px-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-text-heading mb-10">
        Recent Events
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recentEvents.map((event) => (
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

      <div className="flex justify-center mt-12">
        <button  
        onClick={ ()=> navigate("/event")}
          className="flex items-center bg-primary text-white px-5 py-2 rounded-base shadow hover:bg-primary-hover transition duration-300">
          <FaCalendarAlt className="mr-2" />
          View All Events
        </button>
      </div>
      
    </div>
  );
};

export default EventGallery;
