import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { eventsState, mapState, listState } from "src/stores/valtioState";
import { Button, Stepper, Textarea } from "@mantine/core";
import {
  addDoc,
  serverTimestamp,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "src/firebase/firebase";
import dayjs from "dayjs";
import { useSWRConfig } from "swr";
import { useProgresses } from "src/hooks/useProgresses";

export const ProgressForm = () => {
  const eventsSnap = useSnapshot(eventsState);
  const { mutate } = useSWRConfig();
  const { data: progresses, error, isLoading } = useProgresses();
  const active = progresses ? progresses.length : 0;
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
  // console.log(sortedProgresses);
  const date = eventsSnap.dateEvents[0] ? eventsSnap.dateEvents[0].date : null;
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleClickLeaveAndArrival = async (e) => {
    const buttonText = e.target.innerText;
    try {
      await addDoc(collection(db, "progresses"), {
        createdAt: serverTimestamp(),
        date,
        status: buttonText === "出発" ? "出発" : "帰社",
        description: textAreaValue ? textAreaValue : "特になし",
        order: buttonText === "出発" ? 1 : progresses.length + 1,
        event_id: null,
        user_id: auth.currentUser.uid,
      });
      await mutate("progresses");
      setTextAreaValue("");
    } catch (error) {
      alert(error);
    }
  };

  const handleClickDone = async (eventId) => {
    try {
      await addDoc(collection(db, "progresses"), {
        createdAt: serverTimestamp(),
        date,
        status: "経由",
        description: textAreaValue ? textAreaValue : "特になし",
        order: progresses.length + 1,
        event_id: eventId,
        user_id: auth.currentUser.uid,
      });
      await updateDoc(doc(db, "events", eventId), {
        isDone: true,
      });
      await mutate("progresses");
      setTextAreaValue("");
    } catch (error) {
      alert(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className=" p-4">
      <Stepper
        active={active}
        // onStepClick={setActive}
      >
        <Stepper.Step
          label="自社"
          description={
            <p className="text-sm">
              {sortedProgresses[0]
                ? `発:${dayjs(sortedProgresses[0].createdAt.toDate()).format(
                    "HH:mm"
                  )}`
                : ""}
            </p>
          }
        >
          <Textarea
            className="py-2"
            placeholder="Your comment"
            label="報告事項"
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
          <p className="flex justify-end">
            <Button onClick={handleClickLeaveAndArrival}>出発</Button>
          </p>
        </Stepper.Step>
        {eventsSnap.dateEvents.map((event, i) => {
          return (
            <Stepper.Step
              key={i}
              label={event.destination}
              description={
                sortedProgresses[i + 1]
                  ? `完:${dayjs(
                      sortedProgresses[i + 1].createdAt.toDate()
                    ).format("HH:mm")}`
                  : ""
              }
            >
              <Textarea
                className="py-2"
                placeholder="Your comment"
                label="報告事項"
                value={textAreaValue}
                onChange={(e) => setTextAreaValue(e.target.value)}
              />

              <p className="flex justify-end">
                <Button onClick={() => handleClickDone(event.id)}>完了</Button>
              </p>
            </Stepper.Step>
          );
        })}
        <Stepper.Step
          label="自社"
          description={
            <p className="text-sm">
              {sortedProgresses[progresses.length - 1]
                ? `完:${dayjs(
                    sortedProgresses[progresses.length - 1].createdAt.toDate()
                  ).format("HH:mm")}`
                : ""}
            </p>
          }
        >
          <Textarea
            className="py-2"
            placeholder="Your comment"
            label="報告事項"
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
          <p className="flex justify-end">
            <Button onClick={handleClickLeaveAndArrival}>帰社</Button>
          </p>
        </Stepper.Step>
        <Stepper.Completed>
          <div className="flex flex-col items-center">
            <p>本日の予定は全て終了しました!</p>
            <p>お疲れ様でした^^</p>
          </div>
        </Stepper.Completed>
      </Stepper>
    </div>
  );
};
