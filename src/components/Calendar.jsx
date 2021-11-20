import React, { useCallback, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import List from "src/components/List";
import { collection, getDocs, onSnapshot } from "@firebase/firestore";
import { db } from "src/firebase/firebase";
import { useSharedState } from "src/hooks/useSharedState";

const Calendar = () => {
  const [selectEvent, setSelectEvent] = useState({});
  // const [selectDateEvents, setSelectDateEvents] = useState("");
  const [events, setEvents] = useState([]);
  const [selectDateEvents, setSelectDateEvents] = useSharedState(
    "dateEvents",
    []
  );

  const handleClickDate = (data) => {
    const dateStr = data.dateStr;
    const DateEvents = events.filter((event) => dateStr === event.date);
    setSelectDateEvents(DateEvents);
    console.log(selectDateEvents);
  };

  const handleClickEvent = useCallback(
    (e) => {
      console.log();
      const selectEvent = {
        id: e.event.id,
        destination: e.event.extendedProps.destination,
        date: e.event.startStr,
        time_zone: e.event.extendedProps.time_zone,
        zipcode: e.event.extendedProps.zipcode,
        address1: e.event.extendedProps.address1,
        address2: e.event.extendedProps.address2,
        phone_number: e.event.extendedProps.phone_number,
        key_person: e.event.extendedProps.key_person,
        phone_number: e.event.extendedProps.phone_number,
        items: e.event.extendedProps.items,
        description: e.event.extendedProps.description,
        isConfirm: e.event.extendedProps.isConfirm,
        user_id: e.event.extendedProps.user_id,
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
        extendedProps: {
          destination: doc.data().destination,
          time_zone: doc.data().time_zone,
          zipcode: doc.data().zipcode,
          address1: doc.data().address1,
          address2: doc.data().address2,
          phone_number: doc.data().phone_number,
          key_person: doc.data().key_person,
          phone_number: doc.data().phone_number,
          items: doc.data().items,
          description: doc.data().description,
          isConfirm: doc.data().isConfirm,
          user_id: doc.data().user_id,
        },
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
        extendedProps: {
          destination: doc.data().destination,
          time_zone: doc.data().time_zone,
          zipcode: doc.data().zipcode,
          address1: doc.data().address1,
          address2: doc.data().address2,
          phone_number: doc.data().phone_number,
          key_person: doc.data().key_person,
          phone_number: doc.data().phone_number,
          items: doc.data().items,
          description: doc.data().description,
          isConfirm: doc.data().isConfirm,
          user_id: doc.data().user_id,
        },
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
          unselectAuto={false}
          weekends={false}
          dayMaxEvents={true}
          headerToolbar={{
            left: "dayGridMonth,timeGridDay,listMonth",
            center: "title",
            right: "prev,next",
          }}
          slotMinTime={"07:00:00"}
          slotMaxTime={"21:00:00"}
          locale={"ja"}
          events={events}
          dateClick={handleClickDate}
          eventClick={handleClickEvent}
          // select={handleClickDate}
        />
      </div>
      <div className="w-1/3 h-full">
        <List selectEvent={selectEvent} />
      </div>
    </div>
  );
};

export default Calendar;
