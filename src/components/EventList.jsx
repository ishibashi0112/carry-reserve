import React, { useCallback, useState } from "react";
import { useSnapshot } from "valtio";
import { eventsState } from "src/stores/valtioState";
import { Buttons } from "src/components/Buttons";
import { AiOutlineBars } from "react-icons/ai";
import { Avatar, Badge, Button, Collapse, Table } from "@mantine/core";

export const EventList = () => {
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
    <div className="w-full p-2">
      <Table className="border-b" highlightOnHover>
        <thead>
          <tr>
            <th></th>
            <th>行き先</th>
            <th>時間帯</th>
            <th>内容</th>
            <th>備考</th>
            <th>予約者</th>
          </tr>
        </thead>
        <tbody>
          {eventsSnap.dateEvents?.map((event) => (
            <>
              <tr key={event.id}>
                <td className="max-w-[25px]">
                  <Button
                    variant="subtle"
                    color="dark"
                    compact
                    onClick={() => handleClickList(event)}
                  >
                    <AiOutlineBars />
                  </Button>
                </td>
                <td>{event.destination}</td>
                <td>{event.time_zone}</td>
                <td className="max-w-[30%] truncate">{event.items}</td>
                <td>{event.description ? "あり" : "なし"}</td>
                <td>
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

      <Buttons />
    </div>
  );
};
