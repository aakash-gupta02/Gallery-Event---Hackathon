import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [comments, setcomments] = useState([]);
  const [media, setMedia] = useState([]);
  const [usersLikes, setUsersLikes] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState("")

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://galleryevent-hackathon.onrender.com/event/User/all", {
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

  const fetchUsersLikes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://galleryevent-hackathon.onrender.com/like/user-likes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUsersLikes(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

    const fetchUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://galleryevent-hackathon.onrender.com/auth/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setuser(res.data.user);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setuser("");
    } finally {

      setLoading(false);
    }
  };

  const fetchmedia = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://galleryevent-hackathon.onrender.com/media/user", {
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
      const res = await axios.get("https://galleryevent-hackathon.onrender.com/comment/user", {
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
    fetchUsersLikes();
    fetchmedia();
    fetchUser();
    fetchcomments();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        usersLikes,
        events,
        media,
        comments,
        loading,


        refreshMedia: fetchmedia, // allow manual refresh
        refreshComments: fetchcomments, // allow manual refresh
        refreshEvents: fetchEvents, // allow manual refres
        refreshUsersLikes: fetchUsersLikes, // allow manual refresh
        refresshUser: fetchUser, // allow manual refresh
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
