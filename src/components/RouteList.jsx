import React, { useCallback } from "react";

import { useSnapshot } from "valtio";
import { eventsState, mapState } from "src/stores/valtioState";
import { Badge, ScrollArea, Stepper, Textarea, Timeline } from "@mantine/core";
import { useProgresses } from "src/hooks/useProgresses";
import dayjs from "dayjs";

export const RouteList = () => {
  const eventsSnap = useSnapshot(eventsState);
  const mapSnap = useSnapshot(mapState);

  const isConfirm = eventsSnap.dateEvents[0]
    ? eventsSnap.dateEvents[0].isConfirm
    : null;

  const initialDate = new Date(2022, 1, 1, 8, 0, 0);
  const dateToString = useCallback((date, addValue) => {
    const prevUnixTime = date.getTime();
    const upUnixTime = prevUnixTime + addValue * 1000;
    const newUnixTime = addValue ? upUnixTime : prevUnixTime;
    const newDate = new Date(newUnixTime);
    const dateStr = newDate.toLocaleTimeString().slice(0, -3);

    return { dateStr, newDate };
  }, []);

  const convertedDirectionResult = mapSnap.distanceAndTimes.reduce(
    (prev, current, i) => {
      const currentIndex = mapSnap.distanceAndTimes.length - 1;
      const distanceStr = current.distance.text;
      const durationStr = current.duration.text;
      const durationValue = current.duration.value;
      const prevDateOb = i === 0 ? initialDate : prev[i - 1].date;
      const { dateStr: newArrivalDateStr, newDate: newArrivalDateOb } =
        dateToString(prevDateOb, durationValue);
      const { dateStr: newDepartureDateStr, newDate: newDepartureDateOb } =
        dateToString(newArrivalDateOb, 600);
      const arrivalStr = `着 : ${newArrivalDateStr}`;
      const departureStr = `発 : ${newDepartureDateStr}`;

      const events = eventsSnap.editEvents.length
        ? eventsSnap.editEvents[i]
        : eventsSnap.dateEvents[i];

      const result = {
        distance: distanceStr,
        duration: durationStr,
        departure: departureStr,
        arrival: arrivalStr,
        departure: currentIndex !== i ? departureStr : null,
        date: newDepartureDateOb,
        events,
      };

      return [...prev, result];
    },
    []
  );

  const { data: progresses, error, isLoading } = useProgresses();
  const sortedProgresses = progresses
    ? progresses.reduce((prev, current, i) => {
        if (!i) {
          return [current];
        }
        const currentOrder = current.order;
        const prevOrder = prev[i - 1].order;

        return currentOrder > prevOrder
          ? [...prev, current]
          : [current, ...prev];
      }, [])
    : [];

  const active = progresses
    ? !progresses.length
      ? 0
      : progresses.length - eventsState.dateEvents.length === 2
      ? progresses.length
      : eventsState.dateEvents.reduce((prev, current) => {
          return current.isDone ? prev + 1 : prev;
        }, 1)
    : 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isConfirm) {
    return (
      <div className=" p-4 ">
        <Stepper active={active}>
          <Stepper.Step
            label="自社"
            description={
              !progresses.length ? (
                <>
                  <p className="text-sm">予定</p>
                  <p className="text-sm">{"発 : 8:00"}</p>
                </>
              ) : (
                `発:${dayjs(sortedProgresses[0].createdAt.toDate()).format(
                  "HH:mm"
                )}`
              )
            }
          >
            出発準備中
          </Stepper.Step>
          {convertedDirectionResult.map((direction, i) => {
            return (
              <Stepper.Step
                key={i}
                label={
                  direction?.events ? direction.events.destination : "自社"
                }
                description={
                  !progresses.length ? (
                    <div className="text-sm">
                      <p>予定</p>
                      <p>{direction.arrival}</p>
                      <p>{direction.departure}</p>
                    </div>
                  ) : sortedProgresses[i + 1] ? (
                    `完:${dayjs(
                      sortedProgresses[i + 1].createdAt.toDate()
                    ).format("HH:mm")}`
                  ) : (
                    ""
                  )
                }
              >
                <Textarea
                  className="py-2"
                  label="ドライバーコメント"
                  value={
                    sortedProgresses[i] ? sortedProgresses[i].description : ""
                  }
                  readOnly
                />
              </Stepper.Step>
            );
          })}
          <Stepper.Completed>
            <Textarea
              className="py-2"
              label="ドライバーコメント"
              value={
                sortedProgresses[progresses.length - 1]
                  ? sortedProgresses[progresses.length - 1].description
                  : ""
              }
              readOnly
            />
          </Stepper.Completed>
        </Stepper>
      </div>
    );
  }

  if (mapSnap.show) {
    return (
      <div className="flex flex-col  h-[350px] w-[200px] p-2 mx-auto overflow-scroll">
        <Timeline lineWidth={2} bulletSize={16}>
          <Timeline.Item
            title={
              <Badge size="lg" color="dark" radius="sm">
                自社
              </Badge>
            }
          >
            <p className="text-sm">{"発 : 8:00"}</p>
          </Timeline.Item>

          {convertedDirectionResult.map((direction, i) => {
            return (
              <Timeline.Item
                key={i}
                title={
                  <Badge
                    classNames={{ root: "px-1" }}
                    size="lg"
                    color="dark"
                    radius="xs"
                  >
                    {direction?.events ? direction.events.destination : "自社"}
                  </Badge>
                }
              >
                <div className="text-sm">
                  <p>{direction.arrival}</p>
                  <div className="ml-1 mb-1 text-xs text-gray-500">
                    <p>{direction.distance}</p>
                    <p>{direction.duration}</p>
                  </div>

                  <p>{direction.departure}</p>
                </div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <ScrollArea className="w-11/12 max-w-lg" style={{ height: 90 }}>
        <div className="flex">
          <div className="w-28 min-w-[112px] text-center mr-2">
            <Badge size="lg" color="dark" radius="sm">
              自社
            </Badge>
            <p>{`発 : 8:00`}</p>
          </div>

          {convertedDirectionResult.map((direction, i) => {
            return (
              <>
                <div className="flex flex-col justify-center items-center w-20 min-w-[80px] text-sm mr-2">
                  <p>➡︎</p>
                  <p>{direction.distance}</p>
                  <p>{direction.duration}</p>
                </div>
                <div className="w-28 min-w-[112px] text-center mr-2">
                  <Badge
                    classNames={{
                      root: "px-1 ",
                      inner: "max-w-[100px] truncate",
                    }}
                    size="lg"
                    color="dark"
                    radius="xs"
                  >
                    {direction?.events ? direction.events.destination : "自社"}
                  </Badge>

                  <p>{direction.arrival}</p>
                  <p>{direction.departure}</p>
                </div>
              </>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
