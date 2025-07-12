import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [media_event, setmedia_event] = useState([])
  const [media, setMedia] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/event/admin/all", {
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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/auth/get", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.user);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

    const fetchmedia = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/media/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setMedia(res.data.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchEvents();
    fetchUsers();
    fetchmedia()
  }, []);

  return (
    <AdminContext.Provider
      value={{
        users,
        events,
        media,
        loading,

        refreshEvents: fetchEvents, // allow manual refresh
        refreshUsers: fetchUsers, // allow manual refresh
        refreshMedia: fetchmedia, // allow manual refresh
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
