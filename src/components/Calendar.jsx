import React, { useCallback, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import List from "src/components/List";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { db } from "src/firebase/firebase";

const Calendar = () => {
  const [selectEvent, setSelectEvent] = useState({});
  const [events, setEvents] = useState([]);

  const handleClickDate = useCallback((date) => {
    console.log(date.date);
  }, []);

  const handleClickEvent = useCallback((e) => {
    const selectEvent = {
      id: e.event.id,
      title: e.event.title,
      date: e.event.start,
    };
    console.log(selectEvent);
    setSelectEvent(selectEvent);
  }, []);

  const getEvents = useCallback(async () => {
    try {
      const res = await getDocs(collection(db, "events"));
      const resArray = res.docs;
      const AllEvent = await resArray.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        date: doc.data().date,
      }));
      console.log(AllEvent);
      setEvents(AllEvent);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="flex w-full h-full">
      <div className=" w-2/3 ">
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          selectable={true}
          weekends={false}
          headerToolbar={{
            left: "dayGridMonth,timeGridWeek,timeGridDay",
            center: "title",
            right: "prev,next",
          }}
          slotMinTime={"07:00:00"}
          slotMaxTime={"21:00:00"}
          locale={"ja"}
          events={events}
          dateClick={handleClickDate}
          eventClick={handleClickEvent}
        />
      </div>
      <div className="w-1/3 h-full">
        <List event={selectEvent} />
      </div>
    </div>
  );
};

export default Calendar;
