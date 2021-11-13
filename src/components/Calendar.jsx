import React, { useCallback, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import List from "src/components/List";
import { collection, getDocs, onSnapshot } from "@firebase/firestore";
import { db } from "src/firebase/firebase";

const Calendar = () => {
  const [selectEvent, setSelectEvent] = useState({});
  const [selectDate, setSelectDate] = useState("");
  const [events, setEvents] = useState([]);

  const handleClickDate = useCallback(
    (data) => {
      setSelectDate(data.dateStr);
      console.log(selectDate);
    },
    [selectDate]
  );

  const handleClickEvent = useCallback(
    (e) => {
      const selectEvent = {
        id: e.event.id,
        title: e.event.title,
        date: e.event.start,
      };
      console.log(selectEvent);
      setSelectEvent(selectEvent);
    },
    [events]
  );

  const getEvents = useCallback(async () => {
    try {
      const res = await getDocs(collection(db, "events"));
      const resArray = res.docs;
      const AllEvent = await resArray.map((doc) => ({
        id: doc.id,
        title: doc.data().destination,
        date: doc.data().date,
      }));
      console.log(AllEvent);
      setEvents(AllEvent);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const snapshot = async () => {
    const res = await collection(db, "events");
    onSnapshot(res, async (querySnapshot) => {
      const resArray = querySnapshot.docs;
      const AllEvent = await resArray.map((doc) => ({
        id: doc.id,
        title: doc.data().destination,
        date: doc.data().date,
      }));
      setEvents(AllEvent);
    });
  };

  useEffect(() => {
    getEvents();
    snapshot();
  }, []);

  return (
    <div className="flex w-full h-full">
      <div className=" w-2/3 ">
        <FullCalendar
          plugins={[
            timeGridPlugin,
            dayGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          selectable={true}
          weekends={false}
          headerToolbar={{
            left: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
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
        <List selectEvent={selectEvent} selectDate={selectDate} />
      </div>
    </div>
  );
};

export default Calendar;
