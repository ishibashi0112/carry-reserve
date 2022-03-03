import React, { useCallback, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";

import { db } from "src/firebase/firebase";
import { eventsState } from "src/stores/valtioState";
import { useSnapshot } from "valtio";

export const sortEventsByRouteOrder = (events) => {
  const sortedArray = events.reduce((prev, current) => {
    let newArray = prev;
    const currentRouteOrder = current.route_order;
    newArray[currentRouteOrder] = current;
    return newArray;
  }, []);
  return sortedArray;
};

export const getEventUserName = async (events) => {
  const addUserNameArray = events.map(async (event) => {
    const eventUserId = event.user_id;
    const q = query(
      collection(db, "users"),
      where("user_id", "==", eventUserId)
    );
    const eventUserDocs = await getDocs(q);
    const eventUserName = eventUserDocs.docs[0].data().user_name;

    return { ...event, user_name: eventUserName };
  });

  const results = await Promise.all(addUserNameArray);

  return results;
};

const Calendar = () => {
  const eventsSnap = useSnapshot(eventsState);

  const handleClickDate = async (data) => {
    //⬇︎⬇︎全イベントから選択した日付のイベントを抽出。
    const dateStr = data.dateStr;
    const DateEvents = eventsSnap.events.filter(
      (event) => dateStr === event.date
    );
    //⬇︎⬇︎extendedPropsキーのネストを外す。
    const convertedArray = DateEvents.map((event) => {
      return {
        id: event.id,
        title: event.title,
        date: event.date,
        ...event.extendedProps,
      };
    });
    //⬇︎⬇usersフィールドにあるuser_nameをeventに追加。
    const addUserNameArray = await getEventUserName(convertedArray);
    //⬇︎⬇ルート確定済みイベントの場合は、ルート順に並び替え
    const isConfirm = addUserNameArray[0]
      ? addUserNameArray[0].isConfirm
      : null;
    const sortedArray = isConfirm
      ? sortEventsByRouteOrder(addUserNameArray)
      : null;

    eventsState.dateEvents = isConfirm ? sortedArray : addUserNameArray;
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
        isDone: e.event.extendedProps.isDone,
        route_order: e.event.extendedProps.route_order,
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
          isDone: doc.data().isDone,
          route_order: doc.data().route_order,
          user_id: doc.data().user_id,
        },
      }));
      eventsState.events = AllEvent;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const snapshot = async () => {
    const res = collection(db, "events");
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
          isDone: doc.data().isDone,
          route_order: doc.data().route_order,
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
    <div className="w-[700px] resize-x overflow-scroll  h-[600px] p-6 mx-4 border-[0.5px] border-gray-500 ">
      <div className="w-[700px] h-[600px] ">
        <FullCalendar
          height={"100%"}
          plugins={[
            timeGridPlugin,
            dayGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
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
    </div>
  );
};

export default Calendar;
