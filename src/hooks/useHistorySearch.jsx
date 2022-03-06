import { useEffect, useState } from "react";
import { getEventsHistory } from "src/firebase/firestore";

export const useHistorySearch = () => {
  const [text, setText] = useState("");
  const [events, setEvents] = useState([]);

  const getEventsHistoryData = async () => {
    const historyData = await getEventsHistory();
    setEvents(historyData);
  };

  const searchEvents = () => {
    const searchArray = events.filter((event) =>
      event.destination.includes(text)
    );
    const result = searchArray.map((event) => ({
      id: event.id,
      destination: event.destination,
      zipcode: event.zipcode,
      address1: event.address1,
      address2: event.address2,
      phone_number: event.phone_number,
    }));

    return result;
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const search = text ? searchEvents() : null;

  useEffect(() => {
    getEventsHistoryData();
  }, []);

  return { text, search, setText, handleOnChange };
};
