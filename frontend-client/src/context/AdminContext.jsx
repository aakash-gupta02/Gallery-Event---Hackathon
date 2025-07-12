import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [comments, setcomments] = useState([]);
  const [media, setMedia] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://galleryevent-hackathon.onrender.com/event/admin/all", {
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
      const res = await axios.get("https://galleryevent-hackathon.onrender.com/auth/get", {
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
      const res = await axios.get("https://galleryevent-hackathon.onrender.com/media/", {
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

  const fetchcomments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://galleryevent-hackathon.onrender.com/comment/getadmin", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setcomments(res.data);
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
    fetchmedia();
    fetchcomments();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        users,
        events,
        media,
        comments,
        loading,

        refreshEvents: fetchEvents, // allow manual refresh
        refreshUsers: fetchUsers, // allow manual refresh
        refreshMedia: fetchmedia, // allow manual refresh
        refreshComments: fetchcomments, // allow manual refresh
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
