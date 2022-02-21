import React, { useCallback, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { collection, getDocs, onSnapshot } from "@firebase/firestore";
import { db } from "src/firebase/firebase";
import { eventsState } from "src/stores/valtioState";
import { useSnapshot } from "valtio";

const Calendar = () => {
  const eventsSnap = useSnapshot(eventsState);

  const handleClickDate = (data) => {
    const dateStr = data.dateStr;
    const DateEvents = eventsSnap.events.filter(
      (event) => dateStr === event.date
    );
    eventsState.dateEvents = DateEvents;
  };

  const handleClickEvent = useCallback(
    (e) => {
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

      eventsState.selectEvent = selectEvent;
      console.log(eventsState.selectEvent);
    },
    [eventsState.events]
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
      eventsState.events = AllEvent;
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
      eventsState.events = AllEvent;
    });
  };

  useEffect(() => {
    getEvents();
    snapshot();
  }, []);

  return (
    <div className="flex-1 p-6 mx-4 border-[0.5px] border-gray-500 ">
      <FullCalendar
        height={"100%"}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
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
        events={eventsSnap.events}
        dateClick={handleClickDate}
        eventClick={handleClickEvent}
      />
    </div>
  );
};

export default Calendar;
