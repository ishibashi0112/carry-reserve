import React, { useCallback, useState } from "react";
import { useSnapshot } from "valtio";
import { eventsState } from "src/stores/valtioState";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Buttons } from "src/components/Buttons";
import {
  Avatar,
  Badge,
  Button,
  Collapse,
  ScrollArea,
  Table,
} from "@mantine/core";
import { AiOutlineBars } from "react-icons/ai";

export const DndArea = () => {
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

  const [eventListOpenState, setEventListOpenState] = useState({
    isOpened: false,
    id: null,
  });

  const handleClickList = useCallback((event) => {
    const eventId = event.id;

    setEventListOpenState((prev) => ({
      ...prev,
      isOpened: prev.isOpened ? false : true,
      id: eventId,
    }));
  }, []);

  const [scrolled, setScrolled] = useState(false);

  return (
    <div className="mt-4 flex flex-col items-center ">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="dropEvents">
          {(provided, snapshot) => (
            <ScrollArea
              className="w-11/12"
              style={{ height: 220 }}
              offsetScrollbars
              onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
            >
              <Table
                classNames={{ root: "dropEvents " }}
                highlightOnHover
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <thead
                  className={`${
                    scrolled ? "shadow-lg" : ""
                  } sticky top-0 bg-white z-10`}
                >
                  <tr>
                    <th></th>
                    <th>行き先</th>
                    <th>時間</th>
                    <th>品目</th>
                    <th>備考</th>
                    <th>予約者</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className="h-20 overflow-y-auto">
                  {eventsArray?.map((event, index) => (
                    <Draggable
                      key={event.id}
                      draggableId={event.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <>
                          <tr
                            className={`${
                              snapshot.isDragging
                                ? "bg-white shadow-md rounded-sm flex justify-between"
                                : ""
                            }`}
                            key={event.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <td className="max-w-[64px]">
                              <Button
                                variant="subtle"
                                color="dark"
                                compact
                                onClick={() => handleClickList(event)}
                              >
                                <AiOutlineBars />
                              </Button>
                            </td>
                            <td className="max-w-[200px] truncate">
                              {event.destination}
                            </td>
                            <td className="max-w-[80px]  truncate">
                              {event.time_zone}
                            </td>
                            <td className="max-w-[200px] truncate ">
                              {event.items}
                            </td>
                            <td className="max-w-[80px]  truncate">
                              {event.description ? "あり" : "なし"}
                            </td>
                            <td className="max-w-[100px]">
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
                            <td className="max-w-[64px]">
                              <Button
                                variant="subtle"
                                color="dark"
                                compact
                                data-id={event.id}
                                onClick={handleClickDelete}
                              >
                                ×
                              </Button>
                            </td>
                          </tr>
                          <td className="p-0" colSpan="6 ">
                            <Collapse
                              in={
                                eventListOpenState.isOpened &&
                                eventListOpenState.id === event.id
                              }
                            >
                              <div className="border-b py-2 px-3">
                                <div>
                                  住所:
                                  <p>{`　〒${event.zipcode}`}</p>
                                  <p>{`　${event.address1}${
                                    event.address2 ? event.address2 : ""
                                  }`}</p>
                                </div>
                                <p>{`内容: ${event.items}`}</p>
                                <p>{`備考: ${event.description}`}</p>
                              </div>
                            </Collapse>
                          </td>
                        </>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </Table>
            </ScrollArea>
          )}
        </Droppable>
      </DragDropContext>

      <Buttons events={eventsArray} setEvents={setEventsArray} />
    </div>
  );
};
