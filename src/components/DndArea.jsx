import React, { useCallback, useState } from "react";
import { useSnapshot } from "valtio";
import { eventsState } from "src/stores/valtioState";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Buttons from "src/components/Buttons";

const DndArea = () => {
  const eventsSnap = useSnapshot(eventsState);
  const [eventsArray, setEventsArray] = useState(eventsSnap.dateEvents);

  const handleOnDragEnd = useCallback(
    (results) => {
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
    },
    [eventsArray]
  );

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
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="dropEvents">
          {(provided, snapshot) => (
            <table
              className={`${
                snapshot.isDraggingOver ? " opacity-70" : ""
              } dropEvents  w-full table-fixed mt-6`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <tr className=" border-b text-center text-sm ">
                <th>{""}</th>
                <th>行き先</th>
                <th>時間帯</th>
                <th>品目情報</th>
                <th>備考</th>
                <th>予約者</th>
              </tr>
              {eventsArray?.map((event, index) => (
                <Draggable key={event.id} draggableId={event.id} index={index}>
                  {(provided, snapshot) => (
                    <tr
                      className={`${
                        snapshot.isDragging ? "bg-blue-200 shadow-md" : ""
                      }
                        h-9 border-b text-center `}
                      key={event.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <td>
                        <button data-id={event.id} onClick={handleClickDelete}>
                          ×
                        </button>
                      </td>
                      <td className="truncate"> {event.destination}</td>
                      <td className="truncate">{event.time_zone}</td>
                      <td className="truncate">{event.items}</td>
                      <td className="truncate">{event.description}</td>
                      <td className="truncate">{event.user_name}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </table>
          )}
        </Droppable>
      </DragDropContext>

      <Buttons events={eventsArray} setEvents={setEventsArray} />
    </div>
  );
};

export default DndArea;
