import React, { useCallback, useState } from "react";
import { useSnapshot } from "valtio";
import { eventsState } from "src/stores/valtioState";
import { Buttons } from "src/components/Buttons";
import { AiOutlineBars } from "react-icons/ai";
import {
  Avatar,
  Badge,
  Button,
  Collapse,
  ScrollArea,
  Table,
} from "@mantine/core";

export const EventList = () => {
  const [scrolled, setScrolled] = useState(false);
  const eventsSnap = useSnapshot(eventsState);
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

  return (
    <div className="w-full flex flex-col items-center p-2">
      <ScrollArea
        className="w-11/12"
        // style={{ width: 350 }}
        offsetScrollbars
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table className="border-b" highlightOnHover>
          <thead>
            <tr>
              <th></th>
              <th>行き先</th>
              <th>時間</th>
              <th>品目</th>
              <th>備考</th>
              <th>予約者</th>
            </tr>
          </thead>
          <tbody>
            {eventsSnap.dateEvents?.map((event) => (
              <>
                <tr key={event.id}>
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
                  <td className="max-w-[120px] truncate">
                    {event.destination}
                  </td>
                  <td className="max-w-[80px] truncate">{event.time_zone}</td>
                  <td className="max-w-[200px]  truncate">{event.items}</td>
                  <td className="max-w-[80px] truncate">
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
                      color={"dark"}
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
            ))}
          </tbody>
        </Table>
      </ScrollArea>

      <Buttons />
    </div>
  );
};
