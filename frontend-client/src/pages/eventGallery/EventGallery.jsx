import { useEvent } from "../../context/EventContext";

const EventGallery = () => {
  const { events, loading, refreshEvents } = useEvent();

  if (!loading) {
    console.log(events);
  }

  //   useEffect(() => {
  //     // Already fetched on mount by provider
  //   }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <ul>
      {events.map((event) => (
        <li key={event.id}>{event.title}</li>
      ))}
    </ul>
  );
};

export default EventGallery;
