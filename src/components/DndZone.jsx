import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { eventsState, mapState } from "src/stores/valtioState";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "src/firebase/firebase";

const DndZone = () => {
  const eventsSnap = useSnapshot(eventsState);
  const [eventsArray, setEventsArray] = useState(eventsSnap.dateEvents);
  const [switching, setSwitching] = useState("ルートを確定する");

  console.log(eventsArray);

  const handleOnDragEnd = (results) => {
    const prevArray = eventsArray;
    const prevIndex = results.source.index;
    const dragData = prevArray[prevIndex];
    const newIndex = results.destination ? results.destination.index : null;

    if (prevIndex !== newIndex && newIndex !== null) {
      const removeArray = prevArray.filter(
        (event, index) => index != prevIndex
      ); // 要素の削除

      let newArray = removeArray.reduce((prev, current, index) => {
        return index !== newIndex
          ? [...prev, current]
          : [...prev, dragData, current];
      }, []); // 要素の追加

      if (newArray.length !== prevArray.length) {
        newArray = [...newArray, dragData];
      }

      setEventsArray(newArray);
    }
  };

  const handleClickAddButton = () => {
    const CheckedArray = eventsArray.filter(
      (event) => event.extendedProps.destination === "自社"
    );
    const id = CheckedArray.length.toString();

    const homeCompanyData = {
      id: id,
      date: "",
      extendedProps: {
        zipcode: "2700213",
        address1: "千葉県野田市桐ヶ作210",
        address2: "",
        destination: "自社",
        phone_number: "0471030606",
        isConfirm: false,
        isDone: false,
        items: "",
        key_person: "",
        time_zone: "",
        user_id: "",
        description: "",
      },
    };
    const addHomeToArray = [...eventsArray, homeCompanyData];

    setEventsArray(addHomeToArray);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="dropEvents">
        {(provided, snapshot) => (
          <ul
            className={
              snapshot.isDraggingOver ? "dropEvents opacity-70" : "dropEvents"
            }
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <li className="flex justify-around border-b text-gray-400 text-sm font-bold">
              <p>行き先</p>
              <p>時間帯</p>
              <p>品目情報</p>
              <p>備考</p>
              <p>予約者</p>
            </li>
            {eventsArray?.map((event, index) => (
              <Draggable key={event.id} draggableId={event.id} index={index}>
                {(provided, snapshot) => (
                  <li
                    className={
                      snapshot.isDragging
                        ? "flex justify-around border-b bg-blue-200 shadow-md"
                        : "flex justify-around border-b "
                    }
                    key={event.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <p> {event.extendedProps.destination}</p>
                    <p>{event.extendedProps.time_zone}</p>
                    <p>{event.extendedProps.items}</p>
                    <p>{event.extendedProps.description}</p>
                    <p>{event.user_name}</p>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <button onClick={handleClickAddButton}>自社追加</button>
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DndZone;
