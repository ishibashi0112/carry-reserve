import React, { useCallback, useState } from "react";
import { useSnapshot } from "valtio";
import { eventsState } from "src/stores/valtioState";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Buttons from "src/components/Buttons";
import { Avatar, Badge, Table } from "@mantine/core";

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
            <Table
              classNames={{ root: "dropEvents" }}
              highlightOnHover
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <thead>
                <tr>
                  <th></th>
                  <th>行き先</th>
                  <th>時間帯</th>
                  <th>品目情報</th>
                  <th>備考</th>
                  <th>予約者</th>
                </tr>
              </thead>
              <tbody>
                {eventsArray?.map((event, index) => (
                  <Draggable
                    key={event.id}
                    draggableId={event.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <tr
                        className={`${
                          snapshot.isDragging
                            ? "bg-white shadow-md border rounded-sm"
                            : ""
                        }`}
                        key={event.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <td>
                          <button
                            data-id={event.id}
                            onClick={handleClickDelete}
                          >
                            ×
                          </button>
                        </td>
                        <td> {event.destination}</td>
                        <td>{event.time_zone}</td>
                        <td>{event.items}</td>
                        <td>{event.description}</td>
                        <td>
                          <Badge
                            className="pl-0 w-20"
                            classNames={{
                              root: "pr-2",
                              leftSection: "mr-[2px]",
                            }}
                            variant="outline"
                            fullWidth
                            leftSection={
                              <Avatar
                                alt="Avatar for badge"
                                size={20}
                                src={"IMG-8743.JPG"}
                                radius={"xl"}
                              />
                            }
                          >
                            {event.user_name}
                          </Badge>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>

      <Buttons events={eventsArray} setEvents={setEventsArray} />
    </div>
  );
};

export default DndArea;
