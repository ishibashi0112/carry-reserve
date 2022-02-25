import React, { useCallback, useState } from "react";
import { useSnapshot } from "valtio";
import { eventsState, routeListState } from "src/stores/valtioState";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DndArea = () => {
  const eventsSnap = useSnapshot(eventsState);
  const [eventsArray, setEventsArray] = useState(eventsSnap.dateEvents);

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

  const handleClickAdd = () => {
    //⬇︎⬇︎自社の数に応じてIDを作成し、付与
    const createId = () => {
      const CheckedArray = eventsArray.filter(
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

    const homeCompanyData = {
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
    const addHomeToArray = [...eventsArray, homeCompanyData];

    setEventsArray(addHomeToArray);
  };

  const handleClickBack = useCallback(() => {
    routeListState.switching = "編集";
  }, []);

  const handleClickDelete = useCallback(
    (e) => {
      const deleteEventId = e.currentTarget.dataset.id;
      const newEventArray = eventsArray.filter(
        (event) => event.id !== deleteEventId
      );

      eventsState.deleteEventId = [...eventsState.deleteEventId, deleteEventId];
      setEventsArray(newEventArray);
    },
    [eventsArray]
  );

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
                    <button data-id={event.id} onClick={handleClickDelete}>
                      ×
                    </button>
                    <p> {event.destination}</p>
                    <p>{event.time_zone}</p>
                    <p>{event.items}</p>
                    <p>{event.description}</p>
                    <p>{event.user_name}</p>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <button onClick={handleClickAdd}>自社追加</button>
            <button onClick={handleClickBack}>戻る</button>
            <button
              onClick={() => routeListState.handleClickButton(eventsArray)}
            >
              保存する
            </button>
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DndArea;
