import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
  const handleClickDate = (a) => {
    console.log(a.date);
  };

  const handleClickEvent = (a) => {
    console.log(a.event.title);
  };
  return (
    <div className="w-2/3">
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
  );
};

export default Calendar;
