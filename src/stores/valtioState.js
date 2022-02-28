import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { sortEventsByRouteOrder } from "src/components/Calendar";
import { auth, db } from "src/firebase/firebase";
import { proxy } from "valtio";

// イベント
export const eventsState = proxy({
  events: [],
  dateEvents: [],
  selectEvent: {},
  deleteEventId: [],
});

//マップ
export const mapState = proxy({
  latLng: [],
  optimize: false,
  clickEventOptimize: () => {
    mapState.optimize
      ? (mapState.optimize = false)
      : (mapState.optimize = true);
  },
  distanceAndTimes: [],
});

// サイドバー
export const sideBarState = proxy({
  sideBar: false,
  clickEvent: () => {
    sideBarState.sideBar
      ? (sideBarState.sideBar = false)
      : (sideBarState.sideBar = true);
  },
});

// ルートリスト
export const routeListState = proxy({
  switching: "編集",
  handleClickButton: async (events) => {
    switch (routeListState.switching) {
      case "編集":
        routeListState.switching = "保存";
        break;
      case "保存":
        if (eventsState.deleteEventId.length) {
          eventsState.deleteEventId.map(async (eventId) => {
            const eventDoc = doc(db, "events", eventId);
            eventDoc ? await deleteDoc(eventDoc) : null;
          });
          eventsState.deleteEventId = [];
        }

        events.map(async (event, index) => {
          if (event.destination === "自社") {
            await addDoc(collection(db, "events"), {
              destination: event.destination,
              date: event.date,
              time_zone: event.time_zone,
              zipcode: event.zipcode,
              address1: event.address1,
              address2: event.address2,
              phone_number: event.phone_number,
              key_person: event.key_person,
              items: event.items,
              description: event.description,
              isConfirm: true,
              isDone: false,
              route_order: index,
              user_id: auth.currentUser.uid,
            });
          } else {
            const eventDoc = doc(db, "events", event.id);
            await updateDoc(eventDoc, {
              isConfirm: true,
              route_order: index,
            });
          }
        });

        const date = events[0].date;
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, where("date", "==", date));
        const res = await getDocs(q);
        const resArray = res.docs;
        const eventsArray = resArray.map((doc) => ({
          id: doc.id,
          title: doc.data().destination,
          date: doc.data().date,
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
        }));

        const eventsSortedArray = sortEventsByRouteOrder(eventsArray);

        eventsState.dateEvents = eventsSortedArray;

        routeListState.switching = "編集";
        break;
    }
  },
});
