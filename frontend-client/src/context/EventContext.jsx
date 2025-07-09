import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/event/get", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(); // called once on mount
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        refreshEvents: fetchEvents, // allow manual refresh
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
