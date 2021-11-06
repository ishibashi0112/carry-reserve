import React, { useCallback, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import List from "src/components/List";

const Calendar = () => {
  const [event, setEvent] = useState({});

  const handleClickDate = useCallback((date) => {
    console.log(date.date);
  }, []);

  const handleClickEvent = useCallback((event) => {
    const selectEvent = { title: event.event.title, date: event.event.start };
    console.log(selectEvent);
    setEvent(selectEvent);
  }, []);

  return (
    <div className="flex w-full h-full">
      <div className=" w-2/3 ">
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          selectable={true}
          // weekends={false}
          headerToolbar={{
            left: "dayGridMonth,timeGridWeek,timeGridDay",
            center: "title",
            right: "prev,next",
          }}
          slotMinTime={"07:00:00"}
          slotMaxTime={"21:00:00"}
          locale={"ja"}
          events={[
            { title: "event 1", date: "2021-11-04" },
            { title: "event 2", date: "2021-11-05" },
          ]}
          dateClick={handleClickDate}
          eventClick={handleClickEvent}
        />
      </div>
      <div className="w-1/3 h-full">
        <List event={event} />
      </div>
    </div>
  );
};

export default Calendar;
