import React, { useCallback } from "react";
import { BsCheckLg } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { useSnapshot } from "valtio";
import { eventsState, mapState, listState } from "src/stores/valtioState";
import { Badge, Button } from "@mantine/core";
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

export const Buttons = (props) => {
  const events = props.events;
  const setEvents = props.setEvents;
  const eventsSnap = useSnapshot(eventsState);
  const mapSnap = useSnapshot(mapState);
  const listSnap = useSnapshot(listState);
  const isConfirm = eventsSnap.dateEvents[0]
    ? eventsSnap.dateEvents[0].isConfirm
    : null;

  const handleClickAddHome = useCallback(() => {
    //⬇︎⬇︎自社の数に応じてIDを作成
    const createId = () => {
      const CheckedArray = events.filter(
        (event) => event.destination === "自社"
      );
      const id = CheckedArray.length.toString();
      return id;
    };
    //⬇︎⬇︎選択中の他イベントと同じdateを作成
    const createDate = () => {
      const check = eventsSnap.dateEvents.filter(
        (event) => event.destination !== "自社"
      );
      const date = check[0] ? check[0].date : null;
      return date;
    };

    const homeData = {
      id: createId(),
      date: createDate(),
      zipcode: "2700213",
      address1: "千葉県野田市桐ヶ作210",
      address2: null,
      destination: "自社",
      phone_number: "0471030606",
      isConfirm: false,
      isDone: false,
      route_order: null,
      items: null,
      key_person: null,
      time_zone: null,
      user_id: null,
      description: null,
    };
    const addHomeToArray = [...events, homeData];

    setEvents(addHomeToArray);
  }, [events, eventsSnap.dateEvents]);

  const handleClickBack = useCallback(() => {
    eventsState.editEvents = [];
    listState.editMode = false;
  }, []);

  const handleClickMapUpdate = useCallback(() => {
    eventsState.editEvents = events;
  }, [events]);

  const handleclickShowMap = useCallback(() => {
    mapState.show = mapState.show ? false : true;
  }, []);

  const handleClickEdit = useCallback(() => {
    listState.editMode = true;
  }, []);

  const handleClickSave = async (events) => {
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

    eventsState.editEvents = [];
    eventsState.dateEvents = eventsSortedArray;

    listState.editMode = false;
  };

  if (isConfirm) {
    return (
      <div className="flex items-center mt-3">
        <Badge
          size="lg"
          color="teal"
          radius="sm"
          variant="filled"
          leftSection={<BsCheckLg />}
        >
          確定済
        </Badge>

        <Button
          className="m-1"
          variant="light"
          color={"dark"}
          compact
          onClick={handleclickShowMap}
        >
          {mapSnap.show ? "地図を閉じる" : "地図表示"}
        </Button>
      </div>
    );
  }

  if (!listSnap.editMode) {
    return (
      <div className="flex mt-3">
        <Button
          className="m-1"
          variant="light"
          color="dark"
          compact
          onClick={handleClickEdit}
        >
          編集
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mt-3 mx-4">
        <div className="flex">
          <Button
            className="m-1"
            variant="light"
            color="dark"
            compact
            onClick={handleClickBack}
          >
            戻る
          </Button>

          <Button
            className="m-1"
            variant="light"
            color="dark"
            compact
            onClick={handleClickAddHome}
          >
            自社追加
          </Button>

          <Button
            className="m-1"
            variant="light"
            color="dark"
            compact
            onClick={handleclickShowMap}
          >
            {mapSnap.show ? "地図を閉じる" : "地図表示"}
          </Button>

          <Button
            className="m-1"
            variant="light"
            color="dark"
            compact
            onClick={handleClickMapUpdate}
          >
            <GrUpdate color={"#ffffff"} />
          </Button>
        </div>

        <div>
          <Button
            className="m-1"
            variant="light"
            color="dark"
            compact
            onClick={() => handleClickSave(events)}
          >
            保存する
          </Button>
        </div>
      </div>
    </div>
  );
};
